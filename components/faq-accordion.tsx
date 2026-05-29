"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="paper-panel rounded-2xl">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-5 py-3 text-right"
            >
              <span className="font-display text-lg font-normal leading-7 text-ink">{item.question}</span>
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 text-leaf transition-transform", isOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="border-t border-brand/15 px-5 pb-3 pt-2 leading-7 text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
