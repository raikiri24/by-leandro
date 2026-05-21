import { NextResponse } from "next/server";
import { getAppDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  const hasMongoUri = Boolean(process.env.MONGODB_URI);
  const databaseName = process.env.MONGODB_DB || "byleandro";

  try {
    const db = await getAppDatabase();
    await db.command({ ping: 1 });

    return NextResponse.json({
      ok: true,
      data: {
        hasMongoUri,
        databaseName,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to connect to MongoDB.",
        data: {
          hasMongoUri,
          databaseName,
        },
      },
      { status: 500 },
    );
  }
}
