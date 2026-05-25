import Link from "next/link";
import { ArrowLeft, BookOpen, Heart, Leaf, Lock, Menu, MessageCircle, ShieldCheck } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/content";
import type { BulletinPost, Profile, Resource } from "@/types/database";

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "primary" && "bg-[#21483f] text-[#fffaf1] shadow-lg shadow-[#21483f]/15 hover:bg-[#18362f]",
        variant === "secondary" && "border border-[#8b6f4a]/25 bg-[#fffaf1] text-[#21483f] hover:bg-[#f3e8d6]",
        variant === "ghost" && "text-[#21483f] hover:bg-[#efe2cf]",
      )}
    >
      {children}
    </Link>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-full bg-[#21483f] px-5 py-3 text-sm font-semibold text-[#fffaf1] shadow-lg shadow-[#21483f]/15 transition hover:bg-[#18362f] disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function Navbar({ profile }: { profile?: Profile | null }) {
  const publicLinks = [
    ["בית", "/"],
    ["אודות", "/about"],
    ["שירותים", "/services"],
    ["משאבים", "/resources"],
    ["לוח מודעות", "/bulletin-board"],
    ["יצירת קשר", "/contact"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#8b6f4a]/15 bg-[#f6efe4]/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3 text-[#21483f]">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8b6f4a]/20 bg-[#fffaf1] font-display text-xl shadow-sm">
            צ
          </span>
          <span>
            <span className="block font-display text-xl font-bold leading-none tracking-tight">{siteConfig.name}</span>
            <span className="mt-1 block text-xs text-[#6f5a3b]">מרחב להורים, הקשבה וקהילה</span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 rounded-full border border-[#8b6f4a]/15 bg-[#fffaf1]/70 px-5 py-2 text-sm font-medium text-[#554936] shadow-sm md:flex">
          {publicLinks.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-[#21483f]">
              {label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {profile ? (
            <ButtonLink href={profile.role === "admin" ? "/admin" : "/member"} variant="secondary">
              אזור אישי
            </ButtonLink>
          ) : (
            <>
              <ButtonLink href="/login" variant="ghost">
                כניסה
              </ButtonLink>
              <ButtonLink href="/request-access">בקשת גישה</ButtonLink>
            </>
          )}
        </div>
        <details className="group relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#8b6f4a]/20 bg-[#fffaf1] px-4 py-2 text-sm font-semibold text-[#21483f] shadow-sm [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5" aria-hidden />
            תפריט
          </summary>
          <div className="absolute left-0 top-12 z-50 w-72 rounded-[1.5rem] border border-[#8b6f4a]/15 bg-[#fffaf1] p-3 text-sm font-medium text-[#554936] shadow-2xl shadow-[#2f2a22]/10">
            <div className="grid gap-1">
              {publicLinks.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-2xl px-4 py-3 hover:bg-[#efe2cf] hover:text-[#21483f]">
                  {label}
                </Link>
              ))}
            </div>
            <div className="soft-divider my-3" />
            <div className="grid gap-2">
              {profile ? (
                <Link
                  href={profile.role === "admin" ? "/admin" : "/member"}
                  className="rounded-2xl bg-[#21483f] px-4 py-3 text-center font-semibold text-[#fffaf1]"
                >
                  אזור אישי
                </Link>
              ) : (
                <>
                  <Link href="/login" className="rounded-2xl px-4 py-3 text-center font-semibold text-[#21483f] hover:bg-[#efe2cf]">
                    כניסה
                  </Link>
                  <Link href="/request-access" className="rounded-2xl bg-[#21483f] px-4 py-3 text-center font-semibold text-[#fffaf1]">
                    בקשת גישה
                  </Link>
                </>
              )}
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#8b6f4a]/15 bg-[#21483f] text-[#f6efe4]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold">{siteConfig.name}</p>
          <p className="mt-3 leading-7 text-[#e5d8c5]">{siteConfig.description}</p>
        </div>
        <div>
          <p className="font-semibold text-white">פרטיות לפני הכל</p>
          <p className="mt-3 leading-7 text-[#e5d8c5]">מידע של חברות וחברים, פוסטים בלוח המודעות ומשאבים פרטיים מוגנים באמצעות בדיקות הרשאה ומדיניות אבטחה בבסיס הנתונים.</p>
        </div>
        <div>
          <p className="font-semibold text-white">יצירת קשר</p>
          <p className="mt-3 text-[#e5d8c5]">{siteConfig.email}</p>
        </div>
      </div>
    </footer>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#efe2cf] to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">
        <div className="paper-panel rounded-[2.5rem] p-8 sm:p-12">
          <span className="inline-flex rounded-full border border-[#8b6f4a]/20 bg-[#fffaf1] px-4 py-2 text-sm font-semibold text-[#6f5a3b]">
            הדרכת הורים ברוגע, בהירות וקהילה
          </span>
          <h1 className="mt-8 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-[#21483f] sm:text-7xl">
            להקשיב לילדים.
            <br />
            להחזיר אוויר להורות.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-[#554936]">
            שירות הדרכה מקצועי בהובלת שתי נשים, המשלב פגישות אישיות, משאבים מועילים ומרחב פרטי ומאובטח להורים מאושרים.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact">דברו איתנו</ButtonLink>
            <ButtonLink href="/request-access" variant="secondary">
              בקשת גישה
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              צפייה בשירותים
            </ButtonLink>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -right-8 top-8 h-32 w-32 rounded-full bg-[#b56f4d]/15 blur-2xl" />
          <div className="absolute -left-6 bottom-10 h-40 w-40 rounded-full bg-[#708b75]/20 blur-2xl" />
          <div className="paper-panel relative rounded-[3rem] p-8 sm:p-10">
            <p className="decorative-mark">״</p>
            <div className="space-y-5 font-display text-3xl font-semibold leading-tight text-[#21483f] sm:text-4xl">
              <p>ממאבק כוחות</p>
              <p className="pr-8 text-[#b56f4d]">למפגש בין רצונות</p>
              <p>מבלבול יומיומי</p>
              <p className="pr-8 text-[#b56f4d]">לשפה של קרבה</p>
            </div>
            <div className="soft-divider my-8" />
            <div className="grid gap-4">
              {[
                ["מרחב פרטי ומאושר", ShieldCheck],
                ["משאבים עדינים ומעשיים", BookOpen],
                ["בקשות קשר ששומרות על פרטיות", Lock],
                ["קהילה שרואה את ההורה", Heart],
              ].map(([label, Icon]) => (
                <div key={label as string} className="flex items-center gap-4 rounded-2xl bg-[#f1e5d2]/70 p-4">
                  <Icon className="h-5 w-5 text-[#b56f4d]" aria-hidden />
                  <span className="font-medium text-[#3f3528]">{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className="text-sm font-semibold tracking-[0.18em] text-[#b56f4d]">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#21483f] sm:text-5xl">{title}</h2>
      {children ? <p className="mt-5 text-lg leading-9 text-[#554936]">{children}</p> : null}
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("paper-panel rounded-[2rem] p-6", className)}>{children}</div>;
}

export function ServiceCard({ service }: { service: { title: string; description: string; audience: string; format: string } }) {
  return (
    <Card>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#efe2cf] text-[#b56f4d]">
        <Leaf className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="font-display text-2xl font-semibold text-[#21483f]">{service.title}</h3>
      <p className="mt-3 leading-7 text-[#554936]">{service.description}</p>
      <dl className="mt-6 space-y-3 text-sm text-[#6f5a3b]">
        <div>
          <dt className="font-semibold text-[#2f2a22]">למי זה מתאים</dt>
          <dd>{service.audience}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#2f2a22]">מבנה</dt>
          <dd>{service.format}</dd>
        </div>
      </dl>
      <Link href="/contact" className="mt-6 inline-flex items-center text-sm font-semibold text-[#21483f]">
        לשאלה על השירות <ArrowLeft className="mr-1 h-4 w-4" aria-hidden />
      </Link>
    </Card>
  );
}

export function ProfileCard({ provider }: { provider: { name: string; title: string; expertise: string[]; bio: string } }) {
  return (
    <Card>
      <div className="flex h-48 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#efe2cf] to-[#d8c8ad] text-sm font-semibold text-[#6f5a3b]">
        תמונה אישית
      </div>
      <h3 className="mt-6 font-display text-3xl font-semibold text-[#21483f]">{provider.name}</h3>
      <p className="text-sm font-medium text-[#b56f4d]">{provider.title}</p>
      <p className="mt-4 leading-7 text-[#554936]">{provider.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {provider.expertise.map((item) => (
          <span key={item} className="rounded-full bg-[#efe2cf] px-3 py-1 text-xs font-medium text-[#6f5a3b]">
            {item}
          </span>
        ))}
      </div>
    </Card>
  );
}

export function ResourceCard({ resource }: { resource: Partial<Resource> & { title: string; type?: string | null; description?: string | null } }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <StatusBadge label={resource.type ?? "resource"} />
        {resource.visibility ? <StatusBadge label={resource.visibility} tone={resource.visibility === "public" ? "green" : "amber"} /> : null}
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-[#21483f]">{resource.title}</h3>
      <p className="mt-3 flex-1 leading-7 text-[#554936]">{resource.description}</p>
      {resource.created_at ? <p className="mt-5 text-xs text-[#8b6f4a]">נוסף בתאריך {formatDate(resource.created_at)}</p> : null}
    </Card>
  );
}

export function BulletinPostCard({ post, href }: { post: BulletinPost; href?: string }) {
  const content = (
    <Card className="h-full">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge label={post.category} />
        <StatusBadge label={post.status} tone={post.status === "published" ? "green" : "amber"} />
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold text-[#21483f]">{post.title}</h3>
      <p className="mt-3 line-clamp-3 leading-7 text-[#554936]">{post.body}</p>
      <p className="mt-5 text-xs text-[#8b6f4a]">
        {post.city_region ? `${post.city_region} · ` : ""}
        {formatDate(post.created_at)}
      </p>
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

export function StatusBadge({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "green" | "amber" | "red" }) {
  const translatedLabels: Record<string, string> = {
    resource: "משאב",
    article: "מאמר",
    pdf: "PDF",
    image: "תמונה",
    video: "סרטון",
    external_link: "קישור חיצוני",
    worksheet: "דף עבודה",
    guide: "מדריך",
    public: "ציבורי",
    members: "חברים",
    admins: "מנהלים",
    pending: "בהמתנה",
    approved: "מאושר",
    rejected: "נדחה",
    suspended: "מושעה",
    member: "חבר",
    admin: "מנהל",
    published: "פורסם",
    hidden: "מוסתר",
    deleted: "נמחק",
    draft: "טיוטה",
    cancelled: "בוטל",
    open: "פתוח",
    reviewing: "בבדיקה",
    resolved: "טופל",
    dismissed: "נסגר",
    new: "חדש",
    read: "נקרא",
    archived: "בארכיון",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        tone === "neutral" && "bg-[#efe2cf] text-[#6f5a3b]",
        tone === "green" && "bg-[#e4eadf] text-[#21483f]",
        tone === "amber" && "bg-[#f4dfc7] text-[#8a4c2e]",
        tone === "red" && "bg-[#f5ded8] text-[#8a2f25]",
      )}
    >
      {translatedLabels[label] ?? label.replaceAll("_", " ")}
    </span>
  );
}

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-[#8b6f4a]/30 bg-[#fffaf1]/70 p-10 text-center">
      <h3 className="font-display text-2xl font-semibold text-[#21483f]">{title}</h3>
      {children ? <p className="mt-3 text-[#554936]">{children}</p> : null}
    </div>
  );
}

export function Field({ label, name, type = "text", required, children }: { label: string; name: string; type?: string; required?: boolean; children?: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-[#3f3528]">
      {label}
      {children ?? (
        <input
          name={name}
          type={type}
          required={required}
          className="mt-2 w-full rounded-2xl border border-[#8b6f4a]/25 bg-[#fffaf1] px-4 py-3 text-[#2f2a22] shadow-sm"
        />
      )}
    </label>
  );
}

export function TextArea({ label, name, required, rows = 5 }: { label: string; name: string; required?: boolean; rows?: number }) {
  return (
    <label className="block text-sm font-medium text-[#3f3528]">
      {label}
      <textarea
        name={name}
        required={required}
        rows={rows}
        className="mt-2 w-full rounded-2xl border border-[#8b6f4a]/25 bg-[#fffaf1] px-4 py-3 text-[#2f2a22] shadow-sm"
      />
    </label>
  );
}

export function PrivateReminder() {
  return (
    <div className="rounded-[2rem] border border-[#b56f4d]/25 bg-[#f4dfc7]/70 p-5 text-sm leading-7 text-[#6b3d28]">
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <MessageCircle className="h-4 w-4" aria-hidden />
        תזכורת עדינה לפרטיות
      </div>
      אנא הימנעו משיתוף מידע אישי רגיש, כתובות מדויקות, שמות ילדים, פרטים רפואיים או פרטי קשר פרטיים בפוסטים ציבוריים בקהילה.
    </div>
  );
}
