import type { ReactNode } from "react";

export function InfoPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <main id="main-content" className="min-h-screen bg-[#090909] text-white">
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
          <a href="/" className="font-condensed text-sm font-black uppercase tracking-[0.16em]">Leandro&apos;s Tool</a>
          <a href="/tool" className="text-sm text-primary hover:underline">Open tool</a>
        </div>
      </nav>
      <article className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="font-display text-5xl leading-none">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-white/70">{intro}</p>
        <div className="mt-10 space-y-8 text-sm leading-7 text-white/65">{children}</div>
      </article>
      <footer className="mx-auto max-w-3xl px-5 pb-14 text-xs text-white/45">
        <nav aria-label="Site information" className="flex flex-wrap gap-5 border-t border-white/10 pt-6">
          <a className="hover:text-white" href="/about">About</a>
          <a className="hover:text-white" href="/faq">Help</a>
          <a className="hover:text-white" href="/changelog">Changelog</a>
          <a className="hover:text-white" href="/contact">Contact</a>
          <a className="hover:text-white" href="/privacy">Privacy</a>
          <a className="hover:text-white" href="/terms">Terms</a>
        </nav>
      </footer>
    </main>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2 className="font-condensed text-xl font-black uppercase text-white">{title}</h2><div className="mt-2 space-y-3">{children}</div></section>;
}
