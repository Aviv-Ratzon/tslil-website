import type { Metadata } from "next";
import { SectionHeader, ServiceCard } from "@/components/site";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "שירותים",
  description: "הדרכת הורים, פגישות ייעוץ, סדנאות, משאבים חינוכיים וליווי מתמשך.",
};

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="שירותים" title="אפשרויות תמיכה ברורות לצרכים שונים של הורים">
        כל שירות נבנה כך שיהיה מעשי, נגיש ומבוסס על פרטיות ואמון.
      </SectionHeader>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}
