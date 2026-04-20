# Outreach Ranuk IT — Córdoba, AR

Kit para la campaña de cold outreach B2B en Córdoba capital e interior.

## Estructura

```
outreach/
├── scraper_cordoba.py      # Pipeline de leads (Places API + scraping + scoring)
├── requirements.txt        # Dependencias Python
├── email_templates.md      # Secuencia de 3 emails (cold + 2 follow-ups)
└── README.md               # Este archivo
```

## Setup (una vez)

```bash
cd outreach
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Exportar API keys (o crear .env y cargarlo)
export GOOGLE_MAPS_API_KEY="tu_key_places_api"
export PAGESPEED_API_KEY="tu_key_pagespeed"
```

### Cómo obtener las API keys

1. Ir a https://console.cloud.google.com
2. Crear un proyecto (ej. "ranuk-outreach")
3. Habilitar estas 2 APIs:
   - **Places API (New)** — obligatoria
   - **PageSpeed Insights API** — gratis, pero mejora el score
4. En "Credentials" generar una API Key y restringirla a esas 2 APIs
5. Costo estimado: ~USD 1.40 por corrida de 80 empresas

## Uso

```bash
# Corrida por rubro
python scraper_cordoba.py --rubro agroindustria --max 80
python scraper_cordoba.py --rubro manufactura --max 80 --out leads_manuf.xlsx
python scraper_cordoba.py --rubro clinicas --max 60
python scraper_cordoba.py --rubro logistica --max 80
python scraper_cordoba.py --rubro retail --max 60
```

El output es un `.xlsx` con:

- Empresa, sitio, email, teléfono, dirección
- Falencia técnica detectada (el gancho del email)
- Stack detectado (WordPress, React, etc.)
- PageSpeed móvil (0-100)
- Score de oportunidad (0-100) — **ordená por este y quedate con score ≥60**
- Filas verdes: score ≥75 (top prioridad)
- Filas doradas: 60-74 (buena prioridad)

## Workflow end-to-end

1. **Correr scraper** para el rubro objetivo
2. **Abrir xlsx** y filtrar score ≥60 + email no vacío
3. **Revisar manualmente** las top 30-50: validar que la "falencia técnica" detectada suene creíble
4. **Cargar en Instantly.ai / Smartlead** con las plantillas de `email_templates.md`
5. **Lanzar secuencia** (cold + follow-up +4 + breakup +10)
6. **Medir** open/reply/booked y ajustar subject line

## Cumplimiento legal AR

- Ley 25.326 (Protección de Datos Personales) permite prospección B2B a emails **corporativos** con opt-out claro en cada email.
- ✅ El template incluye el opt-out al final ("respondé 'remover'").
- ❌ No uses este script para contactar emails personales (`@gmail.com`, `@hotmail.com`, `@yahoo.com`) de dueños.
- ❌ No hagas scraping de redes sociales con credenciales (LinkedIn lo prohíbe expresamente).

## Anti-patterns evitados

- No usamos Selenium → más rápido, menos frágil, no rompe ante cambios de DOM.
- No scrapeamos con JS bloqueado por Cloudflare agresivo (si aparece, marcamos "sin sitio" y seguimos).
- El `User-Agent` identifica al bot con URL de contacto — transparencia defendible.
- Rate limit implícito: requests secuenciales, no paralelismo masivo contra un mismo dominio.

## Próxima iteración

- [ ] Agregar detección de ATS sin portal de candidatos (para HR outbound)
- [ ] Sumar fuente: Cámara de Industrias de Córdoba, BolsaCba
- [ ] Enriquecer con LinkedIn (vía Sales Navigator API si se justifica)
- [ ] Integrar con HubSpot / Pipedrive en vez de xlsx
