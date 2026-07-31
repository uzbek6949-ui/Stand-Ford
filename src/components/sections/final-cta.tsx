import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function FinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section className="relative bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-center shadow-2xl sm:px-12 sm:py-16"
            style={{
              backgroundImage:
                "linear-gradient(135deg, color-mix(in oklab, var(--brand) 92%, black), color-mix(in oklab, var(--brand) 60%, black))",
            }}
          >
            <div aria-hidden className="grid-overlay absolute inset-0 opacity-30" />
            <div className="relative">
              <h2 className="font-display mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/85 text-pretty">
                {t("subtitle")}
              </p>
              <a
                href="#enroll"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1eaf57] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#199049]"
              >
                {t("button")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
