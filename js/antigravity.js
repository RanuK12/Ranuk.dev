/* =========================================================
   antigravity.js — Google Antigravity Inspired Effects
   Scroll-driven progressive card expansion, weightless floating
   tabs, audio waveform visualizer and dropdown orchestration.
   ========================================================= */

(function () {
  'use strict';

  // 1. Scroll-driven Progressive Scaling (Antigravity Expand)
  function initScrollExpansion() {
    const targets = document.querySelectorAll('.antigravity-scroll-scale, .open-lab .container');
    if (!targets.length) return;

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      targets.forEach(target => {
        window.gsap.fromTo(target,
          {
            scale: 0.92,
            rotateX: 3,
            opacity: 0.85,
            transformPerspective: 1200
          },
          {
            scale: 1,
            rotateX: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 0.8,
              onEnter: () => target.classList.add('is-expanded'),
              onLeaveBack: () => target.classList.remove('is-expanded')
            }
          }
        );
      });
    } else {
      // IntersectionObserver fallback
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-expanded');
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('is-expanded');
          }
        });
      }, { threshold: 0.25 });

      targets.forEach(t => observer.observe(t));
    }
  }

  // 2. Interactive Expanding Tabs System
  function initAntigravityTabs() {
    const tabBtns = document.querySelectorAll('.ag-tab-btn');
    const tabPanes = document.querySelectorAll('.ag-tab-pane');
    if (!tabBtns.length || !tabPanes.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetId = this.getAttribute('data-tab');
        if (!targetId) return;

        // Toggle Buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Toggle Panes with transition
        tabPanes.forEach(pane => {
          if (pane.id === targetId) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });

    // Waveform Animation for Voice Closer preview
    const waveBars = document.querySelectorAll('.ag-wave-bar');
    if (waveBars.length) {
      setInterval(() => {
        waveBars.forEach((bar, idx) => {
          const rand = Math.floor(Math.random() * 85) + 15;
          bar.style.height = `${rand}%`;
          bar.style.transition = `height ${0.2 + (idx % 3) * 0.1}s ease`;
        });
      }, 250);
    }
  }

  // 3. Navbar Ranuk IT Mega-Pill Dropdown Controller
  function initNavbarDropdown() {
    const dropdownItem = document.querySelector('.nav-dropdown-item');
    const caretBtn = document.querySelector('.nav-caret-btn');
    if (!dropdownItem) return;

    if (caretBtn) {
      caretBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdownItem.classList.toggle('is-open');
        caretBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('is-open');
        if (caretBtn) caretBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdownItem.classList.remove('is-open');
        if (caretBtn) caretBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. Spotlight Card Hover Effect for Repos & Showcase
  function initSpotlightCards() {
    document.addEventListener('mousemove', function (e) {
      const cards = document.querySelectorAll('.lab-repo-card, .ag-viewport');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        }
      });
    });
  }

  // Orchestrator initialization
  function init() {
    initScrollExpansion();
    initAntigravityTabs();
    initNavbarDropdown();
    initSpotlightCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
