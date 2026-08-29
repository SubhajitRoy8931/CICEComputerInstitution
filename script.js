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

    // ==================== TESTIMONIAL CAROUSEL ====================
    // Creates a true repeating carousel with duplicated testimonial sets.
    // The active card is always centered. The middle copy is used as the
    // visual reference point, while the first and third copies make both
    // forward and backward looping continuous.
    const testimonialGrid = document.querySelector(".testimonial-grid");

    if (testimonialGrid) {
        const originalCards = Array.from(
            testimonialGrid.querySelectorAll(".testimonial-card")
        );

        if (originalCards.length) {
            const sliderStyle = document.createElement("style");
            sliderStyle.textContent = `
                .testimonial-slider-wrap {
                    position: relative;
                    width: min(1180px, calc(100% - 40px));
                    margin: 0 auto;
                }

                .testimonial-carousel-viewport {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    padding: 28px 0 34px;
                }

                .testimonial-grid {
                    display: flex !important;
                    align-items: stretch;
                    gap: 24px;
                    width: max-content;
                    max-width: none;
                    margin: 0 !important;
                    padding: 0 !important;
                    overflow: visible !important;
                    cursor: grab;
                    will-change: transform;
                    transition: transform .65s cubic-bezier(.22,.61,.36,1);
                }

                .testimonial-grid.is-dragging {
                    cursor: grabbing;
                    transition: none;
                }

                .testimonial-grid .testimonial-card {
                    flex: 0 0 calc((min(1180px, calc(100vw - 40px)) - 48px) / 3);
                    width: calc((min(1180px, calc(100vw - 40px)) - 48px) / 3);
                    min-width: 0;
                    opacity: .28;
                    transform: scale(.88);
                    filter: saturate(.65);
                    transition:
                        opacity .55s ease,
                        transform .55s ease,
                        filter .55s ease,
                        box-shadow .55s ease,
                        border-color .55s ease;
                    transform-origin: center center;
                }

                .testimonial-grid .testimonial-card.is-near {
                    opacity: .52;
                    transform: scale(.92);
                    filter: saturate(.8);
                }

                .testimonial-grid .testimonial-card.is-active {
                    opacity: 1;
                    transform: scale(1.04);
                    filter: none;
                    background: linear-gradient(145deg, #e7f3ff, #f5fbff);
                    border-color: #8fc4ff;
                    box-shadow: 0 20px 48px rgba(23,105,255,.16);
                    z-index: 2;
                }

                .testimonial-grid .testimonial-card.is-active .quote-mark {
                    color: var(--blue);
                }

                .testimonial-slider-controls {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-top: 4px;
                }

                .testimonial-slider-button {
                    width: 42px;
                    height: 42px;
                    border: 1px solid #cbdbea;
                    border-radius: 50%;
                    background: #fff;
                    color: #142238;
                    display: grid;
                    place-items: center;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: transform .2s ease, background .2s ease, border-color .2s ease;
                }

                .testimonial-slider-button:hover {
                    background: #edf6ff;
                    border-color: #8fc4ff;
                    transform: translateY(-2px);
                }

                @media (max-width: 900px) {
                    .testimonial-grid .testimonial-card {
                        flex-basis: calc((min(100vw - 40px, 1180px) - 24px) / 2);
                        width: calc((min(100vw - 40px, 1180px) - 24px) / 2);
                    }
                }

                @media (max-width: 600px) {
                    .testimonial-slider-wrap {
                        width: calc(100% - 30px);
                    }

                    .testimonial-carousel-viewport {
                        padding: 18px 0 26px;
                    }

                    .testimonial-grid .testimonial-card,
                    .testimonial-grid .testimonial-card.is-active {
                        flex-basis: calc(100vw - 30px);
                        width: calc(100vw - 30px);
                        transform: scale(1);
                    }

                    .testimonial-grid .testimonial-card {
                        opacity: .2;
                    }

                    .testimonial-grid .testimonial-card.is-near {
                        opacity: .25;
                    }

                    .testimonial-grid .testimonial-card.is-active {
                        opacity: 1;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .testimonial-grid {
                        transition: none !important;
                    }

                    .testimonial-grid .testimonial-card {
                        transition: none !important;
                    }
                }
            `;
            document.head.appendChild(sliderStyle);

            const sliderWrap = document.createElement("div");
            sliderWrap.className = "testimonial-slider-wrap";

            const viewport = document.createElement("div");
            viewport.className = "testimonial-carousel-viewport";

            testimonialGrid.parentNode.insertBefore(sliderWrap, testimonialGrid);
            sliderWrap.appendChild(viewport);
            viewport.appendChild(testimonialGrid);

            // Three complete copies create enough room to travel seamlessly
            // in both directions before the internal position is normalized.
            const copies = 3;
            const originalMarkup = originalCards.map(card => card.cloneNode(true));

            testimonialGrid.innerHTML = "";

            for (let copy = 0; copy < copies; copy++) {
                originalMarkup.forEach(card => {
                    const clone = card.cloneNode(true);
                    clone.setAttribute("aria-hidden", copy === 1 ? "false" : "true");
                    testimonialGrid.appendChild(clone);
                });
            }

            const cards = Array.from(
                testimonialGrid.querySelectorAll(".testimonial-card")
            );
            const total = originalCards.length;

            const controls = document.createElement("div");
            controls.className = "testimonial-slider-controls";
            controls.innerHTML = `
                <button class="testimonial-slider-button" type="button"
                    aria-label="Previous testimonial">←</button>
                <button class="testimonial-slider-button" type="button"
                    aria-label="Next testimonial">→</button>
            `;
            sliderWrap.appendChild(controls);

            const previousButton = controls.querySelector("button:first-child");
            const nextButton = controls.querySelector("button:last-child");

            let currentIndex = total;
            let autoplayTimer = null;
            let resumeTimer = null;
            let isAnimating = false;
            let isPointerDown = false;
            let pointerStartX = 0;
            let pointerStartTranslate = 0;

            const getGap = () => {
                const styles = getComputedStyle(testimonialGrid);
                return parseFloat(styles.columnGap || styles.gap || "24") || 24;
            };

            const getCardStep = () => {
                if (!cards[0]) return 0;
                return cards[0].getBoundingClientRect().width + getGap();
            };

            // Calculates the exact translation required to put the active
            // testimonial's centre on the viewport's centre line.
            const getCenteredTranslate = index => {
                const step = getCardStep();
                if (!step) return 0;

                const cardWidth = cards[0].getBoundingClientRect().width;
                return (viewport.clientWidth / 2) -
                    (index * step + cardWidth / 2);
            };

            const setCardStates = () => {
                cards.forEach((card, index) => {
                    const distance = Math.abs(index - currentIndex);
                    card.classList.toggle("is-active", distance === 0);
                    card.classList.toggle("is-near", distance === 1);
                });
            };

            const render = animate => {
                setCardStates();

                testimonialGrid.style.transition = animate
                    ? "transform .65s cubic-bezier(.22,.61,.36,1)"
                    : "none";

                testimonialGrid.style.transform =
                    `translate3d(${getCenteredTranslate(currentIndex)}px,0,0)`;
            };

            const normalizeIfNeeded = () => {
                // The corresponding card in the middle copy has the same
                // position and appearance, so normalization is invisible.
                if (currentIndex >= total * 2) {
                    currentIndex -= total;
                    render(false);
                } else if (currentIndex < total) {
                    currentIndex += total;
                    render(false);
                }
            };

            const move = direction => {
                if (isAnimating || total < 2) return;

                isAnimating = true;
                currentIndex += direction;
                render(true);
            };

            const startAutoplay = () => {
                clearInterval(autoplayTimer);

                autoplayTimer = setInterval(() => {
                    if (!isPointerDown && !document.hidden) {
                        move(1);
                    }
                }, 4000);
            };

            const pauseAndResume = () => {
                clearInterval(autoplayTimer);
                clearTimeout(resumeTimer);
                resumeTimer = setTimeout(startAutoplay, 5000);
            };

            nextButton.addEventListener("click", () => {
                move(1);
                pauseAndResume();
            });

            previousButton.addEventListener("click", () => {
                move(-1);
                pauseAndResume();
            });

            testimonialGrid.addEventListener("transitionend", event => {
                if (event.propertyName !== "transform") return;

                normalizeIfNeeded();
                isAnimating = false;
            });

            viewport.addEventListener("mouseenter", () => {
                clearInterval(autoplayTimer);
            });

            viewport.addEventListener("mouseleave", () => {
                if (!isPointerDown) startAutoplay();
            });

            // Pointer-based dragging supports both mouse dragging and mobile swiping.
            const pointerDown = event => {
                if (event.pointerType === "mouse" && event.button !== 0) return;

                isPointerDown = true;
                isAnimating = false;
                clearInterval(autoplayTimer);
                clearTimeout(resumeTimer);

                pointerStartX = event.clientX;
                pointerStartTranslate = getCenteredTranslate(currentIndex);

                testimonialGrid.classList.add("is-dragging");

                if (testimonialGrid.setPointerCapture) {
                    testimonialGrid.setPointerCapture(event.pointerId);
                }
            };

            const pointerMove = event => {
                if (!isPointerDown) return;

                const delta = event.clientX - pointerStartX;

                testimonialGrid.style.transition = "none";
                testimonialGrid.style.transform =
                    `translate3d(${pointerStartTranslate + delta}px,0,0)`;
            };

            const pointerUp = event => {
                if (!isPointerDown) return;

                const delta = event.clientX - pointerStartX;
                const threshold = Math.min(100, viewport.clientWidth * .15);

                isPointerDown = false;
                testimonialGrid.classList.remove("is-dragging");

                if (Math.abs(delta) >= threshold) {
                    move(delta < 0 ? 1 : -1);
                } else {
                    render(true);
                }

                pauseAndResume();

                if (testimonialGrid.releasePointerCapture) {
                    try {
                        testimonialGrid.releasePointerCapture(event.pointerId);
                    } catch (_) {}
                }
            };

            viewport.addEventListener("pointerdown", pointerDown);
            viewport.addEventListener("pointermove", pointerMove);
            viewport.addEventListener("pointerup", pointerUp);
            viewport.addEventListener("pointercancel", pointerUp);

            window.addEventListener("resize", () => {
                render(false);
            });

            document.addEventListener("visibilitychange", () => {
                if (document.hidden) {
                    clearInterval(autoplayTimer);
                } else {
                    startAutoplay();
                }
            });

            requestAnimationFrame(() => {
                render(false);
                startAutoplay();
            });
        }
    }
});
