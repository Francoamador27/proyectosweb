import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import clienteAxios from '../config/axios';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const INTERVAL = 5500;

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) return path;
  const cleanPath = String(path).replace(/^\/+/, '');
  if (cleanPath.startsWith('storage/')) return `${import.meta.env.VITE_API_URL}/${cleanPath}`;
  if (cleanPath.startsWith('portafolio/') || cleanPath.startsWith('portafolio-galeria/'))
    return `${import.meta.env.VITE_API_URL}/storage/uploads/${cleanPath}`;
  return `${import.meta.env.VITE_API_URL}/${cleanPath}`;
};

const stripHtml = (str) => str?.replace(/<[^>]*>/g, '') ?? '';

export default function PortafolioCarrusel() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animDir, setAnimDir] = useState('next');
  const startRef = useRef(Date.now());
  const rafRef = useRef(null);
  const sectionRef = useRef(null);

  const fetcher = (url) => clienteAxios(url).then((r) => r.data);
  const { data, isLoading } = useSWR('/api/portafolios', fetcher, { revalidateOnFocus: false });
  const proyectos = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];

  const goTo = (idx, dir = 'next') => {
    setAnimDir(dir);
    setActive(idx);
    setProgress(0);
    startRef.current = Date.now();
  };

  const next = () => goTo((active + 1) % proyectos.length, 'next');
  const prev = () => goTo((active - 1 + proyectos.length) % proyectos.length, 'prev');

  useEffect(() => {
    if (proyectos.length === 0 || paused) return;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(p);
      if (elapsed >= INTERVAL) {
        setAnimDir('next');
        setActive((a) => (a + 1) % proyectos.length);
        setProgress(0);
        startRef.current = Date.now();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [proyectos.length, paused, active]);

  if (isLoading) {
    return (
      <section className="relative py-24 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 rounded-full mb-4 animate-pulse bg-sky-100" />
          <div className="h-12 w-72 rounded-xl mb-12 animate-pulse bg-slate-100" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 rounded-2xl animate-pulse bg-slate-100" style={{ minHeight: 440 }} />
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex-1 rounded-2xl animate-pulse bg-slate-50 border border-slate-100" />
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map(i => <div key={i} className="rounded-xl animate-pulse bg-slate-100" style={{ height: 72 }} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (proyectos.length === 0) return null;

  const proyecto = proyectos[active];
  const num = String(active + 1).padStart(3, '0');
  const total = String(proyectos.length).padStart(3, '0');
  const descripcion = stripHtml(proyecto.descripcion ?? '').slice(0, 200).trim();
  const categoria = proyecto.categoria?.nombre ?? proyecto.categoria ?? null;
  const thumbs = proyectos.filter((_, i) => i !== active).slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-20 overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes pf-slideR {
          from { opacity: 0; transform: translateX(48px) scale(0.98); }
          to   { opacity: 1; transform: translateX(0)    scale(1); }
        }
        @keyframes pf-slideL {
          from { opacity: 0; transform: translateX(-48px) scale(0.98); }
          to   { opacity: 1; transform: translateX(0)     scale(1); }
        }
        @keyframes pf-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pf-scanV {
          0%   { top: -15%; opacity: 0; }
          8%   { opacity: 0.3; }
          92%  { opacity: 0.15; }
          100% { top: 115%; opacity: 0; }
        }
        @keyframes pf-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes pf-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .pf-next   { animation: pf-slideR 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
        .pf-prev   { animation: pf-slideL 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
        .pf-up     { animation: pf-fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .pf-scanV  { animation: pf-scanV 3s ease-in-out infinite; }
        .pf-ticker { animation: pf-ticker 22s linear infinite; }
        .pf-ring::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 1.5px solid rgba(14,165,233,0.6);
          animation: pf-pulse-ring 1.8s ease-out infinite;
        }
      `}</style>

      {/* Grid fondo */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(14,165,233,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.045) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      {/* Glows suaves */}
      <div className="absolute -top-20 left-1/4 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(14,165,233,0.06)' }} />
      <div className="absolute -bottom-20 right-1/4 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(99,102,241,0.05)' }} />
      {/* Línea top */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.4), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pf-up">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{
              border: '1px solid rgba(14,165,233,0.25)',
              background: 'rgba(14,165,233,0.07)',
            }}>
              <span className="relative flex w-1.5 h-1.5 pf-ring">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              </span>
              <span className="text-sky-600 text-xs font-mono tracking-widest uppercase">Portafolio · Casos de éxito</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Nuestros{' '}
              <span style={{ background: 'linear-gradient(90deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Proyectos
              </span>
            </h2>
          </div>

          <Link
            to="/portafolio"
            className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:gap-3 group text-sky-500 hover:text-sky-700"
          >
            Ver todos los proyectos
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── Showcase principal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">

          {/* ─ Imagen ─ */}
          <div
            className="lg:col-span-3 relative rounded-2xl overflow-hidden flex-shrink-0"
            style={{ minHeight: 440, boxShadow: '0 4px 32px rgba(14,165,233,0.1), 0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div key={`img-${active}`} className={`absolute inset-0 ${animDir === 'next' ? 'pf-next' : 'pf-prev'}`}>
              {proyecto.imagen ? (
                <img
                  src={getImageUrl(proyecto.imagen)}
                  alt={proyecto.titulo}
                  className="w-full h-full object-cover"
                  style={{ minHeight: 440 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)' }}>
                  <span className="text-8xl opacity-20">◈</span>
                </div>
              )}
            </div>

            {/* Overlay gradiente bottom — blanco */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/5 to-transparent pointer-events-none" />

            {/* Scanline vertical */}
            <div className="pf-scanV absolute left-0 right-0 h-10 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent, rgba(14,165,233,0.06), transparent)' }} />

            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-sky-400/60 rounded-tl" />
            <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-sky-400/60 rounded-tr" />
            <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-sky-400/30 rounded-bl" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-sky-400/30 rounded-br" />

            {/* Counter top-center */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-widest text-sky-500/70">
              {num}&nbsp;/&nbsp;{total}
            </div>

            {/* Badge categoría */}
            {categoria && (
              <div className="absolute bottom-5 left-5">
                <span
                  key={`cat-${active}`}
                  className={`inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${animDir === 'next' ? 'pf-next' : 'pf-prev'}`}
                  style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(14,165,233,0.3)', color: '#0284c7', backdropFilter: 'blur(10px)' }}
                >
                  <span className="w-1 h-1 rounded-full bg-sky-400 animate-pulse" />
                  {categoria}
                </span>
              </div>
            )}

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-100">
              <div
                className="h-full"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #0ea5e9, #6366f1)', transition: 'none' }}
              />
            </div>
          </div>

          {/* ─ Panel info ─ */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Card info */}
            <div
              key={`info-${active}`}
              className={`flex-1 rounded-2xl p-6 flex flex-col justify-between ${animDir === 'next' ? 'pf-next' : 'pf-prev'}`}
              style={{
                background: 'linear-gradient(145deg, #f0f9ff, #f5f3ff)',
                border: '1px solid rgba(14,165,233,0.15)',
                boxShadow: '0 2px 16px rgba(14,165,233,0.06)',
              }}
            >
              <div className="flex flex-col gap-4">
                {/* Label */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(14,165,233,0.4), transparent)' }} />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-sky-400">
                    PROYECTO_{num}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                  {proyecto.titulo}
                </h3>

                {/* Descripción */}
                {descripcion && (
                  <p className="text-sm leading-relaxed line-clamp-4 text-slate-500">
                    {descripcion}
                  </p>
                )}

                {/* Tags tech decorativos */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['desarrollo', 'diseño', 'deploy'].map((tag) => (
                    <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded"
                      style={{ border: '1px solid rgba(14,165,233,0.2)', color: 'rgba(14,165,233,0.7)', background: 'rgba(14,165,233,0.06)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Controles */}
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  to={`/portafolio/${proyecto.id}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 text-white"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 4px 20px rgba(14,165,233,0.3)' }}
                >
                  <ExternalLink size={14} />
                  Ver proyecto completo
                </Link>

                <div className="flex items-center justify-between mt-1">
                  {/* Flechas */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 text-sky-600"
                      style={{ border: '1px solid rgba(14,165,233,0.2)', background: 'rgba(14,165,233,0.07)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,165,233,0.15)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(14,165,233,0.07)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.2)'; }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={next}
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 text-sky-600"
                      style={{ border: '1px solid rgba(14,165,233,0.2)', background: 'rgba(14,165,233,0.07)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,165,233,0.15)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(14,165,233,0.07)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.2)'; }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Indicadores pill */}
                  <div className="flex items-center gap-1.5">
                    {proyectos.slice(0, 8).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i, i > active ? 'next' : 'prev')}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === active ? 22 : 6,
                          height: 6,
                          background: i === active ? '#0ea5e9' : 'rgba(14,165,233,0.2)',
                          boxShadow: i === active ? '0 0 8px rgba(14,165,233,0.5)' : 'none',
                        }}
                      />
                    ))}
                    {proyectos.length > 8 && (
                      <span className="text-[9px] font-mono ml-1 text-sky-400">+{proyectos.length - 8}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnails — siguientes 3 */}
            <div className="grid grid-cols-3 gap-2">
              {thumbs.map((thumb) => {
                const thumbIdx = proyectos.findIndex((p) => p.id === thumb.id);
                return (
                  <button
                    key={thumb.id}
                    onClick={() => goTo(thumbIdx, thumbIdx > active ? 'next' : 'prev')}
                    className="relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:brightness-105 active:scale-95 group/thumb"
                    style={{ height: 72, border: '1px solid rgba(14,165,233,0.15)', boxShadow: '0 1px 6px rgba(14,165,233,0.06)' }}
                  >
                    {thumb.imagen ? (
                      <img src={getImageUrl(thumb.imagen)} alt={thumb.titulo} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-sky-50" />
                    )}
                    <div className="absolute inset-0 transition-opacity duration-300 bg-white/30" />
                    <div className="absolute inset-0 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200" style={{ border: '1px solid rgba(14,165,233,0.45)', borderRadius: '0.75rem' }} />
                    <span className="absolute bottom-1 left-1.5 font-mono text-[8px] text-sky-500/70">
                      {String(thumbIdx + 1).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Ticker tech ── */}
        <div className="mt-12 overflow-hidden border-y border-sky-100 py-3">
          <div className="pf-ticker flex gap-16 whitespace-nowrap w-max">
            {[...Array(2)].map((_, rep) => (
              ['DESARROLLO WEB', 'DISEÑO UI/UX', 'E-COMMERCE', 'APPS MÓVILES', 'SEO & PERFORMANCE', 'INTEGRATIONS', 'CLOUD DEPLOY', 'AUTOMATIZACIÓN'].map((t, i) => (
                <span key={`${rep}-${i}`} className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-sky-300" />
                  {t}
                </span>
              ))
            ))}
          </div>
        </div>

        {/* ── CTA mobile ── */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/portafolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-500 hover:text-sky-700"
          >
            Ver todos los proyectos <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
