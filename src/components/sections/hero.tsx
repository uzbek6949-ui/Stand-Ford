import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function Hero() {
  const t = useTranslations("hero");
  const tt = useTranslations("teachers");

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-24 text-white"
      style={{
        backgroundImage:
          "linear-gradient(160deg, #5e0d0e 0%, #a11a1a 48%, #760f11 100%)",
      }}
    >
      {/* faint grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 42%, #000 40%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 42%, #000 40%, transparent 82%)",
        }}
      />
      {/* giant faded edge words */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -left-6 top-8 select-none text-[7rem] font-extrabold uppercase leading-none text-white/[0.05] sm:text-[10rem]"
      >
        IELTS
      </span>
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -right-6 bottom-16 select-none text-[7rem] font-extrabold uppercase leading-none text-white/[0.05] sm:text-[10rem]"
      >
        English
      </span>

      {/* thin decorative side rails */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 select-none text-[0.6rem] font-semibold uppercase tracking-[0.5em] text-white/25 lg:block"
      >
        Stanford Education
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-90 select-none text-[0.6rem] font-semibold uppercase tracking-[0.5em] text-white/25 lg:block"
      >
        Widen your horizons
      </span>

      {/* content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-24 sm:px-6 sm:pt-28">
        {/* Big two-line wordmark ON TOP — chamfered block letters with a
            white→gold gradient. rem-capped sizes so it scales with zoom. */}
        <h1
          className="font-block pointer-events-none relative z-0 select-none text-center font-extrabold uppercase [filter:drop-shadow(0_14px_30px_rgba(0,0,0,0.35))]"
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
            style={{ fontSize: "clamp(2.55rem, 11.4vw, 10rem)" }}
          >
            Stanford
          </span>
          <span
            className="block whitespace-nowrap leading-[0.95]"
            style={{ fontSize: "clamp(2rem, 8.95vw, 7.85rem)", letterSpacing: "0.012em" }}
          >
            Education
          </span>
        </h1>

        {/* split row — pitch on the LEFT, founder photo card on the RIGHT */}
        <div className="mt-10 grid items-center gap-10 text-left sm:mt-12 lg:grid-cols-[1.02fr_0.95fr] lg:gap-14">
          {/* LEFT — copy */}
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60 sm:text-sm">
              {t("topLabel")}
            </p>
            <h2 className="font-display mt-4 text-3xl font-extrabold leading-tight text-balance sm:text-4xl xl:text-[2.7rem]">
              {t("tagline")}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75 text-pretty sm:text-lg">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col items-start gap-3">
              <a href="#enroll" className="btn btn-cta">
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="inline-flex items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="h-4 w-4 text-[#3ad07f]" />
                {t("note")}
              </p>
            </div>
          </Reveal>

          {/* RIGHT — big framed founder photo with her name in script */}
          <Reveal delay={120}>
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-white/25 lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-ustoz.jpg?v=1"
                alt={tt("items.one.name")}
                className="aspect-[5/6] w-full object-cover object-top"
              />
              {/* name + role over a bottom gradient */}
              <div
                className="absolute inset-x-0 bottom-0 px-6 pb-5 pt-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(30,4,4,0.82), rgba(30,4,4,0.35) 55%, transparent)",
                }}
              >
                <p className="font-script text-4xl leading-none text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.45)] sm:text-5xl">
                  {tt("items.one.name")}
                </p>
                <p className="mt-2 text-sm font-medium text-white/80">
                  {t("founderRole")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
