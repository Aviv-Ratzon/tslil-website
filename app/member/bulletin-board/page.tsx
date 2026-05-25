import { ButtonLink, BulletinPostCard, EmptyState, SectionHeader } from "@/components/site";
import { requireApprovedMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { bulletinCategories } from "@/lib/content";
import type { BulletinPost } from "@/types/database";

export default async function BulletinBoardPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; location?: string }> }) {
  await requireApprovedMember();
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();

  let query = supabase.from("bulletin_posts").select("*").eq("status", "published").order("created_at", { ascending: false });
  if (params.q) query = query.or(`title.ilike.%${params.q}%,body.ilike.%${params.q}%`);
  if (params.category) query = query.eq("category", params.category);
  if (params.location) query = query.ilike("city_region", `%${params.location}%`);

  const { data: posts } = await query;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader eyebrow="לוח מודעות" title="פוסטים פרטיים בקהילת ההורים" />
        <ButtonLink href="/member/bulletin-board/new">יצירת פוסט</ButtonLink>
      </div>
      <form className="grid gap-3 rounded-3xl bg-white/85 p-4 shadow-sm md:grid-cols-[1fr_14rem_12rem_auto]">
        <input name="q" placeholder="חיפוש פוסטים" defaultValue={params.q} className="rounded-2xl border border-stone-300 px-4 py-3" />
        <select name="category" defaultValue={params.category} className="rounded-2xl border border-stone-300 px-4 py-3">
          <option value="">כל הקטגוריות</option>
          {bulletinCategories.map((category) => <option key={category}>{category}</option>)}
        </select>
        <input name="location" placeholder="מיקום" defaultValue={params.location} className="rounded-2xl border border-stone-300 px-4 py-3" />
        <button className="rounded-2xl bg-[#2f7468] px-5 py-3 font-semibold text-white">סינון</button>
      </form>
      {posts?.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {(posts as BulletinPost[]).map((post) => (
            <BulletinPostCard key={post.id} post={post} href={`/member/bulletin-board/${post.id}`} />
          ))}
        </div>
      ) : (
        <EmptyState title="אין עדיין פוסטים בלוח המודעות">אפשר ליצור את הפוסט הראשון כשמתאים לכם.</EmptyState>
      )}
    </div>
  );
}
