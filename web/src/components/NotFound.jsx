"use client";
import { Link } from "@/lib/router";

export default function NotFound() {
  return (
    <section className="section bg-cream">
      <div className="container-x max-w-xl text-center">
        <p className="font-display text-7xl font-bold text-brand/25">404</p>
        <h1 className="heading-lg mt-4">No encontramos esta página</h1>
        <p className="lead mt-4">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">Volver al inicio</Link>
          <Link to="/servicios" className="btn-secondary">Ver servicios</Link>
        </div>
      </div>
    </section>
  );
}
