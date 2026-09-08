"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { CONSENT_EVENT, CONSENT_KEY, USAGE_KEY, readConsent, type ConsentChoice } from "@/lib/consent";

const configuredId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const GA_ID = /^G-[A-Z0-9]+$/.test(configuredId) ? configuredId : "";

function updateSignals(analytics: boolean) {
  const win = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (GA_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !analytics;
  win.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  });
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const [storageNotice, setStorageNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function sync() {
      const stored = readConsent();
      setConsent(stored);
      updateSignals(stored?.analytics === true);
    }
    sync();
    setReady(true);
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) sync();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function openPreferences() {
    returnFocus.current = document.activeElement as HTMLElement;
    setDraftAnalytics(consent?.analytics ?? false);
    dialog.current?.showModal();
  }

  function save(analytics: boolean) {
    const choice = { analytics, decidedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
      if (!analytics) window.localStorage.removeItem(USAGE_KEY);
      setStorageNotice("");
    } catch {
      // Fail closed when the browser cannot persist a reliable preference.
      choice.analytics = false;
      setStorageNotice("Your browser could not save preferences. Optional analytics remains off.");
    }
    updateSignals(choice.analytics);
    setConsent(choice);
    dialog.current?.close();
  }

  if (!ready) return null;

  return <>
    {consent?.analytics && GA_ID && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.gtag('js', new Date()); window.gtag('config', '${GA_ID}');`}
      </Script>
    </>}
    {!consent && <section aria-label="Cookie choices" className="border-t border-white/15 bg-[#0c0c0c] px-5 py-6 text-white">
      <div className="mx-auto max-w-5xl space-y-4">
        <p className="max-w-3xl text-sm leading-6 text-white/80">Optional analytics helps measure tool visits and usage. Your choice is stored in this browser. Advertising is currently paused. You can use every tool without analytics. <a href="/privacy" className="text-primary underline">Privacy and storage details</a>.</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => save(false)}>Reject optional analytics</Button>
          <Button variant="outline" onClick={openPreferences}>Manage preferences</Button>
          <Button onClick={() => save(true)}>Accept analytics</Button>
        </div>
      </div>
    </section>}
    <div className="border-t border-white/10 bg-[#090909] px-5 py-4 text-center text-sm text-white/80">
      <button type="button" onClick={openPreferences} className="min-h-11 px-3 text-primary underline">Cookie preferences</button>
      {storageNotice && <p role="status">{storageNotice}</p>}
    </div>
    <dialog ref={dialog} aria-labelledby="cookie-preferences-title" onClose={() => returnFocus.current?.focus()}
      className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg border border-white/20 bg-[#0c0c0c] p-6 text-white backdrop:bg-black/70">
      <h2 id="cookie-preferences-title" className="font-condensed text-xl font-black">Cookie preferences</h2>
      <p className="mt-3 text-sm leading-6 text-white/80">We store your choice for up to 180 days. Advertising is paused; this control does not grant advertising consent.</p>
      <label className="my-6 flex items-center justify-between gap-4 text-sm">
        Allow optional analytics and tool usage measurement
        <input type="checkbox" checked={draftAnalytics} onChange={event => setDraftAnalytics(event.target.checked)} className="h-5 w-5 shrink-0" />
      </label>
      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={() => dialog.current?.close()}>Cancel</Button>
        <Button onClick={() => save(draftAnalytics)}>Save preferences</Button>
      </div>
    </dialog>
  </>;
}
