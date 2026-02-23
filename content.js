"use strict";

const FLAG_KEY = "gd_preview_redirect_done_once_per_tab";
const ELIGIBLE_PATH_RE =
  /^\/document\/(?:u\/\d+\/|a\/[^/]+\/)?d\/[^/]+\/(edit|view)\/?$/;

function getPreviewUrlIfNeeded(currentHref) {
  let url;

  try {
    url = new URL(currentHref);
  } catch {
    return null;
  }

  if (!ELIGIBLE_PATH_RE.test(url.pathname)) {
    return null;
  }

  url.pathname = url.pathname.replace(/\/(edit|view)(\/)?$/, "/preview$2");

  return url.toString();
}

function maybeRedirectToPreview() {
  try {
    if (sessionStorage.getItem(FLAG_KEY)) {
      return;
    }
  } catch {
    return;
  }

  const previewUrl = getPreviewUrlIfNeeded(window.location.href);
  if (!previewUrl) {
    return;
  }

  try {
    sessionStorage.setItem(FLAG_KEY, "1");
  } catch {
    return;
  }

  window.location.replace(previewUrl);
}

function patchHistoryMethod(methodName) {
  const original = history[methodName];
  if (typeof original !== "function") {
    return;
  }

  history[methodName] = function patchedHistoryMethod() {
    const result = original.apply(this, arguments);
    maybeRedirectToPreview();
    return result;
  };
}

patchHistoryMethod("pushState");
patchHistoryMethod("replaceState");
window.addEventListener("popstate", maybeRedirectToPreview);
maybeRedirectToPreview();
