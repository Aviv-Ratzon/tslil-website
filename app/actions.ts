"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, requireApprovedMember, requireUserProfile } from "@/lib/auth";
import {
  accessRequestSchema,
  adminUserSchema,
  announcementSchema,
  bulletinPostSchema,
  connectionRequestSchema,
  contactSchema,
  loginSchema,
  profileSchema,
  reportPostSchema,
  resetPasswordSchema,
  resourceSchema,
} from "@/lib/validation";
import { slugify } from "@/lib/utils";

function formObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

function nullable(value: unknown) {
  return typeof value === "string" && value.trim() === "" ? null : value;
}

export async function contactAction(formData: FormData) {
  const parsed = contactSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/contact?error=validation");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("contact_submissions").insert({
    ...parsed.data,
    phone: nullable(parsed.data.phone),
    reason: nullable(parsed.data.reason),
    consent: true,
  });

  if (error) redirect("/contact?error=submit");
  redirect("/contact?sent=1");
}

export async function requestAccessAction(formData: FormData) {
  const parsed = accessRequestSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/request-access?error=validation");

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        city_region: parsed.data.city_region,
        preferred_language: parsed.data.preferred_language,
      },
    },
  });

  if (error) redirect("/request-access?error=account");

  const { error: requestError } = await supabase.from("access_requests").insert({
    user_id: data.user?.id ?? null,
    full_name: parsed.data.full_name,
    email: parsed.data.email,
    phone: nullable(parsed.data.phone),
    city_region: nullable(parsed.data.city_region),
    preferred_language: nullable(parsed.data.preferred_language),
    reason: parsed.data.reason,
    agreed_to_rules: true,
    agreed_to_privacy: true,
  });

  if (requestError) redirect("/request-access?error=submit");
  redirect("/pending-approval");
}

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/login?error=validation");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) redirect("/login?error=credentials");
  redirect("/member");
}

