import { ButtonLink, BulletinPostCard, Card, EmptyState, ResourceCard, SectionHeader, StatusBadge } from "@/components/site";
import { requireUserProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BulletinPost, Resource } from "@/types/database";

export default async function MemberDashboardPage() {
  const { profile } = await requireUserProfile();

  if (profile.approval_status !== "approved" || !["member", "admin"].includes(profile.role)) {
    return (
      <Card>
        <StatusBadge label={profile.approval_status} tone="amber" />
        <h1 className="mt-4 text-3xl font-bold text-[#203632]">בקשת הגישה שלך ממתינה לאישור</h1>
        <p className="mt-3 text-stone-700">מנהלת צריכה לאשר את החשבון לפני שהמשאבים הפרטיים והפוסטים הקהילתיים יהיו זמינים.</p>
      </Card>
    );
  }

  const supabase = await createSupabaseServerClient();
  const [{ data: announcements }, { data: resources }, { data: posts }] = await Promise.all([
    supabase.from("announcements").select("*").in("visibility", ["members", "public"]).order("created_at", { ascending: false }).limit(3),
    supabase.from("resources").select("*, resource_categories(name, slug)").in("visibility", ["members", "public"]).order("created_at", { ascending: false }).limit(3),
    supabase.from("bulletin_posts").select("*").eq("status", "published").order("created_at", { ascending: false }).limit(3),
  ]);

  return (
    <div className="space-y-10">
      <SectionHeader eyebrow="לוח בקרה" title={`ברוכים הבאים, ${profile.display_name ?? profile.full_name ?? "חבר/ה"}`} />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <h2 className="font-semibold text-stone-900">סטטוס אישור</h2>
          <div className="mt-3"><StatusBadge label={profile.approval_status} tone="green" /></div>
        </Card>
        <Card>
          <h2 className="font-semibold text-stone-900">קישורים מהירים</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <ButtonLink href="/member/resources" variant="secondary">משאבים</ButtonLink>
            <ButtonLink href="/member/bulletin-board" variant="secondary">לוח מודעות</ButtonLink>
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold text-stone-900">תזכורת פרטיות</h2>
          <p className="mt-3 text-sm text-stone-700">השתמשו בשמות תצוגה ובבקשות קשר במקום לפרסם פרטי קשר פרטיים.</p>
        </Card>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-[#203632]">הודעות</h2>
        <div className="mt-4 grid gap-4">
          {announcements?.length ? announcements.map((item) => (
            <Card key={item.id}>
              <h3 className="font-semibold text-stone-900">{item.title}</h3>
              <p className="mt-2 text-stone-700">{item.body}</p>
            </Card>
          )) : <EmptyState title="אין הודעות עדיין" />}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#203632]">משאבים שנוספו לאחרונה</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {resources?.length ? (resources as Resource[]).map((resource) => <ResourceCard key={resource.id} resource={resource} />) : <EmptyState title="אין משאבים עדיין" />}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#203632]">פוסטים אחרונים בלוח המודעות</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {posts?.length ? (posts as BulletinPost[]).map((post) => <BulletinPostCard key={post.id} post={post} href={`/member/bulletin-board/${post.id}`} />) : <EmptyState title="אין פוסטים עדיין" />}
        </div>
      </section>
    </div>
  );
}
