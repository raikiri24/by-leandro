import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card Generator Tool | Leandro's Tournament Card Generator",
  description:
    "Create tournament result cards, pub mats, and winner posts. Enter event details or import from Challonge, preview live, then download a JPG — free, no signup.",
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return children;
}
