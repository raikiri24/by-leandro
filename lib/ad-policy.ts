// Explicit editorial inventory only. Never infer eligibility from a URL prefix.
export const AD_REVIEW_CANDIDATES = [
  "/articles/beyblade-x-standard-vs-cx-builds",
  "/articles/beyblade-x-deck-sizes-explained",
  "/articles/beyblade-x-tournament-formats-explained",
  "/articles/challonge-import-guide-for-organizers",
  "/articles/designing-a-tournament-result-card-people-repost",
  "/articles/background-removal-and-export",
] as const;

export interface AdContext {
  path: string;
  content: "reviewed-editorial" | "ugc" | "empty" | "error" | "private" | "reported" | "deleted";
  consent: "verified-cmp-granted" | "denied" | "unknown";
  placementReviewed: boolean;
}

// Intentionally empty until a certified CMP and explicit, tested placements exist.
// Adding content or changing the local cookie checkbox cannot turn advertising on.
export const APPROVED_AD_ROUTES: readonly string[] = [];

export function canShowAds(context: AdContext): boolean {
  return APPROVED_AD_ROUTES.includes(context.path)
    && (AD_REVIEW_CANDIDATES as readonly string[]).includes(context.path)
    && context.content === "reviewed-editorial"
    && context.consent === "verified-cmp-granted"
    && context.placementReviewed;
}
