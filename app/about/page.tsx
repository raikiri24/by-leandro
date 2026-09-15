import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Award, Shield, Cpu,  } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the mission, values, and engineering philosophies behind BYLD SPACE. We design simple, fast, and highly reliable software solutions.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* About Hero */}
      <section className="relative py-20 border-b border-border bg-gradient-to-b from-black to-neutral-950">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <Link 
            href="/" 
            className="text-xs font-mono tracking-widest text-secondaryText hover:text-foreground mb-4 inline-block transition-colors"
          >
            &larr; BACK TO HOME
          </Link>
          <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-foreground mb-6">
            We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">BYLD SPACE</span>
          </h1>
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl leading-relaxed">
            A surgical software engineering partner. We eliminate technological jargon to help businesses and founders build fast, robust, and highly maintainable digital systems.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              OUR MISSION
            </h2>
            <h3 className="font-display text-2xl font-bold mb-6 text-foreground">
              Simplifying software delivery from core logic to deployment.
            </h3>
            <p className="text-secondaryText text-sm leading-relaxed mb-4">
              The software industry has become unnecessarily bloated. Teams spend months engineering complex microservice networks before verifying if anyone actually wants their product, and frameworks are updated so quickly that maintenance is a nightmare.
            </p>
            <p className="text-secondaryText text-sm leading-relaxed">
              We started BYLD SPACE to return to engineering fundamentals: strict types, clean local variables, secure server constraints, and highly legible layouts. We build applications with absolute architectural transparency so that your systems remain fast and simple to expand.
            </p>
          </div>

          <div className="space-y-6 bg-surface p-8 border border-border rounded-sm">
            <h3 className="font-display text-xs tracking-widest text-foreground font-bold uppercase mb-2">
              Our Non-Negotiable Standards
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">No Outsourcing</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Every module is coded, tested, and deployed in-house by our core team. We do not farm out code to third-party developers.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">100% IP Ownership</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Once milestone payments are complete, all source repositories, assets, and service accounts are immediately transferred to you.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Automated Quality Gates</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">We enforce automated unit testing, bundle optimization audits, and compliance validation before any product launch.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">OUR CORE PHILOSOPHY</h2>
            <p className="text-3xl font-display">Engineering standards we live by.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <Award className="w-8 h-8 text-foreground mb-4" />
                <h4 className="font-display text-base font-bold text-foreground mb-2">Utility Over Hype</h4>
                <p className="text-secondaryText text-xs leading-relaxed">
                  We don&apos;t advocate for complex databases or AI tools unless they represent a clear commercial outcome or labor savings for your business operations.
                </p>
              </div>
            </div>

            <div className="p-6 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <Shield className="w-8 h-8 text-foreground mb-4" />
                <h4 className="font-display text-base font-bold text-foreground mb-2">Security-by-Default</h4>
                <p className="text-secondaryText text-xs leading-relaxed">
                  We design networks behind private cloud boundaries, encrypt customer database fields, and set up automated security scans on our build triggers.
                </p>
              </div>
            </div>

            <div className="p-6 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <Cpu className="w-8 h-8 text-foreground mb-4" />
                <h4 className="font-display text-base font-bold text-foreground mb-2">Pristine Maintainability</h4>
                <p className="text-secondaryText text-xs leading-relaxed">
                  We write modular, heavily-commented TypeScript code. Sibling modules are isolated to prevent unexpected cascade breaks when you edit features later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
          Ready to build with a partner you can trust?
        </h2>
        <p className="text-secondaryText text-lg mb-10 leading-relaxed">
          Send us a message detailing your concepts, and we&apos;ll schedule a highly transparent, jargon-free consultation.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
        >
          CONNECT WITH OUR TEAM
        </Link>
      </section>
    </div>
  );
}
