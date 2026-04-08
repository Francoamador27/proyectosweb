import { Link } from "react-router-dom";
import "../Posts/TiptapEditor.css";

export const ServicioCard = ({ item, idx }) => {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden opacity-0 animate-fadeInUp"
      style={{
        animationDelay: `${idx * 100}ms`,
        animationFillMode: "forwards",
        background: "#ffffff",
        border: "1px solid rgba(8,145,178,0.12)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0 rgba(0,212,255,0)",
        transition: "box-shadow 0.35s, border-color 0.35s, transform 0.35s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(8,145,178,0.25), 0 0 20px rgba(0,212,255,0.08)";
        e.currentTarget.style.borderColor = "rgba(8,145,178,0.35)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0 rgba(0,212,255,0)";
        e.currentTarget.style.borderColor = "rgba(8,145,178,0.12)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Línea de acento superior */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10"
        style={{
          background: "linear-gradient(90deg, transparent, #00d4ff, #3b82f6, transparent)",
        }}
      />

      {/* Imagen / Placeholder */}
      <div className="relative h-[176px] overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.titulo}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)",
            }}
          >
            {/* Grid sutil en placeholder */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(8,145,178,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <span
              className="text-5xl relative z-10 opacity-40 transition-all duration-500 group-hover:opacity-70 group-hover:scale-110"
            >
              {item.icon ?? "⚙️"}
            </span>
          </div>
        )}

        {/* Badge highlight */}
        {item.highlight && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(8,145,178,0.25)",
                color: "#0891b2",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="w-1 h-1 rounded-full bg-cyan-500"
                style={{ boxShadow: "0 0 4px rgba(0,212,255,0.8)" }}
              />
              {item.highlight}
            </span>
          </div>
        )}
      </div>

      {/* Cuerpo */}
      <div className="p-5">
        {/* Separador decorativo */}
        <div
          className="h-px mb-4 transition-all duration-500"
          style={{
            background: "linear-gradient(90deg, rgba(8,145,178,0.15), transparent)",
          }}
        />

        <h3 className="text-base font-black text-slate-900 mb-2 tracking-tight leading-snug">
          {item.titulo}
        </h3>

        <div
          className="rich-content-preview text-slate-500 text-xs leading-relaxed mb-4 max-h-[3rem] overflow-hidden relative"
          style={{
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
          dangerouslySetInnerHTML={{ __html: item.descripcion || "" }}
        />

        {item.price && (
          <div className="mb-4">
            <span
              className="text-sm font-black px-3 py-1 rounded-full"
              style={{
                background: "rgba(8,145,178,0.08)",
                color: "#0891b2",
                border: "1px solid rgba(8,145,178,0.2)",
              }}
            >
              ${item.price}
            </span>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 transition-all duration-300 group-hover:gap-3">
          <span
            className="text-[11px] font-black tracking-widest uppercase transition-colors duration-300"
            style={{ color: "#0891b2" }}
          >
            Ver detalles
          </span>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #0891b2)",
              boxShadow: "0 0 8px rgba(0,212,255,0.3)",
            }}
          >
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Link invisible */}
      <Link
        to={`/servicios/${item.slug}`}
        className="absolute inset-0 z-20 cursor-pointer"
        aria-label={`Ver detalles de ${item.titulo}`}
      />
    </div>
  );
};
