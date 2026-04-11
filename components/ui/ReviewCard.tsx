import StarRating from "./StarRating";
import { MapPin } from "lucide-react";

interface ReviewCardProps {
  author: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  location?: string;
}

function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

const AVATAR_COLORS = [
  "bg-[#14532D]",
  "bg-[#F97316]/80",
  "bg-blue-600",
  "bg-purple-600",
  "bg-rose-600",
  "bg-teal-600",
];

function getAvatarColor(name: string): string {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export default function ReviewCard({
  author,
  avatar,
  rating,
  comment,
  date,
  location,
}: ReviewCardProps) {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
      {/* Header: Avatar + Author + Rating */}
      <div className="flex items-start gap-3 mb-3">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt={author}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-full ${getAvatarColor(
              author
            )} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
          >
            {getInitial(author)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-white font-semibold text-sm">{author}</p>
            <p className="text-[#6B7280] text-xs">{date}</p>
          </div>
          <StarRating rating={rating} size="sm" showValue={false} />
        </div>
      </div>

      {/* Comment */}
      <p className="text-[#F5F5DC] text-sm leading-relaxed mb-3">{comment}</p>

      {/* Location badge */}
      {location && (
        <div className="inline-flex items-center gap-1.5 bg-[#1F2937] text-[#6B7280] text-xs px-3 py-1 rounded-full">
          <MapPin className="w-3 h-3 text-[#F97316]" />
          {location}
        </div>
      )}
    </div>
  );
}
