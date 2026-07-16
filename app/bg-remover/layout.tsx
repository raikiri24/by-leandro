import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Background Remover",
  description:
    "Remove image backgrounds in your browser — no upload, no account, no API key. Refine edges, adjust colors, and export a clean transparent PNG.",
  alternates: { canonical: "/bg-remover" },
};

export default function BgRemoverLayout({ children }: { children: React.ReactNode }) {
  return children;
}
