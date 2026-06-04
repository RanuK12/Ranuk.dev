# 🔒 SECURITY.md — ranuk.dev

**Última auditoría:** 4 de junio 2026
**Auditor:** Ranukita (AI assistant)
**Estado:** 🔴 Pendiente activación en Cloudflare

---

## 📋 Resumen de la Auditoría

### Hallazgos Críticos

| # | Problema | Severidad | Estado |
|---|---|---|---|
| 1 | **Headers de seguridad NO se sirven** en el sitio en vivo | 🔴 Crítico | Pendiente activar en CF |
| 2 | **CORS `*`** — cualquier sitio puede hacer requests | 🟠 Alto | Pendiente activar en CF |
| 3 | **`robots.txt` demasiado abierto** — permite crawling de paths sensibles | 🟡 Medio | ✅ Corregido |
| 4 | **Sin `X-Frame-Options`** — clickjacking posible | 🟠 Alto | Pendiente activar en CF |
| 5 | **Sin `Content-Security-Policy`** — XSS no mitigado a nivel HTTP | 🟠 Alto | Pendiente activar en CF |

### Hallazgos Ok (ya protegidos)

| # | Protección | Estado |
|---|---|---|
| 1 | `escapeHTML()` en github-feed.js — XSS sanitizado | ✅ |
| 2 | `validateGithubData()` — validación de estructura JSON | ✅ |
| 3 | `credentials: 'same-origin'` en fetch | ✅ |
| 4 | SRI (Subresource Integrity) en CDN scripts (GSAP, Font Awesome) | ✅ |
| 5 | `rel="noopener"` en todos los links externos | ✅ |
| 6 | Sin API keys expuestas en cliente | ✅ |
| 7 | Google Analytics con `anonymize_ip: true` | ✅ |
| 8 | GA en archivo separado (ga.js) — no inline scripts | ✅ |
| 9 | HSTS preloaded en config (pendiente activar via CF) | ⏳ |

---

## 🔧 Archivos de Seguridad en el Repo

### Archivos de referencia (NO se aplican directamente)

| Archivo | Propósito | ¿Se aplica? |
|---|---|---|
| `nginx-security.conf` | Config para si se migra a VPS/Nginx | ❌ Solo referencia |
| `.htaccess` | Config para si se migra a Apache | ❌ Solo referencia |
| `_headers` | Config para Netlify/Cloudflare Pages | ⏳ Requiere migrar a CF Pages O activar Worker |

### Archivos activos (pendiente de deploy)

| Archivo | Propósito |
|---|---|
| `workers/security-headers.js` | Cloudflare Worker que inyecta todos los headers de seguridad |
| `robots.txt` | ✅ Desplegado — bloquea bots maliciosos y paths sensibles |
| `cloudflare-transform-rules.md` | Instrucciones para activar en dashboard de Cloudflare |

---

## 🎯 Plan de Acción

### Paso 1: Activar Cloudflare Worker (5 min)
1. Ir a https://dash.cloudflare.com → Workers & Pages
2. Crear Worker: nombre `ranuk-security-headers`
3. Pegar el contenido de `workers/security-headers.js`
4. Deploy
5. Crear Route: `ranuk.dev/*` y `www.ranuk.dev/*`
6. Verificar con https://securityheaders.com/?q=ranuk.dev

### Paso 2: Alternativa — Transform Rules (si no se usa Worker)
1. Seguir las instrucciones en `cloudflare-transform-rules.md`
2. Crear regla en Dashboard → Rules → Transform Rules

### Paso 3: HSTS Preload
1. Después de confirmar que HSTS funciona (24h)
2. Ir a https://hstspreload.org/
3. Submit `ranuk.dev`
4. Esperar procesamiento (semanas)

### Paso 4: Monitoreo
1. Verificar headers semanalmente
2. Revisar CSP violations report
3. Auditar dependencias CDN mensualmente

---

## 🛡️ Headers de Seguridad (Target)

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), vr=(), battery=()
Cross-Origin-Resource-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Content-Security-Policy: [ver cloudflare-transform-rules.md]
Access-Control-Allow-Origin: https://ranuk.dev
```

---

## 📞 Contacto de Seguridad

Para reportar vulnerabilidades: **security@ranuk.dev** o **emilio@ranuk.dev**

---

*Ranuk IT Solutions — Propiedad de Emilio Ranucoli*
*Última actualización: 4 de junio 2026*
