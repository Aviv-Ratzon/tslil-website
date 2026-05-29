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
    <header className="sticky top-0 z-40 border-b border-[#8b6f4a]/15 bg-[#f6efe4]/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2 text-[#21483f]">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#8b6f4a]/20 bg-[#fffaf1] shadow-sm sm:h-13 sm:w-13">
            <Image src={logoImage} alt={siteConfig.name} className="h-10 w-10 object-contain sm:h-11 sm:w-11" priority />
          </span>
          <span>
            <span className="block font-display text-xl font-normal leading-none tracking-tight">{siteConfig.name}</span>
            <span className="mt-1 block text-xs text-[#6f5a3b]">מרחב להורים, הקשבה וקהילה</span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 rounded-full border border-[#8b6f4a]/15 bg-[#fffaf1]/70 px-5 py-2 text-sm font-medium text-[#554936] shadow-sm md:flex">
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-[#21483f]">
              {label}
            </Link>
          ))}
        </div>
        <MobileMenu links={navLinks.map(([label, href]) => [label, href])} />
      </nav>
    </header>
  );
}
