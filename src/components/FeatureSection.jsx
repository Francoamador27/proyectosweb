function useCustomSwiperNavSVG() {
  useEffect(() => {
    const nextBtn = document.querySelector('.hero-swiper .swiper-button-next');
    const prevBtn = document.querySelector('.hero-swiper .swiper-button-prev');
    if (nextBtn && !nextBtn.querySelector('svg')) {
      nextBtn.innerHTML = `<svg viewBox="0 0 32 32"><path d="M10 6l12 10-12 10"/></svg>`;
    }
    if (prevBtn && !prevBtn.querySelector('svg')) {
      prevBtn.innerHTML = `<svg viewBox="0 0 32 32"><path d="M22 6L10 16l12 10"/></svg>`;
    }
  }, []);
}

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';

import clienteAxios from '../config/axios';
import useCont from '../hooks/useCont';
import WhatsappHref from '../utils/WhatsappUrl';

function getYoutubeVideoId(url = '') {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes('youtu.be')) {
      return parsedUrl.pathname.replace('/', '');
    }
    if (parsedUrl.pathname.startsWith('/embed/')) {
      return parsedUrl.pathname.split('/embed/')[1];
    }
    return parsedUrl.searchParams.get('v') || '';
  } catch {
    return '';
  }
}

function SlideBackground({ slide }) {
  if (slide.background_type === 'youtube' && slide.youtube_url) {
    const videoId = getYoutubeVideoId(slide.youtube_url);
    const src = videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1`
      : slide.youtube_url;

    return (
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          className="w-full h-full scale-125 pointer-events-none"
          src={src}
          title={slide.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (slide.image) {
    return (
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  return <div className="absolute inset-0 bg-black" />;
}

function SlideContent({ slide, contact, isActive }) {
  return (
    <div className={`hero-slide-content relative z-10 w-full max-w-6xl px-6 lg:px-12 mx-auto text-center ${isActive ? 'slide-enter' : ''}`}>
      {/* Etiqueta tech decorativa */}
      <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-cyan-300 text-xs font-mono tracking-widest uppercase">Codenix Studio</span>
      </div>

      <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
        {slide.title}
      </h1>

      <p className="hero-desc max-w-2xl mx-auto text-xl md:text-2xl text-white/75 mb-12 font-light leading-relaxed">
        {slide.description}
      </p>

      <div className="hero-btns flex flex-wrap justify-center gap-6">
        <a
          href={`tel:${contact?.phone || contact?.whatsapp || ""}`}
          className="hero-btn-primary group relative px-10 py-5 font-black text-white rounded-2xl text-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-95"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 group-hover:from-cyan-400 group-hover:to-blue-500" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.3) 0%, transparent 70%)' }} />
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            LLAMAR AHORA
          </span>
        </a>

        <a
          href={WhatsappHref({
            message: `Hola, me interesa saber más sobre "${slide.title}". Quisiera pedir un presupuesto.`,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-btn-secondary group relative px-10 py-5 font-black text-white rounded-2xl text-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-95"
          style={{ border: '1.5px solid rgba(255,255,255,0.25)' }}
        >
          <span className="absolute inset-0 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.08)' }} />
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WHATSAPP
          </span>
        </a>
      </div>
    </div>
  );
}

function HeroSwiper({ slides, contact }) {
  useCustomSwiperNavSVG();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination, Navigation]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 4500, disableOnInteraction: true }}
      pagination={{ clickable: true }}
      navigation
      loop={slides.length > 1}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      className="hero-swiper w-full h-full"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={slide.id} className="h-full">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <SlideBackground slide={slide} />

            {/* Overlay principal */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

            {/* Grid tech overlay */}
            <div className="absolute inset-0 hero-grid-overlay" />

            {/* Línea de acento superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {/* Línea de acento inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

            {/* Glow de esquina */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <SlideContent slide={slide} contact={contact} isActive={activeIndex === i} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function HeroFeatures() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const { contact } = useCont();

  useEffect(() => {
    let mounted = true;
    const fetchSlides = async () => {
      try {
        const { data } = await clienteAxios.get('/api/sliders');
        if (mounted && Array.isArray(data?.data) && data.data.length > 0) {
          setSlides(data.data);
        }
      } catch (error) {
        console.error('Error cargando sliders', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchSlides();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-screen overflow-hidden bg-black">
      <style>{`
        /* ── HERO SWIPER BASE ── */
        .hero-swiper,
        .hero-swiper .swiper-wrapper,
        .hero-swiper .swiper-slide {
          width: 100% !important;
          height: 100% !important;
        }

        /* ── GRID OVERLAY TECH ── */
        .hero-grid-overlay {
          background-image:
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* ── SLIDE CONTENT ANIMATIONS ── */
        @keyframes slideContentIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideTagIn {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .hero-swiper .swiper-slide-active .hero-slide-content > div:first-child {
          animation: slideTagIn 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        .hero-swiper .swiper-slide-active .hero-title {
          animation: slideContentIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s both;
        }
        .hero-swiper .swiper-slide-active .hero-desc {
          animation: slideContentIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.35s both;
        }
        .hero-swiper .swiper-slide-active .hero-btns {
          animation: slideContentIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.5s both;
        }

        /* ── BOTONES CTA ── */
        .hero-btn-primary {
          box-shadow: 0 0 24px rgba(0,212,255,0.25), 0 4px 20px rgba(0,100,200,0.3);
        }
        .hero-btn-primary:hover {
          box-shadow: 0 0 36px rgba(0,212,255,0.45), 0 8px 32px rgba(0,100,200,0.4);
        }
        .hero-btn-secondary:hover {
          border-color: rgba(255,255,255,0.5) !important;
          box-shadow: 0 0 20px rgba(255,255,255,0.08);
        }

        /* ── NAV BUTTONS ── */
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          width: 44px;
          height: 44px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 50%;
          border: 1.5px solid rgba(0,212,255,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          top: 50%;
          transform: translateY(-50%);
          transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.2s cubic-bezier(.4,2,.6,1);
          box-shadow: 0 0 12px rgba(0,212,255,0.15);
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(0,212,255,0.15);
          border-color: rgba(0,212,255,0.8);
          box-shadow: 0 0 24px rgba(0,212,255,0.4), inset 0 0 12px rgba(0,212,255,0.1);
          transform: translateY(-50%) scale(1.1);
        }
        .hero-swiper .swiper-button-next:active,
        .hero-swiper .swiper-button-prev:active {
          transform: translateY(-50%) scale(0.95);
        }
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after { display: none; }
        .hero-swiper .swiper-button-next svg,
        .hero-swiper .swiper-button-prev svg {
          width: 11px; height: 11px; display: block; margin: auto;
        }
        .hero-swiper .swiper-button-next svg path,
        .hero-swiper .swiper-button-prev svg path {
          stroke: rgba(0,212,255,0.9);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          transition: stroke 0.2s;
        }
        .hero-swiper .swiper-button-next:hover svg path,
        .hero-swiper .swiper-button-prev:hover svg path {
          stroke: #00d4ff;
        }
        .hero-swiper .swiper-button-next { right: 28px; }
        .hero-swiper .swiper-button-prev { left: 28px; }

        @media (max-width: 640px) {
          .hero-swiper .swiper-button-next { right: 10px; }
          .hero-swiper .swiper-button-prev { left: 10px; }
        }

        /* ── PAGINATION ── */
        .hero-swiper .swiper-pagination {
          bottom: 28px;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.35);
          opacity: 1;
          transition: width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s, box-shadow 0.3s;
          border-radius: 999px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 28px;
          background: #00d4ff;
          box-shadow: 0 0 10px rgba(0,212,255,0.7);
        }

        /* ── LOADER ANIMADO ── */
        @keyframes loaderSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes loaderSpinReverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes loaderPulse {
          0%, 100% { opacity: 0.7; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes loaderFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .loader-ring-outer {
          animation: loaderSpin 1.1s linear infinite;
        }
        .loader-ring-inner {
          animation: loaderSpinReverse 1.7s linear infinite;
        }
        .loader-core {
          animation: loaderPulse 1.5s ease-in-out infinite;
        }
        .loader-text {
          animation: loaderFadeIn 0.6s ease-out 0.3s both;
        }
        .loader-scanline {
          animation: scanline 2.5s linear infinite;
          opacity: 0.04;
          pointer-events: none;
        }
      `}</style>

      {loading ? (
        /* ── PANTALLA DE CARGA TECH ── */
        <div className="absolute inset-0 flex items-center justify-center bg-[#050a14] z-20 overflow-hidden">
          {/* Grid de fondo */}
          <div className="absolute inset-0 hero-grid-overlay opacity-60" />

          {/* Scanline efecto CRT */}
          <div className="loader-scanline absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-400 to-transparent" />

          {/* Glow ambiente */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            {/* Spinner */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              {/* Anillo exterior */}
              <div className="loader-ring-outer absolute inset-0 rounded-full"
                style={{ border: '2px solid transparent', borderTopColor: '#00d4ff', borderRightColor: 'rgba(0,212,255,0.3)' }} />
              {/* Anillo medio */}
              <div className="loader-ring-inner absolute inset-2.5 rounded-full"
                style={{ border: '2px solid transparent', borderBottomColor: '#3b82f6', borderLeftColor: 'rgba(59,130,246,0.3)' }} />
              {/* Núcleo */}
              <div className="loader-core absolute inset-6 rounded-full bg-gradient-to-br from-cyan-400/80 to-blue-600/80 blur-sm" />
              {/* Punto central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" style={{ boxShadow: '0 0 8px #00d4ff' }} />
              </div>
            </div>

            <div className="loader-text">
              <p className="text-white text-base font-semibold tracking-wide mb-1">Inicializando</p>
              <p className="text-cyan-400/80 text-xs font-mono tracking-widest uppercase">Cargando experiencias...</p>
            </div>
          </div>
        </div>
      ) : slides.length > 0 ? (
        <div className="absolute inset-0 z-10">
          <HeroSwiper slides={slides} contact={contact} />
        </div>
      ) : null}
    </section>
  );
}
