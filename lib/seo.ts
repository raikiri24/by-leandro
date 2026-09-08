import type { Metadata } from "next";
import { SITE_NAME } from "./site";

export function pageMetadata(title: string, description: string, path: string, article = false): Metadata {
  if (!path.startsWith("/") || path.startsWith("//") || /[?#<>]/.test(path)) {
    throw new Error("Metadata requires a canonical local path.");
  }
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: article ? "article" : "website", title, description, url: path,
      siteName: SITE_NAME,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
