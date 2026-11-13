"use client";
/** Home: trabajos recientes (primeros 3 proyectos del portafolio). */
import useSWR from "swr";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import clienteAxios from "../config/axios";
import PortafolioCard from "./PortafolioCard";

export default function PortafolioCarrusel() {
  const { data, isLoading: swrIsLoading } = useSWR(
    "/api/portafolios",
    (url) => clienteAxios(url).then((r) => r.data),
    { revalidateOnFocus: false }
  );
  const isLoading = swrIsLoading && data === undefined;
  const proyectos = (Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []).slice(0, 3);

  if (!isLoading && proyectos.length === 0) return null;

  return (
    <section className="section bg-paper" aria-labelledby="trabajos-titulo">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Trabajos recientes</span>
            <h2 id="trabajos-titulo" className="heading-lg mt-4">
              Negocios que ya confían en nosotros
            </h2>
          </div>
          <Link to="/portafolio" className="btn-secondary shrink-0 self-start sm:self-auto">
            Ver portafolio <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-96 animate-pulse rounded-2xl bg-sand" />)
            : proyectos.map((p) => <PortafolioCard key={p.id} proyecto={p} />)}
        </div>
      </div>
    </section>
  );
}
