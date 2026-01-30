# Future Tasks — Adventure Athlete India

**Last updated:** 2026-01-29

Tasks to be done after the current website launch. Not prioritized — just captured for reference.

---

## Business & Marketing (Done)

- [x] **Business card** — `design/business-card/business-card.html`. Front (brand, name, credentials, contact) + back (QR code, social handles, tagline). 3.5x2in actual card size.
- [x] **Athlete profile** — `design/athlete-profile/athlete-profile.html`. Sponsor portfolio/resume with stats, achievements, credentials, sponsorship value prop. A4 print-optimized.
- [x] **Hotel pamphlet** — `design/hotel-pamphlet/hotel-pamphlet.html`. A5 flyer for hotel front desks. Day experiences only (MTB, trail run, hike), gear rentals, credentials, QR contact.

## Website Features (Phase 2+)

- [ ] **Blog / Content system** — Trail stories, gear reviews, route guides. May use MDX or a headless CMS.
- [ ] **Map view** — Interactive map showing all experience routes on a single page.
- [ ] **GPX downloads** — Allow users to download GPX files for experiences. May require a simple form/email gate.
- [ ] **Testimonials section** — Guest reviews and testimonials. Could be a page or embedded on relevant pages.
- [ ] **My Next Adventure widget** — Dynamic widget showing the next upcoming adventure/event.
- [ ] **High Altitude Training program page** — Dedicated page for training programs.
- [ ] **Corporate Wellness program page** — Dedicated page for corporate retreats and wellness programs.
- [ ] **Tour detail pages** — Each tour/program (Shimla–Dharamshala, Manali–Leh, Village Base Camp, Wellness Retreat, Train with a Pro) needs a dedicated detail page with full itinerary, proper images, what's included, pricing, and booking flow. Currently only card-level summaries exist on the Tours & Programs page.
- [ ] **Rental agreement PDF** — Internal document (not on website). Printable rental agreement form to be given to guests at equipment pickup. Needs fields: personal details, ID verification, rental dates, equipment selected, emergency contact, agreement checkboxes.

## Technical

- [ ] **Form submissions to Supabase** — Connect all public forms (contact, plan, plan tour, rental inquiry) to the `/api/leads` endpoint.
- [ ] **Email notifications** — Send email alerts to Atul when new leads come in (can use Supabase Edge Functions or Resend).
- [ ] **Analytics** — Set up Google Analytics or Plausible for traffic tracking.
- [ ] **SEO optimization** — Meta tags, Open Graph images, structured data for experiences.
- [ ] **Image optimization** — Move from Unsplash URLs to self-hosted optimized images (Next.js Image component).
- [ ] **Performance audit** — Run Lighthouse, optimize Core Web Vitals.

## Infrastructure

- [ ] **Custom domain setup** — Configure domain DNS and SSL.
- [ ] **Supabase production setup** — Create production project, run schema, configure RLS policies.
- [ ] **Environment separation** — Separate dev/staging/production environments.
- [ ] **Backup strategy** — Regular database backups for leads and settings data.
