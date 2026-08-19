import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage, ArticleSection } from "@/components/site/article-page";
import { getArticle } from "@/lib/articles";

const meta = getArticle("challonge-import-guide-for-organizers")!;

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
  { id: "what-you-paste-in", label: "What you paste in" },
  { id: "the-lookup-steps", label: "The four-step lookup the tool runs" },
  { id: "completed-matches-only", label: "What counts as a \"completed\" match" },
  { id: "group-stage-detection", label: "Swiss vs. Top Cut format detection" },
  { id: "manual-mode", label: "When to use Manual mode instead" },
  { id: "faq", label: "FAQ" },
];

export default function Article() {
  return (
    <ArticlePage meta={meta} toc={toc}>
      <p>
        The Challonge import in the{" "}
        <Link className="text-primary underline" href="/tool">
          card generator
        </Link>{" "}
        saves you from retyping a bracket by hand, but it's still fetching public web data, not
        calling a private database — so it's worth knowing what it actually does when a fetch
        fails or a match doesn't show up. This is a plain-language walkthrough of how it works.
      </p>

      <ArticleSection id="what-you-paste-in" title="What you paste in">
        <p>
          You can paste a full Challonge tournament URL or just its slug. The tool normalizes
          either into the same identifier: if the URL includes an organization subdomain — like{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-primary">org.challonge.com/mybracket</code>{" "}
          — it combines the subdomain and the bracket name into{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-primary">org-mybracket</code>,
          which matches how Challonge itself addresses organization brackets under its public
          endpoints.
        </p>
      </ArticleSection>

      <ArticleSection id="the-lookup-steps" title="The four-step lookup the tool runs">
        <p>
          Rather than relying on one endpoint that might be blocked or empty, the import runs
          through up to four fallbacks in order and stops at the first one that returns real data.
          You can see this happen live in the import log the tool shows you:
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Challonge's public JSON endpoint</strong> — the fastest path, used first for
            every bracket.
          </li>
          <li>
            <strong>The Challonge API</strong> — only attempted if this deployment has an API key
            configured; skipped otherwise. This step exists for brackets the public endpoint can't
            fully resolve.
          </li>
          <li>
            <strong>The bracket's embedded "module" data</strong> — Challonge's bracket page
            embeds a structured JSON blob used to render the bracket in your browser; the tool
            reads that directly when the earlier steps come back empty.
          </li>
          <li>
            <strong>A raw HTML fallback</strong> — as a last resort, it scans the bracket page's
            HTML for participant names, so you at least get a player list even if match data isn't
            recoverable.
          </li>
        </ol>
        <p>
          If all four fail, you'll get a clear error telling you Challonge denied access, with a
          pointer to Manual mode.
        </p>
      </ArticleSection>

      <ArticleSection id="completed-matches-only" title="What counts as a &quot;completed&quot; match">
        <p>
          Only matches Challonge itself marks complete, with a scored result, get imported. Byes,
          matches still in progress, and matches missing a score string are skipped — not because
          the tool ignores them, but because there's no reliable result to attach to a card yet.
          This is the most common reason an imported card looks like it's "missing" matches
          compared to the live bracket: the bracket has more matches queued than have actually
          finished.
        </p>
      </ArticleSection>

      <ArticleSection id="group-stage-detection" title="Swiss vs. Top Cut format detection">
        <p>
          Many Beyblade X brackets run a Swiss or round robin group stage that feeds into an
          elimination Top Cut — see{" "}
          <Link className="text-primary underline" href="/articles/beyblade-x-tournament-formats-explained">
            tournament formats explained
          </Link>{" "}
          for how that structure works. On Challonge, the outer tournament's declared type usually
          reflects the Top Cut (final) stage, not the group stage underneath it. If the import
          only trusted that outer type, a Swiss group stage could get mislabeled as an elimination
          round. To avoid that, the tool checks whether the bracket has groups and, if so, prefers
          the group's own declared format for labeling those matches.
        </p>
      </ArticleSection>

      <ArticleSection id="manual-mode" title="When to use Manual mode instead">
        <p>Switch to Manual mode when:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>The bracket is private, so none of the four lookup steps can see it.</li>
          <li>Challonge is rate-limiting or blocking automated requests to that bracket.</li>
          <li>Players were renamed mid-event and the imported names no longer match who actually played.</li>
          <li>You need to add context — like a bye or a disqualification — that Challonge's match data doesn't capture cleanly.</li>
        </ul>
        <p>
          Manual mode uses the same card layouts as an import, so switching over doesn't cost you
          any of the design work already done.
        </p>
      </ArticleSection>

      <ArticleSection id="faq" title="FAQ">
        <p>
          <strong>Does this require a Challonge account?</strong> No — it reads the same public
          bracket data anyone with the link could see.
        </p>
        <p>
          <strong>Is my bracket data stored anywhere?</strong> The import fetches data to build
          your card preview in the same request; it isn't written to a database. See the{" "}
          <Link className="text-primary underline" href="/privacy">
            privacy policy
          </Link>{" "}
          for what the site does store (anonymous usage totals and feedback you submit
          deliberately).
        </p>
        <p>
          <strong>Why did only some players show up?</strong> If every lookup step failed except
          the HTML fallback, you'll only get a participant list with no match results — that step
          exists purely so you're not starting from nothing.
        </p>
      </ArticleSection>
    </ArticlePage>
  );
}
