import type { Metadata } from "next";
import Link from "next/link";
import { Cloud, HelpCircle, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cloud Deployment Services",
  description: "Secure, reliable, and cost-efficient cloud hosting and infrastructure. We set up automated deployment pipelines, scale resources, and optimize your cloud bill.",
};

const problems = [
  {
    title: "Unreliable Hosting & Downtime",
    desc: "Your website or application goes offline during peak traffic or when unexpected updates are applied. We design redundant, self-healing cloud setups that guarantee maximum uptime."
  },
  {
    title: "Skyrocketing Cloud Bills",
    desc: "You are spending thousands of dollars on cloud servers that are sitting idle or poorly configured. We audit, restructure, and downsize resources to slash your monthly costs."
  },
  {
    title: "Messy, Manual Releases",
    desc: "Your team deploys new updates by manually dragging files into servers, resulting in frequent bugs and downtime. We build automated, push-to-deploy pipelines."
  }
];

const processSteps = [
  { num: "01", title: "Infrastructure Audit", desc: "We review your current software architecture, traffic patterns, and cloud spend to detect vulnerabilities, speed bottlenecks, and wastage." },
  { num: "02", title: "Modern Blueprinting", desc: "We design a tailored, secure network architecture. We configure servers, databases, and assets as code (IaC) to make environments easily replicable." },
  { num: "03", title: "Pipeline Automation", desc: "We set up automated CI/CD pipelines. Every git code push is automatically checked, built, tested, and deployed to staging or production with zero downtime." },
  { num: "04", title: "Monitoring & Tuning", desc: "We set up live alerts, error logs, and metrics dashboards so we always know how your application behaves under real load, keeping it fast and safe." }
];

const faqs = [
  {
    q: "Which cloud provider should we choose?",
    a: "We work with all major platforms (AWS, Google Cloud, Microsoft Azure) and simpler solutions like Vercel, Supabase, or DigitalOcean. We choose the platform that best matches your budget, compliance rules, and technical requirements."
  },
  {
    q: "How do you guarantee server security?",
    a: "We implement industry standard rules: strict firewall rules, virtual private clouds (VPCs), secure SSL certificates, automated database backups, and key management systems. We ensure your data is encrypted both during transfer and at rest."
  },
  {
    q: "Do we get access to the cloud bills?",
    a: "Absolutely. We set up all cloud infrastructure directly in accounts owned by your company. You have complete visibility and direct billing relation with the cloud provider; we simply act as managers."
  }
];

export default function CloudDeploymentPage() {
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
            <span className="text-xs font-mono text-foreground">CLOUD DEPLOYMENT</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 border border-border bg-surface flex items-center justify-center rounded-sm">
              <Cloud className="w-5 h-5 text-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-foreground">
              Cloud Deployment
            </h1>
          </div>
          
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl leading-relaxed">
            We build the secure virtual foundations that keep your applications online, lightning fast, and ready to scale. No complex infrastructure management on your end.
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
              Taking the mystery out of hosting, servers, and scalability.
            </h3>
            <p className="text-secondaryText text-sm leading-relaxed mb-4">
              Your software code needs a solid place to live. Cloud Deployment is the practice of setting up servers, load balancers, database instances, and network connections in a way that remains stable as your user base grows.
            </p>
            <p className="text-secondaryText text-sm leading-relaxed">
              We focus on building resilient pipelines so that publishing software updates is as simple as committing code. We configure infrastructure to be self-healing, cost-effective, and guarded behind secure firewalls.
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
                  <h4 className="font-display text-sm font-bold text-foreground">Growing Startups</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Teams that need to design a professional, production-ready cloud environment that satisfies enterprise customer compliance requirements.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">SaaS Developers</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Creators who want automated deployment workflows (CI/CD) so they can focus on coding features rather than server management.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">Cost-Conscious Owners</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Companies seeking to optimize their AWS/GCP bills and replace bloated configurations with efficient, modern architectures.</p>
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
              RELIABILITY & VALUE
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
              ENGINEERING METHOD
            </h2>
            <p className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              Our Deployment Process
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
              DELIVERABLES
            </h2>
            <p className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              Infrastructure Solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">High-Availability AWS/GCP Setup</h4>
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  Fully containerized, multi-zone environments designed to withstand server crashes and instantly route traffic around issues.
                </p>
              </div>
              <ul className="text-xs text-secondaryText space-y-2 font-mono">
                <li>&middot; Dockerized apps on ECS/EKS</li>
                <li>&middot; Multi-region replication configurations</li>
                <li>&middot; Auto-scaling groups to match traffic</li>
              </ul>
            </div>

            <div className="p-8 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">CI/CD & Git Automation</h4>
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  Build workflows that run automated code quality tests, secure code scanning, and handle deployments smoothly with zero-downtime rolling updates.
                </p>
              </div>
              <ul className="text-xs text-secondaryText space-y-2 font-mono">
                <li>&middot; GitHub Actions / GitLab CI setups</li>
                <li>&middot; Automatic staging preview environments</li>
                <li>&middot; Immediate rollback scripts on failure</li>
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
              Infrastructure Questions
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
                  A high-performing, light-weight application deployed with strict asset caching, MongoDB integration, and rapid image serving.
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
                  Understanding how to launch an application smoothly online without complex manual configurations.
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
          Ready to deploy safely?
        </h2>
        <p className="text-secondaryText text-lg mb-10 leading-relaxed">
          Let&apos;s build or migrate your infrastructure to a secure, self-healing, and affordable cloud environment.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
        >
          DEPLOY YOUR APPLICATION
        </Link>
      </section>
    </div>
  );
}
