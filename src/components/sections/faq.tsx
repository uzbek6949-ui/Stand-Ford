import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const FAQ = ["price", "trial", "duration", "group", "korean", "level"] as const;

export function Faq() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="relative border-t border-border bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading onLight tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 space-y-3">
          {FAQ.map((key, i) => (
            <Reveal key={key} delay={i * 55}>
              <details className="group rounded-2xl border border-border bg-card px-5 shadow-sm transition-colors open:border-brand/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                    {t(`items.${key}.q`)}
                  </span>
                  <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-brand transition-transform duration-300" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {t(`items.${key}.a`)}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
