import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Leaf } from "lucide-react";
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
        variant === "primary" && "bg-brand-darker text-cream shadow-lg shadow-brand/30 hover:bg-brand-dark",
        variant === "secondary" && "border-2 border-brand bg-paper text-brand-darker hover:bg-brand-soft",
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
      className="inline-flex items-center justify-center rounded-full bg-brand-darker px-5 py-3 text-sm font-semibold text-cream shadow-lg shadow-brand/30 transition hover:bg-brand-dark disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-brand/30 bg-brand-darker text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold">{siteConfig.name}</p>
          <p className="mt-3 leading-7 text-brand-light">{siteConfig.description}</p>
        </div>
        <div>
          <p className="font-semibold text-cream">הגישה שלנו</p>
          <p className="mt-3 leading-7 text-brand-light">
            הדרכה מקצועית, חמה ומעשית — עם כבוד לקצב של כל משפחה ולפרטיות שלכם.
          </p>
        </div>
        <div>
          <p className="font-semibold text-cream">יצירת קשר</p>
          <p className="mt-3 text-brand-light">{siteConfig.email1}</p>
          <p className="mt-3 text-brand-light">{siteConfig.email2}</p>
          <Link href="/contact" className="mt-4 inline-block font-semibold text-brand-soft hover:text-cream">
            טופס יצירת קשר
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function SectionHeader({ eyebrow, title, children, align = "center" }: { eyebrow?: string; title: React.ReactNode; children?: React.ReactNode; align?: "center" | "start" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-right")}>
      {eyebrow ? <p className="text-sm font-bold tracking-[0.18em] text-leaf-dark">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-darker sm:text-5xl">{title}</h2>
      {children ? <div className="mt-5 text-lg leading-9 text-ink">{children}</div> : null}
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("paper-panel rounded-[2rem] p-6", className)}>{children}</div>;
}

export function ServiceCard({ service }: { service: { title: string; description: string; audience: string; format: string } }) {
  return (
    <Card>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand-darker">
        <Leaf className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="font-display text-2xl font-semibold text-brand-darker">{service.title}</h3>
      <p className="mt-3 leading-7 text-ink">{service.description}</p>
      <dl className="mt-6 space-y-3 text-sm text-muted">
        <div>
          <dt className="font-semibold text-ink">למי זה מתאים</dt>
          <dd>{service.audience}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">מבנה</dt>
          <dd>{service.format}</dd>
        </div>
      </dl>
      <Link href="/contact" className="mt-6 inline-flex items-center text-sm font-semibold text-brand-darker hover:text-brand">
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
      <h3 className="mt-6 font-display text-3xl font-semibold text-brand-darker">{provider.name}</h3>
      <p className="text-sm font-semibold text-leaf-dark">{provider.title}</p>
      <p className="mt-4 leading-7 text-ink">{provider.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {provider.expertise.map((item) => (
          <span key={item} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-darker">
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
            "mt-2 w-full rounded-2xl border-2 border-brand/30 bg-paper px-4 text-ink shadow-sm focus:border-brand focus:outline-none",
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
