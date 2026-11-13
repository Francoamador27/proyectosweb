"use client";
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
  BarChart3,
  Target,
  TrendingUp,
  LineChart,
  FileText,
  CheckCircle2,
  ArrowRight,
  Phone,
  Megaphone,
  Search,
  Users,
  Mail,
  ChevronDown,
  ChevronUp,
  Zap,
  Eye,
  Clock,
  Award,
  CalendarDays,
  PieChart,
  RefreshCcw,
  ShoppingCart,
  Package,
  MessageCircle,
  CheckCheck,
  Send,
  Bell,
  Star,
} from "lucide-react";
import SEOHead from "../components/Head/Head";
import useCont from "../hooks/useCont";
import WhatsappHref from "../utils/WhatsappUrl";

// ─── Chart.js registration ────────────────────────────────────────────────────
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
);

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
  {
    name: "Meta Ads",
    icon: <Megaphone className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Google Ads",
    icon: <Search className="w-5 h-5" />,
    color: "bg-red-100 text-red-700",
  },
  {
    name: "TikTok Ads",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-slate-900 text-white",
  },
  {
    name: "LinkedIn Ads",
    icon: <Users className="w-5 h-5" />,
    color: "bg-blue-700 text-white",
  },
  {
    name: "Email Marketing",
    icon: <Mail className="w-5 h-5" />,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Google Analytics",
    icon: <LineChart className="w-5 h-5" />,
    color: "bg-orange-100 text-orange-700",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Brief y Diagnóstico",
    desc: "Relevamos tu negocio, objetivos, histórico de campañas y presupuesto disponible.",
  },
  {
    step: "02",
    title: "Estrategia y Planificación",
    desc: "Diseñamos la estrategia completa: canales, audiencias, mensajes y estructura de campañas.",
  },
  {
    step: "03",
    title: "Lanzamiento",
    desc: "Configuramos y publicamos las campañas en todas las plataformas acordadas.",
  },
  {
    step: "04",
    title: "Seguimiento Activo",
    desc: "Monitoreamos resultados diariamente y optimizamos en tiempo real.",
  },
  {
    step: "05",
    title: "Reporte Mensual",
    desc: "Presentamos los resultados del mes, aprendizajes y plan de acción para el siguiente período.",
  },
];

const REPORT_ITEMS = [
  {
    icon: <TrendingUp className="w-5 h-5 text-cyan-600" />,
    label: "Inversión total y desglose por plataforma",
  },
  {
    icon: <Target className="w-5 h-5 text-cyan-600" />,
    label: "Impresiones, clics, CTR y CPC promedio",
  },
  {
    icon: <Users className="w-5 h-5 text-cyan-600" />,
    label: "Leads o ventas generadas y costo por resultado",
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-cyan-600" />,
    label: "ROAS y ROI de cada campaña activa",
  },
  {
    icon: <PieChart className="w-5 h-5 text-cyan-600" />,
    label: "Comparativa vs mes anterior y vs objetivos",
  },
  {
    icon: <RefreshCcw className="w-5 h-5 text-cyan-600" />,
    label: "Acciones realizadas y propuesta del próximo mes",
  },
];

