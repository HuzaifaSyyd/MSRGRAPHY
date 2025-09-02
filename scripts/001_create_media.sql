-- Create media table
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('image','video')),
  category text,
  title text,
  description text,
  file_path text not null,
  width int,
  height int,
  duration int,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.media enable row level security;

-- Policies:
-- 1) Anyone can read (public portfolio)
drop policy if exists "media_read_all" on public.media;
create policy "media_read_all" on public.media
for select using (true);

-- 2) Authenticated users can insert their own
drop policy if exists "media_insert_own" on public.media;
create policy "media_insert_own" on public.media
for insert with check (auth.uid() = user_id);

-- 3) Owners can update/delete their rows
drop policy if exists "media_modify_own" on public.media;
create policy "media_modify_own" on public.media
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "media_delete_own" on public.media;
create policy "media_delete_own" on public.media
for delete using (auth.uid() = user_id);
