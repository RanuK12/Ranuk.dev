# Guía para editar ranuk.dev / ranuk-it (LEER ANTES DE TOCAR)

Reglas firmes para no romper el sitio. Una mejora que rompe el layout NO es una mejora.

## Cómo NO romperla (errores reales que ya pasaron)
1. **i18n NUNCA debe borrar contenido.** `js/i18n.js applyTranslations()` solo aplica si la traducción
   NO está vacía (`if (t[key])`). Si una clave ES está en `""`, se deja el texto original del HTML (que
   ya está en español). NO volver a `t[key] !== undefined` (eso pisó TODO ranuk-it con vacíos = página
   en blanco). Si agregás claves i18n nuevas: llená EN/IT; ES puede quedar vacío (se usa el HTML).
2. **No borres CSS de clases que el HTML sigue usando.** Pasó con las fotos polaroid (`.story-photo-card`
   etc.): se borró su CSS y quedaron descentradas. Si movés estilos inline a clases, definí la clase en
   `css/styles.css` ANTES de quitar el inline.
3. **Cambios de copy = find/replace puntual.** No reescribas la página entera.

## Verificación OBLIGATORIA antes de commitear/pushear
1. `python3 ~/Apps/ranukita-bridge/scripts/rk-web-verify.py ~/Desktop/Oficina_Ranuk/Ranuk.dev`
   → debe dar 'WEB OK' o, como mínimo, NO introducir elementos nuevos sin CSS respecto a antes.
2. **Mirá el render REAL** (headless, no toca el Chrome de Emilio):
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --window-size=1280,1700 \
     --virtual-time-budget=5000 --screenshot=/tmp/check.png "file://<ruta>/index.html"` y abrí /tmp/check.png.
   Si ves listas vacías, texto faltante o todo descentrado → NO commitees, arreglá.
Una mejora sin verificar no es mejora.

## Deploy (cómo se publica y por qué a veces "no se ve")
- Hosting: **GitHub Pages** del repo RanuK12/Ranuk.dev (branch main, CNAME ranuk.dev).
- **Hace falta `.nojekyll`** en la raíz (el sitio es estático; sin esto el build de Jekyll FALLA y NO
  deploya — la página queda en la versión vieja aunque hayas pusheado).
- Tras push: el build tarda 1-5 min. Verificá: `gh api repos/RanuK12/Ranuk.dev/pages/builds/latest`
  (status debe ser `built`, no `errored`).
- **Cache de Cloudflare ~4h (max-age=14400)** delante de Pages: aunque deploye, la versión vieja se sirve
  cacheada. Para verlo al instante: purgar el cache (Cloudflare dashboard → Caching → Purge Everything),
  o usar `?nocache=<n>` en la URL para pegarle al origen. El token de CF guardado es SOLO-LECTURA (no
  purga); si se quiere purga automática, regenerar el token con permiso `Zone → Cache Purge`.
- Bump del `?v=` en los `<link>/<script>` de styles.css / i18n.js ayuda a invalidar el cache del navegador.

## Mapa rápido
- `index.html` = ranuk.dev (perfil de Emilio; sección story con 3 polaroid).
- `ranuk-it/index.html` = Ranuk IT (servicios/bounties/proceso). `ranuk-it/ada/` = landing ADA.
- `css/styles.css` = estilos de TODO. `js/i18n.js` = traducciones EN/ES/IT.
