# SEO — Página Performance Marketing

Ruta: `/performance-marketing`  
Componente: `src/views/PerformanceMarketing.jsx`

---

## 1. Title Tag

```
Performance Marketing | Grupo Bits — Campañas que generan resultados
```

**Por qué:** Incluye la keyword principal al inicio, el nombre de marca y un diferenciador emocional. Largo recomendado: 55–65 caracteres. ✓

---

## 2. Meta Description

```
Gestionamos tus campañas de Meta Ads, Google Ads y más con planificación estratégica, 
seguimiento en tiempo real y reportes mensuales detallados. Maximizamos tu ROI.
```

**Por qué:** Incluye las keywords más buscadas (Meta Ads, Google Ads, ROI), describe el servicio y genera expectativa de valor. Largo recomendado: 150–160 caracteres. ✓

---

## 3. Keywords principales (long-tail y head)

| Tipo       | Keyword                                      |
|------------|----------------------------------------------|
| Head       | performance marketing                        |
| Head       | gestión de campañas publicitarias            |
| Head       | marketing digital Córdoba                    |
| Long-tail  | agencia performance marketing Argentina      |
| Long-tail  | gestión Meta Ads Google Ads Argentina        |
| Long-tail  | reportes mensuales campañas publicitarias    |
| Long-tail  | cómo mejorar ROI en campañas digitales       |
| Long-tail  | agencia marketing digital Córdoba            |
| Long-tail  | seguimiento campañas publicitarias en tiempo real |

---

## 4. Estructura H1 / H2 / H3

```
H1: Campañas que generan resultados reales          ← Una sola H1, incluye keyword semántica
  H2: Todo lo que necesitás para crecer con pauta   ← Sección de servicios
    H3: Planificación de Campañas
    H3: Seguimiento en Tiempo Real
    H3: Análisis y Optimización
    H3: Resumen Mensual Detallado
  H2: Así trabajamos con vos                        ← Sección de proceso
  H2: Cada mes sabés exactamente cómo van tus campañas ← Sección reporte
  H2: Performance marketing sin vueltas             ← Why us
  H2: Preguntas frecuentes                          ← FAQs (buenas para featured snippets)
  H2: ¿Listo para hacer que tu pauta trabaje mejor? ← CTA final
```

---

## 5. URL canónica

```
https://tudominio.com/performance-marketing
```

Pasar al componente SEOHead como `canonical`:
```jsx
canonical={`${company?.domain}/performance-marketing`}
```

---

## 6. Open Graph (redes sociales)

```
og:title       → "Performance Marketing — Campañas que generan resultados reales"
og:description → "Planificación, seguimiento, análisis y reportes mensuales de tus 
                   campañas publicitarias. Maximizamos tu ROI con datos reales."
og:type        → "website"
og:image       → Logo o imagen de preview 1200×630px (recomendado)
og:url         → https://tudominio.com/performance-marketing
og:site_name   → Grupo Bits
```

---

## 7. Twitter Card

```
twitter:card        → "summary_large_image"
twitter:title       → "Performance Marketing | Grupo Bits"
twitter:description → "Planificación, seguimiento y reportes de campañas. Maximizamos tu ROI."
twitter:image       → Imagen 1200×628px
```

---

## 8. JSON-LD Schema (ya implementado en el componente)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Performance Marketing",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Grupo Bits",
    "url": "https://tudominio.com"
  },
  "description": "Servicios de performance marketing: planificación de campañas, 
                   seguimiento, análisis de datos y reportes mensuales detallados 
                   para maximizar tu ROI.",
  "areaServed": { "@type": "Country", "name": "Argentina" },
  "serviceType": [
    "Performance Marketing",
    "Gestión de Campañas Publicitarias",
    "Meta Ads",
    "Google Ads",
    "Analítica Digital"
  ],
  "offers": {
    "@type": "Offer",
    "description": "Planificación, gestión y optimización de campañas de performance 
                    con reporte mensual incluido."
  }
}
```

**Esquemas adicionales recomendados a futuro:**
- `FAQPage` — Las preguntas frecuentes del accordion pueden marcarse con schema FAQPage para aparecer como rich snippets en Google.
- `Review` / `AggregateRating` — Si se agregan testimonios con calificación.

---

## 9. FAQs para Rich Snippets (FAQPage schema)

Agregar al componente cuando se quiera activar rich snippets de FAQs:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo tarda en verse resultados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los primeros datos concretos aparecen en las primeras 2-4 semanas..."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué presupuesto mínimo necesito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trabajamos con presupuestos desde ARS $100.000 o USD $100 mensuales..."
      }
    }
  ]
}
```

---

## 10. Core Web Vitals / Performance SEO

| Técnica                          | Estado en el componente                      |
|----------------------------------|----------------------------------------------|
| Imágenes con lazy loading        | No hay imágenes pesadas, no aplica           |
| Suspense / lazy import           | No necesario (componente standalone)         |
| No blocking CSS                  | Tailwind purge → CSS mínimo ✓               |
| CLS (Cumulative Layout Shift)    | Secciones con altura fija en fallbacks ✓     |
| Fonts preloaded                  | Poppins cargada en index.css ✓              |
| Animaciones con CSS transitions  | No JS pesado ✓                              |

---

## 11. Internal linking recomendado

Agregar links internos desde esta página hacia:

- `/quienes-somos` → "Conocé nuestro equipo"
- `/contacto` → "Escribinos"
- `/portafolio` → "Ver casos de éxito"
- `/servicios` → "Ver todos los servicios"

Y desde otras páginas **hacia** `/performance-marketing`:
- Desde la home, en la sección de servicios
- Desde el footer, en el listado de servicios
- Desde el blog, en artículos relacionados con publicidad digital

---

## 12. Checklist de publicación

- [ ] Verificar que `company.domain` esté configurado en el contexto para el canonical
- [ ] Subir imagen OG (1200×628px) y referenciarla en `og.image`
- [ ] Agregar la página al sitemap.xml
- [ ] Agregar link en el Header (`Header.jsx`) bajo "Servicios"
- [ ] Agregar link en el Footer (`Footer.jsx`) en la columna de servicios
- [ ] Enviar URL a Google Search Console para indexación rápida
- [ ] Activar FAQPage schema para rich snippets (opcional pero recomendado)
- [ ] Testear con Google Rich Results Test
- [ ] Testear con PageSpeed Insights
