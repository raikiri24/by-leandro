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
        background: "#10150d",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 24, color: "#b5ee82", marginBottom: 40 }}>
        BYLD SPACE / SOFTWARE DEVELOPMENT
      </div>
      <div style={{ fontSize: 70, lineHeight: 1.1 }}>Your requirements.</div>
      <div style={{ fontSize: 70, color: "#b5ee82", lineHeight: 1.1 }}>
        Let’s build it.
      </div>
      <div style={{ fontSize: 26, color: "#bcc4b5", marginTop: 40 }}>
        Custom applications · HRIS · Accounting · Warehouse
      </div>
    </div>,
    size,
  );
}
