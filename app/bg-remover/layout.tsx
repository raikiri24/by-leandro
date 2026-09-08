import { ToolHelp } from "@/components/site/tool-help";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata("Background Remover", "Remove image backgrounds in your browser — no upload, no account, no API key. Refine edges, adjust colors, and export a clean transparent PNG.", "/bg-remover");

export default function BgRemoverLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolHelp tool="bg-remover" /></>;
}
