# Google Docs Auto Preview (Chrome Extension)

## What this extension does

When you open a Google Docs URL in `/edit` or `/view` mode, this extension changes only that mode part to `/preview`.

Everything else stays the same:
- document ID
- query parameters (like `?tab=t.0`)
- hash (like `#heading=h.xyz`)

Example:

- From: `https://docs.google.com/document/d/1jKNe-UtypLqtNF4lN-_vXP-kcWbovwrbT0oKH9rQBY0/edit?tab=t.0`
- To: `https://docs.google.com/document/d/1jKNe-UtypLqtNF4lN-_vXP-kcWbovwrbT0oKH9rQBY0/preview?tab=t.0`

## Supported URL forms

- `/document/d/{id}/edit|view`
- `/document/u/{n}/d/{id}/edit|view`
- `/document/a/{domain}/d/{id}/edit|view`

## Redirect behavior (once per tab)

The extension redirects only on the first eligible `/edit` or `/view` URL in one browser tab.

- Same tab: first eligible open is redirected, later eligible opens are not redirected.
- New tab: first eligible open is redirected again.

If the first page in the tab is already `/preview`, no redirect happens at that time.

## Install steps

1. Open Chrome and go to `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select this folder:
   - `/Users/linda/Documents/DEV/ChromeExt-AutoChange-GoogleDocs-URL-to-preview`

## Files

- `manifest.json`: Extension config (Manifest V3).
- `content.js`: URL detection and redirect logic.
