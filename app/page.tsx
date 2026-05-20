"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  ImagePlus,
  Loader2,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Trophy,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ─── types ────────────────────────────────────────────────────────────────────
type CardType = "swiss" | "topcut";
type GeneratorMode = "cards" | "pubmat";
type LayoutKey = "report" | "arcade" | "blade" | "award" | "minimal";
type PubMatThemeKey = "deadly" | "pop" | "clean";
type DesignKey =
  | "signal"
  | "ember"
  | "retro"
  | "neon"
  | "crimson"
  | "storm"
  | "prestige"
  | "solar"
  | "ghost"
  | "jade";

type Design = {
  label: string;
  tagline: string;
  layout: LayoutKey;
  a: string;
  b: string;
  bg: string;
  panel: string;
  text: string;
};

type Round = {
  rnd: string;
  opp: string;
  score: string;
  result: "win" | "loss";
};
type TopCutMatch = {
  stage: string;
  opp: string;
  score: string;
  result: Round["result"];
};
type ScrapedMatch = {
  round: number;
  p1: string;
  p2: string;
  s1: number;
  s2: number;
  winner: string;
  stage?: "group" | "final";
};
type ScrapedData = {
  name: string;
  date: string;
  participants: string[];
  matches: ScrapedMatch[];
};
type FormState = {
  player: string;
  tournament: string;
  organizer: string;
  date: string;
  game: string;
  cardNum: string;
  advMsg: string;
  finalsOpp: string;
  finalsSc: string;
  finalsResult: Round["result"];
  champTitle: string;
  tcRecord: string;
};
type CardProps = {
  form: FormState;
  rounds: Round[];
  topCut: TopCutMatch[];
  cardType: CardType;
  palette: Design;
};
type ImageSlotKey =
  | "hero"
  | "product"
  | "gallery1"
  | "gallery2"
  | "gallery3"
  | "gallery4";
type PubMatState = {
  shopName: string;
  partners: string;
  game: string;
  eventName: string;
  eventType: string;
  venue: string;
  date: string;
  prepTime: string;
  startTime: string;
  preRegPrice: string;
  walkInPrice: string;
  prizeHeadline: string;
  guestHeadline: string;
  guests: string[];
  sponsors: string[];
  notes: string[];
  images: Record<ImageSlotKey, string>;
};
type PubMatTheme = {
  label: string;
  bg: string;
  paper: string;
  ink: string;
  muted: string;
  accent: string;
  accent2: string;
  block: string;
};

// ─── design catalog ───────────────────────────────────────────────────────────
const designs: Record<DesignKey, Design> = {
  // report layout
  signal: {
    label: "Signal",
    tagline: "Cyber Report",
    layout: "report",
    a: "#00d4e8",
    b: "#0e5962",
    bg: "#071012",
    panel: "rgba(0,212,232,.09)",
    text: "#e8feff",
  },
  ember: {
    label: "Ember",
    tagline: "Blazing Fire",
    layout: "report",
    a: "#ff8c00",
    b: "#6f3d05",
    bg: "#130c06",
    panel: "rgba(255,140,0,.1)",
    text: "#fff5e8",
  },
  // arcade layout
  retro: {
    label: "Retro",
    tagline: "Retro Score",
    layout: "arcade",
    a: "#ffe066",
    b: "#7a5e00",
    bg: "#0c0900",
    panel: "rgba(255,224,102,.08)",
    text: "#fff9dd",
  },
  neon: {
    label: "Neon",
    tagline: "Cyber District",
    layout: "arcade",
    a: "#ff00ff",
    b: "#6b0069",
    bg: "#0f0010",
    panel: "rgba(255,0,255,.08)",
    text: "#ffe8ff",
  },
  // blade layout
  crimson: {
    label: "Crimson",
    tagline: "Battle Cuts",
    layout: "blade",
    a: "#ff2d55",
    b: "#6e0f24",
    bg: "#120508",
    panel: "rgba(255,45,85,.09)",
    text: "#ffe8ec",
  },
  storm: {
    label: "Storm",
    tagline: "Frozen Edge",
    layout: "blade",
    a: "#78d6ff",
    b: "#2b5e7a",
    bg: "#080f14",
    panel: "rgba(120,214,255,.08)",
    text: "#e8f7ff",
  },
  // award layout
  prestige: {
    label: "Prestige",
    tagline: "Championship",
    layout: "award",
    a: "#f5d76e",
    b: "#735f22",
    bg: "#111008",
    panel: "rgba(245,215,110,.1)",
    text: "#fff9dd",
  },
  solar: {
    label: "Solar",
    tagline: "Radiant Glory",
    layout: "award",
    a: "#ff7c00",
    b: "#7a3500",
    bg: "#130800",
    panel: "rgba(255,124,0,.09)",
    text: "#fff0e0",
  },
  // minimal layout
  ghost: {
    label: "Ghost",
    tagline: "Pure Form",
    layout: "minimal",
    a: "#e8e8e8",
    b: "#4a4a4a",
    bg: "#080808",
    panel: "rgba(255,255,255,.06)",
    text: "#ffffff",
  },
  jade: {
    label: "Jade",
    tagline: "Ancient Forest",
    layout: "minimal",
    a: "#00ff88",
    b: "#146344",
    bg: "#07120d",
    panel: "rgba(0,255,136,.08)",
    text: "#edfff6",
  },
};

const initialRounds: Round[] = [
  { rnd: "R1", opp: "", score: "", result: "win" },
  { rnd: "R2", opp: "", score: "", result: "win" },
  { rnd: "R3", opp: "", score: "", result: "loss" },
];

const pubMatThemes: Record<PubMatThemeKey, PubMatTheme> = {
  deadly: {
    label: "Deadly Spin",
    bg: "#111111",
    paper: "#e8e3d8",
    ink: "#202124",
    muted: "#6b665e",
    accent: "#f52236",
    accent2: "#7a1720",
    block: "#111111",
  },
  pop: {
    label: "Pop Blast",
    bg: "#0b1020",
    paper: "#f7f3ff",
    ink: "#151322",
    muted: "#6d647d",
    accent: "#ff3d9a",
    accent2: "#00a6ff",
    block: "#151322",
  },
  clean: {
    label: "Shop Board",
    bg: "#101316",
    paper: "#f6f7f2",
    ink: "#181a1c",
    muted: "#666b70",
    accent: "#1d9a6c",
    accent2: "#f4b942",
    block: "#181a1c",
  },
};

const initialPubMat: PubMatState = {
  shopName: "Hobby Shop",
  partners: "Community Tournament",
  game: "Beyblade X",
  eventName: "Grand Tournament",
  eventType: "Ranked Event",
  venue: "At Your Hobby Shop",
  date: "05.23.26",
  prepTime: "11AM Prep",
  startTime: "12PM Start",
  preRegPrice: "P649",
  walkInPrice: "P699",
  prizeHeadline: "Progressive Prizes",
  guestHeadline: "With Special Guests",
  guests: ["Guest One", "Guest Two", "Guest Three", "Guest Four"],
  sponsors: ["Shop", "Team", "Cafe", "League", "Brand", "Club"],
  notes: ["Limited slots", "Bring legal deck", "On-site registration"],
  images: {
    hero: "",
    product: "",
    gallery1: "",
    gallery2: "",
    gallery3: "",
    gallery4: "",
  },
};

