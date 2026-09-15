import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://byldspace.com";

  // In a real application, you would dynamically fetch these from a database or CMS
  const dynamicRoutes = [
    "/projects/personal-beyblade-tracker",
    "/journey/how-an-idea-becomes-an-application",
  ];

  const staticRoutes = [
    "",
    "/services",
    "/services/software-development",
    "/services/cloud-deployment",
    "/services/data-engineering",
    "/services/ai-development",
    "/services/tech-consultation",
    "/projects",
    "/journey",
    "/insights",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
    "/disclaimer"
  ];

  const routes = [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
