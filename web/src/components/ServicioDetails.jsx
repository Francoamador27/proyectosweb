"use client";
import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from "@/lib/router";
import useSWR from 'swr';
import clienteAxios from '../config/axios';
import { demoteH1 } from '../utils/html';
import WhatsappHref from '../utils/WhatsappUrl';
import { buildImageUrl } from '../utils/imageUrl';
import useCont from '../hooks/useCont';
import { ArrowLeft, CheckCircle, Zap, Shield, TrendingUp, Users, Cpu, Clock, MessageCircle } from 'lucide-react';

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
  const fetcher = (url) => clienteAxios(url).then((res) => res.data);
  const { data: servicioData, isLoading: swrIsLoading } = useSWR(`/api/servicios/${slug}`, fetcher, {
    revalidateOnFocus: false,
  });
  const loading = swrIsLoading && servicioData === undefined;

  // Derivado durante el render (no en useEffect) para que el HTML estático incluya el contenido
  const servicio = useMemo(() => {
    if (!servicioData) return null;
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
      return ({
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
    return null;
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
    return servicio.descripcion.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160).trim();
  }, [servicio]);

  if (loading) {
    return (
      <div className="container-x section" aria-busy="true">
        <div className="h-6 w-32 animate-pulse rounded-full bg-sand" />
        <div className="mt-6 h-14 w-3/4 animate-pulse rounded-xl bg-sand" />
        <div className="mt-10 h-64 animate-pulse rounded-2xl bg-sand" />
      </div>
    );
  }

  if (!servicio) {
    return (
      <div className="container-x section text-center">
        <h1 className="heading-lg">Servicio no encontrado</h1>
        <Link to="/servicios" className="btn-secondary mt-6">Ver todos los servicios</Link>
      </div>
    );
  }

  const whatsapp = WhatsappHref({ message: `Hola! Me interesa "${servicio.titulo}". ¿Me pasan más info?` });

  return (
    <article className="bg-cream">
      <header className="container-x pb-10 pt-10 sm:pt-14">
        <Link to="/servicios" className="inline-flex items-center gap-1.5 text-sm font-semibold text-subtle transition-colors hover:text-ink">
          <ArrowLeft size={16} /> Servicios
        </Link>
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            {servicio.highlight && <span className="eyebrow">{servicio.highlight}</span>}
            <h1 className="heading-xl mt-4">{servicio.titulo}</h1>
            {plainPreview && <p className="lead mt-5 max-w-2xl">{plainPreview}{plainPreview.length >= 160 ? "…" : ""}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={18} /> Pedir presupuesto
              </a>
              <Link to="/contacto" className="btn-secondary">Dejar una consulta</Link>
            </div>
          </div>
          {servicio.image && (
            <div className="overflow-hidden rounded-3xl bg-sand shadow-lift">
              <img src={servicio.image} alt="" className="aspect-[4/3] h-full w-full object-cover" />
            </div>
          )}
        </div>
      </header>

      <div className="bg-paper">
        <div className="container-x section grid items-start gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            {isRichHtml ? (
              <div className="rich-content" dangerouslySetInnerHTML={{ __html: demoteH1(servicio.descripcion) }} />
            ) : (
              <p className="rich-content">{servicio.descripcion}</p>
            )}

            {detalles.length > 0 && (
              <section className="mt-14" aria-labelledby="incluye-titulo">
                <h2 id="incluye-titulo" className="font-display text-2xl font-bold">Qué incluye</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {detalles.map((d, idx) => {
                    const Icon = iconMap[d.icon] || CheckCircle;
                    return (
                      <li key={idx} className="ui-card flex gap-4 bg-cream p-5">
                        <div className="icon-chip"><Icon size={19} /></div>
                        <div className="min-w-0">
                          <h3 className="font-bold">{d.titulo}</h3>
                          {d.descripcion && <p className="mt-1 text-sm leading-relaxed">{d.descripcion}</p>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>

          <aside className="ui-card bg-cream p-6 lg:sticky lg:top-28">
            <p className="font-display text-lg font-bold text-ink">¿Te interesa?</p>
            {servicio.price && (
              <p className="mt-3 text-sm">
                Desde <span className="font-display text-2xl font-bold text-ink">${servicio.price}</span>
              </p>
            )}
            {detalles.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm">
                {detalles.slice(0, 4).map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-brand" /> {d.titulo}
                  </li>
                ))}
              </ul>
            )}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
              <MessageCircle size={18} /> Consultar por WhatsApp
            </a>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-subtle">
              <Clock size={14} /> Respondemos en el día
            </p>
          </aside>
        </div>
      </div>
    </article>
  );
}
