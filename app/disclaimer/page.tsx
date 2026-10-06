import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Service Disclaimer",
  "How to interpret service descriptions and software examples.",
  "/disclaimer",
);
export default function Page() {
  return (
    <ContentPage
      eyebrow="SITE INFORMATION · UPDATED OCTOBER 6, 2026"
      title="Service Disclaimer"
      intro="How to interpret service descriptions and software examples."
    >
      <div className="prose-content">
        <section>
          <h2>Illustrative capabilities</h2>
          <p>
            The ERP module overview and described workflows show what can be
            scoped and developed. They are illustrative capabilities, not
            screenshots of a finished product or claims about completed client
            projects.
          </p>
        </section>
        <section>
          <h2>Project feasibility</h2>
          <p>
            Specific features, integration availability, pricing, delivery
            dates, hosting, and maintenance depend on the requirements and
            project agreement. Third-party platforms may impose access, usage,
            or licensing limits.
          </p>
        </section>
        <section>
          <h2>Business rules</h2>
          <p>
            HR, payroll, accounting, and statutory reporting rules must be
            validated by your responsible specialists. Software development
            alone does not establish legal, tax, or regulatory compliance.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Send questions and requirements to paulleandrolanot@gmail.com.</p>
        </section>
      </div>
    </ContentPage>
  );
}
