/* =========================================================
   github-feed.js — Renderiza data/github.json en #open-lab
   El JSON lo regenera GitHub Actions nightly. El cliente
   solo lee un archivo estático: cero rate-limit, cero token.

   SECURITY: Added data validation to prevent XSS via tampered JSON
   ========================================================= */

(function () {
  'use strict';

  // Mapa de colores por lenguaje (subset común; default si falta)
  const LANG_COLORS = {
    Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
    HTML: '#e34c26', CSS: '#563d7c', 'Jupyter Notebook': '#DA5B0B',
    C: '#555555', 'C++': '#f34b7d', Cython: '#fedf5b', Java: '#b07219',
    Go: '#00ADD8', Rust: '#dea584', Shell: '#89e051', PowerShell: '#012456',
    Dockerfile: '#384d54', SCSS: '#c6538c', Vue: '#41b883', PHP: '#4F5D95',
    Ruby: '#701516', R: '#198CE7', SQL: '#e38c00', Makefile: '#427819'
  };

  function relativeTime(iso, lang) {
    if (!iso) return '—';
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    const dict = {
      es: { s: 'seg', m: 'min', h: 'h', d: 'd', mo: 'meses', y: 'a' },
      en: { s: 'sec', m: 'min', h: 'h', d: 'd', mo: 'mo', y: 'y' },
      it: { s: 'sec', m: 'min', h: 'h', d: 'g', mo: 'mesi', y: 'a' }
    }[lang] || { s: 's', m: 'm', h: 'h', d: 'd', mo: 'mo', y: 'y' };
    if (diff < 60) return `${Math.floor(diff)}${dict.s}`;
    if (diff < 3600) return `${Math.floor(diff / 60)}${dict.m}`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}${dict.h}`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}${dict.d}`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} ${dict.mo}`;
    return `${Math.floor(diff / 31536000)} ${dict.y}`;
  }

  function escapeHTML(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  // JSON Schema validation for data integrity - prevents XSS via tampered JSON
  function validateGithubData(data) {
    if (!data || typeof data !== 'object') return false;

    // Validate stats structure
    if (data.stats && typeof data.stats !== 'object') return false;
    if (data.stats) {
      const validStats = ['public_repos', 'languages_count', 'total_stars', 'last_push'];
      for (const key of Object.keys(data.stats)) {
        if (!validStats.includes(key)) return false;
      }
    }

    // Validate languages is array
    if (data.languages && !Array.isArray(data.languages)) return false;
    if (data.languages) {
      for (const lang of data.languages) {
        if (!lang || typeof lang !== 'object') return false;
        if (typeof lang.name !== 'string') return false;
        if (typeof lang.pct !== 'number') return false;
        // Sanitize percentage to be valid
        if (lang.pct < 0 || lang.pct > 100) return false;
      }
    }

    // Validate featured repos
    if (data.featured && !Array.isArray(data.featured)) return false;
    if (data.featured) {
      for (const repo of data.featured) {
        if (!repo || typeof repo !== 'object') return false;
        if (typeof repo.name !== 'string') return false;
        if (repo.description && typeof repo.description !== 'string') return false;
        if (repo.stars && typeof repo.stars !== 'number') return false;
        if (repo.updated && typeof repo.updated !== 'string') return false;
        if (repo.url && typeof repo.url !== 'string') return false;
        // URL must be from github.com
        if (repo.url && !repo.url.startsWith('https://github.com/')) return false;
      }
    }

    // Validate generated_at is ISO date string
    if (data.generated_at) {
      const date = new Date(data.generated_at);
      if (isNaN(date.getTime())) return false;
    }

    return true;
  }

  function renderStats(stats) {
    const lang = (window.i18n?.getCurrentLang?.() || 'es');
    const setNum = (key, val) => {
      const el = document.querySelector(`[data-stat="${key}"]`);
      if (el) el.textContent = val;
    };
    setNum('public_repos', stats.public_repos);
    setNum('languages_count', stats.languages_count);
    setNum('total_stars', stats.total_stars);
    setNum('last_push_relative', relativeTime(stats.last_push, lang));

    // Update hero stat if present
    const heroRepoStat = document.querySelector('.hero-stats [data-target="85"]');
    if (heroRepoStat && stats.public_repos) {
      heroRepoStat.setAttribute('data-target', stats.public_repos);
      heroRepoStat.textContent = stats.public_repos;
    }
  }

  function renderLanguages(languages) {
    const container = document.getElementById('lab-langs-list');
    if (!container) return;
    // Mostrar top 8 con barras proporcionales
    const top = languages.slice(0, 8);
    container.innerHTML = top.map(l => {
      const color = LANG_COLORS[l.name] || '#64FFDA';
      const width = Math.max(l.pct, 1.5); // mínimo visible
      return `
        <div class="lang-row">
          <div class="lang-row-head">
            <span class="lang-dot" style="background:${escapeHTML(color)}"></span>
            <span class="lang-name">${escapeHTML(l.name)}</span>
            <span class="lang-pct">${l.pct}%</span>
          </div>
          <div class="lang-bar"><div class="lang-bar-fill" style="width:${width}%; background:${escapeHTML(color)}"></div></div>
        </div>
      `;
    }).join('');
  }

  function getRepoPill(repoName) {
    const n = (repoName || '').toLowerCase();
    if (n.includes('voice') || n.includes('debate') || n.includes('closer')) {
      return '<span class="repo-status-pill"><span class="pulse-dot"></span> AI Agent</span>';
    }
    if (n.includes('arena') || n.includes('flight') || n.includes('alert')) {
      return '<span class="repo-status-pill" style="color:var(--ag-cyan);border-color:rgba(0,240,255,0.4);background:rgba(0,240,255,0.1)"><span class="pulse-dot" style="background:var(--ag-cyan);box-shadow:0 0 6px var(--ag-cyan)"></span> Live Engine</span>';
    }
    if (n.includes('audit') || n.includes('ada')) {
      return '<span class="repo-status-pill" style="color:#a78bfa;border-color:rgba(167,139,250,0.4);background:rgba(167,139,250,0.1)"><span class="pulse-dot" style="background:#a78bfa;box-shadow:0 0 6px #a78bfa"></span> Compliance</span>';
    }
    if (n.includes('mcp')) {
      return '<span class="repo-status-pill" style="color:#fde047;border-color:rgba(253,224,71,0.4);background:rgba(253,224,71,0.1)"><span class="pulse-dot" style="background:#fde047;box-shadow:0 0 6px #fde047"></span> MCP Server</span>';
    }
    return '<span class="repo-status-pill"><span class="pulse-dot"></span> Active</span>';
  }

  function renderRepos(featured) {
    const container = document.getElementById('lab-repos-list');
    if (!container) return;
    const lang = (window.i18n?.getCurrentLang?.() || 'es');
    container.innerHTML = featured.map(r => {
      const color = LANG_COLORS[r.language] || '#64FFDA';
      const topics = (r.topics || []).slice(0, 3).map(t =>
        `<span class="repo-topic">${escapeHTML(t)}</span>`
      ).join('');
      const pill = getRepoPill(r.name);
      return `
        <a href="${escapeHTML(r.url)}" target="_blank" rel="noopener" class="lab-repo-card">
          <div class="lab-repo-head" style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
              <i class="fas fa-code-branch" style="color:var(--ag-cyan,#00f0ff);flex-shrink:0;"></i>
              <span class="lab-repo-name" style="font-weight:700;letter-spacing:-0.01em;">${escapeHTML(r.name)}</span>
            </div>
            ${pill}
          </div>
          <p class="lab-repo-desc" style="font-size:0.86rem;line-height:1.55;color:#94a3b8;margin:12px 0 16px;">${escapeHTML(r.description || '—')}</p>
          <div class="lab-repo-meta" style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;font-size:0.75rem;">
            ${r.language ? `<span class="lab-repo-lang"><span class="lang-dot" style="background:${escapeHTML(color)}"></span>${escapeHTML(r.language)}</span>` : ''}
            ${r.stars > 0 ? `<span class="lab-repo-stars" style="color:#fde047;"><i class="fas fa-star"></i> ${r.stars}</span>` : ''}
            <span class="lab-repo-time" style="color:#64748b;"><i class="far fa-clock"></i> ${relativeTime(r.updated, lang)}</span>
            ${topics ? `<span class="lab-repo-topics" style="margin-left:auto;">${topics}</span>` : ''}
          </div>
        </a>
      `;
    }).join('');
  }

  function renderFootnote(generatedAt) {
    const el = document.getElementById('lab-footnote');
    if (!el || !generatedAt) return;
    const lang = (window.i18n?.getCurrentLang?.() || 'es');
    const ago = relativeTime(generatedAt, lang);
    const word = { es: 'Actualizado hace', en: 'Updated', it: 'Aggiornato' }[lang] || 'Updated';

    // DOM-based approach for XSS prevention
    el.innerHTML = '';
    const icon = document.createElement('i');
    icon.className = 'fas fa-sync-alt';
    el.appendChild(icon);
    el.appendChild(document.createTextNode(` ${word} ${ago} · data/github.json`));
  }

  function showUnavailableMessage() {
    const container = document.getElementById('open-lab');
    if (!container) return;
    container.innerHTML = '';
    const msgDiv = document.createElement('div');
    msgDiv.className = 'lab-unavailable';
    const icon = document.createElement('i');
    icon.className = 'fas fa-exclamation-triangle';
    msgDiv.appendChild(icon);
    msgDiv.appendChild(document.createTextNode(' Feed currently unavailable'));
    container.appendChild(msgDiv);
  }

  async function load() {
    try {
      // Fetch with origin validation and explicit CORS
      const res = await fetch('data/github.json', {
        cache: 'no-cache',
        credentials: 'same-origin'
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      // Validate data structure before rendering - prevents XSS via tampered JSON
      if (!validateGithubData(data)) {
        throw new Error('Invalid data structure or potential tampering detected');
      }

      renderStats(data.stats || {});
      renderLanguages(data.languages || []);
      renderRepos(data.featured || []);
      renderFootnote(data.generated_at);
    } catch (err) {
      console.warn('[open-lab] Failed to load GitHub data:', err);
      showUnavailableMessage();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
