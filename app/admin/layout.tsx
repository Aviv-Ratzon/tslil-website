import Link from "next/link";
import { signOutAction } from "@/app/actions";
import { requireAdmin } from "@/lib/auth";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const links = [
    ["לוח בקרה", "/admin"],
    ["משתמשים", "/admin/users"],
    ["משאבים", "/admin/resources"],
    ["פוסטים", "/admin/posts"],
    ["דיווחים", "/admin/reports"],
    ["פניות יצירת קשר", "/admin/contact-submissions"],
    ["הודעות", "/admin/announcements"],
  ];

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[16rem_1fr] lg:px-8">
      <aside className="h-fit rounded-3xl border border-stone-200 bg-white/85 p-4 shadow-sm">
        <p className="px-3 text-sm font-semibold text-stone-900">ניהול</p>
        <nav className="mt-4 grid gap-1">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-2xl px-3 py-2 text-sm font-medium text-stone-700 hover:bg-[#eef7f3]">
              {label}
            </Link>
          ))}
          <Link href="/member" className="rounded-2xl px-3 py-2 text-sm font-medium text-[#2f7468] hover:bg-[#eef7f3]">
            אזור החברים
          </Link>
        </nav>
        <form action={signOutAction} className="mt-4">
          <button className="w-full rounded-2xl px-3 py-2 text-right text-sm font-medium text-stone-700 hover:bg-stone-100">
            יציאה
          </button>
        </form>
      </aside>
      <div>{children}</div>
    </section>
  );
}
