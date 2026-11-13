// Transforma la respuesta de /api/settings al formato que usan los componentes
// (mismo shape que el Provider original de la app Vite).
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export function absoluteApiUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function buildSiteContext(settings) {
  const logoUrl = absoluteApiUrl(settings?.logo);
  return {
    settings,
    logoUrl,
    company: {
      name: settings?.company_name || "Grupo Bits",
      logo: logoUrl,
      address: settings?.address || "",
      business_hours: settings?.business_hours || "",
      domain: process.env.NEXT_PUBLIC_SITE_URL || "",
    },
    contact: {
      email: settings?.contact_email || "",
      whatsapp: settings?.whatsapp || "",
      phone: settings?.phone || "",
      sender_name: settings?.sender_name || "",
      map_iframe: settings?.google_map_iframe || "",
    },
    social: {
      instagram: settings?.instagram || "",
      facebook: settings?.facebook || "",
    },
  };
}
