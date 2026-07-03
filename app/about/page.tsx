import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/site/info-page";

export const metadata: Metadata = { title: "About | Leandro's Tournament Card Generator", description: "Why the free tournament card generator exists and how organizers can use it." };

export default function AboutPage() {
  return <InfoPage title="About this project" intro="Leandro's Tournament Card Generator is a free set of browser-based tools for tournament organizers and players who need clear event graphics without a full design workflow.">
    <InfoSection title="Why it exists"><p>Event results often live in spreadsheets, brackets, and chat messages. This project turns those details into consistent cards that are easier to share and archive. It focuses on result cards, winner posts, promotional pub mats, and related image utilities.</p></InfoSection>
    <InfoSection title="How to use it"><p>Choose a template, enter verified event details, add images you are allowed to use, and inspect the live preview before exporting. The organizer remains responsible for the accuracy of results and permission to publish names, photos, and logos.</p></InfoSection>
    <InfoSection title="Independent project"><p>This is an independent community tool. It is not affiliated with Challonge, Google, Takara Tomy, Hasbro, or tournament venues represented in user-created graphics.</p></InfoSection>
  </InfoPage>;
}
