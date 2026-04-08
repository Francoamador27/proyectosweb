import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import WhatsappHref from "../utils/WhatsappUrl";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import SEOHead from "./Head/Head";
import useCont from "../hooks/useCont";
import { ServicioCard } from "./Cards/ServicioCard";

export default function ServiciosGrid() {
  const [searchParams] = useSearchParams();
  const [serviciosApi, setServiciosApi] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const categoriaParam = searchParams.get("categoria");
    if (categoriaParam) setSelectedCategory(categoriaParam);
  }, [searchParams]);

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

  const { data, error, isLoading } = useSWR(serviciosUrl, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!dataCategorias) return;
    const items = Array.isArray(dataCategorias?.data)
      ? dataCategorias.data
      : Array.isArray(dataCategorias)
      ? dataCategorias
      : [];
    setCategorias(items);
  }, [dataCategorias]);

  useEffect(() => {
    if (!data) return;
    const items = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];
    setServiciosApi(items);
  }, [data]);

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

  const { company } = useCont();

  return (
    <section className="relative bg-white py-12 lg:py-16 px-6 lg:px-20 overflow-hidden">
      <SEOHead
        priority="high"
        title={`${company?.name ?? "GrupoBits"} | Nuestros Servicios`}
        description="Soluciones tecnológicas a medida: desarrollo de sistemas, software, hardware y marketing digital."
      />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.55s ease-out; }

        .sg-filter-btn-active {
          background: linear-gradient(135deg, #00d4ff, #0891b2) !important;
          color: #fff !important;
          border-color: transparent !important;
          box-shadow: 0 0 12px rgba(0,212,255,0.25);
        }
        .sg-filter-btn {
          background: #fff;
          color: #475569;
          border: 1px solid rgba(8,145,178,0.15);
          transition: all 0.2s;
        }
        .sg-filter-btn:hover:not(.sg-filter-btn-active) {
          background: #f0f9ff;
          border-color: rgba(8,145,178,0.3);
          color: #0891b2;
        }
        .sg-search-input:focus {
          border-color: #00d4ff !important;
          box-shadow: 0 0 0 3px rgba(0,212,255,0.12) !important;
          outline: none;
        }
      `}</style>

      {/* Glows de fondo muy suaves sobre blanco */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(0,212,255,0.04)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(59,130,246,0.04)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10 lg:mb-14">
          <div
            className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full"
            style={{
              border: "1px solid rgba(8,145,178,0.25)",
              background: "rgba(0,212,255,0.05)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"
              style={{ boxShadow: "0 0 6px rgba(0,212,255,0.8)" }}
            />
            <span className="text-cyan-600 text-xs font-mono tracking-widest uppercase">
              {company?.name ?? "GrupoBits"} · Tecnología
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Nuestros{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #00d4ff, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Servicios
            </span>
          </h2>

          <p className="text-slate-500 mx-auto max-w-2xl text-sm md:text-base leading-relaxed">
            En <strong className="text-cyan-600">{company?.name ?? "GrupoBits"}</strong> acompañamos
            a las empresas en su transformación digital con soluciones de desarrollo, software,
            hardware y marketing.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <div
              className="h-px w-20 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #00d4ff)" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-cyan-400"
              style={{ boxShadow: "0 0 6px rgba(0,212,255,0.7)" }}
            />
            <div
              className="h-px w-20 rounded-full"
              style={{ background: "linear-gradient(90deg, #00d4ff, transparent)" }}
            />
          </div>
        </div>

        {/* ── Layout sidebar + grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">

              {/* Búsqueda */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(8,145,178,0.12)",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
                  >
                    <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-black text-slate-800 tracking-tight">Buscar</span>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nombre o descripción..."
                  className="sg-search-input w-full px-3 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-400 transition-all"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid rgba(8,145,178,0.15)",
                  }}
                />
              </div>

              {/* Categorías */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(8,145,178,0.12)",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
                  >
                    <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <span className="text-sm font-black text-slate-800 tracking-tight">Categorías</span>
                </div>

                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={`sg-filter-btn w-full px-3 py-2 text-xs font-bold rounded-xl text-left ${
                      selectedCategory === "all" ? "sg-filter-btn-active" : ""
                    }`}
                  >
                    Todos los servicios
                  </button>
                  {categorias.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(String(cat.id))}
                      className={`sg-filter-btn w-full px-3 py-2 text-xs font-bold rounded-xl text-left ${
                        selectedCategory === String(cat.id) ? "sg-filter-btn-active" : ""
                      }`}
                    >
                      {cat.nombre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contador */}
              <div
                className="rounded-2xl px-5 py-4"
                style={{
                  background: "rgba(0,212,255,0.04)",
                  border: "1px solid rgba(8,145,178,0.12)",
                }}
              >
                <p className="text-xs font-mono text-slate-500">
                  <span className="font-black text-cyan-600" style={{ fontSize: "1.1rem" }}>
                    {servicios.length}
                  </span>{" "}
                  servicios disponibles
                </p>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3">

            {isLoading && (
              <div className="flex items-center justify-center py-16">
                <span className="inline-flex items-center gap-2 text-cyan-500 font-mono text-sm animate-pulse">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Cargando servicios...
                </span>
              </div>
            )}

            {error && (
              <div
                className="mb-8 p-4 rounded-xl text-sm font-mono text-center"
                style={{
                  background: "rgba(239,68,68,0.05)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#dc2626",
                }}
              >
                No pudimos cargar los servicios. Por favor, reintenta más tarde.
              </div>
            )}

            {!isLoading && servicios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicios.map((item, idx) => (
                  <ServicioCard key={idx} item={item} idx={idx} />
                ))}
              </div>
            ) : (
              !isLoading && (
                <div
                  className="flex flex-col items-center justify-center py-16 rounded-2xl text-center"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid rgba(8,145,178,0.1)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}
                  >
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black text-slate-800 mb-1">No se encontraron servicios</h3>
                  <p className="text-slate-500 text-sm">Intenta ajustar tus filtros de búsqueda</p>
                </div>
              )
            )}
          </main>
        </div>

        {/* ── CTA Final ── */}
        <div
          className="max-w-3xl mx-auto rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid rgba(8,145,178,0.18)",
            boxShadow: "0 4px 40px rgba(0,212,255,0.07), 0 0 0 1px rgba(8,145,178,0.06)",
          }}
        >
          {/* Grid decorativo sutil */}
          <div
            className="absolute inset-0 rounded-2xl opacity-50 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(8,145,178,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Línea top */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, transparent, #00d4ff, #3b82f6, transparent)" }}
          />

          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
              style={{
                border: "1px solid rgba(8,145,178,0.2)",
                background: "rgba(0,212,255,0.05)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-cyan-600 text-xs font-mono tracking-widest uppercase">
                ¿Tenés un proyecto?
              </span>
            </div>

            <h4 className="text-2xl lg:text-3xl font-black text-slate-900 mb-3 tracking-tight">
              Llevemos tu idea al{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00d4ff, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                siguiente nivel
              </span>
            </h4>

            <p className="text-slate-500 text-sm lg:text-base mb-8 max-w-md mx-auto leading-relaxed">
              Consultanos sobre nuestros servicios, tiempos y presupuestos. Respondemos rápido.
            </p>

            <a
              href={WhatsappHref({
                message: `Hola, vengo desde la web de ${company?.name ?? "GrupoBits"} y me gustaría consultar sobre sus servicios tecnológicos.`,
              })}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-black text-sm transition-all duration-300 hover:-translate-y-1 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #0891b2)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(0,212,255,0.25), 0 4px 16px rgba(8,145,178,0.2)",
              }}
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              CONSULTAR POR WHATSAPP
            </a>
          </div>
        </div>

        <div className="mt-8 text-center font-mono text-xs tracking-widest uppercase text-slate-300">
          Desarrollo · Software · Hardware · Marketing Digital
        </div>
      </div>
    </section>
  );
}
