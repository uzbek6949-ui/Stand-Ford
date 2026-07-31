import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const ITEMS = ["one", "two", "three"] as const;

// "Problem → solution" hook: names the visitor's frustration first, then
// answers it directly, before the page moves on to programme details.
export function Hook() {
  const t = useTranslations("hook");

  return (
    <section className="relative border-b border-border bg-[#f7f2e8] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading onLight tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 space-y-4">
          {ITEMS.map((key, i) => (
            <Reveal key={key} delay={i * 90}>
              <div className="grid items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm sm:grid-cols-[1fr_auto_1fr] sm:gap-6 sm:p-6">
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground sm:text-base">
                    {t(`items.${key}.pain`)}
                  </p>
                </div>

                <ArrowRight className="hidden h-5 w-5 shrink-0 text-gold sm:block" />

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-sm font-medium text-foreground sm:text-base">
                    {t(`items.${key}.solution`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280} className="mt-10 text-center">
          <a href="#enroll" className="btn btn-cta">
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
