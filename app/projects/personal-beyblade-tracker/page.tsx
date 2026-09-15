import type { Metadata } from "next";
import Link from "next/link";
import { Database, Eye, Code, Smartphone, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study: Personal Beyblade Tracker",
  description: "A deep dive into how we built a bespoke cataloging and custom configuration tracker for Beyblade enthusiasts using Next.js and MongoDB.",
};

export default function PersonalBeybladeTrackerPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Project Header */}
      <section className="relative py-20 border-b border-border bg-gradient-to-b from-black to-neutral-950">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-3 text-secondaryText mb-4">
            <Link href="/projects" className="text-xs font-mono tracking-widest hover:text-foreground transition-colors">
              PROJECTS
            </Link>
            <span className="text-xs font-mono">&rarr;</span>
            <span className="text-xs font-mono text-foreground">PERSONAL BEYBLADE TRACKER</span>
          </div>
          
          <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-foreground mb-6">
            Personal Beyblade Tracker
          </h1>
          
          <div className="flex flex-wrap gap-6 items-center text-xs font-mono text-secondaryText">
            <div>
              <span className="text-foreground font-semibold">ROLE:</span> UI/UX, Full-Stack Development
            </div>
            <div className="hidden sm:inline text-border">|</div>
            <div>
              <span className="text-foreground font-semibold">DATE:</span> Late 2024
            </div>
            <div className="hidden sm:inline text-border">|</div>
            <div>
              <span className="text-foreground font-semibold">STACK:</span> Next.js, MongoDB, Tailwind
            </div>
          </div>
        </div>
      </section>

      {/* Intro & Summary */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="md:col-span-8">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              EXECUTIVE OVERVIEW
            </h2>
            <h3 className="font-display text-2xl font-bold mb-6 text-foreground">
              A bespoke database & combo tester for competitive hobbyists.
            </h3>
            <p className="text-secondaryText text-sm leading-relaxed mb-4">
              Beyblade X is a highly competitive, physical top-spinning sport with custom engineering. Players customize their Beyblades by combining three primary components: the **Blade** (top metal contact), the **Ratchet** (middle height/burst control), and the **Bit** (bottom spindle tip). 
            </p>
            <p className="text-secondaryText text-sm leading-relaxed">
              Standard spreadsheet trackers fail to capture the visual aesthetic and mechanical calculations of customizable configurations. We built a fast, modern web application that allows players to inventory their physical boxes, snap digital configurations together, and immediately preview combined weight distributions and motion parameters.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-4 border border-border bg-surface p-6 rounded-sm self-start">
            <h3 className="font-display tracking-widest text-[10px] text-foreground uppercase mb-4 font-semibold">
              Project Parameters
            </h3>
            <ul className="space-y-4 text-xs font-mono text-secondaryText">
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span>Database Size:</span>
                <span className="text-foreground">150+ Parts</span>
              </li>
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span>Asset Storage:</span>
                <span className="text-foreground">WebP CDN</span>
              </li>
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span>UI Core:</span>
                <span className="text-foreground">Tailwind + Radix</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Speed Score:</span>
                <span className="text-foreground">99 Lighthouse</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Challenge vs Solution */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              THE CHALLENGE
            </h2>
            <h3 className="font-display text-xl font-bold mb-4 text-foreground">
              Deep data relationships under a strict budget.
            </h3>
            <p className="text-secondaryText text-sm leading-relaxed mb-4">
              Each component type has distinct attributes: Blades have specific weight thresholds and spin directions; Ratchets determine height clearance and burst margins; Bits govern friction multipliers and stadium speed ratios.
            </p>
            <p className="text-secondaryText text-sm leading-relaxed">
              To build a reliable configuration simulator, we had to model these attributes seamlessly, allowing players to build combos, see aggregated statistics on the fly, and ensure that only physically valid configurations can be snap-assembled.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              THE SOLUTION
            </h2>
            <h3 className="font-display text-xl font-bold mb-4 text-white">
              Flexible schema architecture on Next.js 15.
            </h3>
            <p className="text-secondaryText text-sm leading-relaxed mb-4">
              We mapped the parts catalogs using **MongoDB**, which natively supports flexible document shapes. Since parts frequently expand with new sub-generation rules, a document database allowed us to update attributes without running costly schema migrations.
            </p>
            <p className="text-secondaryText text-sm leading-relaxed">
              We developed a completely client-side configuration engine using state-driven React hooks, achieving instant weight recalculations without loading delays.
            </p>
          </div>
        </div>
      </section>

      {/* Key Deliverables */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="mb-12">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              DELIVERED CAPABILITIES
            </h2>
            <p className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              How the System Performs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-border bg-surface rounded-sm flex gap-4">
              <Database className="w-8 h-8 text-foreground shrink-0" />
              <div>
                <h4 className="font-display text-base font-bold text-foreground mb-2">Relational Document Catalog</h4>
                <p className="text-secondaryText text-xs leading-relaxed">
                  A comprehensive directory of Blades, Ratchets, and Bits complete with high-resolution, cropped image files. Built on custom API endpoints, players can search, filter by weight class, or segment by release generations (e.g. BX, UX, CX).
                </p>
              </div>
            </div>

            <div className="p-6 border border-border bg-surface rounded-sm flex gap-4">
              <Zap className="w-8 h-8 text-foreground shrink-0" />
              <div>
                <h4 className="font-display text-base font-bold text-foreground mb-2">Real-Time Combo Calculator</h4>
                <p className="text-secondaryText text-xs leading-relaxed">
                  A drag-and-drop combo builder interface. When a player selects a Blade, Ratchet, and Bit, the application immediately plots their statistical indicators (Defense, Attack, Stamina, Burst Resistance) and outputs the total calculated weight.
                </p>
              </div>
            </div>

            <div className="p-6 border border-border bg-surface rounded-sm flex gap-4">
              <Smartphone className="w-8 h-8 text-foreground shrink-0" />
              <div>
                <h4 className="font-display text-base font-bold text-foreground mb-2">Mobile-First Digital Box</h4>
                <p className="text-secondaryText text-xs leading-relaxed">
                  A portable physical collection tracker designed around mobile screen constraints. Enthusiasts standing in hobby shops can quickly open their digital box to verify what parts they already own, avoiding duplicate purchases.
                </p>
              </div>
            </div>

            <div className="p-6 border border-border bg-surface rounded-sm flex gap-4">
              <Code className="w-8 h-8 text-foreground shrink-0" />
              <div>
                <h4 className="font-display text-base font-bold text-foreground mb-2">Clean Component Handover</h4>
                <p className="text-secondaryText text-xs leading-relaxed">
                  The codebase is strictly typed in TypeScript and packaged using standard ES Modules. We structured the backend queries to run on edge functions with aggressive serverless cache configurations for instantaneous loading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Breakdown */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="mb-12">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              THE BLUEPRINT
            </h2>
            <h3 className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              Technical Architecture
            </h3>
          </div>

          <div className="border border-border bg-background p-8 rounded-sm font-mono text-xs text-secondaryText space-y-4">
            <div className="text-foreground font-semibold">{"//"} 1. Next.js 15 Server Action (Query Pipeline)</div>
            <p className="leading-relaxed">
              To minimize page hydration, we utilize Next.js Server Components to fetch initial catalogs directly from MongoDB. Client-side interactions (like live combo previews) are handled using light-weight React hooks without causing database round-trips.
            </p>
            <div className="border-t border-border/50 my-4"></div>
            <div className="text-foreground font-semibold">{"//"} 2. Advanced MongoDB Schema Structure</div>
            <p className="leading-relaxed">
              Parts are stored in a polymorphic document structure. This allows custom fields (like &apos;blade_teeth_count&apos; or &apos;bit_gear_ratio&apos;) to exist solely on relevant part sub-categories without polluting the global parent catalog model.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
          Inspired by this project?
        </h2>
        <p className="text-secondaryText text-lg mb-10 leading-relaxed">
          We can build custom cataloging, interactive calculators, and high-performance databases for your unique business or hobbyist community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
          >
            START A CUSTOM PROJECT
          </Link>
          <Link 
            href="/projects" 
            className="inline-flex items-center justify-center border border-border bg-surface text-foreground px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:border-foreground/30 transition-colors"
          >
            BACK TO PROJECTS
          </Link>
        </div>
      </section>
    </div>
  );
}
