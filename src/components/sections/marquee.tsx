import { useTranslations } from "next-intl";

export function Marquee() {
  const t = useTranslations();
  const items = t.raw("marquee") as string[];
  const loop = [...items, ...items];

  return (
    <section aria-hidden className="border-y border-border bg-background">
      <div className="flex overflow-hidden py-4">
        <div className="animate-marquee flex shrink-0 items-center gap-10">
          {loop.map((item, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-sm font-medium text-muted-foreground">
                {item}
              </span>
              <span className="text-gold/70">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
