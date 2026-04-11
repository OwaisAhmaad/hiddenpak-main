"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export default function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showValue = false,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayRating = interactive && hovered !== null ? hovered : rating;
  const iconClass = sizeMap[size];

  function handleClick(starIndex: number) {
    if (interactive && onChange) {
      onChange(starIndex);
    }
  }

  function handleMouseEnter(starIndex: number) {
    if (interactive) setHovered(starIndex);
  }

  function handleMouseLeave() {
    if (interactive) setHovered(null);
  }

  function getStarType(starIndex: number): "full" | "half" | "empty" {
    const val = displayRating;
    if (val >= starIndex) return "full";
    if (val >= starIndex - 0.5) return "half";
    return "empty";
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }, (_, i) => i + 1).map((starIndex) => {
          const type = getStarType(starIndex);
          return (
            <button
              key={starIndex}
              type="button"
              disabled={!interactive}
              onClick={() => handleClick(starIndex)}
              onMouseEnter={() => handleMouseEnter(starIndex)}
              onMouseLeave={handleMouseLeave}
              className={`relative focus:outline-none transition-transform duration-100 ${
                interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
              }`}
            >
              {type === "full" && (
                <Star
                  className={`${iconClass} text-[#F97316] fill-[#F97316]`}
                />
              )}
              {type === "half" && (
                <span className="relative inline-block">
                  {/* Empty background star */}
                  <Star className={`${iconClass} text-[#374151]`} />
                  {/* Half-filled overlay */}
                  <span
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: "50%" }}
                  >
                    <Star className={`${iconClass} text-[#F97316] fill-[#F97316]`} />
                  </span>
                </span>
              )}
              {type === "empty" && (
                <Star className={`${iconClass} text-[#374151]`} />
              )}
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-semibold text-[#F5F5DC] ml-1">
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
