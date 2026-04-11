"use client";

import AdminShell from "@/components/admin/AdminShell";
import {
  FileText,
  MapPin,
  Image,
  Eye,
  TrendingUp,
  BarChart3,
  Plus,
  ArrowRight,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { blogs, places, galleryImages } from "@/lib/data";

const statsCards = [
  {
    label: "Total Blogs",
    value: blogs.length,
    trend: "+12%",
    trendUp: true,
    icon: FileText,
    iconBg: "bg-[#14532D]/30",
    iconColor: "text-emerald-400",
    borderColor: "border-[#14532D]/30",
  },
  {
    label: "Total Places",
    value: places.length,
    trend: "+8%",
    trendUp: true,
    icon: MapPin,
    iconBg: "bg-[#F97316]/20",
    iconColor: "text-[#F97316]",
    borderColor: "border-[#F97316]/20",
  },
  {
    label: "Gallery Photos",
    value: galleryImages.length,
    trend: "+24%",
    trendUp: true,
    icon: Image,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
  },
  {
    label: "Total Views",
    value: "48.2K",
    trend: "+18%",
    trendUp: true,
    icon: Eye,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
];

const quickActions = [
  {
    label: "New Blog Post",
    description: "Write and publish a new travel blog",
    href: "/admin/blogs",
    icon: FileText,
    iconBg: "bg-[#F97316]/20",
    iconColor: "text-[#F97316]",
    hoverBorder: "hover:border-[#F97316]/40",
  },
  {
    label: "Add Place",
    description: "Add a new destination to HiddenPak",
    href: "/admin/places",
    icon: MapPin,
    iconBg: "bg-[#14532D]/30",
    iconColor: "text-emerald-400",
    hoverBorder: "hover:border-[#14532D]/40",
  },
  {
    label: "Upload Photos",
    description: "Add images to the gallery",
    href: "/admin/gallery",
    icon: Image,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    hoverBorder: "hover:border-blue-500/40",
  },
  {
    label: "View Analytics",
    description: "Check traffic and engagement stats",
    href: "/admin/analytics",
    icon: BarChart3,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    hoverBorder: "hover:border-purple-500/40",
  },
];

export default function DashboardPage() {
  const recentBlogs = blogs.slice(0, 5);

  return (
    <AdminShell title="Dashboard">
      {/* Welcome Banner */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">
          Welcome back, Admin
        </h2>
        <p className="text-[#6B7280] text-sm">
          Here&apos;s what&apos;s happening with HiddenPak today.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className={`bg-[#111827] rounded-2xl border ${card.borderColor} p-6`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-11 h-11 ${card.iconBg} rounded-xl flex items-center justify-center`}
              >
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <span
                className={`text-xs font-semibold flex items-center gap-1 ${
                  card.trendUp ? "text-emerald-400" : "text-red-400"
                }`}
              >
                <TrendingUp className="w-3 h-3" />
                {card.trend}
              </span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
            <p className="text-sm text-[#6B7280]">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Blog Posts Table */}
      <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Recent Blog Posts</h3>
          <Link
            href="/admin/blogs"
            className="text-sm text-[#F97316] hover:text-[#EA6D0E] transition-colors flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1F2937]">
                <th className="text-left text-[#6B7280] font-medium pb-3 pr-4">
                  Title
                </th>
                <th className="text-left text-[#6B7280] font-medium pb-3 pr-4 hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left text-[#6B7280] font-medium pb-3 pr-4 hidden md:table-cell">
                  Date
                </th>
                <th className="text-left text-[#6B7280] font-medium pb-3 pr-4 hidden lg:table-cell">
                  Status
                </th>
                <th className="text-left text-[#6B7280] font-medium pb-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2937]/60">
              {recentBlogs.map((blog) => (
                <tr key={blog.id} className="group">
                  <td className="py-3 pr-4 max-w-xs">
                    <p className="text-[#F5F5DC] font-medium truncate">
                      {blog.title}
                    </p>
                    <p className="text-[#6B7280] text-xs truncate sm:hidden">
                      {blog.category}
                    </p>
                  </td>
                  <td className="py-3 pr-4 hidden sm:table-cell">
                    <span className="px-2.5 py-1 bg-[#14532D]/20 text-emerald-400 rounded-lg text-xs font-medium">
                      {blog.category}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-[#6B7280] hidden md:table-cell">
                    {blog.date}
                  </td>
                  <td className="py-3 pr-4 hidden lg:table-cell">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium">
                      Published
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 bg-[#1F2937] hover:bg-blue-500/20 text-[#6B7280] hover:text-blue-400 rounded-lg transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-[#1F2937] hover:bg-red-500/20 text-[#6B7280] hover:text-red-400 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`bg-[#111827] border border-[#1F2937] ${action.hoverBorder} rounded-2xl p-5 hover:bg-[#1a2235] transition-all duration-200 group`}
            >
              <div
                className={`w-11 h-11 ${action.iconBg} rounded-xl flex items-center justify-center mb-4`}
              >
                <action.icon className={`w-5 h-5 ${action.iconColor}`} />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-semibold text-sm mb-1">
                    {action.label}
                  </p>
                  <p className="text-[#6B7280] text-xs leading-relaxed">
                    {action.description}
                  </p>
                </div>
                <Plus className="w-4 h-4 text-[#6B7280] group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
