"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mountain,
  LayoutDashboard,
  BookOpen,
  MapPin,
  Image,
  LogOut,
  Settings,
  Bell,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/blogs", icon: BookOpen, label: "Blogs" },
  { href: "/admin/places", icon: MapPin, label: "Places" },
  { href: "/admin/gallery", icon: Image, label: "Gallery" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-800">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-sm font-heading">
              HiddenPak
            </span>
            <p className="text-gray-500 text-xs">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3 px-2">
          Main Menu
        </p>
        <div className="space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3 px-2">
            System
          </p>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200">
              <Bell className="w-4 h-4" />
              Notifications
              <span className="ml-auto bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Admin User</p>
            <p className="text-gray-500 text-xs truncate">admin@hiddenpak.com</p>
          </div>
        </div>
        <Link
          href="/admin/login"
          className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
