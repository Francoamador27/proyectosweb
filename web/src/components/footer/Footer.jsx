"use client";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import useCont from "../../hooks/useCont";
import { Link } from "@/lib/router";
import WhatsappHref from "../../utils/WhatsappUrl";

const logo = "/img/logo/logo_azul.png";

const EXPLORAR = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/servicios" },
  { label: "Portafolio", to: "/portafolio" },
  { label: "Quiénes somos", to: "/quienes-somos" },
  { label: "Marketing digital", to: "/performance-marketing" },
];

const MAS = [
  { label: "Blog", to: "/blog" },
  { label: "Contacto", to: "/contacto" },
  { label: "Trabajá con nosotros", to: "/trabaja-con-nosotros" },
];

export default function Footer() {
  const { company, contact, social } = useCont();
  const year = new Date().getFullYear();
  const whatsapp = WhatsappHref({ message: "Hola! Quiero que mi negocio aparezca en Google." });

  return (
    <footer className="mt-auto">
      {/* Franja CTA */}
      <div className="container-x">
        <div className="relative -mb-16 overflow-hidden rounded-3xl bg-brand px-6 py-10 text-center shadow-lift sm:px-12 sm:text-left">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" aria-hidden="true" />
          <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" aria-hidden="true" />
          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <div>
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                ¿Tu negocio ya aparece en Google?
              </p>
              <p className="mt-2 text-white/85">Te ayudamos a que te encuentren, te llamen y te escriban.</p>
            </div>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn shrink-0 bg-white text-brand-strong hover:bg-cream"
            >
              <MessageCircle size={18} />
              Hablemos por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="bg-sand pt-28">
        <div className="container-x grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src={logo} alt="" className="h-10 w-auto" width="40" height="40" />
              <span className="font-display text-xl font-bold text-ink">
                Grupo<span className="text-sky">Bits</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Webs, Google y marketing digital para negocios que quieren más clientes, explicado simple y sin vueltas.
            </p>
            {(social.facebook || social.instagram) && (
              <div className="mt-5 flex gap-2">
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="rounded-full bg-paper p-2.5 text-ink-soft shadow-soft transition-colors hover:text-brand">
                    <FaFacebook />
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="rounded-full bg-paper p-2.5 text-ink-soft shadow-soft transition-colors hover:text-brand">
                    <FaInstagram />
                  </a>
                )}
              </div>
            )}
          </div>

          {[["Explorar", EXPLORAR], ["Más", MAS]].map(([titulo, links]) => (
            <nav key={titulo} aria-label={titulo}>
              <p className="mb-4 font-display text-sm font-bold text-ink">{titulo}</p>
              <ul className="space-y-2.5 text-sm">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="transition-colors hover:text-brand">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="mb-4 font-display text-sm font-bold text-ink">Contacto</p>
            <ul className="space-y-3 text-sm">
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone}`} className="flex items-start gap-2.5 transition-colors hover:text-brand">
                    <Phone size={17} className="mt-0.5 shrink-0 text-brand" /> {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-start gap-2.5 break-all transition-colors hover:text-brand">
                    <Mail size={17} className="mt-0.5 shrink-0 text-brand" /> {contact.email}
                  </a>
                </li>
              )}
              {company.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-brand" /> {company.address}
                </li>
              )}
              {company.business_hours && (
                <li className="flex items-start gap-2.5">
                  <Clock size={17} className="mt-0.5 shrink-0 text-brand" /> {company.business_hours}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-subtle sm:flex-row">
            <p>© {year} {company.name || "Grupo Bits"}. Todos los derechos reservados.</p>
            <p>Trabajamos con negocios de toda Argentina</p>
          </div>
        </div>
      </div>

      <FloatingWhatsApp
        phoneNumber={contact.whatsapp || ""}
        accountName={company.name || "Grupo Bits"}
        avatar={logo}
        statusMessage="Respondemos en el día"
        chatMessage="¡Hola! 👋 ¿En qué podemos ayudarte?"
        placeholder="Escribí tu mensaje..."
        allowEsc
        allowClickAway
        notification
        notificationSound
        darkMode={false}
      />
    </footer>
  );
}
