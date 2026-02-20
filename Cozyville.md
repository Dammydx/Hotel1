COZY VILE HOTEL — MASTER DEV SPEC (ALL-IN-ONE)
0) Project Goal

Build a premium hotel website for Cozy Vile Hotel that follows the same structure, layout rhythm, and click behaviors of the “Presidential Hotel” style template you’re copying, but with Cozy Vile’s own visuals and the warm/elegant style from your moodboard.

The site must feel: Warm · Inviting · Elegant. Mobile-first responsive is mandatory.

Tech Stack (must match exactly)

Frontend: React + Vite

Styling: Tailwind CSS

Database + Storage: Supabase + Supabase Storage

Animations: Framer Motion

Icons: Lucide React

Hard rules

No mock data (no fake arrays for rooms/dining/venues/gallery/testimonials).

Everything content-related comes from Supabase EXCEPT FAQ (FAQ stays static in code for now).

Any “view details / open image / view full” behavior that exists in the template must be implemented.

1) Branding & UI System (Cozy Vile Style)
Colors (Tailwind theme tokens)

Use a warm cream/taupe base with terracotta + muted gold accents:

Warm Cream (main background)

Soft Taupe (section background / cards)

Terracotta (primary CTA buttons)

Muted Gold (luxury accent)

Olive Green (secondary accent)

Charcoal (main text)

Usage discipline

No neon colors.

Soft shadows, generous spacing, rounded corners.

Buttons: primary = terracotta, secondary = outline/taupe.

Typography

Headings: Playfair Display

Body: Lato

Accent script: Signature Script (sparingly, only for tiny section tag lines)

2) Pages (must be exactly these)

Main pages:

Home

About Us

Rooms & Suites

Amenities

Dining

Meetings & Events

Gallery

Contact Us

Required detail pages (because the template implies deep click-through):

Room detail: /rooms/:slug

Dining outlet detail: /dining/:slug

Venue detail: /meetings-events/:slug

Also:

NotFound * branded page

3) Global Layout Rules
Navbar (sticky)

Left: Logo

Middle: Nav links

Right: Primary CTA button “Contact Us”

Mobile: Hamburger → slide-over menu

Transparent on hero, turns solid/blur after scroll

Active route highlighted

Footer

Newsletter “Stay in the Know” block before footer

Footer columns: About / Explore / Legal / Social

Bottom copyright

Newsletter must save to Supabase.

4) Page-by-Page Build (structure + interactions)
4.1 HOME

Hero

Full-width hero image

Overlay for readability

Heading + short line + CTA (routes to Rooms)

Welcome/Intro split

Left: text

Right: image card

Subtle entrance animation

Featured Rooms spotlight

Pull featured rooms from Supabase (is_featured=true)

Clicking card title/CTA → room detail page

Clicking image → opens lightbox preview (if multiple images exist)

Amenities preview grid

Show key amenities with image cards

Click behavior must exist:

either route to Amenities

or open modal preview

Experiences section

3 premium blocks (image + text)

Pull from Supabase experiences

Testimonials

Pull from Supabase

Cards layout: 2 columns desktop / stacked mobile

Location preview

Show map preview (embed URL from settings) + address summary

CTA → Contact

Newsletter + Footer

4.2 ABOUT US

Hero banner

Title + subtitle

Story/History split

Text + image collage layout

“What makes your stay unforgettable” feature grid

Premium icon cards (Lucide icons)

Source can be Supabase (amenities/features), but final content must come from DB.

FAQ (IMPORTANT CHANGE)

FAQ is NOT from Supabase for now.

It must be a static array in code:

const faqs = [{ question: "", answer: "" }]


Display with accordion component + smooth Framer Motion animation

Keep it structured so later you can swap it to DB easily.

Newsletter + Footer

4.3 ROOMS & SUITES (Listing)

Two-column layout:

Left: Filter sidebar

Right: Rooms grid

Filters (must work)

Type: Room/Suite

Guests

Price range

Bed type (if stored)

Amenities multi-select (uses join table)

Apply + Reset

Room cards

Image

Name

Short description

Specs (guests/beds/size)

Price “From ₦…”

CTA “View Details” → /rooms/:slug

Mandatory popup behavior

Clicking the room image must open fullscreen lightbox

Support next/prev if multiple images exist

4.4 ROOM DETAIL PAGE /rooms/:slug (required)

Must include:

Image carousel + fullscreen lightbox

Full description

Specs grid

Amenities list

Policies section

CTA: “Contact to Reserve” → routes to Contact with prefilled subject (room name)

4.5 AMENITIES

Hero banner

Amenity blocks (alternating layout left/right)

Any amenity image grids must open lightbox

Mid-page CTA banner strip → Contact

4.6 DINING (Listing + Detail)

Dining listing

Outlet cards with image overlay

Click → /dining/:slug

Dining detail

Hero image

Full description

Opening hours

Gallery strip + lightbox

CTA: “Reserve a Table” → Contact (prefilled)

4.7 MEETINGS & EVENTS (Listing + Detail)

Venues listing

Cards show name + capacity + short description

Click → /meetings-events/:slug

Venue detail

Hero image

Seating styles + capacity

Full description

Gallery + lightbox

CTA: “Request a Quote” → Contact (prefilled)

4.8 GALLERY

Tabs / Filters

All

Rooms & Suites

Dining

Amenities

Events/Venues

Grid

Masonry/grid

Clicking image opens fullscreen lightbox with:

next/prev

ESC close

overlay click close

optional caption/title

All gallery items come from Supabase.

4.9 CONTACT US

Two-column:

Left: Map embed + Form

Right: Contact info card (from settings table)

Contact form fields

