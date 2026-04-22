const fs = require('fs');
const path = require('path');

// Cache Busting Script
// Genera versiones automáticas basadas en timestamps de archivos

console.log('🔄 Generando versiones de cache busting...');

// Obtener timestamp actual
const timestamp = Date.now();

// Archivos a actualizar
const filesToUpdate = [
    'css/styles.css',
    'js/i18n.js',
    'js/particles.js',
    'js/animations.js',
    'js/ml-playground.js',
    'js/github-feed.js',
    'js/app.js'
];

// Leer index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Actualizar versiones
filesToUpdate.forEach(file => {
    const regex = new RegExp(`${file.replace(/\./g, '\\.')}\\?v=[0-9.]*`, 'g');
    indexHtml = indexHtml.replace(regex, `${file}?v=${timestamp}`);
});

// Escribir index.html actualizado
fs.writeFileSync('index.html', indexHtml, 'utf8');

console.log('✅ Versiones actualizadas:', timestamp);
console.log('📝 Archivos modificados:');
filesToUpdate.forEach(file => {
    console.log(`   - ${file}?v=${timestamp}`);
});