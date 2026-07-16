const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.byleandro.space";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
export const SITE_NAME = "Leandro's Tournament Card Generator";
export const SITE_DESCRIPTION =
  "A free tournament card and pub mat generator for anyone, especially Tournament Organizers creating event graphics and player result cards.";
export const ADSENSE_CLIENT_ID = "ca-pub-6633087581128659";
export const SUPPORT_EMAIL = "paulleandrolanot@gmail.com";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tool", label: "Tool" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "Help" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
