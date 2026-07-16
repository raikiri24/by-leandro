import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { InfoPage } from "@/components/site/info-page";
import { parseChangelog } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Version history and recent updates to the tournament card generator.",
  alternates: { canonical: "/changelog" },
};

function renderInline(text: string, key: number) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <span key={key}>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-primary">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

export default function ChangelogPage() {
  const filePath = path.join(process.cwd(), "CHANGELOG.md");
  const markdown = fs.readFileSync(filePath, "utf-8");
  const blocks = parseChangelog(markdown);

  return (
    <InfoPage
      title="Changelog"
      intro="A running record of what changed in the tournament card generator, so returning organizers know what's new."
    >
      <div className="space-y-5">
        {blocks.map((block, index) => {
          if (block.type === "rule") {
            return <hr key={index} className="border-white/10" />;
          }
          if (block.type === "heading" && block.level === 2) {
            return (
              <h2 key={index} className="font-display text-3xl leading-none text-white">
                {block.text}
              </h2>
            );
          }
          if (block.type === "heading" && block.level === 3) {
            return (
              <h3 key={index} className="font-condensed text-lg font-black uppercase text-primary">
                {block.text}
              </h3>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={index} className="list-disc space-y-2 pl-5">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderInline(item, itemIndex)}</li>
                ))}
              </ul>
            );
          }
          if (block.type === "table") {
            return (
              <div key={index} className="overflow-x-auto rounded-md border border-white/10">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04]">
                      {block.header.map((cell, cellIndex) => (
                        <th key={cellIndex} className="px-3 py-2 font-condensed font-black uppercase text-white/70">
                          {renderInline(cell, cellIndex)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-white/5 last:border-0">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-3 py-2 align-top text-white/70">
                            {renderInline(cell, cellIndex)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return (
            <p key={index} className="leading-7">
              {renderInline(block.text, index)}
            </p>
          );
        })}
      </div>
    </InfoPage>
  );
}
