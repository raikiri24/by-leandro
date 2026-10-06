const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.byleandro.space";

const siteOrigin = new URL(rawSiteUrl);
if (
  !["https:", "http:"].includes(siteOrigin.protocol) ||
  siteOrigin.username ||
  siteOrigin.password ||
  siteOrigin.pathname !== "/" ||
  siteOrigin.search ||
  siteOrigin.hash
) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment.",
  );
}
export const SITE_URL = siteOrigin.origin;
export const SITE_NAME = "BYLD SPACE";
export const SITE_DESCRIPTION =
  "Custom software development and ERP systems: HRIS, accounting, and warehouse tools built around your requirements.";
export const SUPPORT_EMAIL = "paulleandrolanot@gmail.com";
export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/requirements", label: "Requirements guide" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
