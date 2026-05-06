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
        background: 'linear-gradient(145deg, #ffffff 0%, #f0f9ff 100%)',
        border: '1px solid rgba(14,165,233,0.15)',
        boxShadow: '0 2px 16px rgba(14,165,233,0.08)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '1px solid rgba(14,165,233,0.4)';
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(14,165,233,0.12), 0 8px 32px rgba(14,165,233,0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '1px solid rgba(14,165,233,0.15)';
        e.currentTarget.style.boxShadow = '0 2px 16px rgba(14,165,233,0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Grid overlay sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Glow top hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, transparent, #0ea5e9, transparent)' }}
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
            style={{ background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)' }}
          >
            <span className="text-5xl opacity-30">◈</span>
          </div>
        )}

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />

        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-sky-400/70 rounded-tl-sm" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-sky-400/70 rounded-tr-sm" />

        {/* Número */}
        <div className="absolute bottom-3 right-3 font-mono text-[11px] font-bold text-sky-500/60 group-hover:text-sky-500 transition-colors">
          {num}
        </div>

        {/* Categoría badge */}
        {categoria && (
          <div className="absolute top-3 left-10">
            <span
              className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(14,165,233,0.3)',
                color: '#0284c7',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="w-1 h-1 rounded-full bg-sky-400 animate-pulse" />
              {categoria}
            </span>
          </div>
        )}
      </div>

      {/* ── Contenido ── */}
      <div className="flex flex-col flex-1 p-5 pt-4">

        {/* Separador con acento */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1" style={{ background: 'rgba(14,165,233,0.15)' }} />
          <div className="w-1 h-1 rounded-full bg-sky-400/50" />
        </div>

        {/* Título */}
        <h3
          className="font-black text-base leading-snug tracking-tight mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-sky-600"
          style={{ color: '#0f172a' }}
        >
          {proyecto.titulo}
        </h3>

        {/* Descripción */}
        {descripcion && (
          <p className="text-xs leading-relaxed flex-1 line-clamp-3" style={{ color: 'rgba(71,85,105,0.85)' }}>
            {descripcion}
          </p>
        )}

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5">
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-sky-600"
              style={{ color: 'rgba(14,165,233,0.6)' }}
            >
              Ver proyecto
            </span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:text-sky-600"
              style={{ color: 'rgba(14,165,233,0.6)' }}
            />
          </div>

          {/* Bottom corners */}
          <div className="flex items-center gap-1 opacity-30 group-hover:opacity-60 transition-opacity">
            <div className="w-1 h-3 border-b border-r border-sky-400/60" />
          </div>
        </div>
      </div>

      {/* Glow ambient hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(14,165,233,0.06) 0%, transparent 70%)' }}
      />
    </div>
  );
}
