create extension if not exists pgcrypto;

create table if not exists public.media_books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  category text not null,
  cover_url text,
  status text not null default 'Plan to Read',
  rating numeric(2,1) check (rating is null or (rating >= 1 and rating <= 5)),
  review_notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.media_movies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  cover_url text,
  status text not null default 'Plan to Watch',
  rating numeric(2,1) check (rating is null or (rating >= 1 and rating <= 5)),
  review_notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.reflections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.media_books enable row level security;
alter table public.media_movies enable row level security;
alter table public.reflections enable row level security;

drop policy if exists "Public can read books" on public.media_books;
create policy "Public can read books" on public.media_books for select to anon, authenticated using (true);
drop policy if exists "Public can read movies" on public.media_movies;
create policy "Public can read movies" on public.media_movies for select to anon, authenticated using (true);
drop policy if exists "Public can read published reflections" on public.reflections;
create policy "Public can read published reflections" on public.reflections for select to anon, authenticated using (is_published = true);

revoke insert, update, delete on public.media_books from anon, authenticated;
revoke insert, update, delete on public.media_movies from anon, authenticated;
revoke insert, update, delete on public.reflections from anon, authenticated;
grant select on public.media_books, public.media_movies, public.reflections to anon, authenticated;
