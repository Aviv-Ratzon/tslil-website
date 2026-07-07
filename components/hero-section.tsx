import { BookOpen, Heart, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/site";
import { RichContentBody } from "@/components/rich-text";
import { HeroImageRotator } from "@/components/hero-image-rotator";
import { homepageSections } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-cream-dark to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[0.71fr_1.24fr]">
          <div className="px-4 pb-8 pt-1 sm:px-8 sm:pb-12 sm:pt-2 lg:px-10 lg:pt-3">
            <span className="inline-flex text-sm font-bold tracking-[0.18em] text-leaf-dark">
              בקצרה
            </span>
            <div className="space-y-5 text-justify font-display text-1xl font-semibold leading-tight text-brand-darker sm:text-3xl">
              הטיפוחייה היא מודל עבור הורים שרוצים לקחת אחריות על חינוך ילדיהם בגיל הרך. זוהי דרך עבור קבוצת הורים לחבור יחדיו ולייצר מסגרת מותאמת התפתחותית וברת קיימא במקום האלטרנטיבות הקיימות - מעונות עמוסים, מטפלת פרטית יקרה או להישאר לבד בבית
            </div>
            <div className="mt-9 flex flex-nowrap gap-2 sm:gap-2.5">
              <ButtonLink href="#team" variant="secondary" size="compact">
                מי אנחנו
              </ButtonLink>
              <ButtonLink href="#audience" variant="secondary" size="compact">
                למי מיועדת הטיפוחייה
              </ButtonLink>
              <ButtonLink href="#contact" size="compact">
                דברו איתנו
              </ButtonLink>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-8 top-8 h-32 w-32 rounded-full bg-brand/25 blur-2xl" />
            <div className="absolute -left-6 bottom-10 h-40 w-40 rounded-full bg-leaf/20 blur-2xl" />
            <HeroImageRotator />
          </div>
        </div>
      </div>

      <div className="mt-12 w-full border-y-2 border-brand/15 bg-paper sm:mt-16">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="space-y-5 font-display text-3xl font-semibold leading-tight text-brand-darker sm:text-4xl">
            {/* <p className="pr-0 text-leaf-dark">מה היא</p>
            <p className="pr-8 font-normal text-brand-darker">הטיפוחייה ?</p> */}
          </div>
          <div className="mt-5">
            <RichContentBody blocks={homepageSections.heroWhatIs.body} />
          </div>
          <div className="soft-divider my-8" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["מקום לפגוש ולהיפגש", ShieldCheck],
              ["מרחב קהילתי שבו תודעות נוגעות זו בזו", BookOpen],
              ["איפה שאוכלים פאנקייקס סלק", Heart],
            ].map(([label, Icon]) => (
              <div key={label as string} className="framed-box flex items-center gap-4 rounded-2xl bg-paper/90 p-4">
                <Icon className="h-5 w-5 shrink-0 text-brand-dark" aria-hidden />
                <span className="font-medium text-ink">{label as string}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
