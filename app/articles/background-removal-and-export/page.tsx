import Link from "next/link";
import { ArticlePage, ArticleSection } from "@/components/site/article-page";
import { getArticle } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

const meta = getArticle("background-removal-and-export")!;
export const metadata = pageMetadata(meta.title, meta.description, `/articles/${meta.slug}`, true);

export default function BackgroundRemovalGuide() {
  return <ArticlePage meta={meta} toc={[
    { id: "start", label: "Choose and process an image" },
    { id: "edges", label: "Correct the cutout" },
    { id: "export", label: "Choose the right export" },
    { id: "trouble", label: "When processing fails" },
  ]}>
    <p>A clean player photo can make a winner post easier to read, but automatic background removal needs a visual check. This walkthrough follows the controls in this site’s <Link href="/bg-remover" className="text-primary underline">background remover</Link> so you can correct the image before adding it to an event graphic.</p>
    <ArticleSection id="start" title="Choose and process an image">
      <p>Start with a photo you have permission to use. Choose the image in the background remover and wait for processing to finish. The image is processed in your browser; the application downloads the removal model from IMG.LY’s asset service. A network connection is needed for that download even though your photo is not sent to a removal API.</p>
      <p>Use the before-and-after comparison to inspect the subject’s outline. Check hair, fingers, glasses and gaps between the subject and nearby objects. The automatic result is a starting point: a background with similar colors to the subject can leave unwanted areas or remove something you wanted to keep.</p>
    </ArticleSection>
    <ArticleSection id="edges" title="Correct the cutout">
      <ol className="list-decimal space-y-3 pl-5">
        <li>Adjust edge crispness while viewing the comparison. Check that the outline looks natural rather than simply choosing the strongest setting.</li>
        <li>Use Eraser to remove leftover background. Start with a smaller brush near the subject so a stroke does not erase useful detail.</li>
        <li>Use Restore to paint back a part of the original image that removal cut away. Restore can bring background pixels back too, so inspect the area again.</li>
        <li>Use Lasso for an area you can outline, then finish editing to return to the comparison. Undo is available during manual editing; the editor keeps up to 30 snapshots.</li>
      </ol>
      <p>During manual editing, Ctrl/Cmd+Z undoes a stroke, the square bracket keys change brush size, and Escape finishes editing. Brightness, contrast and the other image adjustments change the image’s appearance; they do not replace checking the cutout itself.</p>
    </ArticleSection>
    <ArticleSection id="export" title="Choose the right export">
      <p>Choose a transparent background when the subject should sit over a tournament-card design. The checkerboard preview represents transparency; it is not artwork added to the PNG. Choose a solid background when you want a finished image with that color already included.</p>
      <p>Download the PNG and inspect the saved file. Then open the <Link href="/tool" className="text-primary underline">card generator</Link>, select the relevant photo input and use that PNG. The final tournament graphic is exported as a JPG, so its finished background is part of the image rather than transparent.</p>
      <p>Keep your original and the exported PNG. There is no account project history to recover an editing session after closing or reloading the page. For placement and readability, continue with the <Link href="/articles/designing-a-tournament-result-card-people-repost" className="text-primary underline">result-card design guide</Link>.</p>
    </ArticleSection>
    <ArticleSection id="trouble" title="When processing fails">
      <p>If the first run stalls, check whether the model download is blocked by your connection or browser extensions. Large images and repeated manual edits consume memory; on a phone, retry with a smaller copy and close other heavy tabs. Avoid reloading until you have saved any result you want to keep.</p>
      <p>If an export looks wrong, compare the original, the current preview and the saved PNG to locate where the difference begins. Report the browser, device, approximate image dimensions and the failing step through <Link href="/contact" className="text-primary underline">Contact</Link>. You do not need to send a private photo to describe a problem.</p>
    </ArticleSection>
  </ArticlePage>;
}
