import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/site/info-page";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for the tournament card generator and image tools.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <InfoPage title="Privacy policy" intro="This page explains what information the site handles when you use its tools. Last updated July 4, 2026.">
    <InfoSection title="Images and card content"><p>Card previews and background removal are performed in your browser. Do not enter private information or use images you do not have permission to process and publish.</p></InfoSection>
    <InfoSection title="Service data"><p>No account or sign-in is required to use the site. The site may retain anonymous usage totals and feedback you deliberately submit, including optional contact information.</p></InfoSection>
    <InfoSection title="Advertising and cookies"><p>This site uses Google AdSense to show ads and, where enabled, Google Analytics to measure usage. Google and its partners may use cookies or similar technologies to deliver and measure ads and analytics on eligible content pages. A cookie banner lets you accept all cookies, reject non-essential cookies, or manage analytics and advertising preferences separately the first time you visit; you can change your choice at any time by clearing the site&apos;s local storage in your browser. You can also manage advertising preferences through Google&apos;s <a className="text-primary underline" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">ad settings</a> and restrict cookies through your browser.</p></InfoSection>
    <InfoSection title="Third-party services"><p>The site may connect to database, tournament-import, hosting, analytics, or advertising providers. Those providers process data under their own terms and privacy policies.</p></InfoSection>
    <InfoSection title="Questions"><p>For privacy questions or deletion requests, email <a className="text-primary underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or use the <a className="text-primary underline" href="/contact">contact page</a> and include enough detail to identify the relevant feedback submission.</p></InfoSection>
  </InfoPage>;
}
