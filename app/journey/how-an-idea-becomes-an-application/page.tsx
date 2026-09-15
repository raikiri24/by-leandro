import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar, Bookmark, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "How an Idea Becomes an Application",
  description: "A detailed breakdown of our software development lifecycle. Learn how we translate vague, abstract goals into highly optimized database systems and clean interfaces.",
};

export default function HowAnIdeaBecomesAnApplicationPage() {
  return (
    <article className="flex flex-col w-full">
      {/* Article Header */}
      <section className="relative py-20 border-b border-border bg-gradient-to-b from-black to-neutral-950">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="flex items-center gap-3 text-secondaryText mb-6">
            <Link href="/journey" className="text-xs font-mono tracking-widest hover:text-foreground transition-colors">
              JOURNEY
            </Link>
            <span className="text-xs font-mono">&rarr;</span>
            <span className="text-xs font-mono text-foreground uppercase">METHODOLOGY</span>
          </div>

          <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-foreground mb-6 leading-tight">
            How an Idea Becomes <br />
            an Application
          </h1>

          <div className="flex flex-wrap gap-6 items-center text-xs font-mono text-secondaryText">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Dec 10, 2024</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>6 min read</span>
            </div>
            <span className="text-border">|</span>
            <div className="text-foreground">
              BY LEANDRO
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="font-sans text-secondaryText text-base leading-relaxed space-y-8">
          <p className="text-foreground text-lg md:text-xl font-light leading-relaxed">
            Most software projects fail because of a translation error. A client describes a commercial aspiration; a developer starts coding a complex database. Somewhere in between, the actual point of the software gets completely lost under mountains of technical bloat.
          </p>

          <p>
            At BYLD SPACE, we believe that software should never be a black box. You shouldn&apos;t need a computer science degree to know what you are paying for, and you shouldn&apos;t have to hope that everything will miraculously connect at launch. 
          </p>

          <p>
            Here is our complete, transparent engineering playbook on how we guide a raw product concept through our design and development layers to release it safely into the real world.
          </p>

          <div className="border-l-2 border-foreground pl-6 my-10 italic text-foreground text-lg">
            &ldquo;The absolute cheapest time to fix a bug is before a single line of code is written.&rdquo;
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground tracking-tight pt-6">
            Phase 1: The Blueprint & Spec (Discovery)
          </h2>
          <p>
            Every project begins with a strategy session. We do not write code immediately. Instead, we host structured conversations to determine the exact functional boundaries of the application. 
          </p>
          <p>
            We take your loose descriptions and structure them into three definitive blueprints:
          </p>
          <ul className="list-disc pl-6 space-y-3 font-mono text-xs text-foreground bg-surface p-6 border border-border rounded-sm">
            <li>
              <strong className="font-semibold">User Flow Map:</strong> An exhaustive wireframe charting how an active customer moves from registration to checkout with zero dead ends.
            </li>
            <li>
              <strong className="font-semibold">Polymorphic Data Schema:</strong> A clean layout detailing the exact relationship between users, products, orders, and payment records.
            </li>
            <li>
              <strong className="font-semibold">Third-Party Audit:</strong> A review of which external tools (like Stripe, SendGrid, or Google Maps) make the most sense for your budget.
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-foreground tracking-tight pt-6">
            Phase 2: UI Wireframing & Design
          </h2>
          <p>
            Once the structural database relationships are approved, we design the graphical screens. We reject modern &quot;trendy&quot; design trends that sacrifice readability for unnecessary animations. 
          </p>
          <p>
            We adhere to a clean, highly legible design system: deep background contrasts, tight typography, clear click targets, and rapid interactive states. Every button has an explicit purpose, and every page layout is designed to work beautifully on mobile screen boundaries.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground tracking-tight pt-6">
            Phase 3: The Iterative Build (Sprints)
          </h2>
          <p>
            We build in high-transparency, two-week cycles. At the end of every sprint, you receive a link to a live, staging prototype where you can physically click through the features as they are built.
          </p>
          <p>
            By working in tightly scoped sprints, we ensure that you are never surprised by the final product. If we find that an initial database assumption was wrong, we discover it in week two—not week twelve.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground tracking-tight pt-6">
            Phase 4: Rigorous Quality Verification
          </h2>
          <p>
            We don&apos;t rely on manual testing alone. Within our sprint cycles, we write automated test modules that verify critical user actions (such as authenticating users, computing payment totals, and editing collection lists).
          </p>
          <p>
            Before we push any software update to our staging servers, our build system compiles the codebase and runs our entire test suite. If a single edge case fails, the build is blocked. This ensures your software remains robust, stable, and highly bug-resistant as it evolves.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground tracking-tight pt-6">
            Phase 5: Managed Deployment & Handover
          </h2>
          <p>
            Launching is not the end of the project—it is the beginning of the application&apos;s real life. We deploy your system to stable, self-healing cloud accounts under your company&apos;s direct billing. We configure database replicas, security certificates, and automatic data backup routines.
          </p>
          <p>
            Finally, we clean up and document your repository. We hand over the entire codebase, training materials, and master configuration keys. You receive 100% intellectual property ownership, giving you absolute freedom and technical autonomy.
          </p>

          {/* Share/Save links */}
          <div className="border-t border-border pt-8 mt-12 flex items-center justify-between">
            <Link 
              href="/journey" 
              className="text-xs font-mono font-bold tracking-widest text-foreground hover:text-secondaryText transition-colors flex items-center gap-1"
            >
              &larr; BACK TO JOURNEY
            </Link>
            <div className="flex gap-4 text-secondaryText">
              <button className="hover:text-foreground transition-colors" aria-label="Share article">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Study Banner */}
      <section className="py-20 border-y border-border bg-surface relative">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-secondaryText uppercase block mb-1">
                SEE OUR WORK IN ACTION
              </span>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Personal Beyblade Tracker Case Study
              </h3>
              <p className="text-secondaryText text-sm leading-relaxed max-w-md">
                Learn how we applied this exact playbook to design a custom hobbyist database using Next.js 15 and MongoDB.
              </p>
            </div>
            <Link 
              href="/projects/personal-beyblade-tracker" 
              className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 rounded-sm font-bold tracking-[0.1em] text-xs hover:bg-accent transition-colors shrink-0 self-start md:self-center"
            >
              READ CASE STUDY
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
          Ready to build with a clear plan?
        </h2>
        <p className="text-secondaryText text-lg mb-10 leading-relaxed">
          Let&apos;s start with a tech consultation session to scope out your software requirements and draft your unique technical spec sheet.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
        >
          START THE ROADMAP
        </Link>
      </section>
    </article>
  );
}
