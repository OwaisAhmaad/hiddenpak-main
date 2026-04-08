"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ZoomIn, MapPin } from "lucide-react";
import { galleryImages } from "@/lib/data";

const previewImages = galleryImages.slice(0, 6);

export default function GalleryPreview() {
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
              Visual Journey
            </span>
            <h2 className="section-title mt-2">Photo Gallery</h2>
            <p className="section-subtitle">
              A glimpse into the stunning landscapes and vibrant culture of
              Pakistan through our lens.
            </p>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors whitespace-nowrap"
          >
            View full gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {previewImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <div
                className={`relative w-full overflow-hidden rounded-2xl ${
                  img.height === "tall"
                    ? "h-80"
                    : img.height === "medium"
                    ? "h-56"
                    : "h-44"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span className="text-white text-xs font-medium">
                        {img.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
