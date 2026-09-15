import type { Metadata } from "next";
import Link from "next/link";
import { Code, HelpCircle, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Software Development Services",
  description: "Custom software development for startups and businesses. We turn complex ideas into highly reliable, easy-to-use web applications, internal tools, and APIs.",
};

const problems = [
  {
    title: "Excel and Paper Overload",
    desc: "Your team is losing hours copying data between spreadsheets, paper logs, and disjointed software tools. We build centralized apps to automate and integrate your entire workflow."
  },
  {
    title: "The 'Black Box' Legacy Code",
    desc: "You have existing software that nobody knows how to modify or fix, and you live in fear of it breaking. We audit, refactor, and modernize codebases to make them maintainable."
  },
  {
    title: "Unvalidated Product Concepts",
    desc: "You have a great idea for a SaaS or customer platform but lack the technical team to build an initial product that actually works and scales. We bridge that gap completely."
  }
];

const processSteps = [
  { num: "01", title: "Discovery & Blueprint", desc: "We sit down to understand your business objectives, map out user personas, and draft basic wireframes. We design the architecture before writing a single line of code." },
  { num: "02", title: "Iterative Sprints", desc: "We build in high-transparency 2-week intervals. You get to interact with working prototypes as they are developed, allowing us to pivot and refine quickly." },
  { num: "03", title: "Rigorous Verification", desc: "Every module undergoes automated testing for performance, edge cases, and security. We ensure your application is bug-resistant from day one." },
  { num: "04", title: "Handover & Autonomy", desc: "We deploy the application and train your team. You receive full ownership of the clean, commented repository so you are never locked into a single vendor." }
];

const faqs = [
  {
    q: "Who owns the intellectual property and code?",
    a: "You do. 100%. Once the project milestones are paid for, the code, assets, and configuration are entirely your property. We hand over the GitHub repository and all service accounts."
  },
  {
    q: "What tech stack do you use?",
    a: "We prefer reliable, modern technology with massive community support. For web apps, we primarily use React (Next.js), TypeScript, Node.js, and Python, backed by PostgreSQL or MongoDB. We choose the right tool for your specific scale."
  },
  {
    q: "Can you take over an existing, partially built software product?",
    a: "Yes. We begin with a code audit to assess the quality, safety, and architecture of your existing system. We then outline a clear plan to either refactor and complete it, or rewrite key bottlenecks."
  }
];

