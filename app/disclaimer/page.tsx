import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "General disclaimer regarding the information and services provided by BYLD SPACE.",
};

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col w-full min-h-[80vh]">
      <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
        <div className="mb-12 border-b border-border pb-8">
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground uppercase mb-4">
            Disclaimer
          </h1>
          <p className="text-secondaryText text-sm tracking-widest uppercase">
            Last Updated: September 15, 2026
          </p>
        </div>

        <div className="prose prose-invert prose-p:text-secondaryText prose-h2:font-display prose-h2:text-foreground prose-h2:uppercase prose-h2:tracking-widest prose-h2:text-sm prose-h2:mt-12 prose-a:text-foreground prose-a:underline hover:prose-a:text-secondaryText">
          <h2>1. General Information Only</h2>
          <p>
            The information provided by BYLD SPACE on this website and in our communications is for general 
            informational and educational purposes only. All information is provided in good faith, however, 
            we make no representation or warranty of any kind, express or implied, regarding the accuracy, 
            adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>

          <h2>2. Not Professional Advice</h2>
          <p>
            The technology, business, and software development information provided does not constitute 
            formal professional advice. While we strive to provide accurate explanations and insights, your 
            specific project requirements and business circumstances may vary. Before making any decisions based 
            on this information, we encourage you to consult with appropriate professionals or engage in a 
            formal consultation process with us.
          </p>

          <h2>3. External Links Disclaimer</h2>
          <p>
            Our website may contain links to external websites that are not provided or maintained by or in 
            any way affiliated with BYLD SPACE. Please note that we do not guarantee the accuracy, relevance, 
            timeliness, or completeness of any information on these external websites.
          </p>

          <h2>4. Case Studies and Results</h2>
          <p>
            Any case studies, project examples, or results presented on this website are illustrative of 
            our past work and experiences. They are not intended to represent or guarantee that current or 
            future clients will achieve the exact same or similar results. Every project is unique and subject 
            to varying factors.
          </p>

          <h2>5. Technology and AI</h2>
          <p>
            The fields of software development and Artificial Intelligence (AI) change rapidly. While we aim 
            to keep our content current, technologies and best practices may evolve faster than we can update 
            our materials. We are not liable for any outdated information or for decisions made based on it.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you require clarification regarding any information presented on this website, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:hello@byldspace.com">hello@byldspace.com</a>
          </p>
          
          <div className="mt-16 pt-8 border-t border-border">
            <Link href="/" className="text-sm font-semibold tracking-wider text-foreground hover:text-secondaryText transition-colors flex items-center gap-2">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
