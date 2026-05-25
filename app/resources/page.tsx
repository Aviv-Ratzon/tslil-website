import type { Metadata } from "next";
import { ButtonLink, ResourceCard, SectionHeader } from "@/components/site";
import { publicResources } from "@/lib/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Resource } from "@/types/database";

export const metadata: Metadata = {
  title: "משאבים",
  description: "משאבים ציבוריים לדוגמה ומידע על ספריית המשאבים המאובטחת לחברים.",
};

export default async function ResourcesPreviewPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("resources")
    .select("*, resource_categories(name, slug)")
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .limit(6);

  const resources = (data as Resource[] | null) ?? publicResources;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="משאבים" title="טעימות ציבוריות וחומרים פרטיים לחברים">
        אפשר לעיין בכמה משאבים ציבוריים. הספרייה המלאה זמינה רק לחברות וחברים מאושרים לאחר כניסה.
      </SectionHeader>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.title} resource={resource} />
        ))}
      </div>
      <div className="mt-12 rounded-3xl bg-[#203632] p-8 text-center text-white">
        <h2 className="text-2xl font-semibold">רוצים גישה לספרייה הפרטית המלאה?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-[#dcebe5]">
          בקשו גישה לאזור החברים המאובטח הכולל משאבים פרטיים ולוח מודעות להורים.
        </p>
        <div className="mt-6">
          <ButtonLink href="/request-access" variant="secondary">
            בקשת גישה
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
