"use client";
import { MapPin, Clock, Phone, Mail, MessageCircle, HeartHandshake, Target, Sprout } from "lucide-react";
import { Link } from "@/lib/router";
import WhatsappHref from "../utils/WhatsappUrl";
import Mapa from "./Mapa/Mapa";
import useCont from "../hooks/useCont";

const VALORES = [
  {
    icon: HeartHandshake,
    titulo: "Cercanía",
    texto: "Hablás siempre con las mismas personas. Te explicamos todo en simple.",
  },
  {
    icon: Target,
    titulo: "Resultados que se ven",
    texto: "Medimos visitas, llamadas y consultas para saber qué funciona.",
  },
  {
    icon: Sprout,
    titulo: "Crecer juntos",
    texto: "Empezamos por lo necesario y sumamos herramientas cuando tu negocio lo pide.",
  },
];

const QUE_HACEMOS = [
  "Webs profesionales y tiendas online",
  "Perfil de Empresa en Google y SEO local",
  "Campañas en Google y redes sociales",
  "Sistemas y automatizaciones a medida",
];

const QuienesSomos = () => {
  const { company, logoUrl, contact } = useCont();
  const whatsapp = WhatsappHref({ message: "Hola! Quiero conocer más sobre cómo trabajan." });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company?.name || "Grupo Bits",
    url: company?.domain || undefined,
    logo: logoUrl || undefined,
    description:
      "Acompañamos a negocios y emprendedores en su crecimiento digital: webs, Google, marketing y sistemas a medida.",
    telephone: contact?.phone || undefined,
    address: company?.address ? { "@type": "PostalAddress", streetAddress: company.address, addressCountry: "AR" } : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section bg-cream">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="eyebrow">Quiénes somos</span>
            <h1 className="heading-xl mt-4">Tu equipo digital, cerca tuyo</h1>
            <p className="lead mt-5">
              Somos {company?.name || "Grupo Bits"}: acompañamos a comercios, profesionales y emprendedores
              para que los encuentren en internet y les consulten más. Combinamos tecnología, marketing
              y comunicación, explicado sin vueltas.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={18} /> Hablemos
              </a>
              <Link to="/servicios" className="btn-secondary">Ver servicios</Link>
            </div>
          </div>

          <div className="ui-card p-8">
            <h2 className="font-display text-xl font-bold">Qué hacemos</h2>
            <ul className="mt-5 space-y-3">
              {QUE_HACEMOS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="valores-titulo">
        <div className="container-x">
          <h2 id="valores-titulo" className="heading-lg text-center">Cómo nos gusta trabajar</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {VALORES.map(({ icon: Icon, titulo, texto }) => (
              <li key={titulo} className="ui-card bg-cream p-7">
                <div className="icon-chip"><Icon size={20} /></div>
                <h3 className="mt-5 text-lg font-bold">{titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed">{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-cream" aria-labelledby="donde-titulo">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="ui-card p-8">
            <h2 id="donde-titulo" className="font-display text-2xl font-bold">Dónde encontrarnos</h2>
            <ul className="mt-6 space-y-4">
              {company.address && (
                <li className="flex gap-3"><MapPin size={20} className="mt-0.5 shrink-0 text-brand" /> {company.address}</li>
              )}
              {company.business_hours && (
                <li className="flex gap-3"><Clock size={20} className="mt-0.5 shrink-0 text-brand" /> {company.business_hours}</li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone}`} className="flex gap-3 hover:text-brand">
                    <Phone size={20} className="mt-0.5 shrink-0 text-brand" /> {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="flex gap-3 break-all hover:text-brand">
                    <Mail size={20} className="mt-0.5 shrink-0 text-brand" /> {contact.email}
                  </a>
                </li>
              )}
            </ul>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full">
              <MessageCircle size={18} /> Escribinos por WhatsApp
            </a>
          </div>
          {contact.map_iframe && (
            <div className="min-h-[320px] overflow-hidden rounded-3xl bg-sand shadow-soft">
              <Mapa />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default QuienesSomos;
