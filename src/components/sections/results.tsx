"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { InstagramIcon } from "@/components/icons";
import { RESULTS } from "@/lib/results-data";

// Student results as a continuous right-to-left marquee of reel covers.
// Hover (desktop) or touch (mobile) pauses the drift; clicking a card opens
// that student's Instagram post in a new tab.
export function Results() {
  const t = useTranslations("results");
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  const pauseForTouch = () => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 5000);
  };

  const CardGroup = ({ hidden = false }: { hidden?: boolean }) => (
    <div aria-hidden={hidden || undefined} className="flex gap-4 pr-4 sm:gap-6 sm:pr-6">
      {RESULTS.map((r, i) => (
        <a
          key={i}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : undefined}
          aria-label={`${t("watch")} — ${i + 1}`}
          className="group relative w-52 shrink-0 overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-brand/40 sm:w-64"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.img}
            alt=""
            loading="lazy"
            decoding="async"
            width={256}
            height={320}
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />

          {/* Instagram chip */}
          <span
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #f9ce34, #ee2a7b 55%, #6228d7)",
            }}
          >
            <InstagramIcon className="h-5 w-5" />
          </span>

          {/* bottom overlay with the watch hint */}
          <span
            className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-4 pb-3.5 pt-14 text-white"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.28) 55%, transparent)",
            }}
          >
            <span className="text-xs font-semibold tracking-wide">
              {t("watch")}
            </span>
            <span className="translate-x-0 text-sm transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </a>
      ))}
    </div>
  );

  return (
    <section
      id="results"
      className="relative overflow-hidden border-y border-white/10 py-20 sm:py-28"
      style={{ background: "#7a1012" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />
      </div>

      <Reveal className="mt-12">
        <div
          className={`results-marquee relative overflow-hidden ${paused ? "paused" : ""}`}
          onTouchStart={pauseForTouch}
        >
          {/* the drifting track: two identical groups → seamless -50% loop */}
          <div className="results-track flex w-max">
            <CardGroup />
            <CardGroup hidden />
          </div>

          {/* edge fades so cards melt into the section background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24"
            style={{ backgroundImage: "linear-gradient(90deg, #7a1012, transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24"
            style={{ backgroundImage: "linear-gradient(270deg, #7a1012, transparent)" }}
          />
        </div>
      </Reveal>
    </section>
  );
}
