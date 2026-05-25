import { z } from "zod";
import { bulletinCategories, resourceTypes } from "@/lib/content";

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

export const accessRequestSchema = z.object({
  full_name: requiredText("שם מלא"),
  email,
  password: z.string().min(8, "הסיסמה חייבת לכלול לפחות 8 תווים."),
  phone: optionalText,
  city_region: optionalText,
  preferred_language: optionalText,
  reason: requiredText("סיבה", 10),
  agreed_to_rules: z.literal("on", "יש לאשר את כללי הקהילה."),
  agreed_to_privacy: z.literal("on", "יש לאשר את תנאי הפרטיות."),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "סיסמה היא שדה חובה."),
});

export const resetPasswordSchema = z.object({
  email,
});

export const profileSchema = z.object({
  display_name: requiredText("שם תצוגה"),
  phone: optionalText,
  city_region: optionalText,
  preferred_language: optionalText,
  bio: z.string().trim().max(500, "הביוגרפיה חייבת לכלול עד 500 תווים.").optional().or(z.literal("")),
  contact_sharing_preference: z.enum(["approval_required", "platform_only", "share_after_connection"]),
});

export const bulletinPostSchema = z.object({
  title: requiredText("כותרת", 5),
  body: requiredText("תוכן הפוסט", 20),
  category: z.enum(bulletinCategories as [string, ...string[]]),
  city_region: optionalText,
  child_age_range: optionalText,
  allow_connection_requests: z.string().optional(),
});

export const connectionRequestSchema = z.object({
  post_id: z.uuid(),
  recipient_id: z.uuid(),
  message: requiredText("הודעה", 10).max(500),
});

export const reportPostSchema = z.object({
  post_id: z.uuid(),
  reason: requiredText("סיבה"),
  details: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const resourceSchema = z.object({
  title: requiredText("כותרת"),
  description: requiredText("תיאור", 10),
  type: z.enum(resourceTypes as [string, ...string[]]),
  category_id: optionalText,
  visibility: z.enum(["public", "members", "admins"]),
  file_path: optionalText,
  external_url: optionalText,
  video_url: optionalText,
  thumbnail_path: optionalText,
});

export const adminUserSchema = z.object({
  user_id: z.uuid(),
  role: z.enum(["pending", "member", "admin"]),
  approval_status: z.enum(["pending", "approved", "rejected", "suspended"]),
});

export const announcementSchema = z.object({
  title: requiredText("כותרת"),
  body: requiredText("תוכן", 10),
  visibility: z.enum(["public", "members", "admins"]),
});
