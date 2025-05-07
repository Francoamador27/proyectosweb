import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";
import {
  Laptop,
  Settings,
  ShoppingCart,
  FileText,
  Search,
  MapPin,
  MessageCircle,
  MailOpen,
  CalendarCheck
} from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Servicios", href: "#servicios" },
  { label: "Diferencial", href: "#diferencial" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Contacto", href: "#contacto" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <Laptop size={20} />,
    text: "Diseño Web Personalizado",
    description: "Creamos interfaces modernas, responsivas y optimizadas para la experiencia del usuario, adaptadas a tu marca."
  },
  {
    icon: <Settings size={20} />,
    text: "Desarrollo Full Stack",
    description: "Soluciones completas con backend en Node.js o Laravel, y frontend con React, listas para escalar."
  },
  {
    icon: <ShoppingCart size={20} />,
    text: "Tiendas Online y Catálogos",
    description: "Integración de eCommerce personalizados para ventas, reservas y gestión de productos con WooCommerce o sistemas propios."
  },
  {
    icon: <FileText size={20} />,
    text: "Landing Pages Efectivas",
    description: "Páginas de aterrizaje diseñadas para convertir visitas en clientes potenciales, ideales para campañas específicas."
  },
  {
    icon: <Search size={20} />,
    text: "SEO en Google",
    description: "Optimizamos tu sitio para mejorar su posicionamiento en los resultados de búsqueda y aumentar la visibilidad orgánica."
  },
  {
    icon: <MapPin size={20} />,
    text: "Google Maps Integrado",
    description: "Agregamos mapas interactivos para que tus clientes encuentren tu negocio fácilmente desde cualquier dispositivo."
  },
  {
    icon: <MessageCircle size={20} />,
    text: "Botón de WhatsApp",
    description: "Conectá tu sitio con WhatsApp para atención al cliente directa o recepción de pedidos en tiempo real."
  },
  {
    icon: <MailOpen size={20} />,
    text: "Envío de Emails",
    description: "Formularios de contacto conectados con tu email o CRM, listos para recibir consultas o enviar notificaciones automáticas."
  },
  {
    icon: <CalendarCheck size={20} />,
    text: "Calendario de Citas",
    description: "Permití que tus clientes reserven turnos online con confirmaciones automáticas y recordatorios por correo."
  }
];



export const checklistItems = [
  {
    title: "Código a tu nombre",
    description: "El código de tu sitio es 100% tuyo. Sin dependencias ocultas ni bloqueos: tenés el control total."
  },
  {
    title: "Seguridad y mantenimiento",
    description: "Aplicamos buenas prácticas y protección contra ataques comunes para que tu web funcione segura y estable."
  },
  {
    title: "Automatizaciones inteligentes",
    description: "Convertimos tu sitio en un sistema: formularios conectados, envíos automáticos, gestión sin esfuerzo."
  },
  {
    title: "Diseño escalable",
    description: "Creamos estructuras listas para crecer con tu negocio, sin necesidad de rehacer todo cada vez."
  }
];


export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { text: 'Preguntas frecuentes', href: '#faq' },
  { text: 'Guía para nuevos clientes', href: '#guia' },
  { text: 'Términos y condiciones', href: '#terminos' },
];

export const platformLinks =  [
  { text: 'Sitios institucionales', href: '#institucionales' },
  { text: 'Tiendas online', href: '#tiendas' },
  { text: 'Desarrollo a medida', href: '#medida' },
];

