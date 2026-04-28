import { ExternalLink, MapPin } from "lucide-react";

interface MapEmbedProps {
  placeName: string;
  region?: string;
  height?: string;
  className?: string;
}

const REGION_COORDS: Record<string, { lat: number; lng: number }> = {
  "Gilgit-Baltistan": { lat: 36.3167, lng: 74.6167 },
  "Khyber Pakhtunkhwa": { lat: 34.0522, lng: 71.5622 },
  KPK: { lat: 34.0522, lng: 71.5622 },
  Punjab: { lat: 31.5497, lng: 74.3436 },
  "Azad Kashmir": { lat: 33.926, lng: 73.78 },
  Balochistan: { lat: 30.1798, lng: 66.975 },
  Sindh: { lat: 25.3463, lng: 68.3665 },
};

// Default: center of Pakistan
const DEFAULT_COORDS = { lat: 30.3753, lng: 69.3451 };
const BBOX_DELTA = 0.5; // degrees to extend around the center

function getCoords(region?: string): { lat: number; lng: number } {
  if (!region) return DEFAULT_COORDS;
  // Exact match
  if (REGION_COORDS[region]) return REGION_COORDS[region];
  // Partial match
  const key = Object.keys(REGION_COORDS).find((k) =>
    region.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(region.toLowerCase())
  );
  return key ? REGION_COORDS[key] : DEFAULT_COORDS;
}

export default function MapEmbed({
  placeName,
  region,
  height = "400px",
  className = "",
}: MapEmbedProps) {
  const { lat, lng } = getCoords(region);

  const bbox = [
    lng - BBOX_DELTA,
    lat - BBOX_DELTA,
    lng + BBOX_DELTA,
    lat + BBOX_DELTA,
  ].join(",");

  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    `${placeName}${region ? ", " + region : ""}, Pakistan`
  )}`;

  return (
    <div
      className={`relative bg-[#111827] rounded-2xl overflow-hidden border border-[#1F2937] ${className}`}
    >
      {/* Map iframe */}
      <div style={{ height }}>
        <iframe
          src={osmUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${placeName}`}
          className="grayscale-[0.2] contrast-[0.95]"
        />
      </div>

      {/* Place label overlay (top-left) */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#111827]/90 backdrop-blur-sm border border-[#1F2937] rounded-xl px-3 py-1.5 pointer-events-none">
        <MapPin className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
        <span className="text-white text-xs font-medium">{placeName}</span>
        {region && (
          <span className="text-[#6B7280] text-xs hidden sm:inline">
            &mdash; {region}
          </span>
        )}
      </div>

      {/* Open in Google Maps button (bottom-right) */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors shadow-lg"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Open in Google Maps
      </a>
    </div>
  );
}
