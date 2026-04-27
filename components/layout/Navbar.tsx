"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Compass, Languages, Moon, Sun } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { t, lang, setLang, isRTL } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const navLinks = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_places"), href: "/places" },
    { label: t("nav_blog"), href: "/blogs" },
    { label: t("nav_gallery"), href: "/gallery" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0B0F19]/95 shadow-card" : "bg-transparent"
      } backdrop-blur-md border-b border-[#1F2937]/50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-16 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
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
          <nav
            className={`hidden lg:flex items-center gap-1 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isRTL ? "font-[family-name:var(--font-urdu)]" : ""
                } ${
                  pathname === link.href
                    ? "bg-[#14532D]/30 text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#1F2937]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div
            className={`flex items-center gap-2 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "ur" : "en")}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#1F2937] hover:bg-[#14532D]/40 border border-[#374151] hover:border-[#14532D] text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition-all duration-200"
              title={lang === "en" ? "Switch to Urdu" : "Switch to English"}
            >
              <Languages className="w-3.5 h-3.5" />
              <span
                className={
                  lang === "ur" ? "font-[family-name:var(--font-urdu)]" : ""
                }
              >
                {t("nav_lang_toggle")}
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 bg-[#1F2937] hover:bg-[#374151] border border-[#374151] hover:border-[#4B5563] text-gray-300 hover:text-white rounded-xl flex items-center justify-center transition-all duration-200"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Explore CTA */}
            <Link
              href="/places"
              className={`hidden sm:inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-5 py-2 rounded-xl text-sm transition-all duration-200 shadow-orange hover:shadow-lg ${
                isRTL
                  ? "font-[family-name:var(--font-urdu)] flex-row-reverse"
                  : ""
              }`}
            >
              <MapPin className="w-4 h-4" />
              {t("nav_explore")}
            </Link>

            {/* Mobile hamburger */}
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

      {/* Mobile Drawer — animated slide-in */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`lg:hidden overflow-hidden bg-[#111827] border-t border-[#1F2937] ${
              isRTL ? "text-right" : ""
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isRTL
                      ? "flex-row-reverse font-[family-name:var(--font-urdu)]"
                      : ""
                  } ${
                    pathname === link.href
                      ? "bg-[#14532D]/30 text-white"
                      : "text-gray-400 hover:text-white hover:bg-[#1F2937]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile lang + dark mode row */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setLang(lang === "en" ? "ur" : "en")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1F2937] hover:bg-[#14532D]/30 rounded-xl text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Languages className="w-4 h-4" />
                  <span
                    className={
                      lang === "ur" ? "font-[family-name:var(--font-urdu)]" : ""
                    }
                  >
                    {t("nav_lang_toggle")}
                  </span>
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="w-12 flex items-center justify-center bg-[#1F2937] hover:bg-[#374151] rounded-xl text-gray-300 hover:text-white transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              </div>

              <Link
                href="/places"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-center gap-2 mt-1 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors ${
                  isRTL
                    ? "flex-row-reverse font-[family-name:var(--font-urdu)]"
                    : ""
                }`}
              >
                <MapPin className="w-4 h-4" />
                {t("nav_explore")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
