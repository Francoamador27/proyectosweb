import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import {
  BarChart3, Target, TrendingUp, LineChart, FileText,
  CheckCircle2, ArrowRight, Phone, Megaphone, Search,
  Users, Mail, ChevronDown, ChevronUp, Zap, Eye, Clock,
  Award, CalendarDays, PieChart, RefreshCcw, ShoppingCart,
  Package, MessageCircle, CheckCheck, Send, Bell, Star,
} from "lucide-react";
import SEOHead from "../components/Head/Head";
import useCont from "../hooks/useCont";
import WhatsappHref from "../utils/WhatsappUrl";

// ─── Chart.js registration ────────────────────────────────────────────────────
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend);

// ─── Static data ──────────────────────────────────────────────────────────────

const STATS = [
  { value: "+340%", label: "ROI promedio en campañas" },
  { value: "5+", label: "Plataformas publicitarias" },
  { value: "100%", label: "Reporte mensual incluido" },
  { value: "24h", label: "Tiempo de respuesta" },
];

const SERVICES = [
  {
    icon: <CalendarDays className="w-7 h-7" />,
    title: "Planificación de Campañas",
    description:
      "Definimos objetivos SMART, audiencias, presupuestos y calendarios de ejecución. Cada campaña parte de una estrategia sólida adaptada a tu negocio.",
    items: [
      "Análisis de mercado y competencia",
      "Definición de buyer persona",
      "Estrategia por embudo (TOFU / MOFU / BOFU)",
      "Asignación y optimización de presupuesto",
    ],
    accent: "from-cyan-500 to-blue-600",
    border: "border-cyan-100",
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: "Seguimiento en Tiempo Real",
    description:
      "Monitoreamos tus campañas activas 24/7 y ajustamos pujas, segmentaciones y creatividades para maximizar resultados en todo momento.",
    items: [
      "Integración con Google Analytics 4",
      "Pixels y eventos de conversión",
      "Dashboard de métricas en vivo",
      "Alertas ante variaciones de rendimiento",
    ],
    accent: "from-violet-500 to-purple-600",
    border: "border-violet-100",
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: "Análisis y Optimización",
    description:
      "Interpretamos los datos para entender qué funciona y qué no. Aplicamos mejoras continuas basadas en evidencia, no en suposiciones.",
    items: [
      "A/B Testing de anuncios y landing pages",
      "Análisis de cohortes y funnels",
      "Identificación de audiencias de alto valor",
      "Reducción del CPA y aumento del ROAS",
    ],
    accent: "from-emerald-500 to-teal-600",
    border: "border-emerald-100",
  },
  {
    icon: <FileText className="w-7 h-7" />,
    title: "Resumen Mensual Detallado",
    description:
      "Cada mes recibís un informe completo con lo realizado, los resultados obtenidos y las recomendaciones para el próximo período.",
    items: [
      "Reporte en PDF + presentación ejecutiva",
      "KPIs vs objetivos pactados",
      "Análisis de lo que funcionó y lo que no",
      "Propuesta de acciones para el siguiente mes",
    ],
    accent: "from-orange-500 to-amber-500",
    border: "border-orange-100",
  },
];

const PLATFORMS = [
  { name: "Meta Ads", icon: <Megaphone className="w-5 h-5" />, color: "bg-blue-100 text-blue-700" },
  { name: "Google Ads", icon: <Search className="w-5 h-5" />, color: "bg-red-100 text-red-700" },
  { name: "TikTok Ads", icon: <Zap className="w-5 h-5" />, color: "bg-slate-900 text-white" },
  { name: "LinkedIn Ads", icon: <Users className="w-5 h-5" />, color: "bg-blue-700 text-white" },
  { name: "Email Marketing", icon: <Mail className="w-5 h-5" />, color: "bg-emerald-100 text-emerald-700" },
  { name: "Google Analytics", icon: <LineChart className="w-5 h-5" />, color: "bg-orange-100 text-orange-700" },
];

const PROCESS = [
  { step: "01", title: "Brief y Diagnóstico", desc: "Relevamos tu negocio, objetivos, histórico de campañas y presupuesto disponible." },
  { step: "02", title: "Estrategia y Planificación", desc: "Diseñamos la estrategia completa: canales, audiencias, mensajes y estructura de campañas." },
  { step: "03", title: "Lanzamiento", desc: "Configuramos y publicamos las campañas en todas las plataformas acordadas." },
  { step: "04", title: "Seguimiento Activo", desc: "Monitoreamos resultados diariamente y optimizamos en tiempo real." },
  { step: "05", title: "Reporte Mensual", desc: "Presentamos los resultados del mes, aprendizajes y plan de acción para el siguiente período." },
];

