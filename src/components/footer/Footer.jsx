import logo_azul from '../../assets/img/logo/logo_azul.png';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import useCont from '../../hooks/useCont';
import { Link } from 'react-router-dom';

export default function Footer() {
    const { company, contact, social } = useCont();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative  bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl"></div>

            {/* Contenido principal */}
            <div className="relative max-w-7xl mx-auto px-6 py-20">
                {/* Grid principal */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    
                    {/* Logo y breve descripción */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 group">
                            <img 
                                src={logo_azul} 
                                alt={`Logo ${company.name}`} 
                                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
                            />
                            <div className="leading-tight">
                                <p className="text-xl font-black tracking-tight">
                                    Grupo<span className="text-cyan-400">Bits</span>
                                </p>
                                <p className="text-[11px] uppercase tracking-widest text-slate-400">
                                    IT & MKT
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed font-light">
                            Soluciones tecnológicas y marketing digital para transformar tu negocio con innovación y creatividad.
                        </p>
                        {/* Redes Sociales */}
                        <div className="flex gap-4 pt-4">
                            {social.facebook && (
                                <a
                                    href={social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white/10 hover:bg-cyan-500 rounded-full transition-all duration-300 hover:scale-110"
                                    title="Facebook"
                                >
                                    <FaFacebook className="text-lg" />
                                </a>
                            )}
                            {social.instagram && (
                                <a
                                    href={social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white/10 hover:bg-pink-500 rounded-full transition-all duration-300 hover:scale-110"
                                    title="Instagram"
                                >
                                    <FaInstagram className="text-lg" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-cyan-400">
                            Explorar
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/servicios" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
                                    Servicios
                                </Link>
                            </li>
                            <li>
                                <Link to="/portafolio" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
                                    Portafolio
                                </Link>
                            </li>
                            <li>
                                <Link to="/quienes-somos" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
                                    Quiénes Somos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto y Oportunidades */}
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-green-400">
                            Oportunidades
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/contacto" className="text-slate-300 hover:text-green-400 transition-colors text-sm font-medium">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-slate-300 hover:text-green-400 transition-colors text-sm font-medium">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/trabaja-con-nosotros" className="text-slate-300 hover:text-green-400 transition-colors text-sm font-medium">
                                    Trabaja con Nosotros
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Información de Contacto */}
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-indigo-400">
                            Contacto
                        </h3>
                        <div className="space-y-4">
                            {contact.email && (
                                <a 
                                    href={`mailto:${contact.email}`}
                                    className="flex items-start gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
                                >
                                    <Mail size={18} className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">{contact.email}</span>
                                </a>
                            )}
                            {contact.phone && (
                                <a 
                                    href={`tel:${contact.phone}`}
                                    className="flex items-start gap-3 text-slate-300 hover:text-green-400 transition-colors group"
                                >
                                    <Phone size={18} className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">{contact.phone}</span>
                                </a>
                            )}
                            {company.address && (
                                <div className="flex items-start gap-3 text-slate-300">
                                    <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{company.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Divisor */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8"></div>

                {/* Copyright y derechos */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                        <p>© {currentYear} <span className="font-black text-white">GrupoBits</span> — Todos los derechos reservados</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p>Hecho con</p>
                        <Heart size={14} className="text-red-500 fill-red-500" />
                        <p>para tu éxito digital</p>
                    </div>
                </div>
            </div>

            {/* FloatingWhatsApp */}
            <FloatingWhatsApp
                phoneNumber={contact.whatsapp || "+5493510000000"}
                accountName={company.name || "Grupo Bits"}
                avatar={logo_azul}
                statusMessage="IT & MKT Solutions"
                chatMessage="¡Hola! 👋 ¿En qué podemos ayudarte hoy?"
                placeholder="Escribe tu mensaje..."
                allowEsc
                allowClickAway
                notification
                notificationSound
                darkMode={true}
            />
        </footer>
    );
}
