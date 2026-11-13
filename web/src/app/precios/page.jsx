import Precios from "@/components/Precios";

export const metadata = {
  title: { absolute: "Precios | Grupo Bits" },
  description: "Conocé los planes y precios de nuestros servicios de desarrollo web y marketing digital.",
  // Contenido heredado de otra plantilla (no corresponde al negocio): fuera de Google
  robots: { index: false, follow: true },
  alternates: { canonical: "/precios" },
};

export default function Page() {
  return <Precios />;
}