const REPORT_ITEMS = [
  { icon: <TrendingUp className="w-5 h-5 text-cyan-600" />, label: "Inversión total y desglose por plataforma" },
  { icon: <Target className="w-5 h-5 text-cyan-600" />, label: "Impresiones, clics, CTR y CPC promedio" },
  { icon: <Users className="w-5 h-5 text-cyan-600" />, label: "Leads o ventas generadas y costo por resultado" },
  { icon: <BarChart3 className="w-5 h-5 text-cyan-600" />, label: "ROAS y ROI de cada campaña activa" },
  { icon: <PieChart className="w-5 h-5 text-cyan-600" />, label: "Comparativa vs mes anterior y vs objetivos" },
  { icon: <RefreshCcw className="w-5 h-5 text-cyan-600" />, label: "Acciones realizadas y propuesta del próximo mes" },
];

const FAQS = [
  {
    q: "¿Cuánto tiempo tarda en verse resultados?",
    a: "Los primeros datos concretos aparecen en las primeras 2-4 semanas. Sin embargo, la optimización real ocurre a partir del mes 2-3 cuando los algoritmos tienen suficiente data para aprender.",
  },
  {
    q: "¿Qué presupuesto mínimo necesito?",
    a: "Trabajamos con presupuestos desde ARS $100.000 o USD $100 mensuales en pauta. Siempre recomendamos un nivel de inversión que permita obtener datos estadísticamente relevantes.",
  },
  {
    q: "¿Qué incluye el management mensual?",
    a: "Incluye configuración, optimización continua, seguimiento, comunicación con el cliente y el informe mensual completo. El presupuesto de medios se acuerda por separado.",
  },
  {
    q: "¿Puedo ver las campañas en tiempo real?",
    a: "Sí. Integramos dashboards personalizados para que puedas ver el rendimiento de tus campañas en cualquier momento sin necesidad de pedirlo.",
  },
  {
    q: "¿Qué pasa si una campaña no rinde bien?",
    a: "Detectamos caídas de rendimiento de forma proactiva y aplicamos correcciones antes de que impacten significativamente el presupuesto. El reporte mensual siempre incluye un análisis honesto de lo que no funcionó y por qué.",
  },
];

const WHY_US = [
  { icon: <Award className="w-6 h-6" />, title: "Estrategia basada en datos", desc: "Cada decisión está respaldada por métricas reales, no por intuición." },
  { icon: <Clock className="w-6 h-6" />, title: "Comunicación fluida", desc: "Reportes claros, disponibilidad y acceso a tus dashboards en tiempo real." },
  { icon: <Target className="w-6 h-6" />, title: "Foco en resultados", desc: "Medimos lo que realmente importa para tu negocio: leads, ventas y ROI." },
  { icon: <RefreshCcw className="w-6 h-6" />, title: "Optimización continua", desc: "No lanzamos y nos olvidamos. Iteramos y mejoramos durante toda la campaña." },
];

// ─── WhatsApp chat messages ───────────────────────────────────────────────────
const CHAT_MESSAGES = [
  { from: "lead", text: "¡Hola! Vi su anuncio en Instagram 👋", time: "10:42" },
  { from: "lead", text: "Me interesa la promo de las zapatillas", time: "10:43" },
  { from: "agent", text: "¡Hola! Con gusto te ayudamos. ¿Cuál es tu talle? 👟", time: "10:43" },
  { from: "lead", text: "Talle 42, las blancas con suela goma", time: "10:44" },
  { from: "agent", text: "Tenemos stock! Las enviamos en 24hs 🚀 ¿Te paso el link de pago?", time: "10:44" },
  { from: "lead", text: "Sí! Ya tengo la tarjeta lista 😄 ¡Hacelo!", time: "10:45" },
  { from: "agent", text: "¡Listo! Pedido tomado ✅ En breve recibís la confirmación.", time: "10:45" },
];

