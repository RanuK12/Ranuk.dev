/**
 * ranuk-analytics.js — Telemetría de Tráfico, Procedencia y Conversión
 * © 2026 Ranuk IT Solutions (ranuk.dev)
 * 
 * Registra:
 * - Visitas y usuarios únicos por landing (/ , /closer/, /arena/, /debates/, /portfolio/, /ranuk-it/)
 * - Procedencia / Referrer (Google, X/Twitter, Reddit, LinkedIn, Directo, Campañas UTM)
 * - Eventos de alto interés (Reproducción de audios 24kHz, uso del simulador, clics en Stripe/Cal.com)
 * - Reporte estructurado para Google Analytics 4 (G-QQ12Q4Z375) y dashboard local (window.__ranukTrafficReport())
 */

(function() {
  'use strict';

  // 1. Identificador de sesión y visitante (respetando privacidad)
  var STORAGE_KEY = 'ranuk_traffic_v1';
  var SESSION_KEY = 'ranuk_session_id';

  function generateId() {
    return 'rk_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
  }

  var sessionId = sessionStorage.getItem(SESSION_KEY);
  var isNewSession = false;
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
    isNewSession = true;
  }

  // 2. Detección de procedencia (Referrer & UTMs)
  function getTrafficSource() {
    var ref = document.referrer.toLowerCase();
    var params = new URLSearchParams(window.location.search);
    var utmSource = params.get('utm_source');
    var utmMedium = params.get('utm_medium');
    var utmCampaign = params.get('utm_campaign');

    if (utmSource) {
      return {
        category: 'campaign',
        source: utmSource,
        medium: utmMedium || 'unknown',
        campaign: utmCampaign || 'none'
      };
    }

    if (!ref) {
      return { category: 'direct', source: 'Direct / Bookmark', medium: 'none' };
    }
    if (ref.indexOf('t.co') !== -1 || ref.indexOf('twitter.com') !== -1 || ref.indexOf('x.com') !== -1) {
      return { category: 'social', source: 'X / Twitter', medium: 'social' };
    }
    if (ref.indexOf('reddit.com') !== -1 || ref.indexOf('redd.it') !== -1) {
      return { category: 'social', source: 'Reddit', medium: 'social' };
    }
    if (ref.indexOf('linkedin.com') !== -1 || ref.indexOf('lnkd.in') !== -1) {
      return { category: 'social', source: 'LinkedIn', medium: 'social' };
    }
    if (ref.indexOf('google.') !== -1) {
      return { category: 'search', source: 'Google', medium: 'organic' };
    }
    if (ref.indexOf('bing.') !== -1 || ref.indexOf('duckduckgo.') !== -1 || ref.indexOf('yahoo.') !== -1) {
      return { category: 'search', source: 'Search Engine', medium: 'organic' };
    }
    if (ref.indexOf('github.com') !== -1) {
      return { category: 'referral', source: 'GitHub', medium: 'referral' };
    }
    if (ref.indexOf('ranuk.dev') !== -1) {
      return { category: 'internal', source: 'Internal Navigation', medium: 'site' };
    }

    try {
      var urlObj = new URL(ref);
      return { category: 'referral', source: urlObj.hostname, medium: 'referral' };
    } catch(e) {
      return { category: 'unknown', source: ref, medium: 'unknown' };
    }
  }

  var trafficSource = getTrafficSource();
  var currentPath = window.location.pathname || '/';

  // 3. Almacenamiento local consolidado
  function recordLocalEvent(eventType, eventData) {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var store = raw ? JSON.parse(raw) : {
        firstSeen: new Date().toISOString(),
        totalVisits: 0,
        pages: {},
        sources: {},
        events: []
      };

      if (isNewSession && eventType === 'page_view') {
        store.totalVisits = (store.totalVisits || 0) + 1;
        store.sources[trafficSource.source] = (store.sources[trafficSource.source] || 0) + 1;
      }

      if (eventType === 'page_view') {
        store.pages[currentPath] = (store.pages[currentPath] || 0) + 1;
      }

      store.events.push({
        t: Date.now(),
        path: currentPath,
        type: eventType,
        source: trafficSource.source,
        data: eventData || {}
      });

      // Mantener los últimos 300 eventos para no sobrecargar el storage
      if (store.events.length > 300) {
        store.events = store.events.slice(-300);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch(e) {}
  }

  // 4. Emisión a Google Analytics 4 (GA4)
  function sendToGA(eventName, params) {
    params = params || {};
    params.traffic_source = trafficSource.source;
    params.traffic_category = trafficSource.category;
    params.page_path = currentPath;
    params.session_id = sessionId;

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        event_params: params
      });
    }
  }

  // 5. Registro de la visita inicial
  recordLocalEvent('page_view', {
    title: document.title,
    referrer: document.referrer,
    screen: window.innerWidth + 'x' + window.innerHeight
  });

  sendToGA('page_view', {
    page_title: document.title,
    page_location: window.location.href
  });

  // 6. Monitoreo de Eventos de Interés (Audios, Simulador, Precios, Clics)
  function attachEngagementListeners() {
    // A. Detección de reproducción de audios (24kHz)
    document.querySelectorAll('.play-btn, [data-audio-trigger]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var card = btn.closest('.challenger-card, .voice-card') || btn.parentElement;
        var nameEl = card ? card.querySelector('h3') : null;
        var audioName = nameEl ? nameEl.innerText.trim() : 'unknown_voice';
        
        recordLocalEvent('audio_play', { voice: audioName });
        sendToGA('audio_sample_play', { voice_persona: audioName, page: currentPath });
      });
    });

    // B. Detección de uso del simulador de resiliencia
    var simBtn = document.getElementById('t_btn_run_sim') || document.querySelector('.btn-clash');
    if (simBtn) {
      simBtn.addEventListener('click', function() {
        var opponentEl = document.getElementById('simChallenger');
        var pitchEl = document.getElementById('simPitch');
        var opponent = opponentEl ? opponentEl.value : 'unknown';
        var pitchLen = pitchEl ? pitchEl.value.length : 0;

        recordLocalEvent('simulator_test', { opponent: opponent, pitch_len: pitchLen });
        sendToGA('simulator_run', { challenger: opponent, length: pitchLen });
      });
    }

    // C. Detección de clics en precios y Stripe
    document.querySelectorAll('a[href*="buy.stripe.com"], a[href*="stripe.com"]').forEach(function(link) {
      link.addEventListener('click', function() {
        var card = link.closest('.price-card') || link.parentElement;
        var planEl = card ? card.querySelector('h3, .price-val') : null;
        var planName = planEl ? planEl.innerText.trim() : 'stripe_checkout';

        recordLocalEvent('checkout_click', { plan: planName, href: link.href });
        sendToGA('begin_checkout', { item_name: planName, link_url: link.href });
      });
    });

    // D. Detección de clics en "Talk to Engineering" / Email / Cal.com
    document.querySelectorAll('a[href^="mailto:"], a[href*="cal.com"], a[href*="calendly"]').forEach(function(link) {
      link.addEventListener('click', function() {
        var targetType = link.href.indexOf('mailto:') !== -1 ? 'email_inquiry' : 'calendar_booking';
        recordLocalEvent('lead_intent', { type: targetType, href: link.href });
        sendToGA('generate_lead', { lead_channel: targetType, destination: link.href });
      });
    });

    // E. Monitoreo de Profundidad de Scroll (25%, 50%, 75%, 100%)
    var scrollMarks = { 25: false, 50: false, 75: false, 90: false };
    window.addEventListener('scroll', function() {
      var scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      [25, 50, 75, 90].forEach(function(mark) {
        if (scrollPercent >= mark && !scrollMarks[mark]) {
          scrollMarks[mark] = true;
          recordLocalEvent('scroll_depth', { depth: mark });
          sendToGA('scroll', { percent_scrolled: mark });
        }
      });
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachEngagementListeners);
  } else {
    attachEngagementListeners();
  }

  // 7. Consola de Reporte de Tráfico para Emilio: window.__ranukTrafficReport()
  window.__ranukTrafficReport = function() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        console.log("%c[Ranuk Analytics] No hay datos locales registrados todavía.", "color:#00f0ff;font-weight:bold;");
        return;
      }
      var s = JSON.parse(raw);
      console.group("%c📊 REPORTE DE TRÁFICO & CONVERSIÓN — RANUK.DEV", "color:#00f0ff;font-size:14px;font-weight:bold;");
      console.log("Primer registro:", s.firstSeen);
      console.log("Sesiones registradas:", s.totalVisits || 1);
      console.log("Procedencia actual:", trafficSource);
      console.table(s.pages);
      console.table(s.sources);
      console.log("Últimos eventos:", s.events.slice(-15));
      console.groupEnd();
      return s;
    } catch(e) {
      console.error(e);
    }
  };

  // 8. Atajo de teclado (Ctrl + Shift + A o Cmd + Shift + A) para abrir el panel /analytics/
  window.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      var inSubfolder = window.location.pathname.indexOf('/closer/') !== -1 ||
                         window.location.pathname.indexOf('/arena/') !== -1 ||
                         window.location.pathname.indexOf('/debates/') !== -1 ||
                         window.location.pathname.indexOf('/portfolio/') !== -1 ||
                         window.location.pathname.indexOf('/ranuk-it/') !== -1;
      var targetUrl = inSubfolder ? '../analytics/' : 'analytics/';
      window.location.href = targetUrl;
    }
  });

})();