First name

Last name

Email

Phone

Subject

Category dropdown: Reservations / Events / Dining / General

Message

Submit saves to Supabase contact_messages.
Real validation + real success/error UI.

5) ADMIN PANEL (Included)
5.1 Admin login

Route: /adminlogin

Password-only login

Default password is hardcoded in code (example: CozyVile@123)

When admin changes password inside Settings, it must update the password stored in Supabase site_settings.admin_password

After that, login must validate against DB password (fallback to hardcoded only if DB is empty on first setup)

Auth approach (simple + practical)

On login:

Fetch site_settings.admin_password

If null/empty → allow hardcoded password

If exists → require DB password

Store isAdmin=true in localStorage

Protect all admin routes using ProtectedRoute

5.2 Admin routes (must exist)

/admin (dashboard overview)

/admin/rooms

/admin/amenities

/admin/dining

/admin/venues

/admin/gallery

/admin/testimonials

/admin/settings

/admin/messages (contact messages list)

5.3 Admin capabilities (CRUD)

Every section must support:

Create

Edit

Delete

Toggle active/inactive

Upload images to Supabase Storage and store URLs in DB

Sort order (optional but recommended)

Admin Settings must control

Hotel name, address, phone, email, socials

Hero images (URLs)

Map embed URL

Admin password change

No seed inserts.

6) Supabase Tables (Detailed)
6.1 site_settings (single-row global config)

Fields:

id (uuid)

hotel_name

logo_url

hero_image_url

address

phone

email

map_embed_url

instagram_url

facebook_url

admin_password

created_at

Used by: Navbar, Footer, Contact, Home hero, Admin password.

6.2 Rooms
rooms

id

name

slug (unique)

type (room/suite)

short_description

full_description

price_from (number)

size

guests

beds

is_featured (bool)

is_active (bool)

sort_order

created_at

room_images

id

room_id (FK)

image_url

alt

sort_order

6.3 Amenities
amenities

id

title

description

icon_name

is_active

sort_order

room_amenities (join)

id

room_id

amenity_id

Used for room display + filter by amenities.

6.4 Homepage content
experiences

id

title

description

image_url

is_active

sort_order

testimonials

id

guest_name

quote

rating

is_active

created_at

6.5 Dining
dining_outlets

id

name

slug

short_description

full_description

opening_hours

is_active

sort_order

dining_images

id

dining_id (FK)

image_url

sort_order

6.6 Meetings & Events
venues

id

name

slug

capacity

short_description

full_description

is_active

sort_order

venue_images

id

venue_id (FK)

image_url

sort_order

6.7 Gallery
gallery_images

id

category (rooms/dining/amenities/events)

title

image_url

is_active

sort_order

created_at

6.8 Forms
newsletter_subscribers

id

email (unique)

created_at

contact_messages

id

first_name

last_name

email

phone

subject

category

message

created_at

status (new/read/replied)

7) Storage Buckets

Create buckets:

rooms

dining

venues

gallery

(optional) amenities

Store public image URLs in tables.

8) RLS Policy Expectations (Minimal Secure Setup)

Public:

Can read content tables where is_active = true

Can insert into:

newsletter_subscribers

contact_messages

Admin:

Full write access (you can implement via Supabase auth later; for now admin writes are via Supabase client with service role only if you choose. If not, keep admin behind normal auth when you implement it.)

9) Key UX Components (Reusable)

Must build as reusable components:

Navbar

Footer

NewsletterBar

HeroBanner

RoomCard / DiningCard / VenueCard

FilterSidebar

Accordion (FAQ)

LightboxModal (fullscreen)

Carousel (detail pages)

LoadingSkeleton

EmptyState

ProtectedRoute (admin)

10) Full Task Breakdown (Checklist)
A) Project Setup

 React + Vite setup

 Tailwind setup + theme tokens for Cozy palette

 Install: react-router-dom, @supabase/supabase-js, framer-motion, lucide-react

 Fonts: Playfair Display + Lato (+ optional script)

B) Routing

 /

 /about

 /rooms

 /rooms/:slug

 /amenities

 /dining

 /dining/:slug

 /meetings-events

 /meetings-events/:slug

 /gallery

 /contact

 * NotFound

 /adminlogin

 /admin/* routes

C) Global UI

 Sticky navbar (transparent → solid on scroll)

 Mobile slide-over menu

 NewsletterBar saving to Supabase

 Footer layout like template

D) Core Components

 Supabase client + env structure

 Fetch services/hooks for each content type

 Skeleton loading + empty states

 Lightbox modal (next/prev, ESC, overlay close)

 Carousel for detail pages

 Accordion for FAQ (static array)

E) Pages

 Home (hero, intro, featured rooms, amenities preview, experiences, testimonials, location)

 About (story, feature grid, static FAQ accordion)

 Rooms listing (filters + grid + image lightbox)

 Room detail (carousel + full details + CTA)

 Amenities (alternating blocks + lightbox)

 Dining listing + dining detail

 Meetings & Events listing + venue detail

 Gallery tabs + masonry + fullscreen lightbox

 Contact page form saving to Supabase

F) Admin Panel

 Admin login (hardcoded default + DB password support)

 Protected routes + localStorage session

 Admin layout (sidebar)

 Rooms CRUD + room images upload

 Amenities CRUD

 Dining CRUD + images upload

 Venues CRUD + images upload

 Gallery CRUD + category filter control

 Testimonials CRUD

 Messages list (read contact messages)

 Settings page (site info + password change)

G) Supabase (DB + Storage)

 Create tables listed above

 Create FK relations

 Create RLS (public read active content; public inserts only for newsletter + contact)

 Create storage buckets and policies