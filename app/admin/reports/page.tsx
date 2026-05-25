import { adminUpdateReportStatusAction } from "@/app/actions";
import { Card, EmptyState, SectionHeader, StatusBadge } from "@/components/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function AdminReportsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: reports } = await supabase.from("reports").select("*, bulletin_posts(title)").order("created_at", { ascending: false }).limit(100);

  return (
    <section className="space-y-8">
      <SectionHeader eyebrow="דיווחים" title="בדיקת דיווחי בטיחות מהקהילה" />
      {reports?.length ? (
        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                <div>
                  <StatusBadge label={report.status} tone={report.status === "open" ? "amber" : "green"} />
                  <h2 className="mt-3 text-lg font-semibold text-stone-900">{report.reason}</h2>
                  <p className="mt-2 text-stone-700">{report.details}</p>
                  <p className="mt-2 text-xs text-stone-500">פוסט: {report.bulletin_posts?.title ?? report.post_id} · {formatDate(report.created_at)}</p>
                </div>
                <form action={adminUpdateReportStatusAction} className="flex items-end gap-2">
                  <input type="hidden" name="report_id" value={report.id} />
                  <select name="status" defaultValue={report.status} className="rounded-2xl border border-stone-300 px-3 py-2">
                    <option value="open">פתוח</option>
                    <option value="reviewing">בבדיקה</option>
                    <option value="resolved">טופל</option>
                    <option value="dismissed">נסגר</option>
                  </select>
                  <button className="rounded-full bg-[#2f7468] px-4 py-2 text-sm font-semibold text-white">שמירה</button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      ) : <EmptyState title="אין דיווחים" />}
    </section>
  );
}
