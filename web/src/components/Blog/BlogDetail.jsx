"use client";
import React, { useMemo } from 'react';
import useSWR from 'swr';
import { useParams, Link } from "@/lib/router";
import clienteAxios from '../../config/axios';
import { Calendar, ArrowLeft, Share2, Clock, MessageCircle } from 'lucide-react';
import { formatFecha } from '../../utils/date';
import { demoteH1 } from '../../utils/html';
import WhatsappHref from '../../utils/WhatsappUrl';

export default function BlogDetail() {
  const { slug } = useParams();

  const fetcher = (url) => clienteAxios(url).then((res) => res.data);
  const { data, isLoading: swrIsLoading, error } = useSWR(`/api/posts/${slug}`, fetcher);
  const isLoading = swrIsLoading && data === undefined;
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

  if (isLoading) {
    return (
      <div className="container-x section max-w-3xl" aria-busy="true">
        <div className="h-6 w-40 animate-pulse rounded-full bg-sand" />
        <div className="mt-6 h-14 w-full animate-pulse rounded-xl bg-sand" />
        <div className="mt-10 aspect-[16/9] animate-pulse rounded-3xl bg-sand" />
      </div>
    );
  }

  // Solo "no encontrado" si no hay datos: un error al revalidar en el navegador
  // no debe ocultar el artículo que ya vino en el HTML estático
  if (!post) {
    return (
      <div className="container-x section text-center">
        <h1 className="heading-lg">Artículo no encontrado</h1>
        <Link to="/blog" className="btn-secondary mt-6">Volver al blog</Link>
      </div>
    );
  }

  const rawUrl = post.youtube_url || post.youtubeUrl;
  const embedUrl = rawUrl ? getYouTubeEmbedUrl(rawUrl) : null;
  const minLectura = estimarTiempoLectura(post.contenido);
  const whatsapp = WhatsappHref({ message: `Hola! Leí "${post.titulo}" y quiero hacer una consulta.` });

  return (
    <article className="bg-cream">
      <header className="container-x max-w-3xl pt-10 sm:pt-14">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-subtle transition-colors hover:text-ink">
          <ArrowLeft size={16} /> Blog
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-subtle">
          {post.categoria?.nombre && <span className="eyebrow">{post.categoria.nombre}</span>}
          <span className="inline-flex items-center gap-1.5"><Calendar size={15} /> {formatFecha(post.publicado_en ?? post.created_at)}</span>
          <span className="inline-flex items-center gap-1.5"><Clock size={15} /> {minLectura} min de lectura</span>
        </div>
        <h1 className="heading-xl mt-5 !text-4xl sm:!text-5xl">{post.titulo}</h1>
        {post.autor?.name && <p className="mt-4 text-sm">Por <span className="font-semibold text-ink">{post.autor.name}</span></p>}
      </header>

      {post.imagen && (
        <div className="container-x mt-10 max-w-4xl">
          <img src={post.imagen} alt="" className="aspect-[16/9] w-full rounded-3xl object-cover shadow-lift" />
        </div>
      )}

      <div className="container-x section max-w-3xl">
        {isRichHtml ? (
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: demoteH1(post.contenido) }} />
        ) : (
          <p className="rich-content">{post.contenido}</p>
        )}

        {rawUrl && (
          <div className="mt-12">
            {embedUrl ? (
              <div className="aspect-video overflow-hidden rounded-2xl shadow-soft">
                <iframe
                  src={embedUrl}
                  title={`Video: ${post.titulo}`}
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <a href={rawUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">Ver el video en YouTube</a>
            )}
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            <ArrowLeft size={16} /> Más artículos
          </Link>
          <button type="button" onClick={handleShare} className="btn-secondary !py-2.5 !text-sm">
            <Share2 size={16} /> Compartir
          </button>
        </div>

        <aside className="mt-12 rounded-3xl bg-brand p-8 text-center text-white sm:p-10">
          <p className="font-display text-2xl font-bold">¿Querés que te ayudemos con esto?</p>
          <p className="mt-2 text-white/85">Escribinos y te asesoramos sin compromiso.</p>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn mt-6 bg-white text-brand-strong hover:bg-cream">
            <MessageCircle size={18} /> Consultar por WhatsApp
          </a>
        </aside>
      </div>
    </article>
  );
}
