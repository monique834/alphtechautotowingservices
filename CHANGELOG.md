# Changelog

## [1.1.0] - 2026-05-16

### Added
- New homepage service block and highlight card layout for urgent help and booking actions.
- Professional `service.html` sections for emergency towing, auto repair workshop, roadside assistance, and maintenance packages.
- Clean contact page layout with structured address, phone, and email blocks.
- Local image assets added and homepage cards updated to use photos from `images/`.

### Changed
- Updated `css/style.css` with modern block styles, responsive grid layouts, button variants, service tables, and mobile stacking.
- Improved header/navigation color contrast and site-wide link visibility.
- Repaired malformed HTML in `contact.html`, removing duplicate document fragments and restoring proper page structure.
- Replaced homepage image references with local photo assets for better site stability.
- Updated the hero section background image to `images/Screenshot_16-5-2026_0814_www.istockphoto.com.jpeg`.
- Updated the emergency towing card image to `images/Screenshot_16-5-2026_211922_pixabay.com.jpeg`.
- Updated the roadside assistance card image to `images/Screenshot_16-5-2026_0847_www.istockphoto.com.jpeg`.
- Updated the modern tow fleet service image to `images/Screenshot_16-5-2026_211856_pixabay.com.jpeg`.
- Updated the auto repair card image to `images/Screenshot_15-5-2026_23542_www.istockphoto.com.jpeg`.
- Updated the workshop repairs card image to `images/Screenshot_16-5-2026_211736_pixabay.com.jpeg`.
- Added the local service video to `service.html` using `videos/istockphoto-467034033-640_adpp_is.mp4` and removed the extra caption text.

### Fixed
- Fixed broken HTML structure and navigation consistency across `index.html`, `service.html`, and `contact.html`.
- Corrected the contact page so it now loads as a valid HTML page with proper header, main, and footer sections.
- Reverted unintended image changes when requested.

### Notes
- The changelog will continue to document future site improvements and visual updates.

## Changelog - Part 2 Interactive Features

### 2026-06-17 - Interactive Elements Implementation

#### 1. Added Interactive Map (Leaflet)
- **Change made**: Implemented Leaflet map on contact.html showing company location
- **File(s) affected**: contact.html, style.css (added map styling)
- **Reason**: To meet Part 2 requirement for location-based features and improve user experience

#### 2. Added FAQ Accordion (jQuery)
- **Change made**: Created collapsible FAQ section for common towing questions
- **File(s) affected**: contact.html, script.js (jQuery accordion initialization)
- **Reason**: To implement interactive accordion element as required

#### 3. Added Lightbox Gallery
- **Change made**: Implemented image gallery with lightbox for fleet photos
- **File(s) affected**: gallery.html, lightbox library included
- **Reason**: To meet gallery/lightbox requirement

#### 4. Added Form Animations
- **Change made**: Added CSS transitions and animations to form inputs and buttons
- **File(s) affected**: style.css
- **Reason**: To enhance user experience with smooth interactions

#### 5. Added Booking Confirmation Modal
- **Change made**: Created modal popup that appears when booking is submitted
- **File(s) affected**: contact.html, script.js
- **Reason**: To implement modal interactive element as required

## Changelog - Part 3 Website & Repository Updates

### 2026-06-17 - Part 3 Additions

#### Added
- Contact form and enquiry form with HTML5 validation.
- AJAX form submission endpoint support and mailto fallback.
- `robots.txt` and `sitemap.xml` for search engine indexing.
- `README.md` updated with Part 3 documentation and repository guidance.

#### Changed
- Added form validation patterns for phone and email fields in `contact.html` and `enquiry.html`.
- Updated `js/script.js` to support AJAX form submission, form validation, and fallback handling.

#### Notes
- The project now includes GitHub repository guidance: commit regularly, maintain changelog entries, and push updates to the remote repository.
