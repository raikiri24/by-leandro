import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Cookie Policy",
  "Cookies and third-party services on this website.",
  "/cookie-policy",
);
export default function Page() {
  return (
    <ContentPage
      eyebrow="SITE INFORMATION · UPDATED OCTOBER 6, 2026"
      title="Cookie Policy"
      intro="Cookies and third-party services on this website."
    >
      <div className="prose-content">
        <section>
          <h2>Current website behavior</h2>
          <p>
            This version of the website does not set application cookies for
            advertising, analytics, user accounts, or preferences. It does not
            load AdSense or Google Analytics scripts.
          </p>
        </section>
        <section>
          <h2>External services</h2>
          <p>
            The inquiry form opens your email application. Links to Facebook
            open a separate service. Those providers may use their own cookies
            and technologies under their own policies.
          </p>
        </section>
        <section>
          <h2>Future changes</h2>
          <p>
            Before introducing advertising or analytics, we must update this
            policy and implement the applicable disclosures and consent
            controls. Browser settings also allow you to inspect, block, and
            delete cookies.
          </p>
        </section>
        <section>
          <h2>Questions</h2>
          <p>
            Contact paulleandrolanot@gmail.com for questions about this
            website’s use of cookies.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
