import {
  ArrowRight,
  CalendarDays,
  Download,
  Disc3,
  Eraser,
  Gift,
  ImagePlus,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ARTICLES } from "@/lib/articles";
import { SUPPORT_EMAIL } from "@/lib/site";

const features = [
  {
    title: "Result Cards",
    copy: "Create polished Swiss and Top Cut player cards with rounds, scores, records, titles, and multiple card designs.",
    icon: Trophy,
  },
  {
    title: "Pub Mats",
    copy: "Design event posters with shop details, schedule, entry fees, prizes, guests, sponsors, notes, and custom images.",
    icon: ImagePlus,
  },
  {
    title: "Winner Posts",
    copy: "Create post-tournament winner graphics with player photos, logos, custom colors, backgrounds, and social templates.",
    icon: Trophy,
  },
  {
    title: "Organizer Workflow",
    copy: "Use manual entry, Challonge imports, live previews, quick edits, feedback, and one-click JPG downloads.",
    icon: Target,
  },
  {
    title: "Background Remover",
    copy: "Remove image backgrounds instantly in your browser — no upload, no account, no API key. Download a clean transparent PNG.",
    icon: Eraser,
    href: "/bg-remover",
  },
  {
    title: "Deck Builder",
    copy: "Build your own 3G/4G/5G/6G Beyblade X deck from scraped part images — UX & BX standard combos or full CX custom builds.",
    icon: Disc3,
    href: "/deck-builder",
  },
];

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#090909] text-foreground">
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#090909]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/icon.png"
              alt="Leandro's Tournament Card Generator"
              className="h-10 w-10"
              draggable={false}
            />
            <span className="font-condensed text-sm font-black uppercase tracking-[0.18em] text-white">
              Leandro's Tool
            </span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="#features"
              className="hidden px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.18em] text-white/60 transition hover:text-primary sm:inline-flex"
            >
              Features
            </a>
            <a
              href="/bg-remover"
              className="hidden px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.18em] text-white/60 transition hover:text-primary sm:inline-flex"
            >
              BG Remover
            </a>
            <a
              href="/deck-builder"
              className="hidden px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.18em] text-white/60 transition hover:text-primary sm:inline-flex"
            >
              Deck Builder
            </a>
            <a
              href="/articles"
              className="hidden px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.18em] text-white/60 transition hover:text-primary sm:inline-flex"
            >
              Articles
            </a>
            <Button asChild className="ml-2 font-condensed uppercase tracking-[0.12em]">
              <a href="/tool">
                Open Tool
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,212,232,.14),transparent_36%,rgba(245,34,54,.16)_68%,rgba(216,144,35,.12))]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_520px] lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 font-condensed text-xs font-black uppercase text-primary">
              <Gift className="h-4 w-4" />
              Free tool for everyone
            </div>
            <h1 className="mt-6 font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
              Tournament cards and pub mats in one place
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
              A free tournament content tool anyone can use, especially
              Tournament Organizers who need clean player result cards and event
              graphics without opening a design app.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 font-condensed text-base font-black uppercase"
              >
                <a href="/tool">
                  Start Creating
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 border-white/20 bg-white/5 font-condensed text-base font-black uppercase"
              >
                <a href="#features">See What's Inside</a>
              </Button>
            </div>
          </div>

          <div className="pb-6 lg:pb-0">
            <div className="overflow-hidden rounded-lg border border-white/12 bg-black shadow-2xl shadow-primary/10">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/icon.png"
                    alt="Leandro's Tournament Card Generator"
                    className="h-10 w-10"
                    draggable={false}
                  />
                  <div>
                    <div className="font-condensed text-sm font-black uppercase text-white">
                      Tool Preview
                    </div>
                    <div className="text-xs text-white/48">
                      Cards, pub mats, exports
                    </div>
                  </div>
                </div>
                <Sparkles className="h-5 w-5 text-primary" />
              </div>

              <div className="card-stage p-4">
                <div className="rounded-md border border-primary/25 bg-[#071012] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-condensed text-xs font-black uppercase text-primary">
                        Tournament report
                      </div>
                      <div className="mt-2 font-display text-5xl leading-none text-white">
                        PLAYER
                      </div>
                      <div className="mt-2 text-sm text-white/58">
                        Swiss stage result card
                      </div>
                    </div>
                    <div className="rounded-md border border-[#ffd76a]/30 bg-[#ffd76a]/10 px-3 py-2 text-right">
                      <div className="font-display text-3xl leading-none text-[#ffd76a]">
                        001
                      </div>
                      <div className="font-condensed text-[10px] font-black uppercase text-white/50">
                        Card No.
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-2">
                    {["R1  Win  4 - 1", "R2  Win  4 - 2", "R3  Loss  2 - 4"].map(
                      (row) => (
                        <div
                          key={row}
                          className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-white/78"
                        >
                          <span>{row}</span>
                          <Trophy className="h-4 w-4 text-primary" />
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <div className="rounded-md bg-primary/12 p-3">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <div className="mt-2 font-condensed text-sm font-black uppercase text-white">
                        Event details
                      </div>
                    </div>
                    <div className="rounded-md bg-[#f52236]/12 p-3">
                      <Download className="h-4 w-4 text-[#ff697a]" />
                      <div className="mt-2 font-condensed text-sm font-black uppercase text-white">
                        JPG download
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="mb-6">
          <h2 className="font-display text-4xl leading-none text-white">
            What's in the tool
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
            Everything is built around fast tournament posting: enter details,
            preview the graphic, then download a JPG for social pages, chats, or
            event recaps.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const accents = [
              ["#ff3bd4", "#30f2ff"],
              ["#f6ff41", "#ff6a00"],
              ["#30f2ff", "#ff3bd4"],
              ["#8cff3d", "#30f2ff"],
              ["#ff6a00", "#f6ff41"],
              ["#ffffff", "#ff3bd4"],
            ][index % 6];
            return (
              <div
                key={feature.title}
                className="graffiti-module-card flex min-h-[230px] flex-col rounded-lg border p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/25"
              >
                <div
                  className="flex h-11 w-11 -rotate-3 items-center justify-center rounded-md border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,.85)]"
                  style={{ background: accents[0], color: "#090909" }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3
                  className="font-graffiti mt-5 text-4xl uppercase leading-none text-white"
                  style={{
                    textShadow: `3px 3px 0 ${accents[1]}, 5px 5px 0 #000`,
                  }}
                >
                  {feature.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-white/60">
                  {feature.copy}
                </p>
                {"href" in feature && feature.href && (
                  <a
                    href={feature.href}
                    className="mt-4 inline-flex items-center gap-1 self-start border border-white/15 bg-black/55 px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.12em] transition hover:border-white/30"
                    style={{ color: accents[0] }}
                  >
                    Try it
                    <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
          <p className="font-condensed text-xs font-black uppercase tracking-[0.18em] text-primary">
            Organizer guide
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-white">
            How to make a useful tournament result card
          </h2>
          <div className="mt-8 grid gap-8 text-sm leading-7 text-white/65 md:grid-cols-3">
            <article>
              <h3 className="font-condensed text-lg font-black uppercase text-white">
                Record the event clearly
              </h3>
              <p className="mt-2">
                Start with the tournament name, date, venue, player name, and
                final placement. A viewer should understand what happened even
                when the image is reposted without its original caption.
              </p>
            </article>
            <article>
              <h3 className="font-condensed text-lg font-black uppercase text-white">
                Check every round
              </h3>
              <p className="mt-2">
                Enter wins, losses, scores, and opponents consistently. Review
                imported Challonge data before exporting, especially renamed
                players, byes, and matches entered after the event.
              </p>
            </article>
            <article>
              <h3 className="font-condensed text-lg font-black uppercase text-white">
                Design for the destination
              </h3>
              <p className="mt-2">
                Use high-contrast text and a simple background for mobile feeds.
                Keep logos away from names and scores, then inspect the preview
                at a small size before downloading the final JPG.
              </p>
            </article>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <article>
              <h2 className="font-display text-3xl leading-none text-white">
                A practical event-posting workflow
              </h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-white/65">
                <li>Collect the confirmed standings from the event organizer.</li>
                <li>Choose a result card, winner post, or pub mat template.</li>
                <li>Add only details that help players identify the event.</li>
                <li>Preview names, scores, logos, and image crops for mistakes.</li>
                <li>Download the graphic and add accessible context to the post.</li>
              </ol>
            </article>
            <article>
              <h2 className="font-display text-3xl leading-none text-white">
                What this site does with your images
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/65">
                The card generator builds the preview in your browser. The
                background remover also processes images locally, so the image
                does not need to be uploaded to a removal service. You remain
                responsible for having permission to use player photos, logos,
                and other artwork included in an export.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-condensed text-xs font-black uppercase tracking-[0.18em] text-primary">
              Guides
            </p>
            <h2 className="mt-2 font-display text-4xl leading-none text-white">Latest articles</h2>
          </div>
          <Link
            href="/articles"
            className="font-condensed text-xs font-black uppercase tracking-[0.18em] text-white/60 hover:text-primary"
          >
            All articles
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex flex-col rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-primary/40 hover:bg-white/[0.05]"
            >
              <p className="font-condensed text-xs font-black uppercase tracking-[0.16em] text-primary">
                {article.category}
              </p>
              <h3 className="mt-2 font-display text-xl leading-tight text-white group-hover:text-primary">
                {article.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-white/60">{article.description}</p>
              <p className="mt-4 text-xs text-white/40">{article.readingTime}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <p className="font-condensed text-xs font-black uppercase tracking-[0.18em] text-primary">
            About the creator
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-white">
            Built by Leandro, a developer and player
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/65">
            I&apos;m Leandro — I build this site in my spare time. I play and help out around
            Beyblade X locals, and this project started as a way to solve my own problem: making
            clean result cards and event graphics without opening a full design app between
            rounds. That&apos;s still the goal — free, fast tools for the actual work of running
            and documenting an event.
          </p>
          <p className="mt-8 flex flex-wrap gap-5 text-xs">
            <a className="font-condensed font-black uppercase tracking-[0.16em] text-primary hover:underline" href="/about">
              Read the full about page
            </a>
            <a className="font-condensed font-black uppercase tracking-[0.16em] text-white/60 hover:text-white" href={`mailto:${SUPPORT_EMAIL}`}>
              Email {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© {new Date().getFullYear()} Leandro&apos;s Tournament Card Generator</p>
        <nav aria-label="Site information" className="flex flex-wrap gap-5">
          <a className="hover:text-white" href="/about">About</a>
          <a className="hover:text-white" href="/articles">Articles</a>
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
