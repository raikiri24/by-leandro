import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Box,
  Check,
  Code2,
  GitBranch,
  Layers3,
  LockKeyhole,
  Plus,
  ReceiptText,
  Users,
  Workflow,
} from "lucide-react";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Custom software & ERP development",
  "BYLD SPACE builds custom applications, HRIS, accounting and warehouse systems. Send your project requirements to discuss scope and delivery.",
  "/",
);

const serviceNames = [
  "Custom software",
  "Connected ERP",
  "Integrations & support",
];
const serviceDescriptions = [
  "Your ideas. Your workflow. An application designed to make it all work beautifully.",
  "People, finances, and inventory. Finally working together, in one connected system.",
  "Bring your tools together. Keep your software moving forward, not holding you back.",
];

function ServiceVisual({ index }: { index: number }) {
  return (
    <div
      className={`service-visual service-visual-${index}`}
      aria-hidden="true"
    >
      {index === 0 ? (
        <div className="code-window">
          <div className="window-chrome">
            <i />
            <i />
            <i />
            <span>built-for-you.tsx</span>
          </div>
          <div className="code-content">
            <p>
              <span>01</span>
              <em>const</em> yourNextIdea = {"{"}
            </p>
            <p>
              <span>02</span> purpose: <b>"Make work better"</b>,
            </p>
            <p>
              <span>03</span> builtAround: <b>"Your business"</b>,
            </p>
            <p>
              <span>04</span> possibilities: <em>Infinity</em>
            </p>
            <p>
              <span>05</span>
              {"}"};
            </p>
            <p className="code-comment">
              <span>06</span>{"// Let's build what comes next."}
            </p>
          </div>
          <div className="code-status">
            <span />
            <span>Your vision, brought to life.</span>
            <Check size={12} />
          </div>
        </div>
      ) : index === 1 ? (
        <div className="erp-preview">
          <div className="erp-preview-top">
            <span className="mini-brand">
              BYLD<span> / </span>ERP
            </span>
            <span className="preview-status">Connected</span>
          </div>
          <div className="erp-preview-body">
            {[Users, ReceiptText, Box].map((Icon, i) => (
              <div className="erp-tile" key={i}>
                <Icon size={22} strokeWidth={1.3} />
                <span>{["People", "Accounting", "Inventory"][i]}</span>
                <div className="preview-line" />
                <div className="preview-line short" />
              </div>
            ))}
          </div>
          <div className="erp-preview-foot">
            <Layers3 size={12} /> One system. A shared source of truth.
          </div>
        </div>
      ) : (
        <div className="connection-preview">
          <svg className="connection-lines" viewBox="0 0 360 220" fill="none">
            <path
              d="M72 55H130Q150 55 150 75V145Q150 165 130 165H72M288 55H230Q210 55 210 75V145Q210 165 230 165H288M150 110H210"
              stroke="currentColor"
            />
          </svg>
          <div className="connection-node node-one">
            <Code2 size={22} strokeWidth={1.4} />
          </div>
          <div className="connection-node node-two">
            <Box size={22} strokeWidth={1.4} />
          </div>
          <div className="connection-node node-center">
            <GitBranch size={28} strokeWidth={1.4} />
          </div>
          <div className="connection-node node-three">
            <ReceiptText size={22} strokeWidth={1.4} />
          </div>
          <div className="connection-node node-four">
            <Users size={22} strokeWidth={1.4} />
          </div>
          <span className="connection-caption">
            Less friction. More possibility.
          </span>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/architecture-hero.jpg"
          alt="Sculptural modern architecture in glass and steel beneath an open sky"
          fill
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">YOUR VISION. OUR NEXT BUILD.</p>
          <h1 id="hero-title">Built around you.</h1>
          <p className="hero-subtitle">
            Extraordinary software. Made for your everyday.
          </p>
          <p className="hero-description">
            Custom applications, connected systems, and a simpler way to work.
            <br className="desktop-break" /> Designed around your business.
            Never the other way around.
          </p>
        </div>
        <div className="hero-bottom">
          <div className="hero-actions">
            <Link className="button-primary" href="/contact">
              Start your project <ArrowUpRight size={16} />
            </Link>
            <Link className="button-secondary" href="#services">
              Explore our services
            </Link>
          </div>
          <p className="hero-note">
            Your requirements. A clear scope. Something built to last.
          </p>
        </div>
        <div className="hero-caption">
          <span>INDEPENDENT BY DESIGN. PRECISE BY NATURE.</span>
          <a href="#services" aria-label="Scroll to our services">
            <ArrowDown size={17} />
          </a>
          <span>SOFTWARE FOR WHAT COMES NEXT.</span>
        </div>
      </section>

      <div className="principles-strip">
        {[
          {
            Icon: Code2,
            title: "Purpose-built",
            detail: "Not another workaround.",
          },
          {
            Icon: Layers3,
            title: "Connected by design",
            detail: "Your business, in sync.",
          },
          {
            Icon: Workflow,
            title: "Made to move you forward",
            detail: "Less friction. More focus.",
          },
        ].map(({ Icon, title, detail }) => (
          <div key={title}>
            <Icon size={22} strokeWidth={1.4} />
            <p>
              <strong>{title}</strong>
              <span>{detail}</span>
            </p>
          </div>
        ))}
      </div>

      <section className="home-section services-section" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE RIGHT TOOLS. ENTIRELY YOURS.</p>
            <h2>
              Built for the way
              <br />
              you work.
            </h2>
          </div>
          <div className="section-intro">
            <p>
              A new idea. A better process. A system that finally fits.
              <br />
              Wherever you are, let’s build what comes next.
            </p>
            <Link className="text-link" href="/services">
              Discover all services <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="home-service-grid">
          {services.map((service, index) => (
            <article className="home-service-card" key={service.slug}>
              <Link
                className="service-visual-link"
                href={`/services/${service.slug}`}
                aria-label={`Explore ${serviceNames[index]}`}
              >
                <ServiceVisual index={index} />
              </Link>
              <div className="home-service-copy">
                <span className="service-index">0{index + 1} /</span>
                <h3>{serviceNames[index]}</h3>
                <p>{serviceDescriptions[index]}</p>
                <Link className="text-link" href={`/services/${service.slug}`}>
                  Explore service <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="visual-note">
          Interface concepts shown for illustration. Every system is developed
          to your requirements.
        </p>
      </section>

      <section className="system-section" aria-labelledby="system-title">
        <div className="system-inner">
          <div className="system-copy">
            <p className="eyebrow">ONE SYSTEM. EVERY POSSIBILITY.</p>
            <h2 id="system-title">
              Everything connected.
              <br />
              <span>Nothing in your way.</span>
            </h2>
            <p>
              Give your people, finances, and operations a shared home. An ERP
              shaped around your business, with the modules you need and room to
              grow.
            </p>
            <Link className="button-light" href="/services/erp-development">
              Explore ERP development <ArrowUpRight size={16} />
            </Link>
            <div className="system-assurance">
              <LockKeyhole size={13} /> Role-based access <span>·</span> Shared
              records <span>·</span> Clear approvals
            </div>
          </div>
          <div
            className="system-diagram"
            role="img"
            aria-label="Illustrative ERP workflow connecting HRIS, accounting, and warehouse modules"
          >
            <div className="system-hub">
              <Layers3 size={23} strokeWidth={1.3} />
              <span>
                YOUR BUSINESS<span>One connected workspace</span>
              </span>
              <span className="hub-dot" />
            </div>
            <div className="system-branches">
              <i />
              <i />
              <i />
            </div>
            <div className="system-modules">
              {[
                { Icon: Users, title: "HRIS", text: "People & teams" },
                {
                  Icon: ReceiptText,
                  title: "Accounting",
                  text: "Finances & reports",
                },
                { Icon: Box, title: "Warehouse", text: "Stock & operations" },
              ].map(({ Icon, title, text }) => (
                <div className="system-module" key={title}>
                  <Icon size={26} strokeWidth={1.2} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span>
                    <Check size={11} /> Connected
                  </span>
                </div>
              ))}
            </div>
            <p className="diagram-note">YOUR WORKFLOW, REIMAGINED.</p>
          </div>
        </div>
      </section>

      <section className="home-section process-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A CLEAR PATH FORWARD</p>
            <h2>
              From your first idea.
              <br />
              To your next chapter.
            </h2>
          </div>
          <Link className="text-link" href="/requirements">
            Prepare your project brief <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="process-grid">
          {[
            [
              "Tell us your vision.",
              "Share your workflow, your users, and what you want to do better. A conversation is a good place to start.",
            ],
            [
              "Define what matters.",
              "Together, we agree on priorities, scope, budget, and timeline. Clear expectations, before the first line of code.",
            ],
            [
              "Build. Review. Refine.",
              "See your system take shape. Review real workflows and give feedback against the scope we’ve agreed.",
            ],
            [
              "Make your next move.",
              "Launch with an agreed deployment plan, documentation, and access handover. Plan ongoing support together.",
            ],
          ].map(([title, description], i) => (
            <article key={title}>
              <span className="step-number">
                0{i + 1}
                <span />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section faq-section">
        <div>
          <p className="eyebrow">A LITTLE MORE CLARITY</p>
          <h2>
            Good questions.
            <br />
            Straight answers.
          </h2>
          <p className="faq-intro">
            Have something else in mind?
            <br />
            <Link className="text-link" href="/contact">
              Let’s talk <ArrowUpRight size={15} />
            </Link>
          </p>
        </div>
        <div className="faq-list">
          {[
            [
              "Can you build a complete ERP system?",
              "Yes. We can scope HRIS, accounting, and warehouse modules together or start with one. Share your approval rules, reporting needs, user roles, and existing records so we can plan how your system should work.",
            ],
            [
              "What if I already have an application?",
              "We can help with bug fixes, new features, integrations, or maintenance. We first review the current codebase, access requirements, and the problem you want to solve.",
            ],
            [
              "How much will my project cost?",
              "Cost and delivery time depend on the agreed requirements, integrations, data migration, and support needs. Send your priorities and budget range so we can discuss a realistic scope.",
            ],
            [
              "What should I prepare to get started?",
              "Describe your business process, who will use the software, and your must-have features. Include sample documents with sensitive information removed. Our requirements guide will help you prepare a useful brief.",
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={18} strokeWidth={1.4} />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <p className="eyebrow">THE NEXT CHAPTER IS YOURS.</p>
        <h2>
          Let’s build
          <br />
          <span>something that matters.</span>
        </h2>
        <p>A new application. A connected business. A better way forward.</p>
        <Link className="button-primary" href="/contact">
          Start your project <ArrowUpRight size={16} />
        </Link>
        <Link className="closing-secondary" href="/requirements">
          Not sure where to start? Read our requirements guide{" "}
          <ArrowUpRight size={13} />
        </Link>
      </section>
    </div>
  );
}
