"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

// Persistent primary action for phones (< sm), where the navbar hides its
// enrol button. Slides out of the way while the enrol form itself is on
// screen so it never sits on top of the thing it points to. Visible by
// default, so it still works if IntersectionObserver is unavailable.
export function MobileCta() {
  const t = useTranslations("nav");
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const el = document.getElementById("enroll");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setAtForm(entry.isIntersecting),
      { rootMargin: "0px 0px -45% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 px-3 pt-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.55)] transition-transform duration-300 sm:hidden ${
        atForm ? "translate-y-full" : "translate-y-0"
      }`}
      style={{
        backgroundColor: "rgba(94,13,14,0.96)",
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
    >
      <a href="#enroll" className="btn btn-cta w-full">
        {t("enroll")}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
