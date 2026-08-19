import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/site/info-page";
import { SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who builds byleandro.space, why it exists, and how organizers can use its tools.",
  alternates: { canonical: "/about" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leandro",
  url: `${SITE_URL}/about`,
  sameAs: [`mailto:${SUPPORT_EMAIL}`],
  jobTitle: "Developer",
};

export default function AboutPage() {
  return (
    <InfoPage
      title="About this project"
      intro="byleandro.space is a free, browser-based toolkit for Beyblade X tournament organizers and players — result cards, pub mats, winner posts, a background remover, and a deck builder — built and maintained by one developer, Leandro."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <InfoSection title="Who's behind it">
        <p>
          I&apos;m Leandro, a developer who also plays and helps out around Beyblade X locals.
          This site started because I kept hitting the same problem on event day: I needed a
          clean result card or pub mat fast, and opening a full design app between rounds wasn&apos;t
          realistic. So I built a tool that does just that, and it grew from there into the
          deck builder and background remover as the same day-of-event problems kept coming up.
        </p>
      </InfoSection>
      <InfoSection title="Why it exists">
        <p>
          Event results often live in spreadsheets, brackets, and chat messages. This project
          turns those details into consistent, shareable cards instead. It focuses on result
          cards, winner posts, promotional pub mats, and the utilities that support making
          them — background removal for clean photos and logos, and a Beyblade X deck builder for
          documenting the combos players actually used.
        </p>
      </InfoSection>
      <InfoSection title="How to use it">
        <p>
          Choose a template, enter verified event details, add images you are allowed to use, and
          inspect the live preview before exporting. The organizer remains responsible for the
          accuracy of results and permission to publish names, photos, and logos. The{" "}
          <a className="text-primary underline" href="/articles">articles</a> section has more
          detailed guides on deck building, tournament formats, and Challonge import if you want
          the fuller picture.
        </p>
      </InfoSection>
      <InfoSection title="Independent project">
        <p>
          This is an independent, community-built tool. It is not affiliated with Challonge,
          Google, Takara Tomy, Hasbro, or the tournament venues represented in user-created
          graphics.
        </p>
      </InfoSection>
      <InfoSection title="Support and updates">
        <p>
          Questions or bug reports go to{" "}
          <a className="text-primary underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          . See the <a className="text-primary underline" href="/changelog">changelog</a> for
          recent updates, or the <a className="text-primary underline" href="/faq">FAQ</a> for
          common questions.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
