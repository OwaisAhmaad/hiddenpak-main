"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogs } from "@/lib/data";

const latest = blogs.slice(0, 3);

export default function LatestBlogs() {
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
          {latest.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                <div className="bg-[#0B0F19] border border-[#1F2937] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Cover Image */}
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 via-transparent to-transparent" />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {blog.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.readTime}
                      </div>
                    </div>

                    <h3 className="font-bold text-white text-lg mb-3 line-clamp-2 group-hover:text-[#F97316] transition-colors font-heading flex-1">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {blog.excerpt}
                    </p>

                    {/* Author + CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1F2937]">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={blog.authorImage}
                            alt={blog.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-[#F5F5DC]/80">
                          {blog.author}
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
