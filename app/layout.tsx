import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leandro's Tournament Card Generator",
  description:
    "Generate player result cards from Challonge tournaments or manual inputs.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
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
