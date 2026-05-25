import { ButtonLink, SectionHeader } from "@/components/site";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <SectionHeader eyebrow="404" title="העמוד לא נמצא" />
      <div className="mt-8">
        <ButtonLink href="/">חזרה לדף הבית</ButtonLink>
      </div>
    </section>
  );
}
