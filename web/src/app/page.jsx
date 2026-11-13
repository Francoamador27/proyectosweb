import Inicio from "@/views/Inicio";
import { SWRData } from "@/context/Provider";
import { KEYS, prefetch } from "@/lib/api";

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const fallback = await prefetch([KEYS.sliders, KEYS.servicios, KEYS.portafolios, KEYS.serviciosCategorias]);
  return (
    <SWRData fallback={fallback}>
      <Inicio />
    </SWRData>
  );
}
