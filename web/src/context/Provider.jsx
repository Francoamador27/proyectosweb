"use client";
/**
 * Contexto global del sitio público.
 * A diferencia de la versión Vite, los settings llegan ya resueltos desde el
 * servidor (en el build), así que el nombre, el logo y el contacto están
 * en el HTML desde el primer render. No hay autenticación en el sitio público.
 */
import { createContext } from "react";
import { SWRConfig } from "swr";
import { buildSiteContext } from "@/lib/settings";

const ProviderContext = createContext(buildSiteContext(null));

const Provider = ({ settings, swrFallback = {}, children }) => {
  const value = {
    ...buildSiteContext(settings),
    auth: { isAuthenticated: false, user: null, token: null },
    settingsLoading: false,
    settingsError: null,
    reloadSettings: async () => {},
  };

  return (
    <ProviderContext.Provider value={value}>
      <SWRConfig value={{ fallback: swrFallback, revalidateOnFocus: false }}>
        {children}
      </SWRConfig>
    </ProviderContext.Provider>
  );
};

/** Inyecta datos precargados en SWR para una página concreta. */
export function SWRData({ fallback, children }) {
  return <SWRConfig value={(parent) => ({ ...parent, fallback: { ...parent.fallback, ...fallback } })}>{children}</SWRConfig>;
}

export default ProviderContext;
export { Provider };
