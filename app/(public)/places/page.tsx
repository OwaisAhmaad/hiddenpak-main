"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, ArrowRight, Star, Filter, Mountain, TreePine, Waves, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { places } from "@/lib/data";

const regions = ["All", "Gilgit-Baltistan", "Khyber Pakhtunkhwa", "Punjab", "Azad Kashmir"];
const categories = ["All", "Mountain", "Valley", "Lake", "Plateau", "Town", "City"];

const regionIcons: Record<string, React.ReactNode> = {
  Mountain: <Mountain className="w-4 h-4" />,
  Valley: <TreePine className="w-4 h-4" />,
  Lake: <Waves className="w-4 h-4" />,
  City: <Building2 className="w-4 h-4" />,
};

export default function PlacesPage() {
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = places.filter((p) => {
    const matchRegion = activeRegion === "All" || p.region === activeRegion;
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&q=80')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
              Discover Pakistan
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2 mb-4">
              Hidden Places
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Explore Pakistan&apos;s most breathtaking destinations — from Himalayan
              peaks to ancient Mughal cities.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-soft p-5 mb-10"
        >
          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search places..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Region Filter */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Region
            </p>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeRegion === region
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat !== "All" && regionIcons[cat]}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <p className="text-sm text-gray-500 mb-6">
          Showing{" "}
          <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "place" : "places"}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((place, idx) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <Link href={`/places/${place.slug}`} className="group block">
                <div className="card bg-white h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      {place.rating}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={
                          place.regionColor === "emerald"
                            ? "emerald"
                            : place.regionColor === "blue"
                            ? "blue"
                            : "orange"
                        }
                      >
                        {place.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-500">{place.region}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors font-heading">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                      {place.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">
                        {place.altitude && `Alt: ${place.altitude}`}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 group-hover:gap-2 transition-all">
                        Explore
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No places found matching your filters.</p>
            <button
              onClick={() => {
                setActiveRegion("All");
                setActiveCategory("All");
                setSearch("");
              }}
              className="mt-4 btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
