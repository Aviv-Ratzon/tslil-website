import { ImageRotator } from "@/components/image-rotator";
import { getCarouselImages } from "@/lib/carousel-images.server";

export function HeroImageRotator() {
  const images = getCarouselImages("hero", "הטיפוחייה");
  return <ImageRotator images={images} objectFit="cover" sizes="(max-width: 1024px) 100vw, 50vw" />;
}
