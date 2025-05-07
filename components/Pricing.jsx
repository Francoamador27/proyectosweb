import { portfolioItems } from "../constants";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Pricing = () => {
  return (
    <div className="mt-20" id="portafolio">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wider">
        Sitios Web Diseñados para Clientes  
      </h2>


      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        navigation
        loop={true} // ← Habilita loop infinito
        autoplay={{
          delay: 5000, // ← 3 segundos
          disableOnInteraction: false, // sigue pasando aunque el usuario interactúe
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="px-4"
      >
        {portfolioItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 border border-neutral-700 rounded-xl h-full flex flex-col justify-between bg-neutral-900">
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent uppercase tracking-wide mb-2 inline-block">
                {item.type}
              </span>
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm mb-4">{item.description}</p>
                <ul>
                  {item.tags.map((tag, i) => (
                    <li
                      key={i}
                      className="inline-block bg-neutral-800 text-sm text-white px-3 py-1 rounded-full mr-2 mt-2"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={`/proyectos/${item.id}`}
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-8 tracking-tight text-xl hover:bg-orange-900 border border-orange-900 rounded-lg transition duration-200"
              >
                Ver Proyecto
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Pricing;
