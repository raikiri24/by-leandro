import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beyblade Deck Builder | Leandro's Tournament Card Generator",
  description:
    "Build custom 3G/4G/5G/6G Beyblade X decks from real part images. Choose standard UX/BX combos or full CX builds and export a shareable deck card.",
};

export default function DeckBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
