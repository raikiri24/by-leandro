import Link from "next/link";
import { ArrowUpRight, Code2, Layers3, Workflow } from "lucide-react";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Custom software & ERP development",
  "BYLD SPACE builds custom applications, HRIS, accounting and warehouse systems. Send your project requirements to discuss scope and delivery.",
  "/",
);
export default function Home() {
  const icons = [Code2, Layers3, Workflow];
  return (
    <div>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Software development · Built around
            your business
          </p>
          <h1>
            Your workflow.
            <br />
            Your requirements.
            <br />
            <span>Let’s build it.</span>
          </h1>
          <p className="lead">
            Custom applications and ERP systems that fit the way you work. From
            a new project to improvements in an existing tool, send us your
            requirements and we’ll help turn them into working software.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" href="/contact">
              Send your requirements <ArrowUpRight size={18} />
            </Link>
            <Link className="button-secondary" href="/services">
              Explore services →
            </Link>
          </div>
          <p className="hero-note">
            Web applications / Internal tools / Business automation
          </p>
        </div>
        <div className="workflow-panel">
          <div className="panel-top">
            <span className="status-dot" /> A system shaped around your
            operations
          </div>
          <div className="panel-body">
            <p className="eyebrow">CUSTOM ERP / MODULE OVERVIEW</p>
            <h2>One connected workflow.</h2>
            <p className="text-secondaryText">
              Choose the modules your business needs.
            </p>
            {[
              ["01", "HRIS", "People, attendance & leave"],
              ["02", "Accounting", "Invoices, expenses & reporting"],
              ["03", "Warehouse", "Inventory, receiving & dispatch"],
            ].map(([n, t, d]) => (
              <div className="module-row" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
                <Layers3 size={20} />
              </div>
            ))}
            <div className="panel-foot">
              Role-based access · Approvals · Shared records
            </div>
            <p className="illustration-label">
              Illustrative scope — developed to your requirements.
            </p>
          </div>
        </div>
      </section>
      <section className="home-section" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT WE CAN BUILD</p>
            <h2>
              Software for the work
              <br />
              that matters to you.
            </h2>
          </div>
          <p>
            Bring a project brief, a process that needs improving, or an
            existing application. We can help define what comes next.
          </p>
        </div>
        <div className="service-grid">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <article className="service-card" key={s.slug}>
                <Icon size={28} />
                <h3>{s.title}</h3>
                <p>{s.intro}</p>
                <ul>
                  {s.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link href={`/services/${s.slug}`}>
                  Explore this service <ArrowUpRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      <section className="home-section process-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM REQUIREMENTS TO RELEASE</p>
            <h2>A clear path to your next system.</h2>
          </div>
          <Link className="button-secondary" href="/requirements">
            Prepare your project brief →
          </Link>
        </div>
        <div className="process-grid">
          {[
            [
              "Share your requirements",
              "Describe your users, current workflow, required features, and constraints. A spreadsheet or written outline is a useful starting point.",
            ],
            [
              "Agree on the scope",
              "We discuss feasibility, priorities, deliverables, budget, and timeline before development begins.",
            ],
            [
              "Build and review",
              "Review the agreed workflows and test them with representative data. Feedback is tracked against the project scope.",
            ],
            [
              "Launch and plan support",
              "Agree on deployment, documentation, access handover, and any maintenance or follow-up work.",
            ],
          ].map(([t, d], i) => (
            <article key={t}>
              <span className="step-number">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="home-section">
        <p className="eyebrow">PROJECT QUESTIONS</p>
        <h2 className="mb-8 text-3xl md:text-4xl">Start with what you need.</h2>
        <div className="faq-list">
          {[
            [
              "Can you build an ERP with HRIS, accounting, and warehouse modules?",
              "Yes. We can scope these modules together or start with one. Share your approval rules, reporting needs, user roles, and existing records so we can plan how the system should work.",
            ],
            [
              "Can you improve an existing application?",
              "Yes. Requests can cover bug fixes, new features, integrations, or maintenance. We first need to understand the current codebase, access requirements, and the problem you want to solve.",
            ],
            [
              "How much will the project cost?",
              "Cost and delivery time depend on the agreed requirements, integrations, data migration, and support needs. Send your priorities and budget range so we can discuss a realistic scope.",
            ],
            [
              "What should I send first?",
              "Describe your business process, who will use the software, and your must-have features. Include sample documents with sensitive information removed. Our requirements guide helps you prepare a useful brief.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="inquiry-banner">
        <div>
          <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
          <h2>
            Tell us what you need.
            <br />
            We’ll work through it with you.
          </h2>
          <p>
            New applications, ERP systems, feature requests, and software
            improvements.
          </p>
        </div>
        <Link className="button-primary" href="/contact">
          Let’s discuss your project <ArrowUpRight size={18} />
        </Link>
      </section>
    </div>
  );
}
