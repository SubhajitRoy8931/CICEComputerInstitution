// ==================== MOBILE NAVIGATION ====================
// Opens and closes the navigation menu on smaller screens.
// aria-expanded and aria-label are updated so assistive technologies
// know whether the menu is currently open or closed.
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            // toggle() adds the "active" class when it is missing
            // and removes it when it is already present.
            const isOpen = navLinks.classList.toggle("active");

            // Tell assistive technologies whether the menu is open.
            menuToggle.setAttribute("aria-expanded", String(isOpen));

            // Update the accessible label to match the current state.
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });

        // Close the mobile menu after the visitor chooses a navigation link.
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
    // This means the footer does not need to be manually updated every year.
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

    // ==================== MOBILE CONTACT FIX ====================
    // Loads the separate mobile stylesheet that prevents the contact section
    // and Google Maps embed from becoming wider than the phone screen.
    const mobileContactStyles = document.createElement("link");
    mobileContactStyles.rel = "stylesheet";
    mobileContactStyles.href = "mobile-contact-fix.css";
    document.head.appendChild(mobileContactStyles);
});
