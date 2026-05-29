import { Field, SubmitButton, TextArea } from "@/components/site";
import { contactAction } from "@/app/actions";

export function ContactForm({
  returnTo = "/contact",
  sent,
  error,
}: {
  returnTo?: string;
  sent?: boolean;
  error?: boolean;
}) {
  return (
    <>
      {sent ? <p className="rounded-2xl bg-emerald-50 p-4 text-emerald-800">תודה. ההודעה התקבלה.</p> : null}
      {error ? <p className="rounded-2xl bg-rose-50 p-4 text-rose-800">אנא בדקו את הטופס ונסו שוב.</p> : null}
      <form action={contactAction} className="grid gap-5 rounded-3xl bg-white/85 p-6 shadow-sm">
        <input type="hidden" name="return_to" value={returnTo} />
        <Field label="שם מלא" name="full_name" required />
        <Field label="אימייל" name="email" type="email" required />
        <Field label="מספר טלפון, לא חובה" name="phone" />
        <Field label="סיבת הפנייה" name="reason">
          <select name="reason" className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3">
            <option value="">בחרו סיבה</option>
            <option>ייעוץ</option>
            <option>סדנה</option>
            <option>ליווי מתמשך</option>
            <option>אחר</option>
          </select>
        </Field>
        <TextArea label="הודעה" name="message" required />
        <label className="flex gap-3 text-sm text-stone-700">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4" />
          אני מסכים/ה שיצרו איתי קשר בנוגע להודעה שלי.
        </label>
        <SubmitButton>שליחת הודעה</SubmitButton>
      </form>
    </>
  );
}