export async function resetPasswordAction(formData: FormData) {
  const parsed = resetPasswordSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/login?error=validation");

  const supabase = await createSupabaseServerClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/login`,
  });
  redirect("/login?reset=1");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateProfileAction(formData: FormData) {
  const { user } = await requireUserProfile();
  const parsed = profileSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/member/profile?error=validation");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: parsed.data.display_name,
      phone: nullable(parsed.data.phone),
      city_region: nullable(parsed.data.city_region),
      preferred_language: nullable(parsed.data.preferred_language),
      bio: nullable(parsed.data.bio),
      contact_sharing_preference: parsed.data.contact_sharing_preference,
    })
    .eq("id", user.id);

  if (error) redirect("/member/profile?error=submit");
  revalidatePath("/member/profile");
  redirect("/member/profile?saved=1");
}

export async function createPostAction(formData: FormData) {
  const { user } = await requireApprovedMember();
  const parsed = bulletinPostSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/member/bulletin-board/new?error=validation");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("bulletin_posts").insert({
    author_id: user.id,
    title: parsed.data.title,
    body: parsed.data.body,
    category: parsed.data.category,
    city_region: nullable(parsed.data.city_region),
    child_age_range: nullable(parsed.data.child_age_range),
    allow_connection_requests: parsed.data.allow_connection_requests === "on",
    status: "published",
  });

  if (error) redirect("/member/bulletin-board/new?error=submit");
  revalidatePath("/member/bulletin-board");
  redirect("/member/bulletin-board");
}

export async function deleteOwnPostAction(formData: FormData) {
  const { user } = await requireApprovedMember();
  const postId = String(formData.get("post_id") ?? "");
  const supabase = await createSupabaseServerClient();
  await supabase.from("bulletin_posts").update({ status: "deleted" }).eq("id", postId).eq("author_id", user.id);
  revalidatePath("/member/bulletin-board");
}

export async function createConnectionRequestAction(formData: FormData) {
  const { user } = await requireApprovedMember();
  const parsed = connectionRequestSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/member/bulletin-board?error=connection");

  const supabase = await createSupabaseServerClient();
  await supabase.from("connection_requests").insert({
    requester_id: user.id,
    recipient_id: parsed.data.recipient_id,
    post_id: parsed.data.post_id,
    message: parsed.data.message,
  });
  revalidatePath("/member/connection-requests");
  redirect("/member/connection-requests?sent=1");
}

export async function respondConnectionRequestAction(formData: FormData) {
  const { user } = await requireApprovedMember();
  const requestId = String(formData.get("request_id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!["approved", "rejected", "cancelled"].includes(status)) redirect("/member/connection-requests?error=status");

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("connection_requests")
    .update({ status })
    .eq("id", requestId)
    .or(`recipient_id.eq.${user.id},requester_id.eq.${user.id}`);
  revalidatePath("/member/connection-requests");
}

export async function reportPostAction(formData: FormData) {
  const { user } = await requireApprovedMember();
  const parsed = reportPostSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/member/bulletin-board?error=report");

  const supabase = await createSupabaseServerClient();
  await supabase.from("reports").insert({
    reporter_id: user.id,
    post_id: parsed.data.post_id,
    reason: parsed.data.reason,
    details: nullable(parsed.data.details),
  });
  redirect("/member/bulletin-board?reported=1");
}

export async function adminUpdateUserAction(formData: FormData) {
  const { user } = await requireAdmin();
  const parsed = adminUserSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/admin/users?error=validation");
  if (parsed.data.user_id === user.id && parsed.data.role !== "admin") redirect("/admin/users?error=self");

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("profiles")
    .update({ role: parsed.data.role, approval_status: parsed.data.approval_status })
    .eq("id", parsed.data.user_id);

  await supabase
    .from("access_requests")
    .update({ status: parsed.data.approval_status, reviewed_at: new Date().toISOString(), reviewed_by: user.id })
    .eq("user_id", parsed.data.user_id);

  revalidatePath("/admin/users");
}

export async function adminSaveResourceAction(formData: FormData) {
  const { user } = await requireAdmin();
  const parsed = resourceSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/admin/resources?error=validation");

  const supabase = await createSupabaseServerClient();
  await supabase.from("resources").insert({
    title: parsed.data.title,
    slug: slugify(parsed.data.title),
    description: parsed.data.description,
    type: parsed.data.type,
    category_id: nullable(parsed.data.category_id),
    visibility: parsed.data.visibility,
    file_path: nullable(parsed.data.file_path),
    external_url: nullable(parsed.data.external_url),
    video_url: nullable(parsed.data.video_url),
    thumbnail_path: nullable(parsed.data.thumbnail_path),
    created_by: user.id,
  });
  revalidatePath("/admin/resources");
  revalidatePath("/member/resources");
}

export async function adminUpdatePostStatusAction(formData: FormData) {
  await requireAdmin();
  const postId = String(formData.get("post_id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!["published", "hidden", "deleted", "pending"].includes(status)) redirect("/admin/posts?error=status");
  const supabase = await createSupabaseServerClient();
  await supabase.from("bulletin_posts").update({ status }).eq("id", postId);
  revalidatePath("/admin/posts");
}

export async function adminUpdateReportStatusAction(formData: FormData) {
  const { user } = await requireAdmin();
  const reportId = String(formData.get("report_id") ?? "");
  const status = String(formData.get("status") ?? "");
  const supabase = await createSupabaseServerClient();
  await supabase
    .from("reports")
    .update({ status, reviewed_at: new Date().toISOString(), reviewed_by: user.id })
    .eq("id", reportId);
  revalidatePath("/admin/reports");
}

export async function adminUpdateContactStatusAction(formData: FormData) {
  await requireAdmin();
  const submissionId = String(formData.get("submission_id") ?? "");
  const status = String(formData.get("status") ?? "read");
  const supabase = await createSupabaseServerClient();
  await supabase.from("contact_submissions").update({ status }).eq("id", submissionId);
  revalidatePath("/admin/contact-submissions");
}

export async function adminSaveAnnouncementAction(formData: FormData) {
  const { user } = await requireAdmin();
  const parsed = announcementSchema.safeParse(formObject(formData));
  if (!parsed.success) redirect("/admin/announcements?error=validation");
  const supabase = await createSupabaseServerClient();
  await supabase.from("announcements").insert({ ...parsed.data, created_by: user.id });
  revalidatePath("/admin/announcements");
  revalidatePath("/member");
}
