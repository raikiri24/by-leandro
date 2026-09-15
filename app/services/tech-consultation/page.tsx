import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ArrowRight, CheckCircle2, AlertCircle, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Tech Consultation Services",
  description: "Get professional, unbiased technical advice before writing any code. We help you scope projects, evaluate tech stacks, and audit existing legacy codebases.",
};

const problems = [
  {
    title: "Confusing Developer Quotes",
    desc: "You are getting wildly different pricing and technical pitches from freelance agencies and don't know who to trust. We act as your unbiased, outsourced CTO to evaluate proposals."
  },
  {
    title: "The Legacy Project Mire",
    desc: "Your current development team is missing deadlines, and you suspect your codebase has become a fragile mess. We perform independent, objective system architecture audits."
  },
  {
    title: "Technical Stack Paralysis",
    desc: "You aren't sure whether to use SQL or NoSQL, AWS or Vercel, or custom React vs. a simpler SaaS builder. We cut through the noise and provide clear, budget-based suggestions."
  }
];

const processSteps = [
  { num: "01", title: "Context Mapping", desc: "We host an in-depth conversation to understand your business operations, target users, budget constraints, and long-term scaling targets." },
  { num: "02", title: "Technical Evaluation", desc: "We evaluate potential architectures, third-party APIs, and cost parameters to determine the most practical and lightweight path forward." },
  { num: "03", title: "Blueprint Handover", desc: "You receive a structured PDF blueprint describing database schemas, recommended tech stacks, wireframes, and a step-by-step phased execution roadmap." },
  { num: "04", title: "Build Decisions", desc: "Use our blueprint to build the product with us, hire internal developers, or present to investors with maximum technical authority." }
];

const faqs = [
  {
    q: "Are we obligated to hire you to build the software after a consultation?",
    a: "Absolutely not. Our consultation is a standalone strategic service. You receive complete ownership of our architectural reports and blueprint documents, which you can take to any development team or use to hire internal engineers."
  },
  {
    q: "Do you sign non-disclosure agreements (NDAs) before we talk?",
    a: "Yes. We treat all business secrets and intellectual concepts with total confidentiality. We can execute a standard mutual NDA before our discovery meeting."
  },
  {
    q: "What actual assets do we walk away with?",
    a: "At the end of a roadmap consultation, you receive a full Technical Specification Document containing: 1) System architecture diagram, 2) Data schema suggestions, 3) 3rd-party integration audits, 4) Development cost projections, and 5) Staged feature delivery timeline."
  }
];

export default function TechConsultationPage() {
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
            <span className="text-xs font-mono text-foreground">TECH CONSULTATION</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 border border-border bg-surface flex items-center justify-center rounded-sm">
              <Layers className="w-5 h-5 text-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-foreground">
              Tech Consultation
            </h1>
          </div>
          
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl leading-relaxed">
            Validate your ideas, choose the correct technologies, and audit complex codebases with expert, unbiased strategic consulting. Clear answers, zero sales pitch.
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
              Planning and testing your ideas before committing capital to code.
            </h3>
            <p className="text-secondaryText text-sm leading-relaxed mb-4">
              The most expensive software bug is building the wrong product. Tech Consultation is an advisory service where we align your commercial business goals with realistic software architectures.
            </p>
            <p className="text-secondaryText text-sm leading-relaxed">
              We help you find the shortest, most secure, and most affordable technical path to your goal. Whether you need a second opinion on an agency proposal, an audit of legacy servers, or help scoping out an MVP, we give you unbiased expertise.
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
                  <h4 className="font-display text-sm font-bold text-foreground">Non-Technical Founders</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">SaaS creators who need an objective expert to help them draft blueprints, select backend stacks, and evaluate developer applications.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">Business Managers</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Leaders looking to automate workflows who need to know which off-the-shelf software to buy and what custom code is worth building.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">Investors & Directors</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Executives conducting due-diligence audits on existing software and database assets before acquisitions or fundings.</p>
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
              STRATEGIC ANALYSIS
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
              CONSULTING FLOW
            </h2>
            <p className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              Our Advisory Process
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
              ENGAGEMENT TYPES
            </h2>
            <p className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              How We Can Consult Together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">MVP Scoping & Blueprinting</h4>
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  Translate your business concept into exact technical requirements, wireframes, and database charts, allowing developers to code without confusion.
                </p>
              </div>
              <ul className="text-xs text-secondaryText space-y-2 font-mono">
                <li>&middot; Relational & flow diagram designs</li>
                <li>&middot; Recommended APIs & cost estimations</li>
                <li>&middot; High-fidelity feature list roadmaps</li>
              </ul>
            </div>

            <div className="p-8 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">Codebase & Security Audits</h4>
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  An objective, external inspection of your software system to identify structural shortcuts, security holes, and code optimization recommendations.
                </p>
              </div>
              <ul className="text-xs text-secondaryText space-y-2 font-mono">
                <li>&middot; Performance bottleneck scanning</li>
                <li>&middot; Security credential exposure checks</li>
                <li>&middot; Code maintainability scores</li>
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
              Advisory Questions
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
                  A case study on how we wireframed and scoped out hundreds of image files, database collections, and scaling steps before writing code.
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
                  Our detailed philosophy guiding raw concepts into fully designed wireframes and operational technical specifications.
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
          Ready to map out your next move?
        </h2>
        <p className="text-secondaryText text-lg mb-10 leading-relaxed">
          Book an intensive technical roadmap session and gain absolute clarity over your software plans.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
        >
          BOOK A STRATEGY SESSION
        </Link>
      </section>
    </div>
  );
}
