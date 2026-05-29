import { SectionHeader } from "@/components/site";

export function TextBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader title={title}>{text}</SectionHeader>
    </section>
  );
}
