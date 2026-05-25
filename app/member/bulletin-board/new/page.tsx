import { createPostAction } from "@/app/actions";
import { Field, PrivateReminder, SectionHeader, SubmitButton, TextArea } from "@/components/site";
import { bulletinCategories } from "@/lib/content";
import { requireApprovedMember } from "@/lib/auth";

export default async function NewBulletinPostPage() {
  await requireApprovedMember();

  return (
    <section className="mx-auto max-w-3xl">
      <SectionHeader eyebrow="פוסט חדש" title="שיתוף לחברות וחברים מאושרים בלבד" />
      <div className="mt-8"><PrivateReminder /></div>
      <form action={createPostAction} className="mt-6 grid gap-5 rounded-3xl bg-white/85 p-6 shadow-sm">
        <Field label="כותרת" name="title" required />
        <Field label="קטגוריה" name="category" required>
          <select name="category" required className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3">
            {bulletinCategories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </Field>
        <Field label="עיר או אזור, לא חובה" name="city_region" />
        <Field label="טווח גיל הילד/ה, לא חובה" name="child_age_range" />
        <TextArea label="תוכן הפוסט" name="body" required rows={8} />
        <label className="flex gap-3 text-sm text-stone-700">
          <input name="allow_connection_requests" type="checkbox" defaultChecked className="mt-1 h-4 w-4" />
          לאפשר לחברות וחברים מאושרים לבקש קשר דרך הפלטפורמה.
        </label>
        <SubmitButton>פרסום פוסט</SubmitButton>
      </form>
    </section>
  );
}
