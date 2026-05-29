import type { Metadata } from "next";
import { SectionHeader } from "@/components/site";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "יצירת קשר",
  description: "יצירת קשר עם מנחות הדרכת ההורים.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const params = await searchParams;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="יצירת קשר" title="ספרו לנו איזה סוג תמיכה אתם מחפשים" />
      <div className="mt-10">
        <ContactForm sent={Boolean(params.sent)} error={Boolean(params.error)} />
      </div>
    </section>
  );
}
