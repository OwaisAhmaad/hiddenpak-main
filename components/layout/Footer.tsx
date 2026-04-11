"use client";

import Link from "next/link";
import { Compass, Mail, MapPin, Phone, Share2, AtSign, Camera, Play } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t, isRTL } = useLanguage();

  const exploreLinks = [
    { label: t("nav_places"), href: "/places" },
    { label: t("nav_blog"), href: "/blogs" },
    { label: t("nav_gallery"), href: "/gallery" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  const categories = [
    "Trekking & Hiking",
    "Cultural Heritage",
    "Adventure Sports",
    "Hidden Valleys",
    "Mountain Lakes",
    "Wildlife Tours",
  ];

  const socialLinks = [
    { icon: Share2, href: siteConfig.social.facebook, label: "Facebook" },
    { icon: AtSign, href: siteConfig.social.twitter, label: "Twitter / X" },
    { icon: Camera, href: siteConfig.social.instagram, label: "Instagram" },
    { icon: Play, href: siteConfig.social.youtube, label: "YouTube" },
  ];

  return (
    <footer className="bg-[#111827] border-t border-[#1F2937]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#14532D] rounded-xl flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading text-white">
                Hidden<span className="text-[#F97316]">Pak</span>
              </span>
            </Link>
            <p className={`text-gray-400 text-sm leading-relaxed mb-6 ${isRTL ? "font-[family-name:var(--font-urdu)]" : ""}`}>
              {t("footer_desc")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-[#1F2937] hover:bg-[#14532D] rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className={`text-white font-semibold font-heading mb-5 ${isRTL ? "font-[family-name:var(--font-urdu)]" : ""}`}>
              {t("footer_explore")}
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-gray-400 hover:text-[#F97316] text-sm transition-colors duration-200 flex items-center gap-2 group ${
                      isRTL ? "flex-row-reverse font-[family-name:var(--font-urdu)]" : ""
                    }`}
                  >
                    <span className="w-1 h-1 bg-[#F97316] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className={`text-white font-semibold font-heading mb-5 ${isRTL ? "font-[family-name:var(--font-urdu)]" : ""}`}>
              {t("footer_categories")}
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/places?category=${encodeURIComponent(cat)}`}
                    className="text-gray-400 hover:text-[#F97316] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#F97316] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <h4 className={`text-white font-semibold font-heading mb-5 ${isRTL ? "font-[family-name:var(--font-urdu)]" : ""}`}>
              {t("footer_newsletter")}
            </h4>
            <p className={`text-gray-400 text-sm mb-4 ${isRTL ? "font-[family-name:var(--font-urdu)]" : ""}`}>
              {t("footer_newsletter_desc")}
            </p>
            <div className={`flex gap-2 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <input
                type="email"
                placeholder={t("footer_newsletter_placeholder")}
                className="flex-1 px-3 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#14532D] transition-colors"
              />
              <button className={`px-4 py-2.5 bg-[#F97316] hover:bg-[#EA6D0E] text-white rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${isRTL ? "font-[family-name:var(--font-urdu)]" : ""}`}>
                {t("footer_newsletter_btn")}
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-400">
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <MapPin className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Mail className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Phone className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1F2937] py-6">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <p className={isRTL ? "font-[family-name:var(--font-urdu)]" : ""}>
            © {new Date().getFullYear()} HiddenPak. {t("footer_rights")}
          </p>
          <div className={`flex gap-5 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">{t("footer_privacy")}</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">{t("footer_terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
