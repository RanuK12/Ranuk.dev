/* =========================================================
   antigravity.js — Google Antigravity Inspired Effects
   Scroll-driven progressive card expansion, weightless floating
   tabs, audio waveform visualizer and dropdown orchestration.
   ========================================================= */

(function () {
  'use strict';

  // 1. Scroll-driven Progressive Scaling & Entrance Reveals
  function initScrollExpansion() {
    const targets = document.querySelectorAll('.antigravity-scroll-scale, .open-lab .container');
    if (targets.length) {
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        targets.forEach(target => {
          window.gsap.fromTo(target,
            {
              scale: 0.94,
              rotateX: 2,
              opacity: 0.88,
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
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-expanded');
            } else if (entry.boundingClientRect.top > 0) {
              entry.target.classList.remove('is-expanded');
            }
          });
        }, { threshold: 0.2 });

        targets.forEach(t => observer.observe(t));
      }
    }

    // Universal Staggered Scroll Reveal for Cards & Sections
    const revealElements = document.querySelectorAll('.scroll-reveal, .story-act, .radar-card, .project-card, .eco-card, .lab-panel, .voice-card');
    if (revealElements.length) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach((el, idx) => {
        el.classList.add('scroll-reveal');
        el.style.setProperty('--reveal-delay', `${(idx % 4) * 0.1}s`);
        revealObserver.observe(el);
      });
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
    if (!dropdownItem) return;

    const caretBtn = dropdownItem.querySelector('.nav-caret-btn');
    const ranukRow = dropdownItem.querySelector('.nav-ranuk-row');
    const dropdownPanel = dropdownItem.querySelector('.nav-dropdown-panel');

    let closeTimer = null;
    let isPinned = false;

    function openDropdown() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      dropdownItem.classList.add('is-open');
      if (caretBtn) caretBtn.setAttribute('aria-expanded', 'true');
    }

    function scheduleClose(delay = 350) {
      if (isPinned) return; // Keep static if user pinned it open
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        if (!isPinned) {
          dropdownItem.classList.remove('is-open');
          if (caretBtn) caretBtn.setAttribute('aria-expanded', 'false');
        }
      }, delay);
    }

    function togglePinned() {
      isPinned = !isPinned;
      if (isPinned) {
        if (closeTimer) clearTimeout(closeTimer);
        openDropdown();
      } else {
        dropdownItem.classList.remove('is-open');
        if (caretBtn) caretBtn.setAttribute('aria-expanded', 'false');
      }
    }

    // Hover listeners with grace period — ensures menu NEVER vanishes when moving cursor
    dropdownItem.addEventListener('mouseenter', () => {
      openDropdown();
    });

    dropdownItem.addEventListener('mouseleave', () => {
      scheduleClose(350);
    });

    if (dropdownPanel) {
      dropdownPanel.addEventListener('mouseenter', () => {
        openDropdown();
      });
      dropdownPanel.addEventListener('mouseleave', () => {
        scheduleClose(350);
      });
    }

    // Caret button pins/toggles static dropdown
    if (caretBtn) {
      caretBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        togglePinned();
      });
    }

    // Close when clicking any link inside dropdown so destination opens cleanly
    if (dropdownPanel) {
      dropdownPanel.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          isPinned = false;
          if (closeTimer) clearTimeout(closeTimer);
          dropdownItem.classList.remove('is-open');
          if (caretBtn) caretBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!dropdownItem.contains(e.target)) {
        isPinned = false;
        if (closeTimer) clearTimeout(closeTimer);
        dropdownItem.classList.remove('is-open');
        if (caretBtn) caretBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        isPinned = false;
        if (closeTimer) clearTimeout(closeTimer);
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
