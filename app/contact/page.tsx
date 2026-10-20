import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/site/ContactForm";
import { Facebook } from "lucide-react";

export const metadata = pageMetadata(
  "Send your project requirements",
  "Discuss custom software, HRIS, accounting, warehouse systems, or improvements to an existing application with BYLD SPACE.",
  "/contact",
);

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-[80vh]">
      <div className="container mx-auto px-4 md:px-8 py-20 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Column: Copy */}
        <div className="flex-1 lg:max-w-xl flex flex-col gap-6">
          <h1 className="font-display font-medium text-4xl md:text-6xl tracking-tight text-foreground">
            Let&apos;s build something.
          </h1>
          <p className="text-secondaryText text-sm leading-relaxed">
            Send your requirements for a new application, ERP system, feature
            request, or software improvement. Include the workflow, users,
            must-have features, and your target timeline. For HRIS, accounting,
            or warehouse systems, describe your approval rules and reports.
          </p>

          <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
            <h2 className="font-display tracking-widest text-xs text-foreground uppercase">
              Other ways to reach us
            </h2>
            <p className="text-secondaryText text-sm">
              Email:{" "}
              <a
                href="mailto:paulleandrolanot@gmail.com"
                className="text-foreground hover:underline"
              >
                paulleandrolanot@gmail.com
              </a>
            </p>
            <p className="text-secondaryText text-sm flex items-center gap-2">
              Facebook:{" "}
              <a
                href="https://www.facebook.com/byld.space"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline flex items-center gap-1.5"
              >
                <Facebook className="w-4 h-4 text-foreground/80" /> byld.space
              </a>
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="flex-1 bg-surface border border-border p-6 md:p-10 rounded-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
