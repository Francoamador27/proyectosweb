import { useRef, useState } from "react";
import TurnstileCaptcha from "../components/TurnstileCaptcha";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import WhatsappHref from "../utils/WhatsappUrl";
import useCont from "../hooks/useCont";
import SEOHead from "./Head/Head";

const Contacto = () => {
  const formRef = useRef(null);
  const turnstileRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [estadoMensaje, setEstadoMensaje] = useState({ tipo: "", texto: "" });
  const [loading, setLoading] = useState(false);
  const { company, contact } = useCont();

  const isLocal = import.meta.env.VITE_ENTORNO === "local";

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

  return (
    <section className="relative bg-white py-10 overflow-hidden">
      <SEOHead
        priority="low"
        title={`Grupo Bits | Contacto`}
        description={`Contactate con Grupo Bits para conocer nuestras soluciones tecnológicas. Te ayudamos a digitalizar tu empresa.`}
      />

      {/* Glow decorativo */}
      <div className="absolute -top-32 -right-40 w-[500px] h-[500px] bg-[#0891b2]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Encabezado */}
        <header className="text-center mb-16">

          <h1 className="text-2xl md:text-5xl font-black text-slate-900 mt-6 mb-4 leading-tight">
            ¿Listo para transformar tu negocio?
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Envíanos tu consulta y recibí <strong>asesoramiento experto en tecnología</strong>.
            También podés escribirnos directo por{" "}
            <a
              href={WhatsappHref({
                message: "Hola, me gustaría información sobre nuestras soluciones tecnológicas.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0891b2] underline font-black hover:text-[#0e7490]"
            >
              WhatsApp
            </a>
            .
          </p>
        </header>

        {/* Layout de contacto */}
        <div className="grid lg:grid-cols-12 gap-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">

          {/* Info Lateral */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0891b2] to-cyan-700 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8">Información de Contacto</h3>
              <div className="space-y-8">
                <div>
                  <p className="text-amber-100 text-xs font-black uppercase tracking-widest mb-1">Nuestra Sede</p>
                  <p className="text-lg font-medium">{company.address || "Argentina"}</p>
                </div>
                <div>
                  <p className="text-amber-100 text-xs font-black uppercase tracking-widest mb-1">Email Corporativo</p>
                  <p className="text-lg font-medium">{contact.email || "info@grupobits.com"}</p>
                </div>
                <div>
                  <p className="text-amber-100 text-xs font-black uppercase tracking-widest mb-1">Horario de Atención</p>
                  <p className="text-lg font-medium">{company.business_hours || "Lun a Vie: 09:00 - 18:00hs"}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20 relative z-10">
              <p className="text-amber-50 text-sm italic thea-amelia text-xl">
                "Tu transformación digital comienza aquí"
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-8 p-10 md:p-12">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-900 font-black text-sm uppercase tracking-wider">
                    Nombre y Apellido
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Ej: Juan Pérez"
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-[#003366]/10 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-900 font-black text-sm uppercase tracking-wider">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="Ej: +54 9 351..."
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-[#0891b2]/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-900 font-black text-sm uppercase tracking-wider">
                  Email de contacto
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="ejemplo@email.com"
                  required
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-[#0891b2]/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-900 font-black text-sm uppercase tracking-wider">
                  Tu consulta sobre nuestros servicios
                </label>
                <textarea
                  name="mensaje"
                  rows="4"
                  required
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-[#0891b2]/20 transition-all font-medium resize-none"
                  placeholder="Cuéntanos qué solución tecnológica necesitas, tipo de proyecto, presupuesto aproximado..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-900 font-black text-sm uppercase tracking-wider">
                    Tipo de Servicio <span className="text-xs">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    name="asunto"
                    placeholder="Ej: Desarrollo Web, Consultoría IT, Marketing Digital"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-[#0891b2]/20 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-900 font-black text-sm uppercase tracking-wider">
                    Adjuntar archivo <span className="text-xs">(opcional)</span>
                  </label>
                  <input
                    type="file"
                    name="archivo"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-[#0891b2]/20 transition-all font-medium text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Máx. 5MB. Formatos: PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, PNG
                  </p>
                </div>
              </div>

              {!isLocal && (
                <div className="py-2">
                  <TurnstileCaptcha ref={turnstileRef} onVerify={setCaptchaToken} />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#0891b2] text-white font-black px-8 py-5 rounded-2xl shadow-xl hover:bg-[#0e7490] hover:scale-[1.02] transition-all disabled:opacity-60 active:scale-95"
                  disabled={loading || (!isLocal && !captchaToken)}
                >
                  {loading ? "ENVIANDO..." : "ENVIAR CONSULTA"}
                </button>
                <a
                  href={WhatsappHref({
                    message: "Hola, me interesa información sobre las soluciones tecnológicas de Grupo Bits.",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white text-[#0891b2] border-2 border-[#0891b2] font-black px-8 py-5 rounded-2xl hover:bg-[#0891b2]/5 transition-all text-center active:scale-95"
                >
                  ESCRIBIR POR WHATSAPP
                </a>
              </div>

              {estadoMensaje.texto && (
                <div className="mt-6">
                  <Alerta tipo={estadoMensaje.tipo}>{estadoMensaje.texto}</Alerta>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
