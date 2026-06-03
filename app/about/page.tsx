import type { Metadata } from "next";
import { AboutContent, AboutPageHeader } from "@/components/about-content";
import { aboutPage } from "@/lib/content";

export const metadata: Metadata = {
  title: aboutPage.title,
  description: "המטרות, הגישה והפרטים הטכניים של מודל הטיפוחייה.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <AboutPageHeader />
      <div className="mt-12">
        <AboutContent />
      </div>
    </section>
  );
}
