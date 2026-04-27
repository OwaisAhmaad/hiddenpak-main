"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Star } from "lucide-react";
import { placesService } from "@/lib/services/places.service";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";

interface Place {
  _id: string;
  name: string;
  slug: string;
  region: string;
  category: string;
  rating: number;
  description: string;
  image?: string;
  bestTime?: string;
}

function SkeletonCard() {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden animate-pulse">
      <div className="h-52 bg-[#1F2937]" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-[#1F2937] rounded w-1/3" />
        <div className="h-5 bg-[#1F2937] rounded w-3/4" />
        <div className="h-3 bg-[#1F2937] rounded w-full" />
        <div className="h-3 bg-[#1F2937] rounded w-2/3" />
        <div className="h-px bg-[#1F2937] rounded w-full mt-2" />
        <div className="flex justify-between">
          <div className="h-3 bg-[#1F2937] rounded w-1/4" />
          <div className="h-3 bg-[#1F2937] rounded w-1/6" />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedPlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    placesService
      .getAll({ limit: 6 })
      .then((res) => {
        const items: Place[] = res?.data ?? res ?? [];
        setPlaces(items.slice(0, 6));
      })
      .catch(() => setPlaces([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-[#0B0F19]">
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
              Popular Destinations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mt-3">
              Featured Places
            </h2>
            <p className="text-[#F5F5DC]/60 text-base mt-3 max-w-xl">
              Handpicked destinations that showcase Pakistan&apos;s incredible
              natural and cultural diversity.
            </p>
          </div>
          <Link
            href="/places"
            className="flex items-center gap-2 text-[#F97316] font-semibold hover:text-[#EA6D0E] transition-colors whitespace-nowrap text-sm"
          >
            View all destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : places.map((place, idx) => (
                <motion.div
                  key={place._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link href={`/places/${place.slug}`} className="group block">
                    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={place.image || FALLBACK_IMAGE}
                          alt={place.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent" />

                        {/* Rating */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#0B0F19]/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          {place.rating ?? "–"}
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30">
                            {place.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-1.5 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                          <span className="text-xs text-gray-500">
                            {place.region}
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#F97316] transition-colors font-heading">
                          {place.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                          {place.description}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-[#1F2937]">
                          {place.bestTime ? (
                            <span className="text-xs text-gray-600">
                              Best: {place.bestTime}
                            </span>
                          ) : (
                            <span />
                          )}
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#F97316] group-hover:gap-2 transition-all">
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/places"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-orange hover:shadow-lg"
          >
            View All Destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
