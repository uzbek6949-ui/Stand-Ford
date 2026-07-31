// Brand badge + wordmark. `light` renders the wordmark in white for use on the
// red navbar; the default dark text is used on light surfaces (footer).
export function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Real brand logo. It has a red background, so a subtle ring keeps it
          defined against the red navbar (and against the light footer). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png?v=1"
        alt="Stanford School logo"
        className={`h-11 w-11 rounded-xl object-cover shadow-sm ring-1 ${
          light ? "ring-white/30" : "ring-black/10"
        }`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-bold tracking-tight ${
            light ? "text-white" : "text-foreground"
          }`}
        >
          Stanford
        </span>
        <span
          className={`text-[0.6rem] font-semibold uppercase tracking-[0.22em] ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          Education
        </span>
      </span>
    </span>
  );
}
