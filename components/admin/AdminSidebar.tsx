"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Image,
  BarChart3,
  Settings,
  User,
  LogOut,
  Compass,
} from "lucide-react";
import { authService } from "@/lib/services/auth.service";

const navSections = [
  {
    section: "MAIN",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    section: "CONTENT",
    items: [
      { label: "Blog Posts", href: "/admin/blogs", icon: FileText },
      { label: "Places", href: "/admin/places", icon: MapPin },
      { label: "Gallery", href: "/admin/gallery", icon: Image },
    ],
  },
  {
    section: "SETTINGS",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Admin Profile", href: "/admin/profile", icon: User },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    authService.logout();
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 flex flex-col h-screen sticky top-0 bg-[#111827] border-r border-[#1F2937]">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#1F2937]">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#14532D] rounded-xl flex items-center justify-center flex-shrink-0">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-base tracking-tight">
            <span className="text-white">Hidden</span>
            <span className="text-[#F97316]">Pak</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto space-y-6">
        {navSections.map(({ section, items }) => (
          <div key={section}>
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest mb-2 px-3">
              {section}
            </p>
            <div className="space-y-0.5">
              {items.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#14532D]/20 text-white border-l-2 border-[#F97316] pl-[10px]"
                        : "text-[#F5F5DC]/70 hover:text-white hover:bg-[#1F2937] border-l-2 border-transparent pl-[10px]"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Info + Logout */}
      <div className="px-3 py-4 border-t border-[#1F2937]">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
          <div className="w-9 h-9 bg-[#14532D] rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-white text-sm font-medium truncate">Admin</p>
              <span className="text-[10px] font-semibold bg-[#F97316]/20 text-[#F97316] px-1.5 py-0.5 rounded-md">
                Admin
              </span>
            </div>
            <p className="text-[#6B7280] text-xs truncate">admin@hiddenpak.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:text-red-400 hover:bg-[#1F2937] transition-all duration-200 border-l-2 border-transparent"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
