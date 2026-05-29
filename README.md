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

## תיקיית Supabase (לא בשימוש)

תיקיית `supabase/` נשמרה לעתיד, אם תרצו להחזיר מערכת משתמשים, לוח מודעות וספריית משאבים.
