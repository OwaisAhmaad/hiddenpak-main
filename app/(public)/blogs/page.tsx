"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { blogs } from "@/lib/data";

const categories = ["All", "Trekking", "Culture", "Adventure", "Road Trip", "Wildlife", "Story"];

const categoryColors: Record<string, "emerald" | "blue" | "orange" | "purple"> = {
  Trekking: "emerald",
  Culture: "blue",
  Adventure: "orange",
  "Road Trip": "purple",
  Wildlife: "emerald",
  Story: "blue",
};

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogs.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gray-900 pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
              Travel Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2 mb-4">
              Our Blog
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Honest travel stories, practical guides, and inspirational tales from
              Pakistan&apos;s most extraordinary places.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-soft"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing{" "}
          <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "post" : "posts"}
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
            >
              <Link href={`/blogs/${blog.slug}`} className="group block">
                <div className="card h-full flex flex-col bg-white">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant={categoryColors[blog.category] || "emerald"}>
                        {blog.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {blog.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.readTime}
                      </div>
                    </div>

                    <h2 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors font-heading flex-1">
                      {blog.title}
                    </h2>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={blog.authorImage}
                            alt={blog.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {blog.author}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                page === 1
                  ? "bg-emerald-600 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
