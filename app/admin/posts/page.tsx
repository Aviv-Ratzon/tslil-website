import { adminUpdatePostStatusAction } from "@/app/actions";
import { Card, EmptyState, SectionHeader, StatusBadge } from "@/components/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function AdminPostsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: posts } = await supabase.from("bulletin_posts").select("*").order("created_at", { ascending: false }).limit(100);

  return (
    <section className="space-y-8">
      <SectionHeader eyebrow="ניהול תוכן" title="בדיקה וניהול של פוסטים בלוח המודעות" />
      {posts?.length ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex gap-2"><StatusBadge label={post.category} /><StatusBadge label={post.status} /></div>
                  <h2 className="mt-3 text-lg font-semibold text-stone-900">{post.title}</h2>
                  <p className="mt-2 line-clamp-2 text-stone-700">{post.body}</p>
                  <p className="mt-2 text-xs text-stone-500">כותב/ת: {post.author_id} · {formatDate(post.created_at)}</p>
                </div>
                <form action={adminUpdatePostStatusAction} className="flex items-end gap-2">
                  <input type="hidden" name="post_id" value={post.id} />
                  <select name="status" defaultValue={post.status} className="rounded-2xl border border-stone-300 px-3 py-2">
                    <option value="published">פורסם</option>
                    <option value="hidden">מוסתר</option>
                    <option value="deleted">נמחק</option>
                    <option value="pending">בהמתנה</option>
                  </select>
                  <button className="rounded-full bg-[#2f7468] px-4 py-2 text-sm font-semibold text-white">שמירה</button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      ) : <EmptyState title="אין פוסטים עדיין" />}
    </section>
  );
}
