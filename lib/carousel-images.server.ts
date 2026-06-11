import { readdirSync } from "fs";
import { join } from "path";
import type { CarouselFolder, CarouselImage } from "@/lib/carousel-images";

const imagePattern = /\.(jpe?g|png|webp|heic|heif)$/i;

export function getCarouselImages(folder: CarouselFolder, altPrefix: string): CarouselImage[] {
  const dir = join(process.cwd(), "public", "carousel", folder);

  try {
    return readdirSync(dir)
      .filter((name) => imagePattern.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((name) => ({
        src: `/carousel/${folder}/${name}`,
        alt: `${altPrefix} — ${name.replace(/\.[^.]+$/, "")}`,
      }));
  } catch {
    return [];
  }
}
