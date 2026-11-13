import PerformanceMarketing from "@/views/PerformanceMarketing";

export const metadata = {
  title: { absolute: "Performance Marketing | Grupo Bits — Campañas que generan resultados" },
  description:
    "Gestionamos tus campañas de Meta Ads, Google Ads y más con planificación estratégica, seguimiento en tiempo real y reportes mensuales detallados. Maximizamos tu ROI.",
  keywords: [
    "performance marketing", "gestión de campañas", "Meta Ads", "Google Ads", "TikTok Ads",
    "marketing digital", "ROI", "ROAS", "analítica digital", "Grupo Bits", "Argentina",
  ],
  alternates: { canonical: "/performance-marketing" },
  openGraph: {
    title: "Performance Marketing — Campañas que generan resultados reales",
    description:
      "Planificación, seguimiento, análisis y reportes mensuales de tus campañas publicitarias. Maximizamos tu ROI con datos reales.",
    url: "/performance-marketing",
  },
};

export default function Page() {
  return <PerformanceMarketing />;
}
