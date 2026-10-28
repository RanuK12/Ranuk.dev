/**
 * CursorEffect — Custom cursor con GSAP quickTo
 *
 * Portado de la arquitectura de Antigravity (CustomCursor.svelte):
 *   - gsap.quickTo() para interpolación a 60fps sin layout thrashing
 *   - easing "power2.out" en el punto, "back.out(1.7)" en el anillo al hacer hover
 *   - guarda (hover: hover) and (pointer: fine) — nunca se activa en táctil
 *   - respeta prefers-reduced-motion
 *
 * Identidad Ranuk preservada: punto accent sólido + anillo accent, sin cambios de color.
 * Fallback: si GSAP no está disponible, degrada al cursor nativo (no rompe nada).
 */
(function () {
    'use strict';

    var HOVER_TARGETS = [
        'a', 'button', 'input', 'textarea', 'select',
        '.project-card', '.cert-card', '.filter-btn', '.class-btn',
        '.btn', '.contact-btn-wide', '.contact-link', '.lang-btn',
        '.nav-link', '.nav-toggle', '.scroll-indicator',
        '[role="button"]', '[data-cursor-hover]'
    ].join(',');

    function CursorEffect() {
        this.cursor = document.querySelector('.custom-cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.enabled = false;
        this.quickDotX = null;
        this.quickDotY = null;
        this.quickRingX = null;
        this.quickRingY = null;
        this._boundMove = null;
        this._boundLeave = null;
    }

    /**
     * Determina si el cursor custom debe activarse.
     * Misma lógica que Antigravity: puntero fino + hover real + sin reduced-motion.
     */
    CursorEffect.prototype.shouldEnable = function () {
        if (!this.cursor || !this.follower) return false;
        if (typeof window.matchMedia !== 'function') return false;

        var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        return finePointer && !reducedMotion;
    };

    CursorEffect.prototype.init = function () {
        if (!this.shouldEnable()) {
            // Aseguramos que el cursor nativo quede visible si algo lo ocultó.
            document.documentElement.classList.remove('has-custom-cursor');
            return;
        }

        // GSAP es obligatorio para la interpolación suave. Sin él, cursor nativo.
        if (typeof window.gsap === 'undefined' || typeof window.gsap.quickTo !== 'function') {
            document.documentElement.classList.remove('has-custom-cursor');
            return;
        }

        this.enabled = true;
        document.documentElement.classList.add('has-custom-cursor');

        var gsap = window.gsap;

        // quickTo crea un setter optimizado que reutiliza el mismo tween.
        // Evita crear un tween nuevo por cada mousemove (lo que hacía la versión anterior).
        this.quickDotX = gsap.quickTo(this.cursor, 'x', { duration: 0.12, ease: 'power2.out' });
        this.quickDotY = gsap.quickTo(this.cursor, 'y', { duration: 0.12, ease: 'power2.out' });
        this.quickRingX = gsap.quickTo(this.follower, 'x', { duration: 0.35, ease: 'power2.out' });
        this.quickRingY = gsap.quickTo(this.follower, 'y', { duration: 0.35, ease: 'power2.out' });

        // Centrado inicial vía transform, no vía left/top (evita reflow).
        gsap.set([this.cursor, this.follower], { xPercent: -50, yPercent: -50 });

        this._boundMove = this.onMouseMove.bind(this);
        this._boundLeave = this.onMouseLeave.bind(this);

        document.addEventListener('mousemove', this._boundMove, { passive: true });
        document.addEventListener('mouseleave', this._boundLeave);

        this.bindHoverTargets();
    };

    CursorEffect.prototype.onMouseMove = function (e) {
        if (!this.enabled) return;

        if (!this.cursor.classList.contains('cursor-visible')) {
            this.cursor.classList.add('cursor-visible');
            this.follower.classList.add('cursor-visible');
        }

        this.quickDotX(e.clientX);
        this.quickDotY(e.clientY);
        this.quickRingX(e.clientX);
        this.quickRingY(e.clientY);
    };

    CursorEffect.prototype.onMouseLeave = function () {
        this.cursor.classList.remove('cursor-visible');
        this.follower.classList.remove('cursor-visible');
    };

    /**
     * Escala el anillo al entrar en un target interactivo.
     * Usa back.out(1.7) como Antigravity: rebote sutil, no lineal.
     */
    CursorEffect.prototype.bindHoverTargets = function () {
        var self = this;
        var gsap = window.gsap;

        var enter = function () {
            self.follower.classList.add('hover');
            gsap.to(self.follower, {
                scale: 1.6,
                duration: 0.3,
                ease: 'back.out(1.7)',
                overwrite: 'auto'
            });
            gsap.to(self.cursor, {
                scale: 0.5,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        };

        var leave = function () {
            self.follower.classList.remove('hover');
            gsap.to(self.follower, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto'
            });
            gsap.to(self.cursor, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        };

        // Delegación de eventos: cubre elementos añadidos dinámicamente
        // (filtros de proyecto, feed de GitHub, i18n) sin re-binding.
        document.addEventListener('mouseover', function (e) {
            if (e.target.closest && e.target.closest(HOVER_TARGETS)) enter();
        }, { passive: true });

        document.addEventListener('mouseout', function (e) {
            if (e.target.closest && e.target.closest(HOVER_TARGETS)) leave();
        }, { passive: true });
    };

    CursorEffect.prototype.destroy = function () {
        if (this._boundMove) document.removeEventListener('mousemove', this._boundMove);
        if (this._boundLeave) document.removeEventListener('mouseleave', this._boundLeave);
        this.enabled = false;
        document.documentElement.classList.remove('has-custom-cursor');
    };

    window.CursorEffect = CursorEffect;
})();
