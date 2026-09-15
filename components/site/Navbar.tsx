"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { href: "/services", label: "SERVICES" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/journey", label: "JOURNEY" },
    { href: "/insights", label: "INSIGHTS" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl tracking-widest text-foreground hover:text-accent transition-colors">
          BYLD SPACE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-xs font-semibold tracking-[0.15em] text-secondaryText hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/contact" 
            className="text-xs font-bold tracking-[0.15em] bg-foreground text-background px-5 py-2.5 rounded-sm hover:bg-accent transition-colors"
          >
            START A PROJECT
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 flex flex-col p-6 overflow-y-auto">
          <nav className="flex flex-col gap-6 mt-8">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-lg font-display tracking-widest text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="mt-4 text-center font-bold tracking-[0.15em] bg-foreground text-background px-6 py-4 rounded-sm hover:bg-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              START A PROJECT
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
