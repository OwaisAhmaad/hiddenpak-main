import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Clock, Thermometer, Mountain, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { places } from "@/lib/data";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}

export default function PlaceDetailPage({ params }: Props) {
  const place = places.find((p) => p.slug === params.slug);
  if (!place) notFound();

  const related = places.filter((p) => p.id !== place.id && p.region === place.region).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[65vh] min-h-[450px]">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        {/* Back */}
        <div className="absolute top-24 left-4 sm:left-8">
          <Link
            href="/places"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Places
          </Link>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
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
              <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1 rounded-xl">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {place.rating}
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-2">
              {place.name}
            </h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{place.region}, Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4">
              About {place.name}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {place.longDescription}
            </p>

            {/* Image Gallery */}
            <h3 className="text-xl font-bold text-gray-900 font-heading mb-5">
              Photo Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              {place.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-xl cursor-pointer group ${
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <h3 className="text-xl font-bold text-gray-900 font-heading mb-5">
              Location Map
            </h3>
            <div className="bg-gray-100 rounded-2xl h-64 flex flex-col items-center justify-center border border-gray-200 gap-3">
              <MapPin className="w-10 h-10 text-gray-300" />
              <p className="text-gray-400 font-medium">{place.name}, {place.region}</p>
              <p className="text-sm text-gray-400">Interactive map coming soon</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 font-heading mb-5">
                Quick Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Region</p>
                    <p className="font-semibold text-gray-900">{place.region}</p>
                  </div>
                </div>
                {place.altitude && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mountain className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Altitude</p>
                      <p className="font-semibold text-gray-900">{place.altitude}</p>
                    </div>
                  </div>
                )}
                {place.bestTime && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Best Time to Visit</p>
                      <p className="font-semibold text-gray-900">{place.bestTime}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Rating</p>
                    <p className="font-semibold text-gray-900">{place.rating} / 5.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg font-heading mb-2">
                Plan Your Visit
              </h3>
              <p className="text-emerald-100 text-sm mb-5">
                Ready to explore {place.name}? Get in touch with us for
                personalized travel advice.
              </p>
              <Link
                href="/contact"
                className="block text-center bg-white text-emerald-700 font-semibold py-3 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Related Places */}
            {related.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-heading mb-4">
                  More in {place.region}
                </h3>
                <div className="space-y-3">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/places/${rel.slug}`}
                      className="group flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={rel.image}
                          alt={rel.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-emerald-600 transition-colors">
                          {rel.name}
                        </p>
                        <p className="text-xs text-gray-500">{rel.category}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
