import { respondConnectionRequestAction } from "@/app/actions";
import { Card, EmptyState, SectionHeader, StatusBadge, SubmitButton } from "@/components/site";
import { requireApprovedMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function ConnectionRequestsPage() {
  const { user } = await requireApprovedMember();
  const supabase = await createSupabaseServerClient();
  const { data: requests } = await supabase
    .from("connection_requests")
    .select("*, bulletin_posts(title)")
    .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  return (
    <section className="space-y-8">
      <SectionHeader eyebrow="בקשות קשר" title="שיתוף פרטי קשר מתבצע רק לאחר אישור" />
      {requests?.length ? (
        <div className="grid gap-4">
          {requests.map((request) => {
            const incoming = request.recipient_id === user.id;
            return (
              <Card key={request.id}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <StatusBadge label={request.status} tone={request.status === "approved" ? "green" : request.status === "rejected" ? "red" : "amber"} />
                    <h2 className="mt-3 text-lg font-semibold text-stone-900">
                      {incoming ? "בקשה נכנסת" : "בקשה שנשלחה"} עבור {request.bulletin_posts?.title ?? "פוסט"}
                    </h2>
                    <p className="mt-2 text-stone-700">{request.message}</p>
                    <p className="mt-2 text-xs text-stone-500">{formatDate(request.created_at)}</p>
                  </div>
                  {incoming && request.status === "pending" ? (
                    <div className="flex gap-2">
                      <form action={respondConnectionRequestAction}>
                        <input type="hidden" name="request_id" value={request.id} />
                        <input type="hidden" name="status" value="approved" />
                        <SubmitButton>אישור</SubmitButton>
                      </form>
                      <form action={respondConnectionRequestAction}>
                        <input type="hidden" name="request_id" value={request.id} />
                        <input type="hidden" name="status" value="rejected" />
                        <button className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700">דחייה</button>
                      </form>
                    </div>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState title="אין בקשות קשר עדיין" />
      )}
    </section>
  );
}
