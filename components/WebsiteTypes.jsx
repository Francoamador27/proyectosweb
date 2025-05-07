import {
    Target,
    Building2,
    ShoppingCart,
  } from "lucide-react";
  
  const TiposDePaginas = () => {
    const servicios = [
      {
        icono: <Target className="w-10 h-10 text-orange-500 mb-4" />,
        titulo: "Landing Page",
        descripcion:
          "Páginas de aterrizaje efectivas para conversiones y campañas de marketing.",
        precio: "desde $300.000",
      },
      {
        icono: <Building2 className="w-10 h-10 text-orange-500 mb-4" />,
        titulo: "Sitio Institucional",
        descripcion:
          "Webs corporativas para empresas, organizaciones y entidades.",
        precio: "desde $600.000",
      },
      {
        icono: <ShoppingCart className="w-10 h-10 text-orange-500 mb-4" />,
        titulo: "Tienda Online",
        descripcion:
          "Comercio electrónico a medida para vender tus productos en línea.",
        precio: "desde $1.000.000",
      },
    ];
  
    return (
      <section className="bg-black py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tipos de Páginas Web
          </h2>
          <p className="text-gray-400 mb-12">
            Desarrollamos soluciones a medida para cada necesidad digital.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {servicios.map((servicio, index) => (
              <div
                key={index}
                className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 shadow hover:shadow-lg transition duration-300"
              >
                {servicio.icono}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {servicio.titulo}
                </h3>
                <p className="text-gray-400 mb-2">{servicio.descripcion}</p>
                <p className="text-orange-500 font-medium">{servicio.precio}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-12">
            *Los precios son orientativos y pueden variar según los requerimientos de cada proyecto.
          </p>
        </div>
      </section>
    );
  };
  
  export default TiposDePaginas;
  