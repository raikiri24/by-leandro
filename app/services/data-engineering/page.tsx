import type { Metadata } from "next";
import Link from "next/link";
import { Database, HelpCircle, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Engineering Services",
  description: "Consolidate disjointed data, build robust pipelines, and set up fast data warehouses to enable accurate, real-time business intelligence and automated reporting.",
};

const problems = [
  {
    title: "Manual CSV Consolidation",
    desc: "Your staff is spending hours downloading spreadsheets from Stripe, Shopify, and Salesforce to build manual reports. We automate these pipelines to feed a central database."
  },
  {
    title: "Sluggish, Crashing Queries",
    desc: "Your reports and search requests are taking minutes to load or outright crashing your production database. We restructure schemas, build indexes, and set up read-replicas."
  },
  {
    title: "Unstructured Data Chaos",
    desc: "You have millions of logs, files, or user event records but no way to query or extract business value from them. We structure and store this data in modern analytical lakes."
  }
];

const processSteps = [
  { num: "01", title: "Silo Mapping", desc: "We identify all your disconnected data sources, formats (APIs, DBs, CSVs), and establish the business metrics that need to be centralized." },
  { num: "02", title: "Warehouse Design", desc: "We design a clean, relational or document-based schema. We choose and set up the right database engine tailored for large-scale analytical queries." },
  { num: "03", title: "ETL Pipeline Build", desc: "We write automated data pipelines that extract, wash, transform, and load data from your active services into your warehouse on a scheduled timer." },
  { num: "04", title: "Dashboard Delivery", desc: "We connect your clean database to visualization tools like Looker, PowerBI, or a custom web dashboard so your team can self-serve reports instantly." }
];

const faqs = [
  {
    q: "What is the difference between a transactional database and a data warehouse?",
    a: "Transactional databases (like PostgreSQL/MySQL) are tuned to handle thousands of rapid daily reads/writes (e.g., a customer placing an order). Data Warehouses (like Snowflake or BigQuery) are optimized to analyze millions of rows at once for reports (e.g., calculating annual revenue trends across 10 products)."
  },
  {
    q: "How do you protect customer data privacy?",
    a: "We integrate hashing, anonymization, and data-masking steps into the pipelines. Sensitive customer fields (like passwords or credit card references) are excluded or securely encrypted before entering the warehouse."
  },
  {
    q: "Can you help optimize our existing database queries?",
    a: "Yes. We perform complete database health audits, write custom indexes, redesign messy tables (normalization/denormalization), and implement caching layers (like Redis) to accelerate speeds."
  }
];

export default function DataEngineeringPage() {
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
            <span className="text-xs font-mono text-foreground">DATA ENGINEERING</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 border border-border bg-surface flex items-center justify-center rounded-sm">
              <Database className="w-5 h-5 text-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-foreground">
              Data Engineering
            </h1>
          </div>
          
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl leading-relaxed">
            We connect and organize your fragmented business data so you can stop guessing and start operating with accurate, automated analytics.
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
              Building the plumbing that keeps business metrics clean and accessible.
            </h3>
            <p className="text-secondaryText text-sm leading-relaxed mb-4">
              Data is only valuable if it is correct, organized, and fast to retrieve. Data Engineering is the behind-the-scenes work of connecting systems so information flows automatically without manual human steps.
            </p>
            <p className="text-secondaryText text-sm leading-relaxed">
              We design robust pipelines that handle raw logs, API responses, and active databases—cleaning and saving them securely so you have an undeniable, single source of truth for your business metrics.
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
                  <h4 className="font-display text-sm font-bold text-foreground">Data-Rich Organizations</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Companies using multiple independent apps (Shopify, Stripe, Hubspot) who need to consolidate metrics to see true lifetime customer values.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">Product Teams</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Developers whose databases are slowing down under heavy reporting queries, needing optimized indexing and schema layouts.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">Finance & Ops Leaders</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Executives who want to replace manual spreadsheet reporting with automated, real-time dashboards that load instantly.</p>
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
              DATA BOTTLENECKS
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
              OUR PIPELINE STEPS
            </h2>
            <p className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
              How We Engineer Data
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
              What We Create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">Centralized Data Lakes</h4>
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  Warehouses holding clean historical data synchronized from all your business units, enabling flexible long-term analysis.
                </p>
              </div>
              <ul className="text-xs text-secondaryText space-y-2 font-mono">
                <li>&middot; Multi-source ETL aggregation</li>
                <li>&middot; Schema migration scripting</li>
                <li>&middot; Automated database synchronization</li>
              </ul>
            </div>

            <div className="p-8 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">Query Performance Optimization</h4>
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  Speed adjustments that turn painful 15-second report loading times into instant, sub-second responses.
                </p>
              </div>
              <ul className="text-xs text-secondaryText space-y-2 font-mono">
                <li>&middot; Query plan profiling & indexing</li>
                <li>&middot; Redis caching architecture</li>
                <li>&middot; Database read/write split setups</li>
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
              Data Engineering Questions
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
                  Using optimized, indexed database schemes to query hundreds of complex, overlapping parts within milliseconds.
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
                  How database structural blueprinting forms the bedrock of highly scalable web architectures.
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
          Ready to clean your data pipelines?
        </h2>
        <p className="text-secondaryText text-lg mb-10 leading-relaxed">
          Let&apos;s build automated pipelines that make your business numbers clear, reliable, and instantaneous.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
        >
          START A DATA PROJECT
        </Link>
      </section>
    </div>
  );
}
