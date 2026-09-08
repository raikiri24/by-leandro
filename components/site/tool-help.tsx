import Link from "next/link";

const help = {
  tool: {
    title: "From event results to a shareable graphic",
    copy: "Choose result cards, a promotional pub mat, or a winner post. Enter confirmed event information manually, or import a Challonge bracket and select a player. Review every name, stage, score and photo in the preview before downloading the JPG. A card documents the information you enter; it is not a live standings service or a verified player ranking.",
    limitation: "Keep a copy of your source results and download your work before leaving or reloading the editor. Imported matches can be incomplete, and a browser preview is not a saved tournament history. Use only images and player details you have permission to publish.",
    links: [["/articles/challonge-import-guide-for-organizers", "Importing and checking Challonge results"], ["/articles/designing-a-tournament-result-card-people-repost", "Making readable cards and posters"]],
  },
  "deck-builder": {
    title: "Document the deck you intend to play",
    copy: "Select 3G, 4G, 5G or 6G to set the number of builds, then choose Standard or CX for each slot. Standard uses a blade, ratchet and bit; CX uses a lock chip, main blade, optional armor, ratchet and bit. Ratchets and bits share one catalog across build types. Search each picker by part name and check the deck preview before exporting a JPG.",
    limitation: "Pickers hide part IDs already selected in another build. An integrated-ratchet blade does not use the separate ratchet selection. This is a catalog selection aid, not a guarantee of physical compatibility or tournament legality. Confirm your event rules and actual parts. Reducing deck size removes the extra build slots; export before leaving because decks are not saved to an account.",
    links: [["/articles/beyblade-x-standard-vs-cx-builds", "Understanding Standard and CX selections"], ["/articles/beyblade-x-deck-sizes-explained", "Choosing a deck size"]],
  },
  "bg-remover": {
    title: "Prepare a photo for your next card",
    copy: "Choose an image to run background removal in your browser. The first run downloads the processing model and may take longer than later runs. Compare the original and result, refine edges, and use Eraser, Restore or Lasso to correct the cutout. Choose a transparent or solid background and download a PNG when the result is ready.",
    limitation: "Automatic removal can miss hair, transparent objects or a subject that blends into its background. Large images can use substantial memory, especially on a phone. If processing fails, try a smaller image and check your connection for the model download. Keep the original; this site does not store an editable project for you.",
    links: [["/articles/background-removal-and-export", "Fixing edges and exporting a transparent image"], ["/tool", "Use the finished image in a tournament card"]],
  },
} as const;

export function ToolHelp({ tool }: { tool: keyof typeof help }) {
  const content = help[tool];
  return <aside aria-label="Tool instructions" className="border-t border-white/10 bg-[#090909] px-5 py-10 text-white">
    <div className="mx-auto max-w-3xl space-y-4 text-sm leading-7 text-white/80">
      <h2 className="font-condensed text-2xl font-black text-white">{content.title}</h2>
      <p>{content.copy}</p><p>{content.limitation}</p>
      <nav aria-label="Related tool help" className="flex flex-wrap gap-x-6 gap-y-3">
        {content.links.map(([href, label]) => <Link key={href} href={href} className="text-primary underline">{label}</Link>)}
        <Link href="/privacy" className="text-primary underline">Privacy</Link>
        <Link href="/terms" className="text-primary underline">Terms</Link>
        <Link href="/contact" className="text-primary underline">Contact</Link>
      </nav>
    </div>
  </aside>;
}
