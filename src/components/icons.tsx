// Brand glyphs that Lucide no longer ships (Telegram, Instagram). Kept as tiny
// inline SVGs so the footer social links stay on-brand without extra deps.

export function TelegramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.94 4.6 18.9 19.1c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.33-4.78L18.6 6.3c.38-.34-.08-.53-.6-.19L6.9 13.28l-4.64-1.45c-1.01-.32-1.03-1.01.21-1.5L20.63 3.3c.84-.31 1.58.2 1.31 1.3Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
