$(document).ready(function() {
    // ====== 1. TABS ======
    $('.tab-btn').on('click', function() {
        const tabId = $(this).data('tab');
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        $('.tab-pane').removeClass('active');
        $('#' + tabId).addClass('active');
    });

    // ====== 2. ACCORDION ======
    $('.accordion-header').on('click', function() {
        const item = $(this).closest('.accordion-item');
        const content = item.find('.accordion-content');
        content.slideToggle(200);
        content.toggleClass('open');
        item.toggleClass('active');
    });

    // Open first accordion item by default
    $('.accordion-item:first .accordion-content').slideDown(0).addClass('open');
    $('.accordion-item:first').addClass('active');

    // FAQ accordion fallback initializer for #faq-accordion
    if ($('#faq-accordion').length) {
        $('#faq-accordion .accordion-item:first .accordion-content').slideDown(0).addClass('open');
        $('#faq-accordion .accordion-item:first').addClass('active');
    }

    // ====== 3. LEAFLET MAP ======
    if (typeof L !== 'undefined' && $('#map').length) {
        const map = L.map('map').setView([-26.2041, 28.0473], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([-26.2041, 28.0473]).addTo(map)
            .bindPopup('📍 Alph Teach Auto & Towing<br>21 Stephenson Road, Wemmer, Johannesburg')
            .openPopup();
    }

    // ====== 4. LIGHTBOX ======
    const lightboxOverlay = $('#lightboxOverlay');
    const lightboxImg = $('#lightboxImg');
    
    $('.gallery-img').on('click', function(e) {
        if ($(this).closest('a[data-lightbox]').length) {
            return;
        }
        const src = $(this).attr('src');
        lightboxImg.attr('src', src);
        lightboxOverlay.addClass('active');
        $('body').css('overflow', 'hidden');
    });
    
    $('#closeLightbox, #lightboxOverlay').on('click', function(e) {
        if (e.target === this || $(e.target).closest('.close-lb').length) {
            lightboxOverlay.removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });
    
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay.hasClass('active')) {
            lightboxOverlay.removeClass('active');
            $('body').css('overflow', 'auto');
        }
        if (e.key === 'Escape' && $('#bookingModal').hasClass('active')) {
            $('#bookingModal').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });

    const bookingModal = $('#bookingModal');
    $('#bookNow').on('click', function() {
        bookingModal.addClass('active');
        $('body').css('overflow', 'hidden');
    });

    bookingModal.on('click', function(e) {
        if (e.target === this || $(e.target).closest('[data-close]').length) {
            bookingModal.removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });

    // ====== 5. FORM SUBMIT ======
    // ====== 5b. FORM AJAX + VALIDATION ======
    async function postFormJson(endpoint, obj) {
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            return res.ok;
        } catch (err) {
            return false;
        }
    }

    function formToObject($form) {
        const data = {};
        $form.serializeArray().forEach(field => {
            if (field.value !== undefined && field.value !== null) data[field.name] = field.value;
        });
        return data;
    }

    // Contact form: try AJAX POST, fallback to mailto if unavailable
    $('#contactForm').on('submit', async function(e) {
        e.preventDefault();
        const $form = $(this)[0];
        const $jq = $(this);

        if (!$form.checkValidity()) {
            $form.reportValidity();
            return;
        }

        const data = formToObject($jq);
        const endpoint = $jq.data('endpoint');
        let sent = false;
        if (endpoint) {
            $('#contactFeedback').text('Sending...').css({'color':'#0a58ca','display':'block'});
            sent = await postFormJson(endpoint, data);
        }

        if (sent) {
            $('#contactFeedback').text('Thank you — your enquiry was submitted. We will contact you shortly.').css({'color':'#1b5e20','display':'block'});
            $jq[0].reset();
            return;
        }

        // Fallback: open mail client
        const recipient = 'info@alphteachautotowing.co.za';
        const subject = encodeURIComponent('Website Contact from ' + (data.fullname || 'Guest'));
        let body = '';
        Object.keys(data).forEach(k => { body += k + ': ' + data[k] + '\n'; });
        const mailto = 'mailto:' + recipient + '?subject=' + subject + '&body=' + encodeURIComponent(body);
        $('#contactFeedback').text('Unable to submit via form endpoint — opening your email client...').css({'color':'#b56e00','display':'block'});
        window.location.href = mailto;
        $jq[0].reset();
    });

    // Enquiry form: validate, try AJAX, otherwise show immediate estimate and offer mailto
    $('#enquiryForm').on('submit', async function(e) {
        e.preventDefault();
        const $jq = $(this);
        const formEl = $jq[0];

        if (!formEl.checkValidity()) {
            formEl.reportValidity();
            return;
        }

        const data = formToObject($jq);
        const endpoint = $jq.data('endpoint');
        let sent = false;
        if (endpoint) {
            $('#enquiryResult').text('Sending enquiry...').css({'display':'block','color':'#0a58ca'});
            sent = await postFormJson(endpoint, data);
        }

        const estimates = {
            towing: 'Estimated starting from R450. Immediate 24/7 towing available.',
            repair: 'Workshop quote: typical labour from R350/hr. Call to confirm availability.',
            roadside: 'Roadside assistance typically R200–R850 depending on issue. Immediate dispatch available.',
            maintenance: 'Maintenance services start around R500 — please book for availability.',
            quote: 'We will prepare a detailed quote within 1–2 business days.'
        };

        if (sent) {
            $('#enquiryResult').html('<strong>Thank you — your enquiry was received. We will contact you soon.</strong>').css({'display':'block','color':'#1b5e20'});
            $jq[0].reset();
            return;
        }

        // If AJAX not available, provide immediate estimate and email fallback
        const service = data.service_type || data.service || 'quote';
        const resp = estimates[service] || 'Thanks — we will contact you with more details.';
        const contactEmail = data.email ? (' or ' + data.email) : '';
        $('#enquiryResult').html('<strong>Response:</strong> ' + resp + '<br><br>We will contact you at ' + (data.phone || '') + contactEmail + '.').css({'display':'block','color':'#082a3a'});

        const mailBtn = $('<a href="#" class="btn" style="margin-top:8px;display:inline-block;">Email this enquiry</a>');
        mailBtn.on('click', function(ev) {
            ev.preventDefault();
            const recipient = 'info@alphteachautotowing.co.za';
            const subject = encodeURIComponent('Service Enquiry: ' + service + ' — ' + (data.fullname || 'Guest'));
            let body = '';
            Object.keys(data).forEach(k => { body += k + ': ' + data[k] + '\n'; });
            window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + encodeURIComponent(body);
        });
        $('#enquiryResult').append(mailBtn);
        $jq[0].reset();
    });

    // ====== 6. SERVICE SEARCH ======
    const serviceData = [
        { name: 'Flatbed Towing', category: 'Towing', description: 'Ideal for luxury cars, low-clearance vehicles, and all-wheel drive cars.', price: 500 },
        { name: 'Wheel-Lift Towing', category: 'Towing', description: 'Perfect for standard vehicles. Quick and efficient for roadside pickups.', price: 400 },
        { name: 'Heavy-Duty Towing', category: 'Towing', description: 'For trucks, vans, buses, and commercial vehicles.', price: 0 },
        { name: 'Long-Distance Towing', category: 'Towing', description: 'We tow anywhere in Gauteng and beyond.', price: 0 },
        { name: 'Battery Jump-Start', category: 'Roadside', description: 'Dead battery? We’ll get you running again.', price: 250 },
        { name: 'Flat Tire Change', category: 'Roadside', description: 'Don’t have a spare or don’t know how? We’ve got you.', price: 200 },
        { name: 'Fuel Delivery', category: 'Roadside', description: 'Ran out of fuel? We’ll bring enough to get you to the nearest petrol station.', price: 250 },
        { name: 'Lockout Service', category: 'Roadside', description: 'Locked your keys inside your car? Quick, non-destructive entry.', price: 350 }
    ];

    function renderServiceResults(items) {
        const container = $('#serviceResults');
        if (!container.length) return;
        if (items.length === 0) {
            container.html('<p style="grid-column:1/-1;color:#4b5963;">No services matched your search.</p>');
            return;
        }
        container.html(items.map(item => `
            <div class="service-item card">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Price:</strong> ${item.price > 0 ? 'R' + item.price : 'Call for quote'}</p>
            </div>
        `).join(''));
    }

    function filterAndSortServices() {
        const term = $('#serviceSearch').val().toLowerCase().trim();
        const sort = $('#serviceSort').val();
        let results = serviceData.filter(item => {
            return item.name.toLowerCase().includes(term)
                || item.category.toLowerCase().includes(term)
                || item.description.toLowerCase().includes(term);
        });
        if (sort === 'priceAsc') {
            results.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));
        } else if (sort === 'priceDesc') {
            results.sort((a, b) => (b.price || -Infinity) - (a.price || -Infinity));
        } else {
            results.sort((a, b) => a.name.localeCompare(b.name));
        }
        renderServiceResults(results);
    }

    $('#serviceSearch').on('input', filterAndSortServices);
    $('#serviceSort').on('change', filterAndSortServices);
    renderServiceResults(serviceData);
});