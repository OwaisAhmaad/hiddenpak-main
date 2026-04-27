"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, BookOpen, Users, Camera, Compass } from "lucide-react";

const stats = [
  { icon: MapPin, value: "200+", label: "Places" },
  { icon: BookOpen, value: "50+", label: "Stories" },
  { icon: Users, value: "10K+", label: "Explorers" },
  { icon: Camera, value: "500+", label: "Photos" },
];

export default function HeroCTA() {
  return (
    <section className="py-24 bg-[#0B0F19] relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#14532D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F97316]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#111827] via-[#111827] to-[#0d1a10] border border-[#1F2937] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          {/* Inner decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#14532D]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F97316]/8 rounded-full blur-2xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#14532D]/20 border border-[#14532D]/40 text-[#22c55e] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Compass className="w-3.5 h-3.5" />
              Your Journey Awaits
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight mb-5">
              Ready to Discover{" "}
              <span className="text-gradient-orange">Hidden Pakistan?</span>
            </h2>

            <p className="text-[#F5F5DC]/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of explorers uncovering Pakistan&apos;s breathtaking
              landscapes, rich culture, and hidden gems — one adventure at a time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link
                href="/places"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 shadow-orange hover:shadow-lg hover:scale-105 text-base"
              >
                <MapPin className="w-5 h-5" />
                Explore Places
              </Link>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 bg-transparent border border-[#374151] hover:border-[#F97316]/60 text-[#F5F5DC] hover:text-[#F97316] font-semibold px-8 py-4 rounded-2xl transition-all duration-200 text-base hover:bg-[#F97316]/5"
              >
                <BookOpen className="w-5 h-5" />
                Read Stories
              </Link>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                    className="bg-[#0B0F19]/60 border border-[#1F2937] rounded-2xl p-4 text-center"
                  >
                    <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-5 h-5 text-[#F97316]" />
                    </div>
                    <p className="text-2xl font-bold text-white font-heading">
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
