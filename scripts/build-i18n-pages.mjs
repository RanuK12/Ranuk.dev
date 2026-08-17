#!/usr/bin/env node
/**
 * Genera las versiones /en/ y /it/ del sitio y regenera sitemap.xml.
 *
 * El sitio ya declaraba <link rel="alternate" hreflang="en" href="https://ranuk.dev/en/">, pero esas
 * URLs devolvian 404: el idioma vivia solo en localStorage, asi que para Google habia una sola pagina
 * en espanol y tres alternates rotos. Esto crea las paginas de verdad — mismo HTML, <html lang> propio,
 * canonical propio y rutas relativas corregidas — para que cada idioma compita por su busqueda.
 *
 * El contenido lo sigue pintando js/i18n.js en el cliente a partir de document.documentElement.lang.
 *
 * Uso: node scripts/build-i18n-pages.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://ranuk.dev';
const LANGS = ['en', 'it'];          // 'es' es la raiz del sitio
const ALL = ['es', ...LANGS];

/** Paginas fuente. `path` es la URL relativa a la raiz (tambien la ruta en disco). */
const PAGES = [
  { path: 'index.html', url: '', priority: '1.0' },
  { path: 'ranuk-it/index.html', url: 'ranuk-it/', priority: '0.9' },
  { path: 'ranuk-it/trading-bots.html', url: 'ranuk-it/trading-bots.html', priority: '0.8' },
  { path: 'ranuk-it/ada/index.html', url: 'ranuk-it/ada/', priority: '0.8' },
];

/** <title> y meta description por pagina e idioma. Lo que Google muestra en el resultado. */
const META = {
  'index.html': {
    es: ['Emilio Ranucoli — ML Engineer & Data Scientist | Ingeniero en Sistemas',
         'ML Engineer y Data Scientist con experiencia en Booking.com y Accenture. Construyo sistemas a medida, automatización con IA y trading bots. Fundador de Ranuk IT Solutions. Disponible para proyectos freelance y consultoría.'],
    en: ['Emilio Ranucoli — ML Engineer & Data Scientist | Systems Engineer',
         'ML Engineer and Data Scientist with experience at Booking.com and Accenture. I build custom systems, AI automation and trading bots. Founder of Ranuk IT Solutions. Available for freelance projects and consulting.'],
    it: ['Emilio Ranucoli — ML Engineer & Data Scientist | Ingegnere dei Sistemi',
         'ML Engineer e Data Scientist con esperienza in Booking.com e Accenture. Costruisco sistemi su misura, automazione con IA e trading bot. Fondatore di Ranuk IT Solutions. Disponibile per progetti freelance e consulenza.'],
  },
  'ranuk-it/index.html': {
    es: ['Ranuk IT Solutions — Software a Medida, ML & Automatización | Consultoría IT',
         'Software a medida, Machine Learning aplicado, trading bots automatizados y auditorías de accesibilidad ADA/WCAG. Ingeniería de nivel europeo por un ML Engineer con experiencia real en Booking.com y Accenture.'],
    en: ['Ranuk IT Solutions — Custom Software, ML & Automation | IT Consulting',
         'Custom software, applied Machine Learning, automated trading bots and ADA/WCAG accessibility audits. European-level engineering by an ML Engineer with real experience at Booking.com and Accenture.'],
    it: ['Ranuk IT Solutions — Software su Misura, ML & Automazione | Consulenza IT',
         'Software su misura, Machine Learning applicato, trading bot automatizzati e audit di accessibilità ADA/WCAG. Ingegneria di livello europeo da un ML Engineer con esperienza reale in Booking.com e Accenture.'],
  },
  'ranuk-it/trading-bots.html': {
    es: ['Trading Bots Automatizados — Operá 24/7 sin emociones | Ranuk IT',
         'Desarrollo de bots de trading automatizado con Python, Backtrader y ccxt. Backtesting robusto, ejecución 24/7 sin emociones, integración con exchanges (Binance, Coinbase, Kraken).'],
    en: ['Automated Trading Bots — Trade 24/7 without emotions | Ranuk IT',
         'Automated trading bot development with Python, Backtrader and ccxt. Robust backtesting, 24/7 execution without emotions, exchange integrations (Binance, Coinbase, Kraken).'],
    it: ['Trading Bot Automatizzati — Opera 24/7 senza emozioni | Ranuk IT',
         'Sviluppo di trading bot automatizzati con Python, Backtrader e ccxt. Backtesting robusto, esecuzione 24/7 senza emozioni, integrazione con exchange (Binance, Coinbase, Kraken).'],
  },
  'ranuk-it/ada/index.html': {
    es: ['Auditoría ADA/WCAG 2.1 AA | Ranuk IT Solutions',
         'Servicio de auditoría ADA/WCAG 2.1 AA para plataformas web. Cumplimiento legal para empresas en EE.UU. y mercados internacionales. Reportes detallados y remediación técnica.'],
    en: ['ADA / WCAG 2.1 AA Accessibility Audit | Ranuk IT Solutions',
         'ADA / WCAG 2.1 AA accessibility audits for web platforms. Legal compliance for US companies and international markets. Detailed reports and technical remediation.'],
    it: ['Audit di Accessibilità ADA / WCAG 2.1 AA | Ranuk IT Solutions',
         'Audit di accessibilità ADA / WCAG 2.1 AA per piattaforme web. Conformità legale per aziende statunitensi e mercati internazionali. Report dettagliati e remediation tecnica.'],
  },
};

