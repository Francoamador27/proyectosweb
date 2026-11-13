"use client";
import { Link } from "@/lib/router";
import { ArrowRight, Sparkles } from "lucide-react";

// Texto plano para el extracto (la descripción viene como HTML del CMS)
export const plainText = (html = "", max = 140) => {
  const t = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max).replace(/\s+\S*$/, "")}…` : t;
};

export const ServicioCard = ({ item, headingLevel = "h3" }) => {
  const Heading = headingLevel;
  return (
    <article className="ui-card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand/40">
            <Sparkles size={40} />
          </div>
        )}
        {item.highlight && (
          <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-3 py-1 text-xs font-bold text-brand-strong shadow-soft">
            {item.highlight}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-lg font-bold leading-snug">{item.titulo}</Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed">{plainText(item.descripcion)}</p>

        {item.price && <p className="mt-4 font-display text-lg font-bold text-ink">${item.price}</p>}

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-[gap] group-hover:gap-2.5">
          Ver detalles <ArrowRight size={16} />
        </span>
      </div>

      <Link
        to={`/servicios/${item.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        aria-label={`Ver detalles de ${item.titulo}`}
      />
    </article>
  );
};
