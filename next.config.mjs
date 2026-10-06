import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net",
  "font-src 'self' data:",
  "connect-src 'self' https://staticimgly.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  "worker-src 'self' blob:",
  "child-src blob:",
  "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: appDir,
  async redirects() {
    const equivalentRoutes = [
      ["/projects", "/services"],
      ["/projects/personal-beyblade-tracker", "/services/software-development"],
      ["/journey", "/requirements"],
      ["/journey/how-an-idea-becomes-an-application", "/requirements"],
      ["/insights", "/requirements"],
      ["/services/cloud-deployment", "/services/integrations-maintenance"],
      ["/services/data-engineering", "/services/integrations-maintenance"],
      ["/services/ai-development", "/services/software-development"],
      ["/services/tech-consultation", "/contact"],
    ].map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
    const canonical =
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.byleandro.space";
    if (canonical.replace(/\/+$/, "") === "https://www.byleandro.space") {
      equivalentRoutes.unshift({
        source: "/:path*",
        has: [{ type: "host", value: "byleandro.space" }],
        destination: "https://www.byleandro.space/:path*",
        permanent: true,
      });
    }
    return equivalentRoutes;
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
