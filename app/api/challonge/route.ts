import { NextResponse } from "next/server";

type ChallongeParticipant = {
  participant?: {
    id: number | string;
    name?: string;
    display_name?: string;
    username?: string;
  };
};

type ChallongeMatch = {
  match?: {
    state?: string;
    scores_csv?: string;
    player1_id?: number | string | null;
    player2_id?: number | string | null;
    winner_id?: number | string | null;
    round?: number;
  };
};

type TournamentFormat = "swiss" | "round_robin" | "single_elimination" | "double_elimination" | "unknown";

type ScrapedMatch = {
  round: number;
  p1: string;
  p2: string;
  s1: number;
  s2: number;
  winner: string;
  stage?: "group" | "final";
};

function detectFormat(type?: string): TournamentFormat {
  const t = (type || "").toLowerCase();
  if (t.includes("double")) return "double_elimination";
  if (t.includes("single")) return "single_elimination";
  if (t.includes("swiss")) return "swiss";
  if (t.includes("round") && t.includes("robin")) return "round_robin";
  return "unknown";
}

const HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
  accept: "application/json,text/html;q=0.9,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9"
};

function normalizeSlug(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) throw new Error("Enter a Challonge URL or tournament slug.");

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withProtocol);
    const parts = url.pathname.split("/").filter(Boolean);
    const base = (parts.at(-1) || "").replace(/\.(json|html)$/i, "");
    if (!base) throw new Error("No tournament slug found in the URL.");

    const labels = url.hostname.toLowerCase().split(".");
    const subdomain = labels.length > 2 ? labels[0] : "";
    return subdomain && subdomain !== "www" && subdomain !== "challonge"
      ? `${subdomain}-${base}`
      : base;
  } catch {
    return trimmed.replace(/^\/+|\/+$/g, "").replace(/\.(json|html)$/i, "");
  }
}

function decodeHtmlJson(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\\"/g, '"');
}

function parseScores(scores = "") {
  const clean = scores.replace(/\s/g, "");
  const pair = clean.match(/(-?\d+)\s*[-–:]\s*(-?\d+)/);
  if (!pair) return [0, 0] as const;
  return [Number(pair[1]) || 0, Number(pair[2]) || 0] as const;
}

function parseChallongeJson(json: any) {
  const tournament = json?.tournament || json;
  if (!tournament) throw new Error("The response did not contain tournament data.");

  const pMap: Record<string, string> = {};
  for (const item of (tournament.participants || []) as ChallongeParticipant[]) {
    const participant = item.participant || (item as any);
    if (!participant?.id) continue;
    pMap[String(participant.id)] =
      participant.display_name || participant.name || participant.username || `P${participant.id}`;
  }

  const matches: ScrapedMatch[] = [];
  for (const item of (tournament.matches || []) as ChallongeMatch[]) {
    const match = item.match || (item as any);
    if (!match || match.state !== "complete" || !match.scores_csv) continue;
    const p1 = pMap[String(match.player1_id)] || "";
    const p2 = pMap[String(match.player2_id)] || "";
    if (!p1 || !p2) continue;
    const [s1, s2] = parseScores(match.scores_csv);
    matches.push({
      round: Number(match.round) || 0,
      p1,
      p2,
      s1,
      s2,
      winner: pMap[String(match.winner_id)] || (s1 >= s2 ? p1 : p2)
    });
  }

  return {
    name: tournament.name || tournament.full_challonge_url || "",
    date: tournament.started_at ? String(tournament.started_at).slice(0, 10) : "",
    participants: Object.values(pMap).sort((a, b) => a.localeCompare(b)),
    matches,
    tournamentFormat: detectFormat(tournament.tournament_type)
  };
}

