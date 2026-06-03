"use client";

import Image, { type StaticImageData } from "next/image";
import { X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function DiagramLightbox({ src, alt }: { src: StaticImageData; alt: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group framed-box mx-auto mt-8 block w-full max-w-2xl cursor-zoom-in rounded-2xl bg-paper p-4 text-center transition",
          "hover:ring-2 hover:ring-brand/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
        )}
        aria-label={`${alt} — לחצו להגדלה`}
      >
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={src}
            alt={alt}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-ink/55 to-transparent px-3 py-3 text-sm font-medium text-cream opacity-0 transition group-hover:opacity-100">
            <ZoomIn className="h-4 w-4 shrink-0" aria-hidden />
            לחצו להגדלה
          </span>
        </div>
        <span className="mt-3 block text-sm text-muted">לחצו על התרשים לצפייה בגודל המקורי (ניתן לגלול)</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6" role="dialog" aria-modal aria-label={alt}>
          <button
            type="button"
            className="absolute inset-0 bg-ink/70 backdrop-blur-[2px]"
            aria-label="סגירה"
            onClick={close}
          />
          <div className="relative z-10 flex max-h-full w-full max-w-[min(100%,96rem)] flex-col overflow-hidden rounded-2xl bg-cream shadow-2xl ring-1 ring-brand/20">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-brand/15 px-4 py-3 sm:px-5">
              <p className="text-sm font-medium text-ink">גללו לצפייה בכל התרשים</p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition hover:bg-cream-dark"
                aria-label="סגירה"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-5">
              {/* Native size so flowchart text stays readable */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src.src}
                alt={alt}
                width={src.width}
                height={src.height}
                className="mx-auto block h-auto max-w-none"
                style={{ width: src.width, height: "auto" }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
