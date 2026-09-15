import type { Metadata } from "next";
import Link from "next/link";
import { Code, Cloud, Database, Cpu, HelpCircle, ArrowRight, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our range of outcomes-focused services. We build custom software, deploy cloud infrastructure, engineer data systems, integrate AI, and offer expert consultation.",
};

const services = [
  {
    icon: Code,
    slug: "software-development",
    title: "Software Development",
    subtitle: "Turn your idea into a working digital product.",
    description: "From custom web applications and business automation tools to bespoke software systems, we build clean, reliable codebases designed specifically around your operational goals.",
    benefits: ["Custom web & mobile apps", "Internal business automation", "API integrations", "Legacy modernization"],
  },
  {
    icon: Cloud,
    slug: "cloud-deployment",
    title: "Cloud Deployment",
    subtitle: "Make your application ready for the real world.",
    description: "We handle the infrastructure setup, scaling, and maintenance. Your applications will run on reliable, secure cloud environments with proper deployment pipelines.",
    benefits: ["AWS, GCP & Azure setups", "CI/CD automation pipelines", "Docker & Kubernetes scaling", "Security & monitoring setup"],
  },
  {
    icon: Database,
    slug: "data-engineering",
    title: "Data Engineering",
    subtitle: "Turn your information into something useful.",
    description: "Connect disjointed data sources, build robust pipelines, and create central data Warehouses so you can extract actionable insights and make informed decisions.",
    benefits: ["ETL/ELT pipeline development", "Data lakehouse architectures", "Database performance tuning", "Real-time stream processing"],
  },
  {
    icon: Cpu,
    slug: "ai-development",
    title: "AI Development",
    subtitle: "Use AI where it actually makes sense.",
    description: "Avoid the hype and build practical AI integrations that automate repetitive workflows, extract intelligence from files, and enhance user experiences.",
    benefits: ["LLM integration & fine-tuning", "RAG (Retrieval-Augmented Generation)", "NLP & computer vision solutions", "Automated content workflows"],
  },
  {
    icon: Layers,
    slug: "tech-consultation",
    title: "Tech Consultation",
    subtitle: "Not sure what you need yet?",
    description: "Don't spend money on code before verifying the idea. Partner with us to map out your software architecture, evaluate tech stacks, and scope out your project roadmap.",
    benefits: ["Technical architecture scoping", "Feasibility analysis & prototyping", "Ecosystem audit & cost advice", "SaaS product strategy"],
  },
];

const faqs = [
  {
    q: "How do we get started?",
    a: "We begin with a brief consultation to discuss your vision, business goals, and budget. From there, we outline a clear proposal containing the project scope, timeline, and deliverables.",
  },
  {
    q: "Do I need to have a fully specified technical roadmap?",
    a: "Not at all. We specialize in translating high-level business goals and concepts into precise technical architectures. You bring the problem; we bring the solution.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Timelines depend heavily on complexity. Small MVPs and integrations can be delivered in 4-6 weeks, while large-scale data engineering or complex software products might take 3-6 months. We work in iterative milestones so you always see progress.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes. We offer ongoing maintenance agreements to handle server security patches, performance scaling, and new feature updates as your product grows.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Page Hero */}
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
            Services Designed <br className="hidden md:inline" />
            Around <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">Outcomes</span>
          </h1>
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl leading-relaxed">
            We bypass technical jargon to focus on what matters most: turning your business problems and ideas into clean, functional, and maintainable software systems.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="space-y-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.slug} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 border border-border bg-surface rounded-sm relative overflow-hidden group hover:border-foreground/20 transition-colors"
              >
                {/* Number Watermark */}
                <span className="absolute top-4 right-6 font-display font-bold text-4xl text-border select-none pointer-events-none group-hover:text-foreground/5 transition-colors">
                  0{index + 1}
                </span>

                {/* Left block (icon & titles) */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-sm border border-border bg-background flex items-center justify-center mb-6">
                      <IconComponent className="w-6 h-6 text-foreground" />
                    </div>
                    <h2 className="font-display text-2xl font-bold tracking-tight mb-2 text-foreground">
                      {service.title}
                    </h2>
                    <p className="text-sm font-mono text-secondaryText mb-4">
                      {service.subtitle}
                    </p>
                  </div>
                  <Link 
                    href={`/services/${service.slug}`} 
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-foreground hover:text-secondaryText transition-all mt-6 lg:mt-0"
                  >
                    EXPLORE THIS SERVICE <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Right block (description & list of benefits) */}
                <div className="lg:col-span-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
                  <p className="text-secondaryText text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div>
                    <h3 className="font-display tracking-widest text-[10px] text-foreground uppercase mb-3 font-semibold">
                      Core Expertise
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-secondaryText">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 font-mono">
                          <span className="w-1 h-1 bg-foreground rounded-full"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 border-y border-border bg-surface relative">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="mb-16">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">
              HAVE QUESTIONS?
            </h2>
            <p className="text-3xl md:text-4xl font-display tracking-tight text-foreground">
              Frequently Asked Questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 border border-border bg-background rounded-sm">
                <h3 className="font-display text-base font-bold text-foreground mb-3 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-secondaryText shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-secondaryText text-sm leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
            Let&apos;s Build Something Great
          </h2>
          <p className="text-secondaryText text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Have an idea or a specific technical problem? Reach out and we&apos;ll help you frame the right digital solution for your business.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
          >
            START A PROJECT
          </Link>
        </div>
      </section>
    </div>
  );
}
