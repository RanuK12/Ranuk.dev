# HANDOFF — Ranuk.dev

**Última actualización**: 2026-05-20

---

## Propósito del proyecto

Portfolio personal y presencia digital de Emilio Ranucoli — Ingeniero de Sistemas, Data Scientist y fundador de Ranuk IT Solutions. El sitio sirve como:

- **Portfolio profesional**: muestra proyectos, experiencia y certificaciones
- **Demostración técnica**: ML Playground interactivo, sistema de partículas neuronal, i18n trilingüe
- **Hub de negocio**: portal hacia Ranuk IT Solutions y el libro
- **Marca personal**: "Construyo sistemas. Escalo empresas. Decido con datos."

---

## Estado actual

🟢 **Activo y estable** — sitio en producción en https://ranuk.dev

### Métricas del sitio

| Métrica | Valor |
|---------|-------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | 100 |
| Tamaño total | ~200KB |
| Time to Interactive | < 2s (4G) |
| First Contentful Paint | < 1s |

### Repositorio

- **GitHub**: https://github.com/RanuK12/Ranuk.dev
- **Deploy**: GitHub Pages (rama `main`)
- **Dominio**: ranuk.dev (CNAME configurado)
- **Cache busting**: automático en cada commit

---

## Stack y dependencias clave

| Capa | Tecnología |
|------|------------|
| **Markup** | HTML5 Semántico |
| **Estilos** | CSS3 Puro — Custom Properties, Grid, Flexbox, Animaciones, Backdrop Filter |
| **Lógica** | JavaScript ES6+ — Clases, Módulos, Intersection Observer, Canvas API |
| **Fuentes** | Inter (UI) + Fira Code (monospace) + Fraunces (serif display) |
| **Iconos** | Font Awesome 6 |
| **Motor ML** | Red neuronal de 2 capas — implementada desde cero, sin librerías |
| **Animaciones** | GSAP + ScrollTrigger (con fallback a Intersection Observer) |
| **Hosting** | GitHub Pages |
| **CI/CD** | GitHub Actions (actualización nightly del feed de GitHub) |

**Cero dependencias de build. Cero frameworks. Solo abre `index.html`.**

---

## Estructura de carpetas

```
Ranuk.dev/
├── index.html                    # Single-page application principal
├── CNAME                         # Dominio personalizado (ranuk.dev)
├── .gitignore
├── package.json                  # Scripts de utilidad (sin deps de runtime)
│
├── css/
│   └── styles.css                # Stylesheet completo (~2800 líneas)
│
├── js/
│   ├── app.js                    # Orquestador principal
│   ├── i18n.js                   # Motor de traducciones (EN/ES/IT)
│   ├── particles.js              # Sistema de partículas neuronal
│   ├── animations.js             # Scroll reveals, typing, counters, nav
│   ├── ml-playground.js          # Clasificador de red neuronal desde cero
│   ├── github-feed.js            # Feed de GitHub en tiempo real
│   └── ga.js                     # Google Analytics
│
├── data/
│   └── github.json               # Datos de GitHub (generados por Actions)
│
├── assets/
│   ├── profile-optimized.jpg     # Foto de perfil
│   ├── ranuk-badge.png           # Logo Ranuk IT
│   ├── ranuk-logo.svg            # Logo vectorial
│   ├── ranuk-banner.jpg          # Banner
│   ├── og-preview.png            # Open Graph preview
│   └── favicon-*.png             # Favicons múltiples tamaños
│
├── ranuk-it/                     # Subsitio de Ranuk IT Solutions
│   └── index.html
│
├── scripts/
│   └── fetch-github.mjs          # Script para GitHub Actions
│
├── server.js                     # Servidor Node.js básico (dev)
├── server-advanced.js            # Servidor Node.js con SSE (dev)
├── hot-reload.sh                 # Servidor de desarrollo básico
├── hot-reload-advanced.sh        # Servidor con LiveReload
│
├── HOT_RELOAD.md                 # Documentación de hot reload
├── CACHE_BUSTING.md              # Documentación de cache busting
├── nginx-security.conf           # Config de seguridad para nginx
└── update-versions.js            # Script de cache busting
```

---

## Qué funciona / qué está roto

### ✅ Funciona

