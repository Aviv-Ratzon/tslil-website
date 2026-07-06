"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

const ZOOM_MIN = 75;
const ZOOM_MAX = 250;
const ZOOM_STEP = 25;

function ZoomButton({
  onClick,
  label,
  children,
  disabled,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink shadow-sm ring-1 ring-brand/20 transition",
        "hover:bg-cream-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        "disabled:cursor-not-allowed disabled:opacity-40",
      )}
    >
      {children}
    </button>
  );
}

export function DiagramPageViewer({ src, alt }: { src: StaticImageData; alt: string }) {
  const [zoom, setZoom] = useState(100);

  const zoomIn = useCallback(() => setZoom((value) => Math.min(value + ZOOM_STEP, ZOOM_MAX)), []);
  const zoomOut = useCallback(() => setZoom((value) => Math.max(value - ZOOM_STEP, ZOOM_MIN)), []);
  const resetZoom = useCallback(() => setZoom(100), []);

  return (
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-brand/15 bg-paper/90 px-4 py-3 backdrop-blur-sm sm:px-6">
        <p className="text-sm text-muted">גללו לכל התרשים · השתמשו בכפתורים להגדלה ולהקטנה</p>
        <div className="flex items-center gap-2">
          <ZoomButton onClick={zoomOut} label="הקטנה" disabled={zoom <= ZOOM_MIN}>
            <Minus className="h-4 w-4" aria-hidden />
          </ZoomButton>
          <span className="min-w-12 text-center text-sm font-semibold tabular-nums text-ink">{zoom}%</span>
          <ZoomButton onClick={zoomIn} label="הגדלה" disabled={zoom >= ZOOM_MAX}>
            <Plus className="h-4 w-4" aria-hidden />
          </ZoomButton>
          <ZoomButton onClick={resetZoom} label="התאמה לרוחב המסך">
            <RotateCcw className="h-4 w-4" aria-hidden />
          </ZoomButton>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto overscroll-contain bg-cream/50 px-2 py-4 sm:px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src.src}
          alt={alt}
          width={src.width}
          height={src.height}
          draggable={false}
          className="mx-auto block h-auto max-w-none select-none"
          style={{ width: `${zoom}%` }}
        />
      </div>
    </div>
  );
}
