export type CarouselFolder = "hero" | "gallery";

/** Hero carousel images are cropped to 484×302px (public/carousel/hero/*_crop.jpg). */
export const HERO_CAROUSEL_ASPECT_RATIO = 484 / 302;

export type CarouselImage = {
  src: string;
  alt: string;
};
