import { adminUpdateUserAction } from "@/app/actions";
import { Card, EmptyState, SectionHeader, StatusBadge } from "@/components/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(100);
  if (params.q) query = query.or(`email.ilike.%${params.q}%,full_name.ilike.%${params.q}%,display_name.ilike.%${params.q}%`);
  const { data: users } = await query;

  return (
    <section className="space-y-8">
      <SectionHeader eyebrow="משתמשים" title="אישור, דחייה, השעיה והגדרת תפקידים" />
      <form className="rounded-3xl bg-white/85 p-4 shadow-sm">
        <input name="q" placeholder="חיפוש משתמשים" defaultValue={params.q} className="w-full rounded-2xl border border-stone-300 px-4 py-3" />
      </form>
      {users?.length ? (
        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                <div>
                  <h2 className="font-semibold text-stone-900">{user.full_name ?? user.email}</h2>
                  <p className="mt-1 text-sm text-stone-600">{user.email} · הצטרפות: {formatDate(user.created_at)}</p>
                  <div className="mt-3 flex gap-2"><StatusBadge label={user.role} /><StatusBadge label={user.approval_status} /></div>
                </div>
                <form action={adminUpdateUserAction} className="flex flex-wrap items-end gap-2">
                  <input type="hidden" name="user_id" value={user.id} />
                  <select name="role" defaultValue={user.role} className="rounded-2xl border border-stone-300 px-3 py-2">
                    <option value="pending">בהמתנה</option>
                    <option value="member">חבר/ה</option>
                    <option value="admin">מנהלת</option>
                  </select>
                  <select name="approval_status" defaultValue={user.approval_status} className="rounded-2xl border border-stone-300 px-3 py-2">
                    <option value="pending">בהמתנה</option>
                    <option value="approved">מאושר</option>
                    <option value="rejected">נדחה</option>
                    <option value="suspended">מושעה</option>
                  </select>
                  <button className="rounded-full bg-[#2f7468] px-4 py-2 text-sm font-semibold text-white">שמירה</button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="לא נמצאו משתמשים" />
      )}
    </section>
  );
}
