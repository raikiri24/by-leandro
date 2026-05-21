import {
  ArrowRight,
  CalendarDays,
  Download,
  Gift,
  ImagePlus,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    title: "Organizer Workflow",
    copy: "Use manual entry, Challonge imports, live previews, quick edits, feedback, and one-click JPG downloads.",
    icon: Target,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#090909] text-foreground">
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
            <Button asChild className="font-condensed uppercase tracking-[0.12em]">
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
        <div className="grid gap-3 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-condensed text-2xl font-black uppercase text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  {feature.copy}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
