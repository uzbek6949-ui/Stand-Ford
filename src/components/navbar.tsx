"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";

const LINKS = ["about", "courses", "why", "results", "teachers", "faq"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(94, 13, 14, 0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : undefined,
        WebkitBackdropFilter: scrolled ? "blur(10px)" : undefined,
      }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" aria-label="Stanford School" className="shrink-0">
          <Logo light />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              {t(id)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <a
            href="#enroll"
            className="hidden items-center rounded-full bg-[#1eaf57] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#199049] sm:inline-flex"
          >
            {t("enroll")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? tc("closeMenu") : tc("openMenu")}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          className="border-t border-white/15 lg:hidden"
          style={{ backgroundColor: "rgba(94, 13, 14, 0.97)", backdropFilter: "blur(10px)" }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {LINKS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
              >
                {t(id)}
              </a>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3 px-1">
              <LanguageSwitcher />
              <a
                href="#enroll"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full bg-[#1eaf57] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#199049]"
              >
                {t("enroll")}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
