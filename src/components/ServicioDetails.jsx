import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import useSWR from 'swr';
import clienteAxios from '../config/axios';
import SEOHead from './Head/Head';
import WhatsappHref from '../utils/WhatsappUrl';
import { buildImageUrl } from '../utils/imageUrl';
import useCont from '../hooks/useCont';
import { ArrowLeft, CheckCircle, Zap, Shield, TrendingUp, Users, Cpu, Clock, ArrowRight } from 'lucide-react';
import './Posts/TiptapEditor.css';

const iconMap = {
  check: CheckCircle,
  zap: Zap,
  shield: Shield,
  trending: TrendingUp,
  users: Users,
  cpu: Cpu,
};

export default function ServicioDetails() {
  const { slug } = useParams();
  const { company } = useCont();
  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetcher = (url) => clienteAxios(url).then((res) => res.data);
  const { data: servicioData } = useSWR(`/api/servicios/${slug}`, fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: true,
  });

  useEffect(() => {
    setLoading(true);
    setServicio(null);
  }, [slug]);

  useEffect(() => {
    if (!servicioData) return;
    const servicioRaw = servicioData?.data || servicioData;
    if (servicioRaw) {
      const rawFeatures = servicioRaw.features;
      let parsedFeatures = [];
      if (Array.isArray(rawFeatures)) {
        parsedFeatures = rawFeatures;
      } else if (typeof rawFeatures === 'string') {
        try {
          const parsed = JSON.parse(rawFeatures);
          parsedFeatures = Array.isArray(parsed) ? parsed : [];
        } catch { parsedFeatures = []; }
      }
      setServicio({
        icon: servicioRaw.icon ?? '🛠️',
        titulo: servicioRaw.title ?? servicioRaw.titulo ?? 'Servicio especializado',
        descripcion: servicioRaw.description ?? servicioRaw.descripcion ?? '',
        highlight: servicioRaw.highlight ?? servicioRaw.tagline ?? '',
        slug: servicioRaw.slug ?? (servicioRaw.title ?? '').toLowerCase().replace(/\s+/g, '-'),
        image: buildImageUrl(servicioRaw.image ?? servicioRaw.mainImage_url),
        price: servicioRaw.price ?? null,
        features: parsedFeatures,
      });
    }
    setLoading(false);
  }, [servicioData]);

  const detalles = useMemo(() => {
    if (!servicio) return [];
    const icons = ['zap', 'shield', 'trending', 'users', 'cpu', 'check'];
    return (Array.isArray(servicio.features) ? servicio.features : [])
      .map((feature, index) => {
        if (typeof feature === 'string') return { icon: icons[index % icons.length], titulo: feature, descripcion: '' };
        if (feature && typeof feature === 'object') return {
          icon: feature.icon && iconMap[feature.icon] ? feature.icon : icons[index % icons.length],
          titulo: feature.title ?? feature.titulo ?? '',
          descripcion: feature.description ?? feature.descripcion ?? '',
        };
        return null;
      })
      .filter((item) => item && (item.titulo || item.descripcion));
  }, [servicio]);

  const isRichHtml = servicio?.descripcion && /<[a-z][\s\S]*>/i.test(servicio.descripcion);

  const plainPreview = useMemo(() => {
    if (!servicio?.descripcion) return '';
    return servicio.descripcion.replace(/<[^>]*>/g, '').slice(0, 160).trim();
  }, [servicio]);

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-[#0891b2]/20 border-t-[#0891b2] animate-spin" />
          </div>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse">Cargando servicio...</p>
        </div>
      </div>
    );
  }

  if (!servicio) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-black text-slate-100 mb-4">404</p>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Servicio no encontrado</h1>
          <Link to="/servicios" className="text-[#0891b2] font-medium hover:underline">Volver a servicios</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${servicio.titulo} - Grupo Bits`}
        description={plainPreview || 'Soluciones tecnológicas especializadas'}
      />

      <div className="min-h-screen bg-white relative overflow-hidden">

        {/* ─── Background sutil ─── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(8,145,178,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[120px]" style={{ background: 'rgba(8,145,178,0.06)' }} />
          <div className="absolute bottom-1/3 right-0 w-[400px] h-[300px] rounded-full blur-[100px]" style={{ background: 'rgba(6,182,212,0.04)' }} />
        </div>

        <div className="relative z-10">

          {/* ─── HERO ─── */}
          <div className="max-w-7xl mx-auto px-6 pt-10 pb-4">

            {/* Back */}
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#0891b2] text-sm font-medium transition-colors group mb-10"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Servicios
            </Link>

            {/* Badge + título */}
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{ border: '1px solid rgba(8,145,178,0.25)', background: 'rgba(8,145,178,0.06)', color: '#0891b2' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-pulse" />
                  {servicio.highlight || 'Servicio Premium'}
                </span>
                {servicio.price && (
                  <span className="px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-500 text-xs font-semibold">
                    Desde ${servicio.price}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.0] tracking-tight mb-6">
                {servicio.titulo}
              </h1>

              {/* Divisor */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 rounded-full" style={{ background: 'linear-gradient(90deg, #0891b2, transparent)' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2]" style={{ boxShadow: '0 0 6px rgba(8,145,178,0.5)' }} />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={WhatsappHref({ message: `Hola, me gustaría más información sobre: ${servicio.titulo}` })}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 font-black rounded-xl transition-all hover:scale-[1.03] active:scale-95 text-sm text-white shadow-lg"
                  style={{ background: '#0891b2', boxShadow: '0 4px 16px rgba(8,145,178,0.3)' }}
                >
                  Solicitar Consulta
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-500 hover:border-[#0891b2]/30 hover:text-[#0891b2] transition-all text-sm font-semibold"
                >
                  Ver más servicios
                </Link>
              </div>
            </div>
          </div>

          {/* ─── MAIN CONTENT ─── */}
          <div className="max-w-7xl mx-auto px-6 py-14 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">

              {/* ── Descripción ── */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] font-mono">Descripción</span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-lg pointer-events-none" style={{ borderColor: 'rgba(8,145,178,0.3)' }} />
                  <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 rounded-br-lg pointer-events-none" style={{ borderColor: 'rgba(8,145,178,0.3)' }} />

                  {isRichHtml ? (
                    <div className="rich-content" dangerouslySetInnerHTML={{ __html: servicio.descripcion }} />
                  ) : (
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {servicio.descripcion || 'Servicio especializado de Grupo Bits'}
                    </p>
                  )}
                </div>

                {/* Features */}
                {detalles.length > 0 && (
                  <div className="mt-16">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-px flex-1 bg-slate-100" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] font-mono">Características</span>
                      <div className="h-px flex-1 bg-slate-100" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {detalles.map((detalle, idx) => {
                        const Icon = iconMap[detalle.icon] || CheckCircle;
                        return (
                          <div
                            key={idx}
                            className="group relative flex gap-4 p-5 rounded-xl border transition-all duration-300"
                            style={{
                              border: '1px solid rgba(8,145,178,0.1)',
                              background: 'rgba(8,145,178,0.02)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.border = '1px solid rgba(8,145,178,0.25)';
                              e.currentTarget.style.background = 'rgba(8,145,178,0.04)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.border = '1px solid rgba(8,145,178,0.1)';
                              e.currentTarget.style.background = 'rgba(8,145,178,0.02)';
                            }}
                          >
                            {/* Línea top hover */}
                            <div className="absolute top-0 left-0 right-0 h-px rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, rgba(8,145,178,0.4), transparent)' }} />
                            <div
                              className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                              style={{ background: 'rgba(8,145,178,0.08)', border: '1px solid rgba(8,145,178,0.2)' }}
                            >
                              {company?.logo
                                ? <img src={company.logo} alt="" className="w-5 h-5 object-contain" />
                                : <Icon className="w-4 h-4" style={{ color: '#0891b2' }} />
                              }
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm font-bold text-slate-800 mb-1">{detalle.titulo}</h3>
                              {detalle.descripcion && (
                                <p className="text-slate-500 text-sm leading-relaxed">{detalle.descripcion}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* ── Sidebar ── */}
              <aside className="lg:sticky lg:top-8 flex flex-col gap-4">

                {/* Imagen */}
                {servicio.image && (
                  <div className="group relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] shadow-sm">
                    <img
                      src={servicio.image}
                      alt={servicio.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #0891b2, transparent)' }} />
                  </div>
                )}

                {/* Info card */}
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(8,145,178,0.15)' }}>
                  <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: 'rgba(8,145,178,0.1)', background: 'rgba(8,145,178,0.03)' }}>
                    <div className="w-2 h-2 rounded-full bg-[#0891b2] animate-pulse" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Resumen</span>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Servicio</p>
                      <p className="text-slate-800 font-bold text-sm">{servicio.titulo}</p>
                    </div>

                    {servicio.price && (
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Inversión</p>
                        <p className="text-2xl font-black" style={{ color: '#0891b2' }}>${servicio.price}</p>
                      </div>
                    )}

                    {detalles.length > 0 && (
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-2">Incluye</p>
                        <ul className="flex flex-col gap-1.5">
                          {detalles.slice(0, 4).map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#0891b2' }} />
                              {d.titulo}
                            </li>
                          ))}
                          {detalles.length > 4 && (
                            <li className="text-xs text-slate-400">+ {detalles.length - 4} más...</li>
                          )}
                        </ul>
                      </div>
                    )}

                    <div className="pt-1 flex flex-col gap-2">
                      <a
                        href={WhatsappHref({ message: `Hola, me gustaría más información sobre: ${servicio.titulo}` })}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 font-black rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-sm text-white shadow-md"
                        style={{ background: '#0891b2', boxShadow: '0 4px 14px rgba(8,145,178,0.3)' }}
                      >
                        Solicitar Consulta
                      </a>
                      <Link
                        to="/servicios"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-500 hover:border-[#0891b2]/30 hover:text-[#0891b2] transition-all text-sm font-semibold"
                      >
                        Ver más servicios
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Tiempo de respuesta */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50">
                  <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <p className="text-xs text-slate-500">Respuesta en menos de <span className="text-slate-700 font-semibold">24hs</span></p>
                </div>
              </aside>
            </div>
          </div>

          {/* ─── CTA FINAL ─── */}
          <div className="border-t border-slate-100 py-16 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[#0891b2] text-xs font-bold uppercase tracking-[0.3em] font-mono mb-4">Siguiente paso</p>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                ¿Listo para empezar?
              </h3>
              <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                Contáctanos hoy y descubrí cómo podemos impulsar tu negocio.
              </p>
              <a
                href={WhatsappHref({ message: `Hola, vengo desde "${servicio.titulo}" y me gustaría saber más.` })}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 font-black rounded-xl transition-all hover:scale-105 active:scale-95 text-white shadow-xl"
                style={{ background: '#0891b2', boxShadow: '0 8px 24px rgba(8,145,178,0.3)' }}
              >
                Contactar Ahora
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
