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
            const subjectKey = document.getElementById('form-subject')?.value || 'other';

            if (!name || !email || !message) return;

            const SUBJECTS = {
                project: 'Nuevo proyecto',
                ranuk:   'Consulta — Ranuk IT',
                ada:     'Auditoría ADA / WCAG',
                team:    'Quiero unirme al equipo',
                book:    'Pedido de copia firmada',
                other:   'Contacto desde ranuk.dev'
            };
            const subjectText = SUBJECTS[subjectKey] || SUBJECTS.other;
            const subject = encodeURIComponent(`[${subjectText}] · ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            // Email encoded in base64 to prevent scraping
    const encodedEmail = atob('cmFudWNvbGllbWlsaW9AZ21haWwuY29t');
    window.location.href = `mailto:${encodedEmail}?subject=${subject}&body=${body}`;

            form.reset();
        });
    }

    // ---- Story thread: animar el hilo de oro vertical con scroll ----
    // Usa GSAP/ScrollTrigger si están disponibles; fallback a IntersectionObserver
    // para que la sección no se vea "rota" si el CDN falla.
    function initStoryThread() {
        const path = document.querySelector('.story-thread path');
        const timeline = document.querySelector('.story-timeline');
        if (!path || !timeline) return;

        if (window.gsap && window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
            gsap.fromTo(path,
                { strokeDashoffset: 1 },
                {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: timeline,
                        start: 'top 80%',
                        end: 'bottom 60%',
                        scrub: 0.6
                    }
                }
            );

            // Knots aparecen al llegar
            document.querySelectorAll('.story-knot').forEach(knot => {
                gsap.fromTo(knot,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
                        scrollTrigger: { trigger: knot, start: 'top 75%' }
                    }
                );
            });
        } else {
            // Fallback: dibujar el hilo de a poco según scroll progress
            const onScroll = () => {
                const rect = timeline.getBoundingClientRect();
                const vh = window.innerHeight;
                const progress = Math.max(0, Math.min(1,
                    (vh * 0.8 - rect.top) / (rect.height + vh * 0.2)
                ));
                path.style.strokeDashoffset = String(1 - progress);
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }
    }

    // ---- Easter eggs: console signature + Konami code ----
    function initEasterEggs() {
        const css = [
            'color:#D4A574',
            'font-family:Fraunces,serif',
            'font-size:14px',
            'font-style:italic',
            'line-height:1.5'
        ].join(';');
        const sig = [
            '%c"Y así voy tejiendo mi camino."',
            '',
            '   — Emilio Ranucoli',
            '   ranuk.dev · github.com/RanuK12',
            '',
            '   ¿Buscás trabajo en sistemas/data/design?',
            '   → ranucoliemilio@gmail.com'
        ].join('\n');
        try { console.log(sig, css); } catch (_) {}

        // Konami: ↑ ↑ ↓ ↓ ← → ← → B A
        const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
        let idx = 0;
        window.addEventListener('keydown', (e) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            if (key === seq[idx]) {
                idx++;
                if (idx === seq.length) {
                    idx = 0;
                    document.body.style.transition = 'filter 0.6s ease';
                    document.body.style.filter = 'hue-rotate(45deg) saturate(1.4)';
                    const toast = document.createElement('div');
                    toast.textContent = '✶ Konami activado — el telar cambia de color ✶';
                    Object.assign(toast.style, {
                        position: 'fixed', bottom: '2rem', left: '50%',
                        transform: 'translateX(-50%)', padding: '0.75rem 1.25rem',
                        background: '#0a192f', border: '1px solid #D4A574',
                        color: '#D4A574', fontFamily: 'Fira Code, monospace',
                        fontSize: '0.85rem', zIndex: 99999, borderRadius: '4px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                    });
                    document.body.appendChild(toast);
                    setTimeout(() => {
                        document.body.style.filter = '';
                        toast.remove();
                    }, 4000);
                }
            } else {
                idx = (key === seq[0]) ? 1 : 0;
            }
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

        // Story thread (El Tejido)
        initStoryThread();

        // Smooth scroll
        initSmoothScroll();

        // Contact form
        initContactForm();

        // Easter eggs
        initEasterEggs();

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
