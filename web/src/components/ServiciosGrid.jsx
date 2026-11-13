"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "@/lib/router";
import WhatsappHref from "../utils/WhatsappUrl";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import { Search, MessageCircle } from "lucide-react";
import { ServicioCard } from "./Cards/ServicioCard";

export default function ServiciosGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // ?categoria= se lee tras montar: useSearchParams() haría que Next
  // renderice todo el listado solo en el cliente (HTML vacío para SEO)
  useEffect(() => {
    const categoriaParam = new URLSearchParams(window.location.search).get("categoria");
    if (categoriaParam) setSelectedCategory(categoriaParam);
  }, []);

  const fetcher = (url) => clienteAxios(url).then((res) => res.data);

  const { data: dataCategorias } = useSWR("/api/servicios-categorias", fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  const serviciosUrl = useMemo(() => {
    const params = new URLSearchParams({ sort: "position", dir: "asc", per_page: "1000" });
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    return `/api/servicios?${params.toString()}`;
  }, [selectedCategory, searchQuery]);

  const { data, error, isLoading: swrIsLoading } = useSWR(serviciosUrl, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });
  const isLoading = swrIsLoading && data === undefined;

  const categorias = useMemo(
    () => (Array.isArray(dataCategorias?.data) ? dataCategorias.data : Array.isArray(dataCategorias) ? dataCategorias : []),
    [dataCategorias]
  );

  const serviciosApi = useMemo(
    () => (Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []),
    [data]
  );

  const servicios = useMemo(() => {
    const base = serviciosApi?.length ? serviciosApi : [];
    return base.map((s) => ({
      icon: s.icon ?? "⚙️",
      titulo: s.titulo ?? s.title ?? "Servicio especializado",
      descripcion: s.descripcion ?? s["description"] ?? "",
      highlight: s.highlight ?? s.tagline ?? "",
      slug: s.slug ?? (s.titulo ?? s.title ?? "").toLowerCase().replace(/\s+/g, "-"),
      image: s.image ?? null,
      price: s.price ?? null,
    }));
  }, [serviciosApi]);

  const whatsapp = WhatsappHref({ message: "Hola! Quiero consultar por sus servicios." });
  const chip = (active) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
      active ? "border-brand bg-brand text-white" : "border-line bg-paper text-ink-soft hover:border-ink/30 hover:text-ink"
    }`;

  return (
    <section className="section bg-cream">
      <div className="container-x">
        <header className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Servicios</span>
          <h1 className="heading-xl mt-4">Soluciones para que tu negocio crezca en internet</h1>
          <p className="lead mt-4">
            Webs, Google, tiendas online, campañas y sistemas a medida. Elegí lo que necesitás o
            escribinos y te asesoramos.
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Filtrar por categoría">
            <button type="button" onClick={() => setSelectedCategory("all")} className={chip(selectedCategory === "all")} aria-pressed={selectedCategory === "all"}>
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(String(cat.id))}
                className={chip(selectedCategory === String(cat.id))}
                aria-pressed={selectedCategory === String(cat.id)}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
          <label className="relative block lg:w-80">
            <span className="sr-only">Buscar servicios</span>
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar un servicio..."
              className="field rounded-full pl-11"
            />
          </label>
        </div>

        <p className="mt-6 text-sm text-subtle" aria-live="polite">
          {isLoading ? "Cargando servicios..." : `${servicios.length} ${servicios.length === 1 ? "servicio" : "servicios"}`}
        </p>

        {error && !servicios.length && (
          <p className="mt-6 rounded-2xl bg-sand p-6 text-center">No pudimos cargar los servicios. Probá de nuevo en un rato.</p>
        )}

        {isLoading ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-2xl bg-sand" />)}
          </div>
        ) : servicios.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((item) => (
              <ServicioCard key={item.slug} item={item} headingLevel="h2" />
            ))}
          </div>
        ) : (
          !error && (
            <div className="mt-6 rounded-2xl border border-dashed border-line p-12 text-center">
              <p className="font-display text-lg font-bold text-ink">No encontramos servicios con ese filtro</p>
              <p className="mt-1 text-sm">Probá con otra búsqueda o escribinos y te ayudamos.</p>
            </div>
          )
        )}

        <div className="mt-16 rounded-3xl bg-paper p-8 text-center shadow-soft sm:p-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">¿No sabés qué necesitás?</h2>
          <p className="lead mx-auto mt-3 max-w-xl">Contanos de tu negocio y te recomendamos por dónde empezar. Sin compromiso.</p>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
            <MessageCircle size={18} /> Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
