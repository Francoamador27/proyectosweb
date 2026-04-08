import React, { useMemo } from 'react';
import useSWR from 'swr';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { Calendar, Tag, ArrowLeft, Share2, Clock, ArrowRight } from 'lucide-react';
import '../Posts/TiptapEditor.css';

export default function BlogDetail() {
  const { slug } = useParams();

  const fetcher = (url) => clienteAxios(url).then((res) => res.data);
  const { data, isLoading, error } = useSWR(`/api/posts/${slug}`, fetcher);
  const post = data?.data || data;

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const estimarTiempoLectura = (contenido) => {
    if (!contenido) return 1;
    const palabras = contenido.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(palabras / 200);
  };

  const getYouTubeEmbedUrl = (value) => {
    if (!value) return null;
    const raw = value.trim();
    if (!raw) return null;
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    try {
      const url = new URL(withProtocol);
      const host = url.hostname.replace(/^www\./, '');
      let id = '';
      if (host === 'youtu.be') {
        id = url.pathname.slice(1);
      } else if (host === 'youtube.com' || host === 'm.youtube.com') {
        if (url.pathname.startsWith('/watch')) id = url.searchParams.get('v') || '';
        else if (url.pathname.startsWith('/shorts/')) id = url.pathname.split('/shorts/')[1] || '';
        else if (url.pathname.startsWith('/embed/')) id = url.pathname.split('/embed/')[1] || '';
      }
      if (!id) return null;
      return `https://www.youtube.com/embed/${id.split('?')[0].split('&')[0]}`;
    } catch {
      return null;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post.titulo, text: `Lee este artículo: ${post.titulo}`, url: window.location.href });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const isRichHtml = post?.contenido && /<[a-z][\s\S]*>/i.test(post.contenido);

  const plainPreview = useMemo(() => {
    if (!post?.contenido) return '';
    return post.contenido.replace(/<[^>]*>/g, '').slice(0, 160).trim();
  }, [post]);

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-[#0891b2]/20 border-t-[#0891b2] animate-spin" />
          </div>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  // ── Error / Not Found ──
  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-black text-slate-100 mb-4">404</p>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Artículo no encontrado</h1>
          <Link to="/blog" className="text-[#0891b2] font-medium hover:underline">Volver al blog</Link>
        </div>
      </div>
    );
  }

  const rawUrl = post.youtube_url || post.youtubeUrl;
  const embedUrl = rawUrl ? getYouTubeEmbedUrl(rawUrl) : null;
  const minLectura = estimarTiempoLectura(post.contenido);

  return (
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
        <div className="max-w-7xl mx-auto px-6 pt-10">

          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#0891b2] text-sm font-medium transition-colors group mb-10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Blog
          </Link>

          {/* Badges + Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {post.categoria && (
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ border: '1px solid rgba(8,145,178,0.25)', background: 'rgba(8,145,178,0.06)', color: '#0891b2' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-pulse" />
                <Tag className="w-3 h-3" />
                {post.categoria.nombre}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-500 text-xs font-semibold">
              <Clock className="w-3 h-3" />
              {minLectura} min de lectura
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-500 text-xs font-semibold">
              <Calendar className="w-3 h-3" />
              {formatDate(post.created_at || post.fecha)}
            </span>
          </div>

          {/* Título */}
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              {post.titulo}
            </h1>

            {/* Divisor */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 rounded-full" style={{ background: 'linear-gradient(90deg, #0891b2, transparent)' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2]" style={{ boxShadow: '0 0 6px rgba(8,145,178,0.5)' }} />
            </div>

            {/* Acciones */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 font-black rounded-xl transition-all hover:scale-[1.03] active:scale-95 text-sm shadow-lg text-white"
                style={{ background: '#0891b2', boxShadow: '0 4px 16px rgba(8,145,178,0.3)' }}
              >
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:border-[#0891b2]/30 hover:text-[#0891b2] transition-all text-sm font-semibold"
              >
                Ver más artículos
              </Link>
            </div>
          </div>
        </div>

        {/* ─── MAIN CONTENT ─── */}
        <div className="max-w-7xl mx-auto px-6 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16 items-start">

            {/* ── Artículo ── */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] font-mono">Artículo</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <div className="relative">
                <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-lg pointer-events-none" style={{ borderColor: 'rgba(8,145,178,0.3)' }} />
                <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 rounded-br-lg pointer-events-none" style={{ borderColor: 'rgba(8,145,178,0.3)' }} />

                {isRichHtml ? (
                  <div className="rich-content" dangerouslySetInnerHTML={{ __html: post.contenido }} />
                ) : (
                  <p className="text-slate-600 text-lg leading-relaxed">{post.contenido || 'Sin contenido'}</p>
                )}
              </div>

              {/* Video */}
              {rawUrl && (
                <div className="mt-14">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] font-mono">Video</span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>
                  {embedUrl ? (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                      <iframe
                        src={embedUrl}
                        title={`Video de ${post.titulo}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <a
                      href={rawUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 font-black rounded-xl transition-all text-sm text-white"
                      style={{ background: '#0891b2' }}
                    >
                      Ver video en YouTube
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="mt-14 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                {post.categoria && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Categoría:</span>
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ border: '1px solid rgba(8,145,178,0.2)', background: 'rgba(8,145,178,0.06)', color: '#0891b2' }}
                    >
                      <Tag className="w-3 h-3" />
                      {post.categoria.nombre}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:border-[#0891b2]/30 hover:text-[#0891b2] transition-all text-sm font-semibold"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir artículo
                </button>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:sticky lg:top-8 flex flex-col gap-4">

              {/* Imagen */}
              {post.imagen && (
                <div className="group relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] shadow-sm">
                  <img
                    src={post.imagen}
                    alt={post.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                  {/* Acento top */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #0891b2, transparent)' }} />
                </div>
              )}

              {/* Info card */}
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(8,145,178,0.15)', background: 'rgba(255,255,255,0.9)' }}>
                <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: 'rgba(8,145,178,0.1)', background: 'rgba(8,145,178,0.03)' }}>
                  <div className="w-2 h-2 rounded-full bg-[#0891b2] animate-pulse" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Resumen</span>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Artículo</p>
                    <p className="text-slate-800 font-bold text-sm leading-snug">{post.titulo}</p>
                  </div>

                  {post.categoria && (
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Categoría</p>
                      <p className="text-[#0891b2] font-semibold text-sm">{post.categoria.nombre}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Publicado</p>
                    <p className="text-slate-600 text-sm">{formatDate(post.created_at || post.fecha)}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Tiempo de lectura</p>
                    <p className="text-slate-600 text-sm">{minLectura} min</p>
                  </div>

                  <div className="pt-1 flex flex-col gap-2">
                    <button
                      onClick={handleShare}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 font-black rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-sm shadow-md text-white"
                      style={{ background: '#0891b2', boxShadow: '0 4px 14px rgba(8,145,178,0.3)' }}
                    >
                      <Share2 className="w-4 h-4" />
                      Compartir
                    </button>
                    <Link
                      to="/blog"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-500 hover:border-[#0891b2]/30 hover:text-[#0891b2] transition-all text-sm font-semibold"
                    >
                      Ver más artículos
                    </Link>
                  </div>
                </div>
              </div>

              {/* Preview del contenido */}
              {plainPreview && (
                <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="w-0.5 min-h-[2.5rem] rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(8,145,178,0.3)' }} />
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-4">{plainPreview}</p>
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* ─── CTA FINAL ─── */}
        <div className="border-t border-slate-100 py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#0891b2] text-xs font-bold uppercase tracking-[0.3em] font-mono mb-4">Seguí leyendo</p>
            <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
              ¿Te gustó este artículo?
            </h3>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto">
              Explorá más contenido en nuestro blog sobre tecnología y desarrollo digital.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 font-black rounded-xl transition-all hover:scale-105 active:scale-95 text-white shadow-xl"
              style={{ background: '#0891b2', boxShadow: '0 8px 24px rgba(8,145,178,0.3)' }}
            >
              Ver más artículos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
