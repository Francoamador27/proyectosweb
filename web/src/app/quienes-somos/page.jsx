import QuienesSomos from "@/components/QuienesSomos";

export const metadata = {
  title: { absolute: "Grupo Bits | Digitalización, Marketing y Comunicación" },
  description: "Grupo Bits: especialistas en acompañar empresas y emprendedores en su proceso de digitalización. Integramos tecnología, marketing y comunicación para lograr crecimiento real y medible.",
  alternates: { canonical: "/quienes-somos" },
};

export default function Page() {
  return <QuienesSomos />;
}
