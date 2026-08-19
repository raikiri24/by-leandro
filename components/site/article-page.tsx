import type { ReactNode } from "react";
import Link from "next/link";
import { ARTICLES, getRelatedArticles, type ArticleMeta } from "@/lib/articles";
import { SITE_NAME, SITE_URL } from "@/lib/site";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function ArticlePage({
  meta,
  toc,
  children,
}: {
  meta: ArticleMeta;
  toc?: { id: string; label: string }[];
  children: ReactNode;
}) {
  const related = getRelatedArticles(meta.relatedSlugs);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
    author: { "@type": "Person", name: "Leandro", url: `${SITE_URL}/about` },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/articles/${meta.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE_URL}/articles` },
      { "@type": "ListItem", position: 3, name: meta.title, item: `${SITE_URL}/articles/${meta.slug}` },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#090909] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
          <a href="/" className="font-condensed text-sm font-black uppercase tracking-[0.16em]">
            Leandro&apos;s Tool
          </a>
          <a href="/tool" className="text-sm text-primary hover:underline">
            Open tool
          </a>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-5 py-14">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/45">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/articles" className="hover:text-white">
            Articles
          </Link>
          <span aria-hidden>/</span>
          <span className="text-white/70">{meta.title}</span>
        </nav>

        <p className="mt-6 font-condensed text-xs font-black uppercase tracking-[0.18em] text-primary">
          {meta.category}
        </p>
        <h1 className="mt-2 font-display text-4xl leading-none text-white sm:text-5xl">{meta.title}</h1>
        <p className="mt-5 text-lg leading-8 text-white/70">{meta.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/45">
          <span>By Leandro</span>
          <span aria-hidden>·</span>
          <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time>
          {meta.updatedAt !== meta.publishedAt && (
            <>
              <span aria-hidden>·</span>
              <span>Updated {formatDate(meta.updatedAt)}</span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{meta.readingTime}</span>
        </div>

        {toc && toc.length > 0 && (
          <nav
            aria-label="Table of contents"
            className="mt-8 rounded-md border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="font-condensed text-xs font-black uppercase tracking-[0.16em] text-white/50">
              In this guide
            </p>
            <ol className="mt-3 space-y-1.5 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-white/70 hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-10 space-y-8 text-sm leading-7 text-white/70">{children}</div>

        {related.length > 0 && (
          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="font-condensed text-xs font-black uppercase tracking-[0.18em] text-white/50">
              Related reading
            </p>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/articles/${item.slug}`}
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      <footer className="mx-auto max-w-3xl px-5 pb-14 text-xs text-white/45">
        <nav aria-label="Site information" className="flex flex-wrap gap-5 border-t border-white/10 pt-6">
          <a className="hover:text-white" href="/about">
            About
          </a>
          <a className="hover:text-white" href="/articles">
            Articles
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

export function ArticleSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 id={id} className="scroll-mt-24 font-condensed text-xl font-black uppercase text-white">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export { ARTICLES };
