#!/usr/bin/env node
/**
 * Guardia de traducciones. Corre en CI y localmente: `node scripts/check-i18n.mjs`.
 *
 * Existe porque js/i18n.js se rompio en produccion sin que nadie lo notara: varias pasadas de
 * re-escritura automatica escaparon lo ya escapado y la pagina termino mostrando literalmente
 * "fundé Ranuk IT Solutions" y atributos rotos como class=\"title-number\". El HTML estaba
 * bien; lo pisaba el i18n. Esto falla el build antes de que eso vuelva a publicarse.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (msg) => errors.push(msg);

// ── 1. Cargar las traducciones ────────────────────────────────────────────────
const raw = readFileSync(join(ROOT, 'js/i18n.js'), 'utf8');
const objectSrc = raw.replace(/^const translations = /m, 'globalThis.__T = ').split('\nclass I18n')[0];
try {
  eval(objectSrc);
} catch (e) {
  console.error('js/i18n.js no parsea:', e.message);
  process.exit(1);
}
const T = globalThis.__T;
const LANGS = ['en', 'es', 'it'];

// ── 2. Escapado: ni un \uXXXX ni un \" pueden sobrevivir a un valor ──────────
for (const lang of LANGS) {
  if (!T[lang]) { fail(`falta el bloque de idioma "${lang}"`); continue; }
  for (const [key, value] of Object.entries(T[lang])) {
    if (typeof value !== 'string') continue;
    if (/\\u[0-9a-fA-F]{4}/.test(value)) fail(`${lang}.${key}: escape unicode literal (\\uXXXX)`);
    if (/\\"/.test(value)) fail(`${lang}.${key}: comilla escapada de mas (\\")`);
    if (/\\(?=[^\x00-\x7F])/.test(value)) fail(`${lang}.${key}: backslash huerfano antes de un acento`);
  }
}

// ── 3. Los tres idiomas comparten exactamente el mismo juego de claves ───────
const [base, ...rest] = LANGS;
for (const lang of rest) {
  for (const k of Object.keys(T[base])) if (!(k in (T[lang] ?? {}))) fail(`${lang}: falta la clave ${k}`);
  for (const k of Object.keys(T[lang] ?? {})) if (!(k in T[base])) fail(`${base}: falta la clave ${k}`);
}

// ── 4. Cada data-i18n del HTML tiene traduccion ──────────────────────────────
const htmlFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (['.git', 'node_modules', 'docs', 'tests'].includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith('.html')) htmlFiles.push(full);
  }
})(ROOT);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/data-i18n(?:-placeholder)?="([^"]+)"/g)) {
    if (!(m[1] in T[base])) fail(`${relative(ROOT, file)}: data-i18n="${m[1]}" no existe en las traducciones`);
  }
  // El HTML es la fuente de verdad del idioma por defecto: tampoco puede traer escapes.
  if (/\\u[0-9a-fA-F]{4}/.test(html)) fail(`${relative(ROOT, file)}: escape unicode literal en el HTML`);
}

// ── Resultado ────────────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`i18n: ${errors.length} problema(s)`);
  for (const e of errors.slice(0, 40)) console.error('  - ' + e);
  if (errors.length > 40) console.error(`  ... y ${errors.length - 40} mas`);
  process.exit(1);
}
console.log(`i18n OK — ${LANGS.length} idiomas x ${Object.keys(T[base]).length} claves, ${htmlFiles.length} paginas`);
