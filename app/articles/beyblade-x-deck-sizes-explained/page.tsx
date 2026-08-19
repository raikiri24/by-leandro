import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage, ArticleSection } from "@/components/site/article-page";
import { getArticle } from "@/lib/articles";

const meta = getArticle("beyblade-x-deck-sizes-explained")!;

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
  { id: "what-the-numbers-mean", label: "What the numbers mean" },
  { id: "why-size-matters", label: "Why deck size matters at events" },
  { id: "choosing-builds", label: "Choosing builds for each size" },
  { id: "building-in-the-tool", label: "Setting deck size in the tool" },
  { id: "faq", label: "FAQ" },
];

export default function Article() {
  return (
    <ArticlePage meta={meta} toc={toc}>
      <p>
        Beyblade X decks are usually described by a number-plus-G label — 3G, 4G, 5G, or 6G. It's
        a simple idea once you see it in practice, but it trips up new players who assume it
        refers to a generation of parts rather than the deck itself.
      </p>

      <ArticleSection id="what-the-numbers-mean" title="What the numbers mean">
        <p>
          The number in 3G/4G/5G/6G is how many separate Beyblade combos — builds — make up the
          deck you bring to a match. A 3G deck has three builds, a 6G deck has six. That's it. The
          deck builder on this site uses the same labels for exactly that reason: pick a size, and
          you get that many build slots to fill in.
        </p>
      </ArticleSection>

      <ArticleSection id="why-size-matters" title="Why deck size matters at events">
        <p>
          Organizers set the deck size for their event in the rules, because it directly affects
          match length and how much part variety a player needs. A 3G format keeps matches faster
          and lowers the part-collection bar for newer players. Larger formats like 5G or 6G give
          more room to counter-pick between rounds, but take longer to play and ask more of a
          player's collection.
        </p>
        <p>
          Deck size is a separate decision from the event's match format — Swiss, round robin, or
          elimination Top Cut. An organizer might run a 3G Swiss-into-Top-Cut event one week and a
          6G round robin the next; the two settings don't depend on each other. See{" "}
          <Link className="text-primary underline" href="/articles/beyblade-x-tournament-formats-explained">
            tournament formats explained
          </Link>{" "}
          for how those stages work.
        </p>
      </ArticleSection>

      <ArticleSection id="choosing-builds" title="Choosing builds for each size">
        <p>
          With fewer slots, each build in a 3G deck has to cover more ground — a common approach
          is to spread coverage across attack, defense, and stamina rather than stacking three
          similar builds. With more slots, a 5G or 6G deck has room for a matchup-specific pick or
          two that a 3G deck can't afford to carry.
        </p>
        <p>
          Remember that a deck can't reuse the same physical part across two builds — see{" "}
          <Link className="text-primary underline" href="/articles/beyblade-x-standard-vs-cx-builds">
            Standard vs. CX builds
          </Link>{" "}
          for what counts as a part — so a larger deck size also means you need a wider spread of
          Ratchets and Bits, not just more Blades.
        </p>
      </ArticleSection>

      <ArticleSection id="building-in-the-tool" title="Setting deck size in the tool">
        <p>
          Open the{" "}
          <Link className="text-primary underline" href="/deck-builder">
            deck builder
          </Link>
          , choose 3G/4G/5G/6G, and the tool adjusts the number of build slots to match. Shrinking
          the size keeps your existing builds and drops the extras; growing it adds new slots
          pre-filled with parts that aren't already used elsewhere in the deck, so you're not
          stuck untangling duplicate parts by hand.
        </p>
      </ArticleSection>

      <ArticleSection id="faq" title="FAQ">
        <p>
          <strong>Can I mix Standard and CX builds in one deck?</strong> Yes — deck size only
          controls how many build slots you have. Each slot can independently be Standard or CX.
        </p>
        <p>
          <strong>Does deck size affect the tournament's match format?</strong> No. Deck size and
          match format (Swiss, round robin, elimination) are set independently by whoever is
          organizing the event.
        </p>
        <p>
          <strong>What size should I use for a casual event?</strong> There's no universal answer
          — it depends on how much time you have and how deep your local's collections run.
          Smaller decks keep things moving; larger decks reward broader collections.
        </p>
      </ArticleSection>
    </ArticlePage>
  );
}
