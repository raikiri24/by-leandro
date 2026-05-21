"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import {
  Bug,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Gift,
  ImagePlus,
  Layers,
  Lightbulb,
  Loader2,
  MapPin,
  MessageSquare,
  Paintbrush,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  Users,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ─── types ────────────────────────────────────────────────────────────────────
type CardType = "swiss" | "topcut";
type GeneratorMode = "cards" | "pubmat";
type FeedbackCategory = "problem" | "feature" | "suggestion";
type LayoutKey = "report" | "arcade" | "blade" | "award" | "minimal" | "terminal" | "ticket" | "split" | "circuit";
type PubMatThemeKey =
  | "hyper"
  | "arena"
  | "tribe"
  | "catchup"
  | "cup"
  | "deadly"
  | "pop"
  | "clean"
  | "neon"
  | "manga"
  | "gold"
  | "street"
  | "cosmic"
  | "volcanic";
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
  | "jade"
  | "abyss"
  | "toxic"
  | "sakura"
  | "dawn"
  | "ice"
  | "ocean"
  // terminal layouts
  | "hack"
  | "breach"
  | "echo"
  | "cobalt_term"
  | "amber_term"
  // ticket layouts
  | "golden_pass"
  | "night_pass"
  | "flame_pass"
  | "frost_pass"
  | "obsidian_pass"
  // split layouts
  | "volt"
  | "forge"
  | "dusk_split"
  | "alpine"
  | "steel"
  // circuit layouts
  | "neon_circuit"
  | "ember_circuit"
  | "lime_circuit"
  | "gold_circuit"
  | "void_circuit";

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
type Sponsor = { text: string; image: string };
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
  sponsors: Sponsor[];
  notes: string[];
  images: Record<ImageSlotKey, string>;
};
type PubMatTheme = {
  label: string;
  template?: "classic" | "futuristic" | "arena" | "tribe" | "catchup" | "cup" | "neon" | "manga" | "gold" | "street" | "cosmic" | "volcanic";
  bg: string;
  paper: string;
  ink: string;
  muted: string;
  accent: string;
  accent2: string;
  block: string;
};
type UsageStats = {
  totalUsers: number;
  activeUsers: number;
  activeWindowMinutes: number;
};
type FeedbackState = {
  category: FeedbackCategory;
  title: string;
  message: string;
  contact: string;
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
  abyss: {
    label: "Abyss",
    tagline: "Dark Matter",
    layout: "report",
    a: "#8b5cf6",
    b: "#3b0764",
    bg: "#05001a",
    panel: "rgba(139,92,246,.09)",
    text: "#ede9ff",
  },
  toxic: {
    label: "Toxic",
    tagline: "Acid Strike",
    layout: "arcade",
    a: "#a3e635",
    b: "#365314",
    bg: "#040a00",
    panel: "rgba(163,230,53,.08)",
    text: "#f0ffe4",
  },
  sakura: {
    label: "Sakura",
    tagline: "Petal Storm",
    layout: "blade",
    a: "#f472b6",
    b: "#831843",
    bg: "#130008",
    panel: "rgba(244,114,182,.09)",
    text: "#ffe8f4",
  },
  dawn: {
    label: "Dawn",
    tagline: "Radiant Break",
    layout: "award",
    a: "#fb923c",
    b: "#7c2d12",
    bg: "#0f0500",
    panel: "rgba(251,146,60,.09)",
    text: "#fff5eb",
  },
  ice: {
    label: "Ice",
    tagline: "Frozen Edge",
    layout: "minimal",
    a: "#bae6fd",
    b: "#0c4a6e",
    bg: "#00080f",
    panel: "rgba(186,230,253,.06)",
    text: "#f0f9ff",
  },
  ocean: {
    label: "Ocean",
    tagline: "Deep Current",
    layout: "report",
    a: "#22d3ee",
    b: "#164e63",
    bg: "#020b10",
    panel: "rgba(34,211,238,.08)",
    text: "#ecfeff",
  },
  // terminal layout
  hack: {
    label: "Hack",
    tagline: "Zero Day",
    layout: "terminal",
    a: "#00ff41",
    b: "#006b1a",
    bg: "#050a05",
    panel: "rgba(0,255,65,.08)",
    text: "#e0ffe8",
  },
  breach: {
    label: "Breach",
    tagline: "Firewall Down",
    layout: "terminal",
    a: "#ff6b35",
    b: "#7a2500",
    bg: "#100500",
    panel: "rgba(255,107,53,.08)",
    text: "#fff3ee",
  },
  echo: {
    label: "Echo",
    tagline: "Signal Lost",
    layout: "terminal",
    a: "#c084fc",
    b: "#4c1d95",
    bg: "#060010",
    panel: "rgba(192,132,252,.08)",
    text: "#f5f0ff",
  },
  cobalt_term: {
    label: "Cobalt",
    tagline: "Deep Code",
    layout: "terminal",
    a: "#38bdf8",
    b: "#0c4a6e",
    bg: "#000d14",
    panel: "rgba(56,189,248,.08)",
    text: "#e0f7ff",
  },
  amber_term: {
    label: "Amber",
    tagline: "Root Shell",
    layout: "terminal",
    a: "#fbbf24",
    b: "#78350f",
    bg: "#0d0800",
    panel: "rgba(251,191,36,.08)",
    text: "#fff8e6",
  },
  // ticket layout
  golden_pass: {
    label: "Golden",
    tagline: "VIP Access",
    layout: "ticket",
    a: "#f5c842",
    b: "#7a5e00",
    bg: "#0f0c00",
    panel: "rgba(245,200,66,.1)",
    text: "#fff9e0",
  },
  night_pass: {
    label: "Night Pass",
    tagline: "Platinum Tier",
    layout: "ticket",
    a: "#94a3b8",
    b: "#334155",
    bg: "#050709",
    panel: "rgba(148,163,184,.08)",
    text: "#e8edf5",
  },
  flame_pass: {
    label: "Flame Pass",
    tagline: "Fire Tier",
    layout: "ticket",
    a: "#f97316",
    b: "#7c2d12",
    bg: "#0f0400",
    panel: "rgba(249,115,22,.08)",
    text: "#fff5e8",
  },
  frost_pass: {
    label: "Frost Pass",
    tagline: "Ice Rank",
    layout: "ticket",
    a: "#7dd3fc",
    b: "#0369a1",
    bg: "#00060f",
    panel: "rgba(125,211,252,.07)",
    text: "#f0faff",
  },
  obsidian_pass: {
    label: "Obsidian",
    tagline: "Dark Matter",
    layout: "ticket",
    a: "#a78bfa",
    b: "#3b0764",
    bg: "#030008",
    panel: "rgba(167,139,250,.08)",
    text: "#ede9ff",
  },
  // split layout
  volt: {
    label: "Volt",
    tagline: "Electric Cut",
    layout: "split",
    a: "#facc15",
    b: "#713f12",
    bg: "#0a0800",
    panel: "rgba(250,204,21,.08)",
    text: "#fffde0",
  },
  forge: {
    label: "Forge",
    tagline: "Iron Will",
    layout: "split",
    a: "#fb7185",
    b: "#881337",
    bg: "#110005",
    panel: "rgba(251,113,133,.08)",
    text: "#ffe8ec",
  },
  dusk_split: {
    label: "Dusk",
    tagline: "Twilight Zone",
    layout: "split",
    a: "#c084fc",
    b: "#6b21a8",
    bg: "#08000f",
    panel: "rgba(192,132,252,.08)",
    text: "#f5f0ff",
  },
  alpine: {
    label: "Alpine",
    tagline: "Mountain High",
    layout: "split",
    a: "#7dd3fc",
    b: "#075985",
    bg: "#00080d",
    panel: "rgba(125,211,252,.07)",
    text: "#e0f7ff",
  },
  steel: {
    label: "Steel",
    tagline: "Metal Core",
    layout: "split",
    a: "#cbd5e1",
    b: "#334155",
    bg: "#060809",
    panel: "rgba(203,213,225,.06)",
    text: "#f0f4f8",
  },
  // circuit layout
  neon_circuit: {
    label: "Neon Grid",
    tagline: "Live Circuit",
    layout: "circuit",
    a: "#00ffff",
    b: "#006b6b",
    bg: "#000f0f",
    panel: "rgba(0,255,255,.07)",
    text: "#e0ffff",
  },
  ember_circuit: {
    label: "Ember Grid",
    tagline: "Hot Wire",
    layout: "circuit",
    a: "#ff4500",
    b: "#7c1800",
    bg: "#0f0200",
    panel: "rgba(255,69,0,.07)",
    text: "#fff0e8",
  },
  lime_circuit: {
    label: "Lime Grid",
    tagline: "Bio Circuit",
    layout: "circuit",
    a: "#84cc16",
    b: "#3f6212",
    bg: "#040a00",
    panel: "rgba(132,204,22,.07)",
    text: "#f3ffe0",
  },
  gold_circuit: {
    label: "Gold Grid",
    tagline: "Premium Board",
    layout: "circuit",
    a: "#d4af37",
    b: "#6b4e00",
    bg: "#0a0800",
    panel: "rgba(212,175,55,.07)",
    text: "#fff8e0",
  },
  void_circuit: {
    label: "Void Grid",
    tagline: "Dark Matter",
    layout: "circuit",
    a: "#818cf8",
    b: "#1e1b4b",
    bg: "#03020d",
    panel: "rgba(129,140,248,.07)",
    text: "#eeeeff",
  },
};

const initialRounds: Round[] = [
  { rnd: "R1", opp: "", score: "", result: "win" },
  { rnd: "R2", opp: "", score: "", result: "win" },
  { rnd: "R3", opp: "", score: "", result: "loss" },
];

const pubMatThemes: Record<PubMatThemeKey, PubMatTheme> = {
  hyper: {
    label: "Hyper Strike",
    template: "futuristic",
    bg: "#030407",
    paper: "#05070d",
    ink: "#f7fbff",
    muted: "#8f9bad",
    accent: "#ff1f35",
    accent2: "#00e5ff",
    block: "#0b1018",
  },
  arena: {
    label: "Arena Clash",
    template: "arena",
    bg: "#050506",
    paper: "#050506",
    ink: "#f8fafc",
    muted: "#a5a7ad",
    accent: "#e61122",
    accent2: "#f6b21a",
    block: "#090a0d",
  },
  tribe: {
    label: "Shadow Tribe",
    template: "tribe",
    bg: "#050308",
    paper: "#06030a",
    ink: "#f4f1ff",
    muted: "#a99abe",
    accent: "#7c22ff",
    accent2: "#f01824",
    block: "#100916",
  },
  catchup: {
    label: "Velocity Pop",
    template: "catchup",
    bg: "#07100b",
    paper: "#07100b",
    ink: "#f9fff8",
    muted: "#b8d1c8",
    accent: "#46ff28",
    accent2: "#16d9ff",
    block: "#07150d",
  },
  cup: {
    label: "Blade Cup",
    template: "cup",
    bg: "#070506",
    paper: "#070506",
    ink: "#f8fafc",
    muted: "#aeb3bd",
    accent: "#e11626",
    accent2: "#2378ff",
    block: "#0c0b0d",
  },
  deadly: {
    label: "Deadly Spin",
    template: "classic",
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
    template: "classic",
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
    template: "classic",
    bg: "#101316",
    paper: "#f6f7f2",
    ink: "#181a1c",
    muted: "#666b70",
    accent: "#1d9a6c",
    accent2: "#f4b942",
    block: "#181a1c",
  },
  neon: {
    label: "Neon Festival",
    template: "neon",
    bg: "#030007",
    paper: "#040009",
    ink: "#f0e8ff",
    muted: "#9880c0",
    accent: "#ff00ff",
    accent2: "#00ffcc",
    block: "#0a0012",
  },
  manga: {
    label: "Manga Panel",
    template: "manga",
    bg: "#f0ede8",
    paper: "#f5f2ec",
    ink: "#0a0a0a",
    muted: "#5a5a5a",
    accent: "#e81c24",
    accent2: "#1a1a1a",
    block: "#0a0a0a",
  },
  gold: {
    label: "Gold League",
    template: "gold",
    bg: "#050400",
    paper: "#070600",
    ink: "#f0d060",
    muted: "#80681a",
    accent: "#d4a017",
    accent2: "#fffbe0",
    block: "#130f00",
  },
  street: {
    label: "Street Battle",
    template: "street",
    bg: "#04000a",
    paper: "#04000a",
    ink: "#f5f0ff",
    muted: "#8070a8",
    accent: "#ff6600",
    accent2: "#ffd700",
    block: "#0e0018",
  },
  cosmic: {
    label: "Cosmic Arena",
    template: "cosmic",
    bg: "#010012",
    paper: "#01001a",
    ink: "#ddd0ff",
    muted: "#7060a0",
    accent: "#9d4edd",
    accent2: "#00d4ff",
    block: "#080030",
  },
  volcanic: {
    label: "Volcanic",
    template: "volcanic",
    bg: "#040000",
    paper: "#060000",
    ink: "#fff0e0",
    muted: "#9a5030",
    accent: "#ff4500",
    accent2: "#ffaa00",
    block: "#110000",
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
  sponsors: [
    { text: "Shop", image: "" },
    { text: "Team", image: "" },
    { text: "Cafe", image: "" },
    { text: "League", image: "" },
    { text: "Brand", image: "" },
    { text: "Club", image: "" },
  ],
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
const initialFeedback: FeedbackState = {
  category: "problem",
  title: "",
  message: "",
  contact: "",
};

// ─── page ─────────────────────────────────────────────────────────────────────
export default function ToolPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const previewViewportRef = useRef<HTMLDivElement>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [previewSize, setPreviewSize] = useState({ height: 0, scale: 1 });
  const [generatorMode, setGeneratorMode] = useState<GeneratorMode>("cards");
  const [mode, setMode] = useState<"manual" | "scrape">("manual");
  const [cardType, setCardType] = useState<CardType>("swiss");
  const [design, setDesign] = useState<DesignKey>("signal");
  const [pubTheme, setPubTheme] = useState<PubMatThemeKey>("hyper");
  const [pubMat, setPubMat] = useState<PubMatState>(initialPubMat);
  const [feedback, setFeedback] = useState<FeedbackState>(initialFeedback);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [scrapeUrl, setScrapeUrl] = useState("https://challonge.com/kr11x97w");
  const [scrapePlayer, setScrapePlayer] = useState("");
  const [scraped, setScraped] = useState<ScrapedData | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [scrapeError, setScrapeError] = useState("");
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [usageError, setUsageError] = useState("");
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
    let cancelled = false;

    async function registerUsage() {
      try {
        const sessionId = getBrowserSessionId();

        const response = await fetch("/api/usage", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const payload = await readJsonResponse(response);
        if (!response.ok || !payload.ok) {
          throw new Error(payload.error || "Unable to fetch usage count.");
        }
        if (!cancelled) {
          setUsageStats(payload.data);
          setUsageError("");
        }
      } catch (error) {
        if (!cancelled) {
          setUsageError(
            error instanceof Error ? error.message : "Unable to fetch usage count.",
          );
        }
      }
    }

    registerUsage();
    return () => {
      cancelled = true;
    };
  }, []);

  async function submitFeedback() {
    setFeedbackSubmitting(true);
    setFeedbackError("");
    setFeedbackNotice("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...feedback,
          sessionId: getBrowserSessionId(),
          page: window.location.href,
        }),
      });
      const payload = await readJsonResponse(response);
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Unable to submit feedback.");
      }

      setFeedback(initialFeedback);
      setFeedbackNotice("Sent. Thanks for helping improve the tool.");
      window.setTimeout(() => setFeedbackOpen(false), 900);
    } catch (error) {
      setFeedbackError(
        error instanceof Error ? error.message : "Unable to submit feedback.",
      );
    } finally {
      setFeedbackSubmitting(false);
    }
  }

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
      const payload = await readJsonResponse(res);
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
    <main className="flex min-h-dvh flex-col bg-background text-foreground lg:grid lg:min-h-screen lg:grid-cols-[440px_1fr]">
      {showSplash && <SplashScreen />}
      <aside className="hidden bg-card lg:block lg:h-screen lg:overflow-y-auto">
        <div className="sticky top-0 z-20 border-b bg-card/95 px-6 py-5 backdrop-blur">
          <div className="mb-4 flex items-center justify-between gap-3">
            <a
              href="/"
              className="font-condensed text-xs font-black uppercase tracking-[0.18em] text-muted-foreground transition hover:text-primary"
            >
              Home
            </a>
            <a
              href="/tool"
              className="rounded-md border border-primary/25 bg-primary/10 px-3 py-1.5 font-condensed text-xs font-black uppercase tracking-[0.18em] text-primary"
            >
              Tool
            </a>
          </div>
          <h1 className="font-display text-3xl tracking-[0.15em] text-primary">
            Leandro's Tournament Card Generator
          </h1>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <UsageMetric
              label="Total users"
              value={usageStats ? formatCount(usageStats.totalUsers) : "--"}
            />
            <UsageMetric
              label={`Active ${usageStats?.activeWindowMinutes || 15}m`}
              value={usageStats ? formatCount(usageStats.activeUsers) : "--"}
            />
          </div>
          {usageError && (
            <div className="mt-2 rounded-md border border-destructive/25 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {usageError}
            </div>
          )}
        </div>

        <Section title="Module">
          <div className="grid grid-cols-2 rounded-md border bg-secondary p-1">
            {(
              [
                ["cards", "Cards"],
                ["pubmat", "Pub Mat"],
              ] as [GeneratorMode, string][]
            ).map(([key, label]) => (
              <Button
                key={key}
                variant={generatorMode === key ? "default" : "ghost"}
                onClick={() => setGeneratorMode(key)}
                className="px-2 font-condensed uppercase tracking-[0.14em]"
              >
                {label}
              </Button>
            ))}
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

      <section className="card-stage flex flex-1 flex-col items-center gap-4 overflow-auto p-4 pb-28 sm:gap-6 sm:p-5 sm:pb-28 lg:min-h-screen lg:gap-6 lg:p-10 lg:pb-10">
        <div
          className={cn(
            "flex w-full items-center justify-between gap-3",
            generatorMode === "pubmat" ? "max-w-[780px]" : "max-w-[680px]",
          )}
        >
          <span className="font-condensed text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
            Live Preview
          </span>
          {/* Mobile-only: quick mode indicator */}
          <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 font-condensed text-[10px] font-black uppercase tracking-[0.18em] text-primary lg:hidden">
            {generatorMode === "pubmat" ? "Pub Mat" : cardType === "swiss" ? "Swiss" : "Top Cut"}
          </span>
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
      <MobileToolbox
        generatorMode={generatorMode}
        setGeneratorMode={setGeneratorMode}
        mode={mode}
        setMode={setMode}
        cardType={cardType}
        setCardType={setCardType}
        design={design}
        setDesign={setDesign}
        form={form}
        setForm={setForm}
        rounds={rounds}
        setRounds={setRounds}
        topCut={topCut}
        setTopCut={setTopCut}
        pubMat={pubMat}
        setPubMat={setPubMat}
        pubTheme={pubTheme}
        setPubTheme={setPubTheme}
        scrapeUrl={scrapeUrl}
        setScrapeUrl={setScrapeUrl}
        scrapePlayer={scrapePlayer}
        setScrapePlayer={setScrapePlayer}
        scraped={scraped}
        logs={logs}
        scrapeError={scrapeError}
        loading={loading}
        playerMatches={playerMatches}
        runScraper={runScraper}
        applyScrape={applyScrape}
        downloadCard={downloadCard}
        exporting={exporting}
      />
      <FloatingFeedbackTool
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        feedback={feedback}
        setFeedback={setFeedback}
        submitting={feedbackSubmitting}
        notice={feedbackNotice}
        error={feedbackError}
        onSubmit={submitFeedback}
      />
    </main>
  );
}

