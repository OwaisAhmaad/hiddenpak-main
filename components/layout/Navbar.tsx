"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MapPin, Compass } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Places", href: "/places" },
  { label: "Blog", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0B0F19]/95 shadow-card" : "bg-transparent"
      } backdrop-blur-md border-b border-[#1F2937]/50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#14532D] rounded-xl flex items-center justify-center group-hover:bg-[#166534] transition-colors shadow-green">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-heading text-white">
              Hidden<span className="text-[#F97316]">Pak</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-[#14532D]/30 text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#1F2937]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/places"
              className="hidden sm:inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-5 py-2 rounded-xl text-sm transition-all duration-200 shadow-orange hover:shadow-lg"
            >
              <MapPin className="w-4 h-4" />
              Explore
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 bg-[#1F2937] rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#111827] border-t border-[#1F2937] px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-[#14532D]/30 text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#1F2937]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/places"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 mt-3 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Explore Now
          </Link>
        </div>
      )}
    </header>
  );
}
