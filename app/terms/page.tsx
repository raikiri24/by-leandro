import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Website Terms",
  "Information about using this website and requesting software work.",
  "/terms",
);
export default function Page() {
  return (
    <ContentPage
      eyebrow="SITE INFORMATION · UPDATED OCTOBER 6, 2026"
      title="Website Terms"
      intro="Information about using this website and requesting software work."
    >
      <div className="prose-content">
        <section>
          <h2>Website information</h2>
          <p>
            This website describes BYLD SPACE’s software development services
            and provides general project planning guidance. Sending an inquiry
            does not create a development agreement or confirm a price or
            delivery date.
          </p>
        </section>
        <section>
          <h2>Project agreements</h2>
          <p>
            Scope, milestones, payment, acceptance criteria, source code
            ownership, third-party licenses, deployment, and support are defined
            in the agreement for each project. Any changes to requirements
            should be discussed and agreed before implementation.
          </p>
        </section>
        <section>
          <h2>Responsible use</h2>
          <p>
            Use our contact channels for legitimate inquiries. Do not
            impersonate others, send spam, attempt unauthorized access, or
            submit confidential information you are not permitted to share.
          </p>
        </section>
        <section>
          <h2>External links and availability</h2>
          <p>
            External websites operate under their own terms. Website content may
            be updated as services change. Project commitments are governed by
            the agreed project terms.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            For questions or a project discussion, email
            paulleandrolanot@gmail.com.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
