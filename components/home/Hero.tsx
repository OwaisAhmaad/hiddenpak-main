"use client";

import { motion } from "framer-motion";
import { Search, ArrowRight, MapPin, BookOpen, Users } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: MapPin, value: "200+", label: "Hidden Places" },
  { icon: BookOpen, value: "50+", label: "Travel Stories" },
  { icon: Users, value: "10K+", label: "Explorers" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586040458517-f5a49be12b95?w=1800&q=80')",
        }}
      />

      {/* Dark overlay with green tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/70 via-[#0B0F19]/60 to-[#0B0F19]/90" />

      {/* Subtle green glow in the middle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#14532D22_0%,_transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#111827]/70 backdrop-blur-sm border border-[#1F2937] text-[#F5F5DC] text-sm font-medium px-4 py-2 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
          Explore Pakistan Like Never Before
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white font-heading leading-tight mb-6"
        >
          Discover Pakistan&apos;s
          <br />
          <span className="text-gradient-orange">Hidden Gems</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#F5F5DC]/80 max-w-2xl mx-auto mb-10"
        >
          From untouched valleys to forgotten villages — uncover the
          breathtaking landscapes and rich culture that most travellers never
          see.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="flex items-center gap-3 bg-[#111827]/90 backdrop-blur-md border border-[#1F2937] rounded-2xl p-2 shadow-card">
            <Search className="w-5 h-5 text-gray-500 ml-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search destinations..."
              className="flex-1 bg-transparent text-[#F5F5DC] placeholder-gray-500 text-sm outline-none py-2"
            />
            <button className="bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors flex-shrink-0 shadow-orange">
              Search
            </button>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/places"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold rounded-2xl transition-all duration-200 shadow-orange hover:shadow-lg hover:-translate-y-0.5"
          >
            Explore Places
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-200"
          >
            Read Stories
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-0"
        >
          {stats.map(({ icon: Icon, value, label }, idx) => (
            <div
              key={label}
              className={`flex flex-col sm:flex-row items-center gap-3 px-8 py-4 ${
                idx < stats.length - 1
                  ? "border-r border-white/20"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#F97316]" />
                <span className="text-2xl font-bold text-white font-heading">
                  {value}
                </span>
              </div>
              <p className="text-sm text-white/60">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-1.5 h-1.5 bg-[#F97316] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
