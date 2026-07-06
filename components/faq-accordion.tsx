"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FaqAnswer } from "@/lib/content";
import { aboutSectionHref } from "@/lib/content";

function FaqBulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="list-disc space-y-4 ps-6 marker:text-brand">
      {bullets.map((bullet, index) => (
        <li key={index} className="pe-2 text-justify leading-7 text-ink">
          {bullet}
        </li>
      ))}
    </ul>
  );
}

function FaqExpandable({ label, bullets }: { label: string; bullets: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full bg-leaf-soft px-4 py-2 text-sm font-semibold text-leaf-darker transition hover:bg-leaf-light/40"
      >
        {label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
          open ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <FaqBulletList bullets={bullets} />
        </div>
      </div>
    </div>
  );
}

function isExpandAnswer(answer: FaqAnswer): answer is { intro: string; expand: { label: string; bullets: string[] } } {
  return typeof answer === "object" && answer !== null && "expand" in answer;
}

function isBulletsAnswer(
  answer: FaqAnswer,
): answer is { bullets: string[]; intro?: string; note?: string } {
  return typeof answer === "object" && answer !== null && "bullets" in answer;
}

function FaqAnswerContent({ answer }: { answer: FaqAnswer }) {
  if (typeof answer === "string") {
    return <p className="text-justify leading-7 text-ink">{answer}</p>;
  }

  if (isExpandAnswer(answer)) {
    return (
      <div className="space-y-1">
        <p className="text-justify leading-7 text-ink">{answer.intro}</p>
        <FaqExpandable label={answer.expand.label} bullets={answer.expand.bullets} />
      </div>
    );
  }

  if (isBulletsAnswer(answer)) {
    return (
      <div className="space-y-4">
        {answer.intro ? <p className="text-justify leading-7 text-ink">{answer.intro}</p> : null}
        <FaqBulletList bullets={answer.bullets} />
        {answer.note ? (
          <p className="text-sm leading-7 text-muted">
            {answer.note.includes("עוד פרטים טכניים") ? (
              <>
                מחשבון ההוצאות יופיע גם תחת סקשן{" "}
                <Link href={aboutSectionHref.technical} className="font-semibold text-brand-darker underline decoration-brand/50 underline-offset-4 hover:text-brand">
                  עוד פרטים טכניים
                </Link>{" "}
                בעמוד האודות.
              </>
            ) : (
              answer.note
            )}
          </p>
        ) : null}
      </div>
    );
  }

  return null;
}

export function FaqAccordion({ items }: { items: { question: string; answer: FaqAnswer }[] }) {
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
                className={cn("h-4 w-4 shrink-0 text-brand-dark transition-transform", isOpen && "rotate-180")}
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
                <div className="border-t border-brand/20 px-5 pb-3 pt-2">
                  <FaqAnswerContent answer={item.answer} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
