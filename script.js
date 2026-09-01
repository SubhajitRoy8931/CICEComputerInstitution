// ==================== SITE INTERACTIONS ====================
document.addEventListener("DOMContentLoaded", () => {



    // ==================== NAVIGATION: SPLIT LINK + ARROW ====================
    (() => {
        const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.getElementById("navLinks");

        if (!menuToggle || !navLinks) return;

        const closeAllDropdowns = (except = null) => {
            navLinks.querySelectorAll(".nav-dropdown.is-open").forEach(dropdown => {
                if (dropdown !== except) {
                    dropdown.classList.remove("is-open");
                    const arrow = dropdown.querySelector(".nav-arrow");
                    if (arrow) {
                        arrow.setAttribute("aria-expanded", "false");
                    }
                }
            });
        };

        // Main mobile menu button.
        menuToggle.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

            if (!isOpen) closeAllDropdowns();
        });

        // Only the arrow opens a submenu. The text link remains a normal page link.
        navLinks.querySelectorAll(".nav-arrow").forEach(arrow => {
            arrow.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();

                const dropdown = arrow.closest(".nav-dropdown");
                if (!dropdown) return;

                const isOpen = dropdown.classList.contains("is-open");
                closeAllDropdowns(dropdown);

                dropdown.classList.toggle("is-open", !isOpen);
                arrow.setAttribute("aria-expanded", String(!isOpen));
            });
        });

        // Submenu links are ordinary links.
        navLinks.querySelectorAll(".nav-dropdown-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open menu");
                closeAllDropdowns();
            });
        });

        // Top-level page links are ordinary links too.
        navLinks.querySelectorAll(".nav-item-with-dropdown > a, .nav-links > li:not(.nav-dropdown) > a")
            .forEach(link => {
                link.addEventListener("click", () => {
                    navLinks.classList.remove("active");
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.setAttribute("aria-label", "Open menu");
                    closeAllDropdowns();
                });
            });

        // Outside tap closes dropdown/menu.
        document.addEventListener("click", event => {
            if (!event.target.closest("#navLinks") && !event.target.closest("#menuToggle")) {
                closeAllDropdowns();
                if (window.innerWidth <= 850) {
                    navLinks.classList.remove("active");
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.setAttribute("aria-label", "Open menu");
                }
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open menu");
                closeAllDropdowns();
            }
        });
    })();


    // ==================== NAVIGATION - RELIABLE SPLIT MENU ====================
    (() => {
        if (window.__ciceNavigationInitialized) return;
        window.__ciceNavigationInitialized = true;

        const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.getElementById("navLinks");
        if (!menuToggle || !navLinks) return;

        const closeDropdowns = (except = null) => {
            navLinks.querySelectorAll(".nav-dropdown.is-open").forEach(dropdown => {
                if (dropdown !== except) {
                    dropdown.classList.remove("is-open");
                    const button = dropdown.querySelector(":scope > .nav-item-with-dropdown > .nav-arrow");
                    if (button) button.setAttribute("aria-expanded", "false");
                }
            });
        };

        menuToggle.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            const open = !navLinks.classList.contains("active");
            navLinks.classList.toggle("active", open);
            menuToggle.setAttribute("aria-expanded", String(open));
            menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            if (!open) closeDropdowns();
        });

        // IMPORTANT: only the arrow button controls dropdowns.
        // The adjacent text link is never intercepted.
        navLinks.querySelectorAll(".nav-arrow").forEach(button => {
            button.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();

                const dropdown = button.closest(".nav-dropdown");
                if (!dropdown) return;

                const open = !dropdown.classList.contains("is-open");
                closeDropdowns(dropdown);
                dropdown.classList.toggle("is-open", open);
                button.setAttribute("aria-expanded", String(open));
            });
        });

        // Submenu links and main page links are normal navigation.
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", event => {
                // Do not interfere with navigation at all.
                if (window.innerWidth <= 850) {
                    setTimeout(() => {
                        navLinks.classList.remove("active");
                        menuToggle.setAttribute("aria-expanded", "false");
                        menuToggle.setAttribute("aria-label", "Open menu");
                        closeDropdowns();
                    }, 0);
                }
            });
        });

        // Desktop: allow hover to show dropdown, while arrow click also works.
        navLinks.querySelectorAll(".nav-dropdown").forEach(dropdown => {
            const button = dropdown.querySelector(":scope > .nav-item-with-dropdown > .nav-arrow");

            dropdown.addEventListener("mouseenter", () => {
                if (window.innerWidth > 850) {
                    closeDropdowns(dropdown);
                    dropdown.classList.add("is-open");
                    if (button) button.setAttribute("aria-expanded", "true");
                }
            });

            dropdown.addEventListener("mouseleave", () => {
                if (window.innerWidth > 850) {
                    dropdown.classList.remove("is-open");
                    if (button) button.setAttribute("aria-expanded", "false");
                }
            });
        });

        document.addEventListener("click", event => {
            if (!event.target.closest(".nav-dropdown") &&
                !event.target.closest("#menuToggle")) {
                closeDropdowns();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open menu");
                closeDropdowns();
            }
        });
    })();

    // ==================== COPYRIGHT YEAR ====================
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // ==================== ACTIVE NAVIGATION ====================
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href") || "";
        if (href === currentPage || (currentPage === "index.html" && href === "#home") || (currentPage === "about.html" && href === "about.html")) {
            link.classList.add("active");
        }
    });

    // ==================== FLOATING WHATSAPP BUTTON ====================
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
            position:"fixed", right:"22px", bottom:"22px", width:"58px", height:"58px",
            display:"grid", placeItems:"center", borderRadius:"50%", background:"#25D366",
            color:"#fff", boxShadow:"0 8px 24px rgba(0,0,0,.22)", zIndex:"9999",
            transition:"transform .2s ease, box-shadow .2s ease", textDecoration:"none"
        });
        Object.assign(whatsapp.querySelector("svg").style, {
            width:"31px", height:"31px", fill:"currentColor"
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

    // ==================== INFINITE TESTIMONIAL CAROUSEL ====================
    const testimonialGrid = document.querySelector(".testimonial-grid");

    if (testimonialGrid) {
        const originals = Array.from(testimonialGrid.querySelectorAll(".testimonial-card"));

        if (originals.length > 1) {
            const style = document.createElement("style");
            style.textContent = `
                .testimonial-slider-wrap{
                    position:relative;
                    width:min(1180px,calc(100% - 40px));
                    margin:0 auto;
                }
                .testimonial-carousel-viewport{
                    position:relative;
                    width:100%;
                    overflow:hidden;
                    padding:28px 0 34px;
                }
                .testimonial-grid{
                    display:flex!important;
                    align-items:stretch;
                    gap:24px;
                    width:max-content!important;
                    max-width:none!important;
                    margin:0!important;
                    padding:0!important;
                    overflow:visible!important;
                    cursor:grab;
                    will-change:transform;
                    transition:transform .65s cubic-bezier(.22,.61,.36,1);
                }
                .testimonial-grid.is-dragging{cursor:grabbing;transition:none}
                .testimonial-grid .testimonial-card{
                    flex:0 0 min(377px,calc((100vw - 88px)/3));
                    width:min(377px,calc((100vw - 88px)/3));
                    min-width:0;
                    opacity:.22;
                    transform:scale(.88);
                    filter:saturate(.6);
                    transition:opacity .5s ease,transform .5s ease,filter .5s ease,
                               box-shadow .5s ease,border-color .5s ease;
                }
                .testimonial-grid .testimonial-card.is-near{
                    opacity:.5;
                    transform:scale(.93);
                    filter:saturate(.8);
                }
                .testimonial-grid .testimonial-card.is-active{
                    opacity:1;
                    transform:scale(1.04);
                    filter:none;
                    background:linear-gradient(145deg,#e4f2ff,#f4fbff);
                    border-color:#8fc4ff;
                    box-shadow:0 20px 48px rgba(23,105,255,.18);
                    z-index:2;
                }
                .testimonial-grid .testimonial-card.is-active .quote-mark{color:var(--blue)}
                .testimonial-slider-controls{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    gap:10px;
                    margin-top:4px;
                }
                .testimonial-slider-button{
                    width:42px;height:42px;border:1px solid #cbdbea;border-radius:50%;
                    background:#fff;color:#142238;display:grid;place-items:center;
                    cursor:pointer;font-size:1rem;transition:.2s;
                }
                .testimonial-slider-button:hover{
                    background:#edf6ff;border-color:#8fc4ff;transform:translateY(-2px);
                }
                @media(max-width:900px){
                    .testimonial-grid .testimonial-card{
                        flex-basis:calc((100vw - 64px)/2);
                        width:calc((100vw - 64px)/2);
                    }
                }
                @media(max-width:600px){
                    .testimonial-slider-wrap{width:calc(100% - 30px)}
                    .testimonial-carousel-viewport{padding:18px 0 26px}
                    .testimonial-grid .testimonial-card,
                    .testimonial-grid .testimonial-card.is-active{
                        flex-basis:calc(100vw - 30px);
                        width:calc(100vw - 30px);
                        transform:scale(1);
                    }
                    .testimonial-grid .testimonial-card{opacity:.2}
                    .testimonial-grid .testimonial-card.is-near{opacity:.25}
                    .testimonial-grid .testimonial-card.is-active{opacity:1}
                }
                @media(prefers-reduced-motion:reduce){
                    .testimonial-grid,.testimonial-grid .testimonial-card{transition:none!important}
                }
            `;
            document.head.appendChild(style);

            const wrap = document.createElement("div");
            wrap.className = "testimonial-slider-wrap";
            const viewport = document.createElement("div");
            viewport.className = "testimonial-carousel-viewport";

            testimonialGrid.parentNode.insertBefore(wrap, testimonialGrid);
            wrap.appendChild(viewport);
            viewport.appendChild(testimonialGrid);

            // Three copies: previous | current | next.
            const markup = originals.map(card => card.cloneNode(true));
            testimonialGrid.innerHTML = "";
            for (let set = 0; set < 3; set++) {
                markup.forEach(card => {
                    const clone = card.cloneNode(true);
                    clone.setAttribute("aria-hidden", set === 1 ? "false" : "true");
                    testimonialGrid.appendChild(clone);
                });
            }

            const cards = Array.from(testimonialGrid.querySelectorAll(".testimonial-card"));
            const total = originals.length;
            let index = total; // testimonial 1 in the middle copy
            let timer = null;
            let resumeTimer = null;
            let moving = false;
            let dragging = false;
            let startX = 0;
            let startTranslate = 0;

            // Use the actual card offset rather than an estimated width.
            // This is the key fix for the desktop positioning drift.
            const centeredX = i => {
                const card = cards[i];
                if (!card) return 0;
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                return viewport.clientWidth / 2 - cardCenter;
            };

            const setStates = () => {
                cards.forEach((card, i) => {
                    const d = Math.abs(i - index);
                    card.classList.toggle("is-active", d === 0);
                    card.classList.toggle("is-near", d === 1);
                });
            };

            const render = animate => {
                setStates();
                testimonialGrid.style.transition = animate
                    ? "transform .65s cubic-bezier(.22,.61,.36,1)"
                    : "none";
                testimonialGrid.style.transform = `translate3d(${centeredX(index)}px,0,0)`;
            };

            const normalize = () => {
                if (index >= total * 2) {
                    index -= total;
                    render(false);
                } else if (index < total) {
                    index += total;
                    render(false);
                }
            };

            const move = direction => {
                if (moving) return;
                moving = true;
                index += direction;
                render(true);
            };

            testimonialGrid.addEventListener("transitionend", e => {
                if (e.propertyName !== "transform") return;
                normalize();
                moving = false;
            });

            const startAutoplay = () => {
                clearInterval(timer);
                timer = setInterval(() => {
                    if (!dragging && !document.hidden) move(1);
                }, 4000);
            };

            const pauseAndResume = () => {
                clearInterval(timer);
                clearTimeout(resumeTimer);
                resumeTimer = setTimeout(startAutoplay, 5000);
            };

            const controls = document.createElement("div");
            controls.className = "testimonial-slider-controls";
            controls.innerHTML = `
                <button class="testimonial-slider-button" type="button" aria-label="Previous testimonial">←</button>
                <button class="testimonial-slider-button" type="button" aria-label="Next testimonial">→</button>`;
            wrap.appendChild(controls);

            controls.firstElementChild.addEventListener("click", () => {
                move(-1);
                pauseAndResume();
            });
            controls.lastElementChild.addEventListener("click", () => {
                move(1);
                pauseAndResume();
            });

            viewport.addEventListener("mouseenter", () => clearInterval(timer));
            viewport.addEventListener("mouseleave", () => {
                if (!dragging) startAutoplay();
            });

            viewport.addEventListener("pointerdown", e => {
                if (e.pointerType === "mouse" && e.button !== 0) return;
                dragging = true;
                moving = false;
                clearInterval(timer);
                clearTimeout(resumeTimer);
                startX = e.clientX;
                startTranslate = centeredX(index);
                testimonialGrid.classList.add("is-dragging");
                testimonialGrid.setPointerCapture?.(e.pointerId);
            });

            viewport.addEventListener("pointermove", e => {
                if (!dragging) return;
                testimonialGrid.style.transition = "none";
                testimonialGrid.style.transform =
                    `translate3d(${startTranslate + e.clientX - startX}px,0,0)`;
            });

            const endDrag = e => {
                if (!dragging) return;
                const delta = e.clientX - startX;
                dragging = false;
                testimonialGrid.classList.remove("is-dragging");
                if (Math.abs(delta) > Math.min(100, viewport.clientWidth * .15)) {
                    move(delta < 0 ? 1 : -1);
                } else {
                    render(true);
                }
                pauseAndResume();
                testimonialGrid.releasePointerCapture?.(e.pointerId);
            };

            viewport.addEventListener("pointerup", endDrag);
            viewport.addEventListener("pointercancel", endDrag);

            window.addEventListener("resize", () => render(false));
            document.addEventListener("visibilitychange", () => {
                if (document.hidden) clearInterval(timer);
                else startAutoplay();
            });

            requestAnimationFrame(() => {
                render(false);
                startAutoplay();
            });
        }
    }
});


