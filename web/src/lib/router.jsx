"use client";
/**
 * Adaptador mínimo de la API de react-router-dom sobre next/navigation.
 * Permite reutilizar los componentes del sitio Vite sin reescribirlos.
 *
 * Las rutas que siguen viviendo en la app Vite (login, checkout, mi cuenta,
 * panel admin) se resuelven contra NEXT_PUBLIC_APP_URL con un <a> normal.
 */
import NextLink from "next/link";
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import { forwardRef, useCallback, useMemo } from "react";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");

// Prefijos que NO forman parte del sitio estático de Next
const APP_PREFIXES = [
  "/auth",
  "/registro",
  "/mi-cuenta",
  "/admin-dash",
  "/finalizar-compra",
  "/pagos",
];

export function resolveHref(to) {
  if (typeof to === "object" && to !== null) {
    to = `${to.pathname ?? ""}${to.search ?? ""}${to.hash ?? ""}`;
  }
  if (typeof to !== "string") return "/";
  const isApp = APP_PREFIXES.some((p) => to === p || to.startsWith(`${p}/`) || to.startsWith(`${p}?`));
  return { href: isApp && APP_URL ? `${APP_URL}${to}` : to, external: isApp && !!APP_URL };
}

export const Link = forwardRef(function Link(
  { to, href, replace, state: _state, reloadDocument, ...rest },
  ref
) {
  const target = resolveHref(to ?? href);
  if (target.external || reloadDocument || /^(https?:|mailto:|tel:)/.test(target.href)) {
    return <a ref={ref} href={target.href} {...rest} />;
  }
  return <NextLink ref={ref} href={target.href} replace={replace} {...rest} />;
});

export const NavLink = forwardRef(function NavLink(
  { to, end, className, style, children, ...rest },
  ref
) {
  const pathname = usePathname() || "/";
  const { href } = resolveHref(to);
  const isActive = end || href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  const state = { isActive, isPending: false };
  return (
    <Link
      ref={ref}
      to={to}
      className={typeof className === "function" ? className(state) : className}
      style={typeof style === "function" ? style(state) : style}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    >
      {typeof children === "function" ? children(state) : children}
    </Link>
  );
});

export function useParams() {
  return useNextParams() || {};
}

export function useLocation() {
  // Solo pathname: leer window.location.search en render rompería la hidratación
  // del HTML estático. Para query params usar useSearchParams().
  const pathname = usePathname() || "/";
  return useMemo(() => ({ pathname, search: "", hash: "", state: null, key: pathname }), [pathname]);
}

export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (to, opts = {}) => {
      if (typeof to === "number") return to < 0 ? router.back() : router.forward();
      const target = resolveHref(to);
      if (target.external) return window.location.assign(target.href);
      return opts.replace ? router.replace(target.href) : router.push(target.href);
    },
    [router]
  );
}

/** Devuelve [params, setParams] como react-router. Requiere <Suspense> arriba. */
export function useSearchParams() {
  const params = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useCallback(
    (next) => {
      const sp = new URLSearchParams(typeof next === "function" ? next(new URLSearchParams(params)) : next);
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router]
  );
  return [params, setParams];
}
