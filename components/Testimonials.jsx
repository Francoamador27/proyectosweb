import { testimonials } from "../constants";

const Testimonials = () => {
  return (
    <div className="mt-20 tracking-wide" id="contacto">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        ¿Querés llevar tu empresa al próximo nivel?
      </h2>
      <div className="max-w-4xl mx-auto text-center px-4">
        <p className="text-neutral-400 text-lg mb-10">
          Desarrollamos soluciones web personalizadas para marcas, negocios y
          emprendimientos en crecimiento. Si buscás un equipo que entienda tus
          necesidades, valore tu tiempo y te entregue calidad real, estás en el
          lugar indicado.
        </p>
        <p className="text-neutral-400 text-lg mb-10">
          Podemos ayudarte a transformar tu sitio en una herramienta estratégica:
          automatizaciones, carga dinámica de productos, integraciones con
          WhatsApp, pagos y más.
        </p>
        <a
          href="https://api.whatsapp.com/send/?phone=3513873029&text=Quiero%20realizar%20mi%20pagina%20web"
          className="inline-flex justify-center items-center text-center bg-orange-700 hover:bg-orange-800 text-white font-medium text-xl px-8 py-4 rounded-lg transition duration-200"
        >
          Contáctanos ahora
        </a>
     
      </div>
    </div>

  );
};

export default Testimonials;
