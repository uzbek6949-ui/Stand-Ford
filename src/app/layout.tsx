import "./globals.css";

// Root layout is intentionally a passthrough. The real <html>/<body>, fonts,
// providers and metadata live in src/app/[locale]/layout.tsx so they can be
// locale-aware (next-intl routed setup).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
