#!/bin/bash

# Colores para logs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

TIMESTAMP=$(date +%s)
FILES=("css/styles.css" "js/animations.js" "js/app.js" "js/github-feed.js" "js/i18n.js" "js/ml-playground.js" "js/particles.js")

echo -e "${CYAN}🚀 Iniciando actualización de versiones...${NC}"

for file in "${FILES[@]}"; do
    if sed -i.tmp "s|${file}\?v=[0-9.]*\"|${file}?v=${TIMESTAMP}\"|" index.html; then
        echo -e "${GREEN}✅ ${file} actualizado a v=${TIMESTAMP}${NC}"
    else
        echo -e "${YELLOW}⚠️  No se pudo actualizar ${file} (puede que no esté referenciado)${NC}"
    fi
done

# Limpiar archivo temporal
rm -f index.html.tmp

# Remove backup if everything succeeded
rm -f index.html.bak

echo -e "${GREEN}✅ Versiones actualizadas: ${TIMESTAMP}${NC}"
echo -e "${CYAN}📝 Archivos modificados:${NC}"
for file in "${FILES[@]}"; do
    echo -e "   - ${file}?v=${TIMESTAMP}"
done