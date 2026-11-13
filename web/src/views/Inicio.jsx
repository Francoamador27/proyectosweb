"use client";
import FeatureSection from "../components/FeatureSection";
import NegocioLocalGoogle from "../components/NegocioLocalGoogle";
import ComoTrabajamos from "../components/Items";
import ServiciosFront from "../components/ServiciosFront";
import PortafolioCarrusel from "../components/PortafolioCarrusel";
import DestinosCarrusel from "../components/DestinosCarrusel";
import Contacto from "../components/Contacto";

/**
 * Home. Todas las secciones se renderizan en el HTML estático (SEO);
 * los metadatos se definen en app/page.jsx.
 */
export default function Inicio() {
  return (
    <>
      <FeatureSection />
      <NegocioLocalGoogle />
      <ComoTrabajamos />
      <ServiciosFront />
      <PortafolioCarrusel />
      <DestinosCarrusel />
      <Contacto />
    </>
  );
}
