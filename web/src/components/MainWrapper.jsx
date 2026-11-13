"use client";

// El header es fijo y siempre claro: todas las páginas dejan su espacio arriba
export default function MainWrapper({ children }) {
  return <main className="min-h-[60vh] pt-16 md:pt-20">{children}</main>;
}
