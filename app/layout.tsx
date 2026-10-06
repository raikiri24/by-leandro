import { serializeJsonLd } from "@/lib/seo";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
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
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BYLD SPACE | Custom software & ERP development",
    template: "%s | BYLD SPACE",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "BYLD SPACE" }],
  icons: { icon: "/nav-icon.png", apple: "/nav-icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-foreground antialiased min-h-screen flex flex-col`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BYLD SPACE",
              url: SITE_URL,
              email: "paulleandrolanot@gmail.com",
              sameAs: ["https://www.facebook.com/byld.space"],
            }),
          }}
        />
        <Navbar />
        <main
          id="main-content"
          className="flex-1 flex flex-col relative overflow-hidden"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
