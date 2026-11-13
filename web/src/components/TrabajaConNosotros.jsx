"use client";
import { useRef, useState } from "react";
import TurnstileCaptcha from "../components/TurnstileCaptcha";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import WhatsappHref from "../utils/WhatsappUrl";
import useCont from "../hooks/useCont";
import { CheckCircle } from "lucide-react";

const TrabajaConNosotros = () => {
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
      
      // Construir FormData con todos los datos incluyendo CV
      const formData = new FormData();
      formData.append("nombre", fd.get("nombre")?.toString().trim() || "");
      formData.append("email", fd.get("email")?.toString().trim() || "");
      formData.append("telefono", fd.get("telefono")?.toString().trim() || "");
      formData.append("puesto_interes", fd.get("puesto_interes")?.toString().trim() || "");
      formData.append("experiencia", fd.get("experiencia")?.toString().trim() || "");
      formData.append("mensaje", fd.get("mensaje")?.toString().trim() || "");
      formData.append("turnstile_token", isLocal ? "local-bypass" : captchaToken);
      
      // Agregar CV (obligatorio)
      if (fd.get("cv")) {
        formData.append("cv", fd.get("cv"));
      }

      const res = await clienteAxios.post("/api/trabaja-con-nosotros", formData, {
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
          "Tu CV fue enviado con éxito. ¡Nos pondremos en contacto pronto!",
      });

      formRef.current?.reset();
      setCaptchaToken("");
      if (!isLocal && turnstileRef.current?.reset) {
        turnstileRef.current.reset();
      }
    } catch (error) {
      console.error("TrabajaConNosotros error:", error);
      setEstadoMensaje({
        tipo: "error",
        texto:
          error.response?.data?.message ||
          error.message ||
          "Hubo un error al enviar tu CV. Por favor intenta de nuevo.",
      });
      if (!isLocal && turnstileRef.current?.reset) {
        turnstileRef.current.reset();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section bg-cream">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28">
          <span className="eyebrow">Trabajá con nosotros</span>
          <h1 className="heading-xl mt-4">Sumate al equipo</h1>
          <p className="lead mt-5">
            Buscamos personas con ganas de aprender y de ayudar a negocios reales a crecer en internet:
            desarrollo, diseño, marketing y atención a clientes.
          </p>
          <ul className="mt-8 space-y-3">
            {["Proyectos variados y con impacto real", "Equipo chico y cercano", "Modalidad flexible"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <CheckCircle size={19} className="shrink-0 text-brand" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="ui-card space-y-5 p-8 sm:p-10">
          <h2 className="font-display text-xl font-bold">Envianos tu CV</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="t-nombre" className="field-label">Nombre y apellido</label>
              <input id="t-nombre" type="text" name="nombre" required autoComplete="name" className="field" placeholder="Ej: Ana Gómez" />
            </div>
            <div>
              <label htmlFor="t-tel" className="field-label">Teléfono</label>
              <input id="t-tel" type="tel" name="telefono" required autoComplete="tel" className="field" placeholder="Ej: 3541 123456" />
            </div>
          </div>
          <div>
            <label htmlFor="t-email" className="field-label">Email</label>
            <input id="t-email" type="email" name="email" required autoComplete="email" className="field" placeholder="tu@email.com" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="t-puesto" className="field-label">Puesto de interés <span className="font-normal text-subtle">(opcional)</span></label>
              <input id="t-puesto" type="text" name="puesto_interes" className="field" placeholder="Ej: Diseño web" />
            </div>
            <div>
              <label htmlFor="t-exp" className="field-label">Experiencia <span className="font-normal text-subtle">(opcional)</span></label>
              <input id="t-exp" type="text" name="experiencia" className="field" placeholder="Ej: 2 años" />
            </div>
          </div>
          <div>
            <label htmlFor="t-msg" className="field-label">Contanos sobre vos <span className="font-normal text-subtle">(opcional)</span></label>
            <textarea id="t-msg" name="mensaje" rows={3} className="field resize-none" placeholder="¿Qué te gusta hacer y por qué te interesa sumarte?" />
          </div>
          <div>
            <label htmlFor="t-cv" className="field-label">CV</label>
            <input
              id="t-cv"
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              required
              className="field text-sm file:mr-3 file:rounded-full file:border-0 file:bg-brand-soft file:px-3 file:py-1 file:font-semibold file:text-brand-strong"
            />
            <p className="mt-1.5 text-xs text-subtle">Máx. 5 MB. PDF o Word.</p>
          </div>

          {!isLocal && <TurnstileCaptcha ref={turnstileRef} onVerify={setCaptchaToken} />}

          <button type="submit" className="btn-primary w-full disabled:opacity-60" disabled={loading || (!isLocal && !captchaToken)}>
            {loading ? "Enviando..." : "Enviar CV"}
          </button>

          {estadoMensaje.texto && <Alerta tipo={estadoMensaje.tipo}>{estadoMensaje.texto}</Alerta>}
        </form>
      </div>
    </section>
  );
};

export default TrabajaConNosotros;
