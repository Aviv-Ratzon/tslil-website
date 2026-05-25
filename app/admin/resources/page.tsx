import { adminSaveResourceAction } from "@/app/actions";
import { Card, EmptyState, Field, ResourceCard, SectionHeader, SubmitButton, TextArea } from "@/components/site";
import { resourceTypes } from "@/lib/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Resource } from "@/types/database";

export default async function AdminResourcesPage() {
  const supabase = await createSupabaseServerClient();
  const resourceTypeLabels: Record<string, string> = {
    article: "מאמר",
    pdf: "PDF",
    image: "תמונה",
    video: "סרטון",
    external_link: "קישור חיצוני",
    worksheet: "דף עבודה",
    guide: "מדריך",
  };
  const [{ data: resources }, { data: categories }] = await Promise.all([
    supabase.from("resources").select("*, resource_categories(name, slug)").order("created_at", { ascending: false }).limit(100),
    supabase.from("resource_categories").select("*").order("name"),
  ]);

  return (
    <section className="space-y-8">
      <SectionHeader eyebrow="משאבים" title="יצירה וניהול של משאבים ציבוריים ופרטיים" />
      <Card>
        <h2 className="text-xl font-semibold text-[#203632]">יצירת משאב</h2>
        <p className="mt-2 text-sm text-stone-600">העלו קבצים ל-Supabase Storage, ואז הדביקו כאן את נתיב הקובץ הפרטי או קישור חיצוני.</p>
        <form action={adminSaveResourceAction} className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="כותרת" name="title" required />
          <Field label="סוג" name="type" required>
            <select name="type" required className="mt-2 w-full rounded-2xl border border-stone-300 px-4 py-3">
              {resourceTypes.map((type) => <option key={type} value={type}>{resourceTypeLabels[type]}</option>)}
            </select>
          </Field>
          <Field label="קטגוריה" name="category_id">
            <select name="category_id" className="mt-2 w-full rounded-2xl border border-stone-300 px-4 py-3">
              <option value="">ללא</option>
              {categories?.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </Field>
          <Field label="נראות" name="visibility">
            <select name="visibility" defaultValue="members" className="mt-2 w-full rounded-2xl border border-stone-300 px-4 py-3">
              <option value="public">ציבורי</option>
              <option value="members">חברים</option>
              <option value="admins">מנהלים</option>
            </select>
          </Field>
          <div className="md:col-span-2"><TextArea label="תיאור" name="description" required rows={3} /></div>
          <Field label="נתיב קובץ פרטי" name="file_path" />
          <Field label="קישור חיצוני" name="external_url" />
          <Field label="קישור לסרטון" name="video_url" />
          <Field label="נתיב תמונה ממוזערת" name="thumbnail_path" />
          <div className="md:col-span-2"><SubmitButton>יצירת משאב</SubmitButton></div>
        </form>
      </Card>
      {resources?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {(resources as Resource[]).map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
        </div>
      ) : <EmptyState title="אין משאבים עדיין" />}
    </section>
  );
}
