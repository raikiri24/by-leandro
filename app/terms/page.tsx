import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/site/info-page";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for the tournament card generator and image tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms of Service"
      intro="These terms cover use of Leandro's Tournament Card Generator, its background remover, and its deck builder. Last updated July 16, 2026."
    >
      <InfoSection title="Acceptance of these terms">
        <p>
          By opening or using this site, you agree to these terms. If you do not agree, do not
          use the site. This is a free, independently maintained project and is provided
          &quot;as is&quot; without warranty of any kind.
        </p>
      </InfoSection>

      <InfoSection title="What the site does">
        <p>
          The tool generates tournament result cards, pub mats, and winner posts from details
          you enter or import from Challonge, removes image backgrounds in your browser, and
          builds Beyblade deck graphics from public part images. Card rendering and background
          removal run locally in your browser; images are not uploaded to a server to be
          processed.
        </p>
      </InfoSection>

      <InfoSection title="Your responsibility for content you create">
        <p>
          You are solely responsible for the accuracy of results, event details, and images you
          enter into the tool, and for having the rights or permission needed to use any player
          photos, logos, or artwork you include in an exported graphic. Do not use the site to
          create content that is defamatory, harassing, infringing, or otherwise unlawful. You
          may not use the tool to impersonate a person, organization, or tournament you are not
          authorized to represent.
        </p>
      </InfoSection>

      <InfoSection title="Feedback and submitted information">
        <p>
          If you submit feedback, bug reports, or contact details through the built-in feedback
          form, you grant us the right to use that information to maintain and improve the
          site. Do not submit passwords, payment details, or other sensitive personal
          information through the feedback form.
        </p>
      </InfoSection>

      <InfoSection title="Third-party services">
        <p>
          The site may connect to Challonge to import tournament data, and uses Google AdSense
          and, where enabled, Google Analytics. Those services operate under their own terms and
          privacy policies, which are outside our control. See the{" "}
          <a className="text-primary underline" href="/privacy">
            privacy policy
          </a>{" "}
          for details on cookies and advertising.
        </p>
      </InfoSection>

      <InfoSection title="Acceptable use">
        <p>
          Do not attempt to disrupt the site, scrape it at abusive volume, bypass rate limits or
          security controls, or use it to distribute malware or unlawful content. We may block
          access from sources that abuse the service.
        </p>
      </InfoSection>

      <InfoSection title="No warranty and limitation of liability">
        <p>
          The site is provided free of charge, without warranties of any kind, express or
          implied, including fitness for a particular purpose or uninterrupted availability. To
          the fullest extent permitted by law, we are not liable for any damages arising from
          your use of, or inability to use, the site or any graphic it produces.
        </p>
      </InfoSection>

      <InfoSection title="Changes to these terms">
        <p>
          These terms may be updated as the tool changes. Continued use of the site after an
          update means you accept the revised terms. Material changes will be reflected by
          updating the date at the top of this page.
        </p>
      </InfoSection>

      <InfoSection title="Contact">
        <p>
          Questions about these terms can be sent to{" "}
          <a className="text-primary underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          or through the{" "}
          <a className="text-primary underline" href="/contact">
            contact page
          </a>
          .
        </p>
      </InfoSection>
    </InfoPage>
  );
}
