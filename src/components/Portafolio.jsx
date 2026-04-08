import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useCont from '../hooks/useCont';
import SEOHead from './Head/Head';
import PortafolioCard from './PortafolioCard';
import { Search } from 'lucide-react';
import clienteAxios from '../config/axios';

export default function Portafolio() {
  const { company } = useCont();
  const [portafolios, setPortafolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchPortafolios();
  }, []);

  const fetchPortafolios = async () => {
    try {
      const { data } = await clienteAxios.get('/api/portafolios');
      setPortafolios(data.data || []);
    } catch (error) {
      console.error('Error al obtener portafolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const portafoliosFiltrados = useMemo(() => {
    if (!searchQuery.trim()) return portafolios;
    return portafolios.filter((proyecto) => {
      const titulo = proyecto.titulo || proyecto.title || '';
      const descripcion = proyecto.descripcion || proyecto.description || '';
      const query = searchQuery.toLowerCase();
      return titulo.toLowerCase().includes(query) || descripcion.toLowerCase().includes(query);
    });
  }, [portafolios, searchQuery]);

  return (
    <>
      <SEOHead
        title={`Portafolio - ${company.name || 'Grupo Bits'}`}
        description="Descubre nuestros proyectos y casos de éxito"
      />

      <div className="min-h-screen bg-white relative overflow-hidden">

        {/* Grid overlay sutil sobre blanco */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(8,145,178,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glow ambiente top-left */}
        <div className="absolute top-0 left-0 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(8,145,178,0.06)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(6,182,212,0.05)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-16">

          {/* ── Header ── */}
          <header className="mb-12 lg:mb-16">

            {/* Badge tech */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest"
                style={{
                  border: '1px solid rgba(8,145,178,0.25)',
                  background: 'rgba(8,145,178,0.06)',
                  color: '#0891b2',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-pulse" />
                {portafolios.length > 0 ? `${portafolios.length} proyectos` : 'Portafolio'}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.0] tracking-tight mb-5">
              Nuestros{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #0891b2, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Proyectos
              </span>
            </h1>

            <p className="text-slate-500 text-base lg:text-lg max-w-2xl leading-relaxed">
              Casos de éxito y soluciones digitales que transformaron ideas en productos reales.
            </p>

            {/* Divisor tech */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #0891b2, transparent)' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2]" style={{ boxShadow: '0 0 6px rgba(8,145,178,0.6)' }} />
              <div className="h-px w-8 rounded-full bg-slate-200" />
            </div>
          </header>

          {/* ── Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 flex flex-col gap-4">

                {/* Search */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    border: '1px solid rgba(8,145,178,0.15)',
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 1px 12px rgba(8,145,178,0.06)',
                  }}
                >
                  {/* Header del panel */}
                  <div
                    className="flex items-center gap-2 px-4 py-3 border-b"
                    style={{ borderColor: 'rgba(8,145,178,0.1)', background: 'rgba(8,145,178,0.03)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2]" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Buscar</span>
                  </div>

                  <div className="p-4">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Nombre del proyecto..."
                        className="w-full pl-8 pr-3 py-2.5 rounded-lg text-sm text-slate-700 placeholder-slate-400 outline-none transition-all"
                        style={{
                          border: '1px solid rgba(8,145,178,0.15)',
                          background: 'rgba(8,145,178,0.03)',
                        }}
                        onFocus={(e) => {
                          e.target.style.border = '1px solid rgba(8,145,178,0.45)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(8,145,178,0.08)';
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid rgba(8,145,178,0.15)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Contador */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    border: '1px solid rgba(8,145,178,0.12)',
                    background: 'rgba(255,255,255,0.8)',
                  }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-3 border-b"
                    style={{ borderColor: 'rgba(8,145,178,0.08)', background: 'rgba(8,145,178,0.02)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Resultados</span>
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-sm text-slate-600">
                      <span className="text-2xl font-black text-[#0891b2]">{portafoliosFiltrados.length}</span>
                      <span className="text-slate-400 ml-1">/ {portafolios.length}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-widest font-mono">
                      {searchQuery ? 'filtrados' : 'proyectos totales'}
                    </p>
                  </div>
                </div>

                {/* Decorativo: líneas de código */}
                <div
                  className="rounded-xl p-4 hidden lg:block"
                  style={{
                    border: '1px solid rgba(8,145,178,0.08)',
                    background: 'rgba(8,145,178,0.02)',
                  }}
                >
                  <div className="flex flex-col gap-1.5">
                    {['desarrollo web', 'apps móviles', 'ui/ux design', 'e-commerce'].map((tag, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[#0891b2]/40 font-mono text-[9px]">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-[10px] font-mono text-slate-400">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Grid de proyectos */}
            <main className="lg:col-span-3">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-[#0891b2]/20 border-t-[#0891b2] animate-spin" />
                  </div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse">Cargando proyectos...</p>
                </div>
              ) : portafoliosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {portafoliosFiltrados.map((proyecto, idx) => (
                    <Link
                      key={proyecto.id}
                      to={`/portafolio/${proyecto.id}`}
                      className="h-full"
                    >
                      <PortafolioCard proyecto={proyecto} idx={idx} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center py-20 rounded-2xl text-center"
                  style={{
                    border: '1px solid rgba(8,145,178,0.12)',
                    background: 'rgba(8,145,178,0.02)',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ border: '1px solid rgba(8,145,178,0.2)', background: 'rgba(8,145,178,0.05)' }}
                  >
                    <Search size={24} className="text-[#0891b2]/50" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium mb-1">
                    {searchQuery ? 'Sin resultados para tu búsqueda' : 'No hay proyectos disponibles'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-3 text-xs font-mono text-[#0891b2] hover:underline uppercase tracking-widest"
                    >
                      Limpiar filtro
                    </button>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
