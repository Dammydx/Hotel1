# COZY VILE HOTEL — PROJECT STATUS CHECKLIST

**Last Updated:** February 18, 2026

---

## A) PROJECT SETUP
- [x] React + Vite setup
- [x] Tailwind CSS configured
- [x] Install: react-router-dom, @supabase/supabase-js, framer-motion, lucide-react
- [ ] Custom Tailwind theme tokens for Cozy Vile colors (warm cream, terracotta, muted gold, etc.)
- [ ] Font imports: Playfair Display + Lato (add to index.html)

---

## B) ROUTING
- [x] / (Home)
- [x] /about (About Us)
- [x] /rooms (Rooms & Suites listing)
- [x] /rooms/:slug (Room detail)
- [x] /amenities (Amenities)
- [x] /dining (Dining listing)
- [x] /dining/:slug (Dining detail)
- [x] /events (Meetings & Events listing)
- [x] /events/:slug (Venue detail)
- [x] /gallery (Gallery)
- [x] /contact (Contact Us)
- [x] * (NotFound)
- [x] /adminlogin (Admin login)
- [x] /admin/* (Admin routes)

---

## C) GLOBAL UI
- [x] Sticky navbar (transparent → solid on scroll)
- [x] Mobile slide-over hamburger menu
- [x] NewsletterBar (Supabase integration, CSS polish)
- [x] Footer (4-column layout + social icons + copyright)
- [x] Active route highlighting in navbar

---

## D) CORE COMPONENTS
- [x] Supabase client + env setup
- [x] Storage upload/delete helper functions
- [x] LightboxModal (next/prev, ESC, overlay close)
- [x] Carousel (for detail pages)
- [x] Accordion (FAQ with Framer Motion)
- [x] FilterSidebar
- [x] RoomCard
- [x] DiningCard
- [x] VenueCard
- [x] ProtectedRoute (admin)
- [ ] LoadingSkeleton component
- [ ] EmptyState component

---

## E) PAGES

### Home
- [x] Hero section (full-width, overlay, CTA)
- [x] Welcome/Intro split (text + image)
- [x] Featured rooms grid (is_featured = true)
- [x] Amenities preview grid
- [x] Experiences section (3 blocks from Supabase)
- [x] Testimonials (2-col desktop / stacked mobile)
- [x] Location preview + map embed
- [x] Entrance animations (Framer Motion)

### About Us
- [x] Hero banner
- [x] Story section (text + image)
- [x] Feature grid (icon cards with Lucide)
- [x] FAQ accordion (static array in code)
- [x] Framer Motion animations

### Rooms & Suites (Listing)
- [x] 2-column layout (filter sidebar + grid)
- [x] Filters: Type, Guests, Price range
- [x] Room cards with image, name, price, CTA
- [x] Image lightbox on card click
- [ ] Amenities filter multi-select (backend ready, UI may need polish)

### Room Detail
- [x] Image carousel/lightbox
- [x] Full description
- [x] Specs grid
- [x] Amenities list
- [ ] Policies section (may need implementation)
- [x] CTA: "Contact to Reserve" → Contact page

### Amenities
- [x] Hero banner
- [x] Amenity blocks (alternating layout)
- [x] Lightbox for images

### Dining (Listing + Detail)
- [x] Outlet cards with image overlay
- [x] Click routing to /dining/:slug
- [x] Dining detail page (hero, description, hours, gallery)
- [x] Image gallery with lightbox
- [x] CTA: "Reserve a Table" → Contact

### Meetings & Events (Listing + Detail)
- [x] Venue cards (name, capacity, description)
- [x] Click routing to /events/:slug
- [x] Venue detail (hero, capacity, description, gallery)
- [x] Image gallery with lightbox
- [x] CTA: "Request a Quote" → Contact

### Gallery
- [x] Grid layout with masonry styling
- [x] Fullscreen lightbox (next/prev, ESC, overlay close)
- [x] Fetch from Supabase gallery_images
- [ ] Tab/filter by category (All, Rooms, Dining, Amenities, Events)

### Contact Us
- [x] Two-column layout (map + form)
- [x] Form fields: First name, Last name, Email, Phone, Subject, Category, Message
- [x] Category dropdown (Reservations, Events, Dining, General)
- [x] Form validation
- [x] Saves to Supabase contact_messages
- [ ] Prefill subject from detail pages (e.g., room name)
- [ ] Success/error UI (basic, may need polish)

### NotFound
- [x] Branded 404 page

---

## F) ADMIN PANEL

### Admin Login
- [x] Route: /adminlogin
- [x] Password-only login
- [x] Hardcoded default password (env fallback)
- [x] Stores isAdmin in localStorage
- [ ] DB password support (fetch from site_settings, fallback to hardcoded)

### Protected Routes
- [x] ProtectedRoute component
- [x] All /admin/* routes wrapped

### Admin Dashboard
- [x] /admin overview with navigation links

### Admin Rooms
- [x] CRUD: Create, Read, Update, Delete
- [x] Toggle active/inactive
- [x] Image upload to Supabase Storage
- [x] Sort order
- [x] Form validation

### Admin Amenities
- [x] CRUD operations
- [x] Toggle active/inactive
- [x] Sort order

### Admin Dining
- [x] CRUD operations
- [x] Image upload
- [x] Toggle active/inactive
- [x] Sort order

### Admin Venues
- [x] CRUD operations
- [x] Image upload
- [x] Toggle active/inactive
- [x] Sort order

### Admin Gallery
- [x] CRUD operations
- [x] Category filtering
- [x] Image upload
- [x] Toggle active/inactive

### Admin Testimonials
- [x] CRUD operations
- [x] Toggle active/inactive

### Admin Messages
- [x] View contact messages list
- [x] Mark as read/replied (status field)

### Admin Settings
- [ ] Hotel name, address, phone, email editing
- [ ] Social media URLs
- [ ] Hero image URLs
- [ ] Map embed URL
- [ ] Admin password change (update site_settings.admin_password)

---

## G) SUPABASE (Database + Storage)

### Tables
- [x] site_settings
- [x] rooms + room_images
- [x] amenities + room_amenities (join table)
- [x] experiences
- [x] testimonials
- [x] dining_outlets + dining_images
- [x] venues + venue_images
- [x] gallery_images
- [x] newsletter_subscribers
- [x] contact_messages

### Foreign Keys & Indexes
- [x] FK relations created
- [x] Indexes on slug columns

### RLS Policies
- [x] Public SELECT on active content (rooms, dining, venues, experiences, testimonials, gallery)
- [x] Public INSERT for newsletter_subscribers
- [x] Public INSERT for contact_messages
- [ ] Admin write policies (if using auth; currently using service role)

### Storage
- [ ] Create buckets: rooms, dining, venues, gallery, (optional) amenities
- [ ] Create public access policies for buckets
- **Note:** Upload code is ready; buckets need creation in Supabase console

---

## SUMMARY

**Completed:** ~80% of specifications  
**In Progress / Polish:** Typography, colors, admin settings, storage buckets  
**Fully Functional:** Routing, pages, Supabase integration, admin CRUD (basic)

### Next Priority Tasks
1. **Typography:** Import Playfair Display + Lato fonts
2. **Color Theme:** Update tailwind.config.js with Cozy Vile custom colors
3. **Polish:** Review each page for design consistency
4. **Admin Settings:** Implement settings page fully
5. **Storage Buckets:** Create buckets in Supabase (no code changes needed)
6. **Testing:** Test all CRUD operations, filters, lightbox, navigation
7. **Micro-interactions:** Ensure all animations are smooth and consistent
8. **Responsive Design:** Mobile testing across all pages

---

