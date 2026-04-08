"use client";

import { motion } from "framer-motion";
import { Search, ArrowRight, MapPin, BookOpen, Image } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: MapPin, value: "50+", label: "Hidden Places" },
  { icon: BookOpen, value: "120+", label: "Travel Blogs" },
  { icon: Image, value: "500+", label: "Photos" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1920&q=90')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium px-4 py-2 rounded-full mb-6"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
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
          <span className="text-emerald-400">Hidden Gems</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-white/85 max-w-2xl mx-auto mb-10"
        >
          From untouched valleys to forgotten villages — uncover the breathtaking
          landscapes and rich culture that most travellers never see.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-2xl">
            <Search className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search places, blogs, destinations..."
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none py-2"
            />
            <button className="btn-primary text-sm px-5 py-2.5 flex-shrink-0">
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-emerald-500/30 hover:shadow-xl"
          >
            Explore Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/25 transition-all duration-200"
          >
            Read Blogs
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-8 sm:gap-12"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-emerald-400" />
                <span className="text-2xl font-bold text-white">{value}</span>
              </div>
              <p className="text-sm text-white/70">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
