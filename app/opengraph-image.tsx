import { ImageResponse } from "next/og";
export const alt = "BYLD SPACE — Custom software and ERP development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#f4f4f4",
        color: "#171a20",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 20,
          color: "#666b73",
          marginBottom: 54,
          letterSpacing: 4,
        }}
      >
        BYLD SPACE / SOFTWARE DEVELOPMENT
      </div>
      <div style={{ fontSize: 86, lineHeight: 1.1, letterSpacing: -5 }}>
        Built around you.
      </div>
      <div
        style={{
          fontSize: 32,
          color: "#666b73",
          lineHeight: 1.5,
          marginTop: 24,
        }}
      >
        Extraordinary software. Made for your everyday.
      </div>
      <div style={{ fontSize: 22, color: "#666b73", marginTop: 54 }}>
        Custom applications · Connected ERP · Integrations
      </div>
    </div>,
    size,
  );
}