// ==================== NOTICE & UPDATES CAROUSEL ====================
document.addEventListener("DOMContentLoaded", () => {
    const windowEl = document.getElementById("noticeWindow");
    const track = document.getElementById("noticeTrack");
    const upBtn = document.getElementById("noticeUp");
    const downBtn = document.getElementById("noticeDown");
    if (!windowEl || !track || !upBtn || !downBtn) return;
    const originals = Array.from(track.children);
    const count = originals.length;
    if (count < 2) return;
    originals.forEach(item => track.appendChild(item.cloneNode(true)));
    originals.forEach(item => track.appendChild(item.cloneNode(true)));
    let index = count, busy = false, timer = null;
    const stepSize = () => {
        const first = track.children[0], second = track.children[1];
        if (!first) return 0;
        if (second) { const d = second.offsetTop - first.offsetTop; if (d > 0) return d; }
        const s = getComputedStyle(first);
        return first.getBoundingClientRect().height + (parseFloat(s.marginTop)||0) + (parseFloat(s.marginBottom)||0);
    };
    const render = animate => { track.style.transition = animate ? "transform 650ms cubic-bezier(.22,.61,.36,1)" : "none"; track.style.transform = `translateY(-${index * stepSize()}px)`; };
    const normalize = () => { if (index >= count * 2) { index -= count; render(false); } else if (index < count) { index += count; render(false); } };
    const move = direction => { if (busy) return; busy = true; index += direction; render(true); setTimeout(() => { normalize(); busy = false; }, 680); };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => { stop(); timer = setInterval(() => move(1), 4200); };
    upBtn.addEventListener("click", () => { move(-1); start(); });
    downBtn.addEventListener("click", () => { move(1); start(); });
    windowEl.addEventListener("mouseenter", stop);
    windowEl.addEventListener("mouseleave", start);
    windowEl.addEventListener("focusin", stop);
    windowEl.addEventListener("focusout", start);
    window.addEventListener("resize", () => render(false));
    render(false);
    start();
});
