import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our software portfolio and case studies. See how we turn concepts into beautiful, robust, and highly functional digital applications.",
};

const projects = [
  {
    slug: "personal-beyblade-tracker",
    title: "Personal Beyblade Tracker",
    category: "Web Application / Hobbyist Catalog",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "MongoDB"],
    date: "2024",
    summary: "A bespoke collection cataloging and custom configuration tracking application designed specifically for the Beyblade enthusiast community.",
    featured: true,
  },
  {
    slug: "secure-patient-portal",
    title: "MedSync Patient Portal",
    category: "SaaS / Healthcare Compliance",
    tech: ["React", "Node.js", "PostgreSQL", "AWS ECS"],
    date: "2023",
    summary: "A secure, HIPAA-compliant patient boarding and scheduler portal built to reduce telephone appointment overhead for local medical clinics.",
    featured: false,
  },
  {
    slug: "logistics-route-optimizer",
    title: "Apex Route Logistics",
    category: "Internal Tool / Geo-Tracking",
    tech: ["Python", "FastAPI", "Google Maps API", "Docker"],
    date: "2023",
    summary: "An automated multi-vehicle route optimization engine that decreased daily delivery fuel expenses by 18% for a regional supply distributor.",
    featured: false,
  }
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Projects Hero */}
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
            Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">Outcomes</span>, <br />
            Not Just Software Code
          </h1>
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl leading-relaxed">
            We hold ourselves to a strict engineering standard. Each project is a surgical exercise in turning complex functional requirements into clear, lightning-fast software.
          </p>
        </div>
      </section>

      {/* Projects Listing */}
      <section className="py-24 container mx-auto px-4 md:px-8 max-w-5xl">
        {/* Featured Project */}
        {projects.filter(p => p.featured).map((proj) => (
          <div 
            key={proj.slug} 
            className="border border-border bg-surface p-8 md:p-12 rounded-sm mb-12 relative overflow-hidden group hover:border-foreground/20 transition-colors"
          >
            <span className="absolute top-4 right-6 font-mono text-[10px] tracking-widest text-secondaryText font-bold bg-neutral-900 border border-border px-3 py-1 uppercase rounded-full">
              FEATURED PROJECT
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-secondaryText text-xs font-mono mb-4">
                    <span className="uppercase">{proj.category}</span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {proj.date}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4 group-hover:text-white transition-colors">
                    {proj.title}
                  </h2>
                  <p className="text-secondaryText text-sm leading-relaxed mb-6 max-w-lg">
                    {proj.summary}
                  </p>
                </div>
                <Link 
                  href={`/projects/${proj.slug}`} 
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-foreground hover:text-secondaryText transition-all mt-4 lg:mt-0"
                >
                  READ COMPLETE CASE STUDY <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
                <h3 className="font-display tracking-widest text-[10px] text-foreground uppercase mb-4 font-semibold">
                  Technologies Leveraged
                </h3>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span 
                      key={t} 
                      className="font-mono text-[11px] bg-background text-secondaryText border border-border px-3 py-1.5 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.filter(p => !p.featured).map((proj) => (
            <div 
              key={proj.slug} 
              className="border border-border bg-surface p-8 rounded-sm hover:border-foreground/20 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 text-secondaryText text-xs font-mono mb-4">
                  <span className="uppercase">{proj.category}</span>
                  <span>&middot;</span>
                  <span>{proj.date}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-white transition-colors">
                  {proj.title}
                </h3>
                <p className="text-secondaryText text-xs leading-relaxed mb-6">
                  {proj.summary}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tech.map((t) => (
                    <span 
                      key={t} 
                      className="font-mono text-[10px] bg-background text-secondaryText border border-border px-2.5 py-1 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="text-xs font-bold text-secondaryText group-hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors">
                  DEVELOPMENT ARCHIVED <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Note Banner */}
      <section className="py-20 border-t border-border bg-surface relative">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-3 uppercase">
                OUR COMMITMENT
              </h2>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                No outsourcing. No cutting corners.
              </h3>
              <p className="text-secondaryText text-sm leading-relaxed max-w-xl">
                Every application we deliver is built entirely in-house. We write automated tests, audit database indexing, construct CI/CD pipelines, and provide complete documentation so you have total autonomy.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center border border-border bg-background text-foreground px-6 py-3.5 rounded-sm font-bold tracking-[0.1em] text-xs hover:border-foreground/30 transition-all"
              >
                LEARN HOW WE WORK
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
          Ready to build your solution?
        </h2>
        <p className="text-secondaryText text-lg mb-10 leading-relaxed">
          Reach out today and let&apos;s map out your software roadmap from scoping to live deployment.
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
