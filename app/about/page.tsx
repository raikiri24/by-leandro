import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About BYLD SPACE",
  "BYLD SPACE develops custom software and business systems. Contact Paul Leandro Lanot to discuss your application or ERP requirements.",
  "/about",
);
export default function Page() {
  return (
    <ContentPage
      eyebrow="ABOUT BYLD SPACE"
      title="Practical software. Clear requirements."
      intro="BYLD SPACE is a software development service for businesses and people who need applications built around their processes."
    >
      <div className="prose-content">
        <h2>What we do</h2>
        <p>
          We accommodate new software projects, changes to existing
          applications, integrations, and business automation requests. Our
          services include custom ERP development with HRIS, accounting, and
          warehouse modules.
        </p>
        <h2>How we work with you</h2>
        <p>
          We start with your requirements: the problem, the people involved, and
          the result you need. Scope, deliverables, timelines, ownership, and
          support are discussed before you commit to development. Requests can
          be broken into milestones so the most useful workflows are addressed
          first.
        </p>
        <h2>Your project contact</h2>
        <p>
          Paul Leandro Lanot is the contact for project inquiries at BYLD SPACE.
          Email{" "}
          <a href="mailto:paulleandrolanot@gmail.com">
            paulleandrolanot@gmail.com
          </a>{" "}
          or use our contact page to prepare an inquiry. You can also reach BYLD
          SPACE through its{" "}
          <a
            href="https://www.facebook.com/byld.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook page
          </a>
          .
        </p>
      </div>
    </ContentPage>
  );
}
