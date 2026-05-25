import type { Metadata } from "next";
import { Card, ProfileCard, SectionHeader } from "@/components/site";
import { providers } from "@/lib/content";

export const metadata: Metadata = {
  title: "אודות",
  description: "הכירו את שתי הנשים שמובילות את שירות הדרכת ההורים ואת הגישה המשותפת שלהן.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="אודות" title="הדרכה מקצועית בגישה אישית ומכבדת">
        המשימה שלנו היא לעזור להורים להרגיש נתמכים, מעודכנים ומחוברים, תוך שמירה על פרטיות וכבוד המשפחה.
      </SectionHeader>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {providers.map((provider) => (
          <ProfileCard key={provider.name} provider={provider} />
        ))}
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          ["ערכים", "כבוד, סודיות, נגישות וטיפול מעשי מובילים כל שירות."],
          ["תפיסה", "הורים לא צריכים שיפוטיות או רעש. הם צריכים בהירות, כלים ותמיכה יציבה."],
          ["גישה", "אנחנו משלבות הקשבה, כלים מבוססי ידע וצעדים מציאותיים לכל משפחה."],
        ].map(([title, body]) => (
          <Card key={title}>
            <h2 className="text-xl font-semibold text-[#203632]">{title}</h2>
            <p className="mt-3 text-stone-700">{body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
