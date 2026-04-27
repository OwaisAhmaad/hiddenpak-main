"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Mountain,
  ArrowRight,
  CloudSun,
  Calendar,
  Navigation,
  ExternalLink,
  Compass,
} from "lucide-react";
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
  longDescription?: string;
  image?: string;
  gallery?: string[];
  altitude?: string;
  bestTime?: string;
}

const hardcodedReviews = [
  {
    initials: "JW",
    name: "James Worthington",
    location: "London, UK",
    rating: 5,
    date: "March 2025",
    comment:
      "Absolutely breathtaking. One of the most awe-inspiring places I have ever visited in my life. The sheer scale of the landscape leaves you speechless.",
    color: "bg-blue-600",
  },
  {
    initials: "YT",
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    rating: 5,
    date: "April 2025",
    comment:
      "A once-in-a-lifetime experience. The photos don't do it justice — you have to be there in person to truly feel the magnitude of the beauty here.",
    color: "bg-purple-600",
  },
  {
    initials: "MG",
    name: "Maria Gonzalez",
    location: "Madrid, Spain",
    rating: 5,
    date: "February 2025",
    comment:
      "Pakistan surprised me in every possible way. This place exceeded every expectation. The locals were incredibly warm and welcoming too.",
    color: "bg-rose-600",
  },
];

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const cls = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${cls} ${
            i <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-[#374151]"
          }`}
        />
      ))}
    </div>
  );
}

function SkeletonDetail() {
  return (
    <div className="min-h-screen bg-[#0B0F19] animate-pulse">
      <div className="h-[75vh] bg-[#111827]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-5">
          <div className="h-6 bg-[#1F2937] rounded w-1/3" />
          <div className="h-3 bg-[#1F2937] rounded w-full" />
          <div className="h-3 bg-[#1F2937] rounded w-full" />
          <div className="h-3 bg-[#1F2937] rounded w-3/4" />
        </div>
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl h-64" />
      </div>
    </div>
  );
}

export default function PlaceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    placesService
      .getBySlug(slug)
      .then((res) => {
        const item: Place = res?.data ?? res;
        if (!item || !item.name) {
          setNotFound(true);
        } else {
          setPlace(item);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <SkeletonDetail />;

  if (notFound || !place) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-center">
          <Compass className="w-16 h-16 text-[#374151] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white font-heading mb-2">
            Place Not Found
          </h1>
          <p className="text-[#6B7280] mb-6">
            This destination doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href="/places"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Places
          </Link>
        </div>
      </div>
    );
  }

  const mapsSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    place.name + " Pakistan"
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: place.name,
    description: place.description,
    image: place.image,
    address: {
      "@type": "PostalAddress",
      addressRegion: place.region,
      addressCountry: "PK",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: place.rating,
      bestRating: 5,
      ratingCount: 48,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#0B0F19]">
        {/* Full-Screen Hero */}
        <div className="relative h-[75vh] min-h-[520px]">
          <Image
            src={place.image || FALLBACK_IMAGE}
            alt={place.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/40 to-transparent" />

          {/* Back + Breadcrumb */}
          <div className="absolute top-24 left-4 sm:left-8 flex items-center gap-3">
            <Link
              href="/places"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Places
            </Link>
            <span className="text-white/40 text-sm hidden sm:block">
              / {place.region} / {place.name}
            </span>
          </div>

          {/* Title block */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-[#F97316] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {place.category}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#14532D]/90 border border-[#14532D] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <MapPin className="w-3 h-3" />
                  {place.region}, Pakistan
                </span>
                <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-xl">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {place.rating}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading mb-3 leading-tight">
                {place.name}
              </h1>
              <p className="text-[#F5F5DC]/70 text-lg max-w-2xl leading-relaxed">
                {place.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column (2/3) */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <section>
                <h2 className="text-2xl font-bold text-white font-heading mb-5 flex items-center gap-3">
                  <span className="w-1 h-7 bg-[#F97316] rounded-full inline-block" />
                  About {place.name}
                </h2>
                <p className="text-[#F5F5DC]/80 leading-relaxed text-lg">
                  {place.longDescription ?? place.description}
                </p>
              </section>

              {/* Photo Gallery */}
              {place.gallery && place.gallery.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white font-heading mb-5 flex items-center gap-3">
                    <span className="w-1 h-7 bg-[#F97316] rounded-full inline-block" />
                    Photo Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {place.gallery.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                          idx === 0 ? "col-span-2 row-span-2 h-64" : "h-28"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${place.name} ${idx + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-xl" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Map */}
              <section>
                <h2 className="text-2xl font-bold text-white font-heading mb-5 flex items-center gap-3">
                  <span className="w-1 h-7 bg-[#F97316] rounded-full inline-block" />
                  Location
                </h2>
                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden">
                  <div className="h-72 w-full">
                    <iframe
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=60%2C23%2C77%2C37&layer=mapnik&marker=${
                        place.region === "Gilgit-Baltistan"
                          ? "35.8884,74.5419"
                          : place.region === "Khyber Pakhtunkhwa"
                          ? "34.9526,72.3311"
                          : "31.5204,74.3587"
                      }`}
                      className="w-full h-full grayscale opacity-80"
                      style={{ border: 0 }}
                      loading="lazy"
                      title={`Map of ${place.name}`}
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Navigation className="w-4 h-4 text-[#F97316]" />
                      <span>
                        {place.name}, {place.region}, Pakistan
                      </span>
                    </div>
                    <a
                      href={mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F97316] hover:text-[#F97316]/80 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </section>

              {/* Reviews */}
              <section>
                <h2 className="text-2xl font-bold text-white font-heading mb-5 flex items-center gap-3">
                  <span className="w-1 h-7 bg-[#F97316] rounded-full inline-block" />
                  Traveller Reviews
                </h2>
                <div className="space-y-4">
                  {hardcodedReviews.map((review, i) => (
                    <div
                      key={i}
                      className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-11 h-11 ${review.color} rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm`}
                        >
                          {review.initials}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                            <div>
                              <p className="font-semibold text-white text-sm">
                                {review.name}
                              </p>
                              <p className="text-xs text-[#6B7280]">
                                {review.location}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <StarRating rating={review.rating} />
                              <span className="text-xs text-[#6B7280]">
                                {review.date}
                              </span>
                            </div>
                          </div>
                          <p className="text-[#F5F5DC]/70 text-sm leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-white font-heading mb-5">
                  Quick Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#14532D]/20 border border-[#14532D]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#22c55e]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-0.5">Region</p>
                      <p className="font-semibold text-[#F5F5DC] text-sm">
                        {place.region}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F97316]/10 border border-[#F97316]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mountain className="w-5 h-5 text-[#F97316]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-0.5">Category</p>
                      <p className="font-semibold text-[#F5F5DC] text-sm">
                        {place.category}
                      </p>
                    </div>
                  </div>

                  {place.altitude && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mountain className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7280] mb-0.5">
                          Altitude
                        </p>
                        <p className="font-semibold text-[#F5F5DC] text-sm">
                          {place.altitude}
                        </p>
                      </div>
                    </div>
                  )}

                  {place.bestTime && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7280] mb-0.5">
                          Best Time to Visit
                        </p>
                        <p className="font-semibold text-[#F5F5DC] text-sm">
                          {place.bestTime}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Rating</p>
                      <div className="flex items-center gap-2">
                        <StarRating rating={place.rating} size="md" />
                        <span className="font-semibold text-[#F5F5DC] text-sm">
                          {place.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Card */}
              <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center">
                    <CloudSun className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="font-bold text-white text-base">
                    Local Weather
                  </h3>
                </div>
                <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
                  Check current conditions before you travel — weather can
                  change rapidly in mountain regions.
                </p>
                <a
                  href={`https://www.weather.com/weather/today/l/${encodeURIComponent(
                    place.name + " Pakistan"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                >
                  Check Weather Forecast
                </a>
              </div>

              {/* Plan Your Visit CTA */}
              <div className="bg-gradient-to-br from-[#F97316] to-[#ea580c] rounded-2xl p-6 text-white">
                <Clock className="w-8 h-8 text-white/80 mb-3" />
                <h3 className="font-bold text-xl font-heading mb-2">
                  Plan Your Visit
                </h3>
                <p className="text-white/80 text-sm mb-5 leading-relaxed">
                  Ready to explore {place.name}? Our travel experts can help you
                  plan the perfect itinerary.
                </p>
                <Link
                  href="/contact"
                  className="block text-center bg-white text-[#F97316] font-bold py-3 rounded-xl hover:bg-white/90 transition-colors text-sm"
                >
                  Get in Touch
                </Link>
              </div>

              {/* Explore more */}
              <div>
                <h3 className="text-base font-bold text-white font-heading mb-4">
                  Explore More
                </h3>
                <Link
                  href="/places"
                  className="group flex items-center gap-3 p-3 bg-[#111827] border border-[#1F2937] rounded-xl hover:border-[#F97316]/40 transition-all"
                >
                  <div className="w-10 h-10 bg-[#F97316]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Compass className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#F5F5DC] text-sm group-hover:text-[#F97316] transition-colors">
                      All Destinations
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      Browse all places in Pakistan
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#374151] group-hover:text-[#F97316] transition-colors flex-shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
