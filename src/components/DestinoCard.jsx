import React, { useState } from "react";
import { Link } from "react-router-dom";
import TiltedCard from "./TiltedCard";

export default function DestinoCard({ categoria }) {
  const [scanning, setScanning] = useState(false);

  const slug =
    categoria.nombre?.toLowerCase().replace(/\s+/g, "-") || categoria.id;

  return (
    <Link to={`/servicios?categoria=${categoria.id}`} className="block group">
      <div
        className="relative h-[280px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)",
          border: "1px solid rgba(0,212,255,0.12)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3), 0 0 0 0 rgba(0,212,255,0)",
          transition: "box-shadow 0.4s, border-color 0.4s, transform 0.4s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 12px 48px rgba(0,0,0,0.5), 0 0 32px rgba(0,212,255,0.15)";
          e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
          e.currentTarget.style.transform = "translateY(-4px)";
          setScanning(true);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 4px 24px rgba(0,0,0,0.3), 0 0 0 0 rgba(0,212,255,0)";
          e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)";
          e.currentTarget.style.transform = "translateY(0)";
          setScanning(false);
        }}
      >
        {/* ── Grid overlay interior ── */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* ── Imagen de fondo ── */}
        {categoria.imagen ? (
          <div className="absolute inset-0 z-0">
            <TiltedCard
              imageSrc={categoria.imagen}
              altText={categoria.nombre}
              captionText={categoria.nombre}
              containerHeight="280px"
              containerWidth="100%"
              imageHeight="280px"
              imageWidth="100%"
              rotateAmplitude={6}
              scaleOnHover={1.06}
              showMobileWarning={false}
              displayOverlayContent={false}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(135deg, #0a1628 0%, #0e2440 50%, #0a1628 100%)",
            }}
          />
        )}

        {/* ── Overlay degradado ── */}
        <div
          className="absolute inset-0 z-10 transition-all duration-500"
          style={{
            background: categoria.imagen
              ? "linear-gradient(to top, rgba(5,10,20,0.97) 0%, rgba(5,10,20,0.55) 50%, rgba(5,10,20,0.2) 100%)"
              : "linear-gradient(to top, rgba(5,10,20,0.98) 0%, rgba(5,10,20,0.6) 100%)",
          }}
        />

        {/* ── Línea de acento superior ── */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00d4ff, #3b82f6, transparent)",
          }}
        />

        {/* ── Scan vertical en hover ── */}
        {scanning && (
          <div
            className="absolute left-0 right-0 h-20 z-20 pointer-events-none vert-scan"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(0,212,255,0.06), transparent)",
            }}
          />
        )}

        {/* ── Corner decorations ── */}
        <div
          className="absolute top-3 left-3 w-4 h-4 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            borderTop: "1.5px solid #00d4ff",
            borderLeft: "1.5px solid #00d4ff",
            borderRadius: "2px 0 0 0",
          }}
        />
        <div
          className="absolute top-3 right-3 w-4 h-4 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            borderTop: "1.5px solid #00d4ff",
            borderRight: "1.5px solid #00d4ff",
            borderRadius: "0 2px 0 0",
          }}
        />
        <div
          className="absolute bottom-3 left-3 w-4 h-4 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            borderBottom: "1.5px solid #00d4ff",
            borderLeft: "1.5px solid #00d4ff",
            borderRadius: "0 0 0 2px",
          }}
        />
        <div
          className="absolute bottom-3 right-3 w-4 h-4 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            borderBottom: "1.5px solid #00d4ff",
            borderRight: "1.5px solid #00d4ff",
            borderRadius: "0 0 2px 0",
          }}
        />

        {/* ── Contenido ── */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-7">

          {/* ID / index decorativo */}
          <div
            className="mb-3 font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0"
            style={{ color: "rgba(0,212,255,0.5)" }}
          >
            // categoria.{categoria.id?.toString().padStart(3, "0")}
          </div>

          {/* Título */}
          <h3
            className="text-2xl font-black text-white mb-2 tracking-tight leading-tight transition-transform duration-400 group-hover:-translate-y-1"
          >
            {categoria.nombre}
          </h3>

          {/* Descripción */}
          {categoria.descripcion && (
            <p
              className="text-sm mb-5 line-clamp-2 leading-relaxed transition-all duration-400"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {categoria.descripcion}
            </p>
          )}

          {/* CTA */}
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-black tracking-widest uppercase transition-all duration-300 group-hover:tracking-[0.2em]"
              style={{ color: "#00d4ff" }}
            >
              Explorar
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "rgba(0,212,255,0.12)",
                border: "1px solid rgba(0,212,255,0.35)",
                boxShadow: "0 0 8px rgba(0,212,255,0.1)",
              }}
            >
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="#00d4ff"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Línea animada en hover */}
            <div
              className="flex-1 h-px opacity-0 group-hover:opacity-100 transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,212,255,0.5), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
