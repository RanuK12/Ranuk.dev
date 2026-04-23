/* =========================================================
   ga.js — Google Analytics initialization
   Separated from HTML to enable stricter CSP without 'unsafe-inline'
   ========================================================= */

(function() {
  'use strict';
  if (typeof window.gtag === 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
  }
  window.gtag('js', new Date());
  window.gtag('config', 'G-QQ12Q4Z375', {
    'anonymize_ip': true,
    'cookie_flags': 'samesite=strict;secure'
  });
})();
