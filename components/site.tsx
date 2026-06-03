import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Heart, Leaf, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { homepageSections, siteConfig } from "@/lib/content";
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
        variant === "primary" && "bg-brand-darker text-cream shadow-lg shadow-brand/20 hover:bg-brand-dark",
        variant === "secondary" && "border border-brand/25 bg-paper text-ink hover:bg-cream-dark",
        variant === "ghost" && "text-ink hover:bg-cream-dark",
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
      className="inline-flex items-center justify-center rounded-full bg-brand-darker px-5 py-3 text-sm font-semibold text-cream shadow-lg shadow-brand/20 transition hover:bg-brand-dark disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-leaf/25 bg-leaf-darker text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold">{siteConfig.name}</p>
          <p className="mt-3 leading-7 text-leaf-light">{siteConfig.description}</p>
        </div>
        <div>
          <p className="font-semibold text-cream">הגישה שלנו</p>
          <p className="mt-3 leading-7 text-leaf-light">
            הדרכה מקצועית, חמה ומעשית — עם כבוד לקצב של כל משפחה ולפרטיות שלכם.
          </p>
        </div>
        <div>
          <p className="font-semibold text-cream">יצירת קשר</p>
          <p className="mt-3 text-leaf-light">{siteConfig.email1}</p>
          <p className="mt-3 text-leaf-light">{siteConfig.email2}</p>
          <Link href="/contact" className="mt-4 inline-block font-semibold text-leaf-soft hover:text-cream">
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
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-cream-dark to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.71fr_1.24fr] lg:px-8 lg:py-24">
        <div className="p-8 sm:p-12">
          <span className="inline-flex text-sm font-semibold tracking-[0.18em] text-leaf">
            למה אנחנו פה ?
          </span>
          <div className="space-y-5 font-display text-3xl font-semibold leading-tight text-brand sm:text-1xl">
          מודל הטיפוחייה בא לענות על צורך שזיהינו בחיינו, ונוכחנו כי הוא משותף לעוד הרבה הורים וילדים. 
          <br />
          מצאנו דרך, שהיא גמישה ונתונה לעיצוב אישי, היא לוקחת בחשבון את הראיה ההתפתחותית המותאמת לצרכי הילדים, המטפלות והמטפלים בהם, והתא המשפחתי. היא אמנם דורשת השקעה רבה, ביחוד מבחינת גמישות בזמן במרחב ובחשיבה, אך ההשקעה הזו מהווה חלק מהותי מהערך והגישה האלטרנטיבית לחינוך שהטיפוחייה מעניקה ומאפשרת ליצור ולקיים.
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact">דברו איתנו</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              צפייה בשירותים
            </ButtonLink>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -right-8 top-8 h-32 w-32 rounded-full bg-brand/15 blur-2xl" />
          <div className="absolute -left-6 bottom-10 h-40 w-40 rounded-full bg-leaf/12 blur-2xl" />
          <div className="paper-panel relative rounded-[3rem] p-8 sm:p-10">
            <div className="space-y-5 font-display text-3xl font-semibold leading-tight text-brand sm:text-4xl">
              <p className="pr-0 text-leaf">{homepageSections.heroWhatIs.titleLine1}</p>
              <p className="pr-8 font-normal">{homepageSections.heroWhatIs.titleLine2}</p>
            </div>
            <p className="mt-5 text-base font-normal leading-8 text-muted">{homepageSections.heroWhatIs.body}</p>
            <div className="soft-divider my-8" />
            <div className="grid gap-4">
              {[
                ["מקום לפגוש ולהיפגש", ShieldCheck],
                ["מרחב קהילתי שבו תודעות נוגעות זו בזו", BookOpen],
                ["איפה שאוכלים פאנקייקס סלק", Heart],
              ].map(([label, Icon]) => (
                <div key={label as string} className="framed-box flex items-center gap-4 rounded-2xl bg-paper/90 p-4">
                  <Icon className="h-5 w-5 text-leaf" aria-hidden />
                  <span className="font-medium text-ink">{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, children, align = "center" }: { eyebrow?: string; title: React.ReactNode; children?: React.ReactNode; align?: "center" | "start" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-right")}>
      {eyebrow ? <p className="text-sm font-semibold tracking-[0.18em] text-leaf">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl">{title}</h2>
      {children ? <p className="mt-5 text-lg leading-9 text-muted">{children}</p> : null}
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("paper-panel rounded-[2rem] p-6", className)}>{children}</div>;
}

export function ServiceCard({ service }: { service: { title: string; description: string; audience: string; format: string } }) {
  return (
    <Card>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-leaf-soft text-leaf">
        <Leaf className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="font-display text-2xl font-semibold text-ink">{service.title}</h3>
      <p className="mt-3 leading-7 text-muted">{service.description}</p>
      <dl className="mt-6 space-y-3 text-sm text-muted-light">
        <div>
          <dt className="font-semibold text-ink">למי זה מתאים</dt>
          <dd>{service.audience}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">מבנה</dt>
          <dd>{service.format}</dd>
        </div>
      </dl>
      <Link href="/contact" className="mt-6 inline-flex items-center text-sm font-semibold text-leaf hover:text-leaf-dark">
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
        className="surface-gradient relative flex items-center justify-center overflow-hidden rounded-[2rem] text-sm font-semibold text-muted-light"
        style={{ height: "24rem" }}
      >
        {image ? (
          <Image src={image} alt={provider.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
        ) : (
          "תמונה אישית"
        )}
      </div>
      <h3 className="mt-6 font-display text-3xl font-semibold text-brand">{provider.name}</h3>
      <p className="text-sm font-medium text-leaf">{provider.title}</p>
      <p className="mt-4 leading-7 text-muted">{provider.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {provider.expertise.map((item) => (
          <span key={item} className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-medium text-leaf-dark">
            {item}
          </span>
        ))}
      </div>
    </Card>
  );
}

export function Field({
  label,
  name,
  type = "text",
  required,
  children,
  compact,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  children?: React.ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block text-sm font-medium text-ink", className)}>
      {label}
      {children ?? (
        <input
          name={name}
          type={type}
          required={required}
          className={cn(
            "mt-2 w-full rounded-2xl border border-brand/25 bg-paper px-4 text-ink shadow-sm",
            compact ? "py-2.5" : "py-3",
          )}
        />
      )}
    </label>
  );
}

export function TextArea({
  label,
  name,
  required,
  rows = 5,
  compact,
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  compact?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block text-sm font-medium text-ink", className)}>
      {label}
      <textarea
        name={name}
        required={required}
        rows={rows}
        className={cn(
          "mt-2 w-full rounded-2xl border border-brand/25 bg-paper px-4 text-ink shadow-sm",
          compact ? "py-2.5" : "py-3",
        )}
      />
    </label>
  );
}
