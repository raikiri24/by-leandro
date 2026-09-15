import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "BYLD SPACE | Ideas. Applications. Real Solutions.",
    template: "%s | BYLD SPACE",
  },
  description: "We help turn ideas into practical digital solutions. Software development, cloud deployment, data engineering, and AI for real-world problems.",
  keywords: ["software development", "app development", "cloud deployment", "data engineering", "AI development", "tech consultation"],
  authors: [{ name: "BYLD SPACE" }],
  creator: "BYLD SPACE",
  icons: {
    icon: "/nav-icon.png",
    apple: "/nav-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://byldspace.com",
    title: "BYLD SPACE | Ideas. Applications. Real Solutions.",
    description: "We help turn ideas into practical digital solutions.",
    siteName: "BYLD SPACE",
  },
  twitter: {
    card: "summary_large_image",
    title: "BYLD SPACE",
    description: "We help turn ideas into practical digital solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-foreground antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
