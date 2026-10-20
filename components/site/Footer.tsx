import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link
            href="/"
            className="brand-wordmark"
            aria-label="BYLD SPACE home"
          >
            BYLD<span>SPACE</span>
          </Link>
          <p>
            Independent thinking.
            <br />
            Purpose-built software.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <p className="footer-label">EXPLORE</p>
          <Link href="/services">Services</Link>
          <Link href="/requirements">Requirements guide</Link>
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="footer-contact">
          <p className="footer-label">LET’S MAKE IT HAPPEN</p>
          <a href="mailto:paulleandrolanot@gmail.com">
            paulleandrolanot@gmail.com <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.facebook.com/byld.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find us on Facebook <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>BYLD SPACE © {new Date().getFullYear()}</p>
        <nav aria-label="Legal">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookie-policy">Cookies</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </nav>
        <span>BUILD WITH INTENTION.</span>
      </div>
    </footer>
  );
}
