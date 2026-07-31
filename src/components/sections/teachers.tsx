import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { InstagramIcon } from "@/components/icons";

const IG_HIGHLIGHT = "https://www.instagram.com/stories/highlights/17867087589145531/";
const CHIP_KEYS = ["experience", "students", "cefr"] as const;

export function Teachers() {
  const t = useTranslations("teachers");
  const ts = useTranslations("stats");
  const name = t("items.one.name");
  const firstName = name.split(" ")[0];

  return (
    <section id="teachers" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <Reveal className="mt-14">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            {/* LEFT — large framed photo, name written in script over it */}
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/teacher-photo.jpg?v=1"
                alt={name}
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1.5 text-xs font-bold text-[#1d1205] shadow-md">
                {t("founderBadge")}
              </span>
              <div
                className="absolute inset-x-0 bottom-0 px-6 pb-5 pt-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(20,4,4,0.8), rgba(20,4,4,0.32) 55%, transparent)",
                }}
              >
                <p className="font-script text-4xl leading-none text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.5)] sm:text-5xl">
                  {name}
                </p>
              </div>
            </div>

            {/* RIGHT — about the teacher */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                {t("items.one.role")}
              </p>
              <h3 className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t.rich("aboutHeading", {
                  name: firstName,
                  accent: (chunks) => <span className="text-gold">{chunks}</span>,
                })}
              </h3>
              <div className="hairline mt-5" />

              <p className="mt-6 text-base leading-relaxed text-white/75 text-pretty">
                {t("items.one.bio")}
              </p>

              {/* mini stat chips, Shablon-style */}
              <div className="mt-7 grid grid-cols-3 gap-3">
                {CHIP_KEYS.map((key) => (
                  <div
                    key={key}
                    className="rounded-xl border border-border bg-card px-3 py-3.5 text-center shadow-sm"
                  >
                    <span className="font-display block text-xl font-bold text-brand sm:text-2xl">
                      {ts(`${key}.value`)}
                    </span>
                    <span className="mt-0.5 block text-[0.68rem] text-muted-foreground sm:text-xs">
                      {ts(`${key}.label`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* link to the Instagram highlight about the teacher */}
              <a
                href={IG_HIGHLIGHT}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#f6ead6]"
              >
                <InstagramIcon className="h-[1.1rem] w-[1.1rem]" />
                {t("aboutLink")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
