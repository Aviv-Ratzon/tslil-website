"use client";

import { ButtonLink, SectionHeader } from "@/components/site";

export default function ErrorPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <SectionHeader eyebrow="שגיאה" title="משהו השתבש" />
      <p className="mt-6 text-muted">אנא רעננו את העמוד או נסו שוב מאוחר יותר.</p>
      <div className="mt-8">
        <ButtonLink href="/">חזרה לדף הבית</ButtonLink>
      </div>
    </section>
  );
}
