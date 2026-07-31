import { useTranslations } from "next-intl";
import { BookOpen, Trophy, UserCheck, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const STEPS = [
  { key: "test", Icon: UserCheck },
  { key: "group", Icon: Users },
  { key: "study", Icon: BookOpen },
  { key: "exam", Icon: Trophy },
] as const;

export function Steps() {
  const t = useTranslations("steps");

  return (
    <section id="steps" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line on large screens */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px lg:block"
            style={{ backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
          />
          {STEPS.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 100} className="relative">
              <div className="flex flex-col items-center text-center">
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-brand shadow-sm">
                  <Icon className="h-6 w-6" />
                  <span className="font-display absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                    {i + 1}
                  </span>
                </span>
                <h3 className="font-display mt-5 text-lg font-bold text-white">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
