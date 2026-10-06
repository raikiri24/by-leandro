import { ContentPage } from "@/components/site/ContentPage";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
const service = services.find((s) => s.slug === "integrations-maintenance")!;
export const metadata = pageMetadata(
  service.title,
  service.intro,
  "/services/integrations-maintenance",
);
export default function Page() {
  return (
    <ContentPage
      eyebrow="SOFTWARE SERVICES"
      title={service.title}
      intro={service.intro}
    >
      <section className="prose-content">
        <h2>What we can develop</h2>
        <ul>
          {service.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <h2>How to scope your request</h2>
        <p>{service.detail}</p>
        <h2>What to include in your requirements</h2>
        <p>
          Describe the current process, the people using it, and the changes you
          need. List required screens, reports, approvals, and integrations.
          Provide sample data with confidential information removed.
        </p>
        <h2>Agreeing on delivery</h2>
        <p>
          Before work starts, we discuss the priorities, acceptance criteria,
          timeline, and budget. Deployment, source code handover, documentation,
          and ongoing support should be included in the agreed scope. Additional
          features can be planned as separate milestones.
        </p>
      </section>
    </ContentPage>
  );
}
