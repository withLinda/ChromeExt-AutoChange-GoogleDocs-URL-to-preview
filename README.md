# Google Docs Auto Preview (Chrome Extension)

Automatically changes Google Docs URLs from `/edit` or `/view` to `/preview` on the first eligible open in each browser tab.

## Quick Start (Clone and Load)

1. Clone the repository:
   ```bash
   git clone https://github.com/withLinda/ChromeExt-AutoChange-GoogleDocs-URL-to-preview.git
   cd ChromeExt-AutoChange-GoogleDocs-URL-to-preview
   ```
2. Open Chrome: `chrome://extensions`
3. Turn on **Developer mode**
4. Click **Load unpacked**
5. Select the cloned folder (the folder that contains `manifest.json`)

## URL Behavior

- Only the last path segment changes: `/edit` or `/view` -> `/preview`
- Document ID stays the same
- Query parameters stay the same (example: `?tab=t.0`)
- Hash stays the same (example: `#heading=h.xyz`)

Example:

- From: `https://docs.google.com/document/d/FILE_ID/edit?tab=t.0`
- To: `https://docs.google.com/document/d/FILE_ID/preview?tab=t.0`

## Supported URL Forms

- `/document/d/{id}/edit|view`
- `/document/u/{n}/d/{id}/edit|view`
- `/document/a/{domain}/d/{id}/edit|view`

## Once-Per-Tab Rule

- Same tab: first eligible `/edit` or `/view` URL redirects to `/preview`
- Same tab (later): no automatic redirect
- New tab: first eligible URL redirects again
- Already `/preview`: no redirect

## Quick Verification

1. Open a Docs URL ending with `/edit` and confirm it becomes `/preview`
2. In the same tab, open another `/edit` URL and confirm it does not auto-redirect
3. Open an `/edit` URL in a new tab and confirm it redirects to `/preview`
