# 🚀 ranuk.dev

> **Construyo sistemas. Escalo empresas. Decido con datos.**

[![GitHub](https://img.shields.io/badge/GitHub-RanuK12-181717?style=flat&logo=github)](https://github.com/RanuK12)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-emilio--ranucoli-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/emilio-ranucoli)
[![License](https://img.shields.io/badge/License-MIT-64ffda?style=flat)](#license)
[![Live](https://img.shields.io/badge/Live-ranuk.dev-f97316?style=flat&logo=vercel)](https://ranuk.dev)
[![Ranuk IT](https://img.shields.io/badge/Ranuk_IT-Solutions-D4A574?style=flat&logo=building)](https://ranuk.dev/ranuk-it/)

---

## 👨‍💻 Sobre Mí

Soy **Emilio Ranucoli**, Ingeniero de Sistemas y Data Scientist con más de 5 años de experiencia construyendo soluciones a escala. Fundador de **Ranuk IT Solutions** y autor del libro *"Y así voy tejiendo mi camino"*.

### 🌍 Mi Trayectoria

- **4 países, 3 idiomas**: Argentina · Italia · Países Bajos · España
- **Experiencia internacional**: Booking.com (Amsterdam), Accenture (Roma), Gobierno de Córdoba
- **Especialización**: Machine Learning, Data Science, Full-stack Development, Python
- **Enfoque**: Sistemas que importan — del primer commit a la factura del cliente

### 🎯 Lo Que Hago

- **Desarrollo Full-stack**: Python, JavaScript, SQL, Cloud Technologies
- **Machine Learning Applied**: Scikit-learn, TensorFlow, NLP, Computer Vision
- **Data Engineering**: ETL pipelines, Data Warehousing, Business Intelligence
- **Consultoría Técnica**: Auditorías ADA, optimización de rendimiento, arquitectura de sistemas

---

## 🎨 Portfolio Digital

Un portfolio completamente artesanal, construido desde cero con **HTML, CSS y JavaScript puro** — sin frameworks, sin dependencias, sin bloat. Solo código limpio y performante que demuestra mi trabajo en data science, machine learning e ingeniería de software.

### ✨ Características Destacadas

#### 🧠 Sistema de Partículas Neuronal
- Fondo interactivo con nodos interconectados que responden al movimiento del mouse
- Visualización de red neuronal viva y dinámica
- Renderizado optimizado con Canvas API

#### 🎮 ML Playground Interactivo
- Entrena una red neuronal directamente en el navegador
- Coloca puntos de datos, configura hiperparámetros
- Observa la formación del límite de decisión en tiempo real
- Implementado desde cero: propagación hacia adelante, backpropagation, descenso de gradiente

#### 🌍 Soporte Trilingüe
- Internacionalización completa en **Español, Inglés e Italiano**
- Cambio de idioma instantáneo con preferencias persistentes
- Traducciones contextuales y culturalmente apropiadas

#### 💻 Experiencia de Desarrollo
- **Preloader estilo terminal**: Secuencia de arranque que establece el tono desarrollador
- **Tipografía glitch**: Efecto glitch CSS-only en el nombre hero para ese toque cyberpunk
- **Cursor personalizado**: Seguidor punto + anillo con estados hover
- **Animaciones scroll-triggered**: Revelaciones con IntersectionObserver
- **Contadores animados**: Contadores de estadísticas con easing suave
- **Grid de proyectos filtrable**: Filtrado por categorías con transiciones suaves
- **Diseño responsive**: Completamente responsive de 320px a ultrawide

#### 📊 Open Lab — GitHub Live
- Snapshot en vivo de mi GitHub público
- Se actualiza cada noche automáticamente vía GitHub Actions
- Distribución de lenguajes y repos destacados
- Sin tokens en el cliente, sin rate limit visible

#### 🎯 Narrativa en 3 Actos
- **Capa I — Cimientos**: 1995-2018, Córdoba Argentina
- **Capa II — Sistemas a escala**: 2018-2024, 4 países 3 idiomas
- **Capa III — Impacto propio**: 2024-hoy, Ranuk IT · El libro · Lo que viene

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Markup** | HTML5 Semántico |
| **Estilos** | CSS3 Puro — Custom Properties, Grid, Flexbox, Animaciones, Backdrop Filter |
| **Lógica** | JavaScript ES6+ — Clases, Módulos, Intersection Observer, Canvas API |
| **Fuentes** | Inter (UI) + Fira Code (monospace) + Fraunces (serif display) |
| **Iconos** | Font Awesome 6 |
| **Motor ML** | Red neuronal de 2 capas — sin TensorFlow, sin librerías |
| **Animaciones** | GSAP + ScrollTrigger (con fallback a Intersection Observer) |

**Cero dependencias. Cero pasos de build. Solo abre `index.html`.**

---

## 📁 Estructura del Proyecto

```
ranuk.dev/
├── index.html                    # Single-page application
├── css/
│   └── styles.css                # Stylesheet completo (~2800 líneas)
├── js/
│   ├── app.js                    # Orquestador principal
│   ├── i18n.js                   # Motor de traducciones (EN/ES/IT)
│   ├── particles.js              # Sistema de partículas neuronal
│   ├── animations.js             # Scroll reveals, typing, counters, nav
│   ├── ml-playground.js          # Clasificador de red neuronal desde cero
│   └── github-feed.js            # Feed de GitHub en tiempo real
├── data/
│   └── github.json               # Datos de GitHub (generados por Actions)
├── assets/
│   ├── profile-optimized.jpg     # Foto de perfil optimizada
│   ├── ranuk-badge.png           # Logo de Ranuk IT
│   ├── og-preview.png            # Preview para redes sociales
│   └── favicon-*.png             # Favicons múltiples tamaños
├── ranuk-it/                     # Subsitio de Ranuk IT Solutions
├── scripts/                      # Scripts de utilidad
├── hot-reload.sh                 # Servidor de desarrollo básico
├── hot-reload-advanced.sh        # Servidor con LiveReload
├── server.js                     # Servidor Node.js básico
├── server-advanced.js           # Servidor Node.js con SSE
├── HOT_RELOAD.md                 # Documentación de hot reload
├── .gitignore
└── README.md
```

---

## 🧠 ML Playground — Detalles Técnicos

El laboratorio ML interactivo implementa una red neuronal completa desde cero:

### Arquitectura
- **Entrada**: 2 features (x, y coordinates)
- **Capa oculta**: N neuronas (configurable: 2-16)
- **Salida**: 1 neurona (clasificación binaria)

### Implementación
- **Activación**: ReLU (capa oculta) + Sigmoid (salida)
- **Entrenamiento**: Descenso de gradiente con mini-batch y backpropagation
- **Visualización**: Límite de decisión renderizado en tiempo real en Canvas HTML5 usando clasificación pixel-level
- **Configurable**: Learning rate, épocas, y cantidad de neuronas ocultas vía sliders

### Matemáticas Implementadas
```javascript
// Propagación hacia adelante
hidden = relu(X · W1 + b1)
output = sigmoid(hidden · W2 + b2)

// Backpropagation
d_output = (output - y) * sigmoid'(output)
d_hidden = (d_output · W2.T) * relu'(hidden)

// Actualización de pesos
W2 -= learning_rate * (hidden.T · d_output)
W1 -= learning_rate * (X.T · d_hidden)
```

Esto no es un wrapper de librería — cada multiplicación de matrices, cada cálculo de gradiente, y cada actualización de pesos está escrito a mano.

---

## 📚 Secciones del Portfolio

| # | Sección | Descripción |
|---|---------|-------------|
| **Hero** | Presentación impactante con estadísticas animadas y sistema de partículas |
| **01** | **Historia** | Timeline narrativo en 3 actos con metáfora del tejido |
| **02** | **Skills** | Barras de progreso animadas en 4 categorías técnicas |
| **03** | **Experiencia** | Timeline interactivo — Booking.com, Accenture, Gobierno, y más |
| **04** | **Proyectos** | Grid filtrable de 8 proyectos destacados con enlaces GitHub |
| **~/** | **Open Lab** | Snapshot en vivo de GitHub con distribución de lenguajes |
| **05** | **Voces** | Testimonios reales de colegas y clientes |
| **06** | **ML Lab** | Playground interactivo de redes neuronales |
| **07** | **Certificaciones** | AWS, Microsoft PL-300, IBM ML/DL, Google, Kaggle, HackerRank |
| **08** | **Libro** | *"Y así voy tejiendo mi camino"* — memoir con mockup 3D CSS |
| **09** | **Contacto** | Formulario directo y enlaces sociales |

---

## 🚀 Desarrollo Local

No se requieren herramientas de build. Solo sirve los archivos:

### Opción 1: Scripts Incluidos (Recomendado)

```bash
# Servidor básico (sin caché)
./hot-reload.sh

# Servidor avanzado con LiveReload
./hot-reload-advanced.sh

# Servidor Node.js básico
node server.js

# Servidor Node.js con recarga automática
node server-advanced.js
```

### Opción 2: Python

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Opción 3: Node.js

```bash
# Usando npx (sin instalación)
npx serve .

# O instalar serve globalmente
npm install -g serve
serve .
```

### Opción 4: Directo

```bash
# Simplemente abre index.html en tu navegador
open index.html
```

Luego abre `http://localhost:8000` en tu navegador.

---

## 🌐 Deployment

Diseñado para **GitHub Pages** o cualquier hosting estático:

### GitHub Pages

```bash
# El sitio se sirve automáticamente desde la rama main
git push origin main

# Disponible en: https://ranuk.dev
```

**Cache Busting Automático:** El proyecto incluye un sistema automático de cache busting que actualiza las versiones de CSS y JS en cada commit, asegurando que los cambios se reflejen inmediatamente sin necesidad de limpiar el caché manualmente.

Ver [CACHE_BUSTING.md](CACHE_BUSTING.md) para más detalles.

### Otros Hostings

Compatible con: Vercel, Netlify, Cloudflare Pages, AWS S3 + CloudFront, o cualquier servidor de archivos estático.

### Configuración de Dominio Personalizado

El proyecto ya incluye configuración para dominio personalizado:
- Archivo `CNAME` configurado para `ranuk.dev`
- Certificado SSL automático vía GitHub Pages
- Redirecciones HTTPS configuradas

---

## ⚡ Performance

### Optimizaciones Implementadas

- **Sin frameworks** = payload mínimo
- **Sin build step** = deploy instantáneo
- **Lazy loading** en imágenes
- **Animaciones eficientes** usando `requestAnimationFrame` y `IntersectionObserver`
- **CSS containment** para optimización de paint
- **GPU acceleration** con `transform: translateZ(0)`
- **Responsive particle count** que se adapta al tamaño de pantalla
- **Script defer** para no bloquear el render
- **Cache control** optimizado para desarrollo

### Métricas

- **Tamaño total**: ~200KB (incluyendo todos los assets)
- **Time to Interactive**: < 2s en conexión 4G
- **Lighthouse Score**: 95+ Performance, 100 Accessibility, 100 SEO
- **First Contentful Paint**: < 1s

---

## 🌐 Soporte de Navegadores

Probado y optimizado para:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

### Características Modernas Utilizadas

- CSS Grid & Flexbox
- CSS Custom Properties
- Intersection Observer API
- Canvas API
- ES6+ JavaScript
- CSS Animations & Transitions
- Backdrop Filter
- CSS 3D Transforms

---

## 🎨 Características de Diseño

### Sistema de Diseño

- **Paleta de colores**: Dark theme con acentos cyan (#64ffda), naranja (#f97316), y dorado (#D4A574)
- **Tipografía**: Inter (UI), Fira Code (código), Fraunces (display serif)
- **Espaciado**: Sistema de 8px base con múltiplos consistentes
- **Bordes**: Redondeados sutilmente (6-14px) para modernidad sin exceso

### Micro-interacciones

- Hover states en todos los elementos interactivos
- Transiciones suaves (0.3s cubic-bezier)
- Efectos de brillo y sombra en hover
- Cursor personalizado con seguimiento
- Feedback visual inmediato

### Accesibilidad

- Skip link para navegación por teclado
- Atributos ARIA apropiados
- Contraste de color WCAG AA compliant
- Navegación por teclado completa
- Texto alternativo en imágenes
- Estructura semántica HTML5

---

## 📈 Estadísticas del Proyecto

- **Líneas de código**: ~15,000+
- **Archivos**: 50+
- **Lenguajes**: HTML, CSS, JavaScript, Python (scripts)
- **Tiempo de desarrollo**: 6+ meses
- **Commits**: 100+
- **Contribuidores**: 1 (principal)
- **Última actualización**: 2026

---

## 🔧 Scripts y Utilidades

### Hot Reload Development

El proyecto incluye múltiples opciones para desarrollo con hot reload:

```bash
# Básico - Recarga manual
./hot-reload.sh

# Avanzado - Recarga automática
./hot-reload-advanced.sh

# Node.js - Recarga automática vía SSE
node server-advanced.js
```

Ver `HOT_RELOAD.md` para documentación completa.

### GitHub Actions

El proyecto utiliza GitHub Actions para:

- **Actualización automática** del feed de GitHub cada noche
- **Generación de datos** de repositorios y estadísticas
- **Mantenimiento** de datos actualizados sin intervención manual

---

## 🤝 Contribuciones

Este es mi portfolio personal, pero si encuentras bugs o tienes sugerencias:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

MIT License - Siéntete libre de fork y adaptar para tu propio portfolio.

---

## 📞 Contacto

- **Email**: ranucoliemilio@gmail.com
- **LinkedIn**: [linkedin.com/in/emilio-ranucoli](https://linkedin.com/in/emilio-ranucoli)
- **GitHub**: [github.com/RanuK12](https://github.com/RanuK12)
- **Portfolio**: [ranuk.dev](https://ranuk.dev)
- **Empresa**: [Ranuk IT Solutions](https://ranuk.dev/ranuk-it/)

---

## 🙏 Agradecimientos

- **Booking.com** por la oportunidad de trabajar en sistemas de pricing a escala
- **Accenture** por la experiencia en supply chain y data science
- **Todos mis clientes** por confiar en Ranuk IT Solutions
- **La comunidad open source** por las herramientas y recursos que hacen posible este proyecto

---

## 📖 Recursos Adicionales

- [Documentación de Hot Reload](HOT_RELOAD.md)
- [Ranuk IT Solutions](https://ranuk.dev/ranuk-it/)
- [Libro: "Y así voy tejiendo mi camino"](https://www.amazon.com.au/AS%C3%8D-VOY-TEJIENDO-CAMINO-Spanish-ebook/dp/B0F6PFC457)
- [GitHub Profile](https://github.com/RanuK12)

---

**Construido con café, curiosidad, y código limpio.**

*Emilio Ranucoli — 2026*

*"Del primer commit a la factura del cliente. Construyo sistemas con Python y ML. Escribo sobre todo lo demás."*