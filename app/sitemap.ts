import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

const routes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: string;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1, lastModified: "2026-08-20" },
  { path: "/tool", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-05-20" },
  { path: "/deck-builder", changeFrequency: "weekly", priority: 0.8, lastModified: "2026-05-20" },
  { path: "/bg-remover", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-20" },
  { path: "/articles", changeFrequency: "weekly", priority: 0.7, lastModified: "2026-08-20" },
  { path: "/about", changeFrequency: "monthly", priority: 0.5, lastModified: "2026-08-20" },
  { path: "/faq", changeFrequency: "monthly", priority: 0.5, lastModified: "2026-05-20" },
  { path: "/changelog", changeFrequency: "weekly", priority: 0.4, lastModified: "2026-05-20" },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4, lastModified: "2026-05-20" },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-07-04" },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-07-16" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(`${route.lastModified}T00:00:00Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articleRoutes = ARTICLES.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(`${article.updatedAt}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
