"use client";
import { useRef, useState } from "react";
import TurnstileCaptcha from "../components/TurnstileCaptcha";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import WhatsappHref from "../utils/WhatsappUrl";
import useCont from "../hooks/useCont";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const Contacto = ({ asPage = false }) => {
  const formRef = useRef(null);
  const turnstileRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [estadoMensaje, setEstadoMensaje] = useState({ tipo: "", texto: "" });
  const [loading, setLoading] = useState(false);
  const { company, contact } = useCont();

  const isLocal = process.env.NEXT_PUBLIC_ENTORNO === "local";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEstadoMensaje({ tipo: "", texto: "" });

    try {
      const fd = new FormData(formRef.current);
      
      // Construir FormData con todos los datos incluyendo archivo
      const formData = new FormData();
      formData.append("nombre", fd.get("nombre")?.toString().trim() || "");
      formData.append("email", fd.get("email")?.toString().trim() || "");
      formData.append("telefono", fd.get("telefono")?.toString().trim() || "");
      formData.append("mensaje", fd.get("mensaje")?.toString().trim() || "");
      formData.append("asunto", fd.get("asunto")?.toString().trim() || "");
      formData.append("turnstile_token", isLocal ? "local-bypass" : captchaToken);
      
      // Agregar archivo si existe
      if (fd.get("archivo")) {
        formData.append("archivo", fd.get("archivo"));
      }

      const res = await clienteAxios.post("/api/contacto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const isOk =
        (res.status >= 200 && res.status < 300) || res.data?.success === true;

      if (!isOk) throw new Error(res.data?.message || "Error al enviar");

      setEstadoMensaje({
        tipo: "exito",
        texto:
          res.data?.message ||
          "Tu consulta fue enviada con éxito. Un asesor técnico se contactará pronto.",
      });

      formRef.current?.reset();
      setCaptchaToken("");
      if (!isLocal && turnstileRef.current?.reset) {
        turnstileRef.current.reset();
      }
    } catch (error) {
      console.error("Contacto error:", error);
      setEstadoMensaje({
        tipo: "error",
        texto:
          error.response?.data?.message ||
          error.message ||
          "Hubo un error al enviar el mensaje. Podés escribirnos por WhatsApp.",
      });
      if (!isLocal && turnstileRef.current?.reset) {
        turnstileRef.current.reset();
      }
    } finally {
      setLoading(false);
    }
  };

  const Titulo = asPage ? "h1" : "h2";
  const whatsapp = WhatsappHref({ message: "Hola! Quiero hacer una consulta." });

  return (
    <section id="contacto" className="section bg-cream" aria-labelledby="contacto-titulo">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Contacto</span>
          <Titulo id="contacto-titulo" className={asPage ? "heading-xl mt-4" : "heading-lg mt-4"}>
            Contanos de tu negocio
          </Titulo>
          <p className="lead mt-4">
            Te respondemos en el día. Si preferís, escribinos directo por{" "}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-bold text-brand underline underline-offset-4">
              WhatsApp
            </a>
            .
          </p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-3xl bg-paper shadow-lift lg:grid-cols-[1fr_1.6fr]">
          <aside className="bg-brand p-8 text-white sm:p-10">
            <h3 className="font-display text-2xl font-bold text-white">Hablemos</h3>
            <ul className="mt-8 space-y-6">
              {(contact.phone || contact.whatsapp) && (
                <li className="flex gap-3">
                  <Phone size={20} className="mt-0.5 shrink-0 text-white/80" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70">Teléfono / WhatsApp</p>
                    <a href={`tel:${contact.phone || contact.whatsapp}`} className="text-lg font-semibold hover:underline">
                      {contact.phone || contact.whatsapp}
                    </a>
                  </div>
                </li>
              )}
              {contact.email && (
                <li className="flex gap-3">
                  <Mail size={20} className="mt-0.5 shrink-0 text-white/80" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70">Email</p>
                    <a href={`mailto:${contact.email}`} className="break-all text-lg font-semibold hover:underline">{contact.email}</a>
                  </div>
                </li>
              )}
              {company.address && (
                <li className="flex gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-white/80" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70">Dónde estamos</p>
                    <p className="text-lg font-semibold">{company.address}</p>
                  </div>
                </li>
              )}
              {company.business_hours && (
                <li className="flex gap-3">
                  <Clock size={20} className="mt-0.5 shrink-0 text-white/80" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70">Horario</p>
                    <p className="text-lg font-semibold">{company.business_hours}</p>
                  </div>
                </li>
              )}
            </ul>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn mt-10 w-full bg-white text-brand-strong hover:bg-cream">
              <MessageCircle size={18} /> Escribir por WhatsApp
            </a>
          </aside>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 p-8 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-nombre" className="field-label">Nombre y apellido</label>
                <input id="c-nombre" type="text" name="nombre" placeholder="Ej: Juan Pérez" required autoComplete="name" className="field" />
              </div>
              <div>
                <label htmlFor="c-telefono" className="field-label">Teléfono</label>
                <input id="c-telefono" type="tel" name="telefono" placeholder="Ej: 3541 123456" required autoComplete="tel" className="field" />
              </div>
            </div>

            <div>
              <label htmlFor="c-email" className="field-label">Email</label>
              <input id="c-email" type="email" name="email" placeholder="tu@email.com" required autoComplete="email" className="field" />
            </div>

            <div>
              <label htmlFor="c-asunto" className="field-label">
                ¿Qué necesitás? <span className="font-normal text-subtle">(opcional)</span>
              </label>
              <input id="c-asunto" type="text" name="asunto" placeholder="Ej: Aparecer en Google, web nueva, tienda online" className="field" />
            </div>

            <div>
              <label htmlFor="c-mensaje" className="field-label">Tu consulta</label>
              <textarea
                id="c-mensaje"
                name="mensaje"
                rows={4}
                required
                className="field resize-none"
                placeholder="Contanos a qué se dedica tu negocio y qué te gustaría lograr."
              />
            </div>

            <div>
              <label htmlFor="c-archivo" className="field-label">
                Adjuntar archivo <span className="font-normal text-subtle">(opcional)</span>
              </label>
              <input
                id="c-archivo"
                type="file"
                name="archivo"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                className="field text-sm file:mr-3 file:rounded-full file:border-0 file:bg-brand-soft file:px-3 file:py-1 file:font-semibold file:text-brand-strong"
              />
              <p className="mt-1.5 text-xs text-subtle">Máx. 5 MB. PDF, Word, Excel, TXT, JPG o PNG.</p>
            </div>

            {!isLocal && <TurnstileCaptcha ref={turnstileRef} onVerify={setCaptchaToken} />}

            <button type="submit" className="btn-primary w-full disabled:opacity-60" disabled={loading || (!isLocal && !captchaToken)}>
              {loading ? "Enviando..." : "Enviar consulta"}
            </button>

            {estadoMensaje.texto && <Alerta tipo={estadoMensaje.tipo}>{estadoMensaje.texto}</Alerta>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
