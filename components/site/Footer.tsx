import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface mt-20">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-display font-bold text-2xl tracking-widest text-foreground">
              BYLD SPACE
            </Link>
            <p className="text-secondaryText text-sm max-w-xs">
              Ideas. Applications. Real Solutions.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display tracking-widest text-xs text-foreground uppercase mb-2">Navigation</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/services" className="text-sm text-secondaryText hover:text-foreground transition-colors">Services</Link>
              <Link href="/projects" className="text-sm text-secondaryText hover:text-foreground transition-colors">Projects</Link>
              <Link href="/journey" className="text-sm text-secondaryText hover:text-foreground transition-colors">Journey</Link>
              <Link href="/insights" className="text-sm text-secondaryText hover:text-foreground transition-colors">Insights</Link>
              <Link href="/about" className="text-sm text-secondaryText hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="text-sm text-secondaryText hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display tracking-widest text-xs text-foreground uppercase mb-2">Legal</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/privacy-policy" className="text-sm text-secondaryText hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-secondaryText hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-sm text-secondaryText hover:text-foreground transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-secondaryText hover:text-foreground transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondaryText text-center md:text-left">
            &copy; {new Date().getFullYear()} BYLD SPACE. All rights reserved.
          </p>
          <div className="text-xs font-display tracking-[0.2em] text-foreground opacity-50">
            BUILD · CREATE · AUTOMATE · EXPLORE
          </div>
        </div>
      </div>
    </footer>
  );
}
