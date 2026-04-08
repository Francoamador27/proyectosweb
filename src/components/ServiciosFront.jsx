import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./Posts/TiptapEditor.css";
import { Link } from "react-router-dom";
import WhatsappHref from "../utils/WhatsappUrl";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import SEOHead from "./Head/Head";
import useCont from "../hooks/useCont";

// ✅ Swiper (slider)
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// ✅ CSS Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Iconos SVG tech para el fallback
const TECH_ICONS = {
  web: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
    </svg>
  ),
  mobile: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15h3" />
    </svg>
  ),
  cloud: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  api: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  design: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  seo: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

export default function ServiciosSwiper() {
  const [visibleCards, setVisibleCards] = useState(() => new Set());
  const [serviciosApi, setServiciosApi] = useState([]);

  const fetcher = (url) => clienteAxios(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    "/api/servicios?sort=position&dir=asc&per_page=1000",
    fetcher,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (!data) return;
    const items = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];
    setServiciosApi(items);
  }, [data]);

  // ---- Fallback tech ----
  const serviciosFallback = useMemo(
    () => [
      {
        iconKey: "web",
        titulo: "Desarrollo Web",
        descripcion:
          "Construimos sitios y aplicaciones web modernas, rápidas y escalables con las últimas tecnologías.",
        highlight: "Full Stack",
      },
      {
        iconKey: "mobile",
        titulo: "Apps Móviles",
        descripcion:
          "Desarrollamos aplicaciones nativas e híbridas para iOS y Android con experiencia de usuario premium.",
        highlight: "iOS & Android",
      },
      {
        iconKey: "cloud",
        titulo: "Cloud & DevOps",
        descripcion:
          "Arquitectura en la nube, CI/CD, infraestructura escalable y despliegue continuo para tu negocio.",
        highlight: "AWS · GCP · Azure",
      },
      {
        iconKey: "api",
        titulo: "APIs & Integraciones",
        descripcion:
          "Diseñamos APIs REST y GraphQL robustas e integramos sistemas para automatizar tus procesos.",
        highlight: "REST · GraphQL",
      },
      {
        iconKey: "design",
        titulo: "UI/UX Design",
        descripcion:
          "Creamos interfaces intuitivas y atractivas que convierten visitantes en clientes satisfechos.",
        highlight: "Figma · Tailwind",
      },
      {
        iconKey: "seo",
        titulo: "SEO & Performance",
        descripcion:
          "Optimizamos tu presencia digital para que aparezcas primero en Google y conviertas más.",
        highlight: "Core Web Vitals",
      },
    ],
    []
  );

  const servicios = useMemo(() => {
    const base = serviciosApi?.length ? serviciosApi : serviciosFallback;
    return base.map((s) => ({
      iconKey: s.iconKey ?? null,
      icon: s.icon ?? null,
      titulo: s.titulo ?? s.title ?? "Servicio especializado",
      descripcion: s.descripcion ?? s["description"] ?? "",
      highlight: s.highlight ?? s.tagline ?? "",
      slug: s.slug ?? (s.titulo ?? s.title ?? "").toLowerCase().replace(/\s+/g, "-"),
      image: s.image ?? null,
    }));
  }, [serviciosApi, serviciosFallback]);

  const markSwiperVisible = useCallback((swiper) => {
    if (!swiper) return;
    setVisibleCards((prev) => {
      const next = new Set(prev);
      const slidesPerView = swiper.params.slidesPerView === "auto"
        ? swiper.slides.length
        : swiper.params.slidesPerView || 1;
      const activeIndex = swiper.activeIndex || 0;
      const numVisible = typeof slidesPerView === "number" ? Math.ceil(slidesPerView) : 1;
      for (let i = 0; i < numVisible; i++) {
        const index = activeIndex + i;
        if (index < swiper.slides.length) next.add(String(index));
      }
      return next;
    });
  }, []);

  const { company } = useCont();

  // ✅ Card tech
  const ServicioCard = ({ item, idx }) => {
    const isVisible = visibleCards.has(String(idx));

    return (
      <div
        data-index={idx}
        className={`group relative h-[380px] rounded-2xl overflow-hidden transform transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
          border: "1px solid rgba(0,212,255,0.15)",
          boxShadow: "0 0 0 1px rgba(0,212,255,0.05), 0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Imagen de fondo (si viene de API) */}
        {item.image && (
          <div className="absolute inset-0 z-0">
            <img
              src={item.image}
              alt={item.titulo}
              className="w-full h-full object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-30"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/80 to-[#050a14]/40" />
          </div>
        )}

        {/* Glow hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(0,212,255,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Línea superior de acento */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-all duration-500 group-hover:opacity-100 opacity-50"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,212,255,0.8), transparent)",
          }}
        />

        {/* Contenido */}
        <div className="relative z-10 h-full flex flex-col p-8">
          {/* Badge */}
          {item.highlight && (
            <div className="mb-6">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.25)",
                  color: "#00d4ff",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {item.highlight}
              </span>
            </div>
          )}

          {/* Icono */}
          <div
            className="mb-6 w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "#00d4ff",
              boxShadow: "0 0 20px rgba(0,212,255,0.1)",
            }}
          >
            {item.iconKey && TECH_ICONS[item.iconKey]
              ? TECH_ICONS[item.iconKey]
              : item.icon
              ? <span className="text-3xl">{item.icon}</span>
              : TECH_ICONS.web}
          </div>

          {/* Título */}
          <h3 className="text-xl font-black text-white mb-3 tracking-tight">
            {item.titulo}
          </h3>

          {/* Descripción */}
          <div
            className="rich-content-preview text-sm leading-relaxed flex-1 max-h-[5rem] overflow-hidden relative"
            style={{
              color: "rgba(255,255,255,0.55)",
              maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
            }}
            dangerouslySetInnerHTML={{ __html: item.descripcion || "" }}
          />

          {/* CTA */}
          <div className="mt-6 flex items-center gap-2 opacity-0 transform translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#00d4ff" }}>
              Ver más
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#00d4ff"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
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

  return (
    <section
      className="relative py-24 px-6 lg:px-20 overflow-hidden"
      style={{ background: "#050a14" }}
    >
      <SEOHead
        priority="high"
        title={`${company?.name ?? "GrupoBits"} | Nuestros Servicios`}
        description="Soluciones tecnológicas a medida: desarrollo web, apps móviles, cloud, APIs, diseño UI/UX y más."
      />

      <style>{`
        .servicios-grid-overlay {
          background-image:
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .servicios-swiper .swiper-button-next,
        .servicios-swiper .swiper-button-prev {
          width: 40px; height: 40px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(12px);
          border-radius: 50%;
          border: 1.5px solid rgba(0,212,255,0.3);
          top: 44%;
          box-shadow: 0 0 12px rgba(0,212,255,0.15);
          transition: all 0.25s;
        }
        .servicios-swiper .swiper-button-next:hover,
        .servicios-swiper .swiper-button-prev:hover {
          background: rgba(0,212,255,0.12);
          border-color: rgba(0,212,255,0.8);
          box-shadow: 0 0 20px rgba(0,212,255,0.35);
        }
        .servicios-swiper .swiper-button-next::after,
        .servicios-swiper .swiper-button-prev::after {
          font-size: 12px; color: #00d4ff; font-weight: 900;
        }
        .servicios-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.25); opacity: 1;
          transition: all 0.3s; border-radius: 999px;
        }
        .servicios-swiper .swiper-pagination-bullet-active {
          width: 24px; background: #00d4ff;
          box-shadow: 0 0 8px rgba(0,212,255,0.7);
        }
      `}</style>

      {/* Fondo grid */}
      <div className="absolute inset-0 servicios-grid-overlay opacity-100" />

      {/* Glows ambiente */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(0,212,255,0.05)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(59,130,246,0.06)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          {/* Etiqueta tech */}
          <div
            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full"
            style={{
              border: "1px solid rgba(0,212,255,0.3)",
              background: "rgba(0,212,255,0.07)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs font-mono tracking-widest uppercase">
              GrupoBits · Tecnología
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Nuestros{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(90deg, #00d4ff, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Servicios
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            En <strong style={{ color: "#00d4ff" }}>{company?.name ?? "GrupoBits"}</strong> transformamos
            ideas en soluciones digitales de alto impacto. Tecnología de vanguardia para llevar tu
            negocio al siguiente nivel.
          </p>

          {/* Divisor */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <div
              className="h-px w-24 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #00d4ff)" }}
            />
            <div className="w-2 h-2 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 8px #00d4ff" }} />
            <div
              className="h-px w-24 rounded-full"
              style={{ background: "linear-gradient(90deg, #00d4ff, transparent)" }}
            />
          </div>
        </div>

        {/* Estado de carga / error */}
        {isLoading && (
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-cyan-400/70 font-mono text-sm animate-pulse">
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
            className="text-center mb-12 p-4 rounded-xl text-sm font-mono"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
          >
            No pudimos cargar los servicios. Por favor, reintenta más tarde.
          </div>
        )}

        {/* Slider */}
        <div className="mb-20">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            breakpoints={{
              0:    { slidesPerView: 1,   spaceBetween: 12 },
              640:  { slidesPerView: 1,   spaceBetween: 14 },
              768:  { slidesPerView: 2,   spaceBetween: 16 },
              1024: { slidesPerView: 3,   spaceBetween: 18 },
              1280: { slidesPerView: 4,   spaceBetween: 20 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: true }}
            loop={true}
            style={{ paddingBottom: "44px" }}
            className="servicios-swiper"
            onSwiper={(swiper) => markSwiperVisible(swiper)}
            onSlideChange={(swiper) => markSwiperVisible(swiper)}
          >
            {servicios.map((item, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <div className="h-full">
                  <ServicioCard item={item} idx={idx} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA Final */}
        <div
          className="max-w-4xl mx-auto rounded-2xl p-12 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)",
            border: "1px solid rgba(0,212,255,0.2)",
            boxShadow: "0 0 60px rgba(0,212,255,0.08), 0 0 0 1px rgba(0,212,255,0.05)",
          }}
        >
          {/* Grid interior */}
          <div className="absolute inset-0 servicios-grid-overlay opacity-50" />

          {/* Línea superior */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)" }}
          />

          {/* Glow centro */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: "rgba(0,212,255,0.05)" }}
          />

          <div className="relative z-10">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
              style={{
                border: "1px solid rgba(0,212,255,0.3)",
                background: "rgba(0,212,255,0.08)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 text-xs font-mono tracking-widest uppercase">
                ¿Tenés un proyecto?
              </span>
            </div>

            <h4 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">
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

            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
              Consultanos sobre nuestros servicios, tiempos y presupuestos. Respondemos rápido.
            </p>

            <a
              href={WhatsappHref({
                message: `Hola, vengo desde la web de ${company?.name ?? "GrupoBits"} y me gustaría consultar sobre sus servicios tecnológicos.`,
              })}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-black text-base transition-all duration-300 hover:-translate-y-1 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #3b82f6)",
                color: "#050a14",
                boxShadow: "0 0 24px rgba(0,212,255,0.3), 0 4px 20px rgba(59,130,246,0.25)",
              }}
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              CONSULTAR POR WHATSAPP
            </a>
          </div>
        </div>

        {/* Footer de sección */}
        <div className="mt-12 text-center font-mono text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
          <p>Desarrollo · Diseño · Cloud · Integraciones · SEO</p>
        </div>
      </div>
    </section>
  );
}
