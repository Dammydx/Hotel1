# Cozy Vile Hotel — Master Dev Spec (condensed)

This document summarises the feature set and architecture for the Cozy Vile Hotel frontend. It mirrors the full spec provided to the project owner and is the primary reference for pages, DB tables, storage, and admin expectations.

Key points

- Tech: React + Vite, Tailwind CSS, Supabase (DB + Storage), Framer Motion, Lucide React
- All content (rooms/dining/venues/gallery/testimonials/experiences) must come from Supabase (no mock arrays). FAQ is static for now.
- Required pages: Home, About, Rooms, Amenities, Dining, Meetings & Events, Gallery, Contact, plus detail pages for rooms/dining/venues and admin routes.
- Admin: password-only login; default in `.env` fallback; changeable via `site_settings.admin_password`.

Database tables
- See `supabase/migrations/001_create_tables.sql` for full DDL: `site_settings`, `rooms`, `room_images`, `amenities`, `room_amenities`, `experiences`, `testimonials`, `dining_outlets`, `dining_images`, `venues`, `venue_images`, `gallery_images`, `newsletter_subscribers`, `contact_messages`.

Storage buckets
- Create public buckets: `rooms`, `dining`, `venues`, `gallery`, (optional) `amenities`. Upload images via Admin and store public URLs in tables.

RLS guidance
- Public role: read SELECT only for content tables where `is_active = true`.
- Public role: allow INSERT to `newsletter_subscribers` and `contact_messages`.

Developer notes
- Environment variables for Vite must use the `VITE_` prefix.
- Use the `src/lib/supabase.ts` client to query content. For admin write operations you may use the service role client server-side or through an admin-protected interface.

Next steps (implementation roadmap)
1. Wire up global layout and routes. 2. Implement core components (Navbar, Footer, NewsletterBar, Lightbox, Carousel, Accordion). 3. Implement pages in order: Home, About, Rooms (listing + detail), Amenities, Dining, Meetings & Events, Gallery, Contact. 4. Build Admin CRUD pages and image upload flows. 5. Harden RLS policies and migrate creds to a secure deployment.
