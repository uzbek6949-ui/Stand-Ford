# Stanford Education — Landing page

Koson shahridagi ingliz tili, IELTS va koreys tili markazi uchun landing sahifa.
**Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + next-intl (uz/ru).**

## Ishga tushirish (Getting started)

```bash
npm install      # paketlarni o'rnatish (bir marta)
npm run dev      # http://localhost:3001 da ochiladi
```

Build (production):

```bash
npm run build
npm run start
```

## Qayerda nima (asosiy fayllar)

| Nima | Fayl |
|------|------|
| Barcha matnlar — o'zbekcha | `messages/uz.json` |
| Barcha matnlar — ruscha | `messages/ru.json` |
| Telefon / Telegram / Instagram / manzil | `src/lib/site.ts` |
| Ranglar va dizayn tokenlari | `src/app/globals.css` |
| Bo'limlar (Hero, Kurslar, Ustoz…) | `src/components/sections/` |
| Rasm va logo | `public/` (`ustoz.png`, `logo.svg`) |
| Ariza formasi backend | `src/app/api/enroll/route.ts` |

## Ariza formasi → Telegram

`/api/enroll` forma ma'lumotini qabul qiladi. Telegram botga tushishi uchun
ikkita muhit o'zgaruvchisini bering (`.env.local` faylida):

```
TELEGRAM_BOT_TOKEN=<@BotFather bergan token>
TELEGRAM_CHAT_ID=<xabar tushadigan chat/kanal ID>
```

Bular bo'lmasa, forma baribir ishlaydi — ariza server konsolига yoziladi.

## Til qo'shish

`src/i18n/routing.ts` dagi `locales` ro'yxatiga til kodini qo'shing va
`messages/` ичiga o'sha nomli JSON fayl yarating.
