// Helpers de datos para Server Components (se ejecutan solo en el build).
import { absoluteApiUrl, buildSiteContext } from "./settings";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

/**
 * GET a la API. Si falla, devuelve `fallback` y avisa en consola para que un
 * endpoint caído no rompa el build completo.
 */
export async function apiGet(path, fallback = null) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: "application/json" },
      cache: "force-cache",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[api] ${path} falló: ${err.message}. Se usa fallback.`);
    return fallback;
  }
}

export const listOf = (json) =>
  Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];

export const getSettings = () => apiGet("/api/settings", null);
export const getSite = async () => buildSiteContext(await getSettings());

// Mismas claves que usan los componentes con useSWR: así el HTML sale con datos.
export const KEYS = {
  sliders: "/api/sliders",
  servicios: "/api/servicios?sort=position&dir=asc&per_page=1000",
  serviciosCategorias: "/api/servicios-categorias",
  portafolios: "/api/portafolios",
  posts: "/api/posts",
  postsCategorias: "/api/posts-categorias",
  servicio: (slug) => `/api/servicios/${slug}`,
  post: (slug) => `/api/posts/${slug}`,
  portafolio: (id) => `/api/portafolios/${id}`,
};

/** Precarga varias claves de SWR en paralelo. */
export async function prefetch(keys) {
  const entries = await Promise.all(keys.map(async (k) => [k, await apiGet(k, null)]));
  return Object.fromEntries(entries.filter(([, v]) => v != null));
}

export const stripHtml = (html = "", max = 160) =>
  html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

export { absoluteApiUrl };