// ─── page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const cardRef = useRef<HTMLDivElement>(null);
  const previewViewportRef = useRef<HTMLDivElement>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [previewSize, setPreviewSize] = useState({ height: 0, scale: 1 });
  const [generatorMode, setGeneratorMode] = useState<GeneratorMode>("cards");
  const [mode, setMode] = useState<"manual" | "scrape">("manual");
  const [cardType, setCardType] = useState<CardType>("swiss");
  const [design, setDesign] = useState<DesignKey>("signal");
  const [pubTheme, setPubTheme] = useState<PubMatThemeKey>("deadly");
  const [pubMat, setPubMat] = useState<PubMatState>(initialPubMat);
  const [scrapeUrl, setScrapeUrl] = useState("https://challonge.com/kr11x97w");
  const [scrapePlayer, setScrapePlayer] = useState("");
  const [scraped, setScraped] = useState<ScrapedData | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [scrapeError, setScrapeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [form, setForm] = useState<FormState>({
    player: "PLAYER",
    tournament: "Tournament",
    organizer: "Organizer",
    date: new Date().toISOString().slice(0, 10),
    game: "Beyblade X",
    cardNum: "001",
    advMsg: "Advanced",
    finalsOpp: "",
    finalsSc: "1 - 0",
    finalsResult: "win",
    champTitle: "CHAMPION",
    tcRecord: "",
  });
  const [rounds, setRounds] = useState<Round[]>(initialRounds);
  const [topCut, setTopCut] = useState<TopCutMatch[]>([
    { stage: "Quarterfinals", opp: "", score: "1 - 0", result: "win" },
    { stage: "Semifinals", opp: "", score: "1 - 0", result: "win" },
  ]);

  const palette = designs[design];
  const canvasWidth = generatorMode === "pubmat" ? 780 : 680;
  const fallbackCanvasHeight = generatorMode === "pubmat" ? 1080 : 760;
  const previewScale = previewSize.scale;
  const previewBoxHeight =
    (previewSize.height || fallbackCanvasHeight) * previewScale;

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const viewport = previewViewportRef.current;
    const canvas = cardRef.current;
    if (!viewport || !canvas) return;

    const updatePreviewSize = () => {
      const nextScale = Math.min(1, viewport.clientWidth / canvasWidth);
      const nextHeight = canvas.offsetHeight;
      setPreviewSize((current) => {
        const scaleChanged = Math.abs(current.scale - nextScale) > 0.001;
        const heightChanged = Math.abs(current.height - nextHeight) > 1;
        return scaleChanged || heightChanged
          ? { height: nextHeight, scale: nextScale }
          : current;
      });
    };

    updatePreviewSize();
    const observer = new ResizeObserver(updatePreviewSize);
    observer.observe(viewport);
    observer.observe(canvas);
    window.addEventListener("resize", updatePreviewSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePreviewSize);
    };
  }, [canvasWidth, generatorMode]);

  const playerMatches = useMemo(() => {
    const needle = scrapePlayer.trim().toLowerCase();
    if (!scraped || !needle) return [];
    return scraped.matches
      .filter(
        (m) =>
          m.p1.toLowerCase().includes(needle) ||
          m.p2.toLowerCase().includes(needle),
      )
      .sort((a, b) => {
        const sA = a.stage === "final" ? 1 : 0;
        const sB = b.stage === "final" ? 1 : 0;
        return sA - sB || a.round - b.round;
      })
      .map((m) => {
        const isP1 = m.p1.toLowerCase().includes(needle);
        const mySc = isP1 ? m.s1 : m.s2;
        const oppSc = isP1 ? m.s2 : m.s1;
        const result: Round["result"] = m.winner.toLowerCase().includes(needle)
          ? "win"
          : "loss";
        return {
          round: m.round,
          opp: isP1 ? m.p2 : m.p1,
          mySc,
          oppSc,
          result,
          stage: m.stage || "group",
        };
      });
  }, [scraped, scrapePlayer]);

  async function runScraper() {
    setLoading(true);
    setScrapeError("");
    setLogs(["Starting server-side Challonge scrape..."]);
    try {
      const res = await fetch("/api/challonge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: scrapeUrl }),
      });
      const payload = await res.json();
      setLogs(payload.logs || []);
      if (!res.ok || !payload.ok)
        throw new Error(payload.error || "Scrape failed.");
      setScraped(payload.data);
      setForm((c) => ({
        ...c,
        tournament: payload.data.name || c.tournament,
        date: payload.data.date || c.date,
      }));
    } catch (err) {
      setScrapeError(err instanceof Error ? err.message : "Scrape failed.");
      setScraped(null);
    } finally {
      setLoading(false);
    }
  }

  function applyScrape() {
    if (!scraped || playerMatches.length === 0) return;
    const hasStage = playerMatches.some(
      (m) => m.stage === "group" || m.stage === "final",
    );
    const swiss = hasStage
      ? playerMatches.filter((m) => m.stage !== "final")
      : playerMatches.slice(0, 6);
    const cut = hasStage
      ? playerMatches.filter((m) => m.stage === "final")
      : playerMatches.slice(6);
    const finalRound = Math.max(
      0,
      ...scraped.matches.filter((m) => m.stage === "final").map((m) => m.round),
    );
    const lastCut = cut.at(-1);
    const reachedFinals = Boolean(
      lastCut && finalRound > 0 && lastCut.round === finalRound,
    );
    const finalsMatch = reachedFinals ? lastCut : undefined;
    const preFinalCut = reachedFinals ? cut.slice(0, -1) : cut;
    const title = !lastCut
      ? form.champTitle
      : lastCut.result === "win"
        ? "CHAMPION"
        : reachedFinals
          ? "FINALIST"
          : "ELIMINATED";
    const tcW = cut.filter((m) => m.result === "win").length;
    const tcL = cut.filter((m) => m.result === "loss").length;
    setForm((c) => ({
      ...c,
      player: scrapePlayer,
      tournament: scraped.name || c.tournament,
      date: scraped.date || c.date,
      advMsg: `${swiss.filter((m) => m.result === "win").length}W - ${swiss.filter((m) => m.result === "loss").length}L`,
      finalsOpp: finalsMatch?.opp || "",
      finalsSc: finalsMatch
        ? `${finalsMatch.mySc} - ${finalsMatch.oppSc}`
        : c.finalsSc,
      finalsResult: finalsMatch?.result || c.finalsResult,
      champTitle: cut.length ? title : c.champTitle,
      tcRecord: cut.length ? `${tcW}-${tcL}` : c.tcRecord,
    }));
    setRounds(
      swiss.map((m, i) => ({
        rnd: `R${i + 1}`,
        opp: m.opp,
        score: `${m.mySc} - ${m.oppSc}`,
        result: m.result,
      })),
    );
    if (cut.length) {
      setCardType("topcut");
      setTopCut(
        preFinalCut.map((m, i) => ({
          stage: topCutStageLabel(m.round, finalRound, i),
          opp: m.opp,
          score: `${m.mySc} - ${m.oppSc}`,
          result: m.result,
        })),
      );
    } else setCardType("swiss");
  }

  async function downloadCard() {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const fileName =
        generatorMode === "pubmat"
          ? `${pubMat.shopName}_${pubMat.eventName}_pub_mat`
          : `${form.player}_${form.tournament}_${cardType}`;
      const dataUrl = await toJpeg(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor:
          generatorMode === "pubmat" ? pubMatThemes[pubTheme].paper : palette.bg,
        quality: 0.95,
      });
      const a = document.createElement("a");
      a.download = fileName.replace(/\W+/g, "_").toLowerCase() + ".jpg";
      a.href = dataUrl;
      a.click();
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-[440px_1fr]">
      {showSplash && <SplashScreen />}
      <aside className="bg-card lg:h-screen lg:overflow-y-auto">
        <div className="sticky top-0 z-20 border-b bg-card/95 px-6 py-5 backdrop-blur">
          <h1 className="font-display text-3xl tracking-[0.15em] text-primary">
            Leandro's Tournament Card Generator
          </h1>
        </div>

        <Section title="Module">
          <div className="grid grid-cols-2 rounded-md border bg-secondary p-1">
            <Button
              variant={generatorMode === "cards" ? "default" : "ghost"}
              onClick={() => setGeneratorMode("cards")}
              className="font-condensed uppercase tracking-[0.18em]"
            >
              Cards
            </Button>
            <Button
              variant={generatorMode === "pubmat" ? "default" : "ghost"}
              onClick={() => setGeneratorMode("pubmat")}
              className="font-condensed uppercase tracking-[0.18em]"
            >
              Pub Mat
            </Button>
          </div>
        </Section>

        {generatorMode === "pubmat" ? (
          <PubMatEditor
            pubMat={pubMat}
            setPubMat={setPubMat}
            theme={pubTheme}
            setTheme={setPubTheme}
          />
        ) : (
          <>
        <Section title="Input Mode">
          <div className="grid grid-cols-2 rounded-md border bg-secondary p-1">
            {(["manual", "scrape"] as const).map((item) => (
              <Button
                key={item}
                variant={mode === item ? "default" : "ghost"}
                onClick={() => setMode(item)}
                className="font-condensed uppercase tracking-[0.18em]"
              >
                {item}
              </Button>
            ))}
          </div>
        </Section>

        {mode === "scrape" && (
          <Section title="Challonge Scraper">
            <div className="space-y-3 rounded-lg border border-primary/25 bg-primary/5 p-4">
              <p className="text-xs leading-6 text-muted-foreground">
                Server-side scraping avoids browser CORS and proxy failures.
              </p>
              <div className="flex gap-2">
                <Input
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                  className="font-mono"
                />
                <Button
                  onClick={runScraper}
                  disabled={loading}
                  size="icon"
                  aria-label="Fetch tournament"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {logs.length > 0 && (
                <pre className="max-h-28 overflow-auto rounded-md bg-black/30 p-3 font-mono text-[10px] leading-5 text-muted-foreground">
                  {logs.join("\n")}
                </pre>
              )}
              {scrapeError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                  {scrapeError}
                </div>
              )}
              {scraped && (
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    {scraped.participants.length} players,{" "}
                    {scraped.matches.length} completed matches loaded.
                  </div>
                  <Input
                    value={scrapePlayer}
                    onChange={(e) => setScrapePlayer(e.target.value)}
                    placeholder="Type or choose player"
                  />
                  <div className="flex max-h-24 flex-wrap gap-2 overflow-auto">
                    {scraped.participants.map((name) => (
                      <button
                        key={name}
                        onClick={() => setScrapePlayer(name)}
                        className={cn(
                          "rounded-full border px-3 py-1 font-condensed text-sm font-bold",
                          scrapePlayer === name
                            ? "border-primary bg-primary/15 text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  {scrapePlayer && (
                    <div className="space-y-2">
                      {playerMatches.map((m, i) => (
                        <div
                          key={`${m.stage}-${m.round}-${m.opp}-${i}`}
                          className="grid grid-cols-[44px_1fr_72px_36px] items-center gap-2 rounded-md border bg-secondary px-3 py-2 text-sm"
                        >
                          <span className="font-mono text-xs text-muted-foreground">
                            {m.stage === "final" ? "F" : "G"}
                            {m.round}
                          </span>
                          <span className="truncate font-condensed text-lg font-bold">
                            {m.opp || "Bye"}
                          </span>
                          <span
                            className={cn(
                              "font-mono font-bold",
                              m.result === "win"
                                ? "text-primary"
                                : "text-destructive",
                            )}
                          >
                            {m.mySc} - {m.oppSc}
                          </span>
                          <span
                            className={cn(
                              "rounded px-2 py-1 text-center font-condensed text-xs font-bold",
                              m.result === "win"
                                ? "bg-primary/15 text-primary"
                                : "bg-destructive/15 text-destructive",
                            )}
                          >
                            {m.result === "win" ? "W" : "L"}
                          </span>
                        </div>
                      ))}
                      <Button
                        onClick={applyScrape}
                        disabled={playerMatches.length === 0}
                        className="w-full"
                      >
                        <Wand2 className="h-4 w-4" /> Apply to Card
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Section>
        )}

        <Section title="Event">
          <Field label="Player">
            <Input
              value={form.player}
              onChange={(e) => setForm({ ...form, player: e.target.value })}
            />
          </Field>
          <Field label="Tournament">
            <Input
              value={form.tournament}
              onChange={(e) => setForm({ ...form, tournament: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Organizer">
              <Input
                value={form.organizer}
                onChange={(e) =>
                  setForm({ ...form, organizer: e.target.value })
                }
              />
            </Field>
            <Field label="Date">
              <Input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Game">
              <Input
                value={form.game}
                onChange={(e) => setForm({ ...form, game: e.target.value })}
              />
            </Field>
            <Field label="Card #">
              <Input
                value={form.cardNum}
                onChange={(e) => setForm({ ...form, cardNum: e.target.value })}
              />
            </Field>
          </div>
        </Section>

        <Section title="Design">
          <DesignCarousel
            designs={designs}
            selected={design}
            onSelect={setDesign}
          />
        </Section>

        <Section title="Card Type">
          <div className="grid grid-cols-2 rounded-md border bg-secondary p-1">
            <Button
              variant={cardType === "swiss" ? "default" : "ghost"}
              onClick={() => setCardType("swiss")}
              className="font-condensed uppercase tracking-[0.18em]"
            >
              Swiss
            </Button>
            <Button
              variant={cardType === "topcut" ? "default" : "ghost"}
              onClick={() => setCardType("topcut")}
              className="font-condensed uppercase tracking-[0.18em]"
            >
              Top Cut
            </Button>
          </div>
        </Section>

        {cardType === "swiss" ? (
          <Section title="Swiss Rounds">
            <div className="space-y-2">
              {rounds.map((round, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[48px_1fr_76px_68px] gap-2"
                >
                  <Input
                    value={round.rnd}
                    onChange={(e) =>
                      setRounds(update(rounds, i, { rnd: e.target.value }))
                    }
                    className="px-2 text-center font-mono text-xs"
                  />
                  <Input
                    value={round.opp}
                    onChange={(e) =>
                      setRounds(update(rounds, i, { opp: e.target.value }))
                    }
                    placeholder="Opponent"
                  />
                  <Input
                    value={round.score}
                    onChange={(e) =>
                      setRounds(update(rounds, i, { score: e.target.value }))
                    }
                    className="px-2 text-center font-mono"
                    placeholder="4 - 1"
                  />
                  <Button
                    variant={round.result === "win" ? "default" : "destructive"}
                    onClick={() =>
                      setRounds(
                        update(rounds, i, {
                          result: round.result === "win" ? "loss" : "win",
                        }),
                      )
                    }
                  >
                    {round.result === "win" ? "W" : "L"}
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() =>
                setRounds([
                  ...rounds,
                  {
                    rnd: `R${rounds.length + 1}`,
                    opp: "",
                    score: "",
                    result: "win",
                  },
                ])
              }
            >
              <Plus className="h-4 w-4" /> Add Round
            </Button>
            <Field label="Advancement Message" className="mt-3">
              <Input
                value={form.advMsg}
                onChange={(e) => setForm({ ...form, advMsg: e.target.value })}
              />
            </Field>
          </Section>
        ) : (
          <Section title="Top Cut">
            <div className="space-y-3">
              {topCut.map((match, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[100px_1fr_76px_68px] gap-2"
                >
                  <Input
                    value={match.stage}
                    onChange={(e) =>
                      setTopCut(update(topCut, i, { stage: e.target.value }))
                    }
                  />
                  <Input
                    value={match.opp}
                    onChange={(e) =>
                      setTopCut(update(topCut, i, { opp: e.target.value }))
                    }
                    placeholder="Opponent"
                  />
                  <Input
                    value={match.score}
                    onChange={(e) =>
                      setTopCut(update(topCut, i, { score: e.target.value }))
                    }
                    className="text-center font-mono"
                  />
                  <Button
                    variant={match.result === "win" ? "default" : "destructive"}
                    onClick={() => {
                      const next = match.result === "win" ? "loss" : "win";
                      setTopCut(update(topCut, i, { result: next }));
                      if (next === "loss")
                        setForm({ ...form, champTitle: "ELIMINATED" });
                    }}
                  >
                    {match.result === "win" ? "W" : "L"}
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() =>
                setTopCut([
                  ...topCut,
                  {
                    stage: `Match ${topCut.length + 1}`,
                    opp: "",
                    score: "1 - 0",
                    result: "win",
                  },
                ])
              }
            >
              <Plus className="h-4 w-4" /> Add Match
            </Button>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field label="Finals Opponent">
                <Input
                  value={form.finalsOpp}
                  onChange={(e) =>
                    setForm({ ...form, finalsOpp: e.target.value })
                  }
                />
              </Field>
              <Field label="Finals Score">
                <Input
                  value={form.finalsSc}
                  onChange={(e) =>
                    setForm({ ...form, finalsSc: e.target.value })
                  }
                />
              </Field>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-2">
              <Button
                variant={form.finalsResult === "win" ? "default" : "outline"}
                onClick={() =>
                  setForm({
                    ...form,
                    finalsResult: "win",
                    champTitle: ["FINALIST", "ELIMINATED"].includes(
                      form.champTitle,
                    )
                      ? "CHAMPION"
                      : form.champTitle,
                  })
                }
              >
                Finals Win
              </Button>
              <Button
                variant={
                  form.finalsResult === "loss" ? "destructive" : "outline"
                }
                onClick={() =>
                  setForm({
                    ...form,
                    finalsResult: "loss",
                    champTitle: "FINALIST",
                  })
                }
              >
                Finals Loss
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title">
                <Input
                  value={form.champTitle}
                  onChange={(e) =>
                    setForm({ ...form, champTitle: e.target.value })
                  }
                />
              </Field>
              <Field label="Record">
                <Input
                  value={form.tcRecord}
                  onChange={(e) =>
                    setForm({ ...form, tcRecord: e.target.value })
                  }
                />
              </Field>
            </div>
          </Section>
        )}
          </>
        )}

        <div className="space-y-3 px-6 pb-6">
          <Button
            onClick={downloadCard}
            disabled={exporting}
            className="h-12 w-full font-display text-xl tracking-[0.15em]"
          >
            <Download className="h-4 w-4" />{" "}
            {exporting ? "Exporting" : "Download JPG"}
          </Button>
        </div>
      </aside>

      <section className="card-stage flex min-h-screen flex-col items-center gap-6 overflow-auto p-4 sm:p-6 lg:p-10">
        <div
          className={cn(
            "w-full font-condensed text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground",
            generatorMode === "pubmat" ? "max-w-[780px]" : "max-w-[680px]",
          )}
        >
          Live Preview
        </div>
        <div
          ref={previewViewportRef}
          className="flex w-full justify-center overflow-visible"
        >
          <div
            className="relative"
            style={{
              width: canvasWidth * previewScale,
              height: previewBoxHeight,
            }}
          >
            <div
              className="absolute left-1/2 top-0"
              style={{
                transform: `translateX(-50%) scale(${previewScale})`,
                transformOrigin: "top center",
              }}
            >
              <div
                ref={cardRef}
                className={cn(
                  "shadow-2xl",
                  generatorMode === "pubmat" ? "pubmat-stage" : "report-card",
                )}
                style={{
                  background:
                    generatorMode === "pubmat"
                      ? pubMatThemes[pubTheme].paper
                      : palette.bg,
                }}
              >
                {generatorMode === "pubmat" ? (
                  <PubMatPoster
                    pubMat={pubMat}
                    theme={pubMatThemes[pubTheme]}
                  />
                ) : (
                  <CardRenderer
                    form={form}
                    rounds={rounds}
                    topCut={topCut}
                    cardType={cardType}
                    palette={palette}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SplashScreen() {
  return (
    <div className="splash-screen fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="splash-grid absolute inset-0 opacity-35" />
      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        <div className="splash-logo-wrap relative">
          <div className="absolute inset-0 rounded-full bg-[#f2b84a]/20 blur-3xl" />
          <img
            src="/icon.png"
            alt="Leandro's Tournament Card Generator"
            className="relative h-44 w-44 drop-shadow-[0_0_34px_rgba(242,184,74,0.55)] md:h-56 md:w-56"
            draggable={false}
          />
        </div>
        <div>
          <div className="font-display text-5xl leading-none tracking-[0.12em] text-[#ffd76a] md:text-6xl">
            LEANDRO'S
          </div>
          <div className="mt-2 font-condensed text-sm font-black uppercase tracking-[0.32em] text-white/60">
            Tournament Card & Pub Mat Generator
          </div>
        </div>
        <div className="h-1 w-52 overflow-hidden rounded-full bg-white/10">
          <div className="splash-loader h-full rounded-full bg-gradient-to-r from-[#d89023] via-[#ffe07a] to-[#f52236]" />
        </div>
      </div>
    </div>
  );
}

function PubMatEditor({
  pubMat,
  setPubMat,
  theme,
  setTheme,
}: {
  pubMat: PubMatState;
  setPubMat: React.Dispatch<React.SetStateAction<PubMatState>>;
  theme: PubMatThemeKey;
  setTheme: (theme: PubMatThemeKey) => void;
}) {
  const setField = (patch: Partial<PubMatState>) =>
    setPubMat((current) => ({ ...current, ...patch }));
  const setList = (key: "guests" | "sponsors" | "notes", values: string[]) =>
    setPubMat((current) => ({ ...current, [key]: values }));
  const setImage = (key: ImageSlotKey, value: string) =>
    setPubMat((current) => ({
      ...current,
      images: { ...current.images, [key]: value },
    }));

  return (
    <>
      <Section title="Poster Theme">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(pubMatThemes) as PubMatThemeKey[]).map((key) => {
            const item = pubMatThemes[key];
            return (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={cn(
                  "rounded-md border p-3 text-left transition",
                  theme === key ? "border-primary bg-primary/10" : "bg-secondary",
                )}
              >
                <div className="mb-2 flex gap-1">
                  {[item.accent, item.accent2, item.ink].map((color) => (
                    <span
                      key={color}
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ background: color }}
                    />
                  ))}
                </div>
                <div className="font-condensed text-sm font-bold uppercase tracking-[0.14em]">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Event Details">
        <Field label="Shop / Host">
          <Input
            value={pubMat.shopName}
            onChange={(e) => setField({ shopName: e.target.value })}
          />
        </Field>
        <Field label="Partners">
          <Input
            value={pubMat.partners}
            onChange={(e) => setField({ partners: e.target.value })}
          />
        </Field>
        <Field label="Game / Hobby">
          <Input
            value={pubMat.game}
            onChange={(e) => setField({ game: e.target.value })}
          />
        </Field>
        <Field label="Event Name">
          <Input
            value={pubMat.eventName}
            onChange={(e) => setField({ eventName: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Event Type">
            <Input
              value={pubMat.eventType}
              onChange={(e) => setField({ eventType: e.target.value })}
            />
          </Field>
          <Field label="Date">
            <Input
              value={pubMat.date}
              onChange={(e) => setField({ date: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Venue">
          <Input
            value={pubMat.venue}
            onChange={(e) => setField({ venue: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prep Time">
            <Input
              value={pubMat.prepTime}
              onChange={(e) => setField({ prepTime: e.target.value })}
            />
          </Field>
          <Field label="Start Time">
            <Input
              value={pubMat.startTime}
              onChange={(e) => setField({ startTime: e.target.value })}
            />
          </Field>
        </div>
      </Section>

      <Section title="Prices & Callouts">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Pre-registration">
            <Input
              value={pubMat.preRegPrice}
              onChange={(e) => setField({ preRegPrice: e.target.value })}
            />
          </Field>
          <Field label="Walk-in">
            <Input
              value={pubMat.walkInPrice}
              onChange={(e) => setField({ walkInPrice: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Prize Headline">
          <Input
            value={pubMat.prizeHeadline}
            onChange={(e) => setField({ prizeHeadline: e.target.value })}
          />
        </Field>
        <Field label="Guest Headline">
          <Input
            value={pubMat.guestHeadline}
            onChange={(e) => setField({ guestHeadline: e.target.value })}
          />
        </Field>
      </Section>

      <Section title="Images">
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              ["hero", "Main Visual"],
              ["product", "Prize/Product"],
              ["gallery1", "Gallery 1"],
              ["gallery2", "Gallery 2"],
              ["gallery3", "Gallery 3"],
              ["gallery4", "Gallery 4"],
            ] as [ImageSlotKey, string][]
          ).map(([key, label]) => (
            <ImagePicker
              key={key}
              label={label}
              value={pubMat.images[key]}
              onChange={(value) => setImage(key, value)}
            />
          ))}
        </div>
      </Section>

      <EditableList
        title="Guests"
        values={pubMat.guests}
        onChange={(values) => setList("guests", values)}
        placeholder="Guest name"
      />
      <EditableList
        title="Sponsors"
        values={pubMat.sponsors}
        onChange={(values) => setList("sponsors", values)}
        placeholder="Sponsor / logo text"
      />
      <EditableList
        title="Notes"
        values={pubMat.notes}
        onChange={(values) => setList("notes", values)}
        placeholder="Event note"
      />
    </>
  );
}

function ImagePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-md border bg-secondary p-3">
      <Label>{label}</Label>
      <div className="mt-2 flex items-center gap-2">
        <label className="inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
          <ImagePlus className="h-4 w-4" />
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => onChange(String(reader.result || ""));
              reader.readAsDataURL(file);
              event.currentTarget.value = "";
            }}
          />
        </label>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Clear ${label}`}
          onClick={() => onChange("")}
          disabled={!value}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {value && (
        <div
          className="mt-2 h-16 rounded bg-cover bg-center"
          style={{ backgroundImage: `url(${value})` }}
        />
      )}
    </div>
  );
}

function EditableList({
  title,
  values,
  onChange,
  placeholder,
}: {
  title: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) {
  return (
    <Section title={title}>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="grid grid-cols-[1fr_40px] gap-2">
            <Input
              value={value}
              placeholder={placeholder}
              onChange={(e) => onChange(update(values, index, e.target.value))}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={`Remove ${title} ${index + 1}`}
              onClick={() => onChange(values.filter((_, i) => i !== index))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="mt-3 w-full"
        onClick={() => onChange([...values, ""])}
      >
        <Plus className="h-4 w-4" /> Add {title.slice(0, -1)}
      </Button>
    </Section>
  );
}

function PubMatPoster({
  pubMat,
  theme,
}: {
  pubMat: PubMatState;
  theme: PubMatTheme;
}) {
  const gallery = [
    pubMat.images.gallery1,
    pubMat.images.gallery2,
    pubMat.images.gallery3,
    pubMat.images.gallery4,
  ];
  const visibleGuests = pubMat.guests.filter(Boolean);
  const visibleSponsors = pubMat.sponsors.filter(Boolean);
  const visibleNotes = pubMat.notes.filter(Boolean);

  return (
    <div
      className="relative min-h-[1080px] overflow-hidden border-[10px] p-5"
      style={{
        background: theme.paper,
        borderColor: theme.ink,
        color: theme.ink,
      }}
    >
      <div className="pubmat-paper-grain absolute inset-0 opacity-60" />
      <div
        className="absolute inset-4 pointer-events-none border-2"
        style={{ borderColor: theme.ink }}
      />

      <div className="relative z-10">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-5 px-6 py-3">
          <LogoWordmark
            label={pubMat.shopName}
            sublabel={pubMat.partners}
            align="left"
            theme={theme}
          />
          <div className="font-display text-6xl leading-none tracking-[0.08em]">
            X
          </div>
          <LogoWordmark
            label={pubMat.game}
            sublabel={pubMat.eventType}
            align="right"
            theme={theme}
          />
        </header>

        <section className="mt-2 text-center">
          <div
            className="font-display text-6xl leading-none tracking-[0.05em]"
            style={{ color: theme.ink }}
          >
            {pubMat.game}
          </div>
          <div
            className="font-display text-[92px] leading-[0.85] tracking-[0.03em]"
            style={{ color: theme.ink }}
          >
            {pubMat.eventName}
          </div>
          <div
            className="font-display text-[132px] leading-[0.78] tracking-[0.03em]"
            style={{
              color: theme.accent2,
              WebkitTextStroke: `5px ${theme.accent}`,
              textShadow: `5px 5px 0 ${theme.ink}`,
            }}
          >
            {pubMat.eventType}
          </div>
        </section>

        <div
          className="mt-5 flex items-center justify-center gap-5 px-5 py-3 font-display text-5xl leading-none tracking-[0.08em] text-white"
          style={{ background: theme.block }}
        >
          <Sparkles className="h-9 w-9" style={{ color: theme.accent }} />
          <span className="truncate">{pubMat.venue}</span>
          <Sparkles className="h-9 w-9" style={{ color: theme.accent }} />
        </div>

        <div className="mt-4 grid grid-cols-[1fr_0.9fr] gap-5">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <PriceBlock
                label="Pre Registration"
                value={pubMat.preRegPrice}
                theme={theme}
              />
              <PriceBlock
                label="Walk In Registration"
                value={pubMat.walkInPrice}
                theme={theme}
              />
            </div>

            <div className="grid grid-cols-[0.95fr_1fr] gap-4">
              <PosterImage
                src={pubMat.images.hero}
                label="Main visual"
                className="h-[480px]"
                theme={theme}
              />
              <div className="grid grid-rows-2 gap-4">
                {gallery.slice(0, 2).map((src, index) => (
                  <PosterImage
                    key={index}
                    src={src}
                    label={`Guest ${index + 1}`}
                    className="h-[232px]"
                    theme={theme}
                  />
                ))}
              </div>
            </div>

            {visibleGuests.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {visibleGuests.slice(0, 8).map((guest, index) => (
                  <div
                    key={`${guest}-${index}`}
                    className="border-4 bg-white px-3 py-2 text-center font-display text-3xl leading-none text-white"
                    style={{
                      borderColor: theme.ink,
                      background: theme.accent,
                      textShadow: `2px 2px 0 ${theme.ink}`,
                    }}
                  >
                    {guest}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <PosterImage
              src={pubMat.images.product}
              label="Featured prize"
              className="h-[454px]"
              theme={theme}
              accent
            />
            <div className="flex items-center gap-3">
              <CalendarDays className="h-12 w-12 shrink-0" />
              <div
                className="font-display text-[74px] leading-none tracking-[0.05em]"
                style={{ color: theme.ink }}
              >
                {pubMat.date}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TimeBlock value={pubMat.prepTime} theme={theme} />
              <TimeBlock value={pubMat.startTime} theme={theme} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {gallery.slice(2).map((src, index) => (
                <PosterImage
                  key={index}
                  src={src}
                  label={`Feature ${index + 1}`}
                  className="h-[160px]"
                  theme={theme}
                />
              ))}
            </div>
            {visibleNotes.length > 0 && (
              <div className="space-y-2">
                {visibleNotes.slice(0, 4).map((note, index) => (
                  <div
                    key={`${note}-${index}`}
                    className="border-l-8 bg-white px-4 py-2 font-condensed text-2xl font-bold uppercase tracking-[0.08em]"
                    style={{ borderColor: theme.accent, color: theme.ink }}
                  >
                    {note}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer className="mt-5 space-y-3">
          <Banner text={pubMat.prizeHeadline} theme={theme} />
          <Banner text={pubMat.guestHeadline} theme={theme} />
          {visibleSponsors.length > 0 && (
            <div className="grid grid-cols-6 gap-2 pt-1">
              {visibleSponsors.slice(0, 18).map((sponsor, index) => (
                <div
                  key={`${sponsor}-${index}`}
                  className="flex h-14 items-center justify-center border-2 bg-white px-2 text-center font-condensed text-sm font-black uppercase leading-tight"
                  style={{ borderColor: theme.ink, color: theme.ink }}
                >
                  {sponsor}
                </div>
              ))}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

function LogoWordmark({
  label,
  sublabel,
  align,
  theme,
}: {
  label: string;
  sublabel: string;
  align: "left" | "right";
  theme: PubMatTheme;
}) {
  return (
    <div className={cn("min-w-0", align === "right" && "text-right")}>
      <div
        className="truncate font-display text-4xl leading-none tracking-[0.04em]"
        style={{ color: theme.accent2 }}
      >
        {label}
      </div>
      <div
        className="truncate font-condensed text-lg font-black uppercase tracking-[0.12em]"
        style={{ color: theme.accent }}
      >
        {sublabel}
      </div>
    </div>
  );
}

function PriceBlock({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: PubMatTheme;
}) {
  return (
    <div>
      <div
        className="font-display text-[64px] leading-none"
        style={{
          color: theme.accent,
          WebkitTextStroke: `2px ${theme.accent2}`,
          textShadow: `3px 3px 0 ${theme.ink}`,
        }}
      >
        {value}
      </div>
      <div className="font-condensed text-lg font-black uppercase tracking-[0.08em]">
        {label}
      </div>
    </div>
  );
}

function TimeBlock({ value, theme }: { value: string; theme: PubMatTheme }) {
  return (
    <div
      className="border-4 px-3 py-2 text-center font-display text-4xl leading-none tracking-[0.05em]"
      style={{ borderColor: theme.ink, background: theme.paper }}
    >
      {value}
    </div>
  );
}

function PosterImage({
  src,
  label,
  className,
  theme,
  accent,
}: {
  src: string;
  label: string;
  className: string;
  theme: PubMatTheme;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-[6px] bg-white",
        className,
      )}
      style={{
        borderColor: theme.ink,
        background: accent ? theme.accent : "#ffffff",
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div
          className="flex h-full items-center justify-center p-6 text-center font-condensed text-2xl font-black uppercase tracking-[0.12em]"
          style={{ color: accent ? "#ffffff" : theme.muted }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

function Banner({ text, theme }: { text: string; theme: PubMatTheme }) {
  return (
    <div
      className="px-5 py-3 text-center font-display text-5xl leading-none tracking-[0.08em] text-white"
      style={{ background: theme.block }}
    >
      {text}
    </div>
  );
}

// ─── design carousel ──────────────────────────────────────────────────────────
function DesignCarousel({
  designs,
  selected,
  onSelect,
}: {
  designs: Record<DesignKey, Design>;
  selected: DesignKey;
  onSelect: (k: DesignKey) => void;
}) {
  const keys = Object.keys(designs) as DesignKey[];
  const selectedIdx = keys.indexOf(selected);
  const containerRef = useRef<HTMLDivElement>(null);

  function navigate(dir: -1 | 1) {
    onSelect(keys[((selectedIdx + dir) % keys.length + keys.length) % keys.length]);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft")  { e.preventDefault(); navigate(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); navigate(1);  }
  }

  const current = designs[selected];
  const visibleItems = ([-2, -1, 0, 1, 2] as const).map((offset) => {
    const idx = ((selectedIdx + offset) % keys.length + keys.length) % keys.length;
    return { key: keys[idx], offset };
  });

  return (
    <div
      className="rounded-2xl p-4 outline-none transition-colors duration-500"
      style={{ backgroundColor: `${current.a}12` }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={containerRef}
    >
      {/* carousel track */}
      <div className="relative h-[240px] overflow-hidden">
        {/* arrows — borderless, tinted */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Previous design"
          className="absolute left-0 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ background: `${current.a}22`, color: current.a }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => navigate(1)}
          aria-label="Next design"
          className="absolute right-0 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ background: `${current.a}22`, color: current.a }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* cards */}
        {visibleItems.map(({ key, offset }) => {
          const d = designs[key];
          const isCenter = offset === 0;
          const abs = Math.abs(offset);
          const scale   = isCenter ? 1 : abs === 1 ? 0.75 : 0.56;
          const opacity = isCenter ? 1 : abs === 1 ? 0.55 : 0.22;
          const tx      = offset * 135;
          const zIndex  = isCenter ? 10 : abs === 1 ? 5 : 1;

          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              aria-label={`Select ${d.label}`}
              className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out focus:outline-none"
              style={{
                transform: `translate(calc(-50% + ${tx}px), -50%) scale(${scale})`,
                opacity,
                zIndex,
                width: 140,
                height: 200,
                filter: isCenter ? `drop-shadow(0 4px 24px ${d.a}44)` : "none",
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl" style={{ background: d.bg }}>
                {/* layout-specific decoration */}
                <LayoutPreview layout={d.layout} design={d} />

                {/* readability gradient at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${d.bg} 10%, transparent 100%)` }}
                />

                {/* border / glow ring */}
                <div
                  className="absolute inset-0 rounded-xl transition-all duration-300"
                  style={{
                    boxShadow: isCenter
                      ? `0 0 0 2px ${d.a}, inset 0 0 40px ${d.a}10`
                      : `0 0 0 1px ${d.b}`,
                  }}
                />

                {/* layout type badge */}
                <div
                  className="absolute left-2 top-2 z-10 rounded px-1.5 py-0.5 font-mono text-[7px] font-bold uppercase tracking-wider"
                  style={{ background: `${d.a}18`, color: d.a, border: `1px solid ${d.a}30` }}
                >
                  {d.layout}
                </div>

                {/* label */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
                  <div
                    className="font-display text-2xl leading-none"
                    style={{ color: d.a, textShadow: isCenter ? `0 0 14px ${d.a}cc` : "none" }}
                  >
                    {d.label}
                  </div>
                  <div
                    className="mt-1 font-condensed text-[9px] uppercase tracking-widest"
                    style={{ color: d.text, opacity: 0.5 }}
                  >
                    {d.tagline}
                  </div>
                </div>

                {/* selected indicator */}
                {isCenter && (
                  <div
                    className="absolute right-2.5 top-2.5 z-10 h-2 w-2 animate-pulse rounded-full"
                    style={{ background: d.a, boxShadow: `0 0 8px ${d.a}` }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* info row: name + counter */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <div
            className="font-display text-3xl leading-none tracking-[0.05em] transition-all duration-300"
            style={{ color: current.a, textShadow: `0 0 20px ${current.a}55` }}
          >
            {current.label}
          </div>
          <div className="mt-1.5 font-condensed text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {current.tagline}
          </div>
        </div>
        <div className="font-mono text-sm tabular-nums" style={{ color: current.a, opacity: 0.45 }}>
          {String(selectedIdx + 1).padStart(2, "0")}
          <span style={{ opacity: 0.45 }}> / {String(keys.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* segmented progress track */}
      <div className="mt-3 flex gap-[3px]">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            aria-label={designs[key].label}
            className="flex-1 rounded-full transition-all duration-300"
            style={{
              height: key === selected ? 4 : 2,
              marginTop: key === selected ? 0 : 1,
              background: key === selected ? current.a : `${current.a}30`,
              boxShadow: key === selected ? `0 0 8px ${current.a}99` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// mini-card layout previews
function LayoutPreview({
  layout,
  design: d,
}: {
  layout: LayoutKey;
  design: Design;
}) {
  if (layout === "report")
    return (
      <>
        <div className="diagonal-stripes absolute right-0 top-0 h-full w-2/3 opacity-50" />
        <div
          className="absolute -left-4 -top-4 h-16 w-16 rounded-full blur-2xl"
          style={{ background: d.a, opacity: 0.45 }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: d.a }}
        />
        <div className="absolute top-3 left-3 right-10 space-y-1.5">
          {[0.55, 0.38, 0.38].map((w, i) => (
            <div
              key={i}
              className="h-1 rounded-full"
              style={{ background: d.b, width: `${w * 100}%` }}
            />
          ))}
        </div>
      </>
    );

  if (layout === "arcade")
    return (
      <>
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg,rgba(0,0,0,0.15) 0px,rgba(0,0,0,0.15) 1px,transparent 1px,transparent 3px)",
          }}
        />
        <div
          className="absolute inset-2 border"
          style={{ borderColor: `${d.a}40` }}
        />
        {(
          [
            "top-1.5 left-1.5",
            "top-1.5 right-1.5",
            "bottom-1.5 left-1.5",
            "bottom-1.5 right-1.5",
          ] as const
        ).map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} font-mono text-[8px] leading-none`}
            style={{ color: d.b }}
          >
            +
          </div>
        ))}
        <div className="absolute top-6 left-4 right-4 space-y-1">
          {[1, 0.7, 0.7, 0.7].map((w, i) => (
            <div
              key={i}
              className="h-0.5"
              style={{
                background: `${d.a}${i === 0 ? "60" : "25"}`,
                width: `${w * 100}%`,
              }}
            />
          ))}
        </div>
      </>
    );

  if (layout === "blade")
    return (
      <>
        <div
          className="absolute left-0 top-0 bottom-0 w-[5px]"
          style={{ background: d.a }}
        />
        <div
          className="absolute left-[5px] right-0 top-[35%]"
          style={{
            height: 10,
            background: `repeating-linear-gradient(-60deg,${d.a}55 0,${d.a}55 1px,transparent 1px,transparent 13px)`,
          }}
        />
        <div className="absolute left-4 right-3 top-4 space-y-2">
          <div className="h-0.5 w-3/5" style={{ background: d.a }} />
          {[0.9, 0.7, 0.7].map((w, i) => (
            <div
              key={i}
              className="h-0.5"
              style={{ background: `${d.b}`, width: `${w * 100}%` }}
            />
          ))}
        </div>
      </>
    );

  if (layout === "award")
    return (
      <>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full blur-2xl"
          style={{ background: d.a, opacity: 0.28 }}
        />
        <div
          className="absolute top-3 left-4 right-4 h-6 border"
          style={{ borderColor: `${d.a}60` }}
        />
        <div className="absolute top-11 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 w-1 rotate-45"
              style={{ background: d.a }}
            />
          ))}
        </div>
        <div
          className="absolute top-14 left-4 right-4 h-0.5"
          style={{ background: `${d.a}40` }}
        />
      </>
    );

  // minimal
  return (
    <>
      {[30, 50, 70].map((pct) => (
        <div
          key={pct}
          className="absolute left-3 right-3"
          style={{ top: `${pct}%`, height: 1, background: `${d.a}25` }}
        />
      ))}
      <div
        className="absolute right-2 top-1 font-mono font-bold leading-none"
        style={{ fontSize: 28, color: d.a, opacity: 0.07 }}
      >
        #
      </div>
    </>
  );
}

// ─── card renderer ────────────────────────────────────────────────────────────
function CardRenderer(props: CardProps) {
  switch (props.palette.layout) {
    case "arcade":
      return <ArcadeCard {...props} />;
    case "blade":
      return <BladeCard {...props} />;
    case "award":
      return <AwardCard {...props} />;
    case "minimal":
      return <MinimalCard {...props} />;
    default:
      return <ReportCard {...props} />;
  }
}

// ─── layout: report (current style) ──────────────────────────────────────────
function ReportCard({ form, rounds, topCut, cardType, palette }: CardProps) {
  const wins = rounds.filter((r) => r.result === "win").length;
  const losses = rounds.length - wins;
  const titleColor =
    form.champTitle.toUpperCase() === "ELIMINATED" ? "#ff3b3b" : palette.a;
  const titleBg =
    form.champTitle.toUpperCase() === "ELIMINATED"
      ? "rgba(255,59,59,.1)"
      : palette.panel;

  return (
    <>
      <div className="diagonal-stripes absolute right-0 top-0 h-full w-64 opacity-70" />
      <div
        className="absolute -left-20 -top-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{ background: palette.a }}
      />

      <header
        className="relative border-b p-8"
        style={{ borderColor: palette.b }}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div
            className="inline-flex min-w-0 items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: palette.b, background: palette.panel }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: palette.a,
                boxShadow: `0 0 10px ${palette.a}`,
              }}
            />
            <span
              className="truncate font-condensed text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: palette.a }}
            >
              {form.organizer} / {form.game}
              {cardType === "topcut" ? " / Top Cut" : ""}
            </span>
          </div>
          <span className="font-mono text-sm text-white/35">
            {form.cardNum}
          </span>
        </div>
        <p className="font-condensed text-sm font-bold uppercase tracking-[0.35em] text-white/35">
          Player Report
        </p>
        <h2
          className="mt-2 break-words font-display text-7xl leading-none tracking-[0.04em]"
          style={{ color: palette.text, textShadow: `0 0 26px ${palette.a}66` }}
        >
          {form.player || "PLAYER"}
        </h2>
        <p className="mt-3 font-condensed text-lg font-semibold uppercase tracking-[0.13em] text-white/55">
          {form.tournament} / {form.date} /{" "}
          {cardType === "swiss" ? "Swiss Stage" : "Top Cut"}
        </p>
      </header>

      <div className="relative space-y-3 p-8">
        {cardType === "swiss" ? (
          <>
            <CardHeading title="Swiss Round Results" color={palette.a} />
            {rounds.map((r, i) => (
              <MatchLine
                key={i}
                label={r.rnd}
                opp={r.opp || "-"}
                score={r.score || "-"}
                badge={r.result === "win" ? "Win" : "Loss"}
                good={r.result === "win"}
                palette={palette}
              />
            ))}
            <Stats
              values={[
                ["Rounds Won", wins],
                ["Rounds Lost", losses],
                ["Total Played", rounds.length],
              ]}
              palette={palette}
            />
            {form.advMsg && (
              <div
                className="rounded-md border p-4 font-condensed text-xl font-bold uppercase tracking-[0.12em]"
                style={{
                  borderColor: palette.b,
                  background: palette.panel,
                  color: palette.a,
                }}
              >
                {form.advMsg}
              </div>
            )}
          </>
        ) : (
          <>
            <CardHeading title="Top Cut / Bracket Results" color={palette.a} />
            {topCut.map((m, i) => (
              <MatchLine
                key={i}
                label={m.stage}
                opp={m.opp || "-"}
                score={m.score || "1 - 0"}
                badge={m.result === "win" ? "Win" : "Loss"}
                good={m.result === "win"}
                palette={palette}
              />
            ))}
            {form.finalsOpp && (
              <MatchLine
                label="Finals"
                opp={form.finalsOpp}
                score={form.finalsSc}
                badge={form.finalsResult === "win" ? "Win" : "Loss"}
                good={form.finalsResult === "win"}
                palette={palette}
                featured
              />
            )}
            <Stats
              values={[
                ["Wins", topCutWins(topCut, form)],
                ["Losses", topCutLosses(topCut, form)],
                ["Played", topCut.length + (form.finalsOpp ? 1 : 0)],
              ]}
              palette={palette}
            />
            {form.champTitle && (
              <div
                className="relative overflow-hidden rounded-md border p-7 text-center"
                style={{ borderColor: titleColor, background: titleBg }}
              >
                <Trophy
                  className="mx-auto mb-3 h-8 w-8"
                  style={{ color: titleColor }}
                />
                <p className="font-condensed text-xs font-bold uppercase tracking-[0.25em] text-white/45">
                  {form.tournament} / {form.date}
                </p>
                <div
                  className="font-display text-7xl tracking-[0.08em]"
                  style={{
                    color: titleColor,
                    textShadow: `0 0 24px ${titleColor}`,
                  }}
                >
                  {form.champTitle}
                </div>
                {form.tcRecord && (
                  <p
                    className="font-mono text-sm"
                    style={{ color: titleColor }}
                  >
                    Top Cut Record / {form.tcRecord}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <footer
        className="relative flex items-center justify-between border-t px-8 py-5 font-condensed text-sm font-bold uppercase tracking-[0.18em] text-white/45"
        style={{ borderColor: palette.b }}
      >
        <span className="truncate">
          {form.tournament} / {form.date}
        </span>
        <span>{form.organizer}</span>
      </footer>
    </>
  );
}

// ─── layout: arcade ───────────────────────────────────────────────────────────
function ArcadeCard({ form, rounds, topCut, cardType, palette }: CardProps) {
  const wins = rounds.filter((r) => r.result === "win").length;
  const losses = rounds.length - wins;
  const titleColor =
    form.champTitle.toUpperCase() === "ELIMINATED" ? "#ff3b3b" : palette.a;

  return (
    <>
      {/* scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg,rgba(0,0,0,0.13) 0px,rgba(0,0,0,0.13) 1px,transparent 1px,transparent 3px)",
        }}
      />
      {/* inner frame */}
      <div
        className="absolute inset-3 pointer-events-none border"
        style={{ borderColor: `${palette.a}28` }}
      />
      {/* corner marks */}
      {(
        [
          "top-2 left-2",
          "top-2 right-2",
          "bottom-2 left-2",
          "bottom-2 right-2",
        ] as const
      ).map((p) => (
        <div
          key={p}
          className={`absolute ${p} font-mono text-xs leading-none pointer-events-none`}
          style={{ color: palette.b }}
        >
          +
        </div>
      ))}

      {/* header box */}
      <header className="relative z-10 p-8 pb-5">
        <div
          className="border-2 p-5"
          style={{ borderColor: palette.a, background: `${palette.a}08` }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.35em]"
              style={{ color: palette.b }}
            >
              *** PLAYER REPORT CARD ***
            </span>
            <span className="font-mono text-xs" style={{ color: palette.b }}>
              #{form.cardNum}
            </span>
          </div>
          <div
            className="font-display text-6xl leading-none tracking-[0.06em]"
            style={{ color: palette.a, textShadow: `0 0 18px ${palette.a}88` }}
          >
            {form.player || "PLAYER"}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            {[form.tournament, form.date, form.game, form.organizer].map(
              (v, i) => (
                <span
                  key={i}
                  className="font-mono text-xs"
                  style={{ color: palette.text, opacity: 0.55 }}
                >
                  {v}
                </span>
              ),
            )}
          </div>
        </div>
      </header>

      <div className="relative z-10 space-y-0 px-8 pb-8">
        {/* separator */}
        <div
          className="mb-4 font-mono text-[10px] leading-none"
          style={{ color: palette.a }}
        >
          {"─".repeat(60)}
        </div>

        {cardType === "swiss" ? (
          <>
            <div
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: palette.b }}
            >
              {`[ ${cardType === "swiss" ? "SWISS" : "TOP CUT"} ROUNDS ]`}
            </div>
            <div className="space-y-2">
              {rounds.map((r, i) => {
                const good = r.result === "win";
                const c = good ? palette.a : "#ff3b3b";
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 font-mono text-sm"
                  >
                    <span
                      className="w-8 text-xs shrink-0"
                      style={{ color: palette.b }}
                    >
                      {r.rnd || `R${i + 1}`}
                    </span>
                    <span
                      className="flex-1 truncate"
                      style={{ color: palette.text, opacity: 0.75 }}
                    >
                      {r.opp || "---"}
                    </span>
                    <span
                      className="w-14 text-right text-xs"
                      style={{ color: palette.text, opacity: 0.5 }}
                    >
                      {r.score || "---"}
                    </span>
                    <span
                      className="border px-2 py-0.5 text-xs font-bold"
                      style={{ color: c, borderColor: c, background: `${c}12` }}
                    >
                      {good ? "WIN" : "LOSS"}
                    </span>
                  </div>
                );
              })}
            </div>
            <div
              className="my-4 font-mono text-[10px] leading-none"
              style={{ color: palette.b }}
            >
              {"─".repeat(60)}
            </div>
            <div className="flex gap-8 font-mono">
              {[
                ["WINS", wins, palette.a],
                ["LOSSES", losses, "#ff3b3b"],
                ["PLAYED", rounds.length, palette.text],
              ].map(([l, v, c]) => (
                <span key={String(l)}>
                  <span
                    className="text-xl font-bold"
                    style={{ color: String(c) }}
                  >
                    {v}
                  </span>{" "}
                  <span
                    className="text-xs"
                    style={{ color: palette.text, opacity: 0.4 }}
                  >
                    {String(l)}
                  </span>
                </span>
              ))}
            </div>
            {form.advMsg && (
              <div
                className="mt-4 border py-2 text-center font-mono text-sm"
                style={{ borderColor: palette.a, color: palette.a }}
              >
                &gt;&gt; {form.advMsg} &lt;&lt;
              </div>
            )}
          </>
        ) : (
          <>
            <div
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: palette.b }}
            >
              [ TOP CUT BRACKET ]
            </div>
            <div className="space-y-2">
              {topCut.map((m, i) => {
                const good = m.result === "win";
                const c = good ? palette.a : "#ff3b3b";
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 font-mono text-sm"
                  >
                    <span
                      className="w-24 truncate text-xs shrink-0"
                      style={{ color: palette.b }}
                    >
                      {m.stage}
                    </span>
                    <span
                      className="flex-1 truncate"
                      style={{ color: palette.text, opacity: 0.75 }}
                    >
                      {m.opp || "---"}
                    </span>
                    <span
                      className="w-14 text-right text-xs"
                      style={{ color: palette.text, opacity: 0.5 }}
                    >
                      {m.score}
                    </span>
                    <span
                      className="border px-2 py-0.5 text-xs font-bold"
                      style={{ color: c, borderColor: c, background: `${c}12` }}
                    >
                      {good ? "WIN" : "LOSS"}
                    </span>
                  </div>
                );
              })}
              {form.finalsOpp && (
                <div
                  className="mt-2 border-2 p-3"
                  style={{
                    borderColor: palette.a,
                    background: `${palette.a}08`,
                  }}
                >
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <span
                      className="w-24 shrink-0 text-xs"
                      style={{ color: palette.a }}
                    >
                      FINALS
                    </span>
                    <span
                      className="flex-1 truncate"
                      style={{ color: palette.text }}
                    >
                      {form.finalsOpp}
                    </span>
                    <span
                      className="w-14 text-right text-xs"
                      style={{ color: palette.text, opacity: 0.5 }}
                    >
                      {form.finalsSc}
                    </span>
                    <span
                      className="border px-2 py-0.5 text-xs font-bold"
                      style={{
                        color:
                          form.finalsResult === "win" ? palette.a : "#ff3b3b",
                        borderColor:
                          form.finalsResult === "win" ? palette.a : "#ff3b3b",
                      }}
                    >
                      {form.finalsResult === "win" ? "WIN" : "LOSS"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div
              className="my-4 font-mono text-[10px] leading-none"
              style={{ color: palette.b }}
            >
              {"─".repeat(60)}
            </div>
            <div className="flex gap-8 font-mono">
              {[
                ["WINS", topCutWins(topCut, form), palette.a],
                ["LOSSES", topCutLosses(topCut, form), "#ff3b3b"],
              ].map(([l, v, c]) => (
                <span key={String(l)}>
                  <span
                    className="text-xl font-bold"
                    style={{ color: String(c) }}
                  >
                    {v}
                  </span>{" "}
                  <span
                    className="text-xs"
                    style={{ color: palette.text, opacity: 0.4 }}
                  >
                    {String(l)}
                  </span>
                </span>
              ))}
            </div>
            {form.champTitle && (
              <>
                <div
                  className="my-4 font-mono text-[10px]"
                  style={{ color: palette.a }}
                >
                  {"═".repeat(60)}
                </div>
                <div
                  className="border-2 py-5 text-center"
                  style={{ borderColor: titleColor }}
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: titleColor, opacity: 0.55 }}
                  >
                    *** RESULT ***
                  </div>
                  <div
                    className="mt-1 font-display text-6xl tracking-[0.08em]"
                    style={{
                      color: titleColor,
                      textShadow: `0 0 20px ${titleColor}`,
                    }}
                  >
                    {form.champTitle}
                  </div>
                  {form.tcRecord && (
                    <div
                      className="mt-1 font-mono text-xs"
                      style={{ color: titleColor, opacity: 0.7 }}
                    >
                      RECORD: {form.tcRecord}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <footer
        className="relative z-10 flex justify-between border-t px-8 py-4 font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{ borderColor: palette.b, color: palette.b }}
      >
        <span>{form.organizer}</span>
        <span>{form.game}</span>
        <span>{form.date}</span>
      </footer>
    </>
  );
}

// ─── layout: blade ────────────────────────────────────────────────────────────
function BladeCard({ form, rounds, topCut, cardType, palette }: CardProps) {
  const wins = rounds.filter((r) => r.result === "win").length;
  const losses = rounds.length - wins;
  const titleColor =
    form.champTitle.toUpperCase() === "ELIMINATED" ? "#ff3b3b" : palette.a;
  const slashBg = `repeating-linear-gradient(-62deg,${palette.a}55 0,${palette.a}55 1px,transparent 1px,transparent 16px)`;

  return (
    <>
      {/* thick left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[6px]"
        style={{ background: palette.a }}
      />

      <header className="relative pl-10 pr-8 pt-8 pb-6">
        {/* slash divider */}
        <div className="mb-6" style={{ height: 12, background: slashBg }} />
        <p
          className="font-condensed text-xs font-bold uppercase tracking-[0.38em]"
          style={{ color: palette.a, opacity: 0.7 }}
        >
          Player Report · {cardType === "swiss" ? "Swiss" : "Top Cut"}
        </p>
        <h2
          className="mt-1 break-words font-display text-[80px] leading-[0.9] tracking-[-0.01em]"
          style={{ color: palette.text }}
        >
          {form.player || "PLAYER"}
        </h2>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          {[form.tournament, form.date, form.game].map((v, i) => (
            <span
              key={i}
              className="font-condensed text-sm uppercase tracking-[0.15em]"
              style={{ color: palette.text, opacity: 0.4 }}
            >
              {v}
            </span>
          ))}
        </div>
        {/* slash divider */}
        <div className="mt-6" style={{ height: 12, background: slashBg }} />
      </header>

      <div className="relative pl-10 pr-8 pb-8 space-y-2">
        {cardType === "swiss" ? (
          <>
            <p
              className="mb-4 font-condensed text-xs uppercase tracking-[0.28em]"
              style={{ color: palette.a, opacity: 0.65 }}
            >
              Swiss Round Results
            </p>
            {rounds.map((r, i) => {
              const good = r.result === "win";
              const c = good ? palette.a : "#ff3b3b";
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 border-l-4 pl-4 py-2"
                  style={{ borderColor: c }}
                >
                  <span
                    className="font-mono text-xs w-8 shrink-0"
                    style={{ color: palette.b }}
                  >
                    {r.rnd || `R${i + 1}`}
                  </span>
                  <span
                    className="flex-1 truncate font-condensed text-2xl font-bold"
                    style={{ color: palette.text }}
                  >
                    {r.opp || "—"}
                  </span>
                  <span
                    className="font-mono text-base font-bold"
                    style={{ color: c }}
                  >
                    {r.score || "—"}
                  </span>
                  <span
                    className="rounded-full px-3 py-0.5 font-condensed text-xs font-bold uppercase"
                    style={{ background: `${c}18`, color: c }}
                  >
                    {r.result === "win" ? "WIN" : "LOSS"}
                  </span>
                </div>
              );
            })}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                ["WIN", wins, palette.a],
                ["LOSS", losses, "#ff3b3b"],
                ["PLAYED", rounds.length, palette.text],
              ].map(([l, v, c]) => (
                <span
                  key={String(l)}
                  className="rounded-full border px-4 py-1.5 font-condensed text-sm font-bold"
                  style={{
                    borderColor: String(c),
                    color: String(c),
                    background: `${String(c)}10`,
                  }}
                >
                  {v} {String(l)}
                </span>
              ))}
            </div>
            {form.advMsg && (
              <div
                className="mt-4 border-l-4 pl-4 font-condensed text-xl font-bold uppercase tracking-[0.1em]"
                style={{ borderColor: palette.a, color: palette.a }}
              >
                {form.advMsg}
              </div>
            )}
          </>
        ) : (
          <>
            <p
              className="mb-4 font-condensed text-xs uppercase tracking-[0.28em]"
              style={{ color: palette.a, opacity: 0.65 }}
            >
              Top Cut Results
            </p>
            {topCut.map((m, i) => {
              const good = m.result === "win";
              const c = good ? palette.a : "#ff3b3b";
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 border-l-4 pl-4 py-2"
                  style={{ borderColor: c }}
                >
                  <span
                    className="font-condensed text-xs w-24 shrink-0 truncate uppercase"
                    style={{ color: palette.b }}
                  >
                    {m.stage}
                  </span>
                  <span
                    className="flex-1 truncate font-condensed text-2xl font-bold"
                    style={{ color: palette.text }}
                  >
                    {m.opp || "—"}
                  </span>
                  <span
                    className="font-mono text-base font-bold"
                    style={{ color: c }}
                  >
                    {m.score}
                  </span>
                  <span
                    className="rounded-full px-3 py-0.5 font-condensed text-xs font-bold uppercase"
                    style={{ background: `${c}18`, color: c }}
                  >
                    {m.result === "win" ? "WIN" : "LOSS"}
                  </span>
                </div>
              );
            })}
            {form.finalsOpp && (
              <div
                className="flex items-center gap-4 border-l-4 pl-4 py-3 mt-1"
                style={{
                  borderColor:
                    form.finalsResult === "win" ? palette.a : "#ff3b3b",
                  background: `${palette.a}06`,
                }}
              >
                <span
                  className="font-condensed text-xs w-24 shrink-0"
                  style={{ color: palette.a }}
                >
                  Finals
                </span>
                <span
                  className="flex-1 truncate font-condensed text-2xl font-bold"
                  style={{ color: palette.text }}
                >
                  {form.finalsOpp}
                </span>
                <span
                  className="font-mono text-base font-bold"
                  style={{
                    color: form.finalsResult === "win" ? palette.a : "#ff3b3b",
                  }}
                >
                  {form.finalsSc}
                </span>
                <span
                  className="rounded-full px-3 py-0.5 font-condensed text-xs font-bold uppercase"
                  style={{
                    background: `${form.finalsResult === "win" ? palette.a : "#ff3b3b"}18`,
                    color: form.finalsResult === "win" ? palette.a : "#ff3b3b",
                  }}
                >
                  {form.finalsResult === "win" ? "WIN" : "LOSS"}
                </span>
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                ["WIN", topCutWins(topCut, form), palette.a],
                ["LOSS", topCutLosses(topCut, form), "#ff3b3b"],
              ].map(([l, v, c]) => (
                <span
                  key={String(l)}
                  className="rounded-full border px-4 py-1.5 font-condensed text-sm font-bold"
                  style={{
                    borderColor: String(c),
                    color: String(c),
                    background: `${String(c)}10`,
                  }}
                >
                  {v} {String(l)}
                </span>
              ))}
            </div>
            {form.champTitle && (
              <div
                className="mt-6 border-l-[6px] pl-5 py-3"
                style={{ borderColor: titleColor }}
              >
                <p
                  className="font-condensed text-xs uppercase tracking-[0.3em]"
                  style={{ color: titleColor, opacity: 0.6 }}
                >
                  Result · {form.tournament}
                </p>
                <div
                  className="font-display text-7xl leading-none"
                  style={{
                    color: titleColor,
                    textShadow: `0 0 20px ${titleColor}66`,
                  }}
                >
                  {form.champTitle}
                </div>
                {form.tcRecord && (
                  <p
                    className="mt-1 font-mono text-sm"
                    style={{ color: titleColor, opacity: 0.7 }}
                  >
                    Top Cut {form.tcRecord}
                  </p>
                )}
              </div>
            )}
          </>
        )}
        {/* slash footer divider */}
        <div className="mt-8" style={{ height: 12, background: slashBg }} />
        <div
          className="mt-3 flex justify-between font-condensed text-xs uppercase tracking-[0.2em]"
          style={{ color: palette.text, opacity: 0.3 }}
        >
          <span>{form.organizer}</span>
          <span>{form.cardNum}</span>
        </div>
      </div>
    </>
  );
}

// ─── layout: award (prestige) ─────────────────────────────────────────────────
function AwardCard({ form, rounds, topCut, cardType, palette }: CardProps) {
  const wins = rounds.filter((r) => r.result === "win").length;
  const losses = rounds.length - wins;
  const titleColor =
    form.champTitle.toUpperCase() === "ELIMINATED" ? "#ff3b3b" : palette.a;

  const Diamond = () => (
    <span className="inline-flex gap-2 items-center">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="inline-block h-1.5 w-1.5 rotate-45"
          style={{ background: i === 2 ? palette.a : palette.b }}
        />
      ))}
    </span>
  );

  return (
    <>
      {/* central glow */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: palette.a, opacity: 0.07 }}
      />

      <header className="relative px-10 pt-10 pb-6 text-center">
        {/* double-border title box */}
        <div className="mx-auto inline-block">
          <div
            className="border-2 px-8 py-3"
            style={{ borderColor: palette.a }}
          >
            <div
              className="border px-8 py-3"
              style={{ borderColor: `${palette.a}55` }}
            >
              <p
                className="font-condensed text-[10px] uppercase tracking-[0.45em]"
                style={{ color: palette.b }}
              >
                Player Report Card
              </p>
              <p
                className="mt-0.5 font-condensed text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: palette.a }}
              >
                {form.tournament}
              </p>
              <p
                className="mt-0.5 font-condensed text-xs uppercase tracking-[0.15em]"
                style={{ color: palette.text, opacity: 0.45 }}
              >
                {form.organizer} · {form.date} · {form.game}
              </p>
            </div>
          </div>
        </div>

        <div className="my-5 flex justify-center">
          <Diamond />
        </div>

        <h2
          className="font-display text-[76px] leading-none tracking-[0.03em]"
          style={{ color: palette.text, textShadow: `0 0 30px ${palette.a}44` }}
        >
          {form.player || "PLAYER"}
        </h2>
        <div
          className="mx-auto mt-4 h-px w-64"
          style={{
            background: `linear-gradient(90deg, transparent, ${palette.a}, transparent)`,
          }}
        />
        <div className="mt-4 flex justify-center">
          <Diamond />
        </div>

        <p
          className="mt-3 font-condensed text-xs uppercase tracking-[0.22em]"
          style={{ color: palette.text, opacity: 0.35 }}
        >
          {cardType === "swiss" ? "Swiss Stage" : "Top Cut"} · #{form.cardNum}
        </p>
      </header>

      <div className="relative px-10 pb-10">
        {cardType === "swiss" ? (
          <>
            <div
              className="mb-4 text-center font-condensed text-[10px] uppercase tracking-[0.4em]"
              style={{ color: palette.b }}
            >
              Round Results
            </div>
            <div className="space-y-0">
              {rounds.map((r, i) => {
                const good = r.result === "win";
                const c = good ? palette.a : "#ff3b3b";
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-b py-3"
                    style={{ borderColor: `${palette.b}55` }}
                  >
                    <span
                      className="font-mono text-xs w-8"
                      style={{ color: palette.b }}
                    >
                      {r.rnd || `R${i + 1}`}
                    </span>
                    <span
                      className="flex-1 text-center font-condensed text-xl font-bold"
                      style={{ color: palette.text }}
                    >
                      {r.opp || "—"}
                    </span>
                    <span
                      className="font-mono text-base font-bold w-16 text-right"
                      style={{ color: c }}
                    >
                      {r.score || "—"}
                    </span>
                    <span
                      className="font-condensed text-xs font-bold uppercase w-10 text-right"
                      style={{ color: c }}
                    >
                      {r.result === "win" ? "WIN" : "LOSS"}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-center gap-12 text-center">
              {[
                ["Rounds Won", wins, palette.a],
                ["Rounds Lost", losses, "#ff3b3b"],
                ["Total", rounds.length, palette.text],
              ].map(([l, v, c]) => (
                <div key={String(l)}>
                  <div
                    className="font-display text-5xl leading-none"
                    style={{ color: String(c) }}
                  >
                    {v}
                  </div>
                  <div
                    className="mt-1 font-condensed text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: palette.text, opacity: 0.4 }}
                  >
                    {String(l)}
                  </div>
                </div>
              ))}
            </div>
            {form.advMsg && (
              <>
                <div className="my-5 flex justify-center">
                  <Diamond />
                </div>
                <div
                  className="border py-3 text-center font-condensed text-xl font-bold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: palette.a,
                    color: palette.a,
                    background: `${palette.a}08`,
                  }}
                >
                  {form.advMsg}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div
              className="mb-4 text-center font-condensed text-[10px] uppercase tracking-[0.4em]"
              style={{ color: palette.b }}
            >
              Top Cut Results
            </div>
            <div className="space-y-0">
              {topCut.map((m, i) => {
                const good = m.result === "win";
                const c = good ? palette.a : "#ff3b3b";
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-b py-3"
                    style={{ borderColor: `${palette.b}55` }}
                  >
                    <span
                      className="font-condensed text-xs w-24 truncate uppercase"
                      style={{ color: palette.b }}
                    >
                      {m.stage}
                    </span>
                    <span
                      className="flex-1 text-center font-condensed text-xl font-bold"
                      style={{ color: palette.text }}
                    >
                      {m.opp || "—"}
                    </span>
                    <span
                      className="font-mono text-base font-bold w-16 text-right"
                      style={{ color: c }}
                    >
                      {m.score}
                    </span>
                    <span
                      className="font-condensed text-xs font-bold uppercase w-10 text-right"
                      style={{ color: c }}
                    >
                      {m.result === "win" ? "WIN" : "LOSS"}
                    </span>
                  </div>
                );
              })}
              {form.finalsOpp && (
                <div
                  className="flex items-center gap-4 border-b py-4"
                  style={{
                    borderColor: palette.a,
                    background: `${palette.a}06`,
                  }}
                >
                  <span
                    className="font-condensed text-xs w-24 uppercase"
                    style={{ color: palette.a }}
                  >
                    Finals
                  </span>
                  <span
                    className="flex-1 text-center font-condensed text-xl font-bold"
                    style={{ color: palette.text }}
                  >
                    {form.finalsOpp}
                  </span>
                  <span
                    className="font-mono text-base font-bold w-16 text-right"
                    style={{
                      color:
                        form.finalsResult === "win" ? palette.a : "#ff3b3b",
                    }}
                  >
                    {form.finalsSc}
                  </span>
                  <span
                    className="font-condensed text-xs font-bold uppercase w-10 text-right"
                    style={{
                      color:
                        form.finalsResult === "win" ? palette.a : "#ff3b3b",
                    }}
                  >
                    {form.finalsResult === "win" ? "WIN" : "LOSS"}
                  </span>
                </div>
              )}
            </div>
            {form.champTitle && (
              <>
                <div className="my-6 flex justify-center">
                  <Diamond />
                </div>
                <div className="text-center">
                  <Trophy
                    className="mx-auto mb-4 h-10 w-10"
                    style={{ color: titleColor }}
                  />
                  <p
                    className="font-condensed text-xs uppercase tracking-[0.3em]"
                    style={{ color: titleColor, opacity: 0.55 }}
                  >
                    {form.tournament} · {form.date}
                  </p>
                  <div
                    className="mt-1 font-display text-[68px] leading-none tracking-[0.05em]"
                    style={{
                      color: titleColor,
                      textShadow: `0 0 28px ${titleColor}`,
                    }}
                  >
                    {form.champTitle}
                  </div>
                  {form.tcRecord && (
                    <p
                      className="mt-2 font-mono text-sm"
                      style={{ color: titleColor, opacity: 0.75 }}
                    >
                      Top Cut Record · {form.tcRecord}
                    </p>
                  )}
                  <div className="mx-auto mt-4 flex justify-center">
                    <Diamond />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <footer
        className="relative border-t px-10 py-5 text-center font-condensed text-xs uppercase tracking-[0.28em]"
        style={{ borderColor: palette.b, color: palette.text, opacity: 0.3 }}
      >
        {form.organizer} · {form.game}
      </footer>
    </>
  );
}

// ─── layout: minimal ──────────────────────────────────────────────────────────
function MinimalCard({ form, rounds, topCut, cardType, palette }: CardProps) {
  const wins = rounds.filter((r) => r.result === "win").length;
  const losses = rounds.length - wins;
  const titleColor =
    form.champTitle.toUpperCase() === "ELIMINATED" ? "#ff3b3b" : palette.a;
  const rule = (
    <div
      className="w-full"
      style={{ height: 1, background: `${palette.a}20` }}
    />
  );

  return (
    <div className="relative">
      {/* large background card number */}
      <div
        className="absolute right-6 top-3 font-display leading-none select-none pointer-events-none"
        style={{ fontSize: 160, color: palette.a, opacity: 0.04 }}
      >
        {form.cardNum}
      </div>

      <header className="relative px-10 pt-10 pb-8">
        <div className="mb-6 flex items-center justify-between">
          <span
            className="font-condensed text-[10px] uppercase tracking-[0.45em]"
            style={{ color: palette.a, opacity: 0.6 }}
          >
            Player Report
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: palette.text, opacity: 0.3 }}
          >
            #{form.cardNum}
          </span>
        </div>
        {rule}
        <h2
          className="my-8 font-display text-[88px] leading-none tracking-[-0.01em]"
          style={{ color: palette.text }}
        >
          {form.player || "PLAYER"}
        </h2>
        {rule}
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-1">
          {[form.game, form.organizer, form.tournament, form.date].map(
            (v, i) => (
              <span
                key={i}
                className="font-condensed text-sm uppercase tracking-[0.18em]"
                style={{ color: palette.text, opacity: 0.35 }}
              >
                {v}
              </span>
            ),
          )}
        </div>
      </header>

      <div className="relative px-10 pb-10 space-y-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            className="font-condensed text-[10px] uppercase tracking-[0.4em]"
            style={{ color: palette.a, opacity: 0.55 }}
          >
            {cardType === "swiss" ? "Swiss Rounds" : "Top Cut"}
          </span>
          <div
            className="flex-1"
            style={{ height: 1, background: `${palette.a}20` }}
          />
        </div>

        {cardType === "swiss" ? (
          <>
            {rounds.map((r, i) => {
              const good = r.result === "win";
              const c = good ? palette.a : "#ff3b3b";
              return (
                <div
                  key={i}
                  className="flex items-center gap-6 py-3"
                  style={{ borderBottom: `1px solid ${palette.a}12` }}
                >
                  <span
                    className="font-mono text-xs w-8 shrink-0"
                    style={{ color: palette.text, opacity: 0.3 }}
                  >
                    {r.rnd || `R${i + 1}`}
                  </span>
                  <span
                    className="flex-1 truncate font-condensed text-2xl font-bold"
                    style={{ color: palette.text }}
                  >
                    {r.opp || "—"}
                  </span>
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: c }}
                  >
                    {r.score || "—"}
                  </span>
                  <span
                    className="w-8 text-right font-condensed text-sm font-bold uppercase"
                    style={{ color: c }}
                  >
                    {r.result === "win" ? "W" : "L"}
                  </span>
                </div>
              );
            })}
            <div className="mt-8">{rule}</div>
            <div className="mt-4 flex items-baseline gap-6">
              <span
                className="font-display text-4xl"
                style={{ color: palette.a }}
              >
                {wins}
              </span>
              <span
                className="font-condensed text-xs uppercase tracking-[0.2em]"
                style={{ color: palette.text, opacity: 0.35 }}
              >
                W
              </span>
              <span
                className="font-display text-4xl"
                style={{ color: "#ff3b3b" }}
              >
                {losses}
              </span>
              <span
                className="font-condensed text-xs uppercase tracking-[0.2em]"
                style={{ color: palette.text, opacity: 0.35 }}
              >
                L
              </span>
              <span
                className="font-display text-4xl"
                style={{ color: palette.text, opacity: 0.5 }}
              >
                {rounds.length}
              </span>
              <span
                className="font-condensed text-xs uppercase tracking-[0.2em]"
                style={{ color: palette.text, opacity: 0.35 }}
              >
                P
              </span>
              {form.advMsg && (
                <span
                  className="ml-auto font-condensed text-base uppercase tracking-[0.12em]"
                  style={{ color: palette.a }}
                >
                  {form.advMsg}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            {topCut.map((m, i) => {
              const good = m.result === "win";
              const c = good ? palette.a : "#ff3b3b";
              return (
                <div
                  key={i}
                  className="flex items-center gap-6 py-3"
                  style={{ borderBottom: `1px solid ${palette.a}12` }}
                >
                  <span
                    className="font-condensed text-xs w-24 shrink-0 uppercase"
                    style={{ color: palette.text, opacity: 0.3 }}
                  >
                    {m.stage}
                  </span>
                  <span
                    className="flex-1 truncate font-condensed text-2xl font-bold"
                    style={{ color: palette.text }}
                  >
                    {m.opp || "—"}
                  </span>
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: c }}
                  >
                    {m.score}
                  </span>
                  <span
                    className="w-8 text-right font-condensed text-sm font-bold uppercase"
                    style={{ color: c }}
                  >
                    {m.result === "win" ? "W" : "L"}
                  </span>
                </div>
              );
            })}
            {form.finalsOpp && (
              <div
                className="flex items-center gap-6 py-4"
                style={{ borderBottom: `1px solid ${palette.a}40` }}
              >
                <span
                  className="font-condensed text-xs w-24 shrink-0 uppercase"
                  style={{ color: palette.a, opacity: 0.7 }}
                >
                  Finals
                </span>
                <span
                  className="flex-1 truncate font-condensed text-2xl font-bold"
                  style={{ color: palette.text }}
                >
                  {form.finalsOpp}
                </span>
                <span
                  className="font-mono text-lg font-bold"
                  style={{
                    color: form.finalsResult === "win" ? palette.a : "#ff3b3b",
                  }}
                >
                  {form.finalsSc}
                </span>
                <span
                  className="w-8 text-right font-condensed text-sm font-bold uppercase"
                  style={{
                    color: form.finalsResult === "win" ? palette.a : "#ff3b3b",
                  }}
                >
                  {form.finalsResult === "win" ? "W" : "L"}
                </span>
              </div>
            )}
            <div className="mt-8">{rule}</div>
            <div className="mt-4 flex items-baseline gap-6">
              <span
                className="font-display text-4xl"
                style={{ color: palette.a }}
              >
                {topCutWins(topCut, form)}
              </span>
              <span
                className="font-condensed text-xs uppercase tracking-[0.2em]"
                style={{ color: palette.text, opacity: 0.35 }}
              >
                W
              </span>
              <span
                className="font-display text-4xl"
                style={{ color: "#ff3b3b" }}
              >
                {topCutLosses(topCut, form)}
              </span>
              <span
                className="font-condensed text-xs uppercase tracking-[0.2em]"
                style={{ color: palette.text, opacity: 0.35 }}
              >
                L
              </span>
            </div>
            {form.champTitle && (
              <>
                <div className="mt-10 mb-4">{rule}</div>
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="font-condensed text-[10px] uppercase tracking-[0.4em]"
                      style={{ color: titleColor, opacity: 0.6 }}
                    >
                      {form.tournament} · {form.date}
                    </p>
                    <div
                      className="font-display text-[72px] leading-none tracking-[-0.01em]"
                      style={{ color: titleColor }}
                    >
                      {form.champTitle}
                    </div>
                    {form.tcRecord && (
                      <p
                        className="mt-1 font-mono text-sm"
                        style={{ color: titleColor, opacity: 0.6 }}
                      >
                        {form.tcRecord}
                      </p>
                    )}
                  </div>
                  <Trophy
                    className="h-14 w-14 shrink-0"
                    style={{ color: titleColor, opacity: 0.6 }}
                  />
                </div>
              </>
            )}
          </>
        )}

        <div className="mt-8">{rule}</div>
        <div
          className="mt-4 flex justify-between font-condensed text-[10px] uppercase tracking-[0.35em]"
          style={{ color: palette.text, opacity: 0.25 }}
        >
          <span>
            {form.organizer} · {form.game}
          </span>
          <span>{form.date}</span>
        </div>
      </div>
    </div>
  );
}

// ─── shared helper components ─────────────────────────────────────────────────
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b px-6 py-5">
      <div className="mb-3 flex items-center gap-3 font-condensed text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
        {title}
        <span className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 space-y-1.5", className)}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function CardHeading({ title, color }: { title: string; color: string }) {
  return (
    <div
      className="flex items-center gap-3 pb-1 font-condensed text-sm font-bold uppercase tracking-[0.22em]"
      style={{ color }}
    >
      {title}
      <span className="h-px flex-1 bg-white/15" />
    </div>
  );
}

function MatchLine({
  label,
  opp,
  score,
  badge,
  good,
  featured,
  palette,
}: {
  label: string;
  opp: string;
  score: string;
  badge: string;
  good: boolean;
  featured?: boolean;
  palette: Design;
}) {
  const color = good ? palette.a : "#ff3b3b";
  return (
    <div
      className={cn(
        "grid grid-cols-[86px_1fr_84px_72px] items-center gap-3 rounded-md border p-3",
        featured && "py-4",
      )}
      style={{
        borderColor: featured
          ? palette.a
          : good
            ? palette.b
            : "rgba(255,59,59,.35)",
        background: featured ? palette.panel : "rgba(255,255,255,.035)",
      }}
    >
      <span className="font-mono text-xs text-white/35">{label}</span>
      <div className="min-w-0">
        <p className="font-condensed text-xs font-bold uppercase tracking-[0.18em] text-white/30">
          Opponent
        </p>
        <p className="truncate font-condensed text-2xl font-bold">{opp}</p>
      </div>
      <span
        className="text-right font-mono text-lg font-bold"
        style={{ color }}
      >
        {score}
      </span>
      <span
        className="rounded px-2 py-1 text-center font-condensed text-xs font-bold uppercase tracking-wider"
        style={{ background: `${color}22`, color }}
      >
        {badge}
      </span>
    </div>
  );
}

function Stats({
  values,
  palette,
}: {
  values: [string, number][];
  palette: Design;
}) {
  return (
    <div
      className="grid grid-cols-3 rounded-md border p-4"
      style={{ borderColor: palette.b, background: palette.panel }}
    >
      {values.map(([label, value]) => (
        <div key={label} className="text-center">
          <div
            className="font-display text-5xl leading-none"
            style={{ color: label.includes("Lost") ? "#ff3b3b" : palette.a }}
          >
            {value}
          </div>
          <div className="font-condensed text-xs font-bold uppercase tracking-[0.18em] text-white/35">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── helper functions ─────────────────────────────────────────────────────────
function topCutStageLabel(round: number, finalRound: number, index: number) {
  if (finalRound > 0) {
    if (round === finalRound) return "Finals";
    if (round === finalRound - 1) return "Semifinals";
    if (round === finalRound - 2) return "Quarterfinals";
  }
  return (
    ["Round 1", "Quarterfinals", "Semifinals"][index] || `Match ${index + 1}`
  );
}

function topCutWins(matches: TopCutMatch[], form: FormState) {
  return (
    matches.filter((m) => m.result === "win").length +
    (form.finalsOpp && form.finalsResult === "win" ? 1 : 0)
  );
}

function topCutLosses(matches: TopCutMatch[], form: FormState) {
  return (
    matches.filter((m) => m.result === "loss").length +
    (form.finalsOpp && form.finalsResult === "loss" ? 1 : 0)
  );
}

function update<T>(items: T[], index: number, patch: Partial<T>) {
  return items.map((item, i) => (i === index ? { ...item, ...patch } : item));
}
