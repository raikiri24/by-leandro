import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, HelpCircle, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Development Services",
  description: "Practical Artificial Intelligence integrations, Large Language Model (LLM) customization, and Retrieval-Augmented Generation (RAG) for secure, business-specific workflows.",
};

const problems = [
  {
    title: "Manual Document Crawling",
    desc: "Your team spends hours reading PDFs, contracts, or documentation to find specific answers. We build custom semantic search tools to scan and fetch accurate details instantly."
  },
  {
    title: "Customer Support Burnout",
    desc: "Your support desk is buried under a mountain of repetitive questions, slowing response times. We build intelligent agent assistants that answer queries safely based on your own knowledge base."
  },
  {
    title: "Fear of Secret Leaks & Hallucination",
    desc: "You want to implement AI but are terrified of models making up facts or exposing private company secrets to public training pools. We set up isolated, highly secure guardrails."
  }
];

const processSteps = [
  { num: "01", title: "Feasibility Check", desc: "We evaluate your AI concept to ensure it is actually solvable with modern LLMs and that the investment makes sense for your operational margins." },
  { num: "02", title: "Data Preparation", desc: "We structure, chunk, and embed your private documents or guidelines into a secure vector database, creating the base for accurate Retrieval-Augmented Generation (RAG)." },
  { num: "03", title: "Model Setup & Prompts", desc: "We integrate state-of-the-art APIs (Gemini, OpenAI, Claude) or host lightweight open-source models, tuning prompt engineering and agent roles." },
  { num: "04", title: "Safety Guardrails", desc: "We apply strict content filtering, validation rules, and input-output checkers to minimize hallucinations and keep responses professional." }
];

const faqs = [
  {
    q: "Will our proprietary company data be used to train public models?",
    a: "No. We utilize commercial API agreements and custom cloud endpoints where providers explicitly guarantee that your input data and documents will never be saved, leaked, or used for model training purposes."
  },
  {
    q: "What is Retrieval-Augmented Generation (RAG)?",
    a: "RAG is a technique where the AI model is given access to a search engine of your private documents. Before answering, the AI looks up the exact, correct text block from your guidelines and references it directly, drastically reducing hallucinations."
  },
  {
    q: "Can we run AI models locally or inside our private cloud?",
    a: "Yes. For highly sensitive files, we can deploy open-source models (such as Llama 3 or Mistral) inside your own secure AWS or Google Cloud account so no data ever leaves your servers."
  }
];

export default function AiDevelopmentPage() {
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
            <span className="text-xs font-mono text-foreground">AI DEVELOPMENT</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 border border-border bg-surface flex items-center justify-center rounded-sm">
              <Cpu className="w-5 h-5 text-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-foreground">
              AI Development
            </h1>
          </div>
          
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl leading-relaxed">
            Skip the artificial hype. We help you integrate secure, highly practical machine learning and language model features that directly save your team hours of manual work.
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
              Harnessing cognitive automation safely and realistically.
            </h3>
            <p className="text-secondaryText text-sm leading-relaxed mb-4">
              AI is not a magical cure-all, but it is an incredibly powerful tool for pattern recognition, summarization, and data translation. AI Development means building the connectors and guardrails around LLMs so they interact with your software reliably.
            </p>
            <p className="text-secondaryText text-sm leading-relaxed">
              We focus on building vector search indices, structuring inputs, and parsing outputs so that your AI features behave like predictable, high-speed software functions rather than erratic chat clients.
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
                  <h4 className="font-display text-sm font-bold text-foreground">Content & Support Teams</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Departments drowning in customer inquiries or long documents who need instant, context-aware assistance based strictly on company handbooks.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">Innovative SaaS Founders</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Founders seeking to add predictive scoring, smart categorizations, or intelligent assistants directly into their digital applications.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">Compliance-Strict Firms</h4>
                  <p className="text-secondaryText text-xs leading-relaxed mt-1">Companies wishing to implement AI features while retaining complete cloud isolation, data protection, and rigorous audit trails.</p>
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
              COGNITIVE BOTTLENECKS
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
              Our AI Integration Process
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
              AI Solutions We Build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">Smart RAG Search Systems</h4>
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  Intelligent internal or client-facing search engines that parse thousands of company PDF files and respond with cited, highly-focused solutions.
                </p>
              </div>
              <ul className="text-xs text-secondaryText space-y-2 font-mono">
                <li>&middot; Vector database setups (Pinecone/pgvector)</li>
                <li>&middot; Document pre-processing & parsing pipelines</li>
                <li>&middot; Source citation & validation checkers</li>
              </ul>
            </div>

            <div className="p-8 border border-border bg-background rounded-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-lg font-bold text-foreground mb-2">Automated Data Extraction & Labeling</h4>
                <p className="text-secondaryText text-sm leading-relaxed mb-6">
                  Intelligent parsing algorithms that extract structured data (like invoice totals, user details, and line items) from raw emails, files, or images.
                </p>
              </div>
              <ul className="text-xs text-secondaryText space-y-2 font-mono">
                <li>&middot; Optical Character Recognition (OCR) fine-tuning</li>
                <li>&middot; JSON schema-constrained model outputs</li>
                <li>&middot; Automated queue integrations</li>
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
              AI Implementation Questions
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
                  Exploring the integration of image scanning to instantly identify beyblade blades, ratchets, and bits using device cameras.
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
                  Where artificial intelligence fits in the modern roadmap of product prototyping and validation.
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
          Ready to integrate smart features?
        </h2>
        <p className="text-secondaryText text-lg mb-10 leading-relaxed">
          Let&apos;s build secure, predictable, and highly valuable AI modules that make your software genuinely intelligent.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
        >
          START AN AI PROJECT
        </Link>
      </section>
    </div>
  );
}
