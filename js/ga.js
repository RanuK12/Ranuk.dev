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
    };
  }

  // Defer: load after page is fully painted
  if (document.readyState === 'complete') {
    loadGtag();
  } else {
    window.addEventListener('load', loadGtag);
  }
})();