// ─── Cart products ────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Zapatillas Running", price: "$45.000", emoji: "👟", category: "Calzado", stars: 5 },
  { id: 2, name: "Remera Oversize", price: "$12.500", emoji: "👕", category: "Indumentaria", stars: 4 },
  { id: 3, name: "Mochila Urban", price: "$28.000", emoji: "🎒", category: "Accesorios", stars: 5 },
  { id: 4, name: "Auriculares BT", price: "$35.000", emoji: "🎧", category: "Tecnología", stars: 5 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
        open ? "border-cyan-200 shadow-md shadow-cyan-50" : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-800 text-[15px] leading-snug">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-cyan-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ── Animated Conversion Chart ─────────────────────────────────────────────────
function ConversionChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShowChart(true), 200);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  const chartData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Con Performance Marketing",
        data: [42, 88, 134, 189, 247, 310, 378],
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6,182,212,0.12)",
        fill: true,
        tension: 0.45,
        pointBackgroundColor: "#06b6d4",
        pointBorderColor: "#0e7490",
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 3,
      },
      {
        label: "Sin optimización",
        data: [42, 47, 51, 54, 57, 61, 64],
        borderColor: "#475569",
        backgroundColor: "rgba(71,85,105,0.04)",
        fill: true,
        tension: 0.45,
        pointBackgroundColor: "#475569",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        borderDash: [6, 4],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: { duration: 1800, easing: "easeInOutQuart" },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        labels: {
          color: "#94a3b8",
          font: { family: "Poppins", size: 12, weight: "600" },
          usePointStyle: true,
          pointStyleWidth: 10,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#f1f5f9",
        bodyColor: "#94a3b8",
        borderColor: "#1e293b",
        borderWidth: 1,
        padding: 12,
        titleFont: { family: "Poppins", weight: "700" },
        bodyFont: { family: "Poppins" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { family: "Poppins", size: 12 } },
        grid: { color: "rgba(148,163,184,0.07)", drawBorder: false },
        border: { display: false },
      },
      y: {
        ticks: {
          color: "#64748b",
          font: { family: "Poppins", size: 12 },
          callback: (v) => `${v} conv.`,
        },
        grid: { color: "rgba(148,163,184,0.07)", drawBorder: false },
        border: { display: false },
      },
    },
  };

  const kpis = [
    { label: "ROAS", value: "5.8x", color: "text-cyan-400" },
    { label: "CPA", value: "-62%", color: "text-emerald-400" },
    { label: "CTR", value: "4.2%", color: "text-violet-400" },
    { label: "Conversiones", value: "+378%", color: "text-amber-400" },
  ];

  return (
    <div ref={ref} className="w-full">
      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {kpis.map((k, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center"
          >
            <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold mt-1">{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white font-black text-lg">Evolución de Conversiones</p>
            <p className="text-slate-400 text-sm">Ene — Jul · Comparativa de rendimiento</p>
          </div>
          <div className="bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-full">
            <span className="text-emerald-400 text-xs font-black">↑ +336 conv.</span>
          </div>
        </div>
        {showChart ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="h-56 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ── WhatsApp Chat Simulation ──────────────────────────────────────────────────
function WhatsAppChat() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;

    let timeouts = [];
    let idx = 0;

    function scheduleNext() {
      if (idx >= CHAT_MESSAGES.length) {
        // restart after pause
        const restart = setTimeout(() => {
          setVisibleCount(0);
          setTyping(false);
          idx = 0;
          scheduleNext();
        }, 3500);
        timeouts.push(restart);
        return;
      }

      const msg = CHAT_MESSAGES[idx];
      const isAgent = msg.from === "agent";

      if (isAgent) {
        // show typing first
        const t1 = setTimeout(() => setTyping(true), 0);
        const t2 = setTimeout(() => {
          setTyping(false);
          setVisibleCount((c) => c + 1);
          idx++;
          scheduleNext();
        }, 1200);
        timeouts.push(t1, t2);
      } else {
        const t = setTimeout(() => {
          setVisibleCount((c) => c + 1);
          idx++;
          scheduleNext();
        }, 0);
        timeouts.push(t);
      }
    }

    // stagger the first message
    const init = setTimeout(() => scheduleNext(), 800);
    timeouts.push(init);

    return () => timeouts.forEach(clearTimeout);
  }, [isInView, visibleCount === 0 && !isInView ? null : isInView]);

  // scroll to bottom as messages appear
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleCount, typing]);

  const displayed = CHAT_MESSAGES.slice(0, visibleCount);

  return (
    <div ref={ref} className="w-full h-full">
      {/* Phone frame */}
      <div className="bg-[#111b21] rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 max-w-sm mx-auto">
        {/* Status bar */}
        <div className="bg-[#202c33] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-black">
              GB
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">Grupo Bits</p>
              <p className="text-[#8696a0] text-xs mt-0.5">
                {typing ? (
                  <span className="text-[#00a884]">escribiendo...</span>
                ) : (
                  "en línea"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[#8696a0]">
            <MessageCircle className="w-4 h-4" />
            <Phone className="w-4 h-4" />
          </div>
        </div>

        {/* Chat wallpaper */}
        <div
          className="h-[320px] overflow-y-auto px-3 py-4 space-y-2 scrollbar-none"
          ref={chatRef}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(8,145,178,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.03) 0%, transparent 50%)",
            backgroundColor: "#0b141a",
          }}
        >
          {/* Notification: source tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <span className="bg-[#182229] text-[#8696a0] text-[11px] px-3 py-1 rounded-full">
              Llegó por anuncio de Instagram
            </span>
          </motion.div>

          {/* Messages */}
          <AnimatePresence>
            {displayed.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`flex ${msg.from === "agent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "agent"
                      ? "bg-[#005c4b] text-white rounded-tr-sm"
                      : "bg-[#202c33] text-[#e9edef] rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-[#8696a0]">{msg.time}</span>
                    {msg.from === "agent" && (
                      <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="flex justify-end"
              >
                <div className="bg-[#005c4b] px-4 py-3 rounded-2xl rounded-tr-sm">
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 bg-[#8696a0] rounded-full block"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.7,
                          delay: i * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="bg-[#202c33] px-3 py-3 flex items-center gap-2">
          <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 flex items-center">
            <span className="text-[#8696a0] text-sm">Escribe un mensaje...</span>
          </div>
          <div className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center flex-shrink-0">
            <Send className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500 mt-4 font-medium">
        💬 Consultas reales generadas por tus campañas
      </p>
    </div>
  );
}

// ── Cart Animation ─────────────────────────────────────────────────────────────
function CartAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const [cartCount, setCartCount] = useState(0);
  const [addedIds, setAddedIds] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [cartBounce, setCartBounce] = useState(false);
  const autoRef = useRef(null);

  function addToCart(product) {
    setCartCount((c) => c + 1);
    setAddedIds((ids) => [...ids, product.id]);
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 400);

    const toastId = Date.now() + Math.random();
    setToasts((t) => [
      { id: toastId, name: product.name, price: product.price, emoji: product.emoji },
      ...t.slice(0, 2),
    ]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 2800);

    // Reset "added" state after 2s to allow re-adding
    setTimeout(
      () => setAddedIds((ids) => ids.filter((id) => id !== product.id)),
      2000
    );
  }

  // Auto-cycle: add a random product every 2.8s when in view
  useEffect(() => {
    if (!isInView) {
      clearInterval(autoRef.current);
      return;
    }
    autoRef.current = setInterval(() => {
      const available = PRODUCTS.filter((p) => !addedIds.includes(p.id));
      if (available.length === 0) {
        setAddedIds([]);
        setCartCount(0);
        return;
      }
      const pick = available[Math.floor(Math.random() * available.length)];
      addToCart(pick);
    }, 2800);
    return () => clearInterval(autoRef.current);
  }, [isInView, addedIds]);

  return (
    <div ref={ref} className="w-full relative">
      {/* Cart header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-white font-black text-base">Tienda en vivo</p>
          <p className="text-slate-400 text-xs">Ventas generadas por tus anuncios</p>
        </div>
        <motion.div
          animate={cartBounce ? { scale: [1, 1.35, 0.9, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/30 rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-cyan-400" />
          </div>
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-cyan-500 rounded-full text-white text-[11px] font-black flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Toast notifications */}
      <div className="absolute top-0 right-0 z-20 space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="bg-[#1e293b] border border-emerald-500/40 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl shadow-black/30"
            >
              <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                {toast.emoji}
              </div>
              <div>
                <p className="text-white text-xs font-black leading-none">¡Venta!</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{toast.name} · {toast.price}</p>
              </div>
              <Bell className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3">
        {PRODUCTS.map((product) => {
          const isAdded = addedIds.includes(product.id);
          return (
            <motion.div
              key={product.id}
              whileHover={{ y: -3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 hover:border-white/20 transition-colors"
            >
              {/* Product visual */}
              <div className="w-full h-20 bg-white/5 rounded-xl flex items-center justify-center text-4xl">
                {product.emoji}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{product.category}</p>
                <p className="text-white text-sm font-bold leading-tight mt-0.5">{product.name}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: product.stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-black text-sm">{product.price}</span>
                <motion.button
                  onClick={() => addToCart(product)}
                  disabled={isAdded}
                  whileTap={{ scale: 0.9 }}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all duration-300 ${
                    isAdded
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30"
                  }`}
                >
                  {isAdded ? "✓ Agregado" : "+ Carrito"}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live counter bar */}
      <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-400 text-xs font-semibold">Ventas en tiempo real</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-black">{cartCount} vendidos hoy</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const PerformanceMarketing = () => {
  const { company, contact } = useCont();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Performance Marketing",
    provider: {
      "@type": "ProfessionalService",
      name: company?.name || "Grupo Bits",
      url: company?.domain || "",
    },
    description:
      "Servicios de performance marketing: planificación de campañas, seguimiento, análisis de datos y reportes mensuales detallados para maximizar tu ROI.",
    areaServed: { "@type": "Country", name: "Argentina" },
    serviceType: ["Performance Marketing", "Gestión de Campañas Publicitarias", "Meta Ads", "Google Ads", "Analítica Digital"],
    offers: {
      "@type": "Offer",
      description: "Planificación, gestión y optimización de campañas de performance con reporte mensual incluido.",
    },
  };

  return (
    <>
      <SEOHead
        priority="high"
        title={`Performance Marketing | ${company?.name || "Grupo Bits"} — Campañas que generan resultados`}
        description="Gestionamos tus campañas de Meta Ads, Google Ads y más con planificación estratégica, seguimiento en tiempo real y reportes mensuales detallados. Maximizamos tu ROI."
        keywords="performance marketing, gestión de campañas, Meta Ads, Google Ads, TikTok Ads, marketing digital, ROI, ROAS, analítica digital, reportes de campañas, Grupo Bits, Córdoba"
        canonical={`${company?.domain || ""}/performance-marketing`}
        jsonLd={jsonLd}
        og={{
          title: "Performance Marketing — Campañas que generan resultados reales",
          description: "Planificación, seguimiento, análisis y reportes mensuales de tus campañas publicitarias. Maximizamos tu ROI con datos reales.",
          type: "website",
        }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,145,178,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 left-0 w-[32rem] h-[32rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/15">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="text-xs font-black text-white uppercase tracking-widest">
              Agencia de Performance Marketing
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Campañas que{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              generan resultados
            </span>
            <br className="hidden md:block" /> reales
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Planificamos, ejecutamos y optimizamos tus campañas publicitarias en todas las plataformas.
            <span className="font-semibold text-white">
              {" "}Cada decisión respaldada por datos. Cada peso invertido, justificado.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WhatsappHref({ message: "Hola, me interesa conocer más sobre sus servicios de Performance Marketing." })}
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Quiero una estrategia
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#en-accion"
              className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg border border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Ver en acción
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5 text-center">
                <p className="text-3xl md:text-4xl font-black text-cyan-400 mb-1">{s.value}</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-8">
            Plataformas en las que trabajamos
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PLATFORMS.map((p, i) => (
              <div key={i} className={`${p.color} flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-transform hover:-translate-y-0.5`}>
                {p.icon}
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EN ACCIÓN (Animaciones) ────────────────────────────────────────── */}
      <section id="en-accion" className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-28 relative overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,145,178,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[20rem] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 mb-6">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Resultados en acción</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
              Mirá qué pasa cuando{" "}
              <span className="text-cyan-400">tus campañas funcionan</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
              Datos reales, leads entrantes y ventas en tiempo real. Esto es performance marketing en funcionamiento.
            </p>
          </div>

          {/* Conversion Chart — full width */}
          <ConversionChart />

          {/* WhatsApp + Cart — 2 cols */}
          <div className="mt-12 grid lg:grid-cols-2 gap-10 items-start">
            {/* WhatsApp chat */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a884]/20 border border-[#00a884]/30 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#00a884]" />
                </div>
                <div>
                  <p className="text-white font-black">Consultas entrantes</p>
                  <p className="text-slate-400 text-xs">Leads generados por tus anuncios</p>
                </div>
              </div>
              <WhatsAppChat />
            </div>

            {/* Cart animation */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/30 rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-black">Ventas en tiempo real</p>
                  <p className="text-slate-400 text-xs">E-commerce impulsado por pauta</p>
                </div>
              </div>
              <CartAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="servicios" className="bg-slate-50 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-100 px-4 py-2 rounded-full mb-5">
              <Target className="w-4 h-4 text-cyan-700" />
              <span className="text-xs font-black text-cyan-700 uppercase tracking-widest">Nuestros servicios</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 leading-tight">
              Todo lo que necesitás para{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                crecer con pauta
              </span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              No solo lanzamos campañas. Acompañamos cada etapa del proceso con foco en resultados medibles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((s, i) => (
              <div key={i} className={`bg-white rounded-3xl border ${s.border} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group`}>
                <div className={`h-1.5 w-full bg-gradient-to-r ${s.accent}`} />
                <div className="p-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${s.accent} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-5">{s.description}</p>
                  <ul className="space-y-2.5">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-700 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full mb-5">
              <RefreshCcw className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Metodología</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 leading-tight">
              Así trabajamos con vos
            </h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto font-light">
              Un proceso claro, transparente y orientado a resultados desde el primer día.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-200" />
            <div className="grid md:grid-cols-5 gap-8">
              {PROCESS.map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/20 mb-5 z-10 relative">
                    {p.step}
                  </div>
                  <h4 className="font-black text-slate-900 mb-2 text-[15px]">{p.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MONTHLY REPORT ────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 mb-7">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Reporte mensual</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Cada mes sabés exactamente
                <span className="text-cyan-400"> cómo van tus campañas</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                Nada de cifras crípticas ni dashboards confusos. Te enviamos un informe claro, en lenguaje humano, con todo lo que pasó en el mes y lo que vamos a hacer el próximo.
              </p>
              <a
                href={WhatsappHref({ message: "Hola, me gustaría saber más sobre los reportes mensuales de campañas." })}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-black text-base hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-cyan-500/20"
              >
                Quiero ver un ejemplo
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Informe mensual</p>
                    <p className="text-white font-black text-lg">Marzo 2025 — Resumen</p>
                  </div>
                  <div className="bg-cyan-500/20 border border-cyan-500/30 px-3 py-1.5 rounded-full">
                    <span className="text-cyan-400 text-xs font-black uppercase">Enviado</span>
                  </div>
                </div>
                <ul className="space-y-4">
                  {REPORT_ITEMS.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-3">
                      <div className="w-9 h-9 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-slate-200 text-sm font-medium">{item.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 pt-6 border-t border-white/10 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <p className="text-slate-300 text-sm">
                    + Reunión de revisión y propuesta del próximo mes incluida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-cyan-100 px-4 py-2 rounded-full mb-5">
              <Award className="w-4 h-4 text-cyan-700" />
              <span className="text-xs font-black text-cyan-700 uppercase tracking-widest">Por qué elegirnos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Performance marketing sin vueltas
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((w, i) => (
              <div key={i} className="group bg-slate-50 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 rounded-3xl p-7 border border-slate-100 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1">
                <div className="w-12 h-12 bg-cyan-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center text-cyan-600 group-hover:text-white mb-5 transition-colors duration-300">
                  {w.icon}
                </div>
                <h4 className="font-black text-slate-900 group-hover:text-white mb-2 transition-colors duration-300">{w.title}</h4>
                <p className="text-slate-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-300">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS ──────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Preguntas frecuentes</h2>
            <p className="text-slate-600 text-lg font-light">Todo lo que querés saber antes de arrancar.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full mb-8 border border-white/20">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
                  </span>
                  <span className="text-sm font-black text-white uppercase tracking-widest">Consulta sin cargo</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  ¿Listo para hacer que
                  <br className="hidden md:block" />{" "}
                  <span className="text-cyan-400">tu pauta trabaje mejor?</span>
                </h2>
                <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                  Hablemos de tu negocio, tus objetivos y cómo podemos ayudarte a crecer con performance marketing real.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={WhatsappHref({ message: "Hola, me gustaría solicitar una consulta sobre Performance Marketing para mi empresa." })}
                    className="group bg-white hover:bg-slate-50 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 active:scale-95"
                  >
                    <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    Hablar con un especialista
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    {["Sin contratos de largo plazo", "Reporte mensual incluido", "Dashboard en tiempo real"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                        <span className="font-semibold text-slate-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PerformanceMarketing;
