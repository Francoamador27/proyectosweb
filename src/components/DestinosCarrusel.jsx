import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import DestinoCard from "./DestinoCard";

// ── Animación letra a letra ──────────────────────────────────────────────────
function AnimatedLetters({ text, baseDelay = 0, className = "", gradient = false }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="letter-reveal inline-block"
          style={{
            animationDelay: `${baseDelay + i * 50}ms`,
            ...(gradient && char !== " "
              ? {
                  background: "linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }
              : {}),
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// ── Texto con reveal por palabras ────────────────────────────────────────────
function AnimatedWords({ text, baseDelay = 0, className = "" }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word-reveal inline-block"
          style={{ animationDelay: `${baseDelay + i * 80}ms` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

// ── Contador numérico animado ────────────────────────────────────────────────
function CountUp({ target, suffix = "", duration = 1200 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 40;
          const step = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= target) { setVal(target); clearInterval(interval); }
            else setVal(Math.floor(current));
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function DestinosCarrusel() {
  const [categorias, setCategorias] = useState([]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  const fetcher = (url) => clienteAxios(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR("/api/servicios-categorias", fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!data) return;
    const items = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
    setCategorias(items);
  }, [data]);

  // Trigger animaciones del header cuando entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Loading skeleton tech ─────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: "#050a14" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="h-4 w-40 mx-auto rounded-full" style={{ background: "rgba(0,212,255,0.1)" }} />
            <div className="h-12 w-80 mx-auto rounded-xl" style={{ background: "rgba(0,212,255,0.06)" }} />
            <div className="h-4 w-64 mx-auto rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[280px] rounded-2xl animate-pulse"
                style={{
                  background: "rgba(0,212,255,0.04)",
                  border: "1px solid rgba(0,212,255,0.08)",
                  animationDelay: `${i * 150}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || categorias.length === 0) return null;

  return (
    <section
      className="relative py-24 px-6 lg:px-20 overflow-hidden"
      style={{ background: "#050a14" }}
    >
      {/* ── Estilos de animación ── */}
      <style>{`
        /* Letra a letra */
        @keyframes letterReveal {
          0%   { opacity: 0; transform: translateY(24px) rotateX(-40deg); filter: blur(4px); }
          60%  { opacity: 0.8; filter: blur(0px); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg); filter: blur(0px); }
        }
        .letter-reveal {
          opacity: 0;
          animation: letterReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Palabra a palabra */
        @keyframes wordReveal {
          0%   { opacity: 0; transform: translateY(16px); filter: blur(3px); }
          100% { opacity: 1; transform: translateY(0);    filter: blur(0px); }
        }
        .word-reveal {
          opacity: 0;
          animation: wordReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Fade desde abajo para bloques */
        @keyframes blockFadeUp {
          0%   { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .block-fade-up {
          opacity: 0;
          animation: blockFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Fade desde izquierda */
        @keyframes fadeLeft {
          0%   { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .fade-left { opacity: 0; animation: fadeLeft 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

        /* Línea de scan animada */
        @keyframes scanRight {
          0%   { transform: translateX(-100%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(300%); opacity: 0; }
        }
        .scan-line { animation: scanRight 2.4s ease-in-out 0.8s forwards; }

        /* Blink cursor */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .cursor-blink { animation: blink 0.9s step-end infinite; }

        /* Glow pulse en divisor */
        @keyframes dotGlow {
          0%, 100% { box-shadow: 0 0 6px rgba(0,212,255,0.7); }
          50%       { box-shadow: 0 0 16px rgba(0,212,255,1), 0 0 28px rgba(0,212,255,0.4); }
        }
        .dot-glow { animation: dotGlow 2s ease-in-out infinite; }

        /* Cards stagger */
        @keyframes cardReveal {
          0%   { opacity: 0; transform: translateY(40px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0)  scale(1); }
        }
        .card-reveal {
          opacity: 0;
          animation: cardReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Badge entrada */
        @keyframes badgeIn {
          0%   { opacity: 0; transform: scale(0.85) translateY(-8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .badge-in { opacity: 0; animation: badgeIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        /* Hover scan vertical en cards */
        @keyframes vertScan {
          0%   { top: -10%; opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.4; }
          100% { top: 110%; opacity: 0; }
        }
        .vert-scan { animation: vertScan 1.4s ease-in-out; }

        /* Stats slide-in */
        @keyframes statIn {
          0%   { opacity: 0; transform: translateX(-12px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .stat-in { opacity: 0; animation: statIn 0.5s ease-out forwards; }
      `}</style>

      {/* ── Grid de fondo ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Glows ambiente ── */}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(0,212,255,0.055)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(59,130,246,0.06)" }}
      />

      {/* ── Línea de acento top ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ══════════════ HEADER ══════════════ */}
        <div ref={headerRef} className="text-center mb-20">

          {/* Badge */}
          {headerVisible && (
            <div
              className="badge-in inline-flex items-center gap-2 mb-7 px-5 py-2 rounded-full"
              style={{
                border: "1px solid rgba(0,212,255,0.3)",
                background: "rgba(0,212,255,0.07)",
                backdropFilter: "blur(8px)",
                animationDelay: "0ms",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
                style={{ boxShadow: "0 0 6px #00d4ff" }}
              />
              <span className="text-cyan-300 text-xs font-mono tracking-widest uppercase">
                GrupoBits · Stack Tecnológico
              </span>
              <span className="cursor-blink text-cyan-400 font-mono text-sm leading-none">_</span>
            </div>
          )}

          {/* Título animado letra a letra */}
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 relative inline-block">
            {headerVisible && (
              <>
                <AnimatedLetters text="Nuestras " baseDelay={100} className="inline-block" />

                {/* Línea de scan que cruza la palabra */}
                <span className="relative inline-block overflow-hidden">
                  <AnimatedLetters
                    text="Soluciones"
                    baseDelay={550}
                    gradient
                    className="relative z-10"
                  />
                  <span
                    className="scan-line absolute top-0 bottom-0 w-12 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
                      left: 0,
                    }}
                  />
                </span>
              </>
            )}
          </h2>

          {/* Subtítulo con reveal por palabras */}
          <p
            className="max-w-2xl mx-auto text-lg leading-relaxed mb-2"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {headerVisible && (
              <AnimatedWords
                text="Conoce las tecnologías y servicios que transforman negocios"
                baseDelay={900}
              />
            )}
          </p>

          {/* Divisor animado */}
          {headerVisible && (
            <div
              className="block-fade-up mt-10 flex items-center justify-center gap-3"
              style={{ animationDelay: "1100ms" }}
            >
              <div
                className="h-px w-24 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, #00d4ff)" }}
              />
              <div
                className="w-2.5 h-2.5 rounded-full bg-cyan-400 dot-glow"
              />
              <div
                className="h-px w-24 rounded-full"
                style={{ background: "linear-gradient(90deg, #00d4ff, transparent)" }}
              />
            </div>
          )}

          {/* Stats tech */}
          {headerVisible && categorias.length > 0 && (
            <div
              className="block-fade-up mt-10 inline-flex items-center gap-8 px-8 py-4 rounded-2xl"
              style={{
                animationDelay: "1250ms",
                background: "rgba(0,212,255,0.04)",
                border: "1px solid rgba(0,212,255,0.1)",
              }}
            >
              {[
                { label: "Categorías", value: categorias.length, suffix: "+" },
                { label: "Tecnologías", value: 12, suffix: "+" },
                { label: "Proyectos", value: 50, suffix: "+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="stat-in text-center"
                  style={{ animationDelay: `${1300 + i * 120}ms` }}
                >
                  <div
                    className="text-2xl font-black font-mono"
                    style={{ color: "#00d4ff" }}
                  >
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ══════════════ GRID DE CARDS ══════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categorias.map((categoria, idx) => (
            <div
              key={categoria.id}
              className="card-reveal"
              style={{ animationDelay: `${idx * 140}ms` }}
            >
              <DestinoCard categoria={categoria} />
            </div>
          ))}
        </div>

        {/* ══════════════ CTA ══════════════ */}
        <div className="text-center mt-14">
          <Link
            to="/servicios"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl font-black text-sm transition-all duration-300 hover:-translate-y-1 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #3b82f6)",
              color: "#050a14",
              boxShadow: "0 0 24px rgba(0,212,255,0.3), 0 4px 20px rgba(59,130,246,0.2)",
            }}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            VER TODOS LOS SERVICIOS
          </Link>

          <p className="mt-4 text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
            Desarrollo · Cloud · Integraciones · SEO
          </p>
        </div>
      </div>
    </section>
  );
}
