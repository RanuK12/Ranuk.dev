const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Smart Cache Busting Script
// Genera versiones basadas en hash del contenido de cada archivo

console.log('🔄 Generando versiones inteligentes de cache busting...');

// Archivos a monitorear
const filesToWatch = [
    'css/styles.css',
    'js/i18n.js',
    'js/particles.js',
    'js/animations.js',
    'js/ml-playground.js',
    'js/github-feed.js',
    'js/app.js'
];

// Función para generar hash de un archivo
function getFileHash(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
    } catch (error) {
        console.error(`❌ Error leyendo ${filePath}:`, error.message);
        return null;
    }
}

// Leer index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Generar hashes y actualizar versiones
const updatedFiles = [];
filesToWatch.forEach(file => {
    const hash = getFileHash(file);
    if (!hash) return;

    const regex = new RegExp(`${file.replace(/\./g, '\\.')}\\?v=[0-9a-f.]*`, 'g');
    const newVersion = `${file}?v=${hash}`;

    if (indexHtml.match(regex)) {
        indexHtml = indexHtml.replace(regex, newVersion);
        updatedFiles.push(file);
    }
});

// Escribir index.html actualizado
fs.writeFileSync('index.html', indexHtml, 'utf8');

console.log('✅ Versiones actualizadas con hashes de contenido');
console.log('📝 Archivos modificados:');
updatedFiles.forEach(file => {
    const hash = getFileHash(file);
    console.log(`   - ${file}?v=${hash}`);
});

if (updatedFiles.length === 0) {
    console.log('ℹ️  No se detectaron cambios en los archivos monitoreados');
}