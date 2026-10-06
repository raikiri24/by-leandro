# AdSense review preparation

Reviewed against Google’s published guidance on October 6, 2026:

- https://support.google.com/adsense/answer/9335564
- https://support.google.com/adsense/answer/10015918
- https://support.google.com/webmasters/answer/9044175
- https://support.google.com/publisherpolicies/answer/11035931

## Changes in this revision

The site now focuses on custom software development, ERP (HRIS, accounting, warehouse), integrations, and maintenance. Removed unrelated tournament project content, incomplete article teasers, unsupported claims, and inconsistent publisher identity. Added a practical requirements guide and detailed service scope. Old public marketing URLs redirect to related current pages. Canonicals, robots, sitemap, social metadata, and organization structured data use NEXT_PUBLIC_SITE_URL. Sitemap modification timestamps are no longer generated on every request.

The contact form prepares an email; it does not submit to a backend. Privacy and cookie notices describe that behavior. AdSense and analytics scripts remain absent. An ads.txt declaration is not an ad-serving script or evidence of approval.

## Before requesting review

1. Deploy this revision to the actual domain registered in AdSense. Set NEXT_PUBLIC_SITE_URL to that origin and check the live sitemap, canonical URLs, redirects, and mobile navigation.
2. Confirm the service capabilities, contact identity, privacy notices, and ads.txt publisher ID are accurate for the business. Do not add testimonials, client logos, traffic counts, or case studies without authentic supporting evidence and permission.
3. Keep service details current. Add genuine project documentation or helpful demonstrations when available. Design changes cannot establish real audience interest, ongoing maintenance history, or guarantee that Google considers a service website valuable enough for ads.
4. Use an AdSense-supported ownership verification method for the registered site. This change does not connect to or modify the AdSense account.
5. In AdSense, open Sites, select the rejected site, and use the available request-review action after the live changes are verified. Follow the account’s specific instructions.
6. Before enabling ad delivery, implement the required advertising privacy disclosures and applicable consent mechanism, including a Google-certified CMP where required. Review placements so ads do not obstruct content, mimic controls, or encourage accidental clicks. Do not serve ads on error, empty, or navigation-only screens.

Google decides approval. A low-value-content decision may persist even after these changes; more wording or a page-count target is not a substitute for authentic value and users.
