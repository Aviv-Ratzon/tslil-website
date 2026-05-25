import { adminUpdateContactStatusAction } from "@/app/actions";
import { Card, EmptyState, SectionHeader, StatusBadge } from "@/components/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function ContactSubmissionsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: submissions } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(100);

  return (
    <section className="space-y-8">
      <SectionHeader eyebrow="יצירת קשר" title="ניהול פניות מטופס יצירת הקשר" />
      {submissions?.length ? (
        <div className="grid gap-4">
          {submissions.map((submission) => (
            <Card key={submission.id}>
              <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                <div>
                  <StatusBadge label={submission.status} />
                  <h2 className="mt-3 text-lg font-semibold text-stone-900">{submission.full_name}</h2>
                  <p className="mt-1 text-sm text-stone-600">{submission.email} {submission.phone ? `· ${submission.phone}` : ""}</p>
                  <p className="mt-3 text-stone-700">{submission.message}</p>
                  <p className="mt-2 text-xs text-stone-500">{formatDate(submission.created_at)}</p>
                </div>
                <form action={adminUpdateContactStatusAction} className="flex items-end gap-2">
                  <input type="hidden" name="submission_id" value={submission.id} />
                  <select name="status" defaultValue={submission.status} className="rounded-2xl border border-stone-300 px-3 py-2">
                    <option value="new">חדש</option>
                    <option value="read">נקרא</option>
                    <option value="archived">בארכיון</option>
                  </select>
                  <button className="rounded-full bg-[#2f7468] px-4 py-2 text-sm font-semibold text-white">שמירה</button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      ) : <EmptyState title="אין פניות יצירת קשר" />}
    </section>
  );
}
