"use client";
/**
 * Hero del home. Los slides (título, descripción e imagen/video) se
 * administran desde el panel: /admin-dash/sliders (/api/sliders).
 * Estética clara: texto a la izquierda, imagen redondeada a la derecha.
 * Solo el primer slide usa <h1> (un único h1 por página para SEO).
 */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import useSWR from "swr";
import { Phone, MessageCircle, Star, MapPin } from "lucide-react";
import clienteAxios from "../config/axios";
import useCont from "../hooks/useCont";
import WhatsappHref from "../utils/WhatsappUrl";

function getYoutubeVideoId(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    if (u.pathname.startsWith("/embed/")) return u.pathname.split("/embed/")[1];
    return u.searchParams.get("v") || "";
  } catch {
    return "";
  }
}

function SlideMedia({ slide, priority }) {
  if (slide.background_type === "youtube" && slide.youtube_url) {
    const id = getYoutubeVideoId(slide.youtube_url);
    const src = id
      ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&rel=0&playsinline=1`
      : slide.youtube_url;
    return (
      <iframe
        className="absolute inset-0 h-full w-full scale-125 pointer-events-none"
        src={src}
        title={slide.title}
        allow="autoplay; encrypted-media; picture-in-picture"
      />
    );
  }
  if (slide.image) {
    return (
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    );
  }
  return <div className="absolute inset-0 bg-sand" />;
}

function Slide({ slide, index, contact }) {
  const Title = index === 0 ? "h1" : "p";
  const whatsapp = WhatsappHref({
    message: `Hola, me interesa saber más sobre "${slide.title}". ¿Me pasan un presupuesto?`,
  });

  return (
    <div className="container-x grid items-center gap-10 py-10 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div className="hero-text">
        <span className="eyebrow">
          <MapPin size={13} /> En toda Argentina
        </span>
        <Title className="heading-xl mt-5">{slide.title}</Title>
        <p className="lead mt-5 max-w-xl">{slide.description}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle size={18} />
            Pedir presupuesto
          </a>
          {(contact?.phone || contact?.whatsapp) && (
            <a href={`tel:${contact.phone || contact.whatsapp}`} className="btn-secondary">
              <Phone size={17} />
              Llamar ahora
            </a>
          )}
        </div>

        <div className="mt-8 flex items-center gap-3 text-sm">
          <span className="flex" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-sun text-sun" />
            ))}
          </span>
          <span>Atención cercana, respuesta en el día</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] bg-brand-soft" aria-hidden="true" />
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand shadow-lift">
          <SlideMedia slide={slide} priority={index === 0} />
        </div>
      </div>
    </div>
  );
}

export default function HeroFeatures() {
  const { contact } = useCont();
  const { data, isLoading: swrIsLoading } = useSWR(
    "/api/sliders",
    (url) => clienteAxios.get(url).then((r) => r.data),
    { revalidateOnFocus: false }
  );
  const loading = swrIsLoading && data === undefined;
  const slides = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="relative overflow-hidden bg-cream">
      <style>{`
        .hero-swiper .swiper-pagination { position: static; margin-top: -0.5rem; padding-bottom: 2rem; }
        .hero-swiper .swiper-pagination-bullet {
          width: 8px; height: 8px; background: var(--color-line); opacity: 1;
          transition: width .3s, background .3s; border-radius: 999px;
        }
        .hero-swiper .swiper-pagination-bullet-active { width: 26px; background: var(--color-brand); }
        @keyframes heroIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .hero-swiper .swiper-slide-active .hero-text { animation: heroIn .6s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .hero-swiper .swiper-slide-active .hero-text { animation: none; } }
      `}</style>

      {loading || slides.length === 0 ? (
        <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-2" aria-busy={loading}>
          <div className="space-y-4">
            <div className="h-6 w-40 rounded-full bg-sand" />
            <div className="h-14 w-full rounded-xl bg-sand" />
            <div className="h-14 w-3/4 rounded-xl bg-sand" />
          </div>
          <div className="aspect-[4/3] rounded-[2rem] bg-sand" />
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 6000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          loop={slides.length > 1}
          className="hero-swiper"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={slide.id} className="!bg-cream">
              <Slide slide={slide} index={i} contact={contact} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
