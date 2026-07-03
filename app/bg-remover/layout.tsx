import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Background Remover | Leandro's Tournament Card Generator",
  description:
    "Remove image backgrounds in your browser — no upload, no account, no API key. Refine edges, adjust colors, and export a clean transparent PNG.",
};

export default function BgRemoverLayout({ children }: { children: React.ReactNode }) {
  return children;
}
