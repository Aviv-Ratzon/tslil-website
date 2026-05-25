import { updateProfileAction } from "@/app/actions";
import { Field, SectionHeader, SubmitButton, TextArea } from "@/components/site";
import { requireUserProfile } from "@/lib/auth";

export default async function ProfilePage() {
  const { profile } = await requireUserProfile();

  return (
    <section className="mx-auto max-w-3xl">
      <SectionHeader eyebrow="פרופיל" title="שליטה במה שאתם משתפים" />
      <form action={updateProfileAction} className="mt-10 grid gap-5 rounded-3xl bg-white/85 p-6 shadow-sm">
        <Field label="שם תצוגה" name="display_name" required>
          <input name="display_name" required defaultValue={profile.display_name ?? ""} className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3" />
        </Field>
        <Field label="טלפון, לא חובה" name="phone">
          <input name="phone" defaultValue={profile.phone ?? ""} className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3" />
        </Field>
        <Field label="עיר או אזור, לא חובה" name="city_region">
          <input name="city_region" defaultValue={profile.city_region ?? ""} className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3" />
        </Field>
        <Field label="שפה מועדפת, לא חובה" name="preferred_language">
          <input name="preferred_language" defaultValue={profile.preferred_language ?? ""} className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3" />
        </Field>
        <TextArea label="ביוגרפיה קצרה, לא חובה" name="bio" rows={4} />
        <Field label="העדפת שיתוף פרטי קשר" name="contact_sharing_preference">
          <select name="contact_sharing_preference" defaultValue={profile.contact_sharing_preference} className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3">
            <option value="approval_required">נדרש אישור</option>
            <option value="platform_only">דרך הפלטפורמה בלבד</option>
            <option value="share_after_connection">שיתוף לאחר בקשת קשר מאושרת</option>
          </select>
        </Field>
        <p className="text-sm text-stone-600">האימייל שלך לא מוצג לחברים אחרים כברירת מחדל.</p>
        <SubmitButton>שמירת פרופיל</SubmitButton>
      </form>
    </section>
  );
}
