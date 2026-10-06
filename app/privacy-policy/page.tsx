import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privacy Policy",
  "How BYLD SPACE handles project inquiries and website information.",
  "/privacy-policy",
);
export default function Page() {
  return (
    <ContentPage
      eyebrow="SITE INFORMATION · UPDATED OCTOBER 6, 2026"
      title="Privacy Policy"
      intro="How BYLD SPACE handles project inquiries and website information."
    >
      <div className="prose-content">
        <section>
          <h2>Project inquiries</h2>
          <p>
            The contact form prepares a message in your email application; it
            does not submit the form to a website database. When you send that
            email, we receive the name, email address, company, project
            description, and optional budget and timeline you provide. We use
            these details to respond and discuss your request.
          </p>
        </section>
        <section>
          <h2>Information to avoid sending</h2>
          <p>
            Do not include passwords, production credentials, employee records,
            or confidential financial and customer data in an initial inquiry.
            Use redacted examples to explain your requirements.
          </p>
        </section>
        <section>
          <h2>Service providers</h2>
          <p>
            Email is processed by the email providers used by you and by us.
            Website hosting providers may process technical request information
            such as IP addresses, browser information, and access logs to
            deliver and secure the website. Facebook handles information under
            its own policies when you visit our page there.
          </p>
        </section>
        <section>
          <h2>Cookies, analytics, and advertising</h2>
          <p>
            This version of the website does not load Google AdSense or
            analytics scripts and does not set application cookies for
            advertising or analytics. If advertising or analytics is introduced,
            this notice must be updated with the relevant providers, data uses,
            and available choices before those services are enabled.
          </p>
        </section>
        <section>
          <h2>Retention and requests</h2>
          <p>
            We keep project correspondence as needed to discuss or manage the
            engagement and meet applicable obligations. To ask about access,
            correction, or deletion of your inquiry information, email
            paulleandrolanot@gmail.com. We do not sell project inquiry
            information.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            Paul Leandro Lanot is the project contact for BYLD SPACE. Questions
            about this notice can be sent to paulleandrolanot@gmail.com.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
