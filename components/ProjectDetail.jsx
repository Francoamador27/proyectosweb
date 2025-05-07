import { useParams } from "react-router-dom";
import { portfolioItems } from "../constants";
import { FolderOpen, Building, ShoppingCart, Layout, Search } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { useState } from 'react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'


export default function ProjectDetail() {
    const iconMap = {
        "Sitio institucional": <Building className="w-5 h-5 text-orange-500" />,
        "Tienda online": <ShoppingCart className="w-5 h-5 text-orange-500" />,
        "Landing Page": <Layout className="w-5 h-5 text-orange-500" />
    };
    const { id } = useParams();
    const project = portfolioItems.find(item => item.id === parseInt(id));
    const [index, setIndex] = useState(-1)
    const isMobile = window.innerWidth < 640; // sm breakpoint en Tailwind

    if (!project) return <p className="text-center mt-10 text-white">Proyecto no encontrado</p>;
    const galleryImages = [project.mainImage, ...project.gallery].map(img => ({ src: img }));

    return (
        <div className="max-w-6xl mx-auto px-6 py-20 text-white">
            {/* Tipo y título */}
            <p className="text-gray-400 mb-2 flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-2">
                    {iconMap[project.type] || <FolderOpen className="w-5 h-5 text-orange-500" />}
                    {project.type}
                </span>

                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:underline hover:text-orange-400 transition"
                    >
                        Visitar sitio →
                    </a>
                )}
            </p>

            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="text-lg text-gray-400 mt-2">{project.description}</p>
            {/* Tags tecnológicos */}
            <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-neutral-800 text-white text-sm px-3 py-1 rounded-full border border-neutral-700"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Imagen principal */}


            <section className="mt-16">
                <h2 className="text-2xl font-bold text-orange-500 mb-6">Galería</h2>
                <Swiper
                    loop={true}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination]}
                    className="w-full max-w-5xl"
                >
                    {galleryImages.map((img, i) => (
                        <SwiperSlide
                            key={i}
                            style={{
                                width: isMobile ? '400px' : '800px',
                                height: isMobile ? '200px' : '400px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}
                        >
                            {/* Botón lupa */}
                            <div
                                className="absolute top-2 right-5 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer z-10"
                                onClick={() => setIndex(i)}
                                title="Ver en grande"
                            >
                                <Search className="w-4 h-4" />
                            </div>


                            {/* Imagen */}
                            <img
                                src={img.src}
                                alt={`galería-${i}`}
                                className="w-full h-full object-cover rounded-xl shadow-md"
                            />
                        </SwiperSlide>


                    ))}
                </Swiper>
                <Lightbox
                    open={index >= 0}
                    close={() => setIndex(-1)}
                    slides={galleryImages}
                    index={index}
                />
            </section>
            {/* Sección de características */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold text-orange-500 mb-6">Características</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {project.features.map((feature, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold text-white mb-1">
                                🔸 {feature.title}
                            </h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
