import { ButtonLink, SectionHeader } from "@/components/site";

export default function SuspendedPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <SectionHeader eyebrow="החשבון מושעה" title="הגישה הפרטית אינה זמינה כרגע" />
      <p className="mt-6 text-stone-700">אנא צרו קשר עם מנחות השירות אם לדעתכם מדובר בטעות.</p>
      <div className="mt-8">
        <ButtonLink href="/contact">דברו איתנו</ButtonLink>
      </div>
    </section>
  );
}
