import { ImageRotator } from "@/components/image-rotator";
import { HERO_CAROUSEL_ASPECT_RATIO } from "@/lib/carousel-images";
import { getCarouselImages } from "@/lib/carousel-images.server";

export function HeroImageRotator() {
  const images = getCarouselImages("hero", "הטיפוחייה");
  return (
    <ImageRotator
      images={images}
      objectFit="contain"
      aspectRatio={HERO_CAROUSEL_ASPECT_RATIO}
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  );
}
