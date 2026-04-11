import Link from "next/link";
import {
  Compass,
  Mail,
  MapPin,
  Share2,
  AtSign,
  Camera,
  Play,
} from "lucide-react";

const exploreLinks = [
  { label: "Discover Places", href: "/places" },
  { label: "Travel Blog", href: "/blogs" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const categories = [
  "Trekking & Hiking",
  "Cultural Heritage",
  "Adventure Sports",
  "Hidden Valleys",
  "Mountain Lakes",
  "Wildlife Tours",
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#1F2937]">
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
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your ultimate guide to Pakistan&apos;s most breathtaking and
              undiscovered destinations. Explore beyond the tourist trail.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2, href: "#", label: "Facebook" },
                { icon: AtSign, href: "#", label: "Twitter" },
                { icon: Camera, href: "#", label: "Instagram" },
                { icon: Play, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
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
            <h4 className="text-white font-semibold font-heading mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#F97316] text-sm transition-colors duration-200 flex items-center gap-2 group"
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
            <h4 className="text-white font-semibold font-heading mb-5">
              Categories
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

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-5">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest travel stories delivered to your inbox.
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#14532D] transition-colors"
              />
              <button className="px-4 py-2.5 bg-[#F97316] hover:bg-[#EA6D0E] text-white rounded-xl text-sm font-medium transition-colors">
                Go
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                <span>hello@hiddenpak.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1F2937] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} HiddenPak. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
