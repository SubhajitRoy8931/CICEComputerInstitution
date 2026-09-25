// CICE gallery video controls.
// Pauses the homepage gallery video when it leaves the viewport or the tab becomes hidden.
document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".gallery-video video");
    if (!video) return;

    // Never allow an accidental autoplay attribute to keep the video running.
    video.autoplay = false;
    video.removeAttribute("autoplay");
    video.preload = "metadata";

    const pauseVideo = () => {
        if (!video.paused) video.pause();
    };

    // Pause when the browser tab is hidden or the window loses visibility.
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) pauseVideo();
    });

    window.addEventListener("pagehide", pauseVideo);

    // Pause when the video is mostly outside the viewport.
    const observer = new IntersectionObserver(
        entries => {
            const entry = entries[0];
            if (!entry || entry.intersectionRatio < 0.5) pauseVideo();
        },
        { threshold: [0, 0.5, 1] }
    );

    observer.observe(video);
});
