# Cold Email Templates — Ranuk IT (Córdoba, AR)

> Secuencia de 3 emails. Usa las variables `{{Nombre_Empresa}}`, `{{Sitio_Empresa}}`, `{{Falencia_Tecnologica}}` del export del scraper.
> **Remitente recomendado:** `emilio@ranuk.dev` (nunca desde gmail personal).
> **Setup previo obligatorio:** SPF + DKIM + DMARC configurados, 3-4 semanas de warming en Instantly.ai o Smartlead.

---

## Subject lines — A/B test

Rotá estos 3 en la primera tanda y medí open rate. Ganador para la siguiente campaña:

1. `{{Nombre_Empresa}} — una observación técnica`
2. `Ex-Booking.com · 10 minutos sobre {{Falencia_Tecnologica}}`
3. `{{Nombre_Empresa}}: ¿15 minutos para hablar de {{Falencia_Tecnologica}}?`

---

## Email 1 — Cold (día 0)

```
Asunto: {{Nombre_Empresa}} — una observación técnica

Hola equipo de {{Nombre_Empresa}},

Soy Emilio Ranucoli, ingeniero en sistemas. Paso mis días construyendo
software para empresas en Europa — vengo de trabajar en la infraestructura
de pricing dinámico de Booking.com en Ámsterdam y en proyectos de datos
para clientes Fortune 500 en Accenture (Roma).

Estoy abriendo una línea de trabajo en Córdoba y revisé {{Sitio_Empresa}}
antes de escribirte. Detecté algo concreto:

  → {{Falencia_Tecnologica}}

No es una crítica — es el tipo de cosa que en empresas europeas se
resuelve en 2-3 semanas con el equipo técnico correcto, y que
típicamente libera 15-30% de capacidad operativa cuando se ataca bien.

Lo que hago es distinto a una agencia:
  · Escribo el código yo, con mi estudio (no tercerizo).
  · Estándares de las empresas en las que me formé (observabilidad,
    CI/CD, tests, documentación — cosas que en LATAM rara vez vienen
    incluidas).
  · Proyectos chicos (8-12 semanas) con entregables medibles, no
    retainers eternos.

¿Tendrías 15 minutos la próxima semana para una llamada corta? Sin
venta, sin propuesta empaquetada — sólo te muestro qué vería yo en
{{Nombre_Empresa}} si fuera tu CTO por un rato.

Agendá directo acá (horarios Córdoba):
  → https://calendly.com/ranucoliemilio/consulta-tecnica-15min

O respondé este mail si preferís, te contesto en el día.

Saludos,
Emilio Ranucoli
Ingeniero en Sistemas · Fundador, Ranuk IT Solutions
Ex-Booking.com (Ámsterdam) · Ex-Accenture (Roma)
AWS Certified · IBM Data Science Professional
ranuk.dev/ranuk-it  ·  +34 XXX XXX XXX

---
Si preferís no recibir más correos de mi parte, respondé "remover"
y salís de la lista en el día. No volvemos a escribir.
```

---

## Email 2 — Follow-up (día +4)

```
Asunto: Re: {{Nombre_Empresa}} — una observación técnica

Emilio de nuevo —

Te dejé la semana pasada una nota sobre {{Falencia_Tecnologica}} en
{{Sitio_Empresa}}. Entiendo que estos mails caen en el fondo de la bandeja.

Una sola pregunta para ver si tiene sentido seguir: ¿este tema está
en el radar de {{Nombre_Empresa}} para los próximos 6 meses, o es
algo que por ahora no duele?

Si la respuesta es "no duele", te saco de la lista y listo.
Si es "sí, pero es complejo", te preparo un audit gratis de 1 página
antes de la llamada, para que llegues con data y no con un pitch.

Un abrazo,
Emilio
```

---

## Email 3 — Breakup (día +10, último)

```
Asunto: Cierro el loop, {{Nombre_Empresa}}

Última nota y te dejo tranquilo —

Te comparto un recurso útil aunque no trabajemos juntos:

  → [Link a un caso tuyo publicado en ranuk.dev o un post de LinkedIn]
    "Cómo migramos un portal legacy a stack moderno sin downtime
     — notas técnicas de un proyecto real"

Si en algún momento {{Falencia_Tecnologica}} pasa a ser prioridad,
sabés dónde encontrarme. Te dejo fuera de la secuencia; no vas a
recibir más correos míos.

Gracias por el tiempo de leer,
Emilio Ranucoli
ranuk.dev/ranuk-it
```

---

## Benchmarks B2B cold LATAM

| Métrica         | Target mínimo | Target bueno |
|-----------------|---------------|--------------|
| Open rate       | 35%           | 55%+         |
| Reply rate      | 3%            | 8%+          |
| Meeting booked  | 1%            | 3%+          |
| Bounce rate     | <5%           | <2%          |

---

## Checklist previo al primer envío

- [ ] Crear casilla `emilio@ranuk.dev` (Google Workspace o similar)
- [ ] Configurar SPF en DNS de `ranuk.dev`
- [ ] Configurar DKIM en DNS de `ranuk.dev`
- [ ] Configurar DMARC con política `p=none` (primera fase)
- [ ] Verificar warmup en [mail-tester.com](https://mail-tester.com) — target 9+/10
- [ ] Crear cuenta Calendly con 2 event types:
  - Consulta técnica 15 min (gratis, disponible siempre)
  - Auditoría profunda 60 min (solo link directo, tras form lleno)
- [ ] Cargar plantillas en Instantly.ai o Smartlead
- [ ] Arrancar envío en escalera: 20/día semana 1, 40/día semana 2, 80/día semana 3+
- [ ] Correr `scraper_cordoba.py --rubro agroindustria --max 80` y filtrar solo score ≥60
- [ ] Separar batches por rubro (no mezclar agro + clínicas en la misma secuencia)

---

## Variables que usa el scraper

El `leads_*.xlsx` que genera el script trae las columnas exactas que necesitás para hidratar las plantillas:

| Columna xlsx             | Variable en template      |
|--------------------------|---------------------------|
| Empresa                  | `{{Nombre_Empresa}}`      |
| Sitio                    | `{{Sitio_Empresa}}`       |
| Falencia técnica         | `{{Falencia_Tecnologica}}`|
| Email                    | destinatario              |

Importá el .xlsx a Instantly/Smartlead y mapeá las columnas; las herramientas hacen el merge automático.
