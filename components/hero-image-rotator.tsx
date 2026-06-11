"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import topPic1 from "@/assets/top_pic1.jpg";
import topPic2 from "@/assets/top_pic2.jpg";
import topPic3 from "@/assets/top_pic3.jpeg";

const images = [
  { src: topPic1, alt: "הטיפוחייה — תמונה 1" },
  { src: topPic2, alt: "הטיפוחייה — תמונה 2" },
  { src: topPic3, alt: "הטיפוחייה — תמונה 3" },
];

export function HeroImageRotator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="paper-panel rounded-[3rem] p-3">
      <div
        className="relative overflow-hidden rounded-[2.5rem] bg-cream-dark"
        style={{ height: "28rem" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            key={active.alt}
            src={active.src}
            alt={active.alt}
            className="h-full w-full object-cover"
            priority={activeIndex === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.alt}
            type="button"
            aria-label={`הצגת תמונה ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className="h-2.5 rounded-full transition-all"
            style={{
              width: index === activeIndex ? "2rem" : "0.625rem",
              backgroundColor: index === activeIndex ? "#83921c" : "rgba(131, 146, 28, 0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