- **Sitio completo**: 9 secciones navegables, responsive de 320px a ultrawide
- **Sistema de partículas**: fondo neuronal interactivo, optimizado con Canvas API
- **ML Playground**: red neuronal de 2 capas entrenable en el navegador, desde cero
- **i18n trilingüe**: Español, Inglés e Italiano con persistencia de preferencia
- **GitHub Live**: snapshot actualizado nightly vía GitHub Actions
- **Cache busting**: versiones de CSS/JS se actualizan automáticamente en cada commit
- **SEO completo**: meta tags, Open Graph, favicons múltiples, estructura semántica
- **Accesibilidad**: WCAG AA, skip links, ARIA, navegación por teclado
- **Performance**: lazy loading, CSS containment, GPU acceleration, script defer

### ⚠️ Frágil / conocido

- **GitHub Actions**: el workflow de actualización nightly puede fallar si la API de GitHub responde con rate limit. No crítico — los datos mostrados son un snapshot, no en tiempo real.
- **ML Playground**: funciona bien en desktop, pero el entrenamiento puede ser lento en mobile. El canvas de visualización se adapta pero con menos resolución.
- **Hot reload scripts**: los scripts `hot-reload.sh` y `hot-reload-advanced.sh` dependen de `fswatch` o `inotify`. En macOS funcionan, en Linux pueden requerir instalación manual.

### ❌ No implementado / backlog

- **Blog / newsletter**: sección de artículos técnicos (mencionada en el roadmap mental)
- **Dark mode toggle**: actualmente es dark-only. Un toggle claro/oscuro estaría bien.
- **Service Worker / PWA**: no hay offline capability ni "Add to Home Screen"
- **Analytics avanzado**: solo Google Analytics básico. No hay heatmaps ni funnel tracking.
- **Formulario de contacto funcional**: el formulario actual es estático (sin backend). Los contactos van por email directo o LinkedIn.

---

## Próximos pasos claros

1. **Mantener actualizado** (continuo)
   - Asegurar que GitHub Actions siga funcionando
   - Actualizar proyectos y certificaciones nuevos

2. **Mejoras de contenido** (baja prioridad)
   - Agregar nuevos proyectos destacados
   - Actualizar métricas de experiencia si cambian

3. **Mejoras técnicas** (baja prioridad)
   - Evaluar agregar blog estático (Markdown → HTML)
   - Considerar PWA básico (service worker + manifest)
   - Optimizar imágenes restantes a WebP/AVIF

4. **Ranuk IT subsite** (media prioridad)
   - El subsitio `ranuk-it/` es básico. Podría expandirse con casos de éxito y servicios detallados.

---

## Notas para retomar el proyecto

### Contexto de negocio

- **Público objetivo**: reclutadores, potenciales clientes de consultoría, colegas técnicos
- **Mensaje clave**: "Del primer commit a la factura del cliente"
- **Diferenciador**: portfolio artesanal sin frameworks, que demuestra dominio de fundamentos web

### Qué revisar al retomar

1. Abrir `index.html` directamente en el navegador — no requiere build
2. Revisar `data/github.json` — debe tener datos actualizados de repos
3. Verificar `CACHE_BUSTING.md` si se hacen cambios en CSS/JS
4. Chequear `HOT_RELOAD.md` para opciones de desarrollo

### Comandos rápidos

```bash
cd ~/Desktop/oficina_ranuk/Ranuk.dev

# Servidor de desarrollo básico
./hot-reload.sh

# Servidor avanzado con LiveReload
./hot-reload-advanced.sh

# Servidor Node.js
node server.js

# O simplemente
python3 -m http.server 8000
npx serve .
```

Luego abrir http://localhost:8000

### Deploy

```bash
# GitHub Pages (automático con push a main)
git add .
git commit -m "update: descripción del cambio"
git push origin main

# El cache busting se actualiza automáticamente:
npm run precommit
# o manualmente:
node update-versions-smart.js && git add index.html
```

### Puntos de contacto

- **Email**: ranucoliemilio@gmail.com
- **LinkedIn**: linkedin.com/in/emilio-ranucoli
- **GitHub**: github.com/RanuK12
- **Empresa**: ranuk.dev/ranuk-it/

---

## Historial de cambios recientes

| Fecha | Cambio |
|-------|--------|
| 2026-05 | Actualización de contenido y certificaciones |
| 2026-04 | Optimización de assets e imágenes |
| 2026-03 | Implementación de cache busting automático |
| 2026-02 | ML Playground interactivo |
| 2026-01 | Lanzamiento inicial del portfolio v2 |

---

*Última actualización: 2026-05-20. Próxima revisión sugerida: al agregar un nuevo proyecto destacado o certificación importante.*
