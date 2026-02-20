# Cozy Vile Hotel — Project Overview

This repository is a Vite + React frontend for the Cozy Vile Hotel website. It follows a precise spec (pages, components, Supabase-backed content, admin panel) described in docs/COZY_VILE_SPEC.md.

Quick start

1. Copy `.env.example` to `.env` or `.env.local` and fill values.

```bash
cp .env.example .env
# then edit .env
```

2. Install deps and run dev server

```bash
npm install
npm run dev
```

3. Supabase

- Use the SQL migration in `supabase/migrations/001_create_tables.sql` to create the schema in your Supabase project (via supabase CLI or psql).
- Create storage buckets: `rooms`, `dining`, `venues`, `gallery`, (optional) `amenities`.

Notes

- Environment keys used by Vite must start with `VITE_` (see `.env.example`).
- This repo expects content to come from Supabase; admin flows use site settings table to store admin password.

More documentation: see `docs/COZY_VILE_SPEC.md` and `phases.md`.
