import { notFound } from "next/navigation";
import { createConnectionRequestAction, deleteOwnPostAction, reportPostAction } from "@/app/actions";
import { Card, PrivateReminder, StatusBadge, SubmitButton, TextArea } from "@/components/site";
import { requireApprovedMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { BulletinPost } from "@/types/database";

export default async function BulletinPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await requireApprovedMember();
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("bulletin_posts").select("*").eq("id", id).single();
  const post = data as BulletinPost | null;
  if (!post || post.status !== "published") notFound();

  const isOwner = post.author_id === user.id;

  return (
    <article className="space-y-6">
      <Card>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={post.category} />
          <StatusBadge label={post.status} tone="green" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-[#203632]">{post.title}</h1>
        <p className="mt-2 text-sm text-stone-500">
          פורסם בתאריך {formatDate(post.created_at)}
          {post.city_region ? ` · ${post.city_region}` : ""}
          {post.child_age_range ? ` · ${post.child_age_range}` : ""}
        </p>
        <div className="prose-content mt-6 whitespace-pre-line text-stone-800">{post.body}</div>
      </Card>

      <PrivateReminder />

      <div className="grid gap-6 md:grid-cols-2">
        {!isOwner && post.allow_connection_requests ? (
          <Card>
            <h2 className="text-xl font-semibold text-[#203632]">בקשת קשר</h2>
            <p className="mt-2 text-sm text-stone-700">פרטי הקשר שלך לא ישותפו אלא אם כותב/ת הפוסט יאשרו זאת.</p>
            <form action={createConnectionRequestAction} className="mt-4 grid gap-4">
              <input type="hidden" name="post_id" value={post.id} />
              <input type="hidden" name="recipient_id" value={post.author_id} />
              <TextArea label="הודעה" name="message" required rows={4} />
              <SubmitButton>שליחת בקשת קשר</SubmitButton>
            </form>
          </Card>
        ) : null}
        <Card>
          <h2 className="text-xl font-semibold text-[#203632]">דיווח על הפוסט</h2>
          <form action={reportPostAction} className="mt-4 grid gap-4">
            <input type="hidden" name="post_id" value={post.id} />
            <input name="reason" required placeholder="סיבה" className="rounded-2xl border border-stone-300 px-4 py-3" />
            <textarea name="details" placeholder="פרטים נוספים, לא חובה" rows={3} className="rounded-2xl border border-stone-300 px-4 py-3" />
            <SubmitButton>שליחת דיווח</SubmitButton>
          </form>
        </Card>
      </div>

      {isOwner ? (
        <form action={deleteOwnPostAction}>
          <input type="hidden" name="post_id" value={post.id} />
          <button className="rounded-full border border-rose-200 px-5 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-50">
            מחיקת הפוסט שלי
          </button>
        </form>
      ) : null}
    </article>
  );
}
