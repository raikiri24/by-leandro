import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles & Guides",
  description:
    "Guides on Beyblade X deck building, tournament formats, Challonge imports, and event design — written around how this site's tools actually work.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#090909] text-white">
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <a href="/" className="font-condensed text-sm font-black uppercase tracking-[0.16em]">
            Leandro&apos;s Tool
          </a>
          <a href="/tool" className="text-sm text-primary hover:underline">
            Open tool
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-5 py-14">
        <h1 className="font-display text-5xl leading-none text-white">Articles &amp; guides</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
          Practical guides on Beyblade X deck building, tournament formats, and running events —
          grounded in how the card generator, deck builder, and Challonge import actually work.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex flex-col rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-primary/40 hover:bg-white/[0.05]"
            >
              <p className="font-condensed text-xs font-black uppercase tracking-[0.16em] text-primary">
                {article.category}
              </p>
              <h2 className="mt-2 font-display text-2xl leading-tight text-white group-hover:text-primary">
                {article.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-white/60">{article.description}</p>
              <p className="mt-4 text-xs text-white/40">{article.readingTime}</p>
            </Link>
          ))}
        </div>
      </div>

      <footer className="mx-auto max-w-5xl px-5 pb-14 text-xs text-white/45">
        <nav aria-label="Site information" className="flex flex-wrap gap-5 border-t border-white/10 pt-6">
          <a className="hover:text-white" href="/about">
            About
          </a>
          <a className="hover:text-white" href="/faq">
            Help
          </a>
          <a className="hover:text-white" href="/changelog">
            Changelog
          </a>
          <a className="hover:text-white" href="/contact">
            Contact
          </a>
          <a className="hover:text-white" href="/privacy">
            Privacy
          </a>
          <a className="hover:text-white" href="/terms">
            Terms
          </a>
        </nav>
      </footer>
    </main>
  );
}
