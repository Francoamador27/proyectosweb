import { notFound } from "next/navigation";
import BlogDetail from "@/components/Blog/BlogDetail";
import { SWRData } from "@/context/Provider";
import { absoluteApiUrl, apiGet, KEYS, listOf, SITE_URL, stripHtml } from "@/lib/api";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = listOf(await apiGet(KEYS.posts));
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

async function getPost(slug) {
  const json = await apiGet(KEYS.post(slug));
  return json?.data ? { json, post: json.data } : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await getPost(slug);
  if (!res) return {};
  const { post } = res;
  const description = stripHtml(post.contenido);
  const image = absoluteApiUrl(post.imagen);
  return {
    title: post.titulo,
    description,
    alternates: { canonical: `/blog/${slug}` },
    authors: post.autor?.name ? [{ name: post.autor.name }] : undefined,
    openGraph: {
      type: "article",
      title: post.titulo,
      description,
      url: `/blog/${slug}`,
      publishedTime: post.publicado_en ?? post.created_at,
      modifiedTime: post.updated_at,
      section: post.categoria?.nombre,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const res = await getPost(slug);
  if (!res) notFound();
  const { post } = res;

  // Datos estructurados de artículo (rich results en Google)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: stripHtml(post.contenido),
    image: absoluteApiUrl(post.imagen) || undefined,
    datePublished: post.publicado_en ?? post.created_at,
    dateModified: post.updated_at,
    author: post.autor?.name ? { "@type": "Person", name: post.autor.name } : undefined,
    mainEntityOfPage: SITE_URL ? `${SITE_URL}/blog/${slug}` : undefined,
    articleSection: post.categoria?.nombre,
  };

  return (
    <SWRData fallback={{ [KEYS.post(slug)]: res.json }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogDetail />
    </SWRData>
  );
}
