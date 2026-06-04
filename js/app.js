/* =========================================================
   app.js — Main Application Orchestrator
   Initializes all modules and coordinates the portfolio.
   ========================================================= */

(function () {
    'use strict';

    // ---- Preloader ----
    // Antes: 3.2s artificiales. Ahora: oculta apenas window.load + min visual de
    // 400ms para que la animación de las líneas alcance a verse en conexiones
    // rápidas. Si reduce-motion está activo, oculta inmediato.
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const minDelay = reduceMotion ? 0 : 400;
        const start = performance.now();
        const finish = () => {
            const elapsed = performance.now() - start;
            const wait = Math.max(0, minDelay - elapsed);
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => preloader.remove(), 500);
            }, wait);
        };
        if (document.readyState === 'complete') finish();
        else window.addEventListener('load', finish, { once: true });
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

    // ---- Contact form handler (FormSubmit.co) ----
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const btnOriginalHTML = submitBtn?.innerHTML;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';
            }

            try {
                const data = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data
                });

                if (response.ok) {
                    form.innerHTML = `
                        <div class="form-success">
                            <i class="fas fa-check-circle"></i>
                            <h3>¡Mensaje enviado!</h3>
                            <p>Te respondo personalmente en menos de 24h.</p>
                        </div>`;
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (err) {
                // Fallback: mailto
                const name = form.querySelector('#form-name')?.value || '';
                const email = form.querySelector('#form-email')?.value || '';
                const message = form.querySelector('#form-message')?.value || '';
                const subjectKey = form.querySelector('#form-subject')?.value || 'other';
                const SUBJECTS = {
                    project: 'Nuevo proyecto', ranuk: 'Consulta — Ranuk IT',
                    ada: 'Auditoría ADA / WCAG', team: 'Quiero unirme al equipo',
                    book: 'Pedido de copia firmada', other: 'Contacto desde ranuk.dev'
                };
                const subject = encodeURIComponent(`[${SUBJECTS[subjectKey] || SUBJECTS.other}] · ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                const encodedEmail = atob('cmFudWNvbGllbWlsaW9AZ21haWwuY29t');
                window.location.href = `mailto:${encodedEmail}?subject=${subject}&body=${body}`;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = btnOriginalHTML;
                }
            }
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

        // Typed text effect (disabled — element #typed-text not present in current design)

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

        // Story carousel
        initStoryCarousel();
    }

    // ---- Story Carousel (3 photos) ----
    function initStoryCarousel() {
        const track = document.querySelector('.story-photo-track');
        const dots = document.querySelectorAll('.story-dot');
        const slides = document.querySelectorAll('.story-photo-slide');
        if (!track || !dots.length) return;

        let current = 0;
        const total = slides.length;
        let autoInterval = null;

        function goTo(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            current = index;

            track.style.transform = `translateX(-${current * 100}%)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === current);
            });

            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === current);
            });

            // Update progress bar if exists
            const progressBar = document.querySelector('.story-carousel-progress-bar');
            if (progressBar) {
                progressBar.style.transform = `translateX(${current * 100}%)`;
            }
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoInterval = setInterval(() => goTo(current + 1), 4000);
        }

        function stopAutoPlay() {
            if (autoInterval) {
                clearInterval(autoInterval);
                autoInterval = null;
            }
        }

        // Click dots
        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.dataset.slide);
                goTo(slideIndex);
                startAutoPlay(); // restart timer
            });
        });

        // Pause on hover
        const carousel = document.querySelector('.story-photo-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        if (carousel) {
            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoPlay();
            }, { passive: true });

            carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) goTo(current + 1);
                    else goTo(current - 1);
                }
                startAutoPlay();
            }, { passive: true });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!carousel || !carousel.contains(document.activeElement) && !document.activeElement?.closest?.('.story-photo-carousel')) return;
            if (e.key === 'ArrowLeft') { goTo(current - 1); startAutoPlay(); }
            if (e.key === 'ArrowRight') { goTo(current + 1); startAutoPlay(); }
        });

        // Init first slide
        goTo(0);

        // Start autoplay when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) startAutoPlay();
                else stopAutoPlay();
            });
        }, { threshold: 0.3 });

        if (carousel) observer.observe(carousel);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
