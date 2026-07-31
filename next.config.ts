import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  // The locale messages are loaded via a dynamic import in src/i18n/request.ts,
  // so make sure they get traced into the standalone server bundle.
  outputFileTracingIncludes: {
    "/[locale]": ["./messages/**/*"],
  },
};

export default withNextIntl(nextConfig);
