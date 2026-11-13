# Sitio público — Next.js (export estático)

Rutas públicas de proyectoswebsite.com generadas como HTML estático en el build,
con los datos de la API Laravel. El panel admin, login, checkout y "mi cuenta"
siguen en la app Vite de la raíz del repo.

```
proyectoswebsite.com      → este proyecto (Cloudflare Pages)
app.proyectoswebsite.com  → app Vite (raíz del repo)
api.proyectoswebsite.com  → Laravel
```

## Desarrollo

```bash
cp .env.example .env.local   # completar valores
npm install
npm run dev                  # http://localhost:3000
npm run build                # genera ./out
npm start                    # sirve ./out para probar el resultado final
```

> En local, las peticiones del navegador a la API fallan por CORS (la API solo
> acepta el dominio de producción). El HTML igual sale completo porque los datos
> se cargan en el build, desde Node, donde CORS no aplica.

## Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_API_URL` | API Laravel (build y navegador) |
| `NEXT_PUBLIC_SITE_URL` | Dominio público: canonical, sitemap, Open Graph |
| `NEXT_PUBLIC_APP_URL` | App Vite: los links a `/auth`, `/mi-cuenta`, `/admin-dash`, `/finalizar-compra`, `/pagos` y `/registro` apuntan acá |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Captcha de los formularios de contacto y RRHH |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (opcional) |
| `NEXT_PUBLIC_ENTORNO` | Igual que `VITE_ENTORNO` en la app Vite |

## Cómo está armado

- `src/app/**/page.jsx`: Server Components que piden los datos a la API en el
  build, definen `metadata` (title, description, canonical, Open Graph) y pasan
  los datos a los componentes con `<SWRData>`.
- `src/components`, `src/views`: los mismos componentes de la app Vite marcados
  con `"use client"`. Siguen usando `useSWR` con las mismas claves; como esas
  claves llegan precargadas, el HTML sale con contenido y en el navegador SWR
  revalida para mostrar cambios recientes.
- `src/lib/router.jsx`: adaptador de `react-router-dom` (`Link`, `NavLink`,
  `useParams`, `useNavigate`, `useLocation`) sobre `next/navigation`.
- `src/app/sitemap.js` y `robots.js`: generan `sitemap.xml` y `robots.txt` con
  todos los servicios, posts y proyectos.
- `scripts/flatten-rsc.mjs` (postbuild): corrige las rutas de los payloads de
  prefetch de Next 16 para hosting estático.

### Reglas al editar componentes

- No usar `window`, `document` ni `localStorage` durante el render: solo dentro
  de `useEffect` o de handlers. El build pre-renderiza en Node.
- No guardar los datos de SWR en un `useState` con `useEffect`: derivarlos con
  `useMemo`; si no, el HTML sale vacío.
- No usar `useSearchParams()`: hace que todo el bloque se renderice solo en el
  cliente. Leer `window.location.search` dentro de un `useEffect`.
- Librerías 3D/WebGL: importarlas con `next/dynamic` y `{ ssr: false }`.

## Deploy en Cloudflare Pages

1. Crear un proyecto de Pages conectado al repo.
2. Configuración del build:
   - Framework preset: **Next.js (Static HTML Export)**
   - Root directory: `web`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Variable `NODE_VERSION`: `22`
3. Cargar las variables de entorno de la tabla de arriba.
4. Dominio personalizado: `proyectoswebsite.com`.

### Rebuild automático al publicar contenido

En Pages → Settings → Builds → **Deploy hooks**, crear un hook y guardar la URL
en el `.env` de Laravel (`CLOUDFLARE_DEPLOY_HOOK`). Después, llamarlo cuando
cambie contenido público (posts, servicios, portafolio, sliders, settings):

```php
// app/Observers/PublicContentObserver.php
class PublicContentObserver
{
    public function saved($model)   { $this->rebuild(); }
    public function deleted($model) { $this->rebuild(); }

    private function rebuild(): void
    {
        // Agrupa varios cambios seguidos en un único build
        if (Cache::add('cf-rebuild-lock', true, now()->addMinutes(2))) {
            dispatch(fn () => Http::post(config('services.cloudflare.deploy_hook')))
                ->delay(now()->addMinutes(2));
        }
    }
}

// AppServiceProvider::boot()
foreach ([Post::class, Servicio::class, Portafolio::class, Slider::class, Setting::class] as $m) {
    $m::observe(PublicContentObserver::class);
}
```

Los nombres de modelos son orientativos: ajustarlos a los del backend.
