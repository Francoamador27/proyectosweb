"use client";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import clienteAxios from "../../config/axios";
import { formatFecha } from "../../utils/date";
import { stripHtml } from "../../utils/portafolioImage";

const fetcher = (url) => clienteAxios(url).then((res) => res.data);
const asList = (d) => (Array.isArray(d?.data) ? d.data : Array.isArray(d) ? d : []);

function PostCard({ post, destacado = false }) {
  const extracto = stripHtml(post.contenido || "").slice(0, destacado ? 260 : 140).replace(/\s+\S*$/, "");
  return (
    <article className={`ui-card-hover group relative flex h-full flex-col overflow-hidden ${destacado ? "lg:grid lg:grid-cols-2" : ""}`}>
      <div className={`overflow-hidden bg-sand ${destacado ? "aspect-[16/10] lg:aspect-auto" : "aspect-[16/10]"}`}>
        {post.imagen && (
          <img
            src={post.imagen}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading={destacado ? "eager" : "lazy"}
          />
        )}
      </div>
      <div className={`flex flex-1 flex-col ${destacado ? "p-8 lg:p-10" : "p-6"}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-subtle">
          {post.categoria?.nombre && (
            <span className="rounded-full bg-brand-soft px-2.5 py-0.5 font-bold text-brand-strong">{post.categoria.nombre}</span>
          )}
          <span className="inline-flex items-center gap-1">
            <Calendar size={13} /> {formatFecha(post.publicado_en ?? post.created_at)}
          </span>
        </div>
        <h2 className={`mt-3 font-bold leading-snug ${destacado ? "text-2xl sm:text-3xl" : "text-lg"}`}>{post.titulo}</h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed">{extracto}…</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-[gap] group-hover:gap-2.5">
          Leer artículo <ArrowRight size={16} />
        </span>
      </div>
      <Link
        to={`/blog/${post.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        aria-label={`Leer: ${post.titulo}`}
      />
    </article>
  );
}

export default function BlogList() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const { data: postsData, isLoading: swrIsLoading } = useSWR("/api/posts", fetcher);
  const isLoading = swrIsLoading && postsData === undefined;
  const { data: categoriasData } = useSWR("/api/posts-categorias", fetcher);

  const posts = useMemo(() => asList(postsData), [postsData]);
  const categorias = useMemo(() => asList(categoriasData), [categoriasData]);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return posts.filter((p) => {
      const okQ = !q || `${p.titulo} ${p.contenido || ""}`.toLowerCase().includes(q);
      const okC = !categoriaId || p.categoria_id === Number(categoriaId);
      return okQ && okC;
    });
  }, [posts, busqueda, categoriaId]);

  const sinFiltros = !busqueda && !categoriaId;
  const [destacado, ...resto] = filtrados;

  const chip = (active) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
      active ? "border-brand bg-brand text-white" : "border-line bg-paper text-ink-soft hover:border-ink/30 hover:text-ink"
    }`;

  return (
    <section className="section bg-cream">
      <div className="container-x">
        <header className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Blog</span>
          <h1 className="heading-xl mt-4">Ideas para que tu negocio crezca en internet</h1>
          <p className="lead mt-4">Guías simples sobre Google, webs y marketing, sin palabras raras.</p>
        </header>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0" role="group" aria-label="Filtrar por categoría">
            <button type="button" className={chip(!categoriaId)} onClick={() => setCategoriaId("")} aria-pressed={!categoriaId}>
              Todos
            </button>
            {categorias.map((c) => (
              <button
                key={c.id}
                type="button"
                className={chip(categoriaId === String(c.id))}
                onClick={() => setCategoriaId(String(c.id))}
                aria-pressed={categoriaId === String(c.id)}
              >
                {c.nombre}
              </button>
            ))}
          </div>
          <label className="relative block lg:w-80">
            <span className="sr-only">Buscar artículos</span>
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar un artículo..."
              className="field rounded-full pl-11"
            />
          </label>
        </div>

        {isLoading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-96 animate-pulse rounded-2xl bg-sand" />)}
          </div>
        ) : filtrados.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-line p-12 text-center">
            <p className="font-display text-lg font-bold text-ink">No encontramos artículos</p>
            <button type="button" className="btn-secondary mt-5" onClick={() => { setBusqueda(""); setCategoriaId(""); }}>
              Ver todos
            </button>
          </div>
        ) : (
          <>
            {sinFiltros && destacado && (
              <div className="mt-10">
                <PostCard post={destacado} destacado />
              </div>
            )}
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(sinFiltros ? resto : filtrados).map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
