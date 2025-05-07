import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div className="felx flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Desarrollo Web
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          en Córdoba, Argentina
        </span>
      </h1>
      <div className="flex flex-col items-center lg:mt-20">
        <p className="text-lg text-center text-neutral-500 max-w-4xl mx-auto">
          ¿Estás buscando páginas web para tu empresa? Somos especialistas en la creación de sitios web profesionales, modernos y rápidos. Ofrecemos servicios de diseño web a medida para empresas, emprendimientos y profesionales. Impulsamos negocios en Córdoba y toda Argentina con soluciones digitales efectivas y adaptadas a tus necesidades.
        </p>

      </div>

      <div className="flex justify-center my-10">
        <a
          href="https://api.whatsapp.com/send/?phone=3513873029&text=Quiero%20realizar%20mi%20pagina%20web"
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
        >
          Comenzar proyecto
        </a>
        <a href="#servicios" className="py-3 px-4 mx-3 rounded-md border">
          Ver servicios
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          muted
          loop
          className="rounded-lg w-1/2 border border-orange-700"
        >
          <source src={video1} type="video/mp4" />
        </video>
        <video
          autoPlay
          muted
          loop
          className="rounded-lg w-1/2 border border-orange-700"
        >
          <source src={video2} type="video/mp4" />
        </video>
      </div>
    </div>

  );
};

export default HeroSection;
