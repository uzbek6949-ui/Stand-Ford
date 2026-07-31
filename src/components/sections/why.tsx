import { useTranslations } from "next-intl";
import {
  Award,
  ClipboardCheck,
  MessageCircle,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const WHY = [
  { key: "teachers", Icon: Award },
  { key: "groups", Icon: Users },
  { key: "results", Icon: Trophy },
  { key: "method", Icon: Sparkles },
  { key: "mock", Icon: ClipboardCheck },
  { key: "feedback", Icon: MessageCircle },
] as const;

export function Why() {
  const t = useTranslations("why");

  return (
    <section id="why" className="relative border-y border-border bg-[#f7f2e8] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading onLight tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={(i % 3) * 90}>
              <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
