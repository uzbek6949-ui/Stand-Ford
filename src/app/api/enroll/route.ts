import { NextResponse } from "next/server";

// ── Anti-spam ────────────────────────────────────────────────
// Per-IP sliding window: max 5 submissions / 10 minutes. In-memory, so it
// resets on cold starts — good enough to stop drive-by spam scripts without
// any paid service.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// Handles enrollment form submissions and forwards them to Telegram when
// TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID are set (Vercel env vars / .env.local).
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const name = String(body?.name ?? "").trim().slice(0, 80);
    const phone = String(body?.phone ?? "").trim().slice(0, 25);
    const locale = String(body?.locale ?? "").trim().slice(0, 5);
    const honeypot = String(body?.website ?? "");

    // Bots auto-fill every field, humans never see this one. Pretend success
    // so the bot moves on, and drop the message.
    if (honeypot) {
      return NextResponse.json({ ok: true, tg: true });
    }

    // Browsers always send Origin on cross-site fetch POSTs — reject foreign ones.
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host) {
      try {
        if (new URL(origin).host !== host) {
          return NextResponse.json({ ok: false, error: "origin" }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ ok: false, error: "origin" }, { status: 403 });
      }
    }

    const ip = (request.headers.get("x-forwarded-for") ?? "unknown")
      .split(",")[0]
      .trim();
    if (rateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
    }

    if (!name || phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    // Collapse whitespace/newlines so a submission can't forge extra lines
    // in the Telegram message.
    const clean = (s: string) => s.replace(/\s+/g, " ").trim();

    const text =
      `🎓 Stanford Education — yangi murojaat\n\n` +
      `👤 Ism: ${clean(name)}\n` +
      `📞 Telefon: ${clean(phone)}\n` +
      `🌐 Til: ${locale || "—"}\n` +
      `🕓 ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}`;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      try {
        const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
        if (!tg.ok) {
          console.error("[enroll] Telegram delivery failed:", tg.status, await tg.text());
        }
      } catch (err) {
        console.error("[enroll] Telegram request error:", err);
      }
    } else {
      // No Telegram configured — log so nothing is lost during setup.
      console.log("[enroll] New submission (Telegram env vars not set):\n" + text);
    }

    // `tg` reports whether Telegram forwarding is configured — handy for
    // verifying that the env vars are live after a deploy.
    return NextResponse.json({ ok: true, tg: Boolean(token && chatId) });
  } catch (err) {
    console.error("[enroll] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
