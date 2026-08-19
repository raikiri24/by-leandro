import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage, ArticleSection } from "@/components/site/article-page";
import { getArticle } from "@/lib/articles";

const meta = getArticle("beyblade-x-standard-vs-cx-builds")!;

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
  { id: "standard-combo", label: "The Standard three-part combo" },
  { id: "cx-combo", label: "The CX five-part combo" },
  { id: "why-it-matters", label: "Why the split matters for deck building" },
  { id: "building-in-the-tool", label: "Building combos in the deck builder" },
  { id: "legality", label: "A note on legality at your event" },
];

export default function Article() {
  return (
    <ArticlePage meta={meta} toc={toc}>
      <p>
        Beyblade X combos are built one of two ways: a <strong>Standard</strong> combo (also
        labeled BX or UX depending on the release line) made from three parts, or a{" "}
        <strong>CX</strong> (Custom) combo made from five. Both end up as a spinning top you drop
        into a stadium, but they're assembled differently, and the deck builder on this site
        treats them as two distinct build types for that reason.
      </p>

      <ArticleSection id="standard-combo" title="The Standard three-part combo">
        <p>
          A Standard build is a <strong>Blade</strong>, a <strong>Ratchet</strong>, and a{" "}
          <strong>Bit</strong>, stacked and locked together:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Blade</strong> — the main body. Its shape and weight distribution decide
            whether the combo leans toward attack, defense, or stamina, and it's the part most
            people picture when they think "Beyblade."
          </li>
          <li>
            <strong>Ratchet</strong> — the middle piece between the blade and the bit. It sets the
            combo's height and how the bit's spin is transferred to the stadium floor, which
            changes how stable or aggressive the combo feels mid-battle.
          </li>
          <li>
            <strong>Bit</strong> — the tip that actually touches the stadium. Different bit shapes
            behave very differently: flatter bits tend to push hard and move a lot, rounder or
            ball-shaped bits move more freely, and narrower bits generally trade movement for
            longer spin time.
          </li>
        </ul>
        <p>
          Any Blade, Ratchet, and Bit from the Standard pool can be combined, which is why the
          deck builder here lets you pick each one independently instead of locking you into
          factory combos.
        </p>
      </ArticleSection>

      <ArticleSection id="cx-combo" title="The CX five-part combo">
        <p>
          CX combos split the blade itself into two pieces and add a locking piece, so a full CX
          build is five parts: <strong>Lock Chip</strong>, <strong>Main Blade</strong>,{" "}
          <strong>Armor</strong> (an Assist, Over, or Metal Blade), <strong>Ratchet</strong>, and{" "}
          <strong>Bit</strong>.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Lock Chip</strong> — a small piece that clips the Main Blade to the Ratchet
            stack. It's mostly structural, but it does add a bit of weight low in the combo.
          </li>
          <li>
            <strong>Main Blade</strong> — the core CX blade, playing the same role a Standard
            Blade does, but designed to accept a Lock Chip and an optional Armor piece instead of
            being one solid unit.
          </li>
          <li>
            <strong>Armor</strong> — an optional add-on that clips onto the Main Blade to change
            its weight distribution or outer profile without replacing the whole blade. This is
            the part with no Standard equivalent, which is why the deck builder shows it as its
            own picker and lets you leave it as "None."
          </li>
          <li>
            <strong>Ratchet</strong> and <strong>Bit</strong> — the same categories used in
            Standard builds. The parts pool is shared, so a Ratchet or Bit you like on a Standard
            combo works on a CX combo too.
          </li>
        </ul>
      </ArticleSection>

      <ArticleSection id="why-it-matters" title="Why the split matters for deck building">
        <p>
          Splitting the blade into a Main Blade plus an optional Armor piece means a single CX
          blade can be reused with different armor to shift its weight profile, instead of buying
          a whole new blade for a small change. It also means your deck's part pool is bigger:
          Ratchets and Bits are shared across Standard and CX combos, so a deck can mix build
          types across its slots.
        </p>
        <p>
          The deck builder enforces one physical-collection rule while you're planning a deck: it
          won't let two builds in the same deck claim the same physical part. If you've already
          used a Ratchet on build #1, it's hidden from the picker on build #2 — the same way you
          can't actually put one real Ratchet into two Beyblades on your table at once.
        </p>
      </ArticleSection>

      <ArticleSection id="building-in-the-tool" title="Building combos in the deck builder">
        <p>
          The <Link className="text-primary underline" href="/deck-builder">deck builder</Link>{" "}
          keeps this simple: pick your deck size, then for each build slot choose Standard or CX
          and fill in each part from a searchable list with a live image preview, so you can see
          what you're assembling instead of matching part codes from memory. When you're done,
          export a deck card sized for sharing.
        </p>
      </ArticleSection>

      <ArticleSection id="legality" title="A note on legality at your event">
        <p>
          What's legal to bring to a specific tournament — deck size, banned parts, Standard-only
          vs. CX-allowed — is set by the organizer running that event, and those rules do change
          over time as new parts release. Treat this article as a guide to how the parts system
          works, not as a ruling on what's allowed at your local. Check with your tournament
          organizer before assuming a combo is tournament-legal.
        </p>
      </ArticleSection>
    </ArticlePage>
  );
}
