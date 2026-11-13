"use client";
/**
 * Bloque "Otros servicios" del home: grilla de servicios cargados desde el
 * panel (/api/servicios). Se muestran todos, sin carrusel, para que estén
 * visibles en el HTML y sean fáciles de recorrer en el celular.
 */
import { useMemo } from "react";
import useSWR from "swr";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import clienteAxios from "../config/axios";
import { ServicioCard } from "./Cards/ServicioCard";

const KEY = "/api/servicios?sort=position&dir=asc&per_page=1000";

export default function ServiciosFront() {
  const { data, error, isLoading: swrIsLoading } = useSWR(KEY, (url) => clienteAxios(url).then((r) => r.data), {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });
  const isLoading = swrIsLoading && data === undefined;

  const servicios = useMemo(() => {
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
    return list.map((s) => ({
      titulo: s.titulo ?? s.title ?? "Servicio",
      descripcion: s.descripcion ?? s.description ?? "",
      highlight: s.highlight ?? s.tagline ?? "",
      slug: s.slug ?? (s.titulo ?? s.title ?? "").toLowerCase().replace(/\s+/g, "-"),
      image: s.image ?? null,
    }));
  }, [data]);

  return (
    <section className="section bg-cream" aria-labelledby="servicios-titulo">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Más servicios</span>
            <h2 id="servicios-titulo" className="heading-lg mt-4">
              Todo lo que tu negocio necesita en internet
            </h2>
            <p className="lead mt-4">
              Además de ayudarte a aparecer en Google, te acompañamos con tiendas online,
              campañas, sistemas a medida y soporte.
            </p>
          </div>
          <Link to="/servicios" className="btn-secondary shrink-0 self-start sm:self-auto">
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-sand" />
            ))}
          </div>
        )}

        {error && !servicios.length && (
          <p className="mt-12 rounded-2xl bg-sand p-6 text-center">
            No pudimos cargar los servicios en este momento.
          </p>
        )}

        {servicios.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((item) => (
              <ServicioCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
