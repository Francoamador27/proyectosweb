import { PhoneIcon, BuildingOfficeIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import WhatsappHref from '../utils/WhatsappUrl';
import Mapa from './Mapa/Mapa';
import useCont from '../hooks/useCont';
import SEOHead from './Head/Head';
import Lanyard from './Lanyard';
import MagicBento from './MagicBento';
const QuienesSomos = () => {
  const { company, logoUrl, contact } = useCont();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": company?.name || "Grupo Bits",
    "url": window?.location?.origin || "",
    "logo": logoUrl || `${window?.location?.origin || ''}/logo.png`,
    "description": "Consultora especializada en transformación digital para empresas y emprendedores. Integramos tecnología, marketing y comunicación para lograr crecimiento real y medible.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contact?.phone || "+54 9 351 0000000",
      "contactType": "Consultoría Digital",
      "areaServed": "AR",
      "availableLanguage": ["Español"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": company?.address || "Argentina",
      "addressCountry": "AR"
    }
  };

  return (
    <section className="relative">
      <SEOHead
        title={`Grupo Bits | Digitalización, Marketing y Comunicación`}
        description={`Grupo Bits: especialistas en acompañar empresas y emprendedores en su proceso de digitalización. Integramos tecnología, marketing y comunicación para lograr crecimiento real y medible.`}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-white" />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="mt-6 text-5xl md:text-5xl font-black text-slate-900 leading-tight">
            Tu socio digital para el crecimiento
          </h1>
          <p className="mt-6 text-slate-600 text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Somos una consultora especializada en <strong>acompañar empresas y emprendedores</strong> en su proceso de digitalización.
            Integramos tecnología, marketing y comunicación para lograr <strong>crecimiento real y medible</strong>.
          </p>
        </header>

        {/* Grid principal */}
        <div className="grid md:grid-cols-5 gap-10">
          {/* Columna texto */}
          <div className="md:col-span-3">
            <section className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12 relative overflow-hidden">
              {/* Lanyard 3D Animation Background */}
              <div className="absolute inset-0 -z-10 h-96 rounded-3xl overflow-hidden">
                <Lanyard />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Nuestra Misión</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  En <strong className="text-[#0891b2]">Grupo Bits</strong>, entendemos que la transformación digital no es solo tecnología.
                  Es un proceso integral que combina estrategia, innovación y ejecución. Por eso acompañamos a cada empresa en su camino
                  hacia la modernización, adaptando soluciones personalizadas que generan impacto real en sus resultados.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="rounded-2xl border border-slate-100 p-6 bg-gradient-to-br from-cyan-50 to-white hover:shadow-lg transition-all duration-300">
                    <h3 className="font-black text-slate-900 flex items-center gap-3 mb-4">
                      <BuildingOfficeIcon className="w-6 h-6 text-[#0891b2]" />
                      Nuestros Servicios
                    </h3>
                    <ul className="text-slate-600 space-y-2 font-medium">
                      <li>• Transformación digital integral</li>
                      <li>• Estrategia de marketing digital</li>
                      <li>• Desarrollo web y mobile</li>
                      <li>• Consultoría tecnológica</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-100 p-6 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300">
                    <h3 className="font-black text-slate-900 flex items-center gap-3 mb-4">
                      <CheckBadgeIcon className="w-6 h-6 text-[#0891b2]" />
                      Garantía Grupo Bits
                    </h3>
                    <ul className="text-slate-600 space-y-2 font-medium">
                      <li>• Resultados medibles</li>
                      <li>• Equipo experto dedicado</li>
                      <li>• Soporte continuo</li>
                      <li>• ROI garantizado</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href={WhatsappHref({ message: "Hola, me gustaría recibir asesoramiento sobre cómo digitalizar mi empresa." })}
                    className="bg-[#0891b2] hover:bg-[#0e7490] text-white px-8 py-4 rounded-xl font-black text-lg shadow-lg shadow-[#0891b2]/20 transition-all active:scale-95 hover:scale-105"
                    target="_blank"
                  >
                    💡 TRANSFORMEMOS MI EMPRESA
                  </a>

                  <Link
                    to="/contacto"
                    className="bg-white hover:bg-cyan-50 text-slate-900 ring-2 ring-[#0891b2]/20 px-8 py-4 rounded-xl font-black text-lg transition-all"
                  >
                    📞 CONTACTO
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Columna lateral */}
          <aside className="md:col-span-2 space-y-8">
            <div className="rounded-3xl border border-slate-100 bg-white shadow-lg p-8">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Contacto Directo</h3>
              <div className="space-y-5 text-slate-700">
                <div>
                  <span className="block text-slate-400 font-bold uppercase text-xs tracking-widest mb-1">Oficinas</span>
                  <strong className="text-lg">{company.address || "Argentina"}</strong>
                </div>
                <div>
                  <span className="block text-slate-400 font-bold uppercase text-xs tracking-widest mb-1">Horario de Atención</span>
                  <strong className="text-lg">{company.business_hours || "Lunes a Viernes, 9 a 18hs"}</strong>
                </div>
                <div>
                  <span className="block text-slate-400 font-bold uppercase text-xs tracking-widest mb-1">Medios de Contacto</span>
                  <div className="flex flex-col gap-2 mt-2">
                    <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0891b2] font-bold hover:underline">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      WhatsApp: {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 font-medium hover:text-[#0891b2]">
                      {contact.email || "info@grupobits.com"}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-[2rem] ring-4 ring-slate-50 shadow-inner">
                <Mapa />
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-[#0891b2] to-cyan-700 p-8 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
              <h3 className="text-xl font-black mb-4 flex items-center gap-2 relative z-10">
                <span className="text-amber-200">✨</span> Nuestro Compromiso
              </h3>
              <p className="text-white/95 leading-relaxed font-medium relative z-10">
                En Grupo Bits no solo brindamos soluciones, construimos <strong>alianzas estratégicas</strong>. Entendemos que cada empresa tiene desafíos únicos, por eso ofrecemos estrategias personalizadas que generan <strong>crecimiento real y medible</strong>.
              </p>
            </div>
          </aside>
        </div>

        {/* CTA final */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-white border border-[#0891b2]/20 p-8 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-black text-slate-900">
                ¿Buscás acelerar la transformación digital de tu empresa?
              </h4>
              <p className="text-slate-600 font-medium">
                Consultanos sobre nuestros planes de digitalización, estrategia digital y consultoría tecnológica.
              </p>
            </div>
            <a
              href={WhatsappHref({ message: "Hola, me interesa información sobre soluciones de transformación digital para mi empresa." })}
              className="bg-[#0891b2] text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform whitespace-nowrap hover:bg-[#0e7490]"
            >
              SOLUTIONS DIGITAL
            </a>
          </div>
        </div>
      </div>

      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
};

export default QuienesSomos;
