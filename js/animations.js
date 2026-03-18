/* =========================================================
   animations.js — Scroll Animations, Typing Effect, Counters
   ========================================================= */

class TypeWriter {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.strings = [];
        this.currentString = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.isRunning = false;
        this.typeSpeed = 80;
        this.deleteSpeed = 40;
        this.pauseTime = 2000;
    }

    start(strings) {
        if (!this.element || !strings || strings.length === 0) return;
        this.strings = strings;
        this.isRunning = true;
        this.type();
    }

    stop() {
        this.isRunning = false;
    }

    restart(strings) {
        this.stop();
        this.currentString = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        if (this.element) this.element.textContent = '';
        this.start(strings);
    }

    type() {
        if (!this.isRunning) return;

        const current = this.strings[this.currentString];
        let delay;

        if (this.isDeleting) {
            this.element.textContent = current.substring(0, this.currentChar - 1);
            this.currentChar--;
            delay = this.deleteSpeed;

            if (this.currentChar === 0) {
                this.isDeleting = false;
                this.currentString = (this.currentString + 1) % this.strings.length;
                delay = 400;
            }
        } else {
            this.element.textContent = current.substring(0, this.currentChar + 1);
            this.currentChar++;
            delay = this.typeSpeed + Math.random() * 40;

            if (this.currentChar === current.length) {
                this.isDeleting = true;
                delay = this.pauseTime;
            }
        }

        setTimeout(() => this.type(), delay);
    }
}


class ScrollAnimator {
    constructor() {
        this.observer = null;
        this.skillsAnimated = false;
    }

    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    if (el.classList.contains('timeline-item') ||
                        el.classList.contains('project-card') ||
                        el.classList.contains('cert-card')) {
                        el.classList.add('visible');
                    }

                    if (el.classList.contains('skill-category') && !this.skillsAnimated) {
                        this.animateSkillBars();
                        this.skillsAnimated = true;
                    }

                    if (el.classList.contains('reveal-element')) {
                        el.classList.add('visible');
                    }
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    observeElements() {
        const selectors = [
            '.timeline-item',
            '.project-card',
            '.cert-card',
            '.skill-category',
            '.reveal-element',
            '.ranuk-project-card',
            '.value-card'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                this.observer.observe(el);
            });
        });
    }

    animateSkillBars() {
        document.querySelectorAll('.progress-fill').forEach((bar, index) => {
            const width = bar.dataset.width;
            setTimeout(() => {
                bar.style.setProperty('--target-width', width + '%');
                bar.classList.add('animated');
            }, index * 80);
        });
    }
}


class StatCounter {
    constructor() {
        this.animated = false;
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) observer.observe(statsSection);
    }

    animateCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.dataset.target);
            if (isNaN(target)) return;

            const duration = 2000;
            const start = performance.now();

            const update = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };

            requestAnimationFrame(update);
        });
    }
}


class NavController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.toggle = document.querySelector('.nav-toggle');
        this.menu = document.querySelector('.nav-menu');
        this.links = document.querySelectorAll('.nav-link');
        this.sections = [];
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => this.onScroll());

        if (this.toggle && this.menu) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }

        this.links.forEach(link => {
            link.addEventListener('click', () => {
                if (this.menu) this.menu.classList.remove('open');
                if (this.toggle) this.toggle.classList.remove('active');
            });
        });

        this.sections = Array.from(document.querySelectorAll('.section, .hero'));
        this.onScroll();
    }

    onScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        this.highlightActiveLink(scrollY);
    }

    highlightActiveLink(scrollY) {
        let current = '';
        this.sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        this.links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    toggleMenu() {
        this.menu.classList.toggle('open');
        this.toggle.classList.toggle('active');
    }
}


class CursorEffect {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.isTouch = 'ontouchstart' in window;
    }

    init() {
        if (this.isTouch || !this.cursor || !this.follower) return;

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 4 + 'px';
            this.cursor.style.top = e.clientY - 4 + 'px';
            this.follower.style.left = e.clientX + 'px';
            this.follower.style.top = e.clientY + 'px';
        });

        const hoverTargets = 'a, button, .project-card, .cert-card, input, textarea, .filter-btn, .class-btn';
        document.querySelectorAll(hoverTargets).forEach(el => {
            el.addEventListener('mouseenter', () => this.follower.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.follower.classList.remove('hover'));
        });
    }
}


class ProjectFilter {
    constructor() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.cards = document.querySelectorAll('.project-card');
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                this.buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.cards.forEach(card => {
                    const categories = card.dataset.category || '';
                    if (filter === 'all' || categories.includes(filter)) {
                        card.classList.remove('hidden');
                        card.classList.add('visible');
                    } else {
                        card.classList.add('hidden');
                        card.classList.remove('visible');
                    }
                });
            });
        });
    }
}

window.TypeWriter = TypeWriter;
window.ScrollAnimator = ScrollAnimator;
window.StatCounter = StatCounter;
window.NavController = NavController;
window.CursorEffect = CursorEffect;
window.ProjectFilter = ProjectFilter;
