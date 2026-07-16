"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { ADSENSE_CLIENT_ID } from "@/lib/site";

type ConsentChoice = {
  analytics: boolean;
  ads: boolean;
  decidedAt: string;
};

const STORAGE_KEY = "cookie-consent-v1";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function readStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.analytics === "boolean" && typeof parsed?.ads === "boolean") {
      return parsed as ConsentChoice;
    }
    return null;
  } catch {
    return null;
  }
}

function pushConsentUpdate(consent: { analytics: boolean; ads: boolean }) {
  const win = window as typeof window & { gtag?: (...args: unknown[]) => void };
  win.gtag?.("consent", "update", {
    ad_storage: consent.ads ? "granted" : "denied",
    ad_user_data: consent.ads ? "granted" : "denied",
    ad_personalization: consent.ads ? "granted" : "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
  });
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(true);
  const [draftAds, setDraftAds] = useState(true);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setReady(true);
    if (stored) pushConsentUpdate(stored);
  }, []);

  function save(next: { analytics: boolean; ads: boolean }) {
    const choice: ConsentChoice = { ...next, decidedAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    pushConsentUpdate(choice);
    setConsent(choice);
    setShowPreferences(false);
  }

  if (!ready) return null;

  return (
    <>
      {consent?.ads && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      {consent?.analytics && GA_MEASUREMENT_ID && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.gtag('js', new Date()); window.gtag('config', '${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}

      {!consent && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-white/15 bg-[#0c0c0c]/97 px-5 py-5 shadow-[0_-8px_30px_rgba(0,0,0,.5)] backdrop-blur sm:px-8"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-white/75">
              This site uses cookies for basic analytics and, if you allow it, to show
              personalized ads through Google AdSense. You can change your choice anytime
              from the Privacy page.{" "}
              <a href="/privacy" className="text-primary underline underline-offset-2">
                Read the privacy policy
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="border-white/20 bg-white/5"
                onClick={() => save({ analytics: false, ads: false })}
              >
                Reject non-essential
              </Button>
              <Button
                variant="outline"
                className="border-white/20 bg-white/5"
                onClick={() => {
                  setDraftAnalytics(true);
                  setDraftAds(true);
                  setShowPreferences(true);
                }}
              >
                Manage preferences
              </Button>
              <Button onClick={() => save({ analytics: true, ads: true })}>Accept all</Button>
            </div>
          </div>
        </div>
      )}

      {showPreferences && (
        <div className="fixed inset-0 z-[95] flex items-end justify-center bg-black/60 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-lg border border-white/15 bg-[#0c0c0c] p-6 shadow-2xl">
            <h2 className="font-condensed text-lg font-black uppercase text-white">
              Cookie preferences
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Essential cookies are always on because the site needs them to function. Choose
              which optional categories to allow.
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-start justify-between gap-4 rounded-md border border-white/10 bg-white/[0.03] p-3">
                <div>
                  <p className="text-sm font-semibold text-white">Essential</p>
                  <p className="text-xs text-white/55">
                    Required for the site to work. Always on.
                  </p>
                </div>
                <input type="checkbox" checked disabled aria-label="Essential cookies (always on)" className="mt-1 h-4 w-4" />
              </div>

              <label className="flex items-start justify-between gap-4 rounded-md border border-white/10 bg-white/[0.03] p-3">
                <div>
                  <p className="text-sm font-semibold text-white">Analytics</p>
                  <p className="text-xs text-white/55">
                    Helps us understand how the tool is used, via Google Analytics.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={draftAnalytics}
                  onChange={(event) => setDraftAnalytics(event.target.checked)}
                  aria-label="Allow analytics cookies"
                  className="mt-1 h-4 w-4"
                />
              </label>

              <label className="flex items-start justify-between gap-4 rounded-md border border-white/10 bg-white/[0.03] p-3">
                <div>
                  <p className="text-sm font-semibold text-white">Advertising</p>
                  <p className="text-xs text-white/55">
                    Allows Google AdSense to show ads, personalized if you allow it.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={draftAds}
                  onChange={(event) => setDraftAds(event.target.checked)}
                  aria-label="Allow advertising cookies"
                  className="mt-1 h-4 w-4"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" className="border-white/20 bg-white/5" onClick={() => setShowPreferences(false)}>
                Cancel
              </Button>
              <Button onClick={() => save({ analytics: draftAnalytics, ads: draftAds })}>
                Save preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
