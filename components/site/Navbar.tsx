"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => {
      if (desktop.matches) dialog.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);
  const closeMenu = () => dialog.current?.close();

  return (
    <header
      className={`site-header${pathname === "/" ? " site-header-home" : ""}`}
    >
      <div className="nav-inner">
        <Link href="/" className="brand-wordmark" aria-label="BYLD SPACE home">
          BYLD<span>SPACE</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-project">
          Start a project <ArrowUpRight size={16} />
        </Link>
        <button
          className="mobile-menu-button"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label="Open menu"
          onClick={() => {
            dialog.current?.showModal();
            setIsOpen(true);
          }}
        >
          Menu
        </button>
      </div>
      <dialog
        id="mobile-navigation"
        className="mobile-menu"
        ref={dialog}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
        aria-label="Navigation menu"
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <Link href="/" className="brand-wordmark" onClick={closeMenu}>
              BYLD<span>SPACE</span>
            </Link>
            <button
              onClick={closeMenu}
              className="menu-close"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? "page"
                    : undefined
                }
                onClick={closeMenu}
              >
                <span>0{index + 1}</span>
                {link.label}
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </nav>
          <Link className="button-primary" href="/contact" onClick={closeMenu}>
            Start your project <ArrowUpRight size={16} />
          </Link>
          <p className="mobile-menu-note">
            Independent thinking. Purpose-built software.
          </p>
        </div>
      </dialog>
    </header>
  );
}
