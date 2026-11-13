"use client";

const ESTILOS = {
  exito: "bg-brand-soft text-brand-strong border-brand/20",
  error: "bg-red-50 text-red-700 border-red-200",
  info: "bg-sky-soft text-sky border-sky/20",
};

export default function Alerta({ tipo = "info", children }) {
  return (
    <div role={tipo === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold ${ESTILOS[tipo] || ESTILOS.info}`}>
      {children}
    </div>
  );
}
