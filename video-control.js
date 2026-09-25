// CICE gallery video controls.
// The homepage gallery video only plays while the visitor is actively viewing it.
document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".gallery-video video");

    // Keep the About CICE navigation label clean.
    // The arrow is intended for hero/action buttons, not the main navigation.
    document.querySelectorAll(".nav-links .nav-item-with-dropdown > a .hero-btn-arrow")
        .forEach(arrow => arrow.remove());

    if (!video) return;

    // Never allow accidental autoplay and avoid downloading the full video.
    video.autoplay = false;
    video.removeAttribute("autoplay");
    video.preload = "metadata";

    const pauseVideo = () => {
        if (!video.paused) video.pause();
    };

    // Pause immediately when the browser tab/page is hidden.
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) pauseVideo();
    });

    window.addEventListener("pagehide", pauseVideo);

    // Pause as soon as the video is no longer fully visible on screen.
    const checkVideoVisibility = () => {
        if (document.hidden) {
            pauseVideo();
            return;
        }

        const rect = video.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

        const fullyVisible =
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= viewportHeight &&
            rect.right <= viewportWidth;

        if (!fullyVisible) pauseVideo();
    };

    // Use the actual scroll position as the primary check. This is more reliable
    // than depending only on IntersectionObserver thresholds.
    let ticking = false;
    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkVideoVisibility();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkVideoVisibility, { passive: true });

    // Keep IntersectionObserver as a second layer for browsers and layout changes
    // that can alter visibility without a normal window scroll event.
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                if (!entry || entry.intersectionRatio < 0.99) pauseVideo();
            },
            { threshold: [0, 0.5, 0.99, 1] }
        );
        observer.observe(video);
    }

    // Run once after layout is ready.
    checkVideoVisibility();
});
