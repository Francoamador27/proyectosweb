import { notFound } from "next/navigation";
import PortafolioDetail from "@/components/PortafolioDetail";
import { SWRData } from "@/context/Provider";
import { absoluteApiUrl, apiGet, KEYS, listOf, stripHtml } from "@/lib/api";

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = listOf(await apiGet(KEYS.portafolios));
  return items.map((p) => ({ id: String(p.id) }));
}

async function getProyecto(id) {
  const json = await apiGet(KEYS.portafolio(id));
  return json?.data ? { json, proyecto: json.data } : null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await getProyecto(id);
  if (!res) return {};
  const { proyecto } = res;
  const description = stripHtml(proyecto.descripcion ?? proyecto.contenido ?? "");
  const image = absoluteApiUrl(proyecto.imagen);
  return {
    title: `${proyecto.titulo} - Portafolio`,
    description,
    alternates: { canonical: `/portafolio/${id}` },
    openGraph: {
      title: proyecto.titulo,
      description,
      url: `/portafolio/${id}`,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function ProyectoPage({ params }) {
  const { id } = await params;
  const res = await getProyecto(id);
  if (!res) notFound();
  return (
    <SWRData fallback={{ [KEYS.portafolio(id)]: res.json }}>
      <PortafolioDetail />
    </SWRData>
  );
}
