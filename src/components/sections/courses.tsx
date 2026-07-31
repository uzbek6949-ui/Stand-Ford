import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Award,
  Baby,
  BookOpen,
  Check,
  GraduationCap,
  Languages,
  Target,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const COURSES = [
  { key: "ielts", Icon: Target },
  { key: "general", Icon: BookOpen },
  { key: "kids", Icon: Baby },
  { key: "korean", Icon: Languages },
  { key: "president", Icon: GraduationCap },
  { key: "turkish", Icon: Award },
] as const;

export function Courses() {
  const t = useTranslations("courses");
  const tn = useTranslations("nav");

  return (
    <section id="courses" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map(({ key, Icon }, i) => {
            const features = t.raw(`items.${key}.features`) as string[];
            const badges = t.raw(`items.${key}.badges`) as string[];
            return (
              <Reveal key={key} delay={(i % 3) * 90}>
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="font-display mt-5 text-xl font-bold text-foreground">
                    {t(`items.${key}.title`)}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {badges.map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {t(`items.${key}.desc`)}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#enroll"
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand transition-colors hover:text-brand-strong"
                  >
                    {tn("cta")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
