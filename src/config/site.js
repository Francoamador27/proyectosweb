// Separación entre el sitio público (Next.js en proyectoswebsite.com) y esta
// app (panel admin, login, mi cuenta, checkout).
//
// "Modo admin" = la app corre en el subdominio del panel (admin.*) o se fuerza
// con VITE_SOLO_ADMIN=true. En ese modo las páginas públicas redirigen al
// sitio público. En el dominio principal se sigue viendo todo como antes,
// hasta que ese dominio pase al proyecto de Next (evita bucles de redirección).

export const PUBLIC_SITE_URL = (import.meta.env.VITE_PUBLIC_SITE_URL || "https://proyectoswebsite.com").replace(/\/$/, "");

const hostname = typeof window !== "undefined" ? window.location.hostname : "";

export const IS_ADMIN_APP =
  import.meta.env.VITE_SOLO_ADMIN === "true" || hostname.startsWith("admin.");

export const publicUrl = (path = "/") => `${PUBLIC_SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
