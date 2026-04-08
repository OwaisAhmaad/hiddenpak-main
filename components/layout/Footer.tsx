import Link from "next/link";
import { Mountain, Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { label: "Facebook", href: "#", initial: "f" },
  { label: "Instagram", href: "#", initial: "in" },
  { label: "Twitter", href: "#", initial: "x" },
  { label: "YouTube", href: "#", initial: "yt" },
];

const footerLinks = {
  explore: [
    { href: "/places", label: "All Places" },
    { href: "/places?region=gilgit-baltistan", label: "Gilgit-Baltistan" },
    { href: "/places?region=kpk", label: "Khyber Pakhtunkhwa" },
    { href: "/places?region=punjab", label: "Punjab" },
    { href: "/places?region=azad-kashmir", label: "Azad Kashmir" },
  ],
  blog: [
    { href: "/blogs", label: "All Blogs" },
    { href: "/blogs?category=trekking", label: "Trekking" },
    { href: "/blogs?category=culture", label: "Culture" },
    { href: "/blogs?category=adventure", label: "Adventure" },
    { href: "/blogs?category=road-trip", label: "Road Trips" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/gallery", label: "Gallery" },
    { href: "/admin/login", label: "Admin" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-heading">
                Hidden<span className="text-emerald-400">Pak</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Discover Pakistan&apos;s hidden gems — from the majestic Karakoram peaks
              to the ancient bazaars of Lahore. We share authentic travel stories
              to inspire your next adventure.
            </p>
            {/* Contact Info */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>hello@hiddenpak.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>+92 300 1234567</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h4 className="font-semibold text-white mb-4">Blog</h4>
            <ul className="space-y-2.5">
              {footerLinks.blog.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map(({ href, label, initial }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 bg-gray-800 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-colors text-gray-400 hover:text-white text-xs font-bold uppercase"
                  >
                    {initial}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-white mb-1">
                Subscribe to our newsletter
              </h4>
              <p className="text-sm text-gray-400">
                Get travel tips and hidden gems delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} HiddenPak. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="#" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
