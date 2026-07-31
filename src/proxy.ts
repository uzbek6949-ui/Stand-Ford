import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next 16 renamed the "middleware" file convention to "proxy". next-intl's
// handler slots straight in as the default export: it redirects "/" to the
// default locale ("/uz") and keeps the active locale in the URL (e.g. "/uz",
// "/ru") so the site stays SEO-friendly and shareable.
export default createMiddleware(routing);

export const config = {
  // Run on every path except API routes, Next internals and static files.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