function parseEmbeddedHtml(html: string, slug: string) {
  const title =
    decodeHtmlJson(html.match(/<title[^>]*>([^<]+)/i)?.[1] || "")
      .replace(/\s*-\s*Challonge\s*$/i, "")
      .trim() || slug;

  const participants = new Set<string>();
  for (const rgx of [
    /"display_name"\s*:\s*"([^"]+)"/g,
    /"name"\s*:\s*"([^"]+)"/g,
    /data-participant-name=["']([^"']+)["']/g
  ]) {
    let match: RegExpExecArray | null;
    while ((match = rgx.exec(html))) {
      const name = decodeHtmlJson(match[1]).trim();
      if (name && !/^challonge$/i.test(name)) participants.add(name);
    }
  }

  return {
    name: title,
    date: "",
    participants: Array.from(participants).sort((a, b) => a.localeCompare(b)),
    matches: [] as ScrapedMatch[],
    tournamentFormat: "unknown" as TournamentFormat
  };
}

function getScoreValue(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value.match(/-?\d+/)?.[0] || 0);
  if (value && typeof value === "object") {
    const object = value as Record<string, unknown>;
    return getScoreValue(object.score ?? object.value ?? object.points ?? object.display_score);
  }
  return 0;
}

function parseModuleHtml(html: string, slug: string) {
  const storeMatch = html.match(
    /window\._initialStoreState\['TournamentStore'\]\s*=\s*(\{[\s\S]*?\});\s*window\._initialStoreState\['ThemeStore'\]/
  );
  if (!storeMatch) throw new Error("No TournamentStore data found in module HTML.");

  const store = JSON.parse(storeMatch[1]) as {
    tournament?: { name?: string; started_at?: string; tournament_type?: string };
    matches_by_round?: Record<string, Array<Record<string, any>>>;
    groups?: Array<{
      matches_by_round?: Record<string, Array<Record<string, any>>>;
    }>;
  };

  const participants = new Map<string, string>();
  const matches: ScrapedMatch[] = [];
  const seenMatches = new Set<string>();

  function appendStageMatches(
    stageStore: {
      matches_by_round?: Record<string, Array<Record<string, any>>>;
    },
    stage: "group" | "final"
  ) {
    const groupedMatches = Object.entries(stageStore.matches_by_round || {}).flatMap(
      ([roundKey, roundMatches]) => (roundMatches || []).map((match) => ({ match, roundKey }))
    );

    for (const { match, roundKey } of groupedMatches) {
      const matchKey = String(match.id || match.md5 || `${stage}-${roundKey}-${match.identifier || ""}`);
      if (seenMatches.has(matchKey)) continue;
      seenMatches.add(matchKey);

      const player1 = match.player1 || {};
      const player2 = match.player2 || {};
      const p1 = String(player1.display_name || player1.name || "").trim();
      const p2 = String(player2.display_name || player2.name || "").trim();
      const p1Id = String(player1.id || match.player1_id || "");
      const p2Id = String(player2.id || match.player2_id || "");
      if (p1) participants.set(p1.toLowerCase(), p1);
      if (p2) participants.set(p2.toLowerCase(), p2);

      const finished = match.state === "complete" || match.state === "completed" || match.winner_id;
      if (!finished || !p1 || !p2) continue;

      const scores = Array.isArray(match.scores) ? match.scores : [];
      const csv = typeof match.scores_csv === "string" ? match.scores_csv : "";
      const [csv1, csv2] = parseScores(csv);
      const s1 = scores.length >= 2 ? getScoreValue(scores[0]) : csv1;
      const s2 = scores.length >= 2 ? getScoreValue(scores[1]) : csv2;
      const winnerId = String(match.winner_id || "");
      const winner = winnerId === p1Id ? p1 : winnerId === p2Id ? p2 : s1 >= s2 ? p1 : p2;

      matches.push({
        round: Number(match.round || roundKey) || 0,
        p1,
        p2,
        s1,
        s2,
        winner,
        stage
      });
    }
  }

  for (const group of store.groups || []) {
    appendStageMatches(group, "group");
  }
  appendStageMatches(store, "final");

  const title =
    decodeHtmlJson(html.match(/<title[^>]*>([^<]+)/i)?.[1] || "")
      .replace(/\s*-\s*Challonge\s*$/i, "")
      .trim() || slug;

  return {
    name: store.tournament?.name || title,
    date: store.tournament?.started_at ? String(store.tournament.started_at).slice(0, 10) : "",
    participants: Array.from(participants.values()).sort((a, b) => a.localeCompare(b)),
    matches,
    tournamentFormat: detectFormat(store.tournament?.tournament_type)
  };
}

