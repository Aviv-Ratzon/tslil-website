"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { CarouselImage } from "@/lib/carousel-images";

export function ImageRotator({
  images,
  objectFit = "contain",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  aspectRatio,
}: {
  images: CarouselImage[];
  objectFit?: "cover" | "contain";
  sizes?: string;
  /** Width ÷ height. When set, the frame scales with width and keeps a fixed ratio on all screens. */
  aspectRatio?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  const active = images[activeIndex % images.length];

  return (
    <div className="paper-panel rounded-[3rem] p-3">
      <div
        className="relative w-full overflow-hidden rounded-[2.5rem] bg-cream-dark"
        style={aspectRatio ? { aspectRatio } : { height: "28rem" }}
      >
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt}
          fill
          className={cn(objectFit === "cover" ? "object-cover" : "object-contain")}
          priority={activeIndex === 0}
          sizes={sizes}
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`הצגת תמונה ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === activeIndex ? "w-8 bg-brand" : "w-2.5 bg-brand/35",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
