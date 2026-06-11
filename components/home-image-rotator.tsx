import { ImageRotator } from "@/components/image-rotator";
import { getCarouselImages } from "@/lib/carousel-images.server";

export function HomeImageRotator() {
  const images = getCarouselImages("gallery", "הטיפוחייה ביום יום");
  return <ImageRotator images={images} objectFit="contain" />;
}
