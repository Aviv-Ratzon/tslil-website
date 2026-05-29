"use server";

import { redirect } from "next/navigation";
import { sendContactEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validation";

function contactReturnPath(formData: FormData) {
  const returnTo = formData.get("return_to");
  return typeof returnTo === "string" && returnTo === "/" ? "/" : "/contact";
}

export async function contactAction(formData: FormData) {
  const returnPath = contactReturnPath(formData);
  const parsed = contactSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    redirect(`${returnPath}?error=validation`);
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    console.error("Contact form email failed:", error);
    redirect(`${returnPath}?error=submit`);
  }

  redirect(`${returnPath}?sent=1`);
}