const canonicalFor = (lang, url) => `${SITE}/${lang === 'es' ? '' : lang + '/'}${url}`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/**
 * Prefija con ../ las rutas relativas a ARCHIVOS: css, js, assets y data viven en la raiz, y la
 * pagina baja un nivel al entrar en /en/ o /it/.
 *
 * Los links a otras PAGINAS se dejan como estan a proposito: href="ranuk-it/" desde /en/ tiene que
 * llevar a /en/ranuk-it/, no sacarte del idioma. Ese fue el bug de la primera pasada.
 */
const ASSET = /^(css|js|assets|data|vendor)\/|\.(css|js|mjs|png|jpe?g|svg|webp|gif|ico|webmanifest|json|xml|txt|pdf|woff2?)$/;
const isAsset = (path) => ASSET.test(path.split('?')[0].replace(/^(\.\.\/)+/, ''));

function reroot(html) {
  return html.replace(/\b(href|src|content)="((?!https?:|\/\/|\/|#|mailto:|tel:|data:)[^"]+)"/g,
    (m, attr, path) => isAsset(path) ? `${attr}="../${path}"` : m);
}

function altLinks(url) {
  return ALL.map((l) => `    <link rel="alternate" hreflang="${l}" href="${canonicalFor(l, url)}">`)
    .concat(`    <link rel="alternate" hreflang="x-default" href="${canonicalFor('es', url)}">`)
    .join('\n');
}

/** Reescribe head: lang, title, description, canonical y alternates. */
function localize(html, { lang, url, path }) {
  const [title, desc] = META[path][lang];

  html = html.replace(/<html([^>]*)\slang="[^"]*"/i, `<html$1 lang="${lang}"`);
  html = html.replace(/<title([^>]*)>[\s\S]*?<\/title>/i, `<title$1>${esc(title)}</title>`);
  html = html.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${esc(desc)}$2`);
  html = html.replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/i, `$1${esc(title)}$2`);
  html = html.replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/i, `$1${esc(desc)}$2`);
  html = html.replace(/(<meta\s+(?:name|property)="twitter:description"\s+content=")[^"]*(")/i, `$1${esc(desc)}$2`);
  html = html.replace(/(<meta\s+property="og:locale"\s+content=")[^"]*(")/i,
    `$1${{ es: 'es_ES', en: 'en_US', it: 'it_IT' }[lang]}$2`);

  // canonical + alternates: se borran los que hubiera y se escribe el juego completo.
  html = html.replace(/[ \t]*<link[^>]*rel="canonical"[^>]*>\n?/gi, '');
  html = html.replace(/[ \t]*<link[^>]*hreflang="[^"]*"[^>]*>\n?/gi, '');
  html = html.replace(/<\/head>/i,
    `    <link rel="canonical" href="${canonicalFor(lang, url)}">\n${altLinks(url)}\n</head>`);
  return html;
}

// ── Generar ──────────────────────────────────────────────────────────────────
for (const lang of LANGS) rmSync(join(ROOT, lang), { recursive: true, force: true });

let written = 0;
for (const page of PAGES) {
  const source = readFileSync(join(ROOT, page.path), 'utf8');
  // La version espanola (raiz) tambien se normaliza: sus alternates apuntaban a 404.
  writeFileSync(join(ROOT, page.path), localize(source, { ...page, lang: 'es' }), 'utf8');
  for (const lang of LANGS) {
    const out = join(ROOT, lang, page.path);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, localize(reroot(source), { ...page, lang }), 'utf8');
    written++;
  }
}

// ── sitemap.xml ──────────────────────────────────────────────────────────────
// Sin <lastmod> a proposito: una fecha generada en cada build hace que el sitemap cambie todos los
// dias sin que cambie el contenido — Google ignora esas fechas y el check de CI daria rojo cada dia.
const urls = PAGES.flatMap((p) => ALL.map((lang) => `  <url>
    <loc>${canonicalFor(lang, p.url)}</loc>
    <changefreq>monthly</changefreq>
    <priority>${p.priority}</priority>
${ALL.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${canonicalFor(l, p.url)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalFor('es', p.url)}"/>
  </url>`));

writeFileSync(join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`, 'utf8');

console.log(`i18n pages: ${written} generadas (${LANGS.join(', ')}), ${PAGES.length} normalizadas en es`);
console.log(`sitemap.xml: ${PAGES.length * ALL.length} URLs`);
