import { Card, SectionHeader, StatusBadge } from "@/components/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const [
    { count: pendingUsers },
    { count: reportedPosts },
    { count: contacts },
    { data: recentUsers },
    { data: recentPosts },
    { data: recentResources },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("approval_status", "pending"),
    supabase.from("reports").select("*", { count: "exact", head: true }).eq("status", "open"),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("bulletin_posts").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("resources").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="לוח בקרה לניהול" title="ניהול אישורים, תוכן ובטיחות הקהילה" />
      <div className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-sm text-stone-500">ממתינים לאישור</p><p className="mt-2 text-3xl font-bold">{pendingUsers ?? 0}</p></Card>
        <Card><p className="text-sm text-stone-500">דיווחים פתוחים</p><p className="mt-2 text-3xl font-bold">{reportedPosts ?? 0}</p></Card>
        <Card><p className="text-sm text-stone-500">פניות חדשות</p><p className="mt-2 text-3xl font-bold">{contacts ?? 0}</p></Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="font-semibold text-stone-900">משתמשים אחרונים</h2>
          <div className="mt-4 space-y-3">{recentUsers?.map((user) => <p key={user.id} className="text-sm">{user.email} <StatusBadge label={user.approval_status} /></p>)}</div>
        </Card>
        <Card>
          <h2 className="font-semibold text-stone-900">פוסטים אחרונים</h2>
          <div className="mt-4 space-y-3">{recentPosts?.map((post) => <p key={post.id} className="text-sm">{post.title} <StatusBadge label={post.status} /></p>)}</div>
        </Card>
        <Card>
          <h2 className="font-semibold text-stone-900">משאבים אחרונים</h2>
          <div className="mt-4 space-y-3">{recentResources?.map((resource) => <p key={resource.id} className="text-sm">{resource.title} <StatusBadge label={resource.visibility} /></p>)}</div>
        </Card>
      </div>
    </div>
  );
}
