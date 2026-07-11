# Internationalization (i18n)

El sitio usa un sistema de internacionalización basado en claves de idioma (`en`, `es`, `it`).

## Cómo agregar nuevas claves
1. Agregar la clave en el objeto `translations` bajo el idioma correspondiente (ej: `en.ranukit.nueva_clave`).
2. Usar la clave en el HTML con `data-i18n="ranukit.nueva_clave"`.

## Fallback
- Si una clave está vacía en el idioma actual, se usa el valor de `en`.
- Si `en` también está vacío, se muestra la clave original (para evitar romper el layout).

## Tests
Los tests en `tests/i18n.test.js` verifican que el fallback funcione correctamente.