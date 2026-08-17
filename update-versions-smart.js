#!/usr/bin/env node
/**
 * Cache busting por contenido: reescribe cada `?v=` de los HTML con el hash del archivo.
 *
 * Existe porque los assets se sirven con `cache-control: max-age=14400`: si el contenido cambia y
 * el `?v=` no, el navegador sigue mostrando la version vieja durante cuatro horas. Paso el 17/08 —
 * i18n.js estaba arreglado en el servidor y la gente seguia viendo "fundé Ranuk IT
 * Solutions" y "Capa II", porque su navegador tenia cacheado el mismo ?v=728d9ddf.
 *
 * La version anterior solo miraba index.html y una lista de siete archivos escrita a mano
 * (css/visual-refresh.css, el que trae el layout, no estaba). Esta recorre TODOS los HTML y
 * restampea CUALQUIER asset local versionado que encuentre.
 *
 * Uso: node update-versions-smart.js   (correr SIEMPRE despues de tocar un css o un js)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const SKIP_DIRS = new Set(['.git', 'node_modules', 'docs', 'tests', 'assets', 'en', 'it']);

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (SKIP_DIRS.has(e.name)) return [];
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(full);
    return e.isFile() && e.name.endsWith('.html') ? [full] : [];
  });
}

const hashes = new Map();
function hashOf(file) {
  if (!hashes.has(file)) {
    hashes.set(file, fs.existsSync(file)
      ? crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex').slice(0, 8)
      : null);
  }
  return hashes.get(file);
}

// href/src de un asset local (relativo, sin protocolo) que ya viene versionado con ?v=
const VERSIONED = /((?:href|src)=")((?!https?:|\/\/|data:)[^"?]+\.(?:css|js))\?v=[^"]*(")/g;

let touched = 0;
const stamped = new Set();

for (const page of htmlFiles(ROOT)) {
  const before = fs.readFileSync(page, 'utf8');
  const after = before.replace(VERSIONED, (m, pre, rel, post) => {
    // La ruta del HTML es relativa a la pagina, no al repo.
    const asset = path.resolve(path.dirname(page), rel);
    const hash = hashOf(asset);
    if (!hash) {
      console.warn(`  aviso: ${path.relative(ROOT, page)} apunta a ${rel}, que no existe`);
      return m;
    }
    stamped.add(path.relative(ROOT, asset) + '?v=' + hash);
    return `${pre}${rel}?v=${hash}${post}`;
  });
  if (after !== before) {
    fs.writeFileSync(page, after, 'utf8');
    touched++;
    console.log(`  ${path.relative(ROOT, page)}`);
  }
}

console.log(`cache busting: ${touched} pagina(s) reescritas, ${stamped.size} assets`);
for (const s of [...stamped].sort()) console.log(`  ${s}`);
if (touched) console.log('\nOjo: si tocaste un fuente, corre despues node scripts/build-i18n-pages.mjs');
