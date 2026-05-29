import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Heart, Leaf, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";
import advisor1Image from "@/assets/advisor1.jpeg";
import advisor2Image from "@/assets/advisor2.jpeg";

const providerImages = {
  advisor1: advisor1Image,
  advisor2: advisor2Image,
};

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

export function Footer() {
  return (
    <footer className="border-t border-[#8b6f4a]/15 bg-[#21483f] text-[#f6efe4]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold">{siteConfig.name}</p>
          <p className="mt-3 leading-7 text-[#e5d8c5]">{siteConfig.description}</p>
        </div>
        <div>
          <p className="font-semibold text-white">הגישה שלנו</p>
          <p className="mt-3 leading-7 text-[#e5d8c5]">
            הדרכה מקצועית, חמה ומעשית — עם כבוד לקצב של כל משפחה ולפרטיות שלכם.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">יצירת קשר</p>
          <p className="mt-3 text-[#e5d8c5]">{siteConfig.email}</p>
          <Link href="/contact" className="mt-4 inline-block font-semibold text-[#d9c8ad] hover:text-white">
            טופס יצירת קשר
          </Link>
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
            הדרכת הורים ברוגע, בהירות ותמיכה
          </span>
          <h1 className="mt-8 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-[#21483f] sm:text-7xl">
            להקשיב לילדים.
            <br />
            להחזיר אוויר להורות.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-[#554936]">
            שירות הדרכה מקצועי בהובלת שתי נשים — פגישות אישיות, סדנאות וליווי מעשי להורים.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact">דברו איתנו</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
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
                ["ליווי מקצועי ואישי", ShieldCheck],
                ["כלים מעשיים לשגרה", BookOpen],
                ["הקשבה ללא שיפוטיות", Heart],
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

export function ProfileCard({
  provider,
}: {
  provider: { name: string; title: string; expertise: string[]; bio: string; image?: keyof typeof providerImages };
}) {
  const image = provider.image ? providerImages[provider.image] : null;

  return (
    <Card>
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#efe2cf] to-[#d8c8ad] text-sm font-semibold text-[#6f5a3b]"
        style={{ height: "16rem" }}
      >
        {image ? (
          <Image src={image} alt={provider.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
        ) : (
          "תמונה אישית"
        )}
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
