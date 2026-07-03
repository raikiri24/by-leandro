import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/site/info-page";

export const metadata: Metadata = { title: "Contact | Leandro's Tournament Card Generator", description: "Contact and feedback options for the tournament card generator." };

export default function ContactPage() {
  return <InfoPage title="Contact and feedback" intro="Report a problem, suggest an improvement, or ask a privacy question through the feedback form built into the card generator.">
    <InfoSection title="Send feedback"><p>Open the <a className="text-primary underline" href="/tool">card generator</a>, select Feedback, describe the issue, and optionally include contact details if you want a reply. For a bug, include the template, browser, and steps that reproduce it.</p></InfoSection>
    <InfoSection title="Content corrections"><p>If a guide or tool label is inaccurate, identify the page and quote the wording that should change. Do not send passwords, private tournament records, or sensitive personal information.</p></InfoSection>
    <InfoSection title="Response expectations"><p>This is an independently maintained project, so replies are not guaranteed or immediate. Clear reports with reproducible steps are the easiest to investigate.</p></InfoSection>
  </InfoPage>;
}
