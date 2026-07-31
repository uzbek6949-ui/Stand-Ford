// ─────────────────────────────────────────────────────────────
//  Contact details — edit these in ONE place and they update the
//  navbar CTA, the contact form and the footer everywhere.
// ─────────────────────────────────────────────────────────────
export const site = {
  phoneDisplay: "+998 99 193 12 21",
  phoneHref: "+998991931221", // digits only, for tel: links
  telegram: "stanford_KASAN", // Telegram username without the @
  instagram: "stanfordedu_lc", // Instagram username without the @
  // What Google Maps points to (address link + embedded map in the footer).
  // For an EXACT pin, paste coordinates here, e.g. "39.0417, 65.5931"
  // (Google Maps → your centre → Share → copy the numbers from the link).
  // A place name also works but may be less precise.
  mapQuery: "Stanford o'quv markazi, Koson, Qashqadaryo",
} as const;
