import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/site/info-page";
import { SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ & Help",
  description: "Answers to common questions about the tournament card generator, Challonge import, background remover, and deck builder.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "Is the tool actually free?",
    a: "Yes. Every feature — result cards, pub mats, winner posts, the background remover, and the deck builder — is free with no account, signup, or paywall.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. Open the tool and start creating immediately. Nothing is stored under an account because there isn't one.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "Card previews and background removal run in your browser tab. Your photos are processed locally and are not sent to a server to build the card or remove the background.",
  },
  {
    q: "How does Challonge import work?",
    a: "Paste a Challonge tournament URL or slug in the tool and it fetches participants and completed match results automatically. If a bracket is private or Challonge blocks automated access, use Manual mode to enter results yourself.",
  },
  {
    q: "Why is my Challonge import missing matches or players?",
    a: "Only completed matches are imported. Byes, unscored matches, and mid-tournament renames can also affect what shows up — check the import log the tool displays and fall back to Manual mode to correct anything missing.",
  },
  {
    q: "What image formats can I use?",
    a: "JPG, PNG, and WEBP are supported for uploads. Exports are downloaded as JPG files sized for social posts and chat apps.",
  },
  {
    q: "Can I use this for games other than Beyblade?",
    a: "Yes — the result card, pub mat, and winner post tools are generic and work for any tournament or event. The deck builder is specific to Beyblade X parts.",
  },
  {
    q: "Why do I see ads on this site?",
    a: "Ads through Google AdSense help cover hosting costs so the tool can stay free. You can control ad personalization from the cookie banner or Google's ad settings — see the Privacy Policy for details.",
  },
  {
    q: "How do I report a bug or request a feature?",
    a: "Use the feedback form inside the tool, or email us directly — both are on the Contact page.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <InfoPage
      title="FAQ & Help"
      intro="Common questions about using the card generator, importing Challonge results, the background remover, and the deck builder."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqJsonLd, url: `${SITE_URL}/faq` }) }}
      />
      {faqs.map((item) => (
        <InfoSection key={item.q} title={item.q}>
          <p>{item.a}</p>
        </InfoSection>
      ))}
      <InfoSection title="Still stuck?">
        <p>
          Email{" "}
          <a className="text-primary underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          or use the{" "}
          <a className="text-primary underline" href="/contact">
            contact page
          </a>
          .
        </p>
      </InfoSection>
    </InfoPage>
  );
}
