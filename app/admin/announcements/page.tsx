import { adminSaveAnnouncementAction } from "@/app/actions";
import { Card, EmptyState, Field, SectionHeader, StatusBadge, SubmitButton, TextArea } from "@/components/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function AdminAnnouncementsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: announcements } = await supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(100);

  return (
    <section className="space-y-8">
      <SectionHeader eyebrow="הודעות" title="פרסום עדכונים לחברות וחברים" />
      <Card>
        <h2 className="text-xl font-semibold text-[#203632]">יצירת הודעה</h2>
        <form action={adminSaveAnnouncementAction} className="mt-5 grid gap-4">
          <Field label="כותרת" name="title" required />
          <TextArea label="תוכן" name="body" required rows={4} />
          <Field label="נראות" name="visibility">
            <select name="visibility" defaultValue="members" className="mt-2 w-full rounded-2xl border border-stone-300 px-4 py-3">
              <option value="public">ציבורי</option>
              <option value="members">חברים</option>
              <option value="admins">מנהלים</option>
            </select>
          </Field>
          <SubmitButton>יצירת הודעה</SubmitButton>
        </form>
      </Card>
      {announcements?.length ? (
        <div className="grid gap-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <h2 className="font-semibold text-stone-900">{announcement.title}</h2>
              <p className="mt-2 text-stone-700">{announcement.body}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-stone-500">
                <StatusBadge label={announcement.visibility} />
                <span>{formatDate(announcement.created_at)}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : <EmptyState title="אין הודעות עדיין" />}
    </section>
  );
}
