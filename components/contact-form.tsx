import { Field, SubmitButton, TextArea } from "@/components/site";
import { contactAction } from "@/app/actions";

export function ContactForm({
  returnTo = "/contact",
  sent,
  error,
  compact = false,
}: {
  returnTo?: string;
  sent?: boolean;
  error?: boolean;
  compact?: boolean;
}) {
  return (
    <>
      {sent ? <p className="rounded-2xl bg-emerald-50 p-4 text-emerald-800">תודה. ההודעה התקבלה.</p> : null}
      {error ? <p className="rounded-2xl bg-rose-50 p-4 text-rose-800">אנא בדקו את הטופס ונסו שוב.</p> : null}
      <form
        action={contactAction}
        className={`paper-panel grid rounded-3xl ${compact ? "gap-4 p-5 sm:grid-cols-2" : "gap-5 p-6"}`}
      >
        <input type="hidden" name="return_to" value={returnTo} />
        <Field label="שם מלא" name="full_name" required compact={compact} />
        <Field label="אימייל" name="email" type="email" required compact={compact} />
        <Field label="מספר טלפון, לא חובה" name="phone" compact={compact} />
        <Field label="אזור מגורים" name="residence_area" required compact={compact} />
        <Field label="סיבת הפנייה" name="reason" className={compact ? "sm:col-span-2" : undefined}>
          <select
            name="reason"
            className={`mt-2 w-full rounded-2xl border border-brand/25 bg-paper text-ink ${compact ? "px-4 py-2.5" : "px-4 py-3"}`}
          >
            <option value="">בחרו סיבה</option>
            <option>קבוצה המבקשת ליווי</option>
            <option>ייעוץ חד פעמי</option>
            <option>שיתוף פעולה</option>
            <option>הצטרפות לקהילה</option>
            <option>אחר</option>
          </select>
        </Field>
        <TextArea label="הודעה" name="message" required rows={compact ? 3 : 5} className={compact ? "sm:col-span-2" : undefined} compact={compact} />
        <label className={`flex gap-3 text-sm text-muted ${compact ? "sm:col-span-2" : ""}`}>
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4" />
          אני מסכים/ה שפרטיי ישמרו לטיפול בפנייתי.
        </label>
        <div className={compact ? "sm:col-span-2 [&_button]:w-full" : undefined}>
          <SubmitButton>שליחת הודעה</SubmitButton>
        </div>
      </form>
    </>
  );
}
