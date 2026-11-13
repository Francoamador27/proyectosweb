// URL absoluta de imágenes del portafolio (rutas relativas del backend)
export function portafolioImage(path) {
  if (!path) return "";
  if (/^(https?:|blob:|data:)/.test(path)) return path;
  const api = process.env.NEXT_PUBLIC_API_URL;
  const clean = String(path).replace(/^\/+/, "");
  if (clean.startsWith("storage/")) return `${api}/${clean}`;
  if (clean.startsWith("portafolio/") || clean.startsWith("portafolio-galeria/")) return `${api}/storage/uploads/${clean}`;
  return `${api}/${clean}`;
}

export const stripHtml = (str = "") => str.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
