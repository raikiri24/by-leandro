import { getAppDatabase } from "@/lib/mongodb";

type RateLimitDoc = { key: string; count: number; expiresAt: Date };

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function checkRateLimit(
  bucket: string,
  identifier: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const db = await getAppDatabase();
  const collection = db.collection<RateLimitDoc>("rate_limits");
  await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await collection.createIndex({ key: 1 }, { unique: true });

  const windowId = Math.floor(Date.now() / windowMs);
  const key = `${bucket}:${identifier}:${windowId}`;
  const retryAfterSeconds = Math.ceil(windowMs / 1000);

  const result = await collection.findOneAndUpdate(
    { key },
    {
      $inc: { count: 1 },
      $setOnInsert: { key, expiresAt: new Date(Date.now() + windowMs + 5_000) },
    },
    { upsert: true, returnDocument: "after" },
  );

  const count = result?.count ?? 1;

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    retryAfterSeconds,
  };
}

export function rateLimitResponse(result: RateLimitResult) {
  return Response.json(
    { ok: false, error: "Too many requests. Please slow down and try again shortly." },
    { status: 429, headers: { "Retry-After": String(result.retryAfterSeconds) } },
  );
}

// Best-effort deterrent against other sites' scripts calling these public write
// endpoints from a visitor's browser. Not a session/auth boundary — there is no
// session to forge — so a missing Origin header (some privacy tools strip it) is
// allowed through rather than blocked.
export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
