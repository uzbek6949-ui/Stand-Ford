import { useTranslations } from "next-intl";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/reveal";

const POINTS = ["p1", "p2", "p3", "p4"] as const;

export function About() {
  const t = useTranslations("about");
  const ts = useTranslations("stats");

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        {/* Visual */}
        <Reveal className="order-last lg:order-first">
          <div className="relative">
            <div className="relative flex aspect-[4/5] max-w-md flex-col overflow-hidden rounded-[1.5rem] border border-border p-5 shadow-xl">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(150deg, color-mix(in oklab, var(--brand) 88%, black), color-mix(in oklab, var(--brand) 55%, black))",
                }}
              />
              <div aria-hidden className="grid-overlay absolute inset-0 opacity-40" />

              {/* Real centre building, framed at the top */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/markaz.jpg?v=1"
                alt="Stanford o'quv markazi binosi"
                loading="lazy"
                decoding="async"
                className="relative aspect-[16/10] w-full rounded-xl object-cover shadow-lg ring-1 ring-white/25"
              />

              {/* Brand block — moved below the photo */}
              <div className="relative flex flex-1 flex-col items-center justify-center pt-5 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/25">
                  <GraduationCap className="h-7 w-7" />
                </span>
                <p className="font-display mt-4 text-xl font-bold text-white">
                  Stanford Education
                </p>
                <p className="mt-1 text-sm text-white/80">Koson · Qashqadaryo</p>
                <p className="mt-3 font-sans text-base italic text-white/90">
                  “Widen your horizons”
                </p>
              </div>
            </div>

            {/* floating years badge */}
            <div className="absolute -right-4 -top-4 rounded-2xl border border-border bg-card px-5 py-3 text-center shadow-xl sm:-right-6">
              <p className="font-display text-3xl font-bold text-brand">
                {ts("experience.value")}
              </p>
              <p className="text-xs text-muted-foreground">{ts("experience.label")}</p>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {t("tag")}
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
              {t("title")}
            </h2>
            <div className="hairline mt-6" />
            <p className="mt-6 text-lg font-medium text-white/95 text-pretty">
              {t("lead")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/70 text-pretty">
              {t("body1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/70 text-pretty">
              {t("body2")}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm text-white/90">{t(`points.${p}`)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
