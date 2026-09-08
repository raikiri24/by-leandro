import { ToolHelp } from "@/components/site/tool-help";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata("Card Generator Tool", "Create tournament result cards, pub mats, and winner posts. Enter event details or import from Challonge, preview live, then download a JPG — free, no signup.", "/tool");

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolHelp tool="tool" /></>;
}
