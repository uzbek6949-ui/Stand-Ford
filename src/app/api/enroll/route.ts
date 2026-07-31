import { NextResponse } from "next/server";

// Handles enrollment form submissions. Works out of the box (logs to the
// server console); if TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set in the
// environment, each new request is also forwarded to that Telegram chat.
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const name = String(body?.name ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const locale = String(body?.locale ?? "").trim();

    if (!name || phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const text =
      `🎓 Stanford Education — yangi murojaat\n\n` +
      `👤 Ism: ${name}\n` +
      `📞 Telefon: ${phone}\n` +
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
      // No Telegram configured yet — record it so nothing is lost during setup.
      console.log(
        "[enroll] New submission (set TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID to forward):\n" +
          text,
      );
    }

    // `tg` reports whether Telegram forwarding is configured — handy for
    // verifying that the env vars are live after a deploy.
    return NextResponse.json({ ok: true, tg: Boolean(token && chatId) });
  } catch (err) {
    console.error("[enroll] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
