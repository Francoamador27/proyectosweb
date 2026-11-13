import BlogList from "@/components/Blog/BlogList";
import { SWRData } from "@/context/Provider";
import { KEYS, prefetch } from "@/lib/api";

export const metadata = {
  title: "Blog",
  description:
    "Artículos sobre desarrollo web, SEO y marketing digital para hacer crecer tu empresa.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const fallback = await prefetch([KEYS.posts, KEYS.postsCategorias]);
  return (
    <SWRData fallback={fallback}>
      <BlogList />
    </SWRData>
  );
}
