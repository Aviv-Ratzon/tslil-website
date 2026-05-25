import { redirect } from "next/navigation";
import { requireApprovedMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireApprovedMember();
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: resource } = await supabase.from("resources").select("*").eq("id", id).single();

  if (!resource?.file_path || resource.visibility === "admins") {
    redirect("/unauthorized");
  }

  const { data, error } = await supabase.storage.from("private-resources").createSignedUrl(resource.file_path, 60 * 5);
  if (error || !data?.signedUrl) redirect("/member/resources?error=file");
  redirect(data.signedUrl);
}
