import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Information about how BYLD SPACE uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col w-full min-h-[80vh]">
      <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
        <div className="mb-12 border-b border-border pb-8">
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground uppercase mb-4">
            Cookie Policy
          </h1>
          <p className="text-secondaryText text-sm tracking-widest uppercase">
            Last Updated: September 15, 2026
          </p>
        </div>

        <div className="prose prose-invert prose-p:text-secondaryText prose-h2:font-display prose-h2:text-foreground prose-h2:uppercase prose-h2:tracking-widest prose-h2:text-sm prose-h2:mt-12 prose-a:text-foreground prose-a:underline hover:prose-a:text-secondaryText">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work more efficiently, provide a better user experience, and provide 
            information to the owners of the site.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>
            BYLD SPACE uses cookies for the following purposes:
          </p>
          <ul>
            <li className="text-secondaryText"><strong className="text-foreground">Essential Cookies:</strong> These are required for the website to function properly, such as enabling security features or maintaining your session.</li>
            <li className="text-secondaryText"><strong className="text-foreground">Analytics Cookies:</strong> We use these to understand how visitors interact with our website. This helps us improve our content and the overall user experience.</li>
            <li className="text-secondaryText"><strong className="text-foreground">Preference Cookies:</strong> These remember your choices, such as language preferences or consent settings.</li>
          </ul>

          <h2>3. Third-Party Cookies</h2>
          <p>
            In some cases, we use trusted third-party services (like analytics providers) that may also place cookies 
            on your device. These third parties have their own privacy and cookie policies governing the use of this data.
          </p>

          <h2>4. Managing Your Cookie Preferences</h2>
          <p>
            You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies 
            can negatively impact your user experience, and parts of our website may no longer be fully accessible.
          </p>
          <p>
            Most browsers allow you to view, manage, delete, and block cookies for a website. You can find guidance on 
            how to control cookies for common browsers in their respective help documentation.
          </p>

          <h2>5. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
            operational, legal, or regulatory reasons. Please revisit this page periodically to stay informed about 
            our use of cookies.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:paulleandrolanot@gmail.com">paulleandrolanot@gmail.com</a>
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
