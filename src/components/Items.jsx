import FallingText from "./FallingText";
export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="relative bg-gradient-to-br from-black via-blue-950 to-black py-24 px-6 overflow-hidden">
      {/* Elementos decorativos de fondo - Orbes azules */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">


        {/* Header SEO */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Somos <span className="text-[#0891b2]">Grupo Bits</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Tu consultora digital especializada en transformación empresarial, estrategia tecnológica y soluciones integrales para el crecimiento.
          </p>
          
          {/* Línea decorativa */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-1.5 w-20 rounded-full bg-[#0891b2]"></div>
            <div className="h-2 w-2 rounded-full bg-[#0891b2]"></div>
            <div className="h-1.5 w-20 rounded-full bg-[#0891b2]"></div>
          </div>
        </div>

        {/* Contenido en columna única */}
        <div className="grid grid-cols-1 gap-12 items-start mb-20">
          {/* Izquierda: Misión y Valores */}
          <div className="space-y-6">
            {/* Card de propósito */}
            <div className="group relative bg-gradient-to-br from-[#0891b2]/20 via-transparent to-blue-900/20 border border-[#0891b2]/40 rounded-3xl p-8 backdrop-blur-sm hover:border-[#0891b2]/70 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#0891b2]/10 rounded-full blur-2xl -z-10 group-hover:bg-[#0891b2]/20 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🚀</span> Nuestra Misión
                </h4>
                <p className="text-slate-300 leading-relaxed text-base">
                  Ašeñar a <span className="text-[#0891b2] font-bold">empresas y emprendedores</span> en su transformación digital, integrando tecnología, marketing y comunicación para generar impacto real y crecimiento sostenible.
                </p>
              </div>
            </div>

            {/* Card de especialización */}
            <div className="group relative bg-gradient-to-br from-blue-900/20 via-transparent to-[#0891b2]/10 border border-blue-500/40 rounded-3xl p-8 backdrop-blur-sm hover:border-blue-400/70 transition-all duration-500 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl -z-10 group-hover:bg-blue-400/20 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">💡</span> Especialización
                </h4>
                <p className="text-slate-300 leading-relaxed text-base">
                  Ofrecemos <span className="text-blue-300 font-bold">soluciones integrales</span> que combinan expertise en tecnología, marketing digital y comunicación estratégica para maximizar resultados.
                </p>
              </div>
            </div>
          </div>

          {/* Derecha: Servicios principales */}
          <div className="relative">
            <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-[#0891b2]/50 hover:bg-white/10 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#0891b2]/20 to-transparent rounded-full blur-3xl -z-10 group-hover:from-[#0891b2]/30 transition-all duration-500"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white mb-2">Por qué elegirnos</h3>
                <p className="text-[#0891b2] font-bold mb-6 text-sm tracking-wider">EXPERTISE CONFIABLE</p>

                <p className="text-slate-400 text-base leading-relaxed mb-8">
                  Contamos con amplia experiencia trabajando con empresas de diversos sectores. Nuestro equipo proporciona asesoramiento experto y soluciones personalizadas para cada desafío empresarial.
                </p>

                <ul className="space-y-4">
                  {[
                    { icon: "🎯", title: "Transformación Digital", desc: "Moderniza tu empresa con tecnología" },
                    { icon: "📊", title: "Estrategia Digital", desc: "Planificación integral del crecimiento" },
                    { icon: "🌐", title: "Desarrollo Web", desc: "Plataformas potentes y escalables" },
                    { icon: "📱", title: "Marketing Online", desc: "Estrategias que generan resultados" },
                    { icon: "⚙️", title: "Consultoría Tech", desc: "Optimización de procesos tecnológicos" },
                    { icon: "💬", title: "Comunicación Digital", desc: "Tu marca siempre a la vanguardia" }
                  ].map((item, idx) => (
                    <li key={idx} className="group/item flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-[#0891b2]/30">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div className="flex-1">
                        <p className="font-bold text-white text-sm group-hover/item:text-[#0891b2] transition-colors duration-300">
                          {item.title}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="relative text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#0891b2]/20 via-blue-900/20 to-[#0891b2]/20 border border-[#0891b2]/40 rounded-3xl p-12 backdrop-blur-sm overflow-hidden group hover:border-[#0891b2]/70 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0891b2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-4">
                Listo para transformar tu empresa
              </h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Contáctanos hoy y descubre cómo podemos acelerar tu crecimiento digital
              </p>
              <button className="bg-[#0891b2] hover:bg-[#0e7490] text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl shadow-[#0891b2]/40 hover:shadow-[#0891b2]/60 transition-all duration-300 hover:scale-105 active:scale-95">
                SOLICITAR CONSULTA
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
