import { NextResponse } from "next/server";
import { getAppDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

type FeedbackCategory = "problem" | "feature" | "suggestion";

type FeedbackEntry = {
  category: FeedbackCategory;
  title: string;
  message: string;
  contact?: string;
  sessionId?: string;
  page?: string;
  userAgent?: string;
  status: "open";
  createdAt: Date;
  updatedAt: Date;
};

const COLLECTION = "tool_feedback";
const CATEGORIES = new Set(["problem", "feature", "suggestion"]);

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidSessionId(value: unknown) {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{16,96}$/.test(value);
}

async function getFeedbackCollection() {
  const db = await getAppDatabase();
  const collection = db.collection<FeedbackEntry>(COLLECTION);
  await collection.createIndex({ createdAt: -1 });
  await collection.createIndex({ category: 1, status: 1, createdAt: -1 });
  return collection;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => ({}));
    const category = cleanText(payload.category, 32) as FeedbackCategory;
    const title = cleanText(payload.title, 120);
    const message = cleanText(payload.message, 3000);
    const contact = cleanText(payload.contact, 160);
    const page = cleanText(payload.page, 500);
    const sessionId = isValidSessionId(payload.sessionId)
      ? payload.sessionId
      : undefined;

    if (!CATEGORIES.has(category)) {
      return NextResponse.json(
        { ok: false, error: "Choose a valid feedback type." },
        { status: 400 },
      );
    }

    if (title.length < 4) {
      return NextResponse.json(
        { ok: false, error: "Add a short title with at least 4 characters." },
        { status: 400 },
      );
    }

    if (message.length < 12) {
      return NextResponse.json(
        { ok: false, error: "Add a few more details before sending." },
        { status: 400 },
      );
    }

    const now = new Date();
    const collection = await getFeedbackCollection();
    const result = await collection.insertOne({
      category,
      title,
      message,
      ...(contact ? { contact } : {}),
      ...(sessionId ? { sessionId } : {}),
      ...(page ? { page } : {}),
      userAgent: request.headers.get("user-agent") || "",
      status: "open",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      ok: true,
      data: { id: result.insertedId.toString() },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unable to submit feedback.",
      },
      { status: 500 },
    );
  }
}
