import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage, ArticleSection } from "@/components/site/article-page";
import { getArticle } from "@/lib/articles";

const meta = getArticle("designing-a-tournament-result-card-people-repost")!;

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
  { id: "stands-alone", label: "Start with what the image says on its own" },
  { id: "round-data", label: "Round-by-round data" },
  { id: "choosing-a-layout", label: "Choosing a card layout" },
  { id: "photos-and-logos", label: "Preparing photos and logos" },
  { id: "which-graphic", label: "Result card, pub mat, or winner post?" },
  { id: "common-mistakes", label: "Common mistakes" },
];

export default function Article() {
  return (
    <ArticlePage meta={meta} toc={toc}>
      <p>
        A tournament result card almost never stays where you posted it. It gets reposted into
        group chats, screenshotted, cropped, and shared without the caption you wrote to go with
        it. The difference between a card that communicates and one that just looks nice comes
        down to a handful of practical choices, not the color scheme.
      </p>

      <ArticleSection id="stands-alone" title="Start with what the image says on its own">
        <p>
          Before picking a design, make sure the tournament name, date, venue, player name, and
          final placement are all actually on the card. Ask yourself whether someone who only
          sees the image — no caption, no context — would understand what happened. If the answer
          is "only if they already know the event," add whatever's missing.
        </p>
      </ArticleSection>

      <ArticleSection id="round-data" title="Round-by-round data">
        <p>
          Enter wins, losses, scores, and opponents consistently round to round. If you imported
          the bracket from Challonge, review it before exporting — see{" "}
          <Link className="text-primary underline" href="/articles/challonge-import-guide-for-organizers">
            how Challonge import works
          </Link>{" "}
          for exactly which matches come through automatically and which ones (byes, renamed
          players, unscored matches) you'll need to fix by hand.
        </p>
      </ArticleSection>

      <ArticleSection id="choosing-a-layout" title="Choosing a card layout">
        <p>
          The{" "}
          <Link className="text-primary underline" href="/tool">
            card generator
          </Link>{" "}
          ships with several distinct layouts rather than one template with color swaps — a clean
          diagonal-striped report style, a retro scanline "arcade" look, an angular design with a
          full-height accent bar, a centered prestige layout for podium finishes, and a stripped-down
          minimal layout for when the data should do the talking. Pick based on where the card is
          going: a busy chat feed rewards higher contrast and fewer decorative elements, while a
          pinned event recap has more room for a showier layout.
        </p>
      </ArticleSection>

      <ArticleSection id="photos-and-logos" title="Preparing photos and logos">
        <p>
          Player photos and shop logos usually look better on a card with a clean or transparent
          background instead of their original background clashing with the card's own design.
          The{" "}
          <Link className="text-primary underline" href="/bg-remover">
            background remover
          </Link>{" "}
          processes images locally in your browser — nothing is uploaded to a server — so it's a
          fast step to run on a photo before dropping it into the card.
        </p>
      </ArticleSection>

      <ArticleSection id="which-graphic" title="Result card, pub mat, or winner post?">
        <p>
          These three graphic types solve different problems, and it's worth matching the right
          one to the moment:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Pub mat</strong> — a pre-event poster: shop details, schedule, entry fee, prizes, and sponsors. Post this before the event to drive turnout.</li>
          <li><strong>Result card</strong> — a per-player record: rounds, scores, and final placement. Post these during or right after the event.</li>
          <li><strong>Winner post</strong> — a single post-tournament announcement graphic built around the top finisher(s), meant for a wider social audience than the full standings.</li>
        </ul>
      </ArticleSection>

      <ArticleSection id="common-mistakes" title="Common mistakes">
        <ul className="list-disc space-y-2 pl-5">
          <li>Text sized for a desktop preview that turns unreadable once a phone feed shrinks the image.</li>
          <li>Logos placed close enough to names or scores that they visually merge at small sizes.</li>
          <li>Low-contrast text over a busy background image.</li>
          <li>Publishing an imported bracket result without checking it against the actual final standings first.</li>
        </ul>
        <p>
          Before downloading, shrink the preview down to roughly the size it'll actually be viewed
          at — a phone screen in a group chat — and check that the placement, name, and score are
          still legible.
        </p>
      </ArticleSection>
    </ArticlePage>
  );
}
