"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  User,
  Compass,
} from "lucide-react";
import { blogs } from "@/lib/data";

const categories = [
  "All",
  "Trekking",
  "Culture",
  "Adventure",
  "Road Trip",
  "Wildlife",
  "Food",
  "Photography",
];

const categoryColors: Record<string, string> = {
  Trekking: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Culture: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Adventure: "bg-[#F97316]/20 text-[#F97316] border-[#F97316]/30",
  "Road Trip": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Wildlife: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Story: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  Food: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Photography: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, } },
};

function CategoryBadge({ category }: { category: string }) {
  const cls =
    categoryColors[category] ||
    "bg-[#F97316]/20 text-[#F97316] border-[#F97316]/30";
  return (
    <span
      className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${cls}`}
    >
      {category}
    </span>
  );
}

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogs.filter((b) => {
    const matchCat =
      activeCategory === "All" || b.category === activeCategory;
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/60 via-[#0B0F19]/60 to-[#0B0F19]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <BookOpen className="w-3.5 h-3.5" />
              Travel Stories & Guides
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-heading leading-tight mb-5">
              Stories from the{" "}
              <span className="text-[#F97316]">Mountains</span>
            </h1>
            <p className="text-[#F5F5DC]/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Honest travel guides, inspiring adventure stories, and cultural
              discoveries from Pakistan&apos;s most extraordinary corners.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-4">
        {/* ── Search + Filters ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stories, guides, authors..."
              className="w-full pl-11 pr-4 py-3.5 bg-[#111827] border border-[#1F2937] rounded-xl text-sm text-[#F5F5DC] placeholder-[#6B7280] focus:outline-none focus:border-[#F97316]/60 transition-colors"
            />
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-[#F97316] border-[#F97316] text-white"
                    : "bg-[#111827] border-[#1F2937] text-[#6B7280] hover:border-[#F97316]/50 hover:text-[#F5F5DC]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#6B7280]">
            Showing{" "}
            <span className="font-semibold text-[#F5F5DC]">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "story" : "stories"}
          </p>
        </div>

        {/* ── Blog Grid ──────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((blog) => (
              <motion.div key={blog.id} variants={cardVariants}>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group block h-full"
                >
                  <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-[#F97316]/40 hover:shadow-xl hover:shadow-[#F97316]/5">
                    {/* Cover Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <CategoryBadge category={blog.category} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                          <Calendar className="w-3.5 h-3.5" />
                          {blog.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                          <Clock className="w-3.5 h-3.5" />
                          {blog.readTime}
                        </div>
                      </div>

                      <h2 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-[#F97316] transition-colors font-heading flex-1 leading-snug">
                        {blog.title}
                      </h2>

                      <p className="text-sm text-[#6B7280] line-clamp-2 mb-5 leading-relaxed">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1F2937]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-[#F97316]/20 border border-[#F97316]/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-[#F97316]" />
                          </div>
                          <span className="text-sm font-medium text-[#F5F5DC]">
                            {blog.author}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F97316] group-hover:gap-3 transition-all duration-200">
                          Read More
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 bg-[#111827] border border-[#1F2937] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Compass className="w-10 h-10 text-[#6B7280]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-heading">
              No stories found
            </h3>
            <p className="text-[#6B7280] mb-6">
              Try a different category or search term.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearch("");
              }}
              className="bg-[#F97316] hover:bg-[#F97316]/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
