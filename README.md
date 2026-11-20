# ניווט בסופר

לקוח שולח רשימת קניות בוואטסאפ (תמונה, טקסט או הודעה קולית) ומקבל מסלול מסודר בסניף יוחננוף באר שבע, עם קישור לאתר הניווט (מפה והכוונה קולית).

## מה יש כאן

| תיקייה | מה זה |
|---|---|
| `site/` | אתר הניווט (קובץ `index.html` אחד, וזיהוי טקסט בטלפון ב-`vendor/`). `handoff.js` טוען רשימה שהגיעה מהבוט (`/#l=...`). |
| `bot/src/` | בוט הוואטסאפ: Cloudflare Worker שמקבל הודעות מ-Meta ועונה. |
| `bot/src/store-core.js` | מפת הסניף ופענוח הרשימות, **מועתקים אוטומטית** מ-`site/index.html`. אחרי שינוי באתר: `npm run sync-store` (also rebuilds `bot/src/distances.js`, the walking distances between stops). |
| `wrangler.toml` | הגדרות ה-Worker: הבוט + האתר באותה כתובת. |

## איך זה רץ

- **אחסון:** Cloudflare Workers (חינם), נבנה ומתעדכן אוטומטית מכל דחיפה ל-`main`.
- **וואטסאפ:** WhatsApp Cloud API של Meta. תשובות בתוך 24 שעות מהודעת הלקוח הן בחינם.
- **תמונות וקול:** Workers AI (חינם עד 10,000 "נוירונים" ביום): Gemma 3 קורא את תמונת הרשימה, Whisper מתמלל הודעות קוליות.
- **זיכרון:** Durable Object אחד לכל מספר טלפון, שומר את הרשימה והמיקום בחנות.

כתובות: `/webhook` לוואטסאפ, `/health` לבדיקה, וכל השאר זה האתר.

## סודות (בלוח הבקרה של Cloudflare, לא בקוד)

- `WHATSAPP_TOKEN` – מפתח הגישה מ-Meta
- `APP_SECRET` – App secret של אפליקציית Meta (בודק שההודעות באמת מוואטסאפ)
- `VERIFY_TOKEN` – לא חובה. ברירת המחדל: `super-nav`

## פיתוח

```
npm install
npm test
```
