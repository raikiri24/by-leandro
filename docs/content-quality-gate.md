# Public-content and advertising review

Before adding a route to the sitemap, review its visible purpose, product-specific originality, usefulness, depth, responsible operator/author, next steps and duplication. Do not use word count as an approval threshold. Keep the existing /articles hub; do not create a second /guides copy.

1. Run `npm test` to catch new pages missing from the sitemap.
2. Run a production server, then `npm run test:routes` to inspect every public route's status, canonical, metadata, structured data and local links.
3. Open the page without signing in and with JavaScript disabled. Verify useful text is delivered to ordinary visitors and crawlers alike. Inspect mobile readability and keyboard access.
4. Review for unsupported product claims, invented data, catalog inaccuracies, duplicated explanations and orphan links. Compare instructions to the actual editor code. Dates must reflect real publication/revision, not every build.
5. Empty/placeholder, query-filter, search and low-information UGC routes should stay outside the sitemap and use noindex. Authentication and authorization, not robots, must protect private data if those features are introduced.
6. Improve useful but unclear pages; merge/redirect equivalent editorial pages only when warranted. Do not remove working application routes to reduce search inventory.
7. After deployment, inspect Search Console indexing and field Core Web Vitals. Compare actual user tasks and failures; no Lighthouse or word-count target guarantees AdSense approval.

## Advertising integration contract

`lib/ad-policy.ts` is the central eligibility contract. `APPROVED_AD_ROUTES` is deliberately empty. There is currently **no advertising renderer or script loader**: candidates are not active inventory. The default local preference system only controls analytics.

Before restoring ads:

- Configure a real CMP appropriate to your visitors and Google's regional requirements. Verify its provider identity/configuration and live consent behavior. Do not interpret the local analytics checkbox, a Boolean environment variable, or the mere existence of a TCF API as valid advertising consent.
- Implement and test a consent adapter that supplies `verified-cmp-granted` only when the configured CMP signals that the relevant advertising processing is permitted. Unknown, absent, errored and denied states must fail closed.
- Choose a manual placement after substantive editorial content, clearly labeled Advertisement and separated from navigation, forms and related links. Reserve its dimensions before loading to avoid layout shift. No ads in editors, image previews, dialogs, error pages, toolbars, feedback, or future unmoderated/private/reported/deleted UGC.
- Wire the renderer through `canShowAds`, verify content/placement states and then explicitly add individually approved article paths. Do not auto-approve an entire /articles prefix.
- Turn off Auto ads and overlay/vignette placements for this application in AdSense. A script loaded in a shared SPA document can remain active after navigation; explicitly test navigation to tool and error routes and consent revocation. Prefer document/iframe isolation reviewed against provider requirements rather than assuming removing a React script unloads the vendor.
- Test network requests before choice, after rejection, after grant and after withdrawal; test regional messages, mobile placement and errors. Keep publisher verification and ads.txt independent of delivery.

Candidates: the six article detail pages in `AD_REVIEW_CANDIDATES`. Excluded: homepage, guide index, tools, trust/help/changelog pages, all APIs/system assets, unknown/error routes, and all future UGC unless separately designed and reviewed. No placements or slot IDs have been invented in this remediation.
