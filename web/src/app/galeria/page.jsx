import Ejemplos from "@/components/Ejemplos";

export const metadata = {
  title: { absolute: "Galería | Grupo Bits" },
  description: "Galería de imágenes y trabajos realizados por Grupo Bits.",
  // Contenido heredado de otra plantilla (no corresponde al negocio): fuera de Google
  robots: { index: false, follow: true },
  alternates: { canonical: "/galeria" },
};

export default function Page() {
  return <Ejemplos />;
}
