"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            background: "#090909",
            color: "#fff",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
            padding: "4rem 1.25rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff5a68" }}>
            Critical error
          </p>
          <h1 style={{ fontSize: "2.5rem", margin: 0 }}>The app failed to load</h1>
          <p style={{ maxWidth: 420, color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            Something went wrong at the application level. Reloading usually fixes this.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={() => reset()}
              style={{
                background: "#00d4e8",
                color: "#000",
                fontWeight: 700,
                border: "none",
                borderRadius: 6,
                padding: "0.6rem 1.2rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 6,
                padding: "0.6rem 1.2rem",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Go home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
