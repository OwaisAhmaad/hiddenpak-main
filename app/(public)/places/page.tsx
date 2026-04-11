"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowRight,
  Star,
  Mountain,
  TreePine,
  Waves,
  Building2,
  SlidersHorizontal,
  Compass,
  Clock,
} from "lucide-react";
import { places } from "@/lib/data";

const regions = [
  "All Regions",
  "Gilgit-Baltistan",
  "Khyber Pakhtunkhwa",
  "Punjab",
  "Azad Kashmir",
  "Balochistan",
];

const categories = [
  "All Types",
  "Mountain",
  "Valley",
  "Lake",
  "Plateau",
  "Town",
  "City",
  "Forest",
  "Desert",
];

const categoryIcons: Record<string, React.ReactNode> = {
  Mountain: <Mountain className="w-3.5 h-3.5" />,
  Valley: <TreePine className="w-3.5 h-3.5" />,
  Lake: <Waves className="w-3.5 h-3.5" />,
  City: <Building2 className="w-3.5 h-3.5" />,
  Town: <Building2 className="w-3.5 h-3.5" />,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, } },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-[#374151]"
          }`}
        />
      ))}
    </div>
  );
}

export default function PlacesPage() {
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const [activeCategory, setActiveCategory] = useState("All Types");
  const [search, setSearch] = useState("");

  const filtered = places.filter((p) => {
    const matchRegion =
      activeRegion === "All Regions" || p.region === activeRegion;
    const matchCategory =
      activeCategory === "All Types" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.region.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/70 via-[#0B0F19]/60 to-[#0B0F19]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <Compass className="w-3.5 h-3.5" />
              Explore Pakistan
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-heading leading-tight mb-5">
              Discover Hidden{" "}
              <span className="text-[#F97316]">Pakistan</span>
            </h1>
            <p className="text-[#F5F5DC]/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              From the soaring peaks of the Karakoram to ancient Mughal cities —
              uncover{" "}
              <span className="text-[#F5F5DC] font-medium">
                {places.length} extraordinary destinations
              </span>{" "}
              across the most breathtaking country on Earth.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-4">
        {/* ── Search & Filters ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 mb-10 shadow-2xl"
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search places, regions, descriptions..."
              className="w-full pl-11 pr-4 py-3.5 bg-[#0B0F19] border border-[#1F2937] rounded-xl text-sm text-[#F5F5DC] placeholder-[#6B7280] focus:outline-none focus:border-[#F97316]/60 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Region */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B7280]" />
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">
                  Region
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      activeRegion === region
                        ? "bg-[#14532D] text-white border border-[#14532D]"
                        : "bg-[#0B0F19] text-[#6B7280] border border-[#1F2937] hover:border-[#14532D]/60 hover:text-[#F5F5DC]"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mountain className="w-3.5 h-3.5 text-[#6B7280]" />
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">
                  Category
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-[#F97316] text-white border border-[#F97316]"
                        : "bg-[#0B0F19] text-[#6B7280] border border-[#1F2937] hover:border-[#F97316]/50 hover:text-[#F5F5DC]"
                    }`}
                  >
                    {cat !== "All Types" && categoryIcons[cat]}
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#6B7280]">
            Showing{" "}
            <span className="font-semibold text-[#F5F5DC]">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "place" : "places"}
            {search && (
              <span>
                {" "}
                for &ldquo;<span className="text-[#F97316]">{search}</span>&rdquo;
              </span>
            )}
          </p>
          {(activeRegion !== "All Regions" ||
            activeCategory !== "All Types" ||
            search) && (
            <button
              onClick={() => {
                setActiveRegion("All Regions");
                setActiveCategory("All Types");
                setSearch("");
              }}
              className="text-xs text-[#F97316] hover:text-[#F97316]/80 transition-colors font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Grid ───────────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((place) => (
              <motion.div key={place.id} variants={cardVariants}>
                <Link
                  href={`/places/${place.slug}`}
                  className="group block h-full"
                >
                  <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-[#F97316]/40 hover:shadow-xl hover:shadow-[#F97316]/5">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={place.image}
                        alt={place.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent" />

                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 bg-[#F97316] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {categoryIcons[place.category]}
                          {place.category}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1.5 rounded-xl">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {place.rating}
                      </div>

                      {/* Region badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1 bg-[#14532D]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#14532D]">
                          <MapPin className="w-2.5 h-2.5" />
                          {place.region}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#F97316] transition-colors font-heading leading-snug">
                        {place.name}
                      </h3>
                      <p className="text-sm text-[#6B7280] line-clamp-2 mb-4 flex-1 leading-relaxed">
                        {place.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-4">
                        <StarRating rating={place.rating} />
                        <span className="text-xs text-[#6B7280]">
                          {place.rating}/5
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-4 pt-3 border-t border-[#1F2937]">
                        {place.altitude && (
                          <div className="flex items-center gap-1.5">
                            <Mountain className="w-3 h-3 text-[#6B7280]" />
                            <span className="text-xs text-[#6B7280]">
                              {place.altitude}
                            </span>
                          </div>
                        )}
                        {place.bestTime && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#6B7280]" />
                            <span className="text-xs text-[#6B7280]">
                              {place.bestTime}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F97316] group-hover:gap-3 transition-all duration-200 mt-auto">
                        Explore
                        <ArrowRight className="w-3.5 h-3.5" />
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
              No places found
            </h3>
            <p className="text-[#6B7280] mb-6">
              Try adjusting your search or filters to discover more destinations.
            </p>
            <button
              onClick={() => {
                setActiveRegion("All Regions");
                setActiveCategory("All Types");
                setSearch("");
              }}
              className="bg-[#F97316] hover:bg-[#F97316]/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
