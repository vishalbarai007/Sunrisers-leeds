---
name: landing-page-media
description: Choose, source, optimise and place images and video for landing pages. Uses client-supplied media first, then Magnific stock (via the Magnific API) to fill gaps, and records every stock asset in a manifest. Use in Phase 5-6 of landing-page-core, or whenever adding or replacing images or video on a landing page.
---

# Landing Page Media

Follows `.claude/rules.md` section 8. Client media always comes first. Stock fills gaps only.

## Order of preference
1. **`client/media/`**: images and videos the user supplied. Use these wherever they fit the section.
2. **Magnific stock**: for gaps only, after listing what the client media does not cover.
3. **Placeholder**: if neither is available, use a clearly marked neutral placeholder with `TODO(placeholder)`, and list it in `LANDING_PLAN.md`. Never use a random hotlinked image.

## 1. Media inventory
Before sourcing anything, list `client/media/` and for each file note: type, dimensions, duration (video), orientation, quality, and which section it suits. Flag unusable files (too small, low quality, wrong format) and say why. Do not rename or modify the originals.

## 2. Media plan
In `LANDING_PLAN.md`, for each section list the media slots: role (hero visual, feature image, background, avatar, logo, video), aspect ratio, source (client / stock / placeholder), and alt text intent. Slots that no client file covers become the stock shopping list.

## 3. Sourcing stock from Magnific

### API key
- The key lives in `.env.local` as `MAGNIFIC_API_KEY`. Confirm `.env*` is in `.gitignore` before the first call.
- Never print the key, paste it in chat, commit it, or put it in client-side code. API calls run from scripts or server code only.
- Keep sourcing scripts in `scripts/media/`, not in `app/`. They are build-time tools, not part of the page.

### API facts (from docs.magnific.com)
- Base URL: `https://api.magnific.com`
- Auth: header `x-magnific-api-key: <key>`
- Images and templates: `GET /v1/resources` (list/search), `GET /v1/resources/{resource-id}` (detail), `GET /v1/resources/{resource-id}/download`, `GET /v1/resources/{resource-id}/download/{resource-format}`
- Videos: `GET /v1/videos` (see `/api-reference/videos/videos-api`)
- Icons: `GET /v1/icons`
- Not confirmed from the docs overview: query parameter names, response fields, download response shape, stock download limits. Before the first call, read the endpoint reference for `GET /v1/resources` (docs.magnific.com, `/api-reference/resources/get-all-resources`) and the download endpoint. If a call fails on host or header name, check the current docs: older Freepik-branded docs used `api.freepik.com` and `x-freepik-api-key`.
- Respect the licence agreement linked from the docs. Check each asset's licence before use.

### Search
- Build queries from the client's industry, audience and tone (`client/company.md`) plus the visual direction from the merged references. Be specific.
- Pull a shortlist of 3-5 candidates per slot with preview URLs, not final downloads.
- Prefer one consistent look: same colour grade, lighting, style and subject type across the page. Reject mixed styles unless the plan calls for it.
- Avoid clichés (handshakes, thumbs-up laptops), identifiable people unless the licence clearly allows this commercial use, visible third-party brand marks, and text baked into images.
- Show the user the shortlist per slot with a recommendation. Download only the approved picks.

### Download
- Download approved assets into `client/media/stock/`, then optimise into `public/media/` (section 5).
- State how many downloads you are about to make before running them, in case the account has credits or download limits.
- If the API fails or the plan does not include it, fall back to giving the user the search terms and slot sizes so they can download manually into `client/media/stock/`.

## 4. Manifest
Keep `client/media/stock/manifest.md`. One entry per stock asset:

| Field | Content |
|---|---|
| file | Local filename in `public/media/` |
| slot | Section and role |
| source | Magnific |
| resource ID / URL | ID and page link |
| author | If shown |
| licence | Type and attribution requirement |
| date | Date downloaded |

Stock must be replaceable later by changing a file and one data entry.

## 5. Optimise and place
- Export to the display size at 2x for the largest slot; prefer AVIF or WebP, JPEG as fallback. Keep each image under about 300KB unless justified.
- Put final assets in `public/media/`, named by role (`hero.avif`, `feature-1.avif`), not by original filename.
- Use `next/image` with explicit `width`/`height` or `fill` + `sizes`. `priority` for the hero image only. Reserve space with a fixed aspect ratio so nothing shifts.
- One treatment per role across the page: same aspect ratio, radius and crop style. Radius and edge style use the shared card tokens.
- Alt text describes the content and purpose in context, not "image of". Decorative images use `alt=""`. Alt text lives in `content/site.ts` with the rest of the copy.
- Screenshots and images with text need enough resolution to stay legible on mobile.

## 6. Video
- Muted, `playsInline`, `preload="metadata"`, with a `poster` image. Never autoplay with sound.
- Autoplaying loops only for decorative background video. Keep them short (under about 15s) and compressed (MP4 H.264, optionally WebM), ideally under about 3MB. Lazy-load anything below the fold.
- Provide a static fallback (the poster) for `prefers-reduced-motion` and data-saver. Pause when off-screen.
- Videos with meaningful content get controls and captions. Ask the user before embedding third-party players or choosing hosting.
- A hero video must not delay LCP: the poster is the LCP element and the video loads after.

## 7. Logos, icons and screenshots
- Client and customer logos come only from `client/` or the user. Never invent or fetch other companies' logos without the user's confirmation.
- Prefer SVG for logos and icons. One icon library, one stroke weight.
- Product screenshots come from the client. If none exist, use a clearly marked placeholder rather than a fabricated UI that looks real.

## Output to `landing-page-core`
1. Inventory of `client/media/` with fit notes
2. Media plan per section, with gaps marked
3. Stock shortlist per gap with a recommendation
4. Open questions: licences, missing assets, hosting for video
