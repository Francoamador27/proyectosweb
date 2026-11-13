import { notFound } from "next/navigation";
import ServicioDetails from "@/components/ServicioDetails";
import { SWRData } from "@/context/Provider";
import { apiGet, KEYS, listOf, stripHtml } from "@/lib/api";
import { buildImageUrl } from "@/utils/imageUrl";

// Export estático: solo existen los slugs generados en el build
export const dynamicParams = false;

export async function generateStaticParams() {
  const servicios = listOf(await apiGet(KEYS.servicios));
  return servicios.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

async function getServicio(slug) {
  const json = await apiGet(KEYS.servicio(slug));
  return json ? { json, servicio: json.data ?? json } : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await getServicio(slug);
  if (!res) return {};
  const { servicio } = res;
  const title = servicio.title ?? servicio.titulo;
  const description =
    stripHtml(servicio.description ?? servicio.descripcion ?? "") || "Soluciones tecnológicas especializadas";
  const image = buildImageUrl(servicio.image ?? servicio.mainImage);
  return {
    title,
    description,
    keywords: Array.isArray(servicio.tags) ? servicio.tags : undefined,
    alternates: { canonical: `/servicios/${slug}` },
    openGraph: { title, description, url: `/servicios/${slug}`, images: image ? [{ url: image }] : undefined },
  };
}

export default async function ServicioPage({ params }) {
  const { slug } = await params;
  const res = await getServicio(slug);
  if (!res) notFound();
  return (
    <SWRData fallback={{ [KEYS.servicio(slug)]: res.json }}>
      <ServicioDetails />
    </SWRData>
  );
}
