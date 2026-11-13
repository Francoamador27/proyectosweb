"use client";
/** Home: cómo trabajamos (proceso simple en 4 pasos) + por qué elegirnos. */
import { MessageCircle, ClipboardList, Rocket, LineChart, HeartHandshake, MapPin, Smartphone, Clock } from "lucide-react";
import WhatsappHref from "../utils/WhatsappUrl";

const PASOS = [
  {
    icon: MessageCircle,
    titulo: "Charlamos",
    texto: "Nos contás de tu negocio, qué vendés y a quién. Sin tecnicismos.",
  },
  {
    icon: ClipboardList,
    titulo: "Te armamos la propuesta",
    texto: "Un plan claro con lo que incluye, los tiempos y el costo. Sin sorpresas.",
  },
  {
    icon: Rocket,
    titulo: "Lo ponemos en marcha",
    texto: "Hacemos la web, configuramos Google Maps y dejamos todo publicado.",
  },
  {
    icon: LineChart,
    titulo: "Medimos y te acompañamos",
    texto: "Te mostramos cuántas personas te encuentran y te consultan.",
  },
];

const RAZONES = [
  { icon: MapPin, texto: "Trabajamos con negocios de toda Argentina, de forma remota" },
  { icon: HeartHandshake, texto: "Trato directo: hablás siempre con las mismas personas" },
  { icon: Smartphone, texto: "Todo pensado para el celular, que es donde te buscan" },
  { icon: Clock, texto: "Respondemos en el día por WhatsApp" },
];

export default function ComoTrabajamos() {
  const whatsapp = WhatsappHref({ message: "Hola! Quiero empezar con mi web y Google Maps. ¿Cuál es el primer paso?" });

  return (
    <section className="section bg-sand" aria-labelledby="como-trabajamos-titulo">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Cómo trabajamos</span>
          <h2 id="como-trabajamos-titulo" className="heading-lg mt-4">
            Simple, de principio a fin
          </h2>
          <p className="lead mt-4">
            Vos seguís atendiendo tu negocio. Nosotros nos ocupamos de la parte digital.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map(({ icon: Icon, titulo, texto }, i) => (
            <li key={titulo} className="ui-card relative p-6">
              <span className="absolute right-5 top-5 font-display text-4xl font-bold text-line" aria-hidden="true">
                {i + 1}
              </span>
              <div className="icon-chip mb-5">
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-bold">{titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed">{texto}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid items-center gap-8 rounded-3xl bg-paper p-8 shadow-soft lg:grid-cols-[1fr_auto] lg:p-10">
          <div>
            <h3 className="font-display text-2xl font-bold">¿Por qué elegirnos?</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {RAZONES.map(({ icon: Icon, texto }) => (
                <li key={texto} className="flex items-start gap-3">
                  <Icon size={19} className="mt-0.5 shrink-0 text-brand" />
                  <span>{texto}</span>
                </li>
              ))}
            </ul>
          </div>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle size={18} />
            Empezar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
