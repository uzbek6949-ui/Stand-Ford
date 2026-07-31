"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
] as const;

// Styled for the red navbar: white pill on the active locale.
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 p-0.5 text-xs font-semibold backdrop-blur-sm">
      {LOCALES.map((l) => {
        const active = l.code === locale;
        return (
          <button
            key={l.code}
            type="button"
            disabled={pending || active}
            aria-current={active ? "true" : undefined}
            onClick={() =>
              startTransition(() => router.replace(pathname, { locale: l.code }))
            }
            className={`rounded-full px-2.5 py-1 transition-colors ${
              active
                ? "bg-white text-[#8c1515]"
                : "text-white/80 hover:text-white"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