function LandingHero({ usageStats }: { usageStats: UsageStats | null }) {
  const featureCards = [
    {
      title: "Result Cards",
      copy: "Build Swiss or Top Cut player cards with match scores, titles, records, and multiple visual styles.",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      title: "Pub Mats",
      copy: "Create event posters with shop names, schedules, entry fees, prize callouts, sponsors, guests, and images.",
      icon: <ImagePlus className="h-5 w-5" />,
    },
    {
      title: "Organizer Workflow",
      copy: "Manual entry, Challonge imports, live preview, quick edits, and one-click JPG export for posting online.",
      icon: <Target className="h-5 w-5" />,
    },
  ];

  const toolStats = [
    ["Free", "Open for anyone"],
    ["2", "Generator modules"],
    [
      usageStats ? formatCount(usageStats.totalUsers) : "--",
      "Total users",
    ],
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#090909]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,212,232,.14),transparent_36%,rgba(245,34,54,.16)_68%,rgba(216,144,35,.12))]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_520px] lg:px-10">
        <div className="max-w-3xl pt-8 lg:pt-0">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 font-condensed text-xs font-black uppercase text-primary">
            <Gift className="h-4 w-4" />
            Free tool for everyone
          </div>
          <h1 className="mt-6 font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
            Leandro's Tournament Card Generator
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
            A free tournament content tool anyone can use, especially
            Tournament Organizers who need polished player result cards and
            event pub mats without opening a design app.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 font-condensed text-base font-black uppercase"
            >
              <a href="#generator">
                <Zap className="h-4 w-4" />
                Start Creating
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

          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-2">
            {toolStats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-md border border-white/10 bg-white/[0.04] p-3"
              >
                <div className="font-display text-3xl leading-none text-[#ffd76a]">
                  {value}
                </div>
                <div className="mt-1 font-condensed text-xs font-black uppercase text-white/52">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-10 lg:pb-0">
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
                    Live tool preview
                  </div>
                  <div className="text-xs text-white/48">
                    Cards, pub mats, exports
                  </div>
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>

            <div className="card-stage p-4">
              <div className="w-full rounded-md border border-primary/25 bg-[#071012] p-5">
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

        <div
          id="features"
          className="grid gap-3 pb-8 lg:col-span-2 lg:grid-cols-3 lg:pb-10"
        >
          {featureCards.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/12 text-primary">
                {feature.icon}
              </div>
              <h2 className="mt-4 font-condensed text-2xl font-black uppercase text-white">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                {feature.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
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

function UsageMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
      <div className="flex items-center gap-2 font-condensed text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
        <Users className="h-3.5 w-3.5 text-primary" />
        {label}
      </div>
      <div className="mt-1 font-display text-3xl leading-none tracking-[0.08em] text-primary">
        {value}
      </div>
    </div>
  );
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    value,
  );
}

async function readJsonResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const bodyText = await response.text();

  if (!contentType.includes("application/json")) {
    const preview = bodyText
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180);
    throw new Error(
      preview || `Server returned ${response.status} ${response.statusText}.`,
    );
  }

  try {
    return JSON.parse(bodyText);
  } catch {
    throw new Error("Server returned invalid JSON.");
  }
}

function getBrowserSessionId() {
  const storageKey = "leandro-tool-session-id";
  let sessionId = window.localStorage.getItem(storageKey);
  if (!sessionId) {
    sessionId =
      window.crypto?.randomUUID?.() ||
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(storageKey, sessionId);
  }
  return sessionId;
}

