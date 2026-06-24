import type { Metadata } from "next";
import { Sedgwick_Ave } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const sedgwickAve = Sedgwick_Ave({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graffiti",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leandro's Tournament Card Generator",
  description:
    "A free tournament card and pub mat generator for anyone, especially Tournament Organizers creating event graphics and player result cards.",
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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6633087581128659"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={sedgwickAve.variable} suppressHydrationWarning>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
