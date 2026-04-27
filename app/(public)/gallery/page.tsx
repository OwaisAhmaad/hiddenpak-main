"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ZoomIn, MapPin, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
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

const filterTabs = [
  "All",
  "Mountains",
  "Valleys",
  "Lakes",
  "Culture",
  "Wildlife",
];

function matchesFilter(
  location: string,
  caption: string,
  filter: string
): boolean {
  if (filter === "All") return true;
  const combined = (location + " " + caption).toLowerCase();
  const map: Record<string, string[]> = {
    Mountains: ["mountain", "peak", "karakoram", "nanga", "k2", "skardu", "fairy"],
    Valleys: ["valley", "swat", "hunza", "naran", "kaghan", "gilgit"],
    Lakes: ["lake", "attabad", "sheosar", "satpara"],
    Culture: ["lahore", "fort", "city", "town", "murree"],
    Wildlife: ["deosai", "wildlife", "forest", "national park"],
  };
  return (map[filter] || []).some((kw) => combined.includes(kw));
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

export default function GalleryPage() {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    galleryService
      .getAll(1, 50)
      .then((res) => {
        const items: GalleryImage[] = res?.data ?? res ?? [];
        setAllImages(items);
      })
      .catch(() => setAllImages([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = allImages.filter((img) =>
    matchesFilter(img.location ?? "", img.caption ?? "", activeFilter)
  );

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prev = () =>
    setLightbox((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    );
  const next = () =>
    setLightbox((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    );

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/55 via-[#0B0F19]/55 to-[#0B0F19]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <Camera className="w-3.5 h-3.5" />
              Visual Stories
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-heading leading-tight mb-5">
              Photo{" "}
              <span className="text-[#F97316]">Gallery</span>
            </h1>
            <p className="text-[#F5F5DC]/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Breathtaking moments captured across{" "}
              <span className="text-[#F5F5DC]">Pakistan&apos;s</span> most
              stunning landscapes. Click any photo to view full size.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-4">
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 flex-wrap mb-10"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                activeFilter === tab
                  ? "bg-[#F97316] border-[#F97316] text-white"
                  : "bg-[#111827] border-[#1F2937] text-[#6B7280] hover:border-[#F97316]/50 hover:text-[#F5F5DC]"
              }`}
            >
              {tab}
            </button>
          ))}
          {!loading && (
            <span className="ml-auto text-sm text-[#6B7280]">
              <span className="text-[#F5F5DC] font-semibold">{filtered.length}</span>{" "}
              photos
            </span>
          )}
        </motion.div>

        {/* Masonry Grid */}
        {loading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonItem key={i} tall={i % 3 === 0} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            >
              {filtered.map((img, idx) => (
                <motion.div
                  key={img._id ?? img.id ?? idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer border border-[#1F2937] hover:border-[#F97316]/40 transition-all duration-300"
                  onClick={() => openLightbox(idx)}
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
                      src={img.imageUrl}
                      alt={img.caption ?? img.location ?? "Pakistan landscape"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                    {/* Hover content */}
                    <div className="absolute inset-0 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1.5 max-w-[calc(100%-2.5rem)]">
                        <MapPin className="w-3 h-3 text-[#F97316] flex-shrink-0" />
                        <span className="text-white text-xs font-medium truncate">
                          {img.location ?? img.caption ?? "Pakistan"}
                        </span>
                      </div>
                      <div className="w-9 h-9 bg-[#F97316] rounded-full flex items-center justify-center flex-shrink-0">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <Camera className="w-16 h-16 text-[#1F2937] mx-auto mb-4" />
            <p className="text-[#6B7280] text-lg">
              No photos in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 w-11 h-11 bg-white/10 hover:bg-[#F97316] rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full z-10">
              {lightbox + 1} / {filtered.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-[#F97316] rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-[#F97316] rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].imageUrl}
                alt={filtered[lightbox].caption ?? filtered[lightbox].location ?? "Pakistan landscape"}
                fill
                className="object-contain"
                sizes="100vw"
              />
              {/* Caption */}
              {(filtered[lightbox].location || filtered[lightbox].caption) && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-sm border border-white/10 px-5 py-2.5 rounded-full whitespace-nowrap">
                  <MapPin className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
                  <span className="text-white text-sm font-medium">
                    {filtered[lightbox].location ?? filtered[lightbox].caption}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
