import Link from "next/link";
import { Card, EmptyState, ResourceCard, SectionHeader, StatusBadge } from "@/components/site";
import { requireApprovedMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Resource } from "@/types/database";

export default async function MemberResourcesPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  await requireApprovedMember();
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("resources")
    .select("*, resource_categories(name, slug)")
    .in("visibility", ["members", "public"])
    .order("created_at", { ascending: false });

  if (params.q) query = query.ilike("title", `%${params.q}%`);
  if (params.category) query = query.eq("category_id", params.category);

  const [{ data: resources }, { data: categories }] = await Promise.all([
    query,
    supabase.from("resource_categories").select("*").order("name"),
  ]);

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="ספריית משאבים" title="מדריכים, דפי עבודה, סרטונים ומאמרים פרטיים" />
      <form className="grid gap-3 rounded-3xl bg-white/85 p-4 shadow-sm md:grid-cols-[1fr_14rem_auto]">
        <input name="q" placeholder="חיפוש משאבים" defaultValue={params.q} className="rounded-2xl border border-stone-300 px-4 py-3" />
        <select name="category" defaultValue={params.category} className="rounded-2xl border border-stone-300 px-4 py-3">
          <option value="">כל הקטגוריות</option>
          {categories?.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <button className="rounded-2xl bg-[#2f7468] px-5 py-3 font-semibold text-white">סינון</button>
      </form>
      {resources?.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {(resources as Resource[]).map((resource) => (
            <Card key={resource.id}>
              <ResourceCard resource={resource} />
              <div className="mt-4 flex flex-wrap gap-2">
                {resource.file_path ? (
                  <Link href={`/member/resources/${resource.id}/download`} className="rounded-full bg-[#2f7468] px-4 py-2 text-sm font-semibold text-white">
                    פתיחת קובץ מאובטח
                  </Link>
                ) : null}
                {resource.external_url ? (
                  <a href={resource.external_url} rel="noreferrer" target="_blank" className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700">
                    פתיחת קישור
                  </a>
                ) : null}
                {resource.video_url ? <StatusBadge label="סרטון זמין" tone="green" /> : null}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="לא נמצאו משאבים">נסו חיפוש או קטגוריה אחרת.</EmptyState>
      )}
    </div>
  );
}
