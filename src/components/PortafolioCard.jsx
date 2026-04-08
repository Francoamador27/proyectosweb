import { ArrowRight } from 'lucide-react';

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

export default function PortafolioCard({ proyecto, idx = 0 }) {
  const num = String(idx + 1).padStart(3, '0');
  const categoria = proyecto.categoria?.nombre ?? proyecto.categoria ?? null;
  const descripcion = stripHtml(proyecto.descripcion ?? '').slice(0, 120).trim();

  return (
    <div
      className="group relative h-full flex flex-col overflow-hidden rounded-2xl transition-all duration-500"
      style={{
        background: 'linear-gradient(145deg, #0a1628 0%, #0d1f3c 100%)',
        border: '1px solid rgba(0,212,255,0.1)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '1px solid rgba(0,212,255,0.35)';
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,212,255,0.15), 0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(0,212,255,0.06)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '1px solid rgba(0,212,255,0.1)';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Grid overlay sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Glow top hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
      />

      {/* ── Imagen ── */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        {proyecto.imagen ? (
          <img
            src={getImageUrl(proyecto.imagen)}
            alt={proyecto.titulo}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0a1628, #0d2a4a)' }}
          >
            <span className="text-5xl opacity-20">◈</span>
          </div>
        )}

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/30 to-transparent" />

        {/* Scanline hover effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)',
          }}
        />

        {/* Corner brackets — top left */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-500/60 rounded-tl-sm" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-500/60 rounded-tr-sm" />

        {/* Número */}
        <div className="absolute bottom-3 right-3 font-mono text-[11px] font-bold text-cyan-500/50 group-hover:text-cyan-400/80 transition-colors">
          {num}
        </div>

        {/* Categoría badge */}
        {categoria && (
          <div className="absolute top-3 left-10">
            <span
              className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(0,212,255,0.25)',
                color: '#00d4ff',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              {categoria}
            </span>
          </div>
        )}
      </div>

      {/* ── Contenido ── */}
      <div className="flex flex-col flex-1 p-5 pt-4">

        {/* Separador con acento */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1" style={{ background: 'rgba(0,212,255,0.12)' }} />
          <div className="w-1 h-1 rounded-full bg-cyan-500/40" />
        </div>

        {/* Título */}
        <h3
          className="font-black text-base leading-snug tracking-tight mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-cyan-300"
          style={{ color: '#e2e8f0' }}
        >
          {proyecto.titulo}
        </h3>

        {/* Descripción */}
        {descripcion && (
          <p className="text-xs leading-relaxed flex-1 line-clamp-3" style={{ color: 'rgba(148,163,184,0.75)' }}>
            {descripcion}
          </p>
        )}

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5">
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-cyan-400"
              style={{ color: 'rgba(0,212,255,0.5)' }}
            >
              Ver proyecto
            </span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
              style={{ color: 'rgba(0,212,255,0.5)' }}
            />
          </div>

          {/* Bottom corners */}
          <div className="flex items-center gap-1 opacity-30 group-hover:opacity-60 transition-opacity">
            <div className="w-1 h-3 border-b border-r border-cyan-500/60" />
          </div>
        </div>
      </div>

      {/* Glow ambient hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
      />
    </div>
  );
}
