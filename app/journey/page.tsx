import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Journey",
  description: "Read our thoughts on software engineering, product development, design philosophies, and our operational updates.",
};

const posts = [
  {
    slug: "how-an-idea-becomes-an-application",
    title: "How an Idea Becomes an Application",
    excerpt: "A transparent breakdown of our development cycle: going from an abstract napkin sketch to a secure, deployed database system with zero wasted budget.",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    tag: "METHODOLOGY",
  },
  {
    slug: "why-we-prefer-uncompromising-vanilla-css",
    title: "Why We Prefer Uncompromising Vanilla CSS over Complex Frameworks",
    excerpt: "Our engineering rationale for prioritizing clean modern CSS variables and native layouts instead of relying on heavy utility wrappers for lightweight web applications.",
    date: "Nov 28, 2024",
    readTime: "4 min read",
    tag: "OPINION",
  },
  {
    slug: "database-indexing-for-beginners",
    title: "Database Indexing: The Invisible Performance Multiplier",
    excerpt: "Stop buying larger cloud servers to fix slow query loading times. Learn how basic index constraints and layout normalization can accelerate speeds by 100x.",
    date: "Oct 14, 2024",
    readTime: "5 min read",
    tag: "TUTORIAL",
  }
];

export default function JourneyPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Journey Hero */}
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
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">Journey</span> & Methods
          </h1>
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl leading-relaxed">
            We write transparently about technical decisions, project failures, design structures, and the software methodologies we leverage daily to deliver absolute value.
          </p>
        </div>
      </section>

      {/* Blog Posts Listing */}
      <section className="py-24 container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="space-y-12">
          {posts.map((post) => (
            <div 
              key={post.slug} 
              className="group border-b border-border pb-12 last:border-b-0 flex flex-col md:grid md:grid-cols-12 md:gap-8 items-start"
            >
              {/* Meta block */}
              <div className="md:col-span-3 mb-4 md:mb-0 text-xs font-mono text-secondaryText space-y-1">
                <span className="text-foreground font-bold tracking-widest block mb-2 text-[10px] bg-surface border border-border px-2 py-1 w-fit rounded-sm">
                  {post.tag}
                </span>
                <div className="flex items-center gap-1.5">
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-60">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Title & Excerpt */}
              <div className="md:col-span-9 flex flex-col justify-between">
                <div>
                  {/* Since only the first article is fully built, we conditionally link or flag */}
                  {post.slug === "how-an-idea-becomes-an-application" ? (
                    <Link href={`/journey/${post.slug}`}>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3 hover:text-white transition-colors cursor-pointer group-hover:translate-x-0.5 inline-block">
                        {post.title}
                      </h2>
                    </Link>
                  ) : (
                    <h2 className="font-display text-2xl font-bold text-foreground mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                      {post.title} <span className="text-xs font-mono text-secondaryText font-normal">(Coming Soon)</span>
                    </h2>
                  )}
                  <p className="text-secondaryText text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>
                {post.slug === "how-an-idea-becomes-an-application" && (
                  <Link 
                    href={`/journey/${post.slug}`} 
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] text-foreground hover:text-secondaryText transition-colors"
                  >
                    READ ARTICLE <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
            Want to build with our team?
          </h2>
          <p className="text-secondaryText text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            We bring this same level of transparency and clear, strategic thinking to every software codebase we engineer.
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
