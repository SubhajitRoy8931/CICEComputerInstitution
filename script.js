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
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
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

    if (year) {
        year.textContent = new Date().getFullYear();
    }

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
            position: "fixed",
            right: "22px",
            bottom: "22px",
            width: "58px",
            height: "58px",
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            background: "#25D366",
            color: "#fff",
            boxShadow: "0 8px 24px rgba(0,0,0,.22)",
            zIndex: "9999",
            transition: "transform .2s ease, box-shadow .2s ease",
            textDecoration: "none"
        });

        const icon = whatsapp.querySelector("svg");
        Object.assign(icon.style, {
            width: "31px",
            height: "31px",
            fill: "currentColor"
        });

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

    // ==================== TESTIMONIAL SLIDER ====================
    // Turns the testimonial cards into a horizontal slider.
    // The slider advances automatically when the visitor is not interacting with it.
    const testimonialGrid = document.querySelector(".testimonial-grid");

    if (testimonialGrid) {
        const sliderStyle = document.createElement("style");
        sliderStyle.textContent = `
            .testimonial-slider-wrap {
                position: relative;
            }

            .testimonial-grid {
                display: flex !important;
                overflow-x: auto;
                scroll-behavior: smooth;
                scroll-snap-type: x mandatory;
                scrollbar-width: none;
                gap: 20px;
                padding: 4px 2px 14px;
                cursor: grab;
            }

            .testimonial-grid::-webkit-scrollbar {
                display: none;
            }

            .testimonial-grid:active {
                cursor: grabbing;
            }

            .testimonial-grid .testimonial-card {
                flex: 0 0 calc((100% - 40px) / 3);
                scroll-snap-align: start;
            }

            .testimonial-slider-controls {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                margin-top: 18px;
            }

            .testimonial-slider-button {
                width: 40px;
                height: 40px;
                border: 1px solid #dfe7f1;
                border-radius: 50%;
                background: #fff;
                color: #142238;
                display: grid;
                place-items: center;
                cursor: pointer;
                font-size: 1rem;
                transition: .2s;
            }

            .testimonial-slider-button:hover {
                background: #f1f7ff;
                border-color: #bdd2f3;
            }

            @media (max-width: 900px) {
                .testimonial-grid .testimonial-card {
                    flex-basis: calc((100% - 20px) / 2);
                }
            }

            @media (max-width: 600px) {
                .testimonial-grid .testimonial-card {
                    flex-basis: 100%;
                }
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
            <button class="testimonial-slider-button" type="button" aria-label="Next testimonial">→</button>
        `;
        sliderWrap.appendChild(controls);

        const cards = testimonialGrid.querySelectorAll(".testimonial-card");
        const previousButton = controls.querySelector("button:first-child");
        const nextButton = controls.querySelector("button:last-child");

        let autoplayTimer = null;
        let userInteracting = false;

        const moveSlider = direction => {
            if (!cards.length) return;

            const cardWidth = cards[0].getBoundingClientRect().width + 20;
            const maxScroll = testimonialGrid.scrollWidth - testimonialGrid.clientWidth;
            let target = testimonialGrid.scrollLeft + (direction * cardWidth);

            // When the end is reached, continue from the beginning.
            if (direction > 0 && target >= maxScroll - 2) {
                target = 0;
            }

            // When moving backwards from the beginning, go to the end.
            if (direction < 0 && target <= 0) {
                target = maxScroll;
            }

            testimonialGrid.scrollTo({
                left: target,
                behavior: "smooth"
            });
        };

        previousButton.addEventListener("click", () => {
            userInteracting = true;
            moveSlider(-1);
            restartAutoplay();
        });

        nextButton.addEventListener("click", () => {
            userInteracting = true;
            moveSlider(1);
            restartAutoplay();
        });

        // Automatically moves to the next testimonial every 4 seconds.
        // Interaction pauses autoplay and restarts it after a short idle period.
        const startAutoplay = () => {
            clearInterval(autoplayTimer);
            autoplayTimer = setInterval(() => {
                if (!userInteracting) {
                    moveSlider(1);
                }
                userInteracting = false;
            }, 4000);
        };

        const restartAutoplay = () => {
            clearInterval(autoplayTimer);
            userInteracting = true;
            setTimeout(() => {
                userInteracting = false;
                startAutoplay();
            }, 5000);
        };

        // Pause while the pointer is over the testimonials.
        testimonialGrid.addEventListener("mouseenter", () => {
            userInteracting = true;
            clearInterval(autoplayTimer);
        });

        testimonialGrid.addEventListener("mouseleave", () => {
            userInteracting = false;
            startAutoplay();
        });

        // Pause while the visitor touches or swipes on mobile.
        testimonialGrid.addEventListener("touchstart", () => {
            userInteracting = true;
            clearInterval(autoplayTimer);
        }, { passive: true });

        testimonialGrid.addEventListener("touchend", () => {
            restartAutoplay();
        }, { passive: true });

        // Allow desktop users to drag the testimonial row with the mouse.
        let isDragging = false;
        let startX = 0;
        let startScroll = 0;

        testimonialGrid.addEventListener("mousedown", event => {
            isDragging = true;
            userInteracting = true;
            clearInterval(autoplayTimer);
            startX = event.pageX;
            startScroll = testimonialGrid.scrollLeft;
        });

        testimonialGrid.addEventListener("mouseleave", () => {
            isDragging = false;
            userInteracting = false;
            startAutoplay();
        });

        testimonialGrid.addEventListener("mouseup", () => {
            isDragging = false;
            restartAutoplay();
        });

        testimonialGrid.addEventListener("mousemove", event => {
            if (!isDragging) return;
            event.preventDefault();
            testimonialGrid.scrollLeft = startScroll - (event.pageX - startX);
        });

        // Start automatic sliding as soon as the page is ready.
        startAutoplay();
    }
});
