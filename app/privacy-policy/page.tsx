import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy guidelines. Learn how BYLD SPACE collects, stores, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="relative py-16 border-b border-border bg-gradient-to-b from-black to-neutral-950">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Link 
            href="/" 
            className="text-xs font-mono tracking-widest text-secondaryText hover:text-foreground mb-4 inline-block transition-colors"
          >
            &larr; BACK TO HOME
          </Link>
          <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-foreground mb-3">
            Privacy Policy
          </h1>
          <p className="text-secondaryText text-xs font-mono">
            LAST REVISED: JANUARY 15, 2025
          </p>
        </div>
      </section>

      {/* Policy Text */}
      <section className="py-16 container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="font-sans text-secondaryText text-sm leading-relaxed space-y-8 max-w-3xl">
          <p>
            At BYLD SPACE, we value transparency and privacy. This Privacy Policy outlines how we collect, store, and utilize your personal details when you interact with our website, use our tools, or request software consultations.
          </p>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            1. Information We Collect
          </h2>
          <p>
            We only collect information that is explicitly provided by you or necessary to maintain the fundamental operations of our site:
          </p>
          <ul className="list-mono list-disc pl-6 space-y-2">
            <li>
              <strong>Contact Details:</strong> Your name, business name, and email address when you voluntarily submit a project inquiry on our contact form.
            </li>
            <li>
              <strong>Usage Indicators:</strong> Anonymous server access logs and performance metrics (such as page loading delays and error responses) to ensure our system remains secure and optimized.
            </li>
          </ul>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            2. How We Utilize Your Data
          </h2>
          <p>
            We use your provided personal details exclusively for direct communications. We do not sell, rent, or lease customer lists to third parties:
          </p>
          <ul className="list-mono list-disc pl-6 space-y-2">
            <li>To reply to your custom software development or roadmap inquiries.</li>
            <li>To manage ongoing system maintenance agreements and code handovers.</li>
            <li>To inspect and diagnose technical server crashes or performance bottlenecks.</li>
          </ul>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            3. Data Safety and Protection
          </h2>
          <p>
            Your information is stored inside secure, encrypted databases protected by isolated cloud firewalls. We restrict data access to essential team members who require your contact details to reply to inquiries or maintain code repositories.
          </p>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            4. Cookie Consent Management
          </h2>
          <p>
            We do not use tracking or behavioral advertising scripts on our core SPA layouts. Any performance metrics gathered are strictly anonymized and run locally without transmitting tracking markers to third-party ad brokers. For details, view our <Link href="/cookie-policy" className="text-foreground hover:underline">Cookie Policy</Link>.
          </p>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            5. Your Rights and Autonomy
          </h2>
          <p>
            You retain complete autonomy over your personal information. At any point, you may request that we export, modify, or permanently purge your contact details and communication logs from our active databases. To initiate a request, contact us using the information provided below.
          </p>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            6. Contact Details
          </h2>
          <p>
            If you have questions regarding this policy or our data safety workflows, reach out directly:
          </p>
          <div className="p-4 border border-border bg-surface font-mono text-xs text-foreground w-fit rounded-sm">
            BYLD SPACE Compliance Team<br />
            Email: info@byldspace.com
          </div>
        </div>
      </section>
    </div>
  );
}
