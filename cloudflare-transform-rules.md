# =========================================================
# Cloudflare Transform Rules — Security Headers para ranuk.dev
# =========================================================
#
# Instrucciones: Copiar estos valores al dashboard de Cloudflare:
# Dashboard → Security → Settings → HTTP Settings → 
#   o bien: Rules → Transform Rules → Modify Response Header
#
# Crear UNA sola regla con todas las modificaciones,
# o separarlas en reglas individuales por tipo.
#
# Alternativa: usar el DNS Settings → Transform Rules
# con el Expression: http.host eq "ranuk.dev" or http.host eq "www.ranuk.dev"
# =========================================================

## REGLA ÚNICA: Security Headers (recomendado)

**Expression:**
```
(http.host eq "ranuk.dev") or (http.host eq "www.ranuk.dev")
```

**Modifications (agregar cada header):**

| Header Name | Value | Action |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Set |
| `X-Content-Type-Options` | `nosniff` | Set |
| `X-Frame-Options` | `DENY` | Set |
| `X-XSS-Protection` | `0` | Set |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Set |
| `Permissions-Policy` | `accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), vr=(), battery=()` | Set |
| `Cross-Origin-Resource-Policy` | `same-origin` | Set |
| `Cross-Origin-Opener-Policy` | `same-origin` | Set |
| `Cross-Origin-Embedder-Policy` | `require-corp` | Set |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' https://www.googletagmanager.com https://cdnjs.cloudflare.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://formspree.io mailto:; upgrade-insecure-requests;` | Set |
| `Access-Control-Allow-Origin` | `https://ranuk.dev` | Set |

## REGLA 2: Remove Server Header

**Expression:**
```
(http.host eq "ranuk.dev") or (http.host eq "www.ranuk.dev")
```

**Remove Header:**
| Header Name | Value | Action |
|---|---|---|
| `X-Powered-By` | — | Remove |

## REGLA 3: Cache Static Assets (Cloudflare Cache Rules)

**Expression:**
```
(http.host eq "ranuk.dev" and http.request.uri.path.extension in {"js" "css" "png" "jpg" "jpeg" "gif" "ico" "svg" "woff" "woff2" "ttf" "eot" "webp"})
```

**Settings:**
- Cache TTL: 1 month
- Browser Cache TTL: 1 year

## Notas importantes
- **CORS**: Cambiar de `*` a `https://ranuk.dev` para prevenir abusos
- **CSP**: Se eliminó `unsafe-inline` del script-src (ga.js ya es un archivo separado)
- **HSTS preload**: Requiere submit en https://hstspreload.org/ DESPUÉS de activar
- **Report-To**: Se eliminó porque Cloudflare no tiene endpoint CSP-report configurado
- **Testear después**: https://securityheaders.com/?q=ranuk.dev y https://cspvalidator.org/