export const communityLinks = [
  { text: 'Blog de diseño web', href: '#blog' },
  { text: 'Historias de clientes', href: '#casos' },
];
export const portfolioItems = [
  {
    id: 1,
    slug: "clinica-dental-cordoba",
    title: "Odontología Carlos Paz",
    description: "Sitio institucional desarrollado específicamente para el rubro odontológico, diseñado con el objetivo de posicionar estratégicamente la clínica en Google y Google Maps. Este proyecto no solo presenta de forma clara y profesional los servicios odontológicos ofrecidos, sino que también está optimizado para atraer hasta un 60% más de potenciales pacientes mediante una presencia digital sólida.Somos expertos en el desarrollo de páginas web para odontología, y esta implementación incluye herramientas clave como formularios de turnos, integración con WhatsApp, animaciones modernas y configuración SEO avanzada. El resultado es una plataforma pensada para mejorar la visibilidad online, generar confianza y convertir visitas en nuevos pacientes.",
    image: "/proyectos/odontologia-carlos-paz.png",
    tags: ["Javascript", "Alpine.js","Animate.css", "PHP", "SEO", "Google Maps","Whatsapp","Cloudflare"],
    link: "https://odontologiacarlospaz.com.ar/",
    type: "Sitio institucional",
    mainImage: "/proyectos/odontologia-carlos-paz.png",
    features: [
      {
        title: "Solicitud de turnos",
        description: "Calendario interactivo para que los pacientes puedan programar turnos fácilmente desde el sitio, sin necesidad de llamadas telefónicas."
      },
      {
        title: "Envío de citas por WhatsApp y correo electrónico",
        description: "Confirmación automática de turnos al paciente a través de WhatsApp y email, mejorando la comunicación y reduciendo ausencias."
      },
      {
        title: "Listado de tratamientos",
        description: "Detalle completo y ordenado de los tratamientos odontológicos ofrecidos, incluyendo descripciones, beneficios y especialidades."
      },
      {
        title: "Diseño adaptable",
        description: "Interfaz moderna y responsive, optimizada para funcionar en celulares, tablets y computadoras."
      },
      {
        title: "Optimización para buscadores (SEO)",
        description: "Implementación de prácticas SEO on-page para mejorar el posicionamiento en Google y aparecer en resultados locales de Google Maps."
      },
      {
        title: "Integración con Google Maps",
        description: "Se incorporó un mapa interactivo directamente en el sitio web, permitiendo a los pacientes localizar fácilmente la clínica y obtener indicaciones desde su ubicación."
      },
      {
        title: "Configuración de Google Business",
        description: "Se creó y optimizó el perfil de Google Business para mejorar la visibilidad local de la clínica, incluyendo horarios, reseñas, imágenes y contacto."
      },
      {
        title: "Configuración de Cloudflare",
        description: "Integración del sitio con Cloudflare para mejorar la velocidad de carga, seguridad y protección contra amenazas como bots y ataques DDoS."
      }
    ],
    gallery: [
      "/proyectos/mapa-odontologia.png",
      "/proyectos/odontologia-servicios.png",
      "/proyectos/gestion-citas.png",
      "/proyectos/odontograma-png.png"
    ]
  },
  
  {
    id: 2,
    slug: "cajas-a-medida-ecommerce",
    title: "Cajas a Medida",
    description: "Sitio institucional desarrollado para una fábrica de cajas a medida, con ventas al por mayor y menor en todo el país. Se implementó un tema personalizado desde cero, adaptado a la identidad visual del cliente, con animaciones modernas utilizando Animate.css y funcionalidades interactivas con JavaScript. El sitio incluye un formulario de contacto optimizado para presupuestos personalizados y un botón directo de WhatsApp Business para atención inmediata. Además, se configuraron herramientas publicitarias de Google, SEO técnico y campañas segmentadas que generaron un notable incremento en las consultas y solicitudes de cotización.",
    image: "/proyectos/cajas-a-medida.png",
    tags: [
      "Javascript",
      "Jquery",
      "Slick.js",
      "Moment.js",
      "Google SEO",
      "Google SEM",
      "WhatsApp Business",
      "Cloudflare",
      "PHP",
    ],
    link: "https://cajasamedidas.com.ar/",
    type: "Sitio institucional",
    mainImage: "/proyectos/cajas-a-medida.png",
    features: [
      {
        title: "Formulario de presupuestos a medida",
        description: "Permite a los clientes enviar consultas detalladas para solicitar cajas personalizadas según sus necesidades."
      },
      {
        title: "WhatsApp Business integrado",
        description: "Botón de contacto directo por WhatsApp para facilitar la atención comercial tanto mayorista como minorista."
      },
      {
        title: "Tema personalizado",
        description: "Diseño y desarrollo de un tema exclusivo en WordPress, adaptado a la identidad visual del cliente."
      },
      {
        title: "Animaciones con JavaScript y Animate.css",
        description: "Elementos animados que aportan dinamismo al sitio y mejoran la experiencia visual del usuario."
      },
      {
        title: "Publicidad en Google",
        description: "Configuración para campañas de Google Ads y Tag Manager, logrando un crecimiento sostenido en las ventas."
      },
      {
        title: "Optimización SEO",
        description: "Implementación de Yoast SEO Premium y etiquetas Open Graph para mejorar el posicionamiento en Google."
      },
      {
        title: "Diseño responsive y rendimiento optimizado",
        description: "Compatible con todos los dispositivos, con optimizaciones para carga rápida a través de CDN."
      },{
        title: "Configuración de Cloudflare",
        description: "Integración del sitio con Cloudflare para mejorar la velocidad de carga, seguridad y protección contra amenazas como bots y ataques DDoS."
      }
    ],
    
    gallery: [
      "/proyectos/cajas-web-institucional.png",
      "/proyectos/web-institucional-cajas.png",
      "/proyectos/web-fabrica.png",
      "/proyectos/formulario-web.png",
    ]
  },
  {
    id: 6,
    slug: "software-odontologico-dentalcor",
    title: "DentalCor Software",
    description: "Landing page diseñada para promocionar el software odontológico DentalCor, una solución integral para la gestión de consultorios dentales. El sitio fue desarrollado con Alpine.js, Tailwind CSS y PHP, garantizando velocidad, adaptabilidad y un diseño moderno. Incluye presentación clara de funcionalidades, llamados a la acción estratégicos y formulario de contacto directo. Además, se aplicaron prácticas SEO on-page para aumentar el posicionamiento en Google y se incorporó integración con WhatsApp para facilitar la comunicación con potenciales clientes.",
    image: "/proyectos/dentalcor-web.png",
    tags: [
      "Alpine.js",
      "Tailwind CSS",
      "PHP",
      "Landing Page",
      "SEO",
      "Software Odontológico",
      "Responsive Design"
    ],
    link: "https://dentalcorsoftware.com/",
    type: "Landing Page",
    mainImage: "/proyectos/dentalcor-web.png",
    features: [
      {
        title: "Presentación del producto",
        description: "Explicación clara de los beneficios del software, con ejemplos visuales y textos orientados a la conversión."
      },
      {
        title: "Formulario de contacto directo",
        description: "Formulario simple que permite a los interesados hacer consultas rápidamente desde la landing."
      },
      {
        title: "Botón de WhatsApp",
        description: "Integración con WhatsApp Business para atención inmediata a potenciales clientes desde el celular o escritorio."
      },
      {
        title: "Diseño responsive",
        description: "Diseño adaptado a todos los dispositivos con Tailwind CSS, asegurando una experiencia fluida."
      },
      {
        title: "Animaciones con Alpine.js",
        description: "Interactividad y dinamismo sin sacrificar la velocidad del sitio."
      },
      {
        title: "SEO para software odontológico",
        description: "Optimización de contenidos y estructura técnica para posicionarse en búsquedas específicas del rubro odontológico."
      }
    ],
    gallery: [
      "/proyectos/dental-odo.png",
      "/proyectos/dental-servicios.png",
      "/proyectos/formulario-contacto-dentalcor.png"
    ]
  },
  {
    id: 3,
    slug: "tienda-offsalenotebook",
    title: "OffSale Notebook",
    description: "Tienda online profesional desarrollada con WooCommerce para la venta de notebooks y productos tecnológicos. Cuenta con un completo panel de administración para gestionar productos, pedidos, clientes, stock y cupones de forma eficiente. Se integró Mercado Pago como pasarela de pago y Andreani para el cálculo automático de envíos y generación de etiquetas desde el backend. El desarrollo incluyó personalizaciones en PHP y JavaScript para funcionalidades específicas, así como el uso de Elementor para diseñar una experiencia visual moderna y responsive. Además, se implementaron buenas prácticas de SEO utilizando Yoast SEO y estructura técnica optimizada, logrando un mejor posicionamiento en Google y mayor alcance orgánico.",
    image: "/proyectos/offsale-tienda-online.png",
    tags: [
      "WooCommerce",
      "Elementor",
      "PHP",
      "JavaScript",
      "Mercado Pago",
      "Andreani",
      "SEO",
      "Responsive Design"
    ],
    link: "https://offsalenotebook.com.ar/",
    type: "Tienda online",
    mainImage: "/proyectos/offsale-tienda-online.png",
    features: [
      {
        title: "Carrito y gestión de productos",
        description: "Sistema de tienda completo con WooCommerce para administrar productos, categorías y variaciones."
      },
      {
        title: "Integración con Mercado Pago",
        description: "Pasarela de pago con tarjetas, transferencias y cuotas, conectada a través de plugins y ajustes personalizados."
      },
      {
        title: "Métodos de envío con Andreani",
        description: "Cálculo de costos y generación de etiquetas de envío automática con Andreani desde el backend."
      },
      {
        title: "Diseño con Elementor",
        description: "Construcción de páginas con Elementor, optimizando la experiencia de usuario con un diseño claro y atractivo."
      },
      {
        title: "Desarrollo con PHP y JS",
        description: "Se aplicaron scripts personalizados para automatizar procesos y mejorar funcionalidades del sitio."
      },
      {
        title: "Optimización SEO",
        description: "Uso de Yoast SEO, etiquetas Open Graph y estructura técnica pensada para mejorar el posicionamiento en Google."
      }
    ],
    gallery: [
      "/proyectos/carrito-de-compras.png",
      "/proyectos/single-computadora.png",
      "/proyectos/finalizar-compra.png",
 
    ]
  },
  {
    id: 4,
    slug: "landing-page-turbocargadores",
    title: "TTR Turbocargadores",
    description: "Landing page profesional desarrollada para promocionar los servicios de reparación, venta e instalación de turbocargadores. El sitio posee animaciones en JavaScript para captar la atención del visitante desde el primer impacto. Se incorporó botón de WhatsApp para contacto directo, formulario de consultas optimizado y estructura SEO técnica para posicionar el sitio en buscadores como Google. Actualmente, la web ocupa la primera posición en Google para la búsqueda 'turbos en Córdoba'. El cliente también configuró su cuenta de Google Ads, lo que permitió una mayor captación de clientes interesados en servicios específicos desde campañas pagas. Una landing page está pensada para dirigir al usuario a una acción concreta —como enviar una consulta o agendar un servicio—, convirtiéndose en una herramienta clave para maximizar resultados de campañas digitales.",
    image: "/proyectos/pagina-turbos.png",
    tags: [
      "Elementor",
      "JavaScript",
      "PHP",
      "SEO",
      "Responsive Design",
      "WhatsApp Business",
      "Landing Page"
    ],
    link: "https://ttrturbocargadores.com.ar/",
    type: "Landing Page",
    mainImage: "/proyectos/pagina-turbos.png",
    features: [
      {
        title: "Presentación clara de servicios",
        description: "Sección estructurada para destacar reparación, instalación y venta de turbocargadores con imágenes representativas."
      },
      {
        title: "Formulario de contacto optimizado",
        description: "Formulario simple y directo para facilitar la generación de consultas y presupuestos sin fricción."
      },
      {
        title: "Botón de WhatsApp",
        description: "Contacto inmediato desde cualquier sección del sitio mediante WhatsApp Business."
      },
      {
        title: "Diseño responsive con Elementor",
        description: "Sitio adaptable a dispositivos móviles, construido con Elementor para facilitar futuras ediciones."
      },
      {
        title: "Animaciones ligeras en JavaScript",
        description: "Animaciones al hacer scroll que mejoran la experiencia del visitante sin afectar la velocidad de carga."
      },
      {
        title: "Optimización SEO técnica",
        description: "Uso de Yoast SEO, Open Graph y estructura semántica clara para lograr un buen posicionamiento en buscadores."
      }
    ],
    gallery: [
      "/proyectos/turbo-wb.png",
      "/proyectos/servicios-turbos.png",
      "/proyectos/posicion-seo-1.png",
    ]
  },
  {
    id: 5,
    slug: "directorio-medico-cordoba",
    title: "SaludCBA",
    description: "Directorio web desarrollado para reunir médicos, clínicas y profesionales de la salud en Córdoba. El proyecto fue construido con Alpine.js, Tailwind CSS y PHP, logrando una experiencia de navegación rápida, moderna y adaptable a dispositivos móviles. El sitio permite a los usuarios encontrar especialistas filtrando por localidad, especialidad y nombre, facilitando la conexión entre pacientes y profesionales. También se incluyó formulario de contacto rápido y enlace directo a WhatsApp. SaludCBA mejora la visibilidad online de cada profesional, aportando posicionamiento local y optimización SEO para búsquedas médicas en Google.",
    image: "/proyectos/saludcba.png",
    tags: [
      "Alpine.js",
      "Tailwind CSS",
      "PHP",
      "SEO",
      "Responsive Design",
      "Directorio Médico",
      "Google Maps"
    ],
    link: "https://saludcba.com.ar/",
    type: "Sitio institucional",
    mainImage: "/proyectos/saludcba.png",
    features: [
      {
        title: "Directorio de profesionales",
        description: "Listado clasificado de médicos y centros de salud con información detallada de cada profesional."
      },
      {
        title: "Buscador inteligente",
        description: "Permite encontrar médicos por especialidad, nombre o ubicación, optimizando la experiencia del usuario."
      },
      {
        title: "Formulario de contacto rápido",
        description: "Fácil acceso para que los usuarios puedan enviar consultas directamente desde la plataforma."
      },
      {
        title: "Integración con Google Maps",
        description: "Cada ficha muestra la ubicación del profesional en un mapa interactivo, mejorando la accesibilidad geográfica."
      },
      {
        title: "Diseño responsive",
        description: "Diseño totalmente adaptado a móviles y tablets usando Tailwind CSS para una visualización óptima."
      },
      {
        title: "SEO Local",
        description: "Estructura optimizada para buscadores con foco en posicionamiento local en Córdoba."
      }
    ],
    gallery: [
      "/proyectos/mapa-salud.png",
      "/proyectos/medico-salud.png",
      "/proyectos/saludcba-buscador.png"
    ]
  }
  
  
  
];



