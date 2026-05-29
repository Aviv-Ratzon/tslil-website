"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MobileMenu({ links }: { links: string[][] }) {
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
        className="flex items-center gap-2.5 rounded-full border border-brand/10 bg-paper/50 px-5 py-3 text-base font-semibold text-ink shadow-sm backdrop-blur-md"
      >
        <Menu className="h-6 w-6" aria-hidden />
        תפריט
      </button>

      {open ? (
        <div className="framed-box absolute left-0 top-[calc(100%+0.75rem)] z-50 w-80 rounded-[1.75rem] bg-paper p-4 text-base font-medium text-muted shadow-lg">
          <div className="grid gap-1">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3.5 hover:bg-leaf-soft hover:text-leaf"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
