import { NextResponse } from "next/server";
import { getAppDatabase } from "@/lib/mongodb";
import { checkRateLimit, getClientIp, isSameOriginRequest, rateLimitResponse } from "@/lib/rateLimit";

export const runtime = "nodejs";

type UsageUser = {
  sessionId: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
  visits: number;
  userAgent?: string;
};

const COLLECTION = "tool_usage_users";

function isValidSessionId(value: unknown) {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{16,96}$/.test(value);
}

async function getUsageCollection() {
  const db = await getAppDatabase();
  const collection = db.collection<UsageUser>(COLLECTION);
  await collection.createIndex({ sessionId: 1 }, { unique: true });
  await collection.createIndex({ lastSeenAt: -1 });
  return collection;
}

async function getCounts() {
  const collection = await getUsageCollection();
  const now = new Date();
  const activeSince = new Date(now.getTime() - 15 * 60 * 1000);
  const [totalUsers, activeUsers] = await Promise.all([
    collection.countDocuments(),
    collection.countDocuments({ lastSeenAt: { $gte: activeSince } }),
  ]);

  return {
    totalUsers,
    activeUsers,
    activeWindowMinutes: 15,
  };
}

export async function GET(request: Request) {
  const rateLimit = await checkRateLimit("usage-read", getClientIp(request), 30, 60_000);
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    return NextResponse.json({ ok: true, data: await getCounts() });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unable to fetch usage data.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
  }

  const rateLimit = await checkRateLimit("usage-write", getClientIp(request), 20, 60_000);
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const payload = await request.json().catch(() => ({}));
    if (!isValidSessionId(payload.sessionId)) {
      return NextResponse.json(
        { ok: false, error: "Invalid session id." },
        { status: 400 },
      );
    }

    const now = new Date();
    const collection = await getUsageCollection();
    await collection.updateOne(
      { sessionId: payload.sessionId },
      {
        $setOnInsert: {
          sessionId: payload.sessionId,
          firstSeenAt: now,
        },
        $set: {
          lastSeenAt: now,
          userAgent: request.headers.get("user-agent") || "",
        },
        $inc: { visits: 1 },
      },
      { upsert: true },
    );

    return NextResponse.json({ ok: true, data: await getCounts() });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unable to update usage data.",
      },
      { status: 500 },
    );
  }
}
