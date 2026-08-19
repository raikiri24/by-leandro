export type ArticleCategory = "Deck Building" | "Organizing" | "Tool Guides" | "Design";

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  relatedSlugs: string[];
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "beyblade-x-standard-vs-cx-builds",
    title: "Standard vs. CX Builds in Beyblade X: How the Parts System Works",
    description:
      "How Standard (BX/UX) and Custom (CX) Beyblade X combos are built, what each part does, and how the deck builder models them.",
    category: "Deck Building",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTime: "6 min read",
    relatedSlugs: ["beyblade-x-deck-sizes-explained", "challonge-import-guide-for-organizers"],
  },
  {
    slug: "beyblade-x-deck-sizes-explained",
    title: "Beyblade X Deck Sizes: What 3G, 4G, 5G, and 6G Mean",
    description:
      "What the 3G/4G/5G/6G deck-size labels mean, why organizers pick one for an event, and how to plan builds around it.",
    category: "Deck Building",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTime: "5 min read",
    relatedSlugs: ["beyblade-x-standard-vs-cx-builds", "beyblade-x-tournament-formats-explained"],
  },
  {
    slug: "beyblade-x-tournament-formats-explained",
    title: "Tournament Formats for Beyblade X Events: Swiss, Round Robin, and Top Cut",
    description:
      "How Swiss stage, round robin, and elimination Top Cut formats work, and how to record them cleanly with the result-card generator.",
    category: "Organizing",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTime: "6 min read",
    relatedSlugs: ["challonge-import-guide-for-organizers", "designing-a-tournament-result-card-people-repost"],
  },
  {
    slug: "challonge-import-guide-for-organizers",
    title: "How Challonge Import Works in the Tournament Card Generator",
    description:
      "A technical walkthrough of how the tool pulls participants and match results from Challonge, why some matches don't import, and when to switch to Manual mode.",
    category: "Tool Guides",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTime: "7 min read",
    relatedSlugs: ["beyblade-x-tournament-formats-explained", "designing-a-tournament-result-card-people-repost"],
  },
  {
    slug: "designing-a-tournament-result-card-people-repost",
    title: "Designing a Tournament Result Card People Actually Repost",
    description:
      "Practical design guidance for tournament result cards, pub mats, and winner posts that read clearly once reposted without their original caption.",
    category: "Design",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTime: "6 min read",
    relatedSlugs: ["challonge-import-guide-for-organizers", "beyblade-x-standard-vs-cx-builds"],
  },
];

export function getArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(slugs: string[]): ArticleMeta[] {
  return slugs
    .map((slug) => getArticle(slug))
    .filter((article): article is ArticleMeta => Boolean(article));
}
