// ==================== MOBILE NAVIGATION ====================
// Opens and closes the navigation menu on smaller screens.
// aria-expanded and aria-label are updated so assistive technologies
// know whether the menu is currently open or closed.
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open menu");
            });
        });
    }

    // ==================== COPYRIGHT YEAR ====================
    // Automatically displays the current year in elements with id="year".
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // ==================== ACTIVE NAVIGATION ====================
    // Detects the current page and marks the matching navigation link as active.
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href") || "";
        if (href === currentPage || (currentPage === "index.html" && href === "#home")) {
            link.classList.add("active");
        }
    });

    // ==================== FLOATING WHATSAPP BUTTON ====================
    // Creates a persistent WhatsApp contact button without requiring
    // an external icon library or changes to the page HTML.
    if (!document.querySelector(".floating-whatsapp")) {
        const whatsapp = document.createElement("a");
        whatsapp.className = "floating-whatsapp";
        whatsapp.href = "https://wa.me/917002641470";
        whatsapp.target = "_blank";
        whatsapp.rel = "noopener";
        whatsapp.setAttribute("aria-label", "Contact CICE on WhatsApp");
        whatsapp.setAttribute("title", "Contact CICE on WhatsApp");
        whatsapp.innerHTML = `
            <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                <path d="M16 3.5a12.3 12.3 0 0 0-10.7 18.4L4 28l6.3-1.2A12.3 12.3 0 1 0 16 3.5Zm0 22.2a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7.7.7-3.6-.2-.4A9.9 9.9 0 1 1 16 25.7Zm5.5-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-2.9-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.7.9 3.7.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.5Z"/>
            </svg>`;
        Object.assign(whatsapp.style, {
            position: "fixed", right: "22px", bottom: "22px", width: "58px", height: "58px",
            display: "grid", placeItems: "center", borderRadius: "50%", background: "#25D366",
            color: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,.22)", zIndex: "9999",
            transition: "transform .2s ease, box-shadow .2s ease", textDecoration: "none"
        });
        const icon = whatsapp.querySelector("svg");
        Object.assign(icon.style, { width: "31px", height: "31px", fill: "currentColor" });
        whatsapp.addEventListener("mouseenter", () => {
            whatsapp.style.transform = "translateY(-3px) scale(1.05)";
            whatsapp.style.boxShadow = "0 12px 28px rgba(0,0,0,.28)";
        });
        whatsapp.addEventListener("mouseleave", () => {
            whatsapp.style.transform = "translateY(0) scale(1)";
            whatsapp.style.boxShadow = "0 8px 24px rgba(0,0,0,.22)";
        });
        document.body.appendChild(whatsapp);
    }

    // ==================== FEATURED TESTIMONIAL CAROUSEL ====================
    // Shows one highlighted testimonial in the centre and fades the neighbouring cards.
    // Autoplay always moves forward. Cloned cards make the 10 -> 1 transition continue
    // in the same direction instead of visibly jumping backwards.
    const testimonialGrid = document.querySelector(".testimonial-grid");

    if (testimonialGrid) {
        const sliderStyle = document.createElement("style");
        sliderStyle.textContent = `
            .testimonial-slider-wrap { position:relative; overflow:hidden; }
            .testimonial-grid {
                --testimonial-gap:20px;
                display:flex !important;
                align-items:stretch;
                overflow:visible;
                gap:var(--testimonial-gap);
                padding:28px 0 30px;
                cursor:grab;
                transition:transform .7s cubic-bezier(.22,.61,.36,1);
                will-change:transform;
            }
            .testimonial-grid:active { cursor:grabbing; }
            .testimonial-grid .testimonial-card {
                flex:0 0 calc((100% - (var(--testimonial-gap) * 2)) / 3);
                min-width:0;
                opacity:.38;
                transform:scale(.90);
                transform-origin:center;
                transition:opacity .7s ease, transform .7s cubic-bezier(.22,.61,.36,1),
                            box-shadow .7s ease, background .7s ease, border-color .7s ease;
            }
            .testimonial-grid .testimonial-card.testimonial-active {
                opacity:1;
                transform:scale(1.04);
                z-index:2;
                background:linear-gradient(145deg,#dff0ff,#f3fbff);
                border-color:#6daef2;
                box-shadow:0 20px 50px rgba(23,105,255,.18);
            }
            .testimonial-grid .testimonial-card.testimonial-side {
                background:#f5f9fe;
                border-color:#dfe7f1;
                box-shadow:none;
            }
            .testimonial-slider-controls {
                display:flex; justify-content:center; align-items:center; gap:10px; margin-top:6px;
            }
            .testimonial-slider-button {
                width:40px; height:40px; border:1px solid #dfe7f1; border-radius:50%;
                background:#fff; color:#142238; display:grid; place-items:center; cursor:pointer;
                font-size:1rem; transition:.25s ease;
            }
            .testimonial-slider-button:hover {
                background:#eaf4ff; color:#1769ff; border-color:#9fc4ed; transform:translateY(-2px);
            }
            @media (max-width:900px) {
                .testimonial-grid .testimonial-card { flex-basis:calc((100% - var(--testimonial-gap)) / 2); }
            }
            @media (max-width:600px) {
                .testimonial-grid { padding:20px 0 25px; }
                .testimonial-grid .testimonial-card { flex-basis:100%; opacity:.35; transform:scale(.92); }
                .testimonial-grid .testimonial-card.testimonial-active { transform:scale(1); }
            }
        `;
        document.head.appendChild(sliderStyle);

        const sliderWrap = document.createElement("div");
        sliderWrap.className = "testimonial-slider-wrap container";
        testimonialGrid.parentNode.insertBefore(sliderWrap, testimonialGrid);
        sliderWrap.appendChild(testimonialGrid);

        const controls = document.createElement("div");
        controls.className = "testimonial-slider-controls";
        controls.innerHTML = `
            <button class="testimonial-slider-button" type="button" aria-label="Previous testimonial">←</button>
            <button class="testimonial-slider-button" type="button" aria-label="Next testimonial">→</button>`;
        sliderWrap.appendChild(controls);

        const originalCards = Array.from(testimonialGrid.querySelectorAll(".testimonial-card"));
        const originalCount = originalCards.length;
        const cloneCount = Math.min(3, originalCount);

        // Clone the first cards so the final real card can move forward into testimonial 1.
        originalCards.slice(0, cloneCount).forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            clone.classList.add("testimonial-clone");
            testimonialGrid.appendChild(clone);
        });

        const cards = Array.from(testimonialGrid.querySelectorAll(".testimonial-card"));
        const previousButton = controls.querySelector("button:first-child");
        const nextButton = controls.querySelector("button:last-child");

        let activeIndex = 0;
        let autoplayTimer = null;
        let interactionTimer = null;
        let isPaused = false;
        let isDragging = false;
        let dragStartX = 0;

        const renderSlider = (animate = true) => {
            if (!cards.length) return;
            cards.forEach((card, index) => {
                card.classList.toggle("testimonial-active", index === activeIndex);
                card.classList.toggle("testimonial-side", index !== activeIndex);
            });

            const isMobile = window.innerWidth <= 600;
            const isTablet = window.innerWidth <= 900;
            const visibleCount = isMobile ? 1 : (isTablet ? 2 : 3);
            const gap = 20;
            const cardWidth = cards[0].getBoundingClientRect().width;
            let offset;

            if (visibleCount === 1) {
                offset = activeIndex * (cardWidth + gap);
            } else if (visibleCount === 2) {
                offset = activeIndex * (cardWidth + gap) - (cardWidth / 2);
            } else {
                offset = activeIndex * (cardWidth + gap) - (cardWidth + gap);
            }

            const target = offset - Math.max(0, (testimonialGrid.clientWidth - cardWidth) / 2);
            testimonialGrid.style.transition = animate ? "transform .7s cubic-bezier(.22,.61,.36,1)" : "none";
            testimonialGrid.style.transform = `translateX(${-target}px)`;
        };

        // Autoplay sequence is always 1 -> 2 -> ... -> 10 -> clone of 1 -> reset to real 1.
        const nextTestimonial = () => {
            activeIndex += 1;
            renderSlider(true);

            if (activeIndex === originalCount) {
                setTimeout(() => {
                    activeIndex = 0;
                    renderSlider(false);
                }, 720);
            }
        };

        const previousTestimonial = () => {
            activeIndex = activeIndex === 0 ? originalCount - 1 : activeIndex - 1;
            renderSlider(true);
        };

        const startAutoplay = () => {
            clearInterval(autoplayTimer);
            autoplayTimer = setInterval(() => {
                if (!isPaused && !isDragging) nextTestimonial();
            }, 4000);
        };

        const pauseAndRestart = () => {
            isPaused = true;
            clearTimeout(interactionTimer);
            clearInterval(autoplayTimer);
            interactionTimer = setTimeout(() => {
                isPaused = false;
                startAutoplay();
            }, 5000);
        };

        previousButton.addEventListener("click", () => { previousTestimonial(); pauseAndRestart(); });
        nextButton.addEventListener("click", () => { nextTestimonial(); pauseAndRestart(); });

        sliderWrap.addEventListener("mouseenter", () => {
            isPaused = true;
            clearInterval(autoplayTimer);
        });
        sliderWrap.addEventListener("mouseleave", () => {
            isPaused = false;
            startAutoplay();
        });

        testimonialGrid.addEventListener("touchstart", event => {
            isPaused = true;
            clearInterval(autoplayTimer);
            dragStartX = event.touches[0].clientX;
        }, { passive:true });

        testimonialGrid.addEventListener("touchend", event => {
            const distance = event.changedTouches[0].clientX - dragStartX;
            if (Math.abs(distance) > 45) distance < 0 ? nextTestimonial() : previousTestimonial();
            pauseAndRestart();
        }, { passive:true });

        testimonialGrid.addEventListener("mousedown", event => {
            isDragging = true;
            isPaused = true;
            clearInterval(autoplayTimer);
            dragStartX = event.pageX;
        });

        document.addEventListener("mouseup", event => {
            if (!isDragging) return;
            isDragging = false;
            const distance = event.pageX - dragStartX;
            if (Math.abs(distance) > 50) distance < 0 ? nextTestimonial() : previousTestimonial();
            pauseAndRestart();
        });

        window.addEventListener("resize", () => renderSlider(false));

        renderSlider(false);
        startAutoplay();
    }
});
