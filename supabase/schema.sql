-- KP COMM — Supabase schema
-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query).
--
-- Design notes:
-- * Every visitor gets a random `device_id` (a UUID) generated in the
--   browser and stored in localStorage. It has nothing to do with real
--   identity — it just lets us group everything one browser/device did
--   into one thread, since there's no real login system.
-- * RLS is enabled with INSERT-only policies for the `anon` role. The
--   site can write data but can never read it back — only you, logged
--   into the Supabase dashboard with your account, can see it. That's
--   intentional: it keeps this a one-way mirror.

-- Append-only, like the other tables below: every state change (page
-- visit, choosing to stay anonymous, eventually setting a codename)
-- writes a new row instead of updating one in place. Postgres RLS and
-- upsert (INSERT ... ON CONFLICT DO UPDATE) don't mix well, so this
-- sidesteps that entirely — look at the most recent row per device_id
-- to see the current state.
create table if not exists agent_sessions (
  id bigint generated always as identity primary key,
  device_id text not null,
  codename text,
  is_anonymous boolean not null default false,
  language text,
  created_at timestamptz not null default now()
);

create table if not exists login_attempts (
  id bigint generated always as identity primary key,
  device_id text not null,
  username text,
  password text,
  attempted_at timestamptz not null default now()
);

create table if not exists mission_completions (
  id bigint generated always as identity primary key,
  device_id text not null,
  mission_id int not null,
  completed_at timestamptz not null default now()
);

-- question/answer are stored as the actual displayed text (in whichever
-- language she's using), not internal ids — readable straight from the
-- table editor without cross-referencing the quiz data.
create table if not exists quiz_answers (
  id bigint generated always as identity primary key,
  device_id text not null,
  mission_id int not null,
  question text not null,
  answer text not null,
  answered_at timestamptz not null default now()
);

alter table agent_sessions enable row level security;
alter table login_attempts enable row level security;
alter table mission_completions enable row level security;
alter table quiz_answers enable row level security;

-- every table below is an append-only log: INSERT only, never UPDATE/DELETE/SELECT.
create policy "anon can insert agent_sessions"
  on agent_sessions for insert
  to anon
  with check (true);

create policy "anon can insert login_attempts"
  on login_attempts for insert
  to anon
  with check (true);

create policy "anon can insert mission_completions"
  on mission_completions for insert
  to anon
  with check (true);

create policy "anon can insert quiz_answers"
  on quiz_answers for insert
  to anon
  with check (true);
