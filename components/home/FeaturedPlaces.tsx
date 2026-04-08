"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { places } from "@/lib/data";

const featured = places.slice(0, 4);

export default function FeaturedPlaces() {
  return (
    <section className="py-20 bg-white">
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
              Top Destinations
            </span>
            <h2 className="section-title mt-2">Featured Places</h2>
            <p className="section-subtitle">
              Handpicked destinations that showcase Pakistan&apos;s incredible
              natural and cultural diversity.
            </p>
          </div>
          <Link
            href="/places"
            className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors whitespace-nowrap"
          >
            View all places
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((place, idx) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={`/places/${place.slug}`} className="group block">
                <div className="card">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Rating */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      {place.rating}
                    </div>
                    {/* Category */}
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

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-500">{place.region}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors font-heading">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {place.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        Best: {place.bestTime}
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
      </div>
    </section>
  );
}
