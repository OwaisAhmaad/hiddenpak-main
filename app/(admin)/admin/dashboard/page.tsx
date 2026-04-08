import AdminShell from "@/components/admin/AdminShell";
import { BookOpen, MapPin, Image, Eye, TrendingUp, Users, Plus, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { blogs, places } from "@/lib/data";

const stats = [
  {
    label: "Total Blogs",
    value: "24",
    change: "+3 this month",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-400",
    border: "border-blue-500/20",
  },
  {
    label: "Total Places",
    value: "18",
    change: "+2 this month",
    icon: MapPin,
    color: "bg-emerald-500/10 text-emerald-400",
    border: "border-emerald-500/20",
  },
  {
    label: "Gallery Photos",
    value: "142",
    change: "+12 this month",
    icon: Image,
    color: "bg-purple-500/10 text-purple-400",
    border: "border-purple-500/20",
  },
  {
    label: "Monthly Views",
    value: "48.2K",
    change: "+18% vs last month",
    icon: Eye,
    color: "bg-orange-500/10 text-orange-400",
    border: "border-orange-500/20",
  },
  {
    label: "Total Visitors",
    value: "12.5K",
    change: "+8% this week",
    icon: Users,
    color: "bg-pink-500/10 text-pink-400",
    border: "border-pink-500/20",
  },
  {
    label: "Engagement",
    value: "76%",
    change: "+5% vs last month",
    icon: TrendingUp,
    color: "bg-yellow-500/10 text-yellow-400",
    border: "border-yellow-500/20",
  },
];

const recentActivity = [
  { action: "Blog published", item: "Fairy Meadows Guide", time: "2 hours ago", type: "blog" },
  { action: "New place added", item: "Khaplu Valley", time: "5 hours ago", type: "place" },
  { action: "Gallery updated", item: "12 photos added", time: "1 day ago", type: "gallery" },
  { action: "Blog published", item: "Hunza in Bloom", time: "2 days ago", type: "blog" },
  { action: "Place updated", item: "Skardu — new images", time: "3 days ago", type: "place" },
];

export default function DashboardPage() {
  return (
    <AdminShell title="Dashboard">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white font-heading mb-1">
          Welcome back, Admin
        </h2>
        <p className="text-gray-400">
          Here&apos;s what&apos;s happening with HiddenPak today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-gray-800 rounded-2xl p-5 border ${stat.border}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-emerald-400 font-medium">{stat.change}</span>
            </div>
            <p className="text-3xl font-bold text-white font-heading mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white font-heading mb-5">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/admin/blogs"
              className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-emerald-600/20 border border-gray-600 hover:border-emerald-500/40 rounded-xl transition-all duration-200 group"
            >
              <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Plus className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors">
                New Blog Post
              </span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 ml-auto transition-colors" />
            </Link>
            <Link
              href="/admin/places"
              className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-emerald-600/20 border border-gray-600 hover:border-emerald-500/40 rounded-xl transition-all duration-200 group"
            >
              <div className="w-9 h-9 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Plus className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors">
                Add New Place
              </span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 ml-auto transition-colors" />
            </Link>
            <Link
              href="/admin/gallery"
              className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-emerald-600/20 border border-gray-600 hover:border-emerald-500/40 rounded-xl transition-all duration-200 group"
            >
              <div className="w-9 h-9 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Plus className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors">
                Upload Photos
              </span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 ml-auto transition-colors" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white font-heading mb-5">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activity.type === "blog"
                      ? "bg-blue-500/20"
                      : activity.type === "place"
                      ? "bg-emerald-500/20"
                      : "bg-purple-500/20"
                  }`}
                >
                  {activity.type === "blog" ? (
                    <BookOpen
                      className={`w-4 h-4 ${
                        activity.type === "blog" ? "text-blue-400" : ""
                      }`}
                    />
                  ) : activity.type === "place" ? (
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Image className="w-4 h-4 text-purple-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-300">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{activity.item}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div className="mt-6 bg-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white font-heading">
            Recent Blogs
          </h3>
          <Link
            href="/admin/blogs"
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-500 font-medium pb-3 pr-4">Title</th>
                <th className="text-left text-gray-500 font-medium pb-3 pr-4">Author</th>
                <th className="text-left text-gray-500 font-medium pb-3 pr-4">Category</th>
                <th className="text-left text-gray-500 font-medium pb-3 pr-4">Date</th>
                <th className="text-left text-gray-500 font-medium pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {blogs.slice(0, 5).map((blog) => (
                <tr key={blog.id} className="group">
                  <td className="py-3 pr-4 text-gray-300 font-medium max-w-xs truncate">
                    {blog.title}
                  </td>
                  <td className="py-3 pr-4 text-gray-400">{blog.author}</td>
                  <td className="py-3 pr-4">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium">
                      {blog.category}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-500">{blog.date}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-xs font-medium transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-medium transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