async function fetchWithTimeout(url: string, timeoutMs = 12000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      headers: HEADERS,
      signal: controller.signal,
      next: { revalidate: 0 }
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const { url } = (await request.json().catch(() => ({}))) as { url?: string };
  const logs: string[] = [];

  try {
    const slug = normalizeSlug(url || "");
    const publicJson = `https://challonge.com/${encodeURIComponent(slug)}.json`;

    logs.push(`[1/4] Challonge public JSON -> ${publicJson}`);
    const publicResponse = await fetchWithTimeout(publicJson);
    if (publicResponse.ok) {
      const data = parseChallongeJson(await publicResponse.json());
      logs.push(`[1/4] OK: ${data.participants.length} players, ${data.matches.length} completed matches`);
      return NextResponse.json({ ok: true, slug, logs, data });
    }
    logs.push(`[1/4] HTTP ${publicResponse.status}`);

    const apiKey = process.env.CHALLONGE_API_KEY;
    if (apiKey) {
      const apiUrl = `https://api.challonge.com/v1/tournaments/${encodeURIComponent(
        slug
      )}.json?include_participants=1&include_matches=1&api_key=${encodeURIComponent(apiKey)}`;
      logs.push("[2/4] Challonge API -> trying enhanced access");
      const apiResponse = await fetchWithTimeout(apiUrl);
      if (apiResponse.ok) {
        const data = parseChallongeJson(await apiResponse.json());
        logs.push(`[2/4] OK: ${data.participants.length} players, ${data.matches.length} completed matches`);
        return NextResponse.json({ ok: true, slug, logs, data });
      }
      logs.push(`[2/4] HTTP ${apiResponse.status}`);
    } else {
      logs.push("[2/4] Challonge API -> skipped");
    }

    const moduleUrl = `https://challonge.com/${encodeURIComponent(slug)}/module`;
    logs.push(`[3/4] Challonge bracket module -> ${moduleUrl}`);
    const moduleResponse = await fetchWithTimeout(moduleUrl);
    if (moduleResponse.ok) {
      const data = parseModuleHtml(await moduleResponse.text(), slug);
      logs.push(`[3/4] OK: ${data.participants.length} players, ${data.matches.length} completed matches`);
      return NextResponse.json({ ok: true, slug, logs, data });
    }
    logs.push(`[3/4] HTTP ${moduleResponse.status}`);

    const htmlUrl = `https://challonge.com/${encodeURIComponent(slug)}`;
    logs.push(`[4/4] Challonge HTML fallback -> ${htmlUrl}`);
    const htmlResponse = await fetchWithTimeout(htmlUrl);
    if (htmlResponse.ok) {
      const data = parseEmbeddedHtml(await htmlResponse.text(), slug);
      logs.push(`[4/4] OK: ${data.participants.length} players found in page HTML`);
      return NextResponse.json({ ok: true, slug, logs, data });
    }
    logs.push(`[4/4] HTTP ${htmlResponse.status}`);

    return NextResponse.json(
      {
        ok: false,
        slug,
        logs,
        error: "Challonge denied access to this tournament. Please check the URL or use Manual mode."
      },
      { status: 502 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        logs,
        error: error instanceof Error ? error.message : "Unexpected scrape failure."
      },
      { status: 400 }
    );
  }
}
