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
      <form action={contactAction} className="paper-panel grid gap-5 rounded-3xl p-6">
        <input type="hidden" name="return_to" value={returnTo} />
        <Field label="שם מלא" name="full_name" required />
        <Field label="אימייל" name="email" type="email" required />
        <Field label="מספר טלפון, לא חובה" name="phone" />
        <Field label="אזור מגורים" name="residence_area" required />
        <Field label="סיבת הפנייה" name="reason">
          <select name="reason" className="mt-2 w-full rounded-2xl border border-brand/25 bg-paper px-4 py-3 text-ink">
            <option value="">בחרו סיבה</option>
            <option>קבוצה המבקשת ליווי</option>
            <option>ייעוץ חד פעמי</option>
            <option>שיתוף פעולה</option>
            <option>הצטרפות לקהילה</option>
            <option>אחר</option>
          </select>
        </Field>
        <TextArea label="הודעה" name="message" required />
        <label className="flex gap-3 text-sm text-muted">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4" />
          אני מסכים/ה שפרטיי ישמרו לטיפול בפנייתי.
        </label>
        <SubmitButton>שליחת הודעה</SubmitButton>
      </form>
    </>
  );
}
