import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Activity, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights",
  description: "Technical checklists, optimization standards, and engineering audits we use to build compliant, high-performance applications.",
};

const insights = [
  {
    title: "Content Quality Gate",
    badge: "COMPLIANCE CHECKLIST",
    desc: "Our pre-publishing protocol to ensure every page on our sitemap is original, performant, and highly readable. We verify indexing status, canonical tags, and accessibility.",
    points: [
      "Check sitemap alignments using rigorous status checks",
      "Inspect mobile readability and full keyboard navigation controls",
      "Test pages with JavaScript disabled to ensure crawler indexability",
      "Filter out placeholder layouts and low-information user routes"
    ]
  },
  {
    title: "AdSense Readiness Audit",
    badge: "MONETIZATION PROTOCOL",
    desc: "A structural contract designed to ensure ad integrations do not cause cumulative layout shifts (CLS) or violate modern privacy consent frameworks.",
    points: [
      "Ensure CMP (Consent Management Platform) compliance",
      "Isolate ads inside manual placements separated from forms and navigation",
      "Verify ads.txt configurations are accessible and independent",
      "Deactivate Auto ads to protect user UX on tool and error routes"
    ]
  },
  {
    title: "System Performance Standards",
    badge: "CORE WEB VITALS",
    desc: "The absolute speed and optimization thresholds we enforce across our entire static and server-rendered architecture.",
    points: [
      "Aim for Lighthouse performance and accessibility scores above 95",
      "Compress and serve all image assets exclusively as WebP/AVIF formats",
      "Limit database hydration payloads on initial page loads",
      "Optimize CSS variable files to eliminate render-blocking elements"
    ]
  }
];

export default function InsightsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Insights Hero */}
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
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">Insights</span> & Standards
          </h1>
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl leading-relaxed">
            We don&apos;t keep our engineering guidelines behind closed doors. Below are the actual audits, gates, and standards we use to build stable, fast, and compliant applications.
          </p>
        </div>
      </section>

      {/* Insights Lists */}
      <section className="py-24 container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="grid grid-cols-1 gap-12">
          {insights.map((insight, index) => (
            <div 
              key={insight.title} 
              className="p-8 border border-border bg-surface rounded-sm relative overflow-hidden group hover:border-foreground/20 transition-all"
            >
              <span className="absolute top-4 right-6 font-display font-bold text-5xl text-border select-none pointer-events-none group-hover:text-foreground/5 transition-colors">
                0{index + 1}
              </span>

              <div className="max-w-3xl">
                <span className="text-[10px] font-mono tracking-widest text-foreground font-semibold border border-border px-2 py-1 bg-background rounded-sm block w-fit mb-4">
                  {insight.badge}
                </span>
                
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                  {insight.title}
                </h2>
                
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  {insight.desc}
                </p>

                <h3 className="font-display text-xs tracking-widest text-foreground font-bold uppercase mb-4">
                  Core Requirements
                </h3>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {insight.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs text-secondaryText font-mono">
                      <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Codebox block */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="p-6 md:p-8 border border-border bg-background rounded-sm flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm font-mono">
                <Terminal className="w-4 h-4" />
                <span>ROUTE_VERIFICATION_SUITE</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                How We Validate Route Compliance
              </h3>
              <p className="text-secondaryText text-xs leading-relaxed max-w-xl">
                We run a localized route script before every merge. This checks sitemap coverage, ensures zero placeholder content, verifies page title/description metadata presence, and tests responsiveness.
              </p>
            </div>
            <div className="bg-surface border border-border p-4 rounded-sm font-mono text-[11px] text-foreground self-stretch flex items-center shrink-0">
              <code>$ npm run test:routes -- --strict</code>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
          Need help reaching these standards?
        </h2>
        <p className="text-secondaryText text-lg mb-10 leading-relaxed">
          Book an audit session. We will examine your codebase, identify speed and security issues, and provide actionable blueprints to fix them.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
        >
          REQUEST AN ENGINEERING AUDIT
        </Link>
      </section>
    </div>
  );
}
