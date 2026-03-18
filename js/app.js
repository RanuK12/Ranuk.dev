/* =========================================================
   app.js — Main Application Orchestrator
   Initializes all modules and coordinates the portfolio.
   ========================================================= */

(function () {
    'use strict';

    // ---- Preloader ----
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => preloader.remove(), 500);
            }, 3200);
        }
    }

    // ---- Smooth scroll for anchor links ----
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const top = target.offsetTop - navHeight;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }

    // ---- Contact form handler ----
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('form-name')?.value.trim();
            const email = document.getElementById('form-email')?.value.trim();
            const message = document.getElementById('form-message')?.value.trim();

            if (!name || !email || !message) return;

            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            window.location.href = `mailto:ranucoliemilio@gmail.com?subject=${subject}&body=${body}`;

            form.reset();
        });
    }

    // ---- Initialize everything on DOM ready ----
    function init() {
        hidePreloader();

        // i18n
        if (window.i18n) {
            window.i18n.init();
        }

        // Particles background
        if (window.particleNetwork) {
            window.particleNetwork.init();
        }

        // Typed text effect
        const typeWriter = new TypeWriter('typed-text');
        const typedStrings = window.i18n ? window.i18n.getTypedStrings() : [
            'Systems Engineer',
            'Data Scientist',
            'Python Developer',
            'Machine Learning Engineer'
        ];
        typeWriter.start(typedStrings);

        // Restart typed effect on language change
        if (window.i18n) {
            window.i18n.onChange(() => {
                typeWriter.restart(window.i18n.getTypedStrings());
            });
        }

        // Scroll animations
        const scrollAnimator = new ScrollAnimator();
        scrollAnimator.init();

        // Stat counters
        const statCounter = new StatCounter();
        statCounter.init();

        // Navigation
        const navController = new NavController();
        navController.init();

        // Custom cursor
        const cursorEffect = new CursorEffect();
        cursorEffect.init();

        // Project filter
        const projectFilter = new ProjectFilter();
        projectFilter.init();

        // ML Playground
        if (window.mlPlayground) {
            window.mlPlayground.init();
        }

        // Smooth scroll
        initSmoothScroll();

        // Contact form
        initContactForm();

        // Make all project cards visible initially
        setTimeout(() => {
            document.querySelectorAll('.project-card').forEach(card => {
                card.classList.add('visible');
            });
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
