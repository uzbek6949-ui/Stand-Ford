import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";

const STAT_KEYS = ["experience", "students", "ielts", "cefr"] as const;

// Floating stats strip that overlaps the red hero / cream content boundary.
export function StatsStrip() {
  const ts = useTranslations("stats");

  return (
    <div className="relative z-20 mx-auto -mt-10 max-w-6xl px-4 sm:px-6">
      <Reveal>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-xl sm:grid-cols-4">
          {STAT_KEYS.map((key) => (
            <div key={key} className="bg-card px-5 py-6 text-center">
              <dt className="sr-only">{ts(`${key}.label`)}</dt>
              <dd>
                <span className="font-display block text-3xl font-bold text-brand sm:text-4xl">
                  {ts(`${key}.value`)}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">
                  {ts(`${key}.label`)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
