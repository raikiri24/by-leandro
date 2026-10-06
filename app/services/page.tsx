import Link from "next/link";
import { ContentPage } from "@/components/site/ContentPage";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Software development services",
  "Custom applications, ERP systems including HRIS, accounting and warehouse modules, integrations and maintenance from BYLD SPACE.",
  "/services",
);
export default function Page() {
  return (
    <ContentPage
      eyebrow="OUR SERVICES"
      title="Built to fit your requirements."
      intro="We accommodate software projects, feature requests, and improvements to existing applications. Each engagement starts by understanding what your business needs."
    >
      <div className="service-grid">
        {services.map((s) => (
          <article className="service-card" key={s.slug}>
            <h2>{s.title}</h2>
            <p>{s.intro}</p>
            <ul>
              {s.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link href={`/services/${s.slug}`}>View service details →</Link>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
