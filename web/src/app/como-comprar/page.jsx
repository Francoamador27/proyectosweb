import ComoComprar from "@/components/ComoComprar";

export const metadata = {
  title: { absolute: "Cómo trabajamos | Grupo Bits" },
  description: "Así es el proceso para contratar nuestros servicios, paso a paso.",
  // Contenido heredado de otra plantilla (no corresponde al negocio): fuera de Google
  robots: { index: false, follow: true },
  alternates: { canonical: "/como-comprar" },
};

export default function Page() {
  return <ComoComprar />;
}
