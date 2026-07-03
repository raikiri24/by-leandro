import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/site/info-page";

export const metadata: Metadata = { title: "Privacy Policy | Leandro's Tournament Card Generator", description: "Privacy information for the tournament card generator and image tools." };

export default function PrivacyPage() {
  return <InfoPage title="Privacy policy" intro="This page explains what information the site handles when you use its tools. Last updated July 4, 2026.">
    <InfoSection title="Images and card content"><p>Card previews and background removal are performed in your browser. Do not enter private information or use images you do not have permission to process and publish.</p></InfoSection>
    <InfoSection title="Service data"><p>No account or sign-in is required to use the site. The site may retain anonymous usage totals and feedback you deliberately submit, including optional contact information.</p></InfoSection>
    <InfoSection title="Advertising and cookies"><p>Google and its partners may use cookies or similar technologies to deliver and measure ads on eligible content pages. You can manage advertising preferences through Google&apos;s ad settings and restrict cookies through your browser.</p></InfoSection>
    <InfoSection title="Third-party services"><p>The site may connect to database, tournament-import, hosting, analytics, or advertising providers. Those providers process data under their own terms and privacy policies.</p></InfoSection>
    <InfoSection title="Questions"><p>For privacy questions or deletion requests, use the contact page and include enough detail to identify the relevant feedback submission.</p></InfoSection>
  </InfoPage>;
}
