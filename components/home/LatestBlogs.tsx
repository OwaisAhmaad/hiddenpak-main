"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { blogsService } from "@/lib/services/blogs.service";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";

interface Blog {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  author?: string;
  category?: string;
  readTime?: string;
  date?: string;
}

function SkeletonCard() {
  return (
    <div className="bg-[#0B0F19] border border-[#1F2937] rounded-2xl overflow-hidden animate-pulse flex flex-col">
      <div className="h-52 bg-[#1F2937]" />
      <div className="p-5 space-y-3 flex-1">
        <div className="flex gap-3">
          <div className="h-3 bg-[#1F2937] rounded w-1/4" />
          <div className="h-3 bg-[#1F2937] rounded w-1/4" />
        </div>
        <div className="h-5 bg-[#1F2937] rounded w-3/4" />
        <div className="h-3 bg-[#1F2937] rounded w-full" />
        <div className="h-3 bg-[#1F2937] rounded w-2/3" />
        <div className="h-px bg-[#1F2937] rounded w-full mt-2" />
        <div className="flex justify-between items-center">
          <div className="h-3 bg-[#1F2937] rounded w-1/3" />
          <div className="h-3 bg-[#1F2937] rounded w-1/6" />
        </div>
      </div>
    </div>
  );
}

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsService
      .getAll({ limit: 3 })
      .then((res) => {
        const items: Blog[] = res?.data ?? res ?? [];
        setBlogs(items.slice(0, 3));
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-xs font-bold text-[#F97316] uppercase tracking-widest">
              Travel Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mt-3">
              Latest Travel Stories
            </h2>
            <p className="text-[#F5F5DC]/60 text-base mt-3 max-w-xl">
              Real experiences from the trails, roads, and valleys of Pakistan.
            </p>
          </div>
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-[#F97316] font-semibold hover:text-[#EA6D0E] transition-colors whitespace-nowrap text-sm"
          >
            All blog posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : blogs.map((blog, idx) => (
                <motion.div
                  key={blog._id ?? blog.id ?? idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="group block h-full"
                  >
                    <div className="bg-[#0B0F19] border border-[#1F2937] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                      {/* Cover Image */}
                      <div className="relative h-52 overflow-hidden flex-shrink-0">
                        <Image
                          src={blog.coverImage || FALLBACK_IMAGE}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 via-transparent to-transparent" />
                        {blog.category && (
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30">
                              {blog.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Meta */}
                        <div className="flex items-center gap-4 mb-3">
                          {blog.date && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Calendar className="w-3.5 h-3.5" />
                              {blog.date}
                            </div>
                          )}
                          {blog.readTime && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Clock className="w-3.5 h-3.5" />
                              {blog.readTime}
                            </div>
                          )}
                        </div>

                        <h3 className="font-bold text-white text-lg mb-3 line-clamp-2 group-hover:text-[#F97316] transition-colors font-heading flex-1">
                          {blog.title}
                        </h3>

                        {blog.excerpt && (
                          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                            {blog.excerpt}
                          </p>
                        )}

                        {/* Author + CTA */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1F2937]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-[#F97316]/20 border border-[#F97316]/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-[#F97316]" />
                            </div>
                            <span className="text-sm font-medium text-[#F5F5DC]/80">
                              {blog.author ?? "HiddenPak"}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#F97316] group-hover:gap-2 transition-all">
                            Read More
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-orange hover:shadow-lg"
          >
            View All Blogs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
