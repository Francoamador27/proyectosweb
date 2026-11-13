import { apiGet, KEYS, listOf, SITE_URL } from "@/lib/api";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  ["", 1.0, "weekly"],
  ["/servicios", 0.9, "weekly"],
  ["/performance-marketing", 0.9, "monthly"],
  ["/portafolio", 0.8, "weekly"],
  ["/blog", 0.8, "weekly"],
  ["/quienes-somos", 0.6, "monthly"],
  ["/contacto", 0.6, "yearly"],
  ["/trabaja-con-nosotros", 0.3, "yearly"],
];

export default async function sitemap() {
  const [servicios, posts, portafolios] = await Promise.all([
    apiGet(KEYS.servicios).then(listOf),
    apiGet(KEYS.posts).then(listOf),
    apiGet(KEYS.portafolios).then(listOf),
  ]);

  return [
    ...STATIC_ROUTES.map(([path, priority, changeFrequency]) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency,
      priority,
    })),
    ...servicios
      .filter((s) => s.slug)
      .map((s) => ({ url: `${SITE_URL}/servicios/${s.slug}`, lastModified: s.updated_at, priority: 0.8 })),
    ...posts
      .filter((p) => p.slug)
      .map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updated_at, priority: 0.7 })),
    ...portafolios.map((p) => ({
      url: `${SITE_URL}/portafolio/${p.id}`,
      lastModified: p.updated_at,
      priority: 0.6,
    })),
  ];
}
