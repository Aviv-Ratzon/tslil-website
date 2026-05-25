import type { Metadata } from "next";
import { Field, SectionHeader, SubmitButton, TextArea } from "@/components/site";
import { requestAccessAction } from "@/app/actions";

export const metadata: Metadata = {
  title: "בקשת גישה",
  description: "הגשת בקשה לגישה מאובטחת לאזור החברים.",
};

export default async function RequestAccessPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="בקשת גישה" title="הגשת בקשה לאזור החברים הפרטי להורים">
        אנחנו בודקות כל בקשה לפני מתן גישה כדי לשמור על פרטיות הקהילה.
      </SectionHeader>
      {params.error ? <p className="mt-8 rounded-2xl bg-rose-50 p-4 text-rose-800">אנא בדקו את הטופס ונסו שוב.</p> : null}
      <form action={requestAccessAction} className="mt-10 grid gap-5 rounded-3xl bg-white/85 p-6 shadow-sm">
        <Field label="שם מלא" name="full_name" required />
        <Field label="אימייל" name="email" type="email" required />
        <Field label="סיסמה" name="password" type="password" required />
        <Field label="מספר טלפון, לא חובה" name="phone" />
        <Field label="עיר או אזור, לא חובה" name="city_region" />
        <Field label="שפה מועדפת, לא חובה" name="preferred_language" />
        <TextArea label="למה תרצו לקבל גישה?" name="reason" required />
        <label className="flex gap-3 text-sm text-stone-700">
          <input name="agreed_to_rules" type="checkbox" required className="mt-1 h-4 w-4" />
          אני מסכים/ה לפעול לפי כללי הקהילה ולשמור על פרטיות חברים אחרים.
        </label>
        <label className="flex gap-3 text-sm text-stone-700">
          <input name="agreed_to_privacy" type="checkbox" required className="mt-1 h-4 w-4" />
          אני מסכים/ה לתנאי הפרטיות של אזור החברים המאובטח.
        </label>
        <SubmitButton>שליחת בקשה</SubmitButton>
      </form>
    </section>
  );
}
