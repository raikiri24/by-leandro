import { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you're trying to accomplish and we'll help you figure out the next step.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-[80vh]">
      <div className="container mx-auto px-4 md:px-8 py-20 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Copy */}
        <div className="flex-1 lg:max-w-xl flex flex-col gap-6">
          <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-foreground uppercase">
            Let&apos;s build something.
          </h1>
          <p className="text-secondaryText text-lg leading-relaxed">
            You don&apos;t need a technical plan. Tell us what you&apos;re trying to accomplish and we&apos;ll help you figure out the next step.
          </p>
          
          <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
            <h2 className="font-display tracking-widest text-xs text-foreground uppercase">Other ways to reach us</h2>
            <p className="text-secondaryText text-sm">
              Email: <a href="mailto:paulleandrolanot@gmail.com" className="text-foreground hover:underline">paulleandrolanot@gmail.com</a>
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
