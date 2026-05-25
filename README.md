# Tslil Parent Guidance

A production-oriented Next.js App Router application for a parent-guidance service with:

- Public marketing pages
- Supabase Auth sign-up/login/password reset
- Admin approval workflow
- Private member dashboard
- Secure resource library with Supabase Storage signed URLs
- Private bulletin board and connection requests
- Admin CMS-style pages for users, resources, posts, reports, contact submissions, and announcements
- PostgreSQL schema, RLS policies, storage buckets, and seed data

## Setup

1. Copy `.env.example` to `.env.local`.
2. Add Supabase project values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` if you later add service-role-only server jobs.
3. Apply `supabase/migrations/0001_initial_schema.sql` to your Supabase database.
4. Run `supabase/seed.sql` for development seed content.
5. Start the app:

```bash
npm run dev
```

## Admin Bootstrap

After creating the first user through Request Access, promote that user in Supabase SQL:

```sql
update public.profiles
set role = 'admin', approval_status = 'approved'
where email = 'admin@example.com';
```

After that, use `/admin/users` to manage approvals and roles.

## Security Notes

Private member and admin routes perform server-side authorization checks. Database access is also protected with RLS policies, including pending/suspended user restrictions, admin-only role changes, private resource visibility, private bulletin posts, report handling, and storage policies for private resource files.
