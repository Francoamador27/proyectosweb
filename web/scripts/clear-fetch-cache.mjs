// Pre-build: borra la caché de fetch de Next (.next/cache/fetch-cache).
// Los datos de la API se piden con cache: "force-cache" para no repetir la
// misma consulta dentro de un build, pero esa caché persiste entre builds
// (también en Cloudflare si la caché de build está activa) y el sitio
// quedaría generado con contenido viejo.
import fs from "node:fs";

fs.rmSync(new URL("../.next/cache/fetch-cache", import.meta.url), { recursive: true, force: true });
console.log("[clear-fetch-cache] caché de datos de la API borrada");
