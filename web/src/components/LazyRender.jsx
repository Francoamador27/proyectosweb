"use client";
/**
 * En la versión Vite este wrapper retrasaba el render hasta que la sección
 * entraba en pantalla. Con HTML pre-generado eso dejaba las secciones fuera
 * del HTML (malo para SEO) y causaba errores de hidratación, así que ahora
 * renderiza siempre. La carga diferida del JS sigue a cargo de React.lazy.
 */
const LazyRender = ({ children }) => children;

export default LazyRender;
