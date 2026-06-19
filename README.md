# Alph Teach Auto & Towing Services

## Project Overview

This repository contains a static multi-page website for Alph Teach Auto & Towing Services. The site is built with HTML, CSS, and JavaScript, and includes interactive enhancements such as a Leaflet map, accordion FAQ, dynamic forms, and responsive layout.

## Pages Included

- `index.html` — homepage with service highlights and quick contact links.
- `about.html` — company story, benefits, FAQ, and client trust content.
- `service.html` — service offerings, pricing, and booking support.
- `enquiry.html` — enquiry form for service requests, quotes, and assistance.
- `contact.html` — contact details, map location, and message form.
- `robots.txt` — search engine crawler instructions.
- `sitemap.xml` — page index for search engines.

## Key Features

- HTML5 semantic content and responsive design.
- Interactive contact map powered by Leaflet.
- Accordion FAQ and modal interactions via jQuery.
- Service enquiry and contact forms with client-side validation.
- AJAX form submit support with mailto fallback.
- SEO-friendly metadata, local image optimization, and schema-ready structure.

## Recent Changes (2026-06-18)

- Added an in-page searchable services renderer on `service.html` with a search box and sort control. Services are defined in the `services` JavaScript array inside `service.html`.
- Added Roadside Assistance and Maintenance package entries to the services data so those rows are searchable and rendered as cards.
- Grouped related sections (Workshop + Why choose us) into a polished two-column card layout and improved `service-table` visual styling via `css/style.css`.
- Removed one media card that contained a blurred-face image for privacy/visual consistency.

## Editing Services

To add or update a service shown on the Services page, edit the `services` array inside `service.html` near the top of the page. Each entry follows this format:

```js
{ id: 14, title: 'Example Service', description: 'Short description', price: 'From Rxxx', category: 'Category', image: 'images/example.jpg' }
```

- Use local images placed in the `images/` folder or external URLs (starting with `https://`). The renderer automatically detects full URLs and uses them directly.
- Keep `id` values unique and update the `price` string as needed. The sort control uses numeric parsing of digits in the `price` string for price sorting.

## Previewing Locally

Open `service.html` in a browser (or use Live Server) to preview the searchable services and layout changes. No build step is required.

## Repository Guidance

- Commit changes regularly with descriptive messages.
- Update `README.md` whenever new features or Part 3 work is added.
- Maintain `CHANGELOG.md` for each release and feedback iteration.
- Push local changes to the remote repository after verifying the site.

## Form Setup Instructions

Two forms use a placeholder Formspree endpoint:

- `contact.html` — contact form
- `enquiry.html` — enquiry form

Replace the placeholder endpoint in both forms:

```html
<form id="contactForm" action="#" method="post" data-endpoint="https://formspree.io/f/yourFormID">
```

and

```html
<form id="enquiryForm" action="#" method="post" data-endpoint="https://formspree.io/f/yourFormID">
```

with your actual endpoint or backend URL.

## Development Notes

- No build tool is required. Open the HTML pages directly in a browser for local preview.
- If deploying to a static host, ensure `robots.txt` and `sitemap.xml` are included in the published root.
- Use consistent commit messages like `Add contact form validation` or `Update sitemap and README`.

## References

- jQuery 3.7.1 CDN
- Leaflet 1.9.4 CDN
- OpenStreetMap tile data
- Formspree (form submission placeholder)

