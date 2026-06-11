import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { siteConfig } from "@/lib/content";
import logoImage from "@/assets/logo.png";

export const navLinks = [
  ["בית", "/"],
  ["אודות", "/about"],
  ["שירותים", "/services"],
  ["יצירת קשר", "/contact"],
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-brand/25 bg-paper/90 backdrop-blur-xl shadow-sm shadow-brand/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-1.5 sm:px-6 sm:py-2 lg:px-8">
        <Link href="/" className="group flex items-center gap-3 sm:gap-4">
          <Image
            src={logoImage}
            alt={siteConfig.name}
            className="h-[3.75rem] w-auto object-contain sm:h-[4.25rem]"
            priority
          />
          <span className="logo-wordmark font-display text-2xl font-normal leading-none tracking-tight sm:text-3xl">
            {siteConfig.name}
          </span>
        </Link>
        <div className="hidden items-center gap-8 rounded-full border-2 border-brand/20 bg-cream px-7 py-3 text-base font-semibold text-ink shadow-sm backdrop-blur-md md:flex">
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} className="transition-colors hover:text-brand-dark">
              {label}
            </Link>
          ))}
        </div>
        <MobileMenu links={navLinks.map(([label, href]) => [label, href])} />
      </nav>
    </header>
  );
}
