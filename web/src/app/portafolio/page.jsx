import Portafolio from "@/components/Portafolio";
import { SWRData } from "@/context/Provider";
import { KEYS, prefetch } from "@/lib/api";

export const metadata = {
  title: "Portafolio",
  description: "Descubrí nuestros proyectos y casos de éxito en desarrollo web, sistemas y marketing digital.",
  alternates: { canonical: "/portafolio" },
};

export default async function PortafolioPage() {
  const fallback = await prefetch([KEYS.portafolios]);
  return (
    <SWRData fallback={fallback}>
      <Portafolio />
    </SWRData>
  );
}
