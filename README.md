# הטיפוחייה — אתר שיווקי

אתר Next.js (App Router) בעברית ו-RTL עם דפים ציבוריים בלבד:

- בית (`/`)
- אודות (`/about`)
- שירותים (`/services`)
- יצירת קשר (`/contact`)

## התקנה והרצה

```bash
npm install
npm run dev
```

אופציונלי: הגדירו `NEXT_PUBLIC_SITE_URL` ב-`.env.local` לכתובת האתר (למפת אתר).

## טופס יצירת קשר (Resend)

הגדירו ב-`.env.local`:

- `RESEND_API_KEY` — מפתח API מ-[Resend](https://resend.com)
- `CONTACT_TO_EMAIL` — כתובת שאליה מגיעות הפניות
- `CONTACT_FROM_EMAIL` — בפיתוח: `onboarding@resend.dev`; בפרודקשן: כתובת מדומיין מאומת

הוסיפו את אותם המשתנים ב-Vercel לפני פריסה.

## פריסה (Vercel)

האתר **אינו** משתמש ב-Supabase. אם היה לכם פרויקט Supabase מחובר:

1. ב-Vercel → Project → **Settings → Environment Variables** — מחקו משתנים כמו `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
2. ב-Vercel → **Integrations** — נתקו אינטגרציית Supabase אם קיימת.
3. פרסמו מחדש את הענף `main` (Deployments → Redeploy).

אם האתר עדיין נופל אחרי פריסה מחדש, בדקו ש-`RESEND_API_KEY`, `CONTACT_TO_EMAIL` ו-`CONTACT_FROM_EMAIL` מוגדרים (חסרים רק משפיעים על שליחת הטופס, לא על טעינת הדפים).
