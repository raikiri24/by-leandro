import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read our terms of service and conditions. Understand the rules governing the use of BYLD SPACE's website and software consults.",
};

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-secondaryText text-xs font-mono">
            EFFECTIVE DATE: JANUARY 15, 2025
          </p>
        </div>
      </section>

      {/* Terms Text */}
      <section className="py-16 container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="font-sans text-secondaryText text-sm leading-relaxed space-y-8 max-w-3xl">
          <p>
            Welcome to BYLD SPACE. By browsing this website, scheduling technical consultation sessions, or entering software development agreements with us, you agree to be bound by the following terms and conditions.
          </p>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            1. Scope of Strategic Advisory
          </h2>
          <p>
            The technical articles, checklists, code snippets, and audit blueprints displayed on this site are intended for general educational and strategic informational purposes only. No technical opinion or proposal constitutes a binding development contract until a formal Statement of Work (SOW) is explicitly signed by both parties.
          </p>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            2. Intellectual Property Rights
          </h2>
          <p>
            The layout, graphics, content, CSS code variables, brand elements, and images of this website are the sole property of BYLD SPACE. You may not duplicate, copy, or scrape assets without prior written consent.
          </p>
          <p>
            <strong>Client Work Ownership:</strong> For our paid custom software development clients, complete ownership of physical codebases, databases, and deployment keys is governed by individual project agreements and fully handed over upon project payment completion.
          </p>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            3. Prohibited Use of Public Assets
          </h2>
          <p>
            When utilizing our public pages, sitemaps, contact channels, or open-source repositories, you agree not to:
          </p>
          <ul className="list-mono list-disc pl-6 space-y-2">
            <li>Inject malicious scripts, exploit vulnerabilities, or run denial-of-service (DoS) scripts against our Next.js edge servers.</li>
            <li>Submit fabricated or simulated contact data, or use our email channels to distribute unsolicited commercial messaging (spam).</li>
            <li>Impersonate any firm, brand, or individual when requesting project consultations.</li>
          </ul>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            4. Limitation of Liability
          </h2>
          <p>
            Under no circumstances shall BYLD SPACE, its developers, or its directors be held liable for any indirect, incidental, or special software damages—including but not limited to server downtime, lost revenue, or database exposure—arising out of your use of this website, our public guidelines, or our open-source tools.
          </p>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            5. Modifications of Terms
          </h2>
          <p>
            We reserve the right to revise or update these Terms of Service at any time without prior announcement. Your continued browsing of the website represents your binding agreement with the modified terms.
          </p>

          <h2 className="font-display text-lg font-bold text-foreground tracking-tight pt-4">
            6. Governing Jurisdiction
          </h2>
          <p>
            These terms and conditions are governed by and construed in accordance with local regulations, and any dispute arising from your use of this website shall be settled within competent regional courts.
          </p>
        </div>
      </section>
    </div>
  );
}