function FeedbackEditor({
  feedback,
  setFeedback,
  submitting,
  notice,
  error,
  onSubmit,
}: {
  feedback: FeedbackState;
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackState>>;
  submitting: boolean;
  notice: string;
  error: string;
  onSubmit: () => void;
}) {
  const feedbackTypes: Array<{
    key: FeedbackCategory;
    label: string;
    icon: React.ReactNode;
  }> = [
    { key: "problem", label: "Problem", icon: <Bug className="h-4 w-4" /> },
    { key: "feature", label: "Feature", icon: <Lightbulb className="h-4 w-4" /> },
    {
      key: "suggestion",
      label: "Suggest",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ];

  return (
    <>
      <Section title="Report / Request">
        <div className="grid grid-cols-3 rounded-md border bg-secondary p-1">
          {feedbackTypes.map((item) => (
            <Button
              key={item.key}
              variant={feedback.category === item.key ? "default" : "ghost"}
              onClick={() =>
                setFeedback((current) => ({ ...current, category: item.key }))
              }
              className="gap-1 px-2 font-condensed uppercase tracking-[0.12em]"
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
      </Section>

      <Section title="Details">
        <Field label="Title">
          <Input
            value={feedback.title}
            onChange={(event) =>
              setFeedback((current) => ({
                ...current,
                title: event.target.value,
              }))
            }
            placeholder="Short summary"
            maxLength={120}
          />
        </Field>
        <Field label="Description">
          <textarea
            value={feedback.message}
            onChange={(event) =>
              setFeedback((current) => ({
                ...current,
                message: event.target.value,
              }))
            }
            placeholder="What happened, what should change, or what would make this better?"
            maxLength={3000}
            className="min-h-36 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </Field>
        <Field label="Contact (optional)">
          <Input
            value={feedback.contact}
            onChange={(event) =>
              setFeedback((current) => ({
                ...current,
                contact: event.target.value,
              }))
            }
            placeholder="Name, email, Discord, or FB"
            maxLength={160}
          />
        </Field>
        {notice && (
          <div className="mb-3 rounded-md border border-primary/25 bg-primary/10 px-3 py-2 text-sm text-primary">
            {notice}
          </div>
        )}
        {error && (
          <div className="mb-3 rounded-md border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}
        <Button
          onClick={onSubmit}
          disabled={submitting}
          className="h-11 w-full font-condensed text-base font-black uppercase tracking-[0.16em]"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {submitting ? "Sending" : "Send Feedback"}
        </Button>
      </Section>
    </>
  );
}

type MobileTab = "style" | "event" | "rounds" | null;

function MobileToolbox({
  generatorMode,
  setGeneratorMode,
  mode,
  setMode,
  cardType,
  setCardType,
  design,
  setDesign,
  form,
  setForm,
  rounds,
  setRounds,
  topCut,
  setTopCut,
  pubMat,
  setPubMat,
  pubTheme,
  setPubTheme,
  scrapeUrl,
  setScrapeUrl,
  scrapePlayer,
  setScrapePlayer,
  scraped,
  logs,
  scrapeError,
  loading,
  playerMatches,
  runScraper,
  applyScrape,
  downloadCard,
  exporting,
}: {
  generatorMode: GeneratorMode;
  setGeneratorMode: (m: GeneratorMode) => void;
  mode: "manual" | "scrape";
  setMode: (m: "manual" | "scrape") => void;
  cardType: CardType;
  setCardType: (t: CardType) => void;
  design: DesignKey;
  setDesign: (d: DesignKey) => void;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  rounds: Round[];
  setRounds: React.Dispatch<React.SetStateAction<Round[]>>;
  topCut: TopCutMatch[];
  setTopCut: React.Dispatch<React.SetStateAction<TopCutMatch[]>>;
  pubMat: PubMatState;
  setPubMat: React.Dispatch<React.SetStateAction<PubMatState>>;
  pubTheme: PubMatThemeKey;
  setPubTheme: (t: PubMatThemeKey) => void;
  scrapeUrl: string;
  setScrapeUrl: (u: string) => void;
  scrapePlayer: string;
  setScrapePlayer: (p: string) => void;
  scraped: ScrapedData | null;
  logs: string[];
  scrapeError: string;
  loading: boolean;
  playerMatches: { round: number; opp: string; mySc: number; oppSc: number; result: Round["result"]; stage: string }[];
  runScraper: () => void;
  applyScrape: () => void;
  downloadCard: () => void;
  exporting: boolean;
}) {
  const [activeTab, setActiveTab] = useState<MobileTab>(null);

  function toggle(tab: MobileTab) {
    setActiveTab((prev) => (prev === tab ? null : tab));
  }

  const isCards = generatorMode === "cards";

  const tabs = isCards
    ? [
        { id: "style" as MobileTab, icon: Paintbrush, label: "Style" },
        { id: "event" as MobileTab, icon: Users, label: "Event" },
        { id: "rounds" as MobileTab, icon: Trophy, label: "Rounds" },
      ]
    : [
        { id: "style" as MobileTab, icon: Paintbrush, label: "Theme" },
        { id: "event" as MobileTab, icon: SlidersHorizontal, label: "Details" },
        { id: "rounds" as MobileTab, icon: ImagePlus, label: "Media" },
      ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      {activeTab && (
        <button
          type="button"
          aria-label="Close panel"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveTab(null)}
        />
      )}

      {activeTab && (
        <div className="relative z-10 max-h-[74vh] overflow-y-auto rounded-t-2xl border-x border-t border-white/10 bg-card shadow-2xl">
          <div className="flex justify-center pb-1 pt-3">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-card/95 px-5 py-3 backdrop-blur">
            <span className="font-condensed text-sm font-black uppercase tracking-widest text-primary">
              {tabs.find((t) => t.id === activeTab)?.label}
            </span>
            <Button variant="ghost" size="icon" onClick={() => setActiveTab(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Module toggle always at top of every panel */}
          <div className="border-b border-white/10 px-5 py-3">
            <div className="grid grid-cols-2 rounded-md border bg-secondary p-1">
              {(
                [
                  ["cards", "Cards"],
                  ["pubmat", "Pub Mat"],
                ] as [GeneratorMode, string][]
              ).map(([key, label]) => (
                <Button
                  key={key}
                  variant={generatorMode === key ? "default" : "ghost"}
                  onClick={() => setGeneratorMode(key)}
                  className="font-condensed uppercase tracking-[0.14em]"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* ── Style / Theme ── */}
          {activeTab === "style" && isCards && (
            <div className="px-5 py-4">
              <DesignCarousel designs={designs} selected={design} onSelect={setDesign} />
            </div>
          )}

          {activeTab === "style" && !isCards && (
            <div className="px-5 py-4">
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(pubMatThemes) as PubMatThemeKey[]).map((key) => {
                  const item = pubMatThemes[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setPubTheme(key)}
                      className={cn(
                        "rounded-md border p-3 text-left transition",
                        pubTheme === key ? "border-primary bg-primary/10" : "bg-secondary",
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
            </div>
          )}

          {/* ── Event (Cards) ── */}
          {activeTab === "event" && isCards && (
            <div className="space-y-0 pb-4">
              <div className="border-b border-white/10 px-5 py-4">
                <div className="mb-2 font-condensed text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
                  Input Mode
                </div>
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
              </div>

              {mode === "scrape" && (
                <div className="border-b border-white/10 px-5 py-4">
                  <div className="space-y-3 rounded-lg border border-primary/25 bg-primary/5 p-4">
                    <p className="text-xs leading-6 text-muted-foreground">
                      Server-side Challonge scraping.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        value={scrapeUrl}
                        onChange={(e) => setScrapeUrl(e.target.value)}
                        className="font-mono text-xs"
                      />
                      <Button onClick={runScraper} disabled={loading} size="icon" aria-label="Fetch">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                      </Button>
                    </div>
                    {logs.length > 0 && (
                      <pre className="max-h-24 overflow-auto rounded-md bg-black/30 p-3 font-mono text-[10px] leading-5 text-muted-foreground">
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
                          {scraped.participants.length} players, {scraped.matches.length} matches
                        </div>
                        <Input
                          value={scrapePlayer}
                          onChange={(e) => setScrapePlayer(e.target.value)}
                          placeholder="Type or choose player"
                        />
                        <div className="flex max-h-20 flex-wrap gap-2 overflow-auto">
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
                        {scrapePlayer && playerMatches.length > 0 && (
                          <Button onClick={applyScrape} className="w-full">
                            <Wand2 className="h-4 w-4" /> Apply to Card
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-3 px-5 pt-4">
                <Field label="Player">
                  <Input
                    value={form.player}
                    onChange={(e) => setForm((f) => ({ ...f, player: e.target.value }))}
                  />
                </Field>
                <Field label="Tournament">
                  <Input
                    value={form.tournament}
                    onChange={(e) => setForm((f) => ({ ...f, tournament: e.target.value }))}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Organizer">
                    <Input
                      value={form.organizer}
                      onChange={(e) => setForm((f) => ({ ...f, organizer: e.target.value }))}
                    />
                  </Field>
                  <Field label="Date">
                    <Input
                      value={form.date}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Game">
                    <Input
                      value={form.game}
                      onChange={(e) => setForm((f) => ({ ...f, game: e.target.value }))}
                    />
                  </Field>
                  <Field label="Card #">
                    <Input
                      value={form.cardNum}
                      onChange={(e) => setForm((f) => ({ ...f, cardNum: e.target.value }))}
                    />
                  </Field>
                </div>
              </div>
            </div>
          )}

          {/* ── Details (PubMat) ── */}
          {activeTab === "event" && !isCards && (
            <div className="space-y-3 px-5 py-4">
              <Field label="Shop / Host">
                <Input value={pubMat.shopName} onChange={(e) => setPubMat((p) => ({ ...p, shopName: e.target.value }))} />
              </Field>
              <Field label="Partners">
                <Input value={pubMat.partners} onChange={(e) => setPubMat((p) => ({ ...p, partners: e.target.value }))} />
              </Field>
              <Field label="Game / Hobby">
                <Input value={pubMat.game} onChange={(e) => setPubMat((p) => ({ ...p, game: e.target.value }))} />
              </Field>
              <Field label="Event Name">
                <Input value={pubMat.eventName} onChange={(e) => setPubMat((p) => ({ ...p, eventName: e.target.value }))} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Event Type">
                  <Input value={pubMat.eventType} onChange={(e) => setPubMat((p) => ({ ...p, eventType: e.target.value }))} />
                </Field>
                <Field label="Date">
                  <Input value={pubMat.date} onChange={(e) => setPubMat((p) => ({ ...p, date: e.target.value }))} />
                </Field>
              </div>
              <Field label="Venue">
                <Input value={pubMat.venue} onChange={(e) => setPubMat((p) => ({ ...p, venue: e.target.value }))} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Prep Time">
                  <Input value={pubMat.prepTime} onChange={(e) => setPubMat((p) => ({ ...p, prepTime: e.target.value }))} />
                </Field>
                <Field label="Start Time">
                  <Input value={pubMat.startTime} onChange={(e) => setPubMat((p) => ({ ...p, startTime: e.target.value }))} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Pre-reg Price">
                  <Input value={pubMat.preRegPrice} onChange={(e) => setPubMat((p) => ({ ...p, preRegPrice: e.target.value }))} />
                </Field>
                <Field label="Walk-in Price">
                  <Input value={pubMat.walkInPrice} onChange={(e) => setPubMat((p) => ({ ...p, walkInPrice: e.target.value }))} />
                </Field>
              </div>
              <Field label="Prize Headline">
                <Input value={pubMat.prizeHeadline} onChange={(e) => setPubMat((p) => ({ ...p, prizeHeadline: e.target.value }))} />
              </Field>
              <Field label="Guest Headline">
                <Input value={pubMat.guestHeadline} onChange={(e) => setPubMat((p) => ({ ...p, guestHeadline: e.target.value }))} />
              </Field>
            </div>
          )}

          {/* ── Rounds (Cards) ── */}
          {activeTab === "rounds" && isCards && (
            <div className="pb-4">
              <div className="border-b border-white/10 px-5 py-4">
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
              </div>

              {cardType === "swiss" ? (
                <div className="px-5 pt-4">
                  <div className="space-y-2">
                    {rounds.map((round, i) => (
                      <div key={i} className="grid grid-cols-[44px_1fr_68px_52px] gap-2">
                        <Input
                          value={round.rnd}
                          onChange={(e) => setRounds(update(rounds, i, { rnd: e.target.value }))}
                          className="px-2 text-center font-mono text-xs"
                        />
                        <Input
                          value={round.opp}
                          onChange={(e) => setRounds(update(rounds, i, { opp: e.target.value }))}
                          placeholder="Opponent"
                        />
                        <Input
                          value={round.score}
                          onChange={(e) => setRounds(update(rounds, i, { score: e.target.value }))}
                          className="px-1 text-center font-mono text-xs"
                          placeholder="4-1"
                        />
                        <Button
                          variant={round.result === "win" ? "default" : "destructive"}
                          onClick={() =>
                            setRounds(update(rounds, i, { result: round.result === "win" ? "loss" : "win" }))
                          }
                          className="px-2"
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
                      setRounds([...rounds, { rnd: `R${rounds.length + 1}`, opp: "", score: "", result: "win" }])
                    }
                  >
                    <Plus className="h-4 w-4" /> Add Round
                  </Button>
                  <Field label="Advancement Message" className="mt-3">
                    <Input
                      value={form.advMsg}
                      onChange={(e) => setForm((f) => ({ ...f, advMsg: e.target.value }))}
                    />
                  </Field>
                </div>
              ) : (
                <div className="px-5 pt-4">
                  <div className="space-y-2">
                    {topCut.map((match, i) => (
                      <div key={i} className="grid grid-cols-[88px_1fr_60px_52px] gap-2">
                        <Input
                          value={match.stage}
                          onChange={(e) => setTopCut(update(topCut, i, { stage: e.target.value }))}
                          className="text-xs"
                        />
                        <Input
                          value={match.opp}
                          onChange={(e) => setTopCut(update(topCut, i, { opp: e.target.value }))}
                          placeholder="Opponent"
                        />
                        <Input
                          value={match.score}
                          onChange={(e) => setTopCut(update(topCut, i, { score: e.target.value }))}
                          className="px-1 text-center font-mono text-xs"
                        />
                        <Button
                          variant={match.result === "win" ? "default" : "destructive"}
                          onClick={() => {
                            const next = match.result === "win" ? "loss" : "win";
                            setTopCut(update(topCut, i, { result: next }));
                            if (next === "loss") setForm((f) => ({ ...f, champTitle: "ELIMINATED" }));
                          }}
                          className="px-2"
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
                      setTopCut([...topCut, { stage: `Match ${topCut.length + 1}`, opp: "", score: "1 - 0", result: "win" }])
                    }
                  >
                    <Plus className="h-4 w-4" /> Add Match
                  </Button>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <Field label="Finals Opponent">
                      <Input
                        value={form.finalsOpp}
                        onChange={(e) => setForm((f) => ({ ...f, finalsOpp: e.target.value }))}
                      />
                    </Field>
                    <Field label="Finals Score">
                      <Input
                        value={form.finalsSc}
                        onChange={(e) => setForm((f) => ({ ...f, finalsSc: e.target.value }))}
                      />
                    </Field>
                  </div>
                  <div className="mb-3 grid grid-cols-2 gap-2">
                    <Button
                      variant={form.finalsResult === "win" ? "default" : "outline"}
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          finalsResult: "win",
                          champTitle: ["FINALIST", "ELIMINATED"].includes(f.champTitle) ? "CHAMPION" : f.champTitle,
                        }))
                      }
                    >
                      Finals Win
                    </Button>
                    <Button
                      variant={form.finalsResult === "loss" ? "destructive" : "outline"}
                      onClick={() => setForm((f) => ({ ...f, finalsResult: "loss", champTitle: "FINALIST" }))}
                    >
                      Finals Loss
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Title">
                      <Input
                        value={form.champTitle}
                        onChange={(e) => setForm((f) => ({ ...f, champTitle: e.target.value }))}
                      />
                    </Field>
                    <Field label="Record">
                      <Input
                        value={form.tcRecord}
                        onChange={(e) => setForm((f) => ({ ...f, tcRecord: e.target.value }))}
                      />
                    </Field>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Media (PubMat) ── */}
          {activeTab === "rounds" && !isCards && (
            <div className="pb-4">
              <div className="grid grid-cols-2 gap-3 px-5 pt-4">
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
                    onChange={(value) =>
                      setPubMat((p) => ({ ...p, images: { ...p.images, [key]: value } }))
                    }
                  />
                ))}
              </div>
              <div className="mt-4 space-y-2 px-5">
                <div className="mb-1 font-condensed text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
                  Guests
                </div>
                {pubMat.guests.map((v, i) => (
                  <div key={i} className="grid grid-cols-[1fr_40px] gap-2">
                    <Input
                      value={v}
                      placeholder="Guest name"
                      onChange={(e) =>
                        setPubMat((p) => ({ ...p, guests: p.guests.map((g, j) => j === i ? e.target.value : g) }))
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setPubMat((p) => ({ ...p, guests: p.guests.filter((_, j) => j !== i) }))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setPubMat((p) => ({ ...p, guests: [...p.guests, ""] }))}
                >
                  <Plus className="h-4 w-4" /> Add Guest
                </Button>
              </div>
              <div className="mt-4 space-y-2 px-5">
                <div className="mb-1 font-condensed text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
                  Notes
                </div>
                {pubMat.notes.map((v, i) => (
                  <div key={i} className="grid grid-cols-[1fr_40px] gap-2">
                    <Input
                      value={v}
                      placeholder="Event note"
                      onChange={(e) =>
                        setPubMat((p) => ({ ...p, notes: p.notes.map((n, j) => j === i ? e.target.value : n) }))
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setPubMat((p) => ({ ...p, notes: p.notes.filter((_, j) => j !== i) }))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setPubMat((p) => ({ ...p, notes: [...p.notes, ""] }))}
                >
                  <Plus className="h-4 w-4" /> Add Note
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom toolbar */}
      <div className="flex items-stretch border-t border-white/10 bg-card/95 backdrop-blur safe-area-inset-bottom">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => toggle(id)}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 py-3 transition-colors active:bg-white/5",
              activeTab === id ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="font-condensed text-[10px] font-black uppercase tracking-wide">{label}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={downloadCard}
          disabled={exporting}
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-primary transition-colors active:bg-white/5 disabled:opacity-50"
        >
          {exporting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Download className="h-5 w-5" />
          )}
          <span className="font-condensed text-[10px] font-black uppercase tracking-wide">Save</span>
        </button>
      </div>
    </div>
  );
}

function FloatingFeedbackTool({
  open,
  onOpenChange,
  feedback,
  setFeedback,
  submitting,
  notice,
  error,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feedback: FeedbackState;
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackState>>;
  submitting: boolean;
  notice: string;
  error: string;
  onSubmit: () => void;
}) {
  return (
    <>
      <Button
        type="button"
        onClick={() => onOpenChange(true)}
        className="fixed bottom-24 right-4 z-40 h-12 rounded-full px-4 font-condensed text-sm font-black uppercase tracking-[0.14em] shadow-2xl shadow-primary/20 lg:bottom-5 lg:right-5 lg:h-14 lg:px-5 lg:text-base"
      >
        <MessageSquare className="h-5 w-5" />
        Feedback
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="Close feedback"
            className="absolute inset-0 cursor-default"
            onClick={() => onOpenChange(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Feedback"
            className="relative max-h-[92vh] w-full max-w-[460px] overflow-auto rounded-lg border bg-card shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card/95 px-6 py-4 backdrop-blur">
              <div>
                <div className="font-display text-3xl leading-none tracking-[0.08em] text-primary">
                  Feedback
                </div>
                <div className="mt-1 font-condensed text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                  Report problems or request features
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Close feedback"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FeedbackEditor
              feedback={feedback}
              setFeedback={setFeedback}
              submitting={submitting}
              notice={notice}
              error={error}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      )}
    </>
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
  const setList = (key: "guests" | "notes", values: string[]) =>
    setPubMat((current) => ({ ...current, [key]: values }));
  const setSponsors = (values: Sponsor[]) =>
    setPubMat((current) => ({ ...current, sponsors: values }));
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
      <SponsorList values={pubMat.sponsors} onChange={setSponsors} />
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

function SponsorList({
  values,
  onChange,
}: {
  values: Sponsor[];
  onChange: (values: Sponsor[]) => void;
}) {
  return (
    <Section title="Sponsors">
      <div className="space-y-3">
        {values.map((s, i) => (
          <div key={i} className="rounded-md border bg-secondary p-3">
            <div className="flex gap-2">
              <Input
                value={s.text}
                placeholder="Sponsor name"
                onChange={(e) =>
                  onChange(values.map((v, j) => (j === i ? { ...v, text: e.target.value } : v)))
                }
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Remove sponsor ${i + 1}`}
                onClick={() => onChange(values.filter((_, j) => j !== i))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <label className="inline-flex h-8 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border bg-background px-3 font-condensed text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-secondary">
                <ImagePlus className="h-3.5 w-3.5" />
                {s.image ? "Change Logo" : "Upload Logo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () =>
                      onChange(values.map((v, j) => (j === i ? { ...v, image: String(reader.result || "") } : v)));
                    reader.readAsDataURL(file);
                    e.currentTarget.value = "";
                  }}
                />
              </label>
              {s.image && (
                <>
                  <div
                    className="h-8 w-16 rounded border bg-cover bg-center bg-white"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      onChange(values.map((v, j) => (j === i ? { ...v, image: "" } : v)))
                    }
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="mt-3 w-full"
        onClick={() => onChange([...values, { text: "", image: "" }])}
      >
        <Plus className="h-4 w-4" /> Add Sponsor
      </Button>
    </Section>
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
  switch (theme.template) {
    case "futuristic":
      return <FuturisticPubMatPoster pubMat={pubMat} theme={theme} />;
    case "arena":
      return <ArenaClashPubMatPoster pubMat={pubMat} theme={theme} />;
    case "tribe":
      return <ShadowTribePubMatPoster pubMat={pubMat} theme={theme} />;
    case "catchup":
      return <VelocityPopPubMatPoster pubMat={pubMat} theme={theme} />;
    case "cup":
      return <BladeCupPubMatPoster pubMat={pubMat} theme={theme} />;
    case "neon":
      return <NeonFestivalPubMatPoster pubMat={pubMat} theme={theme} />;
    case "manga":
      return <MangaPanelPubMatPoster pubMat={pubMat} theme={theme} />;
    case "gold":
      return <GoldLeaguePubMatPoster pubMat={pubMat} theme={theme} />;
    case "street":
      return <StreetBattlePubMatPoster pubMat={pubMat} theme={theme} />;
    case "cosmic":
      return <CosmicArenaPubMatPoster pubMat={pubMat} theme={theme} />;
    case "volcanic":
      return <VolcanicPubMatPoster pubMat={pubMat} theme={theme} />;
    default:
      break;
  }

  const gallery = [
    pubMat.images.gallery1,
    pubMat.images.gallery2,
    pubMat.images.gallery3,
    pubMat.images.gallery4,
  ];
  const visibleGuests = pubMat.guests.filter(Boolean);
  const visibleSponsors = pubMat.sponsors.filter((s) => s.text || s.image);
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
            className="pubmat-title-lock font-display text-[76px] leading-[0.88] tracking-[0.03em]"
            style={{ color: theme.ink }}
          >
            {pubMat.eventName}
          </div>
          <div
            className="pubmat-title-lock font-display text-[96px] leading-[0.82] tracking-[0.03em]"
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
          <span className="pubmat-line-lock min-w-0">{pubMat.venue}</span>
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
                    className="pubmat-small-lock border-4 bg-white px-3 py-2 text-center font-display text-2xl leading-none text-white"
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
                className="pubmat-line-lock font-display text-[58px] leading-none tracking-[0.05em]"
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
                    className="pubmat-small-lock border-l-8 bg-white px-4 py-2 font-condensed text-xl font-bold uppercase tracking-[0.06em]"
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
              {visibleSponsors.slice(0, 18).map((s, i) => (
                <div
                  key={`${s.text}-${i}`}
                  className="pubmat-cell-lock flex h-14 items-center justify-center border-2 bg-white px-2 text-center font-condensed text-xs font-black uppercase leading-tight"
                  style={{ borderColor: theme.ink, color: theme.ink }}
                >
                  {s.image
                    ? <img src={s.image} alt={s.text || "Sponsor"} className="max-h-full max-w-full object-contain p-1" draggable={false} />
                    : s.text}
                </div>
              ))}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

function FuturisticPubMatPoster({
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
  const visibleNotes = pubMat.notes.filter(Boolean);
  const visibleSponsors = pubMat.sponsors.filter((s) => s.text || s.image);
  const visibleGuests = pubMat.guests.filter(Boolean);

  return (
    <div
      className="relative min-h-[1080px] overflow-hidden border border-white/10 p-5 text-white"
      style={{ background: theme.paper, color: theme.ink }}
    >
      <div className="pubmat-hyper-grid absolute inset-0" />
      <div className="pubmat-speed-lines absolute inset-0 opacity-80" />
      <div
        className="absolute -left-36 top-16 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: `${theme.accent}44` }}
      />
      <div
        className="absolute -right-28 top-48 h-[440px] w-[440px] rounded-full blur-3xl"
        style={{ background: `${theme.accent2}33` }}
      />
      <div className="absolute inset-x-5 top-5 h-1 bg-gradient-to-r from-transparent via-white/70 to-transparent" />

      <div className="relative z-10">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <CyberBrand title={pubMat.shopName} subtitle={pubMat.partners} theme={theme} />
          <div
            className="flex h-20 w-20 items-center justify-center border-2 font-display text-5xl leading-none"
            style={{
              borderColor: theme.accent,
              color: theme.accent2,
              boxShadow: `0 0 28px ${theme.accent}66, inset 0 0 24px ${theme.accent2}22`,
              clipPath: "polygon(18% 0, 100% 0, 82% 100%, 0 100%)",
            }}
          >
            X
          </div>
          <CyberBrand
            title={pubMat.game}
            subtitle={pubMat.eventType}
            theme={theme}
            align="right"
          />
        </header>

        <section className="mt-7 grid grid-cols-[150px_1fr_150px] gap-4">
          <div>
            <div
              className="font-display text-5xl leading-none"
              style={{ color: theme.accent2, textShadow: `0 0 18px ${theme.accent2}` }}
            >
              {pubMat.date.split(/[ ,./-]/)[0] || pubMat.date}
            </div>
            <div
              className="mt-1 font-display text-[104px] leading-[0.78]"
              style={{ color: theme.accent, textShadow: `0 0 24px ${theme.accent}` }}
            >
              {pubMat.date.split(/[ ,./-]/)[1] || ""}
            </div>
            <div className="mt-3 font-condensed text-xl font-black uppercase tracking-[0.18em] text-white/70">
              Tournament
            </div>
          </div>

          <div className="text-center">
            <div
              className="font-condensed text-2xl font-black uppercase tracking-[0.42em]"
              style={{ color: theme.accent2 }}
            >
              {pubMat.game}
            </div>
            <h2
              className="pubmat-glitch-title pubmat-title-lock mt-1 break-words font-display text-[92px] leading-[0.82] tracking-[0.03em]"
              style={{
                color: theme.ink,
                textShadow: `5px 5px 0 ${theme.accent}, 0 0 26px ${theme.accent2}`,
              }}
            >
              {pubMat.eventName}
            </h2>
            <div
              className="pubmat-chip-text mx-auto mt-2 inline-flex max-w-full px-7 py-1 font-display text-4xl leading-none tracking-[0.08em]"
              style={{
                background: theme.accent,
                color: "#ffffff",
                clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
                textShadow: "2px 2px 0 #050505",
              }}
            >
              {pubMat.eventType}
            </div>
          </div>

          <CyberPanel className="self-start p-4 text-center" theme={theme}>
            <Gift className="mx-auto h-9 w-9" style={{ color: theme.accent2 }} />
            <div className="pubmat-small-lock mt-2 font-condensed text-lg font-black uppercase leading-tight tracking-[0.08em]">
              {pubMat.prizeHeadline}
            </div>
          </CyberPanel>
        </section>

        <section className="relative mt-4 h-[408px]">
          <div className="absolute left-1/2 top-12 h-[310px] w-[310px] -translate-x-1/2 rounded-full border border-white/20" />
          <div
            className="absolute left-1/2 top-4 h-[390px] w-[390px] -translate-x-1/2 rounded-full border-4 opacity-70"
            style={{ borderColor: theme.accent, boxShadow: `0 0 55px ${theme.accent}` }}
          />
          <div
            className="absolute left-1/2 top-16 h-[260px] w-[520px] -translate-x-1/2 rounded-[50%] blur-sm"
            style={{
              background: `radial-gradient(ellipse, ${theme.accent}44 0%, ${theme.accent2}22 38%, transparent 72%)`,
            }}
          />

          <CyberPanel className="absolute left-0 top-16 w-[198px] p-4" theme={theme}>
            <div className="font-condensed text-base font-black uppercase tracking-[0.18em] text-white/50">
              Entrance Fee
            </div>
            <PriceRow label="Pre-Reg" value={pubMat.preRegPrice} theme={theme} />
            <PriceRow label="Walk-In" value={pubMat.walkInPrice} theme={theme} />
          </CyberPanel>

          <CyberPanel className="absolute right-0 top-10 w-[220px] space-y-3 p-4" theme={theme}>
            <InfoLine icon={<CalendarDays className="h-6 w-6" />} label={pubMat.date} theme={theme} />
            <InfoLine icon={<Clock className="h-6 w-6" />} label={pubMat.prepTime} theme={theme} />
            <InfoLine icon={<Zap className="h-6 w-6" />} label={pubMat.startTime} theme={theme} />
          </CyberPanel>

          <div className="absolute left-[190px] right-[190px] top-5 h-[360px]">
            <PosterHeroImage src={pubMat.images.hero} label="Main Visual" theme={theme} />
          </div>

          <div className="absolute bottom-0 left-[62px] right-[62px]">
            <CyberPanel className="grid grid-cols-[auto_1fr] items-center gap-3 p-4" theme={theme}>
              <MapPin className="h-9 w-9" style={{ color: theme.accent }} />
              <div>
                <div className="font-condensed text-sm font-black uppercase tracking-[0.22em] text-white/45">
                  Location
                </div>
                <div className="pubmat-line-lock font-condensed text-2xl font-black uppercase tracking-[0.06em]">
                  {pubMat.venue}
                </div>
              </div>
            </CyberPanel>
          </div>
        </section>

        <section className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <div
              className="font-display text-5xl leading-none tracking-[0.08em]"
              style={{ color: theme.ink, textShadow: `3px 3px 0 ${theme.accent}` }}
            >
              PRIZES
            </div>
            <div className="font-condensed text-lg font-black uppercase tracking-[0.2em] text-white/50">
              {pubMat.guestHeadline}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((src, index) => (
              <PrizeTile
                key={index}
                src={src}
                label={visibleGuests[index] || `Prize ${index + 1}`}
                theme={theme}
              />
            ))}
          </div>
        </section>

        <section className="mt-4 grid grid-cols-[1fr_190px] gap-3">
          <div className="grid grid-cols-3 gap-3">
            {(visibleNotes.length ? visibleNotes : ["3G Deck", "5-Round Swiss", "No Repeating Parts"])
              .slice(0, 6)
              .map((note, index) => (
                <StatTile key={`${note}-${index}`} note={note} index={index} theme={theme} />
              ))}
          </div>
          <CyberPanel className="flex flex-col items-center justify-center p-4 text-center" theme={theme}>
            <Users className="h-10 w-10" style={{ color: theme.accent2 }} />
            <div className="mt-2 font-display text-5xl leading-none" style={{ color: theme.accent }}>
              {visibleGuests.length || "20"}
            </div>
            <div className="font-condensed text-xl font-black uppercase leading-tight tracking-[0.16em]">
              Player Cap
            </div>
          </CyberPanel>
        </section>

        <footer className="mt-4">
          <div
            className="pubmat-title-lock font-display text-[52px] leading-none tracking-[0.04em]"
            style={{ color: theme.ink, textShadow: `4px 4px 0 ${theme.accent}` }}
          >
            LET IT RIP. BE THE CHAMPION.
          </div>
          {visibleSponsors.length > 0 && (
            <div className="mt-3 grid grid-cols-6 gap-2">
              {visibleSponsors.slice(0, 12).map((s, i) => (
                <div
                  key={`${s.text}-${i}`}
                  className="flex h-11 items-center justify-center border px-2 text-center font-condensed text-xs font-black uppercase leading-tight tracking-[0.08em]"
                  style={{
                    borderColor: `${theme.accent2}70`,
                    background: "rgba(255,255,255,.04)",
                    color: theme.ink,
                  }}
                >
                  {s.image
                    ? <img src={s.image} alt={s.text || "Sponsor"} className="max-h-full max-w-full object-contain p-1" draggable={false} />
                    : s.text}
                </div>
              ))}
            </div>
          )}
        </footer>
      </div>
      <div className="pubmat-scanline pointer-events-none absolute inset-0" />
    </div>
  );
}

function ArenaClashPubMatPoster({
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
  const visibleSponsors = pubMat.sponsors.filter((s) => s.text || s.image);
  const visibleNotes = pubMat.notes.filter(Boolean);

  return (
    <div className="relative min-h-[1080px] overflow-hidden bg-black p-5 text-white">
      <div className="pubmat-hyper-grid absolute inset-0 opacity-55" />
      <div className="pubmat-red-scratch absolute inset-0" />
      <div className="relative z-10">
        <header className="grid grid-cols-4 items-center gap-4">
          {visibleSponsors.slice(0, 4).map((s, i) => (
            <CyberPanel key={`${s.text}-${i}`} className="flex h-24 items-center justify-center p-3 text-center" theme={theme}>
              {s.image
                ? <img src={s.image} alt={s.text || "Sponsor"} className="max-h-full max-w-full object-contain" draggable={false} />
                : <div className="pubmat-small-lock font-display text-2xl leading-none tracking-[0.04em]">{s.text}</div>}
            </CyberPanel>
          ))}
        </header>

        <section className="mt-5 text-center">
          <div className="font-condensed text-xl font-black uppercase tracking-[0.32em]" style={{ color: theme.accent2 }}>
            {pubMat.shopName} / {pubMat.partners}
          </div>
          <h2 className="pubmat-title-lock mt-1 font-display text-[86px] leading-[0.84] tracking-[0.03em]" style={{ textShadow: `5px 5px 0 ${theme.accent}` }}>
            {pubMat.game}
          </h2>
          <div className="pubmat-title-lock font-display text-[62px] leading-none" style={{ color: theme.accent2, textShadow: "3px 3px 0 #000" }}>
            {pubMat.eventName}
          </div>
        </section>

        <section className="mt-3 grid grid-cols-[180px_1fr_180px] gap-4">
          <CyberPanel className="space-y-5 p-4" theme={theme}>
            <PriceRow label="Single Entry" value={pubMat.preRegPrice} theme={theme} />
            <PriceRow label="Double Entry" value={pubMat.walkInPrice} theme={theme} />
            <div className="border-t border-white/15 pt-4 font-condensed text-2xl font-black uppercase leading-tight tracking-[0.08em]">
              {visibleNotes[0] || "Includes food voucher"}
            </div>
          </CyberPanel>

          <div className="relative h-[444px]">
            <div
              className="absolute inset-x-8 bottom-10 h-40 rounded-[50%] blur-sm"
              style={{ background: `radial-gradient(ellipse, ${theme.accent}66, transparent 70%)` }}
            />
            <PosterHeroImage src={pubMat.images.hero || pubMat.images.product} label="Battle Visual" theme={theme} />
          </div>

          <CyberPanel className="space-y-4 p-4" theme={theme}>
            <InfoLine icon={<CalendarDays className="h-6 w-6" />} label={pubMat.date} theme={theme} />
            <InfoLine icon={<Clock className="h-6 w-6" />} label={pubMat.prepTime} theme={theme} />
            <InfoLine icon={<Zap className="h-6 w-6" />} label={pubMat.startTime} theme={theme} />
            <div className="border-t border-white/15 pt-3">
              <div className="font-condensed text-sm font-black uppercase tracking-[0.2em] text-white/45">Location</div>
              <div className="pubmat-small-lock font-condensed text-xl font-black uppercase leading-tight">{pubMat.venue}</div>
            </div>
          </CyberPanel>
        </section>

        <section className="mt-4">
          <div className="mx-auto mb-2 w-fit px-8 py-1 font-display text-4xl leading-none" style={{ background: theme.accent }}>
            PRIZES
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[pubMat.images.product, ...gallery].slice(0, 4).map((src, index) => (
              <PrizeTile key={index} src={src} label={pubMat.guests[index] || `Prize ${index + 1}`} theme={theme} />
            ))}
          </div>
        </section>

        <footer className="mt-4 grid grid-cols-[1fr_1fr] gap-4">
          <CyberPanel className="p-4 text-center" theme={theme}>
            <div className="font-condensed text-xl font-black uppercase tracking-[0.18em] text-white/55">Special Prizes</div>
            <div className="pubmat-title-lock font-display text-5xl leading-none" style={{ color: theme.accent2 }}>
              {pubMat.prizeHeadline}
            </div>
          </CyberPanel>
          <CyberPanel className="p-4 text-center" theme={theme}>
            <div className="font-condensed text-xl font-black uppercase tracking-[0.18em] text-white/55">Callout</div>
            <div className="pubmat-title-lock font-display text-4xl leading-none" style={{ color: theme.accent }}>
              {pubMat.guestHeadline}
            </div>
          </CyberPanel>
        </footer>
      </div>
    </div>
  );
}

function ShadowTribePubMatPoster({
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
  const visibleNotes = pubMat.notes.filter(Boolean);

  return (
    <div className="relative min-h-[1080px] overflow-hidden p-5 text-white" style={{ background: theme.paper }}>
      <div className="pubmat-purple-storm absolute inset-0" />
      <div className="relative z-10">
        <header className="grid grid-cols-[145px_1fr_145px] gap-4">
          <CyberPanel className="p-4 text-center" theme={theme}>
            <div className="pubmat-small-lock font-display text-4xl leading-none" style={{ color: theme.accent }}>{pubMat.date}</div>
            <div className="font-condensed text-xl font-black uppercase tracking-[0.16em]">Tournament</div>
          </CyberPanel>
          <div className="text-center">
            <h2 className="pubmat-title-lock font-display text-[90px] leading-[0.84]" style={{ textShadow: `5px 5px 0 ${theme.accent2}` }}>
              {pubMat.eventName}
            </h2>
            <div className="pubmat-line-lock font-display text-4xl leading-none" style={{ color: theme.accent2 }}>
              {pubMat.game}
            </div>
          </div>
          <CyberPanel className="p-4 text-center" theme={theme}>
            <Gift className="mx-auto h-10 w-10" style={{ color: theme.accent }} />
            <div className="pubmat-small-lock mt-2 font-condensed text-lg font-black uppercase leading-tight tracking-[0.08em]">
              {pubMat.prizeHeadline}
            </div>
          </CyberPanel>
        </header>

        <section className="relative mt-3 h-[250px]">
          <div className="absolute left-0 top-4 h-56 w-56">
            <PosterHeroImage src={pubMat.images.hero} label="Left Bey" theme={theme} />
          </div>
          <div className="absolute right-0 top-4 h-56 w-56">
            <PosterHeroImage src={pubMat.images.product} label="Right Bey" theme={theme} />
          </div>
          <CyberPanel className="absolute bottom-2 left-[175px] right-[175px] grid grid-cols-2 gap-4 p-4" theme={theme}>
            <InfoLine icon={<Clock className="h-6 w-6" />} label={pubMat.prepTime} theme={theme} />
            <InfoLine icon={<Zap className="h-6 w-6" />} label={pubMat.startTime} theme={theme} />
          </CyberPanel>
        </section>

        <section className="mt-4">
          <div className="mb-2 text-center font-display text-5xl leading-none">PRIZES</div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((src, index) => (
              <PrizeTile key={index} src={src} label={pubMat.guests[index] || ["Champion", "2nd", "3rd", "Swiss King"][index]} theme={theme} />
            ))}
          </div>
        </section>

        <section className="mt-4 grid grid-cols-[1fr_170px] gap-3">
          <div className="grid grid-cols-3 gap-3">
            {(visibleNotes.length ? visibleNotes : ["4G", "1-Bey Banning", "5-Round Swiss", "5 Points Each Match", "Semis 6 Points", "Finals 7 Points"])
              .slice(0, 6)
              .map((note, index) => (
                <StatTile key={`${note}-${index}`} note={note} index={index} theme={theme} />
              ))}
          </div>
          <CyberPanel className="flex flex-col justify-center p-4 text-center" theme={theme}>
            <div className="font-display text-6xl leading-none" style={{ color: theme.accent2 }}>
              X
            </div>
            <div className="font-condensed text-2xl font-black uppercase leading-tight">
              Special Rule
            </div>
          </CyberPanel>
        </section>

        <footer className="mt-4">
          <div className="grid grid-cols-[1fr_auto] items-end gap-4">
            <div>
              <div className="font-display text-4xl leading-none text-white/80">ENTRANCE FEE:</div>
              <div className="pubmat-line-lock font-display text-[88px] leading-[0.8]" style={{ color: theme.accent2, textShadow: `5px 5px 0 ${theme.accent}` }}>
                {pubMat.walkInPrice}
              </div>
            </div>
            <CyberPanel className="w-72 p-4" theme={theme}>
              <InfoLine icon={<MapPin className="h-6 w-6" />} label={pubMat.venue} theme={theme} />
            </CyberPanel>
          </div>
        </footer>
      </div>
    </div>
  );
}

function VelocityPopPubMatPoster({
  pubMat,
  theme,
}: {
  pubMat: PubMatState;
  theme: PubMatTheme;
}) {
  return (
    <div className="relative min-h-[1080px] overflow-hidden p-5 text-white" style={{ background: theme.paper }}>
      <div className="pubmat-green-flow absolute inset-0" />
      <div className="absolute inset-y-0 left-0 w-[58%] bg-black/45" style={{ clipPath: "polygon(0 0, 100% 0, 72% 100%, 0 100%)" }} />
      <div className="relative z-10 grid min-h-[1040px] grid-cols-[0.92fr_1.08fr] gap-5">
        <div className="flex flex-col justify-between">
          <header>
            <div className="font-display text-5xl leading-none" style={{ color: theme.accent }}>
              {pubMat.date}
            </div>
            <h2 className="pubmat-title-lock mt-1 font-display text-[76px] leading-[0.86]" style={{ textShadow: "4px 4px 0 #000" }}>
              {pubMat.eventName}
            </h2>
            <div className="font-display text-4xl leading-none italic">Catchin up</div>
          </header>

          <div className="space-y-3">
            <PriceRow label="Pre-Reg" value={pubMat.preRegPrice} theme={theme} />
            <PriceRow label="Walk-In" value={pubMat.walkInPrice} theme={theme} />
            <div className="font-display text-5xl leading-none" style={{ color: theme.accent2 }}>
              {pubMat.startTime}
            </div>
            <CyberPanel className="p-4" theme={theme}>
              <div className="pubmat-title-lock font-display text-3xl leading-none">{pubMat.prizeHeadline}</div>
              <div className="mt-2 font-condensed text-2xl font-black uppercase tracking-[0.08em]" style={{ color: theme.accent }}>
                {pubMat.guestHeadline}
              </div>
            </CyberPanel>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-col gap-4">
          <CyberPanel className="ml-auto w-64 p-4 text-center" theme={theme}>
            <MapPin className="mx-auto h-10 w-10" style={{ color: theme.accent }} />
            <div className="pubmat-small-lock mt-2 font-condensed text-xl font-black uppercase leading-tight">{pubMat.venue}</div>
          </CyberPanel>
          <div className="h-[460px]">
            <PosterHeroImage src={pubMat.images.hero || pubMat.images.product} label="Featured Product" theme={theme} />
          </div>
          <div className="h-40">
            <PosterHeroImage src={pubMat.images.gallery1} label="Launcher / Bonus" theme={theme} />
          </div>
          <div className="pubmat-title-lock mt-auto font-display text-[56px] leading-none tracking-[0.06em]">
            {pubMat.game}
          </div>
        </div>
      </div>
    </div>
  );
}

function BladeCupPubMatPoster({
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
  const visibleNotes = pubMat.notes.filter(Boolean);

  return (
    <div className="relative min-h-[1080px] overflow-hidden p-5 text-white" style={{ background: theme.paper }}>
      <div className="pubmat-red-scratch absolute inset-0" />
      <div className="relative z-10">
        <header className="grid grid-cols-[140px_1fr] gap-4">
          <CyberPanel className="flex h-32 items-center justify-center p-3 text-center" theme={theme}>
            <div className="pubmat-small-lock font-display text-3xl leading-none">{pubMat.shopName}</div>
          </CyberPanel>
          <div>
            <h2 className="pubmat-title-lock font-display text-[80px] leading-[0.84]" style={{ color: theme.accent, textShadow: "4px 4px 0 #fff" }}>
              {pubMat.eventName}
            </h2>
            <div className="pubmat-line-lock font-display text-4xl leading-none">{pubMat.game}</div>
          </div>
        </header>

        <section className="mt-4 grid grid-cols-[1fr_1fr] gap-4">
          <div className="h-[318px]">
            <PosterHeroImage src={pubMat.images.hero} label="Player / Host" theme={theme} />
          </div>
          <div className="h-[318px]">
            <PosterHeroImage src={pubMat.images.product} label="Battle Visual" theme={theme} />
          </div>
        </section>

        <CyberPanel className="mt-4 grid grid-cols-5 gap-2 p-3" theme={theme}>
          {[
            ["Entrance Fee", pubMat.walkInPrice],
            ["Deck", visibleNotes[0] || "3G"],
            ["Format", visibleNotes[1] || "5 Round Swiss"],
            ["Prize Pool", pubMat.prizeHeadline],
            ["Player Cap", pubMat.guests.filter(Boolean).length || "60"],
          ].map(([label, value]) => (
            <div key={label} className="border-r border-white/15 px-2 text-center last:border-r-0">
              <div className="font-condensed text-sm font-black uppercase tracking-[0.12em] text-white/45">{label}</div>
              <div className="pubmat-small-lock font-display text-2xl leading-none" style={{ color: theme.accent2 }}>{value}</div>
            </div>
          ))}
        </CyberPanel>

        <section className="mt-4">
          <div className="text-center font-display text-4xl leading-none">POSSIBLE PRIZES</div>
          <div className="mt-2 grid grid-cols-4 gap-3">
            {gallery.map((src, index) => (
              <PrizeTile key={index} src={src} label={pubMat.guests[index] || `${index + 1}${["st", "nd", "rd", "th"][index]} Place`} theme={theme} />
            ))}
          </div>
        </section>

        <section className="mt-4 grid grid-cols-[1fr_1fr] gap-4">
          <CyberPanel className="p-4 text-center" theme={theme}>
            <Trophy className="mx-auto h-12 w-12" style={{ color: theme.accent2 }} />
            <div className="font-display text-4xl leading-none">SPECIAL TITLE</div>
            <div className="font-display text-5xl leading-none" style={{ color: theme.accent }}>SWISS KING</div>
          </CyberPanel>
          <CyberPanel className="p-4" theme={theme}>
            <InfoLine icon={<CalendarDays className="h-6 w-6" />} label={pubMat.date} theme={theme} />
            <InfoLine icon={<Clock className="h-6 w-6" />} label={pubMat.prepTime} theme={theme} />
            <InfoLine icon={<Zap className="h-6 w-6" />} label={pubMat.startTime} theme={theme} />
            <InfoLine icon={<MapPin className="h-6 w-6" />} label={pubMat.venue} theme={theme} />
          </CyberPanel>
        </section>

        <footer className="pubmat-title-lock mt-4 text-center font-display text-4xl leading-none" style={{ color: theme.accent }}>
          SHOW YOUR SKILLS. DOMINATE THE ARENA.
        </footer>
      </div>
    </div>
  );
}

// ─── layout: neon festival ────────────────────────────────────────────────────
function NeonFestivalPubMatPoster({ pubMat, theme }: { pubMat: PubMatState; theme: PubMatTheme }) {
  const gallery = [pubMat.images.gallery1, pubMat.images.gallery2, pubMat.images.gallery3, pubMat.images.gallery4];
  const visibleGuests = pubMat.guests.filter(Boolean);
  const visibleSponsors = pubMat.sponsors.filter((s) => s.text || s.image);
  const visibleNotes = pubMat.notes.filter(Boolean);

  return (
    <div className="relative min-h-[1080px] overflow-hidden" style={{ background: theme.paper, color: theme.ink }}>
      <div className="pubmat-neon-grid absolute inset-0" />
      <div className="absolute -left-48 top-10 h-[560px] w-[560px] rounded-full blur-3xl" style={{ background: `${theme.accent}28` }} />
      <div className="absolute -right-48 bottom-20 h-[480px] w-[480px] rounded-full blur-3xl" style={{ background: `${theme.accent2}22` }} />
      <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, ${theme.accent2}, transparent)` }} />

      <div className="relative z-10 flex flex-col px-6 py-5">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <div className="pubmat-line-lock font-display text-4xl leading-none" style={{ color: theme.accent, textShadow: `0 0 18px ${theme.accent}` }}>
              {pubMat.shopName}
            </div>
            <div className="font-condensed text-sm font-black uppercase tracking-[0.22em]" style={{ color: theme.muted }}>
              {pubMat.partners}
            </div>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 font-display text-4xl leading-none" style={{ borderColor: theme.accent2, color: theme.accent2, boxShadow: `0 0 24px ${theme.accent2}66, inset 0 0 16px ${theme.accent2}22` }}>
            ×
          </div>
          <div className="text-right">
            <div className="pubmat-line-lock font-display text-4xl leading-none" style={{ color: theme.accent2, textShadow: `0 0 18px ${theme.accent2}` }}>
              {pubMat.game}
            </div>
            <div className="font-condensed text-sm font-black uppercase tracking-[0.22em]" style={{ color: theme.muted }}>
              {pubMat.eventType}
            </div>
          </div>
        </header>

        {/* Giant title */}
        <section className="mt-5 text-center">
          <div className="pubmat-title-lock font-display text-[88px] leading-[0.84]" style={{ color: theme.ink, textShadow: `0 0 40px ${theme.accent}88, 4px 4px 0 ${theme.accent}66` }}>
            {pubMat.eventName}
          </div>
          <div className="mt-3 inline-flex items-center gap-3 rounded-full border px-6 py-1.5 font-condensed text-lg font-black uppercase tracking-[0.2em]" style={{ borderColor: theme.accent2, color: theme.accent2, boxShadow: `0 0 14px ${theme.accent2}44` }}>
            <span style={{ color: theme.accent }}>★</span> {pubMat.eventType} <span style={{ color: theme.accent }}>★</span>
          </div>
        </section>

        {/* Hero image */}
        <section className="relative mt-5 h-[320px] overflow-hidden rounded-xl border-2" style={{ borderColor: `${theme.accent}80`, boxShadow: `0 0 32px ${theme.accent}40` }}>
          {pubMat.images.hero
            ? <img src={pubMat.images.hero} alt="" className="h-full w-full object-cover" draggable={false} />
            : <PosterHeroImage src="" label="Main Visual" theme={theme} />}
          <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: `linear-gradient(to top, ${theme.paper}, transparent)` }} />
        </section>

        {/* Info row */}
        <section className="mt-4 grid grid-cols-3 gap-3">
          {[
            { icon: <CalendarDays className="h-6 w-6" />, label: "Date", val: pubMat.date },
            { icon: <MapPin className="h-6 w-6" />, label: "Venue", val: pubMat.venue },
            { icon: <Clock className="h-6 w-6" />, label: "Start", val: pubMat.startTime },
          ].map(({ icon, label, val }) => (
            <div key={label} className="rounded-xl border p-3 text-center" style={{ borderColor: `${theme.accent2}35`, background: `${theme.accent2}08` }}>
              <div className="flex justify-center mb-1" style={{ color: theme.accent2 }}>{icon}</div>
              <div className="font-condensed text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>{label}</div>
              <div className="pubmat-small-lock mt-1 font-condensed text-xl font-black leading-tight">{val}</div>
            </div>
          ))}
        </section>

        {/* Price bar */}
        <section className="mt-3 flex items-center gap-4 rounded-xl border px-5 py-3" style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}10` }}>
          <Gift className="h-7 w-7 shrink-0" style={{ color: theme.accent }} />
          <div className="flex-1">
            <div className="font-condensed text-xs uppercase tracking-[0.24em]" style={{ color: theme.muted }}>Entry Fee</div>
            <div className="font-display text-3xl leading-none" style={{ color: theme.accent, textShadow: `0 0 10px ${theme.accent}` }}>
              {pubMat.preRegPrice} <span className="font-condensed text-lg" style={{ color: theme.muted }}>pre</span>
              {"  "}
              {pubMat.walkInPrice} <span className="font-condensed text-lg" style={{ color: theme.muted }}>door</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-condensed text-xs uppercase tracking-[0.24em]" style={{ color: theme.muted }}>Prep</div>
            <div className="font-condensed text-xl font-black uppercase" style={{ color: theme.accent2 }}>{pubMat.prepTime}</div>
          </div>
        </section>

        {/* Guests */}
        {visibleGuests.length > 0 && (
          <section className="mt-4">
            <div className="mb-2 text-center font-condensed text-xs uppercase tracking-[0.32em]" style={{ color: theme.muted }}>— {pubMat.guestHeadline} —</div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              {visibleGuests.slice(0, 6).map((g, i) => (
                <span key={`${g}-${i}`} className="font-display text-3xl leading-none" style={{ color: i % 2 === 0 ? theme.accent : theme.accent2, textShadow: `0 0 12px ${i % 2 === 0 ? theme.accent : theme.accent2}` }}>
                  {g}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Prize tiles */}
        <section className="mt-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="font-condensed text-sm font-black uppercase tracking-[0.28em]" style={{ color: theme.accent }}>{pubMat.prizeHeadline}</div>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((src, i) => <PrizeTile key={i} src={src} label={pubMat.guests[i] || `Prize ${i + 1}`} theme={theme} />)}
          </div>
        </section>

        {/* Notes */}
        {visibleNotes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {visibleNotes.slice(0, 4).map((n, i) => (
              <span key={`${n}-${i}`} className="rounded-full border px-3 py-1 font-condensed text-sm font-bold uppercase tracking-[0.1em]" style={{ borderColor: `${theme.accent2}40`, color: theme.muted }}>{n}</span>
            ))}
          </div>
        )}

        {/* Sponsors */}
        {visibleSponsors.length > 0 && (
          <footer className="mt-4 grid grid-cols-6 gap-2 border-t pt-4" style={{ borderColor: `${theme.accent}25` }}>
            {visibleSponsors.slice(0, 12).map((s, i) => (
              <div key={`${s.text}-${i}`} className="flex h-10 items-center justify-center rounded border px-2 text-center font-condensed text-xs font-black uppercase leading-tight" style={{ borderColor: `${theme.accent}30`, color: theme.muted }}>
                {s.image
                  ? <img src={s.image} alt={s.text || "Sponsor"} className="max-h-full max-w-full object-contain p-1" draggable={false} />
                  : s.text}
              </div>
            ))}
          </footer>
        )}
      </div>
    </div>
  );
}

// ─── layout: manga panel ──────────────────────────────────────────────────────
function MangaPanelPubMatPoster({ pubMat, theme }: { pubMat: PubMatState; theme: PubMatTheme }) {
  const gallery = [pubMat.images.gallery1, pubMat.images.gallery2, pubMat.images.gallery3, pubMat.images.gallery4];
  const visibleGuests = pubMat.guests.filter(Boolean);
  const visibleSponsors = pubMat.sponsors.filter((s) => s.text || s.image);
  const visibleNotes = pubMat.notes.filter(Boolean);
  const slashLine = `repeating-linear-gradient(-55deg, ${theme.accent}18 0 1px, transparent 1px 10px)`;

  return (
    <div className="relative min-h-[1080px] overflow-hidden" style={{ background: theme.paper, color: theme.ink }}>
      <div className="pubmat-manga-dots absolute inset-0 opacity-30" />

      {/* Top speed-lines header */}
      <header className="relative overflow-hidden border-b-4 px-5 pt-5 pb-4" style={{ borderColor: theme.ink, background: slashLine }}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div>
            <div className="font-condensed text-2xl font-black uppercase tracking-[0.08em]">{pubMat.shopName}</div>
            <div className="font-condensed text-sm uppercase tracking-[0.16em]" style={{ color: theme.muted }}>{pubMat.partners}</div>
          </div>
          <div className="border-4 px-4 py-1 font-display text-5xl leading-none" style={{ borderColor: theme.accent, color: theme.accent }}>
            ×
          </div>
          <div className="text-right">
            <div className="font-condensed text-2xl font-black uppercase tracking-[0.08em]">{pubMat.game}</div>
            <div className="font-condensed text-sm uppercase tracking-[0.16em]" style={{ color: theme.muted }}>{pubMat.eventType}</div>
          </div>
        </div>
      </header>

      {/* Giant title panel */}
      <section className="relative border-b-4 px-5 py-4" style={{ borderColor: theme.ink }}>
        <div className="absolute inset-0" style={{ background: slashLine }} />
        <div className="relative pubmat-title-lock font-display text-[84px] leading-[0.86]" style={{ color: theme.ink, WebkitTextStroke: `3px ${theme.ink}` }}>
          {pubMat.eventName}
        </div>
        <div className="relative mt-2 inline-flex items-center gap-2 border-4 px-4 py-1 font-display text-3xl leading-none" style={{ borderColor: theme.ink, background: theme.accent, color: "#fff", textShadow: `2px 2px 0 ${theme.ink}` }}>
          {pubMat.eventType}
        </div>
      </section>

      {/* Main content: 2-column manga split */}
      <section className="grid grid-cols-[1.1fr_0.9fr] border-b-4" style={{ borderColor: theme.ink }}>
        {/* Left: hero panel */}
        <div className="relative border-r-4 overflow-hidden" style={{ minHeight: 420, borderColor: theme.ink }}>
          {pubMat.images.hero
            ? <img src={pubMat.images.hero} alt="" className="h-full w-full object-cover" style={{ minHeight: 420 }} draggable={false} />
            : <PosterHeroImage src="" label="Main Visual" theme={theme} />}
          {/* Action lines overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: `repeating-linear-gradient(-38deg, ${theme.accent}10 0 1px, transparent 1px 8px)` }} />
        </div>

        {/* Right: stacked info panels */}
        <div className="flex flex-col">
          {/* Date panel */}
          <div className="border-b-4 px-4 py-3" style={{ borderColor: theme.ink }}>
            <div className="font-condensed text-xs font-black uppercase tracking-[0.26em]" style={{ color: theme.muted }}>Date</div>
            <div className="font-display text-4xl leading-none" style={{ color: theme.accent }}>{pubMat.date}</div>
          </div>
          {/* Time panel */}
          <div className="border-b-4 px-4 py-3" style={{ borderColor: theme.ink }}>
            <div className="font-condensed text-xs font-black uppercase tracking-[0.26em]" style={{ color: theme.muted }}>Schedule</div>
            <div className="font-condensed text-xl font-black uppercase">{pubMat.prepTime} <span style={{ color: theme.muted }}>→</span> {pubMat.startTime}</div>
          </div>
          {/* Price panel */}
          <div className="border-b-4 px-4 py-3" style={{ borderColor: theme.ink, background: theme.accent }}>
            <div className="font-condensed text-xs font-black uppercase tracking-[0.26em] text-white/70">Entry Fee</div>
            <div className="font-display text-4xl leading-none text-white" style={{ textShadow: `2px 2px 0 ${theme.ink}` }}>{pubMat.preRegPrice}</div>
            <div className="font-condensed text-sm font-black text-white/80">Pre-reg · {pubMat.walkInPrice} door</div>
          </div>
          {/* Venue panel */}
          <div className="border-b-4 px-4 py-3" style={{ borderColor: theme.ink }}>
            <div className="font-condensed text-xs font-black uppercase tracking-[0.26em]" style={{ color: theme.muted }}>Venue</div>
            <div className="pubmat-small-lock font-condensed text-xl font-black uppercase leading-tight">{pubMat.venue}</div>
          </div>
          {/* Guests panel */}
          {visibleGuests.length > 0 && (
            <div className="flex-1 px-4 py-3">
              <div className="font-condensed text-xs font-black uppercase tracking-[0.26em]" style={{ color: theme.muted }}>{pubMat.guestHeadline}</div>
              <div className="mt-1 space-y-1">
                {visibleGuests.slice(0, 3).map((g, i) => (
                  <div key={`${g}-${i}`} className="font-condensed text-xl font-black uppercase" style={{ color: i === 0 ? theme.accent : theme.ink }}>{g}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Prize row */}
      <section className="border-b-4 px-5 py-4" style={{ borderColor: theme.ink }}>
        <div className="mb-3 flex items-center gap-3">
          <div className="border-l-4 pl-3 font-condensed text-2xl font-black uppercase tracking-[0.1em]" style={{ borderColor: theme.accent, color: theme.ink }}>
            {pubMat.prizeHeadline}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {gallery.map((src, i) => (
            <div key={i} className="overflow-hidden border-4" style={{ borderColor: theme.ink }}>
              <div className="relative h-[130px]">
                {src
                  ? <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
                  : <div className="flex h-full items-center justify-center" style={{ background: i === 0 ? theme.accent : `${theme.accent}18` }}>
                      <Trophy className="h-10 w-10" style={{ color: i === 0 ? "#fff" : theme.accent }} />
                    </div>}
              </div>
              <div className="border-t-4 px-2 py-1 text-center font-condensed text-sm font-black uppercase leading-tight" style={{ borderColor: theme.ink, background: i === 0 ? theme.accent : theme.paper, color: i === 0 ? "#fff" : theme.ink }}>
                {pubMat.guests[i] || `${["Champion", "2nd", "3rd", "4th"][i]} Place`}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notes + sponsors */}
      <footer className="px-5 py-4">
        {visibleNotes.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {visibleNotes.slice(0, 4).map((n, i) => (
              <span key={`${n}-${i}`} className="border-2 px-3 py-1 font-condensed text-sm font-black uppercase" style={{ borderColor: theme.ink }}>{n}</span>
            ))}
          </div>
        )}
        {visibleSponsors.length > 0 && (
          <div className="grid grid-cols-6 gap-2 border-t-4" style={{ borderColor: theme.ink }}>
            {visibleSponsors.slice(0, 12).map((s, i) => (
              <div key={`${s.text}-${i}`} className="flex h-10 items-center justify-center border-r-4 px-2 text-center font-condensed text-xs font-black uppercase last:border-r-0" style={{ borderColor: theme.ink }}>
                {s.image
                  ? <img src={s.image} alt={s.text || "Sponsor"} className="max-h-full max-w-full object-contain p-1" draggable={false} />
                  : s.text}
              </div>
            ))}
          </div>
        )}
      </footer>
    </div>
  );
}

// ─── layout: gold league ──────────────────────────────────────────────────────
function GoldLeaguePubMatPoster({ pubMat, theme }: { pubMat: PubMatState; theme: PubMatTheme }) {
  const gallery = [pubMat.images.gallery1, pubMat.images.gallery2, pubMat.images.gallery3, pubMat.images.gallery4];
  const visibleGuests = pubMat.guests.filter(Boolean);
  const visibleSponsors = pubMat.sponsors.filter((s) => s.text || s.image);
  const visibleNotes = pubMat.notes.filter(Boolean);

  const GoldDivider = () => (
    <div className="flex items-center justify-center gap-3 py-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="h-1.5 w-1.5 rotate-45" style={{ background: i === 2 ? theme.accent : `${theme.accent}50` }} />
      ))}
    </div>
  );

  return (
    <div className="relative min-h-[1080px] overflow-hidden" style={{ background: theme.paper, color: theme.ink }}>
      <div className="pubmat-gold-shimmer absolute inset-0" />
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: `${theme.accent}18` }} />

      <div className="relative z-10 px-8 py-6">
        {/* Ornate header */}
        <header>
          <div className="border-2 border-b-0 px-6 py-3" style={{ borderColor: theme.accent }}>
            <div className="border-b px-4 py-2 text-center" style={{ borderColor: `${theme.accent}50` }}>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div>
                  <div className="pubmat-line-lock font-display text-3xl leading-none" style={{ color: theme.ink }}>{pubMat.shopName}</div>
                  <div className="font-condensed text-xs uppercase tracking-[0.2em]" style={{ color: theme.muted }}>{pubMat.partners}</div>
                </div>
                <Trophy className="h-12 w-12" style={{ color: theme.accent, filter: `drop-shadow(0 0 10px ${theme.accent})` }} />
                <div className="text-right">
                  <div className="pubmat-line-lock font-display text-3xl leading-none" style={{ color: theme.ink }}>{pubMat.game}</div>
                  <div className="font-condensed text-xs uppercase tracking-[0.2em]" style={{ color: theme.muted }}>{pubMat.eventType}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 border-t-0 px-4 py-1 text-center" style={{ borderColor: theme.accent, background: theme.accent }}>
            <div className="font-condensed text-sm font-black uppercase tracking-[0.3em]" style={{ color: theme.paper }}>
              Championship Series
            </div>
          </div>
        </header>

        <GoldDivider />

        {/* Title */}
        <section className="text-center">
          <div className="pubmat-title-lock font-display text-[80px] leading-[0.86]" style={{ color: theme.accent, textShadow: `0 0 28px ${theme.accent}60, 3px 3px 0 ${theme.muted}` }}>
            {pubMat.eventName}
          </div>
          <div className="mt-2 inline-block border-2 px-6 py-1 font-condensed text-xl font-black uppercase tracking-[0.22em]" style={{ borderColor: theme.accent, color: theme.ink }}>
            {pubMat.eventType}
          </div>
        </section>

        <GoldDivider />

        {/* Hero + info split */}
        <section className="grid grid-cols-[1fr_0.8fr] gap-5">
          <div className="relative h-[380px] overflow-hidden border-2" style={{ borderColor: theme.accent, boxShadow: `0 0 24px ${theme.accent}30` }}>
            {pubMat.images.hero
              ? <img src={pubMat.images.hero} alt="" className="h-full w-full object-cover" draggable={false} />
              : <PosterHeroImage src="" label="Main Visual" theme={theme} />}
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "Date", val: pubMat.date, large: true },
              { label: "Venue", val: pubMat.venue, large: false },
              { label: "Pre-reg", val: pubMat.preRegPrice, large: true },
              { label: "Walk-in", val: pubMat.walkInPrice, large: false },
              { label: "Start Time", val: pubMat.startTime, large: false },
            ].map(({ label, val, large }) => (
              <div key={label} className="border px-3 py-2" style={{ borderColor: `${theme.accent}50` }}>
                <div className="font-condensed text-[10px] uppercase tracking-[0.3em]" style={{ color: theme.muted }}>{label}</div>
                <div className={cn("pubmat-line-lock font-display leading-none", large ? "text-3xl" : "text-xl")} style={{ color: theme.accent }}>{val}</div>
              </div>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* Prize headline + tiles */}
        <section>
          <div className="mb-3 border-2 px-4 py-2 text-center" style={{ borderColor: theme.accent }}>
            <div className="font-condensed text-sm font-black uppercase tracking-[0.3em]" style={{ color: theme.muted }}>Prize Pool</div>
            <div className="pubmat-line-lock font-display text-4xl leading-none" style={{ color: theme.accent }}>{pubMat.prizeHeadline}</div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((src, i) => (
              <div key={i} className="border-2 overflow-hidden" style={{ borderColor: i === 0 ? theme.accent : `${theme.accent}40` }}>
                <div className="relative h-[130px]">
                  {src
                    ? <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
                    : <div className="flex h-full flex-col items-center justify-center gap-2" style={{ background: `${theme.accent}10` }}>
                        <div className="font-display text-4xl leading-none" style={{ color: theme.accent }}>{["1st", "2nd", "3rd", "4th"][i]}</div>
                      </div>}
                </div>
                <div className="px-2 py-1 text-center font-condensed text-xs font-black uppercase" style={{ background: i === 0 ? theme.accent : `${theme.accent}15`, color: i === 0 ? theme.paper : theme.accent }}>
                  {pubMat.guests[i] || ["Champion", "Runner Up", "3rd Place", "4th Place"][i]}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notes */}
        {visibleNotes.length > 0 && (
          <>
            <GoldDivider />
            <div className="flex flex-wrap justify-center gap-3">
              {visibleNotes.slice(0, 4).map((n, i) => (
                <span key={`${n}-${i}`} className="border px-4 py-1 font-condensed text-sm font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${theme.accent}50`, color: theme.muted }}>{n}</span>
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        {(visibleGuests.length > 0 || visibleSponsors.length > 0) && (
          <footer className="mt-4 border-t-2 pt-3" style={{ borderColor: `${theme.accent}50` }}>
            {visibleGuests.length > 0 && (
              <div className="mb-2 text-center font-condensed text-xs uppercase tracking-[0.24em]" style={{ color: theme.muted }}>
                {pubMat.guestHeadline}: {visibleGuests.slice(0, 4).join("  ·  ")}
              </div>
            )}
            {visibleSponsors.length > 0 && (
              <div className="grid grid-cols-6 gap-2">
                {visibleSponsors.slice(0, 12).map((s, i) => (
                  <div key={`${s.text}-${i}`} className="flex h-9 items-center justify-center border px-1 text-center font-condensed text-xs font-black uppercase" style={{ borderColor: `${theme.accent}30`, color: theme.muted }}>
                    {s.image
                      ? <img src={s.image} alt={s.text || "Sponsor"} className="max-h-full max-w-full object-contain p-1" draggable={false} />
                      : s.text}
                  </div>
                ))}
              </div>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

// ─── layout: street battle ────────────────────────────────────────────────────
function StreetBattlePubMatPoster({ pubMat, theme }: { pubMat: PubMatState; theme: PubMatTheme }) {
  const gallery = [pubMat.images.gallery1, pubMat.images.gallery2, pubMat.images.gallery3, pubMat.images.gallery4];
  const visibleSponsors = pubMat.sponsors.filter((s) => s.text || s.image);
  const visibleNotes = pubMat.notes.filter(Boolean);

  return (
    <div className="relative min-h-[1080px] overflow-hidden" style={{ background: theme.paper, color: theme.ink }}>
      <div className="pubmat-street-grid absolute inset-0 opacity-60" />
      <div className="absolute left-0 top-0 h-full w-1/2" style={{ background: `radial-gradient(ellipse at 20% 40%, ${theme.accent}22, transparent 60%)` }} />
      <div className="absolute right-0 top-0 h-full w-1/2" style={{ background: `radial-gradient(ellipse at 80% 40%, ${theme.accent2}18, transparent 60%)` }} />

      <div className="relative z-10">
        {/* Health-bar style top header */}
        <header className="flex items-center justify-between border-b-2 px-5 py-3" style={{ borderColor: `${theme.accent}60` }}>
          <div>
            <div className="font-condensed text-xs font-black uppercase tracking-[0.3em]" style={{ color: theme.muted }}>Hosted by</div>
            <div className="pubmat-line-lock font-display text-3xl leading-none" style={{ color: theme.ink }}>{pubMat.shopName}</div>
          </div>
          <div className="px-4 py-1 font-condensed text-xs font-black uppercase tracking-[0.4em]" style={{ background: theme.accent, color: theme.paper }}>
            PRESENTS
          </div>
          <div className="text-right">
            <div className="font-condensed text-xs font-black uppercase tracking-[0.3em]" style={{ color: theme.muted }}>Game</div>
            <div className="pubmat-line-lock font-display text-3xl leading-none" style={{ color: theme.ink }}>{pubMat.game}</div>
          </div>
        </header>

        {/* VS battle visual */}
        <section className="relative h-[360px] overflow-hidden">
          {/* Left fighter */}
          <div className="absolute inset-y-0 left-0 w-[48%] overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)" }}>
            {pubMat.images.hero
              ? <img src={pubMat.images.hero} alt="" className="h-full w-full object-cover" draggable={false} />
              : <div className="flex h-full items-center justify-center" style={{ background: `${theme.accent}15` }}><PosterHeroImage src="" label="Player" theme={theme} /></div>}
            <div className="absolute bottom-0 inset-x-0 px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.22em]" style={{ background: `${theme.accent}dd`, color: theme.paper }}>
              Player 1
            </div>
          </div>
          {/* Right fighter */}
          <div className="absolute inset-y-0 right-0 w-[48%] overflow-hidden" style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}>
            {pubMat.images.product
              ? <img src={pubMat.images.product} alt="" className="h-full w-full object-cover" draggable={false} />
              : <div className="flex h-full items-center justify-center" style={{ background: `${theme.accent2}15` }}><PosterHeroImage src="" label="Prize" theme={theme} /></div>}
            <div className="absolute bottom-0 inset-x-0 px-3 py-2 text-right font-condensed text-xs font-black uppercase tracking-[0.22em]" style={{ background: `${theme.accent2}dd`, color: "#000" }}>
              Player 2
            </div>
          </div>
          {/* VS badge center */}
          <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 font-display text-2xl leading-none" style={{ borderColor: theme.accent2, background: theme.paper, color: theme.accent2, boxShadow: `0 0 20px ${theme.accent2}88` }}>
            VS
          </div>
          {/* HP bars */}
          <div className="absolute bottom-8 left-3 right-3 flex gap-3 items-center">
            <div className="flex-1 h-3 rounded-full overflow-hidden border" style={{ borderColor: `${theme.accent}60` }}>
              <div className="h-full rounded-full" style={{ width: "75%", background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})` }} />
            </div>
            <div className="font-condensed text-xs font-black uppercase tracking-widest" style={{ color: theme.muted }}>★</div>
            <div className="flex-1 h-3 rounded-full overflow-hidden border" style={{ borderColor: `${theme.accent2}60` }}>
              <div className="h-full rounded-full" style={{ width: "60%", background: `linear-gradient(90deg, ${theme.accent2}, ${theme.accent})` }} />
            </div>
          </div>
        </section>

        {/* Giant title */}
        <section className="px-5 pb-3 pt-4 text-center">
          <div className="pubmat-title-lock font-display text-[80px] leading-[0.86]" style={{ color: theme.ink, textShadow: `4px 4px 0 ${theme.accent}, 8px 8px 0 ${theme.accent}60` }}>
            {pubMat.eventName}
          </div>
          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 font-condensed text-base font-black uppercase tracking-[0.3em]" style={{ background: theme.accent, color: theme.paper }}>
            {pubMat.eventType}
          </div>
        </section>

        {/* Info strip */}
        <section className="mx-5 grid grid-cols-4 overflow-hidden rounded-lg border-2" style={{ borderColor: `${theme.accent}50` }}>
          {[
            { label: "Entry Fee", val: pubMat.walkInPrice },
            { label: "Date", val: pubMat.date },
            { label: "Prep", val: pubMat.prepTime },
            { label: "Start", val: pubMat.startTime },
          ].map(({ label, val }, i) => (
            <div key={label} className="border-r-2 px-3 py-3 last:border-r-0" style={{ borderColor: `${theme.accent}40`, background: i === 0 ? `${theme.accent}15` : undefined }}>
              <div className="font-condensed text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.muted }}>{label}</div>
              <div className="pubmat-line-lock font-display text-2xl leading-none" style={{ color: i === 0 ? theme.accent : theme.ink }}>{val}</div>
            </div>
          ))}
        </section>

        {/* Venue */}
        <div className="mx-5 mt-3 flex items-center gap-3 rounded-lg border px-4 py-2" style={{ borderColor: `${theme.accent2}40`, background: `${theme.accent2}08` }}>
          <MapPin className="h-5 w-5 shrink-0" style={{ color: theme.accent2 }} />
          <div className="pubmat-line-lock font-condensed text-xl font-black uppercase tracking-[0.06em]">{pubMat.venue}</div>
        </div>

        {/* Prize tiles */}
        <section className="mx-5 mt-4">
          <div className="mb-2 font-condensed text-xs font-black uppercase tracking-[0.32em]" style={{ color: theme.accent }}>{pubMat.prizeHeadline}</div>
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((src, i) => <PrizeTile key={i} src={src} label={pubMat.guests[i] || `Prize ${i + 1}`} theme={theme} />)}
          </div>
        </section>

        {/* Notes + sponsors */}
        <footer className="mx-5 mt-4">
          {visibleNotes.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {visibleNotes.slice(0, 4).map((n, i) => (
                <span key={`${n}-${i}`} className="border px-3 py-1 font-condensed text-sm font-bold uppercase" style={{ borderColor: `${theme.accent}50`, color: theme.muted }}>{n}</span>
              ))}
            </div>
          )}
          {visibleSponsors.length > 0 && (
            <div className="grid grid-cols-6 gap-2 border-t pt-3" style={{ borderColor: `${theme.accent}30` }}>
              {visibleSponsors.slice(0, 12).map((s, i) => (
                <div key={`${s.text}-${i}`} className="flex h-9 items-center justify-center border px-1 text-center font-condensed text-xs font-black uppercase" style={{ borderColor: `${theme.accent}30`, color: theme.muted }}>
                  {s.image
                    ? <img src={s.image} alt={s.text || "Sponsor"} className="max-h-full max-w-full object-contain p-1" draggable={false} />
                    : s.text}
                </div>
              ))}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

// ─── layout: cosmic arena ─────────────────────────────────────────────────────
function CosmicArenaPubMatPoster({ pubMat, theme }: { pubMat: PubMatState; theme: PubMatTheme }) {
  const gallery = [pubMat.images.gallery1, pubMat.images.gallery2, pubMat.images.gallery3, pubMat.images.gallery4];
  const visibleGuests = pubMat.guests.filter(Boolean);
  const visibleSponsors = pubMat.sponsors.filter((s) => s.text || s.image);
  const visibleNotes = pubMat.notes.filter(Boolean);

  return (
    <div className="relative min-h-[1080px] overflow-hidden" style={{ background: theme.paper, color: theme.ink }}>
      <div className="pubmat-cosmic-stars absolute inset-0" />
      {/* Nebula glows */}
      <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: `${theme.accent}20` }} />
      <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full blur-3xl" style={{ background: `${theme.accent2}18` }} />
      {/* Orbital ring decoration */}
      <div className="absolute left-1/2 top-[260px] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-20" style={{ borderColor: theme.accent, borderWidth: 2 }} />
      <div className="absolute left-1/2 top-[260px] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-15" style={{ borderColor: theme.accent2, borderWidth: 1 }} />

      <div className="relative z-10 px-6 py-5">
        {/* Header */}
        <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div>
            <div className="pubmat-line-lock font-condensed text-2xl font-black uppercase tracking-[0.1em]" style={{ color: theme.ink }}>{pubMat.shopName}</div>
            <div className="font-condensed text-sm uppercase tracking-[0.2em]" style={{ color: theme.muted }}>{pubMat.partners}</div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl" style={{ background: theme.accent }} />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 font-display text-3xl leading-none" style={{ borderColor: theme.accent2, background: theme.block, color: theme.accent2 }}>
              ✦
            </div>
          </div>
          <div className="text-right">
            <div className="pubmat-line-lock font-condensed text-2xl font-black uppercase tracking-[0.1em]" style={{ color: theme.ink }}>{pubMat.game}</div>
            <div className="font-condensed text-sm uppercase tracking-[0.2em]" style={{ color: theme.muted }}>{pubMat.eventType}</div>
          </div>
        </header>

        {/* Title + hero centered */}
        <section className="mt-6 text-center">
          <div className="pubmat-title-lock font-display text-[84px] leading-[0.84]" style={{ color: theme.ink, textShadow: `0 0 40px ${theme.accent}70, 0 0 80px ${theme.accent}40` }}>
            {pubMat.eventName}
          </div>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border px-5 py-1 font-condensed text-base font-black uppercase tracking-[0.22em]" style={{ borderColor: `${theme.accent2}60`, color: theme.accent2 }}>
            {pubMat.eventType}
          </div>
        </section>

        {/* Hero image in "viewport" */}
        <section className="relative mx-auto mt-5 h-[300px] w-[460px] overflow-hidden rounded-full border-4" style={{ borderColor: theme.accent, boxShadow: `0 0 40px ${theme.accent}50, inset 0 0 40px rgba(0,0,0,0.5)` }}>
          {pubMat.images.hero
            ? <img src={pubMat.images.hero} alt="" className="h-full w-full object-cover" draggable={false} />
            : <PosterHeroImage src="" label="Main Visual" theme={theme} />}
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 60px ${theme.paper}80` }} />
        </section>

        {/* 3-column info */}
        <section className="mt-5 grid grid-cols-3 gap-3">
          {[
            { icon: <CalendarDays className="h-8 w-8" />, label: "Date", val: pubMat.date, val2: pubMat.prepTime },
            { icon: <MapPin className="h-8 w-8" />, label: "Venue", val: pubMat.venue, val2: "" },
            { icon: <Zap className="h-8 w-8" />, label: "Entry Fee", val: pubMat.preRegPrice, val2: `${pubMat.walkInPrice} door` },
          ].map(({ icon, label, val, val2 }) => (
            <div key={label} className="rounded-xl border p-4 text-center" style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08`, boxShadow: `0 0 14px ${theme.accent}14` }}>
              <div className="flex justify-center" style={{ color: theme.accent2 }}>{icon}</div>
              <div className="mt-1 font-condensed text-xs uppercase tracking-[0.26em]" style={{ color: theme.muted }}>{label}</div>
              <div className="pubmat-small-lock mt-1 font-condensed text-xl font-black leading-tight" style={{ color: theme.ink }}>{val}</div>
              {val2 && <div className="pubmat-line-lock font-condensed text-sm" style={{ color: theme.muted }}>{val2}</div>}
            </div>
          ))}
        </section>

        {/* Guests */}
        {visibleGuests.length > 0 && (
          <section className="mt-4 text-center">
            <div className="mb-2 font-condensed text-xs uppercase tracking-[0.3em]" style={{ color: theme.muted }}>{pubMat.guestHeadline}</div>
            <div className="flex flex-wrap justify-center gap-4">
              {visibleGuests.slice(0, 4).map((g, i) => (
                <span key={`${g}-${i}`} className="font-display text-3xl leading-none" style={{ color: i % 2 === 0 ? theme.accent : theme.accent2, textShadow: `0 0 14px ${i % 2 === 0 ? theme.accent : theme.accent2}` }}>{g}</span>
              ))}
            </div>
          </section>
        )}

        {/* Prize row */}
        <section className="mt-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent})` }} />
            <div className="font-condensed text-sm font-black uppercase tracking-[0.28em]" style={{ color: theme.accent }}>{pubMat.prizeHeadline}</div>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((src, i) => <PrizeTile key={i} src={src} label={pubMat.guests[i] || `Prize ${i + 1}`} theme={theme} />)}
          </div>
        </section>

        {/* Notes + sponsors */}
        {visibleNotes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {visibleNotes.slice(0, 4).map((n, i) => (
              <span key={`${n}-${i}`} className="rounded-full border px-3 py-1 font-condensed text-xs font-bold uppercase" style={{ borderColor: `${theme.accent}40`, color: theme.muted }}>{n}</span>
            ))}
          </div>
        )}
        {visibleSponsors.length > 0 && (
          <footer className="mt-4 grid grid-cols-6 gap-2 border-t pt-3" style={{ borderColor: `${theme.accent}30` }}>
            {visibleSponsors.slice(0, 12).map((s, i) => (
              <div key={`${s.text}-${i}`} className="flex h-9 items-center justify-center rounded border px-1 text-center font-condensed text-xs font-black uppercase" style={{ borderColor: `${theme.accent}30`, color: theme.muted }}>
                {s.image
                  ? <img src={s.image} alt={s.text || "Sponsor"} className="max-h-full max-w-full object-contain p-1" draggable={false} />
                  : s.text}
              </div>
            ))}
          </footer>
        )}
      </div>
    </div>
  );
}

// ─── layout: volcanic ─────────────────────────────────────────────────────────
function VolcanicPubMatPoster({ pubMat, theme }: { pubMat: PubMatState; theme: PubMatTheme }) {
  const gallery = [pubMat.images.gallery1, pubMat.images.gallery2, pubMat.images.gallery3, pubMat.images.gallery4];
  const visibleSponsors = pubMat.sponsors.filter((s) => s.text || s.image);
  const visibleNotes = pubMat.notes.filter(Boolean);
  const hazardStripe = `repeating-linear-gradient(-55deg, ${theme.accent}55 0 10px, transparent 10px 22px)`;

  return (
    <div className="relative min-h-[1080px] overflow-hidden" style={{ background: theme.paper, color: theme.ink }}>
      <div className="pubmat-volcanic-lava absolute inset-0" />
      <div className="absolute left-1/2 bottom-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: `${theme.accent}22` }} />

      <div className="relative z-10">
        {/* Hazard stripe header */}
        <header className="border-b-4 px-5 py-4" style={{ borderColor: theme.accent, background: hazardStripe }}>
          <div className="flex items-center justify-between rounded-md border-2 bg-black/80 px-4 py-3" style={{ borderColor: `${theme.accent}60` }}>
            <div>
              <div className="pubmat-line-lock font-display text-3xl leading-none" style={{ color: theme.accent }}>{pubMat.shopName}</div>
              <div className="font-condensed text-sm uppercase tracking-[0.18em]" style={{ color: theme.muted }}>{pubMat.partners}</div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-8 w-8" style={{ color: theme.accent2 }} />
              <span className="font-condensed text-sm font-black uppercase tracking-[0.3em]" style={{ color: theme.muted }}>EXTREME</span>
              <Zap className="h-8 w-8" style={{ color: theme.accent2 }} />
            </div>
            <div className="text-right">
              <div className="pubmat-line-lock font-display text-3xl leading-none" style={{ color: theme.accent2 }}>{pubMat.game}</div>
              <div className="font-condensed text-sm uppercase tracking-[0.18em]" style={{ color: theme.muted }}>{pubMat.eventType}</div>
            </div>
          </div>
        </header>

        {/* Massive title */}
        <section className="px-5 py-5">
          <div className="pubmat-title-lock font-display text-[90px] leading-[0.82]" style={{ color: theme.ink, textShadow: `0 0 24px ${theme.accent}88, 4px 4px 0 ${theme.accent}` }}>
            {pubMat.eventName}
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="h-1 w-16 rounded-full" style={{ background: theme.accent }} />
            <div className="font-condensed text-2xl font-black uppercase tracking-[0.2em]" style={{ color: theme.accent }}>{pubMat.eventType}</div>
            <div className="h-1 flex-1 rounded-full" style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />
          </div>
        </section>

        {/* Hero image + info side-by-side */}
        <section className="grid grid-cols-[1.2fr_0.8fr] gap-4 px-5 pb-4">
          <div className="relative h-[380px] overflow-hidden rounded-lg border-4" style={{ borderColor: theme.accent, boxShadow: `0 0 36px ${theme.accent}60, inset 0 0 20px rgba(0,0,0,0.6)` }}>
            {pubMat.images.hero
              ? <img src={pubMat.images.hero} alt="" className="h-full w-full object-cover" draggable={false} />
              : <PosterHeroImage src="" label="Main Visual" theme={theme} />}
            <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, ${theme.accent}30, transparent 40%)` }} />
          </div>
          <div className="flex flex-col gap-3">
            {/* Price badge */}
            <div className="rounded-lg border-2 p-4 text-center" style={{ borderColor: theme.accent, background: `${theme.accent}15`, boxShadow: `0 0 18px ${theme.accent}30` }}>
              <div className="font-condensed text-xs uppercase tracking-[0.28em]" style={{ color: theme.muted }}>Entry Fee</div>
              <div className="font-display text-5xl leading-none" style={{ color: theme.accent, textShadow: `0 0 16px ${theme.accent}` }}>{pubMat.preRegPrice}</div>
              <div className="font-condensed text-base font-black" style={{ color: theme.muted }}>Pre-reg</div>
              <div className="mt-1 border-t pt-1 font-display text-3xl leading-none" style={{ borderColor: `${theme.accent}40`, color: theme.accent2 }}>{pubMat.walkInPrice}</div>
              <div className="font-condensed text-sm font-black" style={{ color: theme.muted }}>Walk-in</div>
            </div>
            {/* Date */}
            <div className="rounded-lg border px-3 py-3" style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08` }}>
              <CalendarDays className="h-5 w-5" style={{ color: theme.accent2 }} />
              <div className="mt-1 font-condensed text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>Date</div>
              <div className="pubmat-line-lock font-display text-2xl leading-none" style={{ color: theme.ink }}>{pubMat.date}</div>
            </div>
            {/* Time */}
            <div className="rounded-lg border px-3 py-3" style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08` }}>
              <Clock className="h-5 w-5" style={{ color: theme.accent }} />
              <div className="mt-1 font-condensed text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>Time</div>
              <div className="font-condensed text-base font-black uppercase">{pubMat.prepTime}</div>
              <div className="font-display text-2xl leading-none" style={{ color: theme.accent2 }}>{pubMat.startTime}</div>
            </div>
            {/* Venue */}
            <div className="rounded-lg border px-3 py-3" style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08` }}>
              <MapPin className="h-5 w-5" style={{ color: theme.accent2 }} />
              <div className="mt-1 font-condensed text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>Venue</div>
              <div className="pubmat-small-lock font-condensed text-base font-black uppercase leading-tight">{pubMat.venue}</div>
            </div>
          </div>
        </section>

        {/* Lava-stripe divider */}
        <div className="mx-5 mb-4" style={{ height: 8, background: hazardStripe, borderRadius: 4 }} />

        {/* Prize tiles */}
        <section className="px-5">
          <div className="mb-2 flex items-center gap-3">
            <Sparkles className="h-5 w-5" style={{ color: theme.accent }} />
            <div className="font-condensed text-sm font-black uppercase tracking-[0.28em]" style={{ color: theme.accent }}>{pubMat.prizeHeadline}</div>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((src, i) => <PrizeTile key={i} src={src} label={pubMat.guests[i] || `Prize ${i + 1}`} theme={theme} />)}
          </div>
        </section>

        {/* Notes + sponsors */}
        <footer className="mt-4 px-5 pb-5">
          {visibleNotes.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {visibleNotes.slice(0, 4).map((n, i) => (
                <span key={`${n}-${i}`} className="rounded border px-3 py-1 font-condensed text-sm font-bold uppercase" style={{ borderColor: `${theme.accent}50`, color: theme.muted }}>{n}</span>
              ))}
            </div>
          )}
          <div className="mb-3 border px-4 py-2 text-center font-condensed text-xl font-black uppercase tracking-[0.12em]" style={{ borderColor: `${theme.accent}50`, color: theme.accent }}>
            {pubMat.prizeHeadline} · {pubMat.guestHeadline}
          </div>
          {visibleSponsors.length > 0 && (
            <div className="grid grid-cols-6 gap-2 border-t pt-3" style={{ borderColor: `${theme.accent}30` }}>
              {visibleSponsors.slice(0, 12).map((s, i) => (
                <div key={`${s.text}-${i}`} className="flex h-9 items-center justify-center rounded border px-1 text-center font-condensed text-xs font-black uppercase" style={{ borderColor: `${theme.accent}30`, color: theme.muted }}>
                  {s.image
                    ? <img src={s.image} alt={s.text || "Sponsor"} className="max-h-full max-w-full object-contain p-1" draggable={false} />
                    : s.text}
                </div>
              ))}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

function CyberBrand({
  title,
  subtitle,
  theme,
  align = "left",
}: {
  title: string;
  subtitle: string;
  theme: PubMatTheme;
  align?: "left" | "right";
}) {
  return (
    <div className={cn("min-w-0", align === "right" && "text-right")}>
      <div className="pubmat-line-lock font-display text-4xl leading-none tracking-[0.08em]">
        {title}
      </div>
      <div
        className="pubmat-line-lock mt-1 font-condensed text-base font-black uppercase tracking-[0.18em]"
        style={{ color: theme.accent2 }}
      >
        {subtitle}
      </div>
    </div>
  );
}

function CyberPanel({
  children,
  className,
  theme,
}: {
  children: React.ReactNode;
  className?: string;
  theme: PubMatTheme;
}) {
  return (
    <div
      className={cn("relative overflow-hidden border bg-black/55 backdrop-blur", className)}
      style={{
        borderColor: `${theme.accent}88`,
        boxShadow: `0 0 22px ${theme.accent}24, inset 0 0 24px rgba(255,255,255,.04)`,
        clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent2}, transparent)` }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function PriceRow({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: PubMatTheme;
}) {
  return (
    <div className="mt-3">
      <div
        className="pubmat-line-lock font-display text-[46px] leading-none"
        style={{ color: theme.ink, textShadow: `3px 3px 0 ${theme.accent}` }}
      >
        {value}
      </div>
      <div
        className="pubmat-chip-text inline-flex max-w-full px-3 py-0.5 font-condensed text-sm font-black uppercase tracking-[0.08em]"
        style={{ background: theme.accent2, color: "#031017" }}
      >
        {label}
      </div>
    </div>
  );
}

function InfoLine({
  icon,
  label,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  theme: PubMatTheme;
}) {
  return (
    <div className="grid grid-cols-[28px_1fr] items-center gap-3">
      <div style={{ color: theme.accent }}>{icon}</div>
      <div className="pubmat-small-lock font-condensed text-xl font-black uppercase leading-tight tracking-[0.06em]">
        {label}
      </div>
    </div>
  );
}

function PosterHeroImage({
  src,
  label,
  theme,
}: {
  src: string;
  label: string;
  theme: PubMatTheme;
}) {
  return (
    <div className="relative h-full">
      {src ? (
        <img
          src={src}
          alt=""
          className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_34px_rgba(255,255,255,0.28)]"
          draggable={false}
        />
      ) : (
        <div className="relative z-10 flex h-full items-center justify-center">
          <div
            className="relative h-72 w-72 rounded-full border-[18px]"
            style={{
              borderColor: theme.accent,
              boxShadow: `0 0 48px ${theme.accent}, inset 0 0 48px ${theme.accent2}44`,
              background: `radial-gradient(circle, ${theme.accent2} 0 11%, #111827 12% 31%, ${theme.accent} 32% 38%, #dce7f2 39% 48%, #111827 49% 100%)`,
            }}
          >
            <div className="absolute inset-8 rounded-full border-[12px] border-black/50" />
            <div className="absolute inset-20 rounded-full bg-black/80" />
          </div>
          <div className="absolute bottom-8 font-condensed text-xl font-black uppercase tracking-[0.18em] text-white/55">
            {label}
          </div>
        </div>
      )}
    </div>
  );
}

function PrizeTile({
  src,
  label,
  theme,
}: {
  src: string;
  label: string;
  theme: PubMatTheme;
}) {
  return (
    <CyberPanel className="h-[154px] p-2" theme={theme}>
      <div className="relative h-[104px] overflow-hidden bg-white/5">
        {src ? (
          <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Target className="h-12 w-12" style={{ color: theme.accent2 }} />
          </div>
        )}
      </div>
      <div className="pubmat-line-lock mt-2 text-center font-condensed text-base font-black uppercase tracking-[0.06em]">
        {label}
      </div>
    </CyberPanel>
  );
}

function StatTile({
  note,
  index,
  theme,
}: {
  note: string;
  index: number;
  theme: PubMatTheme;
}) {
  const icons = [
    <Zap key="zap" className="h-9 w-9" />,
    <Users key="users" className="h-9 w-9" />,
    <Target key="target" className="h-9 w-9" />,
  ];
  return (
    <CyberPanel className="flex h-[86px] items-center gap-3 p-3" theme={theme}>
      <div style={{ color: index % 2 ? theme.accent2 : theme.accent }}>
        {icons[index % icons.length]}
      </div>
      <div className="pubmat-small-lock font-condensed text-lg font-black uppercase leading-tight tracking-[0.06em]">
        {note}
      </div>
    </CyberPanel>
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
        className="pubmat-line-lock font-display text-4xl leading-none tracking-[0.04em]"
        style={{ color: theme.accent2 }}
      >
        {label}
      </div>
      <div
        className="pubmat-line-lock font-condensed text-lg font-black uppercase tracking-[0.1em]"
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
        className="pubmat-line-lock font-display text-[54px] leading-none"
        style={{
          color: theme.accent,
          WebkitTextStroke: `2px ${theme.accent2}`,
          textShadow: `3px 3px 0 ${theme.ink}`,
        }}
      >
        {value}
      </div>
      <div className="pubmat-line-lock font-condensed text-base font-black uppercase tracking-[0.06em]">
        {label}
      </div>
    </div>
  );
}

function TimeBlock({ value, theme }: { value: string; theme: PubMatTheme }) {
  return (
    <div
      className="pubmat-line-lock border-4 px-3 py-2 text-center font-display text-3xl leading-none tracking-[0.04em]"
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
          className="pubmat-cell-lock flex h-full items-center justify-center p-6 text-center font-condensed text-xl font-black uppercase tracking-[0.08em]"
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
      className="pubmat-title-lock px-5 py-3 text-center font-display text-4xl leading-none tracking-[0.06em] text-white"
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

  if (layout === "terminal")
    return (
      <>
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg,rgba(0,0,0,0.18) 0px,rgba(0,0,0,0.18) 1px,transparent 1px,transparent 4px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 0%,${d.a}14 0%,transparent 65%)` }}
        />
        <div
          className="absolute left-0 right-0 top-0 flex items-center gap-1 px-2 py-1.5"
          style={{ background: `${d.a}10`, borderBottom: `1px solid ${d.a}20` }}
        >
          {["#ff5f56","#ffbd2e",d.a].map((c,i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: c, opacity: i===2?1:0.7 }} />
          ))}
        </div>
        <div className="absolute left-3 top-10 space-y-1.5">
          {["$","$","$"].map((sym, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="font-mono text-[7px] leading-none" style={{ color: d.a, opacity: 0.7 }}>{sym}</span>
              <div className="h-0.5 rounded" style={{ width: `${[55,42,38][i]}%`, background: `${d.a}${i===0?"60":"30"}` }} />
            </div>
          ))}
        </div>
      </>
    );

  if (layout === "ticket")
    return (
      <>
        <div
          className="absolute left-0 top-0 bottom-0 w-7"
          style={{ background: `${d.a}14`, borderRight: `2px dashed ${d.a}35` }}
        />
        <div
          className="absolute left-[28px] right-0 top-0 h-[3px]"
          style={{ background: d.a }}
        />
        <div
          className="absolute bottom-5 left-[26px] right-2 h-[1px]"
          style={{ background: `${d.a}28` }}
        />
        <div className="absolute left-9 top-3 right-3 space-y-1.5">
          {[0.8, 0.55, 0.55].map((w, i) => (
            <div key={i} className="h-0.5 rounded" style={{ background: `${d.a}${i===0?"60":"28"}`, width: `${w*100}%` }} />
          ))}
        </div>
        <div
          className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[6px] font-bold leading-none"
          style={{ color: d.a, opacity: 0.5, writingMode: "vertical-rl" }}
        >
          #{String(Math.floor(Math.random()*999)+1).padStart(3,"0")}
        </div>
      </>
    );

  if (layout === "split")
    return (
      <>
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{
            width: "55%",
            background: `${d.a}12`,
            clipPath: "polygon(28% 0,100% 0,100% 100%,0 100%)",
          }}
        />
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: "40%",
            width: 3,
            background: `linear-gradient(to bottom,transparent,${d.a},transparent)`,
            transform: "skewX(-18deg)",
          }}
        />
        <div className="absolute left-3 top-4 right-4 space-y-2">
          <div className="h-1 w-3/4 rounded" style={{ background: d.a }} />
          {[0.8, 0.6, 0.6].map((w, i) => (
            <div key={i} className="h-0.5" style={{ background: `${d.b}`, width: `${w*100}%` }} />
          ))}
        </div>
      </>
    );

  if (layout === "circuit")
    return (
      <>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${d.a}18 1px,transparent 1px)`,
            backgroundSize: "10px 10px",
          }}
        />
        <div className="absolute left-4 top-4 right-4 space-y-3">
          {[0,1,2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full border"
                style={{ borderColor: d.a, background: i===0?d.a:"transparent" }}
              />
              <div className="h-px flex-1" style={{ background: `${d.a}35` }} />
              <div
                className="h-1.5 w-1.5 shrink-0 rotate-45"
                style={{ background: d.b }}
              />
            </div>
          ))}
        </div>
        {[["top-2 left-2","top-2 right-2"],["bottom-2 left-2","bottom-2 right-2"]].flat().map((pos) => (
          <div key={pos} className={`absolute ${pos} h-3 w-3`} style={{
            borderTop: pos.includes("top") ? `2px solid ${d.a}50` : "none",
            borderBottom: pos.includes("bottom") ? `2px solid ${d.a}50` : "none",
            borderLeft: pos.includes("left") ? `2px solid ${d.a}50` : "none",
            borderRight: pos.includes("right") ? `2px solid ${d.a}50` : "none",
          }} />
        ))}
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
    case "terminal":
      return <TerminalCard {...props} />;
    case "ticket":
      return <TicketCard {...props} />;
    case "split":
      return <SplitCard {...props} />;
    case "circuit":
      return <CircuitCard {...props} />;
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

// ─── layout: terminal ─────────────────────────────────────────────────────────
function TerminalCard({ form, rounds, topCut, cardType, palette }: CardProps) {
  const wins = rounds.filter((r) => r.result === "win").length;
  const losses = rounds.length - wins;
  const titleColor = form.champTitle.toUpperCase() === "ELIMINATED" ? "#ff3b3b" : palette.a;

  const renderRow = (label: string, opp: string, score: string, result: "win" | "loss") => {
    const win = result === "win";
    const c = win ? palette.a : "#ff3b3b";
    return (
      <div className="flex items-center gap-3 font-mono text-sm">
        <span className="w-24 shrink-0 text-xs" style={{ color: palette.a, opacity: 0.45 }}>{label}</span>
        <span
          className="rounded px-2 py-0.5 text-xs font-bold w-[56px] text-center shrink-0"
          style={{ background: `${c}15`, color: c, border: `1px solid ${c}30` }}
        >
          [{win ? "WIN" : "LOSS"}]
        </span>
        <span className="flex-1 truncate font-mono text-sm" style={{ color: palette.text, opacity: 0.65 }}>{opp || "—"}</span>
        <span className="font-bold shrink-0" style={{ color: c }}>{score || "—"}</span>
      </div>
    );
  };

  return (
    <>
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "repeating-linear-gradient(0deg,rgba(0,0,0,0.16) 0px,rgba(0,0,0,0.16) 1px,transparent 1px,transparent 4px)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%,${palette.a}12 0%,transparent 58%)` }}
      />

      {/* Title bar */}
      <div
        className="flex items-center gap-2 border-b px-5 py-3"
        style={{ borderColor: `${palette.a}22`, background: `${palette.a}07` }}
      >
        {["#ff5f56","#ffbd2e", palette.a].map((c, i) => (
          <span key={i} className="h-3 w-3 rounded-full" style={{ background: c, opacity: i === 2 ? 1 : 0.7 }} />
        ))}
        <span className="ml-3 font-mono text-xs truncate" style={{ color: palette.a, opacity: 0.55 }}>
          tournament_report.sh — {form.organizer}
        </span>
        <span className="ml-auto font-mono text-xs shrink-0" style={{ color: palette.a, opacity: 0.35 }}>#{form.cardNum}</span>
      </div>

      <div className="relative space-y-5 p-8">
        {/* system info */}
        <div className="font-mono text-xs space-y-0.5" style={{ color: `${palette.a}60` }}>
          <div>$ ./report --card {form.cardNum} --game "{form.game}"</div>
          <div style={{ color: `${palette.a}35` }}>// {form.tournament} · {form.date}</div>
        </div>

        {/* player */}
        <div>
          <div className="mb-1 font-mono text-xs" style={{ color: palette.a, opacity: 0.5 }}>$ echo $PLAYER_NAME</div>
          <div
            className="break-words font-mono text-[72px] font-bold leading-none"
            style={{ color: palette.text, textShadow: `0 0 22px ${palette.a}40` }}
          >
            {form.player || "PLAYER"}
          </div>
        </div>

        {/* separator */}
        <div className="font-mono text-xs" style={{ color: palette.a, opacity: 0.25 }}>
          {"─".repeat(48)}
        </div>

        {/* rounds */}
        <div className="space-y-2.5">
          <div className="mb-2 font-mono text-xs" style={{ color: palette.a, opacity: 0.5 }}>
            $ {cardType === "swiss" ? "list_rounds" : "list_top_cut"} --verbose
          </div>
          {cardType === "swiss" ? (
            <>
              {rounds.map((r, i) => renderRow(r.rnd || `R${i + 1}`, r.opp, r.score, r.result))}
              <div className="mt-4 font-mono text-xs space-y-0.5" style={{ color: `${palette.a}55` }}>
                <div>$ stat: wins={wins} losses={losses} played={rounds.length}</div>
                {form.advMsg && <div style={{ color: palette.a }}>$ echo "{form.advMsg}"</div>}
              </div>
            </>
          ) : (
            <>
              {topCut.map((m, i) => renderRow(m.stage, m.opp, m.score, m.result))}
              {form.finalsOpp && renderRow("Finals", form.finalsOpp, form.finalsSc, form.finalsResult)}
              {form.champTitle && (
                <div
                  className="mt-4 rounded border p-4"
                  style={{ borderColor: `${titleColor}40`, background: `${titleColor}08` }}
                >
                  <div className="mb-1 font-mono text-xs" style={{ color: titleColor, opacity: 0.55 }}>$ echo $RESULT</div>
                  <div className="font-display text-6xl leading-none" style={{ color: titleColor, textShadow: `0 0 18px ${titleColor}66` }}>
                    {form.champTitle}
                  </div>
                  {form.tcRecord && (
                    <div className="mt-1 font-mono text-xs" style={{ color: titleColor, opacity: 0.6 }}>
                      top_cut_record={form.tcRecord}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* separator + footer */}
        <div className="font-mono text-xs" style={{ color: palette.a, opacity: 0.25 }}>{"─".repeat(48)}</div>
        <div className="flex justify-between font-mono text-xs" style={{ color: palette.a, opacity: 0.3 }}>
          <span>$ exit 0</span>
          <span>{form.organizer} · {form.date}</span>
        </div>
      </div>
    </>
  );
}

// ─── layout: ticket ───────────────────────────────────────────────────────────
function TicketCard({ form, rounds, topCut, cardType, palette }: CardProps) {
  const wins = rounds.filter((r) => r.result === "win").length;
  const losses = rounds.length - wins;
  const titleColor = form.champTitle.toUpperCase() === "ELIMINATED" ? "#ff3b3b" : palette.a;

  const perforation = (
    <div className="relative my-4 flex items-center gap-0">
      <div className="h-3 w-3 rounded-full" style={{ background: palette.bg, border: `2px solid ${palette.a}25`, marginLeft: -8 }} />
      <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: `${palette.a}30` }} />
      <div className="h-3 w-3 rounded-full" style={{ background: palette.bg, border: `2px solid ${palette.a}25`, marginRight: -8 }} />
    </div>
  );

  return (
    <div className="relative flex min-h-full">
      {/* Stub column */}
      <div
        className="relative flex w-16 shrink-0 flex-col items-center justify-between border-r-2 border-dashed py-8"
        style={{ borderColor: `${palette.a}35`, background: `${palette.a}07` }}
      >
        {/* hole punch top */}
        <div className="absolute -right-2.5 top-6 h-4 w-4 rounded-full" style={{ background: palette.bg, border: `2px solid ${palette.a}30` }} />
        {/* hole punch bottom */}
        <div className="absolute -right-2.5 bottom-6 h-4 w-4 rounded-full" style={{ background: palette.bg, border: `2px solid ${palette.a}30` }} />

        <div
          className="font-display text-3xl leading-none tracking-[0.04em]"
          style={{ color: palette.a, writingMode: "vertical-rl", transform: "rotate(180deg)", textShadow: `0 0 12px ${palette.a}55` }}
        >
          {form.cardNum}
        </div>
        <div
          className="font-condensed text-[8px] uppercase tracking-[0.3em] text-center"
          style={{ color: palette.a, opacity: 0.5, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Admit One
        </div>
        <div
          className="font-condensed text-[8px] uppercase tracking-[0.3em] text-center"
          style={{ color: palette.text, opacity: 0.3, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {cardType === "swiss" ? "Swiss" : "Top Cut"}
        </div>
      </div>

      {/* Main body */}
      <div className="flex-1 min-w-0">
        {/* Top accent bar */}
        <div className="h-[5px] w-full" style={{ background: `linear-gradient(90deg,${palette.a},${palette.b},transparent)` }} />

        <div className="p-6 pb-4">
          {/* event header */}
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <div className="font-condensed text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.a }}>
                {form.organizer} · {form.game}
              </div>
              <div className="mt-0.5 font-condensed text-xs uppercase tracking-[0.18em]" style={{ color: palette.text, opacity: 0.38 }}>
                {form.tournament} — {form.date}
              </div>
            </div>
            <div
              className="shrink-0 rounded border px-2 py-1 text-center"
              style={{ borderColor: `${palette.a}40`, background: `${palette.a}0c` }}
            >
              <div className="font-condensed text-[8px] uppercase tracking-widest" style={{ color: palette.a, opacity: 0.6 }}>No.</div>
              <div className="font-display text-2xl leading-none" style={{ color: palette.a }}>{form.cardNum}</div>
            </div>
          </div>

          {/* player name */}
          <h2
            className="break-words font-display text-[76px] leading-none tracking-[0.02em]"
            style={{ color: palette.text, textShadow: `2px 2px 0 ${palette.a}30` }}
          >
            {form.player || "PLAYER"}
          </h2>

          {perforation}

          {/* rounds section */}
          <div className="font-condensed text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: palette.a }}>
            {cardType === "swiss" ? "Swiss Round Results" : "Top Cut Results"}
          </div>

          <div className="space-y-2">
            {cardType === "swiss" ? (
              <>
                {rounds.map((r, i) => {
                  const win = r.result === "win";
                  const c = win ? palette.a : "#ff3b3b";
                  return (
                    <div key={i} className="flex items-center gap-3 rounded border px-3 py-2" style={{ borderColor: `${palette.a}18`, background: `${palette.a}05` }}>
                      <span className="font-mono text-xs w-8 shrink-0" style={{ color: palette.text, opacity: 0.35 }}>{r.rnd || `R${i + 1}`}</span>
                      <span className="flex-1 truncate font-condensed text-xl font-bold" style={{ color: palette.text }}>{r.opp || "—"}</span>
                      <span className="font-mono text-sm font-bold" style={{ color: c }}>{r.score || "—"}</span>
                      <span className="rounded px-2 py-0.5 font-condensed text-xs font-bold uppercase" style={{ background: `${c}18`, color: c }}>{win ? "W" : "L"}</span>
                    </div>
                  );
                })}
                {perforation}
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    {[["W", wins, palette.a], ["L", losses, "#ff3b3b"], ["P", rounds.length, palette.text]].map(([l, v, c]) => (
                      <div key={String(l)} className="text-center">
                        <div className="font-display text-4xl leading-none" style={{ color: String(c) }}>{v}</div>
                        <div className="font-condensed text-[8px] uppercase tracking-widest" style={{ color: String(c), opacity: 0.55 }}>{String(l)}</div>
                      </div>
                    ))}
                  </div>
                  {form.advMsg && (
                    <div className="rounded border px-3 py-2 text-right" style={{ borderColor: `${palette.a}30`, color: palette.a }}>
                      <div className="font-condensed text-sm font-bold uppercase tracking-[0.1em]">{form.advMsg}</div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {topCut.map((m, i) => {
                  const win = m.result === "win";
                  const c = win ? palette.a : "#ff3b3b";
                  return (
                    <div key={i} className="flex items-center gap-3 rounded border px-3 py-2" style={{ borderColor: `${palette.a}18`, background: `${palette.a}05` }}>
                      <span className="font-condensed text-xs w-24 shrink-0 uppercase" style={{ color: palette.text, opacity: 0.35 }}>{m.stage}</span>
                      <span className="flex-1 truncate font-condensed text-xl font-bold" style={{ color: palette.text }}>{m.opp || "—"}</span>
                      <span className="font-mono text-sm font-bold" style={{ color: c }}>{m.score}</span>
                      <span className="rounded px-2 py-0.5 font-condensed text-xs font-bold uppercase" style={{ background: `${c}18`, color: c }}>{win ? "W" : "L"}</span>
                    </div>
                  );
                })}
                {form.finalsOpp && (
                  <div className="flex items-center gap-3 rounded border px-3 py-2" style={{ borderColor: `${palette.a}40`, background: `${palette.a}08` }}>
                    <span className="font-condensed text-xs w-24 shrink-0 uppercase" style={{ color: palette.a, opacity: 0.7 }}>Finals</span>
                    <span className="flex-1 truncate font-condensed text-xl font-bold" style={{ color: palette.text }}>{form.finalsOpp}</span>
                    <span className="font-mono text-sm font-bold" style={{ color: form.finalsResult === "win" ? palette.a : "#ff3b3b" }}>{form.finalsSc}</span>
                    <span className="rounded px-2 py-0.5 font-condensed text-xs font-bold uppercase" style={{ background: `${(form.finalsResult === "win" ? palette.a : "#ff3b3b")}18`, color: form.finalsResult === "win" ? palette.a : "#ff3b3b" }}>{form.finalsResult === "win" ? "W" : "L"}</span>
                  </div>
                )}
                {perforation}
                {form.champTitle && (
                  <div className="flex items-center gap-4">
                    <Trophy className="h-10 w-10 shrink-0" style={{ color: titleColor, opacity: 0.7 }} />
                    <div>
                      <div className="font-condensed text-xs uppercase tracking-[0.2em]" style={{ color: titleColor, opacity: 0.55 }}>{form.tournament}</div>
                      <div className="font-display text-6xl leading-none" style={{ color: titleColor }}>{form.champTitle}</div>
                      {form.tcRecord && <div className="mt-0.5 font-mono text-xs" style={{ color: titleColor, opacity: 0.6 }}>{form.tcRecord}</div>}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── layout: split ────────────────────────────────────────────────────────────
function SplitCard({ form, rounds, topCut, cardType, palette }: CardProps) {
  const wins = rounds.filter((r) => r.result === "win").length;
  const losses = rounds.length - wins;
  const titleColor = form.champTitle.toUpperCase() === "ELIMINATED" ? "#ff3b3b" : palette.a;

  return (
    <>
      {/* Diagonal color split */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg,transparent 48%,${palette.a}10 48%)`,
        }}
      />
      {/* Diagonal accent line */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg,transparent calc(48% - 1px),${palette.a}55 calc(48% - 1px),${palette.a}55 calc(48% + 1px),transparent calc(48% + 1px))`,
        }}
      />

      <div className="relative">
        {/* Header: player name runs across the diagonal */}
        <header className="relative px-8 pt-10 pb-0">
          <div className="mb-3 flex items-center gap-3">
            <div
              className="rounded-full px-3 py-1 font-condensed text-xs font-bold uppercase tracking-[0.22em]"
              style={{ background: `${palette.a}15`, color: palette.a, border: `1px solid ${palette.a}30` }}
            >
              {form.organizer} / {form.game}
            </div>
            <span className="font-mono text-xs" style={{ color: palette.text, opacity: 0.3 }}>{form.cardNum}</span>
          </div>

          {/* Giant player name */}
          <h2
            className="break-words font-display text-[80px] leading-none tracking-[-0.01em]"
            style={{ color: palette.text, textShadow: `3px 3px 0 ${palette.a}30, 0 0 28px ${palette.a}22` }}
          >
            {form.player || "PLAYER"}
          </h2>

          {/* Meta row beneath name */}
          <div className="mt-3 mb-6 flex items-center gap-0">
            <div className="h-[3px] w-8" style={{ background: palette.a }} />
            <div className="mx-3 flex gap-4">
              {[form.tournament, form.date, cardType === "swiss" ? "Swiss" : "Top Cut"].map((v, i) => (
                <span key={i} className="font-condensed text-sm uppercase tracking-[0.16em]" style={{ color: palette.text, opacity: 0.4 }}>{v}</span>
              ))}
            </div>
            <div className="h-px flex-1" style={{ background: `${palette.a}20` }} />
          </div>
        </header>

        {/* Body: two-column feel */}
        <div className="px-8 pb-8">
          {cardType === "swiss" ? (
            <>
              <div className="mb-3 font-condensed text-xs uppercase tracking-[0.28em]" style={{ color: palette.a, opacity: 0.65 }}>Swiss Round Results</div>
              <div className="grid grid-cols-2 gap-2">
                {rounds.map((r, i) => {
                  const win = r.result === "win";
                  const c = win ? palette.a : "#ff3b3b";
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-md border p-3"
                      style={{ borderColor: `${c}28`, background: `${c}06` }}
                    >
                      <div
                        className="h-7 w-7 shrink-0 rounded-full text-center font-condensed text-xs font-bold leading-7"
                        style={{ background: `${c}18`, color: c, border: `1px solid ${c}40` }}
                      >
                        {win ? "W" : "L"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10px]" style={{ color: palette.text, opacity: 0.3 }}>{r.rnd || `R${i + 1}`}</div>
                        <div className="truncate font-condensed text-base font-bold" style={{ color: palette.text }}>{r.opp || "—"}</div>
                      </div>
                      <span className="font-mono text-sm font-bold shrink-0" style={{ color: c }}>{r.score || "—"}</span>
                    </div>
                  );
                })}
              </div>

              {/* Stats bar */}
              <div className="mt-5 flex items-center gap-0 rounded-md overflow-hidden">
                {[
                  ["Wins", wins, palette.a],
                  ["Loss", losses, "#ff3b3b"],
                  ["Played", rounds.length, palette.text],
                ].map(([l, v, c], i) => (
                  <div
                    key={String(l)}
                    className="flex-1 py-3 text-center"
                    style={{ background: `${String(c)}${["12","08","06"][i]}`, borderRight: i < 2 ? `1px solid ${palette.bg}` : "none" }}
                  >
                    <div className="font-display text-4xl leading-none" style={{ color: String(c) }}>{v}</div>
                    <div className="font-condensed text-[9px] uppercase tracking-widest mt-0.5" style={{ color: String(c), opacity: 0.55 }}>{String(l)}</div>
                  </div>
                ))}
              </div>
              {form.advMsg && (
                <div className="mt-3 border-l-4 pl-4 py-2 font-condensed text-xl font-bold uppercase tracking-[0.1em]" style={{ borderColor: palette.a, color: palette.a }}>
                  {form.advMsg}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-3 font-condensed text-xs uppercase tracking-[0.28em]" style={{ color: palette.a, opacity: 0.65 }}>Top Cut Results</div>
              <div className="grid grid-cols-2 gap-2">
                {topCut.map((m, i) => {
                  const win = m.result === "win";
                  const c = win ? palette.a : "#ff3b3b";
                  return (
                    <div key={i} className="flex items-center gap-2 rounded-md border p-3" style={{ borderColor: `${c}28`, background: `${c}06` }}>
                      <div className="h-7 w-7 shrink-0 rounded-full text-center font-condensed text-xs font-bold leading-7" style={{ background: `${c}18`, color: c, border: `1px solid ${c}40` }}>
                        {win ? "W" : "L"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-condensed text-[10px] uppercase" style={{ color: palette.text, opacity: 0.3 }}>{m.stage}</div>
                        <div className="truncate font-condensed text-base font-bold" style={{ color: palette.text }}>{m.opp || "—"}</div>
                      </div>
                      <span className="font-mono text-sm font-bold shrink-0" style={{ color: c }}>{m.score}</span>
                    </div>
                  );
                })}
                {form.finalsOpp && (
                  <div className="col-span-2 flex items-center gap-2 rounded-md border p-3" style={{ borderColor: `${palette.a}50`, background: `${palette.a}0a` }}>
                    <div className="h-7 w-7 shrink-0 rounded-full text-center font-condensed text-xs font-bold leading-7" style={{ background: `${(form.finalsResult === "win" ? palette.a : "#ff3b3b")}22`, color: form.finalsResult === "win" ? palette.a : "#ff3b3b", border: `1px solid ${(form.finalsResult === "win" ? palette.a : "#ff3b3b")}50` }}>
                      {form.finalsResult === "win" ? "W" : "L"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-condensed text-[10px] uppercase" style={{ color: palette.a, opacity: 0.6 }}>Finals</div>
                      <div className="truncate font-condensed text-base font-bold" style={{ color: palette.text }}>{form.finalsOpp}</div>
                    </div>
                    <span className="font-mono text-sm font-bold shrink-0" style={{ color: form.finalsResult === "win" ? palette.a : "#ff3b3b" }}>{form.finalsSc}</span>
                  </div>
                )}
              </div>

              {form.champTitle && (
                <div className="mt-5 relative overflow-hidden rounded-md border py-6 px-6 text-center" style={{ borderColor: titleColor, background: `${titleColor}08` }}>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(135deg,transparent 48%,${titleColor}05 48%)` }}
                  />
                  <Trophy className="mx-auto mb-2 h-7 w-7" style={{ color: titleColor, opacity: 0.7 }} />
                  <div className="font-display text-[68px] leading-none" style={{ color: titleColor, textShadow: `0 0 20px ${titleColor}66` }}>
                    {form.champTitle}
                  </div>
                  {form.tcRecord && <div className="mt-1 font-mono text-sm" style={{ color: titleColor, opacity: 0.6 }}>{form.tcRecord}</div>}
                </div>
              )}
            </>
          )}

          {/* Footer */}
          <div className="mt-6 flex justify-between font-condensed text-xs uppercase tracking-[0.2em]" style={{ color: palette.text, opacity: 0.25 }}>
            <span>{form.organizer} · {form.game}</span>
            <span>{form.date}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── layout: circuit ──────────────────────────────────────────────────────────
function CircuitCard({ form, rounds, topCut, cardType, palette }: CardProps) {
  const wins = rounds.filter((r) => r.result === "win").length;
  const losses = rounds.length - wins;
  const titleColor = form.champTitle.toUpperCase() === "ELIMINATED" ? "#ff3b3b" : palette.a;

  const CornerBracket = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
    const top = pos.startsWith("t");
    const left = pos.endsWith("l");
    return (
      <div
        className={`absolute h-5 w-5 ${top ? "top-4" : "bottom-4"} ${left ? "left-4" : "right-4"}`}
        style={{
          borderTop: top ? `2px solid ${palette.a}55` : "none",
          borderBottom: !top ? `2px solid ${palette.a}55` : "none",
          borderLeft: left ? `2px solid ${palette.a}55` : "none",
          borderRight: !left ? `2px solid ${palette.a}55` : "none",
        }}
      />
    );
  };

  const renderCircuitRow = (label: string, opp: string, score: string, result: "win" | "loss", featured?: boolean) => {
    const win = result === "win";
    const c = win ? palette.a : "#ff3b3b";
    return (
      <div className="relative flex items-center gap-0 py-1">
        {/* vertical trace on left */}
        <div className="relative w-10 shrink-0 flex flex-col items-center">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px" style={{ background: `${palette.a}18` }} />
          <div
            className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 font-condensed text-[9px] font-bold"
            style={{ background: palette.bg, borderColor: c, color: c }}
          >
            {win ? "W" : "L"}
          </div>
        </div>
        {/* horizontal trace */}
        <div className="mx-2 h-px w-4 shrink-0" style={{ background: `${palette.a}30` }} />
        {/* content */}
        <div
          className={`flex flex-1 items-center gap-3 rounded border px-3 ${featured ? "py-3" : "py-2"}`}
          style={{ borderColor: `${c}22`, background: `${c}05` }}
        >
          <span className="font-mono text-xs w-20 shrink-0" style={{ color: palette.text, opacity: 0.35 }}>{label}</span>
          <span className="flex-1 truncate font-condensed text-xl font-bold" style={{ color: palette.text }}>{opp || "—"}</span>
          <span className="font-mono text-sm font-bold shrink-0" style={{ color: c }}>{score || "—"}</span>
        </div>
        {/* end node */}
        <div className="mx-2 h-px w-3 shrink-0" style={{ background: `${palette.a}20` }} />
        <div className="h-2 w-2 shrink-0 rotate-45" style={{ background: c, opacity: 0.7 }} />
      </div>
    );
  };

  return (
    <>
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${palette.a}16 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 20%,${palette.a}10 0%,transparent 55%)` }}
      />

      {/* Corner brackets */}
      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />

      <div className="relative p-10">
        {/* Header */}
        <header className="mb-6">
          <div className="mb-4 flex items-center gap-3">
            {/* chip-style badge */}
            <div
              className="flex items-center gap-2 rounded border px-3 py-1.5"
              style={{ borderColor: `${palette.a}35`, background: `${palette.a}0c` }}
            >
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: palette.a, boxShadow: `0 0 6px ${palette.a}` }} />
              <span className="font-condensed text-xs font-bold uppercase tracking-[0.22em]" style={{ color: palette.a }}>
                {form.organizer} / {form.game}
              </span>
            </div>
            <div className="flex-1 h-px" style={{ background: `${palette.a}18` }} />
            <div className="flex items-center gap-1">
              {[0,1,2,3].map(i => (
                <div key={i} className="h-1 w-1 rounded-full" style={{ background: palette.a, opacity: 0.15 + i * 0.2 }} />
              ))}
            </div>
          </div>

          <p className="font-condensed text-xs font-bold uppercase tracking-[0.38em]" style={{ color: palette.a, opacity: 0.55 }}>
            {cardType === "swiss" ? "Swiss Stage" : "Top Cut"} · Node {form.cardNum}
          </p>
          <h2
            className="mt-2 break-words font-display text-[76px] leading-none tracking-[0.02em]"
            style={{ color: palette.text, textShadow: `0 0 24px ${palette.a}35` }}
          >
            {form.player || "PLAYER"}
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: `${palette.a}20` }} />
            {[form.tournament, form.date].map((v, i) => (
              <span key={i} className="font-condensed text-xs uppercase tracking-[0.18em]" style={{ color: palette.text, opacity: 0.38 }}>{v}</span>
            ))}
          </div>
        </header>

        {/* Circuit trace rows */}
        <div>
          {cardType === "swiss" ? (
            <>
              <div className="mb-2 font-condensed text-xs uppercase tracking-[0.3em]" style={{ color: palette.a, opacity: 0.5 }}>Circuit Log</div>
              {rounds.map((r, i) => renderCircuitRow(r.rnd || `R${i + 1}`, r.opp, r.score, r.result))}

              {/* Stats chip */}
              <div
                className="mt-5 grid grid-cols-3 overflow-hidden rounded border"
                style={{ borderColor: `${palette.a}25` }}
              >
                {[["WIN", wins, palette.a], ["LOSS", losses, "#ff3b3b"], ["TOTAL", rounds.length, palette.text]].map(([l, v, c], i) => (
                  <div
                    key={String(l)}
                    className="py-4 text-center"
                    style={{
                      background: `${String(c)}08`,
                      borderRight: i < 2 ? `1px solid ${palette.a}14` : "none",
                    }}
                  >
                    <div className="font-display text-5xl leading-none" style={{ color: String(c) }}>{v}</div>
                    <div className="mt-1 font-condensed text-[9px] uppercase tracking-widest" style={{ color: String(c), opacity: 0.5 }}>{String(l)}</div>
                  </div>
                ))}
              </div>
              {form.advMsg && (
                <div
                  className="mt-3 flex items-center gap-3 rounded border px-4 py-2"
                  style={{ borderColor: `${palette.a}30`, background: `${palette.a}08` }}
                >
                  <div className="h-2 w-2 rounded-full" style={{ background: palette.a, boxShadow: `0 0 8px ${palette.a}` }} />
                  <span className="font-condensed text-lg font-bold uppercase tracking-[0.1em]" style={{ color: palette.a }}>{form.advMsg}</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-2 font-condensed text-xs uppercase tracking-[0.3em]" style={{ color: palette.a, opacity: 0.5 }}>Bracket Log</div>
              {topCut.map((m, i) => renderCircuitRow(m.stage, m.opp, m.score, m.result))}
              {form.finalsOpp && renderCircuitRow("Finals", form.finalsOpp, form.finalsSc, form.finalsResult, true)}

              {form.champTitle && (
                <div
                  className="mt-5 relative overflow-hidden rounded border p-5 text-center"
                  style={{ borderColor: `${titleColor}40`, background: `${titleColor}08` }}
                >
                  {/* circuit corner accents */}
                  {(["top-2 left-2","top-2 right-2","bottom-2 left-2","bottom-2 right-2"] as const).map((pos, pi) => {
                    const t = pos.includes("top"); const l = pos.includes("left");
                    return (
                      <div key={pi} className={`absolute ${pos} h-3 w-3`} style={{
                        borderTop: t ? `2px solid ${titleColor}45` : "none",
                        borderBottom: !t ? `2px solid ${titleColor}45` : "none",
                        borderLeft: l ? `2px solid ${titleColor}45` : "none",
                        borderRight: !l ? `2px solid ${titleColor}45` : "none",
                      }} />
                    );
                  })}
                  <Trophy className="mx-auto mb-2 h-8 w-8" style={{ color: titleColor, opacity: 0.7 }} />
                  <div className="font-condensed text-xs uppercase tracking-[0.25em]" style={{ color: titleColor, opacity: 0.55 }}>{form.tournament} / {form.date}</div>
                  <div className="font-display text-6xl leading-none" style={{ color: titleColor, textShadow: `0 0 22px ${titleColor}55` }}>{form.champTitle}</div>
                  {form.tcRecord && <div className="mt-1 font-mono text-xs" style={{ color: titleColor, opacity: 0.6 }}>Record: {form.tcRecord}</div>}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer trace */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: `${palette.a}15` }} />
          <span className="font-condensed text-[9px] uppercase tracking-[0.35em]" style={{ color: palette.text, opacity: 0.22 }}>
            {form.organizer} · {form.game} · {form.date}
          </span>
          <div className="h-px flex-1" style={{ background: `${palette.a}15` }} />
        </div>
      </div>
    </>
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
