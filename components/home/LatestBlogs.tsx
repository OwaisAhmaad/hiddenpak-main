"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { blogs } from "@/lib/data";

const latest = blogs.slice(0, 3);

const categoryColors: Record<string, "emerald" | "blue" | "orange" | "purple"> = {
  Trekking: "emerald",
  Culture: "blue",
  Adventure: "orange",
  "Road Trip": "purple",
  Wildlife: "emerald",
  Story: "blue",
};

export default function LatestBlogs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
              Travel Stories
            </span>
            <h2 className="section-title mt-2">Latest Blogs</h2>
            <p className="section-subtitle">
              Real stories from the trails, roads, and valleys of Pakistan.
            </p>
          </div>
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors whitespace-nowrap"
          >
            All blog posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={`/blogs/${blog.slug}`} className="group block">
                <div className="card h-full flex flex-col">
                  {/* Cover Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={categoryColors[blog.category] || "emerald"}
                      >
                        {blog.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Meta */}
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

                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors font-heading flex-1">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {blog.excerpt}
                    </p>

                    {/* Author */}
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
                        Read
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
