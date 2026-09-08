export const CONSENT_KEY = "cookie-consent-v2";
export const CONSENT_EVENT = "site-consent-change";
export const USAGE_KEY = "leandro-tool-session-id";
export type ConsentChoice = { analytics: boolean; decidedAt: string };

export function parseConsent(raw: string | null): ConsentChoice | null {
  try {
    const value = JSON.parse(raw || "null");
    const decidedAt = Date.parse(value?.decidedAt);
    if (typeof value?.analytics !== "boolean" || !Number.isFinite(decidedAt)
      || decidedAt > Date.now() || Date.now() - decidedAt > 180 * 86400000) return null;
    return { analytics: value.analytics, decidedAt: value.decidedAt };
  } catch { return null; }
}

export function readConsent(): ConsentChoice | null {
  try { return parseConsent(window.localStorage.getItem(CONSENT_KEY)); }
  catch { return null; }
}

export function analyticsAllowed(): boolean {
  return readConsent()?.analytics === true;
}
