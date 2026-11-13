"use client";
/**
 * Servicio principal del home: paquete llave en mano para que un negocio local
 * aparezca en Google (web + SEO local + Perfil de Empresa en Google Maps).
 */
import {
  Globe,
  MapPin,
  Search,
  MessageCircle,
  BarChart3,
  Star,
  Phone,
  Navigation,
  Wrench,
  Megaphone,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "@/lib/router";
import WhatsappHref from "../utils/WhatsappUrl";

const INCLUYE = [
  {
    icon: Globe,
    titulo: "Web profesional con dominio propio",
    texto: "Rápida, adaptada a celular y lista para que te contacten desde el primer día.",
  },
  {
    icon: Search,
    titulo: "SEO local",
    texto: "Títulos, textos y estructura pensados para búsquedas como “[tu rubro] en [tu ciudad]” o “cerca de mí”.",
  },
  {
    icon: MapPin,
    titulo: "Perfil de Empresa en Google Maps",
    texto: "Alta y optimización: categorías, horarios, fotos, servicios y zona de cobertura.",
  },
  {
    icon: MessageCircle,
    titulo: "WhatsApp y llamada directa",
    texto: "Botones visibles para que el cliente te escriba o te llame con un toque.",
  },
  {
    icon: BarChart3,
    titulo: "Google Analytics",
    texto: "Medimos visitas y consultas para saber qué está funcionando.",
  },
  {
    icon: Star,
    titulo: "Estrategia de reseñas",
    texto: "Un método simple para que tus clientes te dejen reseñas y generes confianza.",
  },
];

const OPCIONALES = [
  { icon: Wrench, texto: "Mantenimiento mensual" },
  { icon: Megaphone, texto: "Campañas de Google Ads" },
];

const WHATSAPP_MSG =
  "Hola! Quiero que mi negocio aparezca en Google. ¿Me pasan info del paquete web + Google Maps?";

/** Maqueta ilustrativa de un resultado de Google con el Perfil de Empresa. */
function GoogleMockup() {
  return (
    <div aria-hidden="true" className="relative w-full max-w-md mx-auto">
      <div
        className="absolute -inset-6 rounded-[2rem] blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(21,128,61,0.14), transparent 70%)" }}
      />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white text-left shadow-lift">
        {/* Barra de búsqueda */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-sm text-slate-700 truncate">cerrajería cerca de mí</span>
        </div>

        {/* Mapa simplificado */}
        <div className="relative h-28 bg-[#e8f0e6] overflow-hidden">
          <div className="absolute inset-0 opacity-60" style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 46%, #fff 46%, #fff 54%, transparent 54%), linear-gradient(0deg, transparent 40%, #fff 40%, #fff 47%, transparent 47%)",
            backgroundSize: "120px 80px",
          }} />
          <div className="absolute left-[18%] top-[30%] w-16 h-10 rounded-lg bg-[#c9dcf2]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <MapPin className="w-9 h-9 text-red-500 fill-red-500 drop-shadow" strokeWidth={1.5} />
          </div>
        </div>

        {/* Ficha del negocio */}
        <div className="p-4">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Negocio destacado</p>
          <p className="text-lg font-bold text-slate-900 leading-tight">Tu Negocio</p>
          <div className="flex items-center gap-1.5 mt-1 text-sm">
            <span className="font-semibold text-slate-700">4,9</span>
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="text-slate-500">(reseñas)</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Cerrajería · <span className="text-emerald-600 font-medium">Abierto</span> · A 900 m
          </p>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { icon: Phone, label: "Llamar" },
              { icon: MessageCircle, label: "WhatsApp" },
              { icon: Navigation, label: "Cómo llegar" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 py-2">
                <Icon className="w-4 h-4 text-brand" />
                <span className="text-[11px] font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
            <Globe className="w-4 h-4 text-brand shrink-0" />
            <span className="text-xs text-slate-600 truncate">www.tunegocio.com.ar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NegocioLocalGoogle() {
  const whatsappUrl = WhatsappHref({ message: WHATSAPP_MSG });

  // Datos estructurados del servicio (Google entiende qué se ofrece y dónde)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web + SEO local + Google Maps para negocios",
    serviceType: "Posicionamiento local en Google",
    description:
      "Paquete llave en mano para que un negocio local aparezca en Google: web profesional con dominio propio, SEO local, Perfil de Empresa en Google Maps, WhatsApp, Google Analytics y estrategia de reseñas.",
    areaServed: { "@type": "Country", name: "Argentina" },
  };

  return (
    <section id="negocio-en-google" className="section bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Servicio principal · Llave en mano</span>
            <h2 className="heading-lg mt-5 lg:text-5xl">
              Que tu negocio aparezca <span className="text-brand">cuando te buscan en Google</span>
            </h2>
            <p className="lead mt-5 max-w-xl">
              Estés donde estés en Argentina, nos ocupamos de todo para que tu negocio aparezca en Google y en
              Google Maps: armamos la web, configuramos tu perfil y dejamos todo listo para que
              los clientes te llamen o te escriban.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle className="h-5 w-5" />
                Quiero aparecer en Google
              </a>
              <Link to="/contacto" className="btn-secondary">
                Pedir presupuesto
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <GoogleMockup />
        </div>

        <h3 className="mt-20 mb-6 font-display text-xl font-bold">Qué incluye el paquete</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUYE.map(({ icon: Icon, titulo, texto }) => (
            <li key={titulo} className="ui-card-hover bg-cream p-6">
              <div className="icon-chip mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="mb-1.5 text-lg font-bold">{titulo}</h4>
              <p className="text-sm leading-relaxed">{texto}</p>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-dashed border-line px-6 py-4 sm:flex-row sm:items-center sm:gap-6">
          <span className="text-sm font-bold text-ink">Opcional:</span>
          {OPCIONALES.map(({ icon: Icon, texto }) => (
            <span key={texto} className="inline-flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4 text-brand" />
              {texto}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 text-xs text-subtle sm:ml-auto">
            <Check className="h-3.5 w-3.5 text-brand" />
            Te lo dejamos funcionando, sin que tengas que tocar nada técnico
          </span>
        </div>
      </div>
    </section>
  );
}
