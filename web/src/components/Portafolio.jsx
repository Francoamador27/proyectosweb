"use client";
import { useState, useMemo } from "react";
import useSWR from "swr";
import { Search, MessageCircle } from "lucide-react";
import clienteAxios from "../config/axios";
import PortafolioCard from "./PortafolioCard";
import WhatsappHref from "../utils/WhatsappUrl";

export default function Portafolio() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading: swrIsLoading } = useSWR("/api/portafolios", (url) => clienteAxios.get(url).then((r) => r.data), {
    revalidateOnFocus: false,
  });
  const loading = swrIsLoading && data === undefined;
  const portafolios = useMemo(() => data?.data || [], [data]);
  const whatsapp = WhatsappHref({ message: "Hola! Vi su portafolio y quiero algo parecido para mi negocio." });

  const filtrados = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return portafolios;
    return portafolios.filter((p) =>
      `${p.titulo || p.title || ""} ${p.descripcion || p.description || ""}`.toLowerCase().includes(q)
    );
  }, [portafolios, searchQuery]);

  return (
    <section className="section bg-cream">
      <div className="container-x">
        <header className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Portafolio</span>
          <h1 className="heading-xl mt-4">Trabajos que hicimos</h1>
          <p className="lead mt-4">
            Webs, sistemas y campañas para negocios reales. Mirá algunos de los proyectos en los que trabajamos.
          </p>
        </header>

        <label className="relative mx-auto mt-10 block max-w-md">
          <span className="sr-only">Buscar proyectos</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar un proyecto..."
            className="field rounded-full pl-11"
          />
        </label>

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-96 animate-pulse rounded-2xl bg-sand" />)}
          </div>
        ) : filtrados.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((p) => (
              <PortafolioCard key={p.id} proyecto={p} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-line p-12 text-center">
            <p className="font-display text-lg font-bold text-ink">No encontramos proyectos con esa búsqueda</p>
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")} className="btn-secondary mt-5">
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}

        <div className="mt-16 rounded-3xl bg-paper p-8 text-center shadow-soft sm:p-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">¿Querés el próximo proyecto en ser el tuyo?</h2>
          <p className="lead mx-auto mt-3 max-w-xl">Contanos qué necesitás y te pasamos una propuesta.</p>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
            <MessageCircle size={18} /> Hablemos
          </a>
        </div>
      </div>
    </section>
  );
}
