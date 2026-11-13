import Contacto from "@/components/Contacto";

export const metadata = {
  title: { absolute: "Grupo Bits | Contacto" },
  description: "Contactate con Grupo Bits para conocer nuestras soluciones tecnológicas. Te ayudamos a digitalizar tu empresa.",
  alternates: { canonical: "/contacto" },
};

export default function Page() {
  return <Contacto asPage />;
}
