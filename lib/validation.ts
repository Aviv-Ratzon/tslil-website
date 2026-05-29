import { z } from "zod";

const email = z.email("יש להזין כתובת אימייל תקינה.");
const requiredText = (label: string, min = 2) => z.string().trim().min(min, `${label} הוא שדה חובה.`);
const optionalText = z.string().trim().optional().or(z.literal(""));

export const contactSchema = z.object({
  full_name: requiredText("שם מלא"),
  email,
  phone: optionalText,
  reason: optionalText,
  message: requiredText("הודעה", 10),
  consent: z.literal("on", "נדרשת הסכמה."),
});
