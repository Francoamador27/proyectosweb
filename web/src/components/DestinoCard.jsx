"use client";
import { ArrowRight, Layers } from "lucide-react";
import { Link } from "@/lib/router";

/** Tarjeta de categoría de servicios. Lleva a /servicios filtrado. */
export default function DestinoCard({ categoria }) {
  return (
    <Link
      to={`/servicios?categoria=${categoria.id}`}
      className="ui-card-hover group flex h-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="aspect-[16/9] overflow-hidden bg-sand">
        {categoria.imagen ? (
          <img
            src={categoria.imagen}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-brand/40">
            <Layers size={36} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold">{categoria.nombre}</h3>
        {categoria.descripcion && <p className="mt-2 line-clamp-3 flex-1 text-sm">{categoria.descripcion}</p>}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
          Ver servicios <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
