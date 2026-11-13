import { Suspense } from "react";
import ServiciosGrid from "@/components/ServiciosGrid";
import { SWRData } from "@/context/Provider";
import { KEYS, prefetch } from "@/lib/api";

export const metadata = {
  title: "Nuestros Servicios",
  description:
    "Soluciones tecnológicas a medida: desarrollo de sistemas, software, hardware y marketing digital.",
  alternates: { canonical: "/servicios" },
};

export default async function ServiciosPage() {
  const fallback = await prefetch([KEYS.servicios, KEYS.serviciosCategorias]);
  return (
    <SWRData fallback={fallback}>
      {/* ServiciosGrid lee ?categoria= con useSearchParams: requiere Suspense en export estático */}
      <Suspense>
        <ServiciosGrid />
      </Suspense>
    </SWRData>
  );
}
