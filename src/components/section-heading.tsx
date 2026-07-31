import { Reveal } from "./reveal";

// `onLight` renders dark text for sections with a light background;
// the default (white text) is for sections sitting on the red page bg.
export function SectionHeading({
  tag,
  title,
  subtitle,
  center = true,
  onLight = false,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  onLight?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {tag ? (
        <span
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            onLight ? "text-brand" : "text-gold"
          }`}
        >
          {tag}
        </span>
      ) : null}
      <h2
        className={`font-display mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl ${
          onLight ? "text-foreground" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-base text-pretty sm:text-lg ${
            onLight ? "text-muted-foreground" : "text-white/70"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
      <div className={`hairline mt-6 ${center ? "mx-auto" : ""}`} />
    </Reveal>
  );
}
