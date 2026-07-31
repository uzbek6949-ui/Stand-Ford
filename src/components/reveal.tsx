"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

// Runs before paint in the browser, but degrades to useEffect on the server so
// Next doesn't warn during SSR.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Progressive-enhancement scroll reveal.
//   • With no JS (or if anything below fails) the content stays visible — the
//     base .reveal style is opacity:1.
//   • When JS runs we hide it *before paint*, then reveal it once it scrolls
//     into view. A safety timeout guarantees it is shown even if
//     IntersectionObserver never delivers a callback.
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced-motion: leave it visible, no animation.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.reveal = "hidden";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.reveal !== "hidden") return;

    let shown = false;
    let io: IntersectionObserver | undefined;
    const show = () => {
      if (shown) return;
      shown = true;
      el.dataset.reveal = "shown";
      io?.disconnect();
    };

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) show();
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      io.observe(el);
    }

    // Safety net: if IO is unsupported or never fires, reveal anyway.
    const timeout = window.setTimeout(show, 1500);

    return () => {
      io?.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
