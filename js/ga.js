/* =========================================================
   ga.js — Google Analytics deferred initialization
   Loads gtag.js dynamically after page onload (non-blocking).
   Removed from HTML <head> to avoid render-blocking.
   ========================================================= */

(function() {
  'use strict';

  function loadGtag() {
    // Avoid double-load
    if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;

    var gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-QQ12Q4Z375';
    gtagScript.async = true;
    gtagScript.crossOrigin = 'anonymous';
    gtagScript.integrity = 'sha384-mufsqkbiiYPCgyPW4oxZWM2ZZKL9m8btW+vH4VHVqVEG4dQ0WKFOarkgbSmYPeJX';
    document.head.appendChild(gtagScript);

    gtagScript.onload = function() {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', 'G-QQ12Q4Z375', {
        'anonymize_ip': true,
        'cookie_flags': 'samesite=strict;secure'
      });
      initConversionTracking();
    };
  }

  function initConversionTracking() {
    var send = function(name, params) {
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    };

    document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
      link.addEventListener('click', function() { send('generate_lead', { method: 'email', link_url: link.href }); });
    });
    document.querySelectorAll('a[href*="cal.com"], a[href*="calendly"]').forEach(function(link) {
      link.addEventListener('click', function() { send('schedule_call', { link_url: link.href }); });
    });
    document.querySelectorAll('a[href*="github.com"], a[href*="linkedin.com"]').forEach(function(link) {
      link.addEventListener('click', function() { send('select_content', { content_type: 'professional_profile', link_url: link.href }); });
    });
    document.querySelectorAll('a[href*="landing-factory"], a[href*="notarobot"], a[href*="bahaydesign"]').forEach(function(link) {
      link.addEventListener('click', function() { send('view_demo', { link_url: link.href }); });
    });
    document.querySelectorAll('form').forEach(function(form) {
      form.addEventListener('submit', function() { send('generate_lead', { method: 'contact_form', form_id: form.id || form.name || 'form' }); });
    });
  }

  // Defer: load after page is fully painted
  if (document.readyState === 'complete') {
    loadGtag();
  } else {
    window.addEventListener('load', loadGtag);
  }
})();
