"use client";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import { useParams, Link } from "@/lib/router";
import clienteAxios from "../config/axios";
import WhatsappHref from "../utils/WhatsappUrl";
import { portafolioImage, stripHtml } from "../utils/portafolioImage";
import { demoteH1, isRichHtml } from "../utils/html";

export default function PortafolioDetail() {
  const { id } = useParams();
  const { data, isLoading: swrIsLoading } = useSWR(`/api/portafolios/${id}`, (url) => clienteAxios.get(url).then((r) => r.data), {
    revalidateOnFocus: false,
  });
  const loading = swrIsLoading && data === undefined;
  const proyecto = data?.data ?? null;

  if (loading) {
    return (
      <div className="container-x section" aria-busy="true">
        <div className="h-6 w-32 animate-pulse rounded-full bg-sand" />
        <div className="mt-6 h-14 w-2/3 animate-pulse rounded-xl bg-sand" />
        <div className="mt-10 aspect-[16/9] animate-pulse rounded-3xl bg-sand" />
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div className="container-x section text-center">
        <h1 className="heading-lg">Proyecto no encontrado</h1>
        <Link to="/portafolio" className="btn-secondary mt-6">Ver el portafolio</Link>
      </div>
    );
  }

  const imagenes = Array.from(
    new Set([proyecto.imagen, ...(Array.isArray(proyecto.galeria) ? proyecto.galeria.map((g) => g?.imagen) : [])].filter(Boolean))
  );
  const categoria = proyecto.categoria?.nombre ?? (typeof proyecto.categoria === "string" ? proyecto.categoria : null);
  const resumen = stripHtml(proyecto.descripcion ?? "");
  const whatsapp = WhatsappHref({ message: `Hola! Vi el proyecto "${proyecto.titulo}" y quiero algo parecido.` });

  return (
    <article className="bg-cream">
      <header className="container-x pt-10 sm:pt-14">
        <Link to="/portafolio" className="inline-flex items-center gap-1.5 text-sm font-semibold text-subtle transition-colors hover:text-ink">
          <ArrowLeft size={16} /> Portafolio
        </Link>
        <div className="mt-6 max-w-3xl">
          {categoria && <span className="eyebrow">{categoria}</span>}
          <h1 className="heading-xl mt-4">{proyecto.titulo}</h1>
          {resumen && <p className="lead mt-5">{resumen}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {proyecto.url && (
              <a href={proyecto.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Ver el sitio <ExternalLink size={16} />
              </a>
            )}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={proyecto.url ? "btn-secondary" : "btn-primary"}>
              <MessageCircle size={18} /> Quiero algo así
            </a>
          </div>
        </div>
      </header>

      {imagenes.length > 0 && (
        <div className="container-x mt-12">
          <style>{`
            .pf-gallery { --swiper-navigation-color: var(--color-ink); --swiper-pagination-color: var(--color-brand); --swiper-navigation-size: 18px; }
            .pf-gallery .swiper-button-next, .pf-gallery .swiper-button-prev {
              width: 44px; height: 44px; border-radius: 999px; background: rgb(255 255 255 / 0.92); box-shadow: var(--shadow-soft);
            }
          `}</style>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation={imagenes.length > 1}
            pagination={imagenes.length > 1 ? { clickable: true } : false}
            spaceBetween={16}
            className="pf-gallery overflow-hidden rounded-3xl bg-sand shadow-lift"
          >
            {imagenes.map((src, i) => (
              <SwiperSlide key={src}>
                <img
                  src={portafolioImage(src)}
                  alt={`${proyecto.titulo} — imagen ${i + 1}`}
                  className="aspect-[16/9] w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {proyecto.contenido && (
        <div className="container-x section">
          <div className="mx-auto max-w-3xl">
            {isRichHtml(proyecto.contenido) ? (
              <div className="rich-content" dangerouslySetInnerHTML={{ __html: demoteH1(proyecto.contenido) }} />
            ) : (
              <p className="rich-content">{proyecto.contenido}</p>
            )}
          </div>
        </div>
      )}

      <div className="container-x pb-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-paper p-8 text-center shadow-soft sm:p-10">
          <h2 className="font-display text-2xl font-bold">¿Te gustaría algo así para tu negocio?</h2>
          <p className="mt-2">Escribinos y te contamos cómo lo haríamos.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={18} /> Hablemos
            </a>
            <Link to="/portafolio" className="btn-secondary">Ver más proyectos</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
