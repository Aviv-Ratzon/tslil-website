"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import image1 from "@/assets/image1.jpeg";
import image2 from "@/assets/image2.jpeg";
import image3 from "@/assets/image3.jpeg";

const images = [
  { src: image1, alt: "מפגש הדרכה עם ילדים" },
  { src: image2, alt: "זמן קריאה ומשחק עם ילדים" },
  { src: image3, alt: "ילדים במרחב משחק בטוח" },
];

export function HomeImageRotator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="paper-panel overflow-hidden rounded-[3rem] p-3">
      <div
        className="relative overflow-hidden rounded-[2.5rem] bg-[#efe2cf]"
        style={{ height: "28rem" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            key={active.alt}
            src={active.src}
            alt={active.alt}
            className="h-auto max-h-full w-auto max-w-full object-contain"
            priority={activeIndex === 0}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#21483f]/70 to-transparent p-6 text-[#fffaf1]">
          <p className="font-display text-2xl font-semibold">רגעים של משחק, הקשבה וקשר</p>
          <p className="mt-2 text-sm text-[#f6efe4]">מרחב הורי שמתחיל מהחיים עצמם.</p>
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
              backgroundColor: index === activeIndex ? "#21483f" : "rgba(139, 111, 74, 0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
