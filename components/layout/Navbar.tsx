"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mountain } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/places", label: "Places" },
  { href: "/blogs", label: "Blogs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled && !isOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-soft"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xl font-bold font-heading transition-colors ${
                isTransparent ? "text-white" : "text-gray-900"
              }`}
            >
              Hidden<span className="text-emerald-600">Pak</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : isTransparent
                      ? "text-white/90 hover:text-white hover:bg-white/15"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin/login"
              className={`text-sm font-medium transition-colors ${
                isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Admin
            </Link>
            <Link
              href="/contact"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isTransparent
                ? "text-white hover:bg-white/15"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-gray-100 mt-3 flex flex-col gap-2">
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Admin Login
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary justify-center"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
