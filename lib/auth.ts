import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export async function getCurrentProfile() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null as Profile | null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile: profile as Profile | null };
}

export async function requireUserProfile() {
  const { user, profile } = await getCurrentProfile();
  if (!user) redirect("/login");
  if (!profile) redirect("/pending-approval");
  if (profile.approval_status === "suspended") redirect("/suspended");
  return { user, profile };
}

export async function requireApprovedMember() {
  const context = await requireUserProfile();
  const isApproved =
    context.profile.approval_status === "approved" &&
    (context.profile.role === "member" || context.profile.role === "admin");

  if (!isApproved) redirect("/pending-approval");
  return context;
}

export async function requireAdmin() {
  const context = await requireUserProfile();
  if (context.profile.role !== "admin" || context.profile.approval_status !== "approved") {
    redirect("/unauthorized");
  }
  return context;
}
