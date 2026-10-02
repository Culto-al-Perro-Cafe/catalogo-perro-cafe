# Technical SEO review follow-up

This branch targets `https://www.perro.cafe` in application, Docker and release-workflow defaults. `NEXT_PUBLIC_SITE_URL` is inlined during the image build; changing a runtime variable alone will not repair an already built image. An explicit build override still takes precedence.

## Pending owner / infrastructure checks

- Inspect the actual GitHub `NEXT_PUBLIC_SITE_URL` variable and the effective build configuration before the next approved release. These production values were not inspected or changed in this work.
- Review the reported host chain (`catalogo` → HTTP `www` → HTTPS `www`) at the proxy/DNS/hosting layer. Configure a single permanent redirect to HTTPS `www` only after infrastructure review; this branch does not change host routing.
- After an independently approved release, recheck canonical tags, Open Graph URLs, JSON-LD, robots and sitemap on the public domain, then submit the sitemap through the site's Search Console account if appropriate.
- Confirm prices, shipping thresholds/timeframes, testimonial permission and accuracy, and legal/privacy wording with the business owner. No new business claims or legal text were invented here; existing claims still need owner review.

## Review and validation scope

- Existing thirteen Shopify redirects are preserved as 308s. Unknown paths remain 404s.
- Bayunka is explicitly described as the 2024 lot and points to current retail options, without promising stock of the old lot.
- Quote URLs accept only catalogued line/bean pairs. Their combined display value remains in the existing `linea` payload field; downstream CRM consumers should tolerate the more specific label. Legacy `?linea=natural-honey` remains supported.
- `pnpm lint`, `pnpm test`, `pnpm typecheck`, and `pnpm build` are available for review. The PR Checks workflow only validates; the existing Deploy workflow still runs exclusively on `v*.*.*` tags.
- Local browser QA must block analytics and external POSTs. Do not submit production leads, orders, or messages for testing.
