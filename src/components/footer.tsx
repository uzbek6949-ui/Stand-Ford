import { useTranslations } from "next-intl";
import { Clock, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { InstagramIcon, TelegramIcon } from "./icons";
import { site } from "@/lib/site";

const SECTION_LINKS = ["about", "courses", "why", "results", "teachers", "faq"] as const;
const COURSE_KEYS = ["ielts", "general", "kids", "korean", "president", "turkish"] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("courses");
  const year = new Date().getFullYear();
  const mapQ = encodeURIComponent(site.mapQuery);
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQ}`;
  const mapEmbed = `https://maps.google.com/maps?q=${mapQ}&z=16&output=embed`;

  return (
    <footer className="relative border-t border-white/15">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
              {t("tagline")}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={`https://t.me/${site.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-gold hover:text-gold"
              >
                <TelegramIcon className="h-4 w-4" />
              </a>
              <a
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-gold hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Section links */}
          <div>
            <h3 className="text-sm font-semibold text-white">{t("linksTitle")}</h3>
            <ul className="mt-4 space-y-2.5">
              {SECTION_LINKS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {tn(id)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-sm font-semibold text-white">{t("coursesTitle")}</h3>
            <ul className="mt-4 space-y-2.5">
              {COURSE_KEYS.map((key) => (
                <li key={key}>
                  <a
                    href="#courses"
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {tc(`items.${key}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">{t("contactTitle")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  {t("address")}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-gold">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold" />
                <span>{t("hours")}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Light lower block — the map and the bottom bar sit on cream again */}
      <div className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <MapPin className="h-4 w-4 text-brand" />
            {t("findUs")}
          </h3>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              src={mapEmbed}
              title="Stanford o'quv markazi — Google xarita"
              className="block h-64 w-full sm:h-80"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
            <p>
              © {year} Stanford Education Center. {t("rights")}
            </p>
            <p className="font-sans italic text-muted-foreground/80">
              Widen your horizons
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
