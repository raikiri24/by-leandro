import { ToolHelp } from "@/components/site/tool-help";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata("Beyblade Deck Builder", "Build custom 3G/4G/5G/6G Beyblade X decks from real part images. Choose standard UX/BX combos or full CX builds and export a shareable deck card.", "/deck-builder");

export default function DeckBuilderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolHelp tool="deck-builder" /></>;
}
