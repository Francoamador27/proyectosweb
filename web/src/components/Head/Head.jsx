"use client";
/**
 * En Next los <title>, meta, canonical y Open Graph se generan en cada
 * page.jsx con `metadata` / `generateMetadata`. Este componente se mantiene
 * para no tocar los componentes existentes y solo emite JSON-LD si se pasa.
 */
export default function SEOHead({ jsonLd }) {
  if (!jsonLd) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
