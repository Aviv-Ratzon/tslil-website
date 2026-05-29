"use server";

import { redirect } from "next/navigation";
import { contactSchema } from "@/lib/validation";

export async function contactAction(formData: FormData) {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const returnTo = typeof formData.get("return_to") === "string" ? formData.get("return_to") : "/contact";
    const base = returnTo === "/" ? "/" : "/contact";
    redirect(`${base}?error=validation`);
  }

  const returnTo = typeof formData.get("return_to") === "string" && formData.get("return_to") === "/" ? "/" : "/contact";

  // ניתן לחבר כאן שליחת אימייל או CRM; כרגע הטופס מאומת ומציג אישור למשתמש.
  redirect(`${returnTo}?sent=1`);
}
