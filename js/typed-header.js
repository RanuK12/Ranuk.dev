/**
 * TypedHeader — Antigravity-style kinetic dynamic headline
 *
 * Implements the dynamic typing headline from https://antigravity.google/:
 *   - Smooth typing / backspacing with natural cadence jitter
 *   - Blinking terminal caret with accent color
 *   - Seamless multi-language support synced with window.i18n (ES/EN/IT)
 *   - Preserves HTML markup (like <em>keywords</em>) without broken tags
 *   - Respects prefers-reduced-motion: reduce
 *
 * Identity Ranuk: preserves existing copy as primary phrase, rotating with
 * core engineering pillars ("Decido con datos", "Automatizo con agentes", etc.)
 */
(function () {
    'use strict';

    var PHRASES_BY_LANG = {
        es: [
            { text: 'Decido con ', highlight: 'datos.' },
            { text: 'Automatizo con ', highlight: 'agentes.' },
            { text: 'Entreno modelos ', highlight: 'ML.' },
            { text: 'Construyo con ', highlight: 'código.' }
        ],
        en: [
            { text: 'I decide with ', highlight: 'data.' },
            { text: 'I automate with ', highlight: 'agents.' },
            { text: 'I train ', highlight: 'ML models.' },
            { text: 'I build with ', highlight: 'code.' }
        ],
        it: [
            { text: 'Decido con i ', highlight: 'dati.' },
            { text: 'Automatizzo con ', highlight: 'agenti.' },
            { text: 'Alleno modelli ', highlight: 'ML.' },
            { text: 'Costruisco con ', highlight: 'codice.' }
        ]
    };

    function TypedHeader(options) {
        options = options || {};
        this.targetSelector = options.targetSelector || '.headline-line.line-story';
        this.container = null;
        this.textSpan = null;
        this.caretSpan = null;
        this.currentLang = 'es';
        this.phrases = [];
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.timer = null;
        this.isRunning = false;

        this.typeSpeed = 75;
        this.deleteSpeed = 35;
        this.pauseEnd = 2400;
        this.pauseStart = 450;
    }

    TypedHeader.prototype.detectLang = function () {
        if (window.i18n && typeof window.i18n.currentLang === 'string') {
            return window.i18n.currentLang;
        }
        var docLang = document.documentElement.lang || 'es';
        if (docLang.indexOf('en') === 0) return 'en';
        if (docLang.indexOf('it') === 0) return 'it';
        return 'es';
    };

    TypedHeader.prototype.init = function () {
        this.container = document.querySelector(this.targetSelector);
        if (!this.container) return;

        // prefers-reduced-motion: dejamos el texto estático
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        this.currentLang = this.detectLang();
        this.phrases = PHRASES_BY_LANG[this.currentLang] || PHRASES_BY_LANG.es;

        this.setupDOM();

        // Escuchar cambios de idioma del i18n
        if (window.i18n && typeof window.i18n.onChange === 'function') {
            var self = this;
            window.i18n.onChange(function (newLang) {
                self.onLanguageChange(newLang);
            });
        }

        this.isRunning = true;
        this.tick();
    };

    TypedHeader.prototype.setupDOM = function () {
        // Limpiamos contenido previo manteniendo accesibilidad
        this.container.innerHTML = '';

        this.textSpan = document.createElement('span');
        this.textSpan.className = 'typed-dynamic-text';

        this.caretSpan = document.createElement('span');
        this.caretSpan.className = 'typed-dynamic-caret';
        this.caretSpan.setAttribute('aria-hidden', 'true');

        this.container.appendChild(this.textSpan);
        this.container.appendChild(this.caretSpan);
    };

    TypedHeader.prototype.onLanguageChange = function (newLang) {
        if (!PHRASES_BY_LANG[newLang]) return;
        this.currentLang = newLang;
        this.phrases = PHRASES_BY_LANG[newLang];
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        if (this.timer) clearTimeout(this.timer);
        this.renderText();
        this.tick();
    };

    TypedHeader.prototype.getCurrentFullString = function () {
        var current = this.phrases[this.phraseIndex] || this.phrases[0];
        return current.text + current.highlight;
    };

    TypedHeader.prototype.renderText = function () {
        if (!this.textSpan) return;

        var current = this.phrases[this.phraseIndex] || this.phrases[0];
        var prefix = current.text;
        var highlight = current.highlight;
        var full = prefix + highlight;

        var visibleText = full.substring(0, this.charIndex);

        if (visibleText.length <= prefix.length) {
            this.textSpan.textContent = visibleText;
        } else {
            var prefixPart = prefix;
            var highlightPart = visibleText.substring(prefix.length);
            this.textSpan.innerHTML = prefixPart + '<em>' + highlightPart + '</em>';
        }
    };

    TypedHeader.prototype.tick = function () {
        if (!this.isRunning) return;

        var fullString = this.getCurrentFullString();
        var delay = this.typeSpeed;

        if (this.isDeleting) {
            this.charIndex--;
            delay = this.deleteSpeed;

            if (this.charIndex <= 0) {
                this.isDeleting = false;
                this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
                delay = this.pauseStart;
            }
        } else {
            this.charIndex++;
            // Jitter sutil para simular cadencia humana/agente
            delay = this.typeSpeed + (Math.random() * 35 - 15);

            if (this.charIndex >= fullString.length) {
                this.isDeleting = true;
                delay = this.pauseEnd;
            }
        }

        this.renderText();

        var self = this;
        this.timer = setTimeout(function () {
            self.tick();
        }, delay);
    };

    TypedHeader.prototype.destroy = function () {
        this.isRunning = false;
        if (this.timer) clearTimeout(this.timer);
    };

    window.TypedHeader = TypedHeader;
})();
