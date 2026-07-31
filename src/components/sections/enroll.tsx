import { useTranslations } from "next-intl";
import { CheckCircle2, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { EnrollForm } from "./enroll-form";
import { site } from "@/lib/site";

const ASIDE_POINTS = ["p1", "p2", "p3"] as const;

export function Enroll() {
  const t = useTranslations("enroll");

  return (
    <section id="enroll" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="blob right-[-6%] top-[10%] h-72 w-72" style={{ background: "var(--gold)" }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Aside */}
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {t("tag")}
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-md text-base text-white/70 text-pretty">
              {t("subtitle")}
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="font-display text-base font-semibold text-foreground">
                {t("aside.title")}
              </p>
              <ul className="mt-4 space-y-3">
                {ASIDE_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span>{t(`aside.${p}`)}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-muted-foreground">{t("aside.orCall")}</p>
              <a
                href={`tel:${site.phoneHref}`}
                className="mt-2 inline-flex items-center gap-2 font-display text-xl font-bold text-brand transition-colors hover:text-brand-strong"
              >
                <PhoneCall className="h-5 w-5" />
                {site.phoneDisplay}
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="rounded-[1.5rem] border border-border bg-card p-6 shadow-xl sm:p-8">
              <EnrollForm />
            </div>

            {/* brand wordmark filling the spare space, hero-style */}
            <div
              aria-hidden
              className="font-block mt-8 select-none text-center font-extrabold uppercase"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #ffffff 0%, #ffedcb 55%, #e9ba62 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              <span
                className="block whitespace-nowrap leading-[0.95]"
                style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}
              >
                Stanford
              </span>
              <span
                className="block whitespace-nowrap leading-[0.95]"
                style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.7rem)", letterSpacing: "0.012em" }}
              >
                Education
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