const FAQS = [
  {
    q: "¿Cuánto tiempo tarda en verse resultados?",
    a: "Los primeros datos concretos aparecen en las primeras 2-4 semanas. Sin embargo, la optimización real ocurre a partir del mes 2-3 cuando los algoritmos tienen suficiente data para aprender.",
  },
  {
    q: "¿Qué presupuesto mínimo necesito?",
    a: "Trabajamos con presupuestos a medida según el rubro de tu empresa. Siempre recomendamos un nivel de inversión que permita obtener datos estadísticamente relevantes.",
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
  {
    icon: <Award className="w-6 h-6" />,
    title: "Estrategia basada en datos",
    desc: "Cada decisión está respaldada por métricas reales, no por intuición.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Comunicación fluida",
    desc: "Reportes claros, disponibilidad y acceso a tus dashboards en tiempo real.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Foco en resultados",
    desc: "Medimos lo que realmente importa para tu negocio: leads, ventas y ROI.",
  },
  {
    icon: <RefreshCcw className="w-6 h-6" />,
    title: "Optimización continua",
    desc: "No lanzamos y nos olvidamos. Iteramos y mejoramos durante toda la campaña.",
  },
];

// ─── WhatsApp chat messages ───────────────────────────────────────────────────
const CHAT_MESSAGES = [
  { from: "lead", text: "¡Hola! Vi su anuncio en Instagram 👋", time: "10:42" },
  {
    from: "lead",
    text: "Me interesa la promo de las zapatillas",
    time: "10:43",
  },
  {
    from: "agent",
    text: "¡Hola! Con gusto te ayudamos. ¿Cuál es tu talle? 👟",
    time: "10:43",
  },
  { from: "lead", text: "Talle 42, las blancas con suela goma", time: "10:44" },
  {
    from: "agent",
    text: "Tenemos stock! Las enviamos en 24hs 🚀 ¿Te paso el link de pago?",
    time: "10:44",
  },
  {
    from: "lead",
    text: "Sí! Ya tengo la tarjeta lista 😄 ¡Hacelo!",
    time: "10:45",
  },
  {
    from: "agent",
    text: "¡Listo! Pedido tomado ✅ En breve recibís la confirmación.",
    time: "10:45",
  },
];

// ─── Cart products ────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Zapatillas Running",
    price: "$45.000",
    emoji: "👟",
    category: "Calzado",
    stars: 5,
  },
  {
    id: 2,
    name: "Remera Oversize",
    price: "$12.500",
    emoji: "👕",
    category: "Indumentaria",
    stars: 4,
  },
  {
    id: 3,
    name: "Mochila Urban",
    price: "$28.000",
    emoji: "🎒",
    category: "Accesorios",
    stars: 5,
  },
  {
    id: 4,
    name: "Auriculares BT",
    price: "$35.000",
    emoji: "🎧",
    category: "Tecnología",
    stars: 5,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-2xl border bg-cream transition-colors ${open ? "border-brand/30" : "border-line"}`}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <h3 className="text-[15px] font-bold leading-snug">{q}</h3>
        {open ? <ChevronUp className="h-5 w-5 shrink-0 text-brand" /> : <ChevronDown className="h-5 w-5 shrink-0 text-subtle" />}
      </button>
      {open && <p className="px-6 pb-5 leading-relaxed">{a}</p>}
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
        borderColor: "#15803d",
        backgroundColor: "rgba(21,128,61,0.10)",
        fill: true,
        tension: 0.45,
        pointBackgroundColor: "#15803d",
        pointBorderColor: "#166534",
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 3,
      },
      {
        label: "Sin optimización",
        data: [42, 47, 51, 54, 57, 61, 64],
        borderColor: "#a8a29e",
        backgroundColor: "rgba(71,85,105,0.04)",
        fill: true,
        tension: 0.45,
        pointBackgroundColor: "#a8a29e",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        borderDash: [6, 4],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    // Margen para que las etiquetas del eje Y no se corten si la fuente carga tarde
    layout: { padding: { left: 16 } },
    animation: { duration: 1800, easing: "easeInOutQuart" },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        labels: {
          color: "#4a544f",
          font: { family: "Nunito Sans, system-ui, sans-serif", size: 12, weight: "600" },
          usePointStyle: true,
          pointStyleWidth: 10,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#1d2420",
        bodyColor: "#4a544f",
        borderColor: "#e7e0d4",
        borderWidth: 1,
        padding: 12,
        titleFont: { family: "Nunito Sans, system-ui, sans-serif", weight: "700" },
        bodyFont: { family: "Nunito Sans, system-ui, sans-serif" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { family: "Nunito Sans, system-ui, sans-serif", size: 12 } },
        grid: { color: "rgba(29,36,32,0.06)", drawBorder: false },
        border: { display: false },
      },
      y: {
        ticks: {
          color: "#64748b",
          font: { family: "Nunito Sans, system-ui, sans-serif", size: 12 },
          callback: (v) => `${v} conv.`,
        },
        grid: { color: "rgba(29,36,32,0.06)", drawBorder: false },
        border: { display: false },
      },
    },
  };

  const kpis = [
    { label: "ROAS", value: "5.8x", color: "text-brand" },
    { label: "CPA", value: "-62%", color: "text-emerald-600" },
    { label: "CTR", value: "4.2%", color: "text-violet-600" },
    { label: "Conversiones", value: "+378%", color: "text-amber-600" },
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
            className="bg-paper border border-line rounded-2xl px-5 py-4 text-center"
          >
            <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
            <p className="text-subtle text-xs uppercase tracking-widest font-semibold mt-1">
              {k.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-paper border border-line rounded-3xl p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-ink font-black text-lg">
              Evolución de Conversiones
            </p>
            <p className="text-subtle text-sm">
              Ene — Jul · Comparativa de rendimiento
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <span className="text-emerald-600 text-xs font-black">
              ↑ +336 conv.
            </span>
          </div>
        </div>
        {showChart ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="h-56 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
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
      <div className="bg-[#efeae2] rounded-3xl overflow-hidden shadow-lift border border-line max-w-sm mx-auto">
        {/* Status bar */}
        <div className="bg-[#f0f2f5] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-strong flex items-center justify-center text-white text-sm font-black">
              GB
            </div>
            <div>
              <p className="text-ink font-semibold text-sm leading-none">
                Grupo Bits
              </p>
              <p className="text-[#667781] text-xs mt-0.5">
                {typing ? (
                  <span className="text-[#00a884]">escribiendo...</span>
                ) : (
                  "en línea"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[#667781]">
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
            backgroundColor: "#efeae2",
          }}
        >
          {/* Notification: source tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <span className="bg-white text-[#54656f] shadow-sm text-[11px] px-3 py-1 rounded-full">
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
                      ? "bg-[#d9fdd3] text-[#111b21] rounded-tr-sm"
                      : "bg-white text-[#111b21] rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-[#667781]">
                      {msg.time}
                    </span>
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
                <div className="bg-[#d9fdd3] px-4 py-3 rounded-2xl rounded-tr-sm">
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
        <div className="bg-[#f0f2f5] px-3 py-3 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
            <span className="text-[#667781] text-sm">
              Escribe un mensaje...
            </span>
          </div>
          <div className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center flex-shrink-0">
            <Send className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-subtle mt-4 font-medium">
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
      {
        id: toastId,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
      },
      ...t.slice(0, 2),
    ]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 2800);

    // Reset "added" state after 2s to allow re-adding
    setTimeout(
      () => setAddedIds((ids) => ids.filter((id) => id !== product.id)),
      2000,
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
          <p className="text-ink font-black text-base">Tienda en vivo</p>
          <p className="text-subtle text-xs">
            Ventas generadas por tus anuncios
          </p>
        </div>
        <motion.div
          animate={cartBounce ? { scale: [1, 1.35, 0.9, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="w-12 h-12 bg-brand-soft border border-brand/20 rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-brand" />
          </div>
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand rounded-full text-white text-[11px] font-black flex items-center justify-center"
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
              className="bg-paper border border-emerald-200 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lift"
            >
              <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                {toast.emoji}
              </div>
              <div>
                <p className="text-ink text-xs font-black leading-none">
                  ¡Venta!
                </p>
                <p className="text-subtle text-[11px] mt-0.5">
                  {toast.name} · {toast.price}
                </p>
              </div>
              <Bell className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
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
              className="bg-paper border border-line rounded-2xl p-4 flex flex-col gap-3 hover:border-ink/20 transition-colors"
            >
              {/* Product visual */}
              <div className="w-full h-20 bg-paper rounded-xl flex items-center justify-center text-4xl">
                {product.emoji}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-[10px] text-subtle uppercase tracking-widest font-semibold">
                  {product.category}
                </p>
                <p className="text-ink text-sm font-bold leading-tight mt-0.5">
                  {product.name}
                </p>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: product.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-brand font-black text-sm">
                  {product.price}
                </span>
                <motion.button
                  onClick={() => addToCart(product)}
                  disabled={isAdded}
                  whileTap={{ scale: 0.9 }}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all duration-300 ${
                    isAdded
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : "bg-brand-soft text-brand border border-brand/20 hover:bg-brand/15"
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
      <div className="mt-4 bg-paper border border-line rounded-2xl px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-subtle text-xs font-semibold">
            Ventas en tiempo real
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5 text-brand" />
          <span className="text-brand text-sm font-black">
            {cartCount} vendidos hoy
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const PerformanceMarketing = () => {
  const { company } = useCont();
  const whatsapp = (message) => WhatsappHref({ message });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Performance Marketing",
    provider: { "@type": "ProfessionalService", name: company?.name || "Grupo Bits", url: company?.domain || undefined },
    description:
      "Planificación de campañas, seguimiento, análisis de datos y reportes mensuales para maximizar el retorno de tu inversión publicitaria.",
    areaServed: { "@type": "Country", name: "Argentina" },
    serviceType: ["Performance Marketing", "Gestión de Campañas Publicitarias", "Meta Ads", "Google Ads", "Analítica Digital"],
  };

  return (
    <>
      <SEOHead jsonLd={jsonLd} />

      {/* ── HERO ── */}
      <section className="section bg-cream">
        <div className="container-x text-center">
          <span className="eyebrow">Marketing digital</span>
          <h1 className="heading-xl mx-auto mt-5 max-w-4xl">
            Campañas que <span className="text-brand">generan resultados</span> reales
          </h1>
          <p className="lead mx-auto mt-6 max-w-2xl">
            Planificamos, publicamos y mejoramos tus anuncios en Google, Instagram, Facebook y más.
            Cada decisión con datos, y cada peso invertido, explicado.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsapp("Hola! Me interesa el servicio de campañas publicitarias.")} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={18} /> Quiero una estrategia
            </a>
            <a href="#en-accion" className="btn-secondary">
              Ver cómo funciona <ChevronDown size={18} />
            </a>
          </div>

          <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="ui-card flex flex-col-reverse px-5 py-6">
                <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-subtle">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-brand">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12">
            <p className="text-xs font-bold uppercase tracking-wider text-subtle">Plataformas en las que trabajamos</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {PLATFORMS.map((p) => (
                <li key={p.name} className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-ink">
                  <span className="text-brand">{p.icon}</span>
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── EN ACCIÓN ── */}
      <section id="en-accion" className="section bg-sand">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><TrendingUp size={14} /> Así se ve en acción</span>
            <h2 className="heading-lg mt-4">Qué pasa cuando tus campañas funcionan</h2>
            <p className="lead mt-4">Más consultas por WhatsApp, más ventas y números claros para decidir.</p>
            <p className="mt-2 text-xs text-subtle">Ejemplo ilustrativo con datos de muestra.</p>
          </div>

          <div className="mt-12">
            <ConversionChart />
          </div>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="icon-chip"><MessageCircle size={19} /></div>
                <div>
                  <h3 className="font-bold">Consultas entrantes</h3>
                  <p className="text-sm text-subtle">Clientes que llegan desde tus anuncios</p>
                </div>
              </div>
              <WhatsAppChat />
            </div>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="icon-chip"><ShoppingCart size={19} /></div>
                <div>
                  <h3 className="font-bold">Ventas en tiempo real</h3>
                  <p className="text-sm text-subtle">Tienda online impulsada por publicidad</p>
                </div>
              </div>
              <CartAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="section bg-paper">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Target size={14} /> Qué hacemos</span>
            <h2 className="heading-lg mt-4">Todo lo que necesitás para crecer con publicidad</h2>
            <p className="lead mt-4">No solo publicamos anuncios: te acompañamos en cada paso con foco en resultados.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SERVICES.map((s) => (
              <article key={s.title} className="ui-card bg-cream p-8">
                <div className="icon-chip h-12 w-12">{s.icon}</div>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed">{s.description}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand" /> {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="section bg-cream">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Cómo trabajamos</span>
            <h2 className="heading-lg mt-4">Un proceso claro desde el primer día</h2>
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((p) => (
              <li key={p.step} className="ui-card p-6">
                <span className="font-display text-3xl font-bold text-brand/30">{p.step}</span>
                <h3 className="mt-3 font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── REPORTE MENSUAL ── */}
      <section className="section bg-paper">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow"><FileText size={14} /> Reporte mensual</span>
            <h2 className="heading-lg mt-4">Cada mes sabés exactamente cómo van tus campañas</h2>
            <p className="lead mt-5">
              Nada de cifras raras ni tableros confusos: te enviamos un informe claro, en palabras
              simples, con lo que pasó en el mes y lo que vamos a hacer el próximo.
            </p>
            <a href={whatsapp("Hola! Me gustaría ver un ejemplo de reporte mensual.")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
              Quiero ver un ejemplo <ArrowRight size={18} />
            </a>
          </div>
          <div className="ui-card bg-cream p-7 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-subtle">Informe mensual</p>
                <p className="font-display text-lg font-bold text-ink">Resumen del mes</p>
              </div>
              <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand-strong">Enviado</span>
            </div>
            <ul className="mt-6 space-y-3">
              {REPORT_ITEMS.map((item) => (
                <li key={item.label} className="flex items-center gap-3 rounded-xl bg-paper px-4 py-3 text-sm">
                  <span className="text-brand">{item.icon}</span>
                  {item.label}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 border-t border-line pt-5 text-sm">
              <CheckCircle2 size={18} className="shrink-0 text-brand" /> Incluye reunión de revisión y propuesta del próximo mes
            </p>
          </div>
        </div>
      </section>

      {/* ── POR QUÉ ── */}
      <section className="section bg-cream">
        <div className="container-x">
          <h2 className="heading-lg text-center">Marketing digital sin vueltas</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((w) => (
              <div key={w.title} className="ui-card p-6">
                <div className="icon-chip">{w.icon}</div>
                <h3 className="mt-5 font-bold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section bg-paper">
        <div className="container-x max-w-3xl">
          <h2 className="heading-lg text-center">Preguntas frecuentes</h2>
          <p className="lead mt-3 text-center">Lo que conviene saber antes de arrancar.</p>
          <div className="mt-10 space-y-3">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section bg-cream pb-28">
        <div className="container-x">
          <div className="rounded-3xl bg-brand px-6 py-14 text-center text-white sm:px-12">
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">Primera consulta sin cargo</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
              ¿Hacemos que tu publicidad trabaje mejor?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Contanos de tu negocio y tus objetivos, y te proponemos por dónde empezar.
            </p>
            <a
              href={whatsapp("Hola! Quiero una consulta sobre campañas publicitarias para mi negocio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-8 bg-white text-brand-strong hover:bg-cream"
            >
              <Phone size={18} /> Hablar con nosotros
            </a>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/85">
              {["Sin contratos largos", "Reporte mensual incluido", "Acceso a tus métricas"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5"><CheckCircle2 size={16} /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PerformanceMarketing;
