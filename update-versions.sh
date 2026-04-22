#!/bin/bash

# Cache Busting Script
# Genera versiones automáticas basadas en timestamps de archivos

echo "🔄 Generando versiones de cache busting..."

# Obtener timestamp actual
TIMESTAMP=$(date +%s)

# Actualizar index.html con nuevas versiones
sed -i.tmp "s/css\/styles.css?v=[0-9.]*\"/css\/styles.css?v=$TIMESTAMP\"/" index.html
sed -i.tmp "s/js\/i18n.js?v=[0-9.]*\"/js\/i18n.js?v=$TIMESTAMP\"/" index.html
sed -i.tmp "s/js\/particles.js?v=[0-9.]*\"/js\/particles.js?v=$TIMESTAMP\"/" index.html
sed -i.tmp "s/js\/animations.js?v=[0-9.]*\"/js\/animations.js?v=$TIMESTAMP\"/" index.html
sed -i.tmp "s/js\/ml-playground.js?v=[0-9.]*\"/js\/ml-playground.js?v=$TIMESTAMP\"/" index.html
sed -i.tmp "s/js\/github-feed.js?v=[0-9.]*\"/js\/github-feed.js?v=$TIMESTAMP\"/" index.html
sed -i.tmp "s/js\/app.js?v=[0-9.]*\"/js\/app.js?v=$TIMESTAMP\"/" index.html

# Limpiar archivo temporal
rm -f index.html.tmp

echo "✅ Versiones actualizadas: $TIMESTAMP"
echo "📝 Archivos modificados:"
echo "   - css/styles.css?v=$TIMESTAMP"
echo "   - js/i18n.js?v=$TIMESTAMP"
echo "   - js/particles.js?v=$TIMESTAMP"
echo "   - js/animations.js?v=$TIMESTAMP"
echo "   - js/ml-playground.js?v=$TIMESTAMP"
echo "   - js/github-feed.js?v=$TIMESTAMP"
echo "   - js/app.js?v=$TIMESTAMP"