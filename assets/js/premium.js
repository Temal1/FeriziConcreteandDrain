/* ==========================================================================
   PREMIUM ENHANCEMENTS (progressive)
   - Scroll-reveal animations via IntersectionObserver
   - Native lazy-loading + async decoding for images
   Purely additive: if this script fails, the site stays fully usable.
   Does not touch the custom navigation.
   ========================================================================== */
(function () {
    "use strict";

    var prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var pageStart = Date.now();

    /* ---- Premium preloader: hide once the page has loaded ---- */
    function setupPreloader() {
        var pre = document.getElementById("sitePreloader");
        if (!pre) return;

        var hidden = false;
        var MIN_VISIBLE = 500; // brief, intentional premium beat

        function hide() {
            if (hidden) return;
            hidden = true;
            pre.classList.add("preloader-hidden");
            setTimeout(function () {
                if (pre && pre.parentNode) pre.parentNode.removeChild(pre);
            }, 700);
        }

        function done() {
            var wait = Math.max(0, MIN_VISIBLE - (Date.now() - pageStart));
            setTimeout(hide, wait);
        }

        if (document.readyState === "complete") {
            done();
        } else {
            window.addEventListener("load", done);
        }

        /* Safety net: never trap the user behind the loader */
        setTimeout(hide, 6000);
    }

    /* ---- Lazy-load images (skip logo / eager hero slides) ---- */
    function enhanceImages() {
        var imgs = document.querySelectorAll(
            ".all-content img, .modal img"
        );
        imgs.forEach(function (img) {
            if (img.closest(".header") || img.closest(".slide")) return;
            if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
            if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
        });
    }

    /* ---- Scroll reveal ---- */
    function setupReveal() {
        var singles = document.querySelectorAll(
            ".mainDiv-recent-projectH1," +
            ".little-aboutUs .div-span," +
            ".link-aboutUS," +
            ".company-intro," +
            ".services-overview > h2," +
            ".why-choose-us > h2," +
            ".title-jobs-maindiv," +
            ".AboutUs-H1"
        );

        var groups = document.querySelectorAll(
            ".recentProject-content," +
            ".card-whoweare," +
            ".stats-container," +
            ".services-grid," +
            ".reasons-grid," +
            ".jobs-container-card"
        );

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            return; // leave content in its natural, fully-visible state
        }

        singles.forEach(function (el) { el.classList.add("pre-reveal"); });
        groups.forEach(function (el) { el.classList.add("reveal-stagger"); });

        var observer = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-in");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );

        singles.forEach(function (el) { observer.observe(el); });
        groups.forEach(function (el) { observer.observe(el); });
    }

    function init() {
        setupPreloader();
        enhanceImages();
        setupReveal();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
