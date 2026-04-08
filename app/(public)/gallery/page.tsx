"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ZoomIn, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/lib/data";

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prev = () =>
    setLightbox((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  const next = () =>
    setLightbox((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
              Visual Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2 mb-4">
              Photo Gallery
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Breathtaking moments captured across Pakistan&apos;s most stunning
              landscapes. Click any photo to view full size.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer"
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
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-between p-4">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="text-white text-xs font-medium truncate">
                        {img.location}
                      </span>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 ml-2">
                    <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
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
                src={galleryImages[lightbox].src.replace("w=600", "w=1200")}
                alt={galleryImages[lightbox].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
              {/* Caption */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-white text-sm">
                  {galleryImages[lightbox].location}
                </span>
                <span className="text-gray-400 text-sm">
                  — {lightbox + 1} / {galleryImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
