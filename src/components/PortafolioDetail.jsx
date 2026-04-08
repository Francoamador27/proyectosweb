import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import useCont from '../hooks/useCont';
import SEOHead from './Head/Head';
import clienteAxios from '../config/axios';
import './Posts/TiptapEditor.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default function PortafolioDetail() {
  const { company } = useCont();
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) return path;
    const cleanPath = String(path).replace(/^\/+/, '');
    if (cleanPath.startsWith('storage/')) return `${import.meta.env.VITE_API_URL}/${cleanPath}`;
    if (cleanPath.startsWith('portafolio/') || cleanPath.startsWith('portafolio-galeria/'))
      return `${import.meta.env.VITE_API_URL}/storage/uploads/${cleanPath}`;
    return `${import.meta.env.VITE_API_URL}/${cleanPath}`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    setProyecto(null);
    clienteAxios.get(`/api/portafolios/${id}`)
      .then(({ data }) => setProyecto(data.data))
      .catch((err) => console.error('Error al obtener proyecto:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const galleryImages = proyecto
    ? [proyecto.imagen, ...(Array.isArray(proyecto.galeria) ? proyecto.galeria.map((img) => img?.imagen) : [])].filter(Boolean)
    : [];
  const uniqueGalleryImages = Array.from(new Set(galleryImages));

  const isRichHtml = proyecto?.contenido && /<[a-z][\s\S]*>/i.test(proyecto.contenido);

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-[#0891b2]/20 border-t-[#0891b2] animate-spin" />
          </div>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse">Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  // ── Not Found ──
  if (!proyecto) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-black text-slate-100 mb-4">404</p>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Proyecto no encontrado</h1>
          <Link to="/portafolio" className="text-[#0891b2] font-medium hover:underline">Volver al portafolio</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${proyecto.titulo} - Portafolio | ${company?.name || 'Grupo Bits'}`}
        description={proyecto.descripcion?.replace(/<[^>]*>/g, '').slice(0, 160) || ''}
      />

      <div className="min-h-screen bg-white relative overflow-hidden">

        {/* ─── Background sutil ─── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(8,145,178,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[120px]" style={{ background: 'rgba(8,145,178,0.06)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full blur-[100px]" style={{ background: 'rgba(6,182,212,0.04)' }} />
        </div>

        <div className="relative z-10">

          {/* ─── HERO ─── */}
          <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">

            {/* Back */}
            <Link
              to="/portafolio"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#0891b2] text-sm font-medium transition-colors group mb-10"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Portafolio
            </Link>

            {/* Badge + Título */}
            <div className="max-w-4xl">
              {proyecto.categoria && (
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                    style={{ border: '1px solid rgba(8,145,178,0.25)', background: 'rgba(8,145,178,0.06)', color: '#0891b2' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-pulse" />
                    {proyecto.categoria?.nombre ?? proyecto.categoria}
                  </span>
                </div>
              )}

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
                {proyecto.titulo}
              </h1>

              {proyecto.descripcion_corta && (
                <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-2xl">
                  {proyecto.descripcion_corta}
                </p>
              )}

              {/* Divisor */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 rounded-full" style={{ background: 'linear-gradient(90deg, #0891b2, transparent)' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2]" style={{ boxShadow: '0 0 6px rgba(8,145,178,0.5)' }} />
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                {proyecto.url && (
                  <a
                    href={proyecto.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 font-black rounded-xl transition-all hover:scale-[1.03] active:scale-95 text-sm text-white shadow-lg"
                    style={{ background: '#0891b2', boxShadow: '0 4px 16px rgba(8,145,178,0.3)' }}
                  >
                    Ver proyecto
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Link
                  to="/portafolio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-500 hover:border-[#0891b2]/30 hover:text-[#0891b2] transition-all text-sm font-semibold"
                >
                  Ver más proyectos
                </Link>
              </div>
            </div>
          </div>

          {/* ─── GALERÍA PRINCIPAL ─── full width, protagonista */}
          {uniqueGalleryImages.length > 0 && (
            <div className="w-full mb-16">
              {/* Línea de acento superior */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(8,145,178,0.35), transparent)' }} />

              {/* Swiper principal */}
              <div className="relative bg-slate-50">
                <Swiper
                  modules={[Navigation, Thumbs, Autoplay]}
                  navigation={{ nextEl: '.porto-next', prevEl: '.porto-prev' }}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  autoplay={{ delay: 5000, disableOnInteraction: true }}
                  spaceBetween={0}
                  onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  className="w-full"
                >
                  {uniqueGalleryImages.map((src, index) => (
                    <SwiperSlide key={`main-${index}`}>
                      <div className="relative w-full h-[55vh] md:h-[70vh] lg:h-[78vh] overflow-hidden">
                        <img
                          src={getImageUrl(src)}
                          alt={`${proyecto.titulo} — ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {/* Gradiente inferior suave hacia blanco */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Controles */}
                {uniqueGalleryImages.length > 1 && (
                  <>
                    <button className="porto-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 bg-white/80 backdrop-blur-sm hover:border-[#0891b2]/40 hover:bg-[#0891b2]/5 transition-all shadow-sm">
                      <ArrowLeft className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="porto-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 bg-white/80 backdrop-blur-sm hover:border-[#0891b2]/40 hover:bg-[#0891b2]/5 transition-all shadow-sm">
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                    </button>

                    {/* Contador */}
                    <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-xs text-slate-500 font-mono shadow-sm">
                      {activeIndex + 1} / {uniqueGalleryImages.length}
                    </div>
                  </>
                )}
              </div>

              {/* Línea inferior */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(8,145,178,0.35), transparent)' }} />

              {/* Thumbnails */}
              {uniqueGalleryImages.length > 1 && (
                <div className="max-w-7xl mx-auto px-6 mt-4">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[Thumbs]}
                    watchSlidesProgress
                    spaceBetween={8}
                    breakpoints={{
                      0:    { slidesPerView: 3 },
                      640:  { slidesPerView: 4 },
                      1024: { slidesPerView: 6 },
                    }}
                    className="portafolio-thumbs"
                  >
                    {uniqueGalleryImages.map((src, index) => (
                      <SwiperSlide key={`thumb-${index}`}>
                        <div
                          className={`relative overflow-hidden rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                            activeIndex === index
                              ? 'opacity-100'
                              : 'border-slate-200 opacity-50 hover:opacity-75'
                          }`}
                          style={activeIndex === index ? { borderColor: '#0891b2', boxShadow: '0 0 12px rgba(8,145,178,0.2)' } : {}}
                        >
                          <img
                            src={getImageUrl(src)}
                            alt={`thumbnail ${index + 1}`}
                            className="w-full h-16 md:h-20 object-cover"
                          />
                          {activeIndex === index && (
                            <div className="absolute inset-0" style={{ background: 'rgba(8,145,178,0.08)' }} />
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          )}

          {/* ─── CONTENIDO ─── */}
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-16 items-start">

              {/* ── Columna principal ── */}
              <div>
                {proyecto.descripcion && (
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-px flex-1 bg-slate-100" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] font-mono">Sobre el proyecto</span>
                      <div className="h-px flex-1 bg-slate-100" />
                    </div>

                    <div className="relative">
                      <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-lg pointer-events-none" style={{ borderColor: 'rgba(8,145,178,0.3)' }} />
                      <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 rounded-br-lg pointer-events-none" style={{ borderColor: 'rgba(8,145,178,0.3)' }} />
                      <p className="text-slate-600 text-lg leading-relaxed">{proyecto.descripcion}</p>
                    </div>
                  </div>
                )}

                {proyecto.contenido && (
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-px flex-1 bg-slate-100" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] font-mono">Detalle</span>
                      <div className="h-px flex-1 bg-slate-100" />
                    </div>

                    <div className="relative">
                      <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-lg pointer-events-none" style={{ borderColor: 'rgba(8,145,178,0.3)' }} />
                      <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 rounded-br-lg pointer-events-none" style={{ borderColor: 'rgba(8,145,178,0.3)' }} />

                      {isRichHtml ? (
                        <div className="rich-content" dangerouslySetInnerHTML={{ __html: proyecto.contenido }} />
                      ) : (
                        <p className="text-slate-600 text-lg leading-relaxed">{proyecto.contenido}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ── Sidebar ── */}
              <aside className="lg:sticky lg:top-8 flex flex-col gap-4">

                {/* Info card */}
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(8,145,178,0.15)' }}>
                  <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: 'rgba(8,145,178,0.1)', background: 'rgba(8,145,178,0.03)' }}>
                    <div className="w-2 h-2 rounded-full bg-[#0891b2] animate-pulse" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Proyecto</span>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Nombre</p>
                      <p className="text-slate-800 font-bold text-sm leading-snug">{proyecto.titulo}</p>
                    </div>

                    {proyecto.categoria && (
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Categoría</p>
                        <p className="font-semibold text-sm" style={{ color: '#0891b2' }}>{proyecto.categoria?.nombre ?? proyecto.categoria}</p>
                      </div>
                    )}

                    {uniqueGalleryImages.length > 0 && (
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Imágenes</p>
                        <p className="text-slate-600 text-sm">{uniqueGalleryImages.length} imagen{uniqueGalleryImages.length !== 1 ? 'es' : ''}</p>
                      </div>
                    )}

                    <div className="pt-1 flex flex-col gap-2">
                      {proyecto.url && (
                        <a
                          href={proyecto.url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 font-black rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-sm text-white shadow-md"
                          style={{ background: '#0891b2', boxShadow: '0 4px 14px rgba(8,145,178,0.3)' }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Ver proyecto live
                        </a>
                      )}
                      <Link
                        to="/portafolio"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-500 hover:border-[#0891b2]/30 hover:text-[#0891b2] transition-all text-sm font-semibold"
                      >
                        Ver más proyectos
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Miniatura activa */}
                {uniqueGalleryImages.length > 0 && (
                  <div className="group relative rounded-2xl overflow-hidden border border-slate-200 aspect-video shadow-sm">
                    <img
                      src={getImageUrl(uniqueGalleryImages[activeIndex] || uniqueGalleryImages[0])}
                      alt={proyecto.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #0891b2, transparent)' }} />
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-white/80 backdrop-blur-sm border border-slate-200 text-[10px] text-slate-500 font-mono">
                      {activeIndex + 1} / {uniqueGalleryImages.length}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>

          {/* ─── CTA FINAL ─── */}
          <div className="border-t border-slate-100 py-16 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[#0891b2] text-xs font-bold uppercase tracking-[0.3em] font-mono mb-4">Siguiente paso</p>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                ¿Querés un proyecto así?
              </h3>
              <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                Contáctanos y convertimos tu visión en una solución digital real.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 px-8 py-4 font-black rounded-xl transition-all hover:scale-105 active:scale-95 text-white shadow-xl"
                  style={{ background: '#0891b2', boxShadow: '0 8px 24px rgba(8,145,178,0.3)' }}
                >
                  Empezar un proyecto
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/portafolio"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-slate-200 text-slate-500 hover:border-[#0891b2]/30 hover:text-[#0891b2] transition-all font-semibold"
                >
                  Ver más trabajos
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .portafolio-thumbs .swiper-slide { opacity: 1; }
        .portafolio-thumbs .swiper-slide-thumb-active > div {
          border-color: #0891b2 !important;
          opacity: 1 !important;
          box-shadow: 0 0 12px rgba(8,145,178,0.25);
        }
        .porto-prev.swiper-button-disabled,
        .porto-next.swiper-button-disabled {
          opacity: 0.3;
          cursor: default;
        }
      `}</style>
    </>
  );
}
