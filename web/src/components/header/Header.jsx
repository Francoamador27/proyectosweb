"use client";
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "@/lib/router";
import { Menu, X, LogIn, MessageCircle } from "lucide-react";
import WhatsappHref from "../../utils/WhatsappUrl";

const logo = "/img/logo/logo.webp";
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || "https://dashboard.proyectoswebsite.com/";

const NAV = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Portafolio", href: "/portafolio" },
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Marketing", href: "/performance-marketing" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const whatsapp = WhatsappHref({ message: "Hola! Quiero hacer una consulta." });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú móvil al navegar
  useEffect(() => setOpen(false), [pathname]);

  const linkClass = ({ isActive }) =>
    `rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors ${
      isActive ? "bg-brand-soft text-brand-strong" : "text-ink-soft hover:text-ink hover:bg-sand"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled || open ? "bg-cream/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-lg" : "bg-cream"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4 md:h-20" aria-label="Principal">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Grupo Bits, ir al inicio">
          <img src={logo} alt="" className="h-9 w-auto md:h-10" width="48" height="40" />
          <span className="leading-none">
            <span className="block font-display text-lg font-bold text-ink">
              Grupo<span className="text-sky">Bits</span>
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">IT &amp; MKT</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <NavLink to={item.href} end={item.href === "/"} className={linkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-subtle transition-colors hover:text-ink"
          >
            <LogIn size={15} />
            Clientes
          </a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary !px-5 !py-2.5 !text-sm">
            <MessageCircle size={16} />
            Escribinos
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2.5 text-ink transition-colors hover:bg-sand lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={`lg:hidden overflow-hidden border-t border-line bg-cream transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0 border-transparent"
        }`}
      >
        <ul className="container-x space-y-1 py-4">
          {NAV.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-base font-semibold ${
                    isActive ? "bg-brand-soft text-brand-strong" : "text-ink hover:bg-sand"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="grid gap-2 pt-3">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
              <MessageCircle size={18} />
              Escribinos por WhatsApp
            </a>
            <Link to="/trabaja-con-nosotros" className="btn-secondary w-full">
              Trabajá con nosotros
            </Link>
            <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
              <LogIn size={16} />
              Portal clientes
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
