import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/site/info-page";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact and feedback options for the tournament card generator.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <InfoPage title="Contact and feedback" intro="Report a problem, suggest an improvement, or ask a privacy question through the feedback form built into the card generator, or email us directly.">
    <InfoSection title="Email"><p>For direct support, privacy requests, or press inquiries, email <a className="text-primary underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p></InfoSection>
    <InfoSection title="Send feedback"><p>Open the <a className="text-primary underline" href="/tool">card generator</a>, select Feedback, describe the issue, and optionally include contact details if you want a reply. For a bug, include the template, browser, and steps that reproduce it.</p></InfoSection>
    <InfoSection title="Content corrections"><p>If a guide or tool label is inaccurate, identify the page and quote the wording that should change. Do not send passwords, private tournament records, or sensitive personal information.</p></InfoSection>
    <InfoSection title="Response expectations"><p>This is an independently maintained project, so replies are not guaranteed or immediate. Clear reports with reproducible steps are the easiest to investigate.</p></InfoSection>
  </InfoPage>;
}
