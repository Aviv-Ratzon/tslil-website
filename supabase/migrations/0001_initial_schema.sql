create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  display_name text,
  phone text,
  city_region text,
  preferred_language text,
  bio text,
  role text not null default 'pending' check (role in ('pending', 'member', 'admin')),
  approval_status text not null default 'pending' check (approval_status in ('pending', 'approved', 'rejected', 'suspended')),
  contact_sharing_preference text not null default 'approval_required',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  reason text,
  message text not null,
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create table public.access_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  city_region text,
  preferred_language text,
  reason text not null,
  agreed_to_rules boolean not null default false,
  agreed_to_privacy boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'suspended')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles(id)
);

create table public.resource_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  type text not null check (type in ('article', 'pdf', 'image', 'video', 'external_link', 'worksheet', 'guide')),
  category_id uuid references public.resource_categories(id) on delete set null,
  visibility text not null default 'members' check (visibility in ('public', 'members', 'admins')),
  file_path text,
  external_url text,
  video_url text,
  thumbnail_path text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.bulletin_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  category text not null,
  city_region text,
  child_age_range text,
  status text not null default 'published' check (status in ('draft', 'pending', 'published', 'hidden', 'deleted')),
  allow_connection_requests boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.bulletin_posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  status text not null default 'published' check (status in ('published', 'hidden', 'deleted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.connection_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid not null references public.bulletin_posts(id) on delete cascade,
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (requester_id <> recipient_id)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid references public.bulletin_posts(id) on delete cascade,
  comment_id uuid references public.post_comments(id) on delete cascade,
  reason text not null,
  details text,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles(id),
  check (post_id is not null or comment_id is not null)
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  visibility text not null default 'members' check (visibility in ('public', 'members', 'admins')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at before update on public.profiles for each row execute function public.touch_updated_at();
create trigger resources_touch_updated_at before update on public.resources for each row execute function public.touch_updated_at();
create trigger posts_touch_updated_at before update on public.bulletin_posts for each row execute function public.touch_updated_at();
create trigger comments_touch_updated_at before update on public.post_comments for each row execute function public.touch_updated_at();
create trigger connection_touch_updated_at before update on public.connection_requests for each row execute function public.touch_updated_at();
create trigger announcements_touch_updated_at before update on public.announcements for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, display_name, phone, city_region, preferred_language)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name'),
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'city_region',
    new.raw_user_meta_data ->> 'preferred_language'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'admin'
      and approval_status = 'approved'
  );
$$;

create or replace function public.is_approved_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('member', 'admin')
      and approval_status = 'approved'
  );
$$;

create or replace function public.prevent_role_status_self_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() and (new.role is distinct from old.role or new.approval_status is distinct from old.approval_status) then
    raise exception 'Only admins can change role or approval status.';
  end if;
  return new;
end;
$$;

create trigger profiles_protect_role_status
before update on public.profiles
for each row execute function public.prevent_role_status_self_change();

alter table public.profiles enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.access_requests enable row level security;
alter table public.resource_categories enable row level security;
alter table public.resources enable row level security;
alter table public.bulletin_posts enable row level security;
alter table public.post_comments enable row level security;
alter table public.connection_requests enable row level security;
alter table public.reports enable row level security;
alter table public.announcements enable row level security;

create policy "profiles read own or admin" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles update own profile fields" on public.profiles for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());

create policy "contact submissions public create" on public.contact_submissions for insert with check (consent = true);
create policy "contact submissions admin read" on public.contact_submissions for select using (public.is_admin());
create policy "contact submissions admin update" on public.contact_submissions for update using (public.is_admin()) with check (public.is_admin());

create policy "access requests create" on public.access_requests for insert with check (agreed_to_rules = true and agreed_to_privacy = true);
create policy "access requests own or admin read" on public.access_requests for select using (user_id = auth.uid() or public.is_admin());
create policy "access requests admin update" on public.access_requests for update using (public.is_admin()) with check (public.is_admin());

create policy "categories public read" on public.resource_categories for select using (true);
create policy "categories admin write" on public.resource_categories for all using (public.is_admin()) with check (public.is_admin());

create policy "resources scoped read" on public.resources for select using (
  visibility = 'public'
  or (visibility = 'members' and public.is_approved_member())
  or public.is_admin()
);
create policy "resources admin write" on public.resources for all using (public.is_admin()) with check (public.is_admin());

create policy "posts approved read published" on public.bulletin_posts for select using (
  public.is_admin()
  or (public.is_approved_member() and status = 'published')
  or (author_id = auth.uid())
);
create policy "posts approved create" on public.bulletin_posts for insert with check (
  public.is_approved_member() and author_id = auth.uid()
);
create policy "posts own update" on public.bulletin_posts for update using (
  public.is_admin() or author_id = auth.uid()
) with check (
  public.is_admin() or author_id = auth.uid()
);
create policy "posts admin delete" on public.bulletin_posts for delete using (public.is_admin());

create policy "comments approved read" on public.post_comments for select using (
  public.is_admin()
  or (public.is_approved_member() and status = 'published')
  or author_id = auth.uid()
);
create policy "comments approved create" on public.post_comments for insert with check (
  public.is_approved_member() and author_id = auth.uid()
);
create policy "comments own or admin update" on public.post_comments for update using (
  public.is_admin() or author_id = auth.uid()
) with check (
  public.is_admin() or author_id = auth.uid()
);

create policy "connection participants read" on public.connection_requests for select using (
  public.is_admin() or requester_id = auth.uid() or recipient_id = auth.uid()
);
create policy "connection requester create" on public.connection_requests for insert with check (
  public.is_approved_member()
  and requester_id = auth.uid()
  and exists (
    select 1 from public.bulletin_posts p
    where p.id = post_id
      and p.author_id = recipient_id
      and p.status = 'published'
      and p.allow_connection_requests = true
  )
);
create policy "connection participants update" on public.connection_requests for update using (
  public.is_admin() or requester_id = auth.uid() or recipient_id = auth.uid()
) with check (
  public.is_admin() or requester_id = auth.uid() or recipient_id = auth.uid()
);

create policy "reports create by approved" on public.reports for insert with check (
  public.is_approved_member() and reporter_id = auth.uid()
);
create policy "reports own or admin read" on public.reports for select using (
  public.is_admin() or reporter_id = auth.uid()
);
create policy "reports admin update" on public.reports for update using (public.is_admin()) with check (public.is_admin());

create policy "announcements scoped read" on public.announcements for select using (
  visibility = 'public'
  or (visibility = 'members' and public.is_approved_member())
  or public.is_admin()
);
create policy "announcements admin write" on public.announcements for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values
  ('public-assets', 'public-assets', true),
  ('private-resources', 'private-resources', false),
  ('profile-images', 'profile-images', true)
on conflict (id) do nothing;

create policy "public assets are readable" on storage.objects for select using (bucket_id = 'public-assets');
create policy "profile images are readable" on storage.objects for select using (bucket_id = 'profile-images');
create policy "private resources approved read" on storage.objects for select using (
  bucket_id = 'private-resources' and public.is_approved_member()
);
create policy "admins manage storage" on storage.objects for all using (public.is_admin()) with check (public.is_admin());
