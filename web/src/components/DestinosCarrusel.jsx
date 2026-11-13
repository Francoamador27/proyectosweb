"use client";
/** Home: categorías de servicios (desde /api/servicios-categorias). */
import useSWR from "swr";
import clienteAxios from "../config/axios";
import DestinoCard from "./DestinoCard";

export default function DestinosCarrusel() {
  const { data, error } = useSWR(
    "/api/servicios-categorias",
    (url) => clienteAxios(url).then((r) => r.data),
    { revalidateOnFocus: false, keepPreviousData: true }
  );
  const categorias = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];

  if (error || categorias.length === 0) return null;

  return (
    <section className="section bg-cream" aria-labelledby="areas-titulo">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Áreas</span>
          <h2 id="areas-titulo" className="heading-lg mt-4">¿En qué te podemos ayudar?</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <DestinoCard key={categoria.id} categoria={categoria} />
          ))}
        </div>
      </div>
    </section>
  );
}
