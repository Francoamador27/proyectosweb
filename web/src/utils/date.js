// Formateo de fechas con zona horaria fija: el HTML se genera en el build y
// debe coincidir con lo que renderiza el navegador (si no, error de hidratación).
export function formatFecha(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Argentina/Cordoba",
  });
}
