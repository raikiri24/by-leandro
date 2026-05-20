import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leandro's Tournament Card Generator",
  description:
    "Generate player result cards from Challonge tournaments or manual inputs.",
  icons: {
    icon: "/tool-icon.svg",
    shortcut: "/tool-icon.svg",
    apple: "/tool-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
