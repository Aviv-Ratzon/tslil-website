import { Resend } from "resend";
import type { z } from "zod";
import { contactSchema } from "@/lib/validation";

type ContactPayload = z.infer<typeof contactSchema>;

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return null;
  }

  return { apiKey, to, from };
}

export async function sendContactEmail(data: ContactPayload) {
  const config = getEmailConfig();
  if (!config) {
    throw new Error("חסרים משתני סביבה לשליחת אימייל (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL).");
  }

  const resend = new Resend(config.apiKey);
  const phone = data.phone?.trim() || "לא צוין";
  const reason = data.reason?.trim() || "לא צוינה";

  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: data.email,
    subject: `פנייה חדשה מהאתר — ${data.full_name}`,
    text: [
      `שם: ${data.full_name}`,
      `אימייל: ${data.email}`,
      `טלפון: ${phone}`,
      `סיבת הפנייה: ${reason}`,
      "",
      "הודעה:",
      data.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}
