export type ChangelogBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "rule" }
  | { type: "list"; items: string[] }
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "paragraph"; text: string };

function isTableRow(line: string) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function isTableRule(line: string) {
  return /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(line.trim());
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function parseChangelog(markdown: string): ChangelogBlock[] {
  const lines = markdown.split("\n");
  const blocks: ChangelogBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed === "---") {
      blocks.push({ type: "rule" });
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: trimmed.slice(4) });
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: trimmed.slice(3) });
      i++;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      // Top-level title is rendered by the page itself.
      i++;
      continue;
    }

    if (isTableRow(trimmed)) {
      const header = splitTableRow(trimmed);
      i++;
      if (i < lines.length && isTableRule(lines[i])) i++;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i].trim())) {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    blocks.push({ type: "paragraph", text: trimmed });
    i++;
  }

  return blocks;
}
