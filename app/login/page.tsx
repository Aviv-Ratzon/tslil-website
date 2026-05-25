import type { Metadata } from "next";
import { Field, SectionHeader, SubmitButton } from "@/components/site";
import { loginAction, resetPasswordAction } from "@/app/actions";

export const metadata: Metadata = {
  title: "כניסה",
  description: "כניסה לאזור החברים הפרטי להורים.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; reset?: string }> }) {
  const params = await searchParams;

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
      <div>
        <SectionHeader eyebrow="כניסה" title="גישה לאזור החברים המאובטח" />
        <p className="mt-6 text-stone-700">
          חברות וחברים מאושרים יכולים לגשת למשאבים, הודעות, פוסטים פרטיים בלוח המודעות ובקשות קשר.
        </p>
      </div>
      <div className="space-y-6">
        {params.error ? <p className="rounded-2xl bg-rose-50 p-4 text-rose-800">הכניסה נכשלה. אנא בדקו את הפרטים.</p> : null}
        {params.reset ? <p className="rounded-2xl bg-emerald-50 p-4 text-emerald-800">אם האימייל קיים במערכת, נשלחו הוראות לאיפוס סיסמה.</p> : null}
        <form action={loginAction} className="grid gap-5 rounded-3xl bg-white/85 p-6 shadow-sm">
          <Field label="אימייל" name="email" type="email" required />
          <Field label="סיסמה" name="password" type="password" required />
          <SubmitButton>כניסה</SubmitButton>
        </form>
        <form action={resetPasswordAction} className="grid gap-4 rounded-3xl border border-stone-200 bg-white/60 p-6">
          <h2 className="font-semibold text-stone-900">איפוס סיסמה</h2>
          <Field label="אימייל" name="email" type="email" required />
          <SubmitButton>שליחת קישור איפוס</SubmitButton>
        </form>
      </div>
    </section>
  );
}
