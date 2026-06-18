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

let indexHtml;
try {
    indexHtml = fs.readFileSync('index.html', 'utf8');
} catch (err) {
    console.error(`❌ Error leyendo index.html: ${err.message}`);
    process.exit(1);
}

const missingFiles = [];

// Actualizar versiones
filesToUpdate.forEach(file => {
    if (!fs.existsSync(file)) {
        missingFiles.push(file);
        return;
    }
    const regex = new RegExp(`${file.replace(/\./g, '\\.')}\\?v=[0-9.]*`, 'g');
    indexHtml = indexHtml.replace(regex, `${file}?v=${timestamp}`);
});

// Escribir index.html actualizado
try {
    fs.writeFileSync('index.html', indexHtml, 'utf8');
} catch (err) {
    console.error(`❌ Error escribiendo index.html: ${err.message}`);
    process.exit(1);
}

console.log('✅ Versiones actualizadas:', timestamp);
console.log('📝 Archivos modificados:');
filesToUpdate.forEach(file => {
    if (missingFiles.includes(file)) {
        console.log(`   - ${file}?v=${timestamp} (⚠️ archivo no encontrado, no se actualizó)`);
    } else {
        console.log(`   - ${file}?v=${timestamp}`);
    }
});