import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // NOTE: no `output: "standalone"` here — that mode is only for self-hosted
  // Docker builds and breaks routing on Vercel. Re-add it if we ever move to
  // a VPS/Dokploy deployment.
  // The locale messages are loaded via a dynamic import in src/i18n/request.ts,
  // so make sure they get traced into the serverless bundle.
  outputFileTracingIncludes: {
    "/[locale]": ["./messages/**/*"],
  },
};

export default withNextIntl(nextConfig);
