# AdSense remediation readiness — by.leandro

Prepared September 8, 2026. Scope: the actual tournament-card generator repository, confirmed by the owner. Changes are local; nothing has been deployed or submitted to Google. This report is not a claim of Google approval or a complete legal assessment.

## 1. Remediation summary

The site already had a substantial homepage and five guides. This remediation strengthens the existing toolkit rather than replacing it with a blog. Added precise instructions for all three editors and one background-removal guide; improved mobile discovery and homepage FAQ; removed invented preview match scores; corrected privacy descriptions and page metadata.

The central advertising policy now fails closed. The global AdSense delivery script was removed from the shared layout; publisher verification and ads.txt remain. No custom cookie checkbox can enable advertising. Advertising is paused until a real CMP integration and explicit placements are reviewed and tested. Google prohibits ads on screens without sufficient publisher content; Google also specifies regional certified-CMP requirements. These findings are plausible contributors to the reported issue, not evidence of Google's exact rejection rationale. [Publisher policies](https://support.google.com/adsense/answer/10502938), [CMP requirements](https://support.google.com/adsense/answer/13554116).

Analytics functionality is retained behind consent. Preferences can be reopened from every page; choices default to off and expire after 180 days. The dialog supports keyboard focus containment, Escape and focus return. Storage failure denies optional analytics. Tool usage registration now requires consent, while feedback works without a tracking identifier. Privacy text distinguishes pseudonymous browser records from anonymous totals.

## 2. Content inventory

**New:** `/articles/background-removal-and-export` — actual steps for model download, edge corrections, manual tools, transparency, PNG export, reuse in the card tool and troubleshooting.

**Improved visible content/navigation:** `/` (workflow limits, FAQ, mobile navigation, honest preview); `/tool`, `/deck-builder`, `/bg-remover` (server-rendered instructions and relevant guide/trust links outside export canvases); `/articles` (shared discovery); `/privacy` (storage, consent, imports, feedback, retention); `/faq`, `/terms`, and the Challonge import guide (accurate advertising/data descriptions). Shared navigation improves about/contact/help/changelog/policy pages and every article.

**Metadata improvements:** all 17 public pages have explicit title, description, clean canonical, robots, Open Graph and Twitter identity. JSON-LD is escaped. Website schema is site-wide, application schema is on the homepage, and article/breadcrumb/person/FAQ schema matches the relevant visible content. FAQ markup is not a claim of rich-result eligibility.

**Noindex:** API responses receive `X-Robots-Tag: noindex, nofollow`; missing pages retain Next's noindex/404 behavior; error boundaries explicitly add noindex. No useful public tool was removed from the index merely because it is interactive.

**Consolidated or deleted:** none. `/articles` remains the sole knowledge hub. No redundant /guides, feature microsites, fabricated community pages, profiles or rankings were added.

## 3. Technical SEO

