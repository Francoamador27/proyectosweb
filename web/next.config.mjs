import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // El repo raíz tiene su propio package-lock (app Vite): fijamos la raíz de este proyecto
  turbopack: { root },
  // Exportación estática: genera HTML en /out para Cloudflare Pages
  output: "export",
  // Sin servidor no hay optimizador de imágenes de Next
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;
