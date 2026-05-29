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
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    if (process.env.NODE_ENV === "development") {
      console.error("[contactAction] validation failed");
      console.error("  submitted fields:", raw);
      console.error("  field errors:", parsed.error.flatten().fieldErrors);
      console.error("  form errors:", parsed.error.flatten().formErrors);
    }
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
