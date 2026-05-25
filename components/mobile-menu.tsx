"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MobileMenu({
  links,
  dashboardHref,
}: {
  links: string[][];
  dashboardHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-[#8b6f4a]/20 bg-[#fffaf1] px-4 py-2 text-sm font-semibold text-[#21483f] shadow-sm"
      >
        <Menu className="h-5 w-5" aria-hidden />
        תפריט
      </button>

      {open ? (
        <div className="absolute left-0 top-12 z-50 w-72 rounded-[1.5rem] border border-[#8b6f4a]/15 bg-[#fffaf1] p-3 text-sm font-medium text-[#554936] shadow-2xl shadow-[#2f2a22]/10">
          <div className="grid gap-1">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 hover:bg-[#efe2cf] hover:text-[#21483f]"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="soft-divider my-3" />
          <div className="grid gap-2">
            {dashboardHref ? (
              <Link
                href={dashboardHref}
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-[#21483f] px-4 py-3 text-center font-semibold text-[#fffaf1]"
              >
                אזור אישי
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-center font-semibold text-[#21483f] hover:bg-[#efe2cf]"
                >
                  כניסה
                </Link>
                <Link
                  href="/request-access"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl bg-[#21483f] px-4 py-3 text-center font-semibold text-[#fffaf1]"
                >
                  בקשת גישה
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
