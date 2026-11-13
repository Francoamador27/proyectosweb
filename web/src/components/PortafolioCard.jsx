"use client";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import { portafolioImage, stripHtml } from "../utils/portafolioImage";

export default function PortafolioCard({ proyecto, headingLevel = "h3" }) {
  const Heading = headingLevel;
  const categoria = proyecto.categoria?.nombre ?? (typeof proyecto.categoria === "string" ? proyecto.categoria : null);
  const descripcion = stripHtml(proyecto.descripcion ?? "").slice(0, 130).replace(/\s+\S*$/, "");

  return (
    <article className="ui-card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        {proyecto.imagen && (
          <img
            src={portafolioImage(proyecto.imagen)}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        {categoria && (
          <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-3 py-1 text-xs font-bold text-ink shadow-soft">
            {categoria}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-lg font-bold leading-snug">{proyecto.titulo}</Heading>
        {descripcion && <p className="mt-2 flex-1 text-sm leading-relaxed">{descripcion}…</p>}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-[gap] group-hover:gap-2.5">
          Ver el proyecto <ArrowRight size={16} />
        </span>
      </div>
      <Link
        to={`/portafolio/${proyecto.id}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        aria-label={`Ver el proyecto ${proyecto.titulo}`}
      />
    </article>
  );
}
