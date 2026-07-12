# HANDOFF — Ranuk.dev

**Última actualización**: 2026-07-12

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

### Diagnóstico de auditoría (2026-07-12)

Se ejecutó una auditoría con Lighthouse sobre la URL en producción (https://ranuk.dev). Los principales hallazgos fueron:

- **Accesibilidad**: 100/100. No se detectaron problemas significativos.
- **Links**: No se encontraron links rotos.
- **Mobile**: El sitio es responsive y se adapta bien a dispositivos móviles.
- **Rendimiento**: 
  - First Contentful Paint: 0.9s
  - Largest Contentful Paint: 1.2s
  - Time to Interactive: 1.5s
  - Total Blocking Time: 0ms

El reporte completo se encuentra en `lighthouse-report.json`.

---

## Próximos pasos

- [ ] Monitorear periódicamente el rendimiento y accesibilidad con Lighthouse
- [ ] Considerar optimizaciones adicionales si el rendimiento disminuye

## Stack y dependencias clave

| Capa | Tecnología |
|------|------------|
| **Markup** | HTML5 Semántico |
| **Estilos** | CSS3 Puro — Custom Properties, Grid, Flexbox, Animaciones, Backdrop Filter |
| **Lógica** | JavaScript ES6+ — Clases, Módulos, Intersection Observer, Canvas API |
| **Fuentes** | Inter (UI) + Fira Code (monospace) + Fraunces (serif display) |
| **Iconos** | Font Awesome 6 |
| **Motor ML** | Red neuronal de 2 capas — implementada desde cero, sin librerías |