"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ZoomIn, MapPin } from "lucide-react";
import { galleryService } from "@/lib/services/gallery.service";

interface GalleryImage {
  id?: string;
  _id?: string;
  imageUrl: string;
  caption?: string;
  location?: string;
  height?: "tall" | "medium" | "short";
  alt?: string;
}

function SkeletonItem({ tall }: { tall?: boolean }) {
  return (
    <div
      className={`break-inside-avoid rounded-2xl overflow-hidden animate-pulse bg-[#1F2937] border border-[#1F2937] ${
        tall ? "h-80" : "h-48"
      }`}
    />
  );
}

export default function GalleryPreview() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    galleryService
      .getAll(1, 8)
      .then((res) => {
        const items: GalleryImage[] = res?.data ?? res ?? [];
        setImages(items.slice(0, 8));
      })
      .catch(() => setImages([]))
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
              Visual Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mt-3">
              Photo Gallery
            </h2>
            <p className="text-[#F5F5DC]/60 text-base mt-3 max-w-xl">
              A glimpse into the stunning landscapes and vibrant culture of
              Pakistan through our lens.
            </p>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-[#F97316] font-semibold hover:text-[#EA6D0E] transition-colors whitespace-nowrap text-sm"
          >
            View full gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SkeletonItem key={i} tall={i % 3 === 0} />
              ))
            : images.map((img, idx) => (
                <motion.div
                  key={img._id ?? img.id ?? idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer border border-[#1F2937]"
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
                      src={img.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"}
                      alt={img.caption ?? img.location ?? "Pakistan landscape"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0B0F19]/0 group-hover:bg-[#0B0F19]/55 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-[#111827]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#1F2937]">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                        {img.location && (
                          <div className="flex items-center gap-1.5 bg-[#0B0F19]/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-[#1F2937]">
                            <MapPin className="w-3 h-3 text-[#F97316]" />
                            <span className="text-white text-xs font-medium">
                              {img.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
            href="/gallery"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-orange hover:shadow-lg"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
