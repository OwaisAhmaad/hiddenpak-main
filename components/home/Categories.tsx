"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mountain,
  Waves,
  Sunset,
  TreePine,
  Building2,
  Wind,
  Globe,
  Layers,
} from "lucide-react";

const categories = [
  {
    name: "Mountains",
    icon: Mountain,
    gradient: "from-blue-900/60 to-blue-700/20",
    border: "border-blue-500/20 hover:border-blue-400/50",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    description: "Majestic peaks & glaciers",
  },
  {
    name: "Valleys",
    icon: Wind,
    gradient: "from-emerald-900/60 to-emerald-700/20",
    border: "border-emerald-500/20 hover:border-emerald-400/50",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    description: "Lush green valleys",
  },
  {
    name: "Lakes",
    icon: Waves,
    gradient: "from-cyan-900/60 to-cyan-700/20",
    border: "border-cyan-500/20 hover:border-cyan-400/50",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    description: "Pristine alpine lakes",
  },
  {
    name: "Historical",
    icon: Globe,
    gradient: "from-amber-900/60 to-amber-700/20",
    border: "border-amber-500/20 hover:border-amber-400/50",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    description: "Ancient ruins & forts",
  },
  {
    name: "Deserts",
    icon: Sunset,
    gradient: "from-orange-900/60 to-orange-700/20",
    border: "border-orange-500/20 hover:border-orange-400/50",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
    description: "Golden dunes & sands",
  },
  {
    name: "Forests",
    icon: TreePine,
    gradient: "from-green-900/60 to-green-700/20",
    border: "border-green-500/20 hover:border-green-400/50",
    iconColor: "text-green-400",
    iconBg: "bg-green-500/10",
    description: "Dense pine & cedar",
  },
  {
    name: "Cities",
    icon: Building2,
    gradient: "from-purple-900/60 to-purple-700/20",
    border: "border-purple-500/20 hover:border-purple-400/50",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
    description: "Culture & architecture",
  },
  {
    name: "Plateaus",
    icon: Layers,
    gradient: "from-rose-900/60 to-rose-700/20",
    border: "border-rose-500/20 hover:border-rose-400/50",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
    description: "High altitude plains",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold text-[#F97316] uppercase tracking-widest">
            Browse by Type
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mt-3 mb-4">
            Explore Categories
          </h2>
          <p className="text-[#F5F5DC]/60 text-base max-w-xl mx-auto">
            From towering peaks to ancient cities — find exactly the type of
            adventure that calls to you.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
              >
                <Link
                  href={`/places?category=${cat.name}`}
                  className="group block"
                >
                  <div
                    className={`relative bg-gradient-to-br ${cat.gradient} border ${cat.border} rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden`}
                  >
                    {/* Decorative background circle */}
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
                    <div className="absolute -right-2 -bottom-2 w-14 h-14 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 ${cat.iconBg} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`w-6 h-6 ${cat.iconColor}`} />
                    </div>

                    {/* Text */}
                    <h3 className="font-bold text-white text-base font-heading mb-1 group-hover:text-white transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#F5F5DC]/50 group-hover:text-[#F5F5DC]/70 transition-colors leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