- Sitemap contains 17 explicit public canonical URLs, including the new guide. Excludes APIs, errors and non-existent account/community routes. Query and filter combinations are not generated. Modification dates correspond to edits; article dates remain separately maintained.
- Robots permits public pages and rendering assets, disallows `/api/`, and declares the canonical sitemap. API robots rules are not a security boundary; origin checks/rate limits remain. A disallowed API may not be crawled to see its noindex header, so neither mechanism is presented as privacy protection. [Google robots guidance](https://developers.google.com/search/docs/crawling-indexing/robots/intro).
- Canonicals are per-page, omit tracking/query parameters, and use the validated configured origin. Root layout no longer forces a homepage canonical onto errors. External/protocol-relative/query-bearing canonical paths are rejected by the metadata helper.
- Known apex alias has a path/query-preserving permanent 308 redirect in Next configuration when the preferred origin is the default www host. Arbitrary hosts and deployments are not redirected. Existing trailing-slash normalization remains.
- No schema, API, authentication, export template or tournament calculation was replaced. Raw images inside export designs remain compatible with html-to-image. Existing security headers remain, plus API noindex.
- Public pages are prerendered. Production build reports approximately 106 kB first-load JS for the homepage/guides, 128 kB deck builder, 134 kB background remover and 178 kB card tool. The model library remains dynamically imported. No claim is made about field LCP, INP or CLS; Search Console/CrUX measurements are still needed.

## 4. Production host report

| Host | Purpose/indexability | Canonical/redirect strategy | Sitemap/robots | Ads/content quality |
| --- | --- | --- | --- | --- |
| `www.byleandro.space` | Primary public toolkit; 17 intended indexable pages after deployment | Exact canonical path on preferred HTTPS origin | Live robots and sitemap returned 200; local sitemap validated | Local delivery paused; substantial product content plus focused new guide. Existing live deployment has not received these changes. |
| `byleandro.space` | Equivalent apex alias, not independent inventory | Live checks returned temporary 302 to matching www paths. New application rule is 308; CDN/hosting may override it. | Live requests redirect to matching www files | No separate advertising/content inventory; no duplicate pages are manufactured. |

Live read-only checks: `/`, `/robots.txt`, `/sitemap.xml` and a deliberately missing URL on both hosts. www returned 200, 200, 200 and 404 respectively, with CSP, nosniff and HSTS. Apex returned 302 for all four, preserving paths; those redirect responses did not include the checked security headers. Configure a permanent HTTPS alias redirect and appropriate headers at the hosting layer.

Only www is configured as a production subdomain in this repository. No app/community/stats host or host-specific authentication exists. Challonge organization hosts and the IMG.LY asset host are third parties. Owner must confirm DNS/Amplify inventory for any deployments outside this repository; these checks cannot establish an exhaustive external DNS inventory.

## 5. Functional regression report

Actual checks performed:

| Check | Result and limits |
| --- | --- |
| Production build | Passed with static pages generated and APIs retained; requires network access for existing Google font download. |
| Type check | `npm run typecheck` passed. |
| Lint | Passed with 0 errors and 51 warnings; existing warnings remain (mainly raw export images, existing unused variables and hook directives). No broad suppression of image warnings or rewrite of export code. |
| Automated policy/unit tests | 10 tests: consent validity/expiry/storage failures, ad exclusions, canonical validation, JSON-LD injection escaping, sitemap route completeness, robots assets, deck growth, integrated-ratchet/armor constraints, mocked API contracts. |
| HTTP public inventory | All 17 routes: 200, useful heading/main target, description, canonical, matching social URL, parseable schema, known local links, no ad script in server HTML. Query canonical, sitemap and robots passed. The final build also passed an apex Host-header check: 308 with the original path and query preserved. |
| HTTP missing/API routes | Real missing URL returned 404/noindex. Feedback/usage/Challonge POSTs from unrelated origin returned 403. API noindex headers verified. Health endpoint failure response did not expose raw DB exception text. |
| API success/validation contracts | Mocked MongoDB/rate-limit/upstream tests verify invalid usage ID/category rejection, successful usage update/count, feedback without session ID, and Challonge fixture import through the fixed host. These are **not** live database or Challonge success tests. |
| Mobile/responsive browser | Chrome at 320, 390, 768, 1440px across home, guide index, new guide, privacy and all three tools: 28 checks, no horizontal overflow. Homepage screenshot visually inspected. No uncaught JS exceptions during this route/consent run. |
| Consent in browser | Optional controls start off; dialog opens, Escape closes and returns focus; preferences reopen after rejection; rejection causes no usage/optional-vendor request; accepting enables usage POST; revocation deletes local identifier. No AdSense requests observed. GA is not configured locally, so live GA vendor behavior is not fully verified. |
| Deck editor/export | Changed to 6G, verified six editors, switched a build to CX, downloaded an actual deck JPG. Unit tests cover non-repeating selectable part IDs and integrated ratchets. |
| Card, pub mat, winners | Switched all three modes and downloaded three actual JPGs. All four exported files including deck had JPEG signatures and non-empty data. Full artistic/template-by-template comparisons were not performed. |
| Background remover | Uploaded a synthetic test PNG; model fetch failed with Chrome `ERR_ECH_FALLBACK_CERTIFICATE_INVALID` at staticimgly.com, then the existing error/retry UI appeared. Successful model processing/refinement/PNG export remains unverified; TLS verification was not bypassed. |
| Login/register/dashboard/profile/private profile/tournament history/forum/loadout history/stats/admin/auth/authz | Not present in this repository; not fabricated or claimed tested. The actual tool's deck controls and match-card exports were tested as above. |
| Production hosts | Eight read-only host/path checks above; no deployment performed. |

Test artifacts are saved under `/tmp/byleandro-*-results.json`, screenshots under `/tmp/byleandro-mobile.png` and `/tmp/byleandro-desktop.png`, and exported fixtures under `/tmp/byleandro-editor-downloads/`. These are local verification artifacts, not public content.

Repeatable commands: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`; start production server on port 3100, then `npm run test:routes`. `tests/browser.mjs` and `tests/editor-browser.mjs` use Chrome debugging port 9223 and modern Node with built-in WebSocket (this environment: Node 24.18.0). Production package declares Node 20; repeat CI checks on its configured runtime. `tests/hosts.mjs` performs read-only live host checks.

## 6. Ad placement report

**Currently eligible for delivery: none.** No ad renderer is installed. `lib/ad-policy.ts` explicitly keeps approved routes empty; tests confirm default denial for editorial, unknown, private, reported, deleted, empty, error and UGC states.

**Candidates for later human placement review:** the six article detail pages listed in `AD_REVIEW_CANDIDATES`. Candidate status is not delivery authorization. A real consent adapter, manually reviewed placement and explicit route approval are all necessary.

**Excluded:** every editor, homepage, article index, FAQ, policies, contact/about/changelog, APIs, missing/error pages, and future unmoderated UGC. Reasons include tool controls, user images, insufficient editorial placement context, or system/support purpose. No overlays, ads disguised as buttons, or speculative ad slots were added. See [content quality and advertising integration contract](content-quality-gate.md).

## 7. Remaining risks and human review

1. Deploy and validate the final build on the intended production host. Search Console indexing, AdSense account diagnostics, exact rejected URLs and field Core Web Vitals were unavailable.
2. Configure and test a real advertising CMP and manual placements before enabling ads. The existing custom analytics preferences are not a certified CMP. Verify regional signals, withdrawal, SPA navigation, Auto ads exclusions and reserved slot space. Ads may remain paused during the content review process.
3. Confirm DNS/Amplify host inventory and replace the live apex 302 with a permanent redirect at the layer that actually handles it. Verify alternate HTTP/www/trailing-slash/query behavior after deployment.
4. Verify database-backed feedback/usage and successful live Challonge imports with deployment credentials. Existing rate-limit DB acquisition occurs before route try/catch, so database outages can still produce a framework error response. No schema or rate-limit logic was changed here.
5. Retest background-removal success on a network/device that can validate and download IMG.LY resources. Check real photo refinement/restore/undo/PNG export, mobile memory use, and service CSP behavior.
6. Owner must confirm biography, article authorship and publication dates, tournament-rule claims, catalog accuracy, and rights to part images and logos. No credentials, partnerships, reviews, ratings or activity data were invented.
7. Review privacy retention practices and provider disclosures against actual hosting/account setup. Application usage/feedback records have no automatic deletion schedule; the updated policy says so. Historical records are not automatically erased by withdrawing browser consent.
8. Native dialog behavior and screenshots were checked in Chrome only. Test Safari/iOS, screen readers, image-editor gestures and all important template combinations. No field CWV improvement or full accessibility conformance is asserted.

## 8. Pre-review checklist

- [ ] Deploy this build; verify all 17 intended URLs, robots, sitemap, query canonicals and a real missing URL on production.
- [ ] Confirm every first-party production host from DNS and hosting configuration; verify permanent apex redirect and security headers.
- [ ] Read each guide as a user; verify instructions, part terminology, authorship/dates and image rights.
- [ ] Complete a manual card, Challonge import, poster, winner graphic and deck export on desktop and phone.
- [ ] Complete background removal, correction and transparent PNG export on a network with working model downloads.
- [ ] Submit feedback and verify usage/database behavior with both acceptance and rejection; verify service outage handling.
- [ ] Test optional storage blocked, new/returning visitor choices, revocation, keyboard navigation, Safari/iOS and screen-reader operation.
- [ ] Keep ads paused until certified consent integration and placements are reviewed; verify no vendor delivery on excluded routes or before valid consent.
- [ ] Review AdSense Auto ads settings, regional messages and any external deployment scripts that may inject ads independently of this repository.
- [ ] Check Search Console indexing and field Core Web Vitals; resolve observed errors rather than targeting an artificial score.
- [ ] Confirm support email works and privacy/terms accurately reflect production practices.
- [ ] Request AdSense review only after the deployed site and relevant account-side requirements have been manually checked.
