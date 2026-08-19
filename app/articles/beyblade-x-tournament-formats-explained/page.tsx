import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage, ArticleSection } from "@/components/site/article-page";
import { getArticle } from "@/lib/articles";

const meta = getArticle("beyblade-x-tournament-formats-explained")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/articles/${meta.slug}` },
  openGraph: {
    type: "article",
    title: meta.title,
    description: meta.description,
    url: `/articles/${meta.slug}`,
  },
};

const toc = [
  { id: "round-robin", label: "Round robin" },
  { id: "swiss", label: "Swiss" },
  { id: "top-cut", label: "Single and double elimination Top Cut" },
  { id: "swiss-into-top-cut", label: "Combining Swiss into Top Cut" },
  { id: "recording-results", label: "Recording results cleanly regardless of format" },
  { id: "faq", label: "FAQ" },
];

export default function Article() {
  return (
    <ArticlePage meta={meta} toc={toc}>
      <p>
        Most Beyblade X locals and larger events use one of a handful of standard tournament
        formats, often two of them stacked together. Knowing which one you're playing changes how
        you track standings and, if you're organizing, how you brief players before round one.
      </p>

      <ArticleSection id="round-robin" title="Round robin">
        <p>
          Every player plays every other player once. It's the simplest format to explain and the
          fairest in the sense that nobody is knocked out early, but it doesn't scale — a
          round robin with 16 players needs 15 rounds per player, so it's mostly used for small
          pods or as a group stage inside a bigger bracket.
        </p>
      </ArticleSection>

      <ArticleSection id="swiss" title="Swiss">
        <p>
          Players are paired each round against someone with a similar record so far — winners
          tend to face winners, and so on — instead of a fixed schedule. Nobody is eliminated
          during the Swiss stage itself; it runs a set number of rounds and then seeds players
          into a cut based on standings. Swiss is the more common choice for Beyblade X locals
          with a moderate player count, because it needs far fewer rounds than a full round robin
          while still separating the field by record.
        </p>
      </ArticleSection>

      <ArticleSection id="top-cut" title="Single and double elimination Top Cut">
        <p>
          "Top Cut" is the elimination bracket that follows a group stage, seeded by however the
          Swiss or round robin standings finished. In{" "}
          <strong>single elimination</strong>, one loss ends a player's run. In{" "}
          <strong>double elimination</strong>, a player has to lose twice — the first loss drops
          them to a losers' bracket instead of knocking them out outright, which gives a strong
          player who has one bad match a way back in.
        </p>
      </ArticleSection>

      <ArticleSection id="swiss-into-top-cut" title="Combining Swiss into Top Cut">
        <p>
          A very common event structure runs Swiss (or round robin) as a group stage to establish
          standings, then cuts to the top few players for an elimination Top Cut. This is exactly
          the shape Challonge brackets take when they're set up with a group stage: the group
          stage has its own format, and the bracket that follows is generally single or double
          elimination. It's also why the{" "}
          <Link className="text-primary underline" href="/articles/challonge-import-guide-for-organizers">
            Challonge import in this tool
          </Link>{" "}
          checks the group stage's own format rather than trusting the outer tournament type —
          the two stages aren't always the same format.
        </p>
      </ArticleSection>

      <ArticleSection id="recording-results" title="Recording results cleanly regardless of format">
        <p>
          Whatever format you're running, a few habits keep results legible after the event:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Label rounds consistently — "Swiss R3" reads differently than "Top Cut QF," so don't just write "Round 3" for both stages.</li>
          <li>Record scores, not just win/loss, if your format uses them — a 4-1 win and a 4-3 win aren't the same story.</li>
          <li>Note byes explicitly instead of leaving a blank round, so a card doesn't look like a missing match.</li>
          <li>Double-check any imported bracket data before publishing — see the Challonge guide for what does and doesn't come through automatically.</li>
        </ul>
        <p>
          The{" "}
          <Link className="text-primary underline" href="/tool">
            result card generator
          </Link>{" "}
          is built around this: it supports per-round records and scores whether you're entering a
          Swiss stage, a Top Cut bracket, or both on the same card.
        </p>
      </ArticleSection>

      <ArticleSection id="faq" title="FAQ">
        <p>
          <strong>Which format should a small local use?</strong> Round robin works cleanly under
          about eight players. Past that, Swiss into a small Top Cut is usually easier to finish
          in one session.
        </p>
        <p>
          <strong>Does deck size change with the format?</strong> No — deck size (3G/4G/5G/6G)
          and match format are independent settings an organizer chooses separately. See{" "}
          <Link className="text-primary underline" href="/articles/beyblade-x-deck-sizes-explained">
            deck sizes explained
          </Link>
          .
        </p>
      </ArticleSection>
    </ArticlePage>
  );
}