export default function SoftwareDevelopmentPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Service Header */}
      <section className="relative py-20 border-b border-border bg-gradient-to-b from-black to-neutral-950">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-3 text-secondaryText mb-4">
            <Link href="/services" className="text-xs font-mono tracking-widest hover:text-foreground transition-colors">
              SERVICES
            </Link>
            <span className="text-xs font-mono">&rarr;</span>
            <span className="text-xs font-mono text-foreground">SOFTWARE DEVELOPMENT</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 border border-border bg-surface flex items-center justify-center rounded-sm">
              <Code className="w-5 h-5 text-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-foreground">
              Software Development
            </h1>
          </div>
          
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl leading-relaxed">
            We turn your concepts and business logic into lightweight, robust, and highly functional digital products. No unnecessary bloat—just software that works.
          </p>
        </div>
      </section>

      {/* What it means & Who it's for */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              What This Service Means
            </h2>
            <h3 className="font-display text-2xl font-bold mb-4">
              Code built for clarity, speed, and real-world results.
            </h3>
            <p className="text-secondaryText text-sm leading-relaxed mb-4">
              Software shouldn&apos;t be a fragile black box. To us, software development means writing clean, well-documented code that aligns perfectly with your operations. We don&apos;t build technology for the sake of technology; we write software to save you time, reduce errors, and open new revenue channels.
            </p>
            <p className="text-secondaryText text-sm leading-relaxed">
              We handle everything from UI design and front-end reactivity to backend databases and API connections, ensuring seamless integration into your existing systems.
            </p>
          </div>

          <div className="border border-border bg-surface p-8 rounded-sm">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              Who It Is For
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">SaaS & Product Founders</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Teams that need an experienced development partner to build, launch, and validate their MVP without hiring full-time developers immediately.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">Operation Leaders</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Managers who want to streamline manual operations, automate customer portals, or build custom internal tools to boost team productivity.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">Established SMBs</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Companies held back by old, slow software or messy spreadsheets who want to modernize their systems securely.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Problems we help solve */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="mb-12">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              CHALLENGES WE TACKLE
            </h2>
            <p className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              Problems We Can Help Solve
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <div key={problem.title} className="p-6 border border-border bg-background rounded-sm">
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center mb-4 bg-surface">
                  <AlertCircle className="w-4 h-4 text-secondaryText" />
                </div>
                <h4 className="font-display text-base font-bold text-foreground mb-2">
                  {problem.title}
                </h4>
                <p className="text-secondaryText text-xs leading-relaxed">
                  {problem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="mb-12">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              THE WORKFLOW
            </h2>
            <p className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              Our Development Process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.num} className="p-6 border border-border rounded-sm relative bg-gradient-to-b from-background to-neutral-950">
                <span className="font-display text-4xl font-bold text-border block mb-4">{step.num}</span>
                <h4 className="font-display text-sm font-bold text-foreground mb-2">{step.title}</h4>
                <p className="text-secondaryText text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples & Outcomes */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="mb-12">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              CAPABILITIES
            </h2>
            <p className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              What We Typically Build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">SaaS & Web Platforms</h4>
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  Fully interactive web products with subscriptions, roles, and real-time dashboard analytics, built using modern responsive layouts.
                </p>
              </div>
              <ul className="text-xs text-secondaryText space-y-2 font-mono">
                <li>&middot; User auth & permission schemes</li>
                <li>&middot; Stripe payment flow integration</li>
                <li>&middot; Interactive charting & reports</li>
              </ul>
            </div>

            <div className="p-8 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">Internal Operations Apps</h4>
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  Tailored web applications designed to streamline booking, inventory management, customer support ticket pipelines, and reporting.
                </p>
              </div>
              <ul className="text-xs text-secondaryText space-y-2 font-mono">
                <li>&middot; Multi-source database synchronization</li>
                <li>&middot; Custom spreadsheet & PDF generation</li>
                <li>&middot; Automated SMS & email notification triggers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="mb-12">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              FAQS
            </h2>
            <p className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              Service Questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 border border-border bg-surface rounded-sm">
                <h4 className="font-display text-sm font-bold text-foreground mb-2 flex items-start gap-2">
                  <HelpCircle className="w-4.5 h-4.5 text-secondaryText shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="text-secondaryText text-xs leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-8 uppercase">
            Related Projects & Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-secondaryText uppercase block mb-2">PROJECT</span>
                <h4 className="font-display text-base font-bold text-foreground mb-2">Personal Beyblade Tracker</h4>
                <p className="text-secondaryText text-xs leading-relaxed mb-4">
                  A modern, interactive cataloging and customization app for the Beyblade community.
                </p>
              </div>
              <Link href="/projects/personal-beyblade-tracker" className="text-xs font-bold text-foreground hover:text-secondaryText flex items-center gap-1">
                VIEW CASE STUDY <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-6 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-secondaryText uppercase block mb-2">JOURNEY</span>
                <h4 className="font-display text-base font-bold text-foreground mb-2">How an Idea Becomes an Application</h4>
                <p className="text-secondaryText text-xs leading-relaxed mb-4">
                  Our core philosophy on how to guide raw software ideas through blueprinting, development, and launch.
                </p>
              </div>
              <Link href="/journey/how-an-idea-becomes-an-application" className="text-xs font-bold text-foreground hover:text-secondaryText flex items-center gap-1">
                READ ARTICLE <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
          Ready to turn your idea into code?
        </h2>
        <p className="text-secondaryText text-lg mb-10 leading-relaxed">
          Let&apos;s build a software product that actually serves your users and supports your workflows.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
        >
          START A PROJECT
        </Link>
      </section>
    </div>
  );
}
