import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Store,
  UtensilsCrossed,
  Layers,
  Armchair,
  Stethoscope,
  Wheat,
  Factory,
  HardHat,
  FlaskConical,
  Shirt,
  Ship,
  Sun,
  ArrowLeft,
  TrendingUp,
  Building2,
  BadgeCheck,
  Sparkles,
  ShieldCheck,
  Zap,
  PhoneCall,
  RefreshCcw,
  Users,
} from 'lucide-react'
import SearchBar from '../components/SearchBar'
import CompanyCard from '../components/CompanyCard'
import SponsorsMarquee from '../components/SponsorsMarquee'
import { categories, sectors, allCompanies, stats } from '../data'

const sectorBySlug = Object.fromEntries(sectors.map((s) => [s.slug, s.id]))
const countFor = (slug) => allCompanies.filter((c) => c.sectorId === sectorBySlug[slug]).length

/* ── مجموعة القطاعات مع لون مميز لكل قطاع ─────────────────────── */
const categoryGroups = [
  { label: 'المعارض', slug: 'exhibitions', icon: Store, count: 312, grad: 'from-amber-400 to-orange-500' },
  { label: 'المنتجات الغذائية', slug: 'food', icon: UtensilsCrossed, count: 2140, grad: 'from-lime-400 to-green-600' },
  { label: 'البلاستيك والفيبر جلاس', slug: 'plastic-fiberglass', icon: Layers, count: 876, grad: 'from-cyan-400 to-blue-600' },
  { label: 'المنتجات الخشبية والأثاث', slug: 'wood-furniture', icon: Armchair, count: 1284, grad: 'from-amber-500 to-red-500' },
  { label: 'المستلزمات الطبية', slug: 'medical-cosmetics', icon: Stethoscope, count: 540, grad: 'from-sky-400 to-indigo-600' },
  { label: 'المنتجات الزراعية', slug: 'agriculture', icon: Wheat, count: 920, grad: 'from-green-400 to-emerald-700' },
  { label: 'المنتجات المعدنية', slug: 'metal-products', icon: Factory, count: 712, grad: 'from-slate-500 to-slate-800' },
  { label: 'التشييد والبناء', slug: 'construction', icon: HardHat, count: 1642, grad: 'from-orange-400 to-amber-600' },
  { label: 'الصناعات الكيماوية', slug: 'chemicals', icon: FlaskConical, count: 640, grad: 'from-fuchsia-400 to-purple-700' },
  { label: 'الصناعات النسيجية', slug: 'textile-uniforms', icon: Shirt, count: 1930, grad: 'from-pink-400 to-rose-600' },
  { label: 'الشحن والتخليص الجمركي', slug: 'logistics', icon: Ship, count: 385, grad: 'from-blue-400 to-cyan-700' },
  { label: 'الطاقة المتجددة', slug: 'solar-energy', icon: Sun, count: 230, grad: 'from-yellow-400 to-amber-600' },
]

const featuredIds = [624, 12347, 3446, 3438, 1198, 11423, 8133, 362, 12366]

const features = [
  { icon: ShieldCheck, title: 'شركات موثّقة', desc: 'نخبة مدقّقة من الكيانات التجارية الموثوقة في كل القطاعات.' },
  { icon: Zap, title: 'بحث فوري', desc: 'اعثر على المورد المناسب خلال ثوانٍ بالاسم أو القطاع أو المدينة.' },
  { icon: PhoneCall, title: 'تواصل مباشر', desc: 'هاتف، بريد إلكتروني، وموقع رسمي — كل بيانات التواصل أمامك.' },
  { icon: RefreshCcw, title: 'بيانات محدّثة', desc: 'ملفات محدثة باستمرار وأسعار واستفسارات بضغطة واحدة.' },
]

const statsData = [
  { icon: Building2, end: stats.companies, label: 'شركة مسجلة' },
  { icon: Factory, end: stats.factories, label: 'مصنع وتاجر' },
  { icon: Store, end: stats.sectors, label: 'قطاع اقتصادي' },
  { icon: Users, end: stats.cities, label: 'مدينة صناعية' },
]

/* ── عدّاد متحرك عند الظهور ────────────────────────────────────── */
function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          ob.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [ref])
  return inView
}

function CountUp({ end, started }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!started) return
    let raf
    const t0 = performance.now()
    const dur = 1400
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1)
      setV(Math.round(end * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, end])
  return <>{v.toLocaleString('ar-EG')}</>
}

/* ── اللوحة البصرية: خريطة مصر + شبكة الشركات ──────────────────── */
function EgyptNetwork() {
  const nodes = [
    { x: 101, y: 30, label: 'القاهرة' },
    { x: 83, y: 14, label: 'الإسكندرية' },
    { x: 116, y: 13, label: 'بورسعيد' },
    { x: 121, y: 31, label: 'السويس' },
    { x: 121, y: 91, label: 'الأقصر' },
    { x: 125, y: 114, label: 'أسوان' },
    { x: 45, y: 12, label: 'مرسى مطروح' },
  ]
  const links = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ]
  return (
    <div className="relative animate-float-slow">
      <div className="absolute -inset-4 bg-gradient-to-br from-teal-brand/20 via-navy-600/5 to-amber-brand/15 blur-2xl rounded-[2.5rem]" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-teal-brand-dark/90 shadow-card-hover">
        <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
        <svg viewBox="0 0 170 160" className="relative w-full h-auto" role="img" aria-label="خريطة مصر مع شبكة الشركات">
          <defs>
            <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          {/* حدود مصر */}
          <polygon
            points="77,11.2 84,9.8 98,8.4 105,12.6 117,14 133,16.8 140,23.8 148,42 154,58.8 157,94 158,114.8 154,142.8 98,142.8 56,142.8 14,142.8 14,114.8 14,44.8 14,30.8 28,16.8 56,14 70,12.6"
            fill="rgba(56,189,248,0.06)"
            stroke="rgba(125,211,252,0.35)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* وصلات الشبكة */}
          {links.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="url(#linkGrad)"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.7"
            />
          ))}
          {/* عقد الشركات */}
          {nodes.map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r="6" fill="#0f172a" opacity="0.35" />
              <circle cx={n.x} cy={n.y} r="3.4" fill="#2dd4bf" />
              <text x={n.x + 8} y={n.y + 3} className="fill-white/90 text-[8px] font-bold">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
        {/* شرائح معلقة */}
        <span className="absolute top-5 end-5 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full glass text-[11px] font-bold text-white">
          <Layers size={13} className="text-teal-brand-light" />
          {stats.sectors.toLocaleString('ar-EG')} قطاعاً صناعياً
        </span>
        <span className="absolute bottom-5 start-5 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full glass text-[11px] font-bold text-white animate-float-slower">
          <Building2 size={13} className="text-amber-brand" />
          {stats.companies.toLocaleString('ar-EG')} شركة مسجلة
        </span>
      </div>
    </div>
  )
}

export default function Home() {
  const featured = featuredIds
    .map((id) => allCompanies.find((c) => c.id === id))
    .filter(Boolean)

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef)

  return (
    <div className="animate-fade-up">
      {/* ════════════════ الهيرو ════════════════ */}
      <section className="relative overflow-hidden bg-hero-mesh">
        {/* توهجات ملونة */}
        <div className="absolute -top-28 -end-28 w-[26rem] h-[26rem] rounded-full bg-teal-brand/20 blur-3xl animate-blob" aria-hidden="true" />
        <div
          className="absolute top-1/3 -start-24 w-80 h-80 rounded-full bg-amber-brand/25 blur-3xl animate-blob"
          style={{ animationDelay: '5s' }}
          aria-hidden="true"
        />
        <div className="absolute -bottom-32 start-1/3 w-96 h-96 rounded-full bg-navy-500/20 blur-3xl" aria-hidden="true" />

        {/* شبكة خفيفة */}
        <div className="absolute inset-0 bg-grid-slate mask-fade-b opacity-70" aria-hidden="true" />

        {/* المحتوى: أعمدة غير متساوية — النص يمين واللوحة البصرية يسار */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pt-24 md:pb-20">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
            <div className="text-center lg:text-start">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-bold text-navy-700 shadow-sm mb-7 animate-fade-up">
                <TrendingUp size={14} className="text-teal-brand" />
                منصة الشركات الأولى في مصر
                <Sparkles size={14} className="text-amber-brand" />
              </span>

              <h1 className="font-cairo font-black text-navy-900 text-4xl sm:text-5xl xl:text-[3.6rem] leading-[1.2] animate-fade-up" style={{ animationDelay: '60ms' }}>
                اكتشف أفضل
                <span className="text-brand-gradient block sm:inline"> الشركات والمصانع </span>
                في مصر
              </h1>

              <p className="mt-6 text-slate-600 text-base md:text-lg font-medium max-w-2xl mx-auto lg:mx-0 leading-8 animate-fade-up" style={{ animationDelay: '120ms' }}>
                دليل تجاري متكامل يضم آلاف الشركات والمصانع والمستوردين والمصدرين في كل القطاعات —
                تواصل مع الشركاء المناسبين خلال ثوانٍ.
              </p>

              <div className="mt-9 max-w-2xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '180ms' }}>
                <SearchBar size="lg" />
              </div>

              {/* أزرار الإجراء الأساسية أسفل البحث */}
              <div className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3 animate-fade-up" style={{ animationDelay: '260ms' }}>
                <Link
                  to="/companies"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-l from-teal-brand via-navy-600 to-navy-800 shadow-glow hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
                >
                  <Building2 size={16} />
                  تصفح دليل الشركات
                </Link>
                <a
                  href="#sections"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-navy-800 bg-white border border-navy-200 shadow-card hover:border-teal-brand hover:text-teal-brand hover:-translate-y-0.5 transition-all"
                >
                  استكشف القطاعات
                  <ArrowLeft size={16} />
                </a>
              </div>

              {/* أزرار البحث السريع كنقاط تفاعلية */}
              <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2 animate-fade-up" style={{ animationDelay: '340ms' }}>
                {['أثاث منزلي', 'تمور وفواكه', 'مستلزمات طبية', 'مواسير بلاستيك', 'بولي بروبلين'].map((t) => (
                  <Link
                    key={t}
                    to={`/companies?q=${encodeURIComponent(t)}`}
                    className="px-4 py-2 rounded-full bg-white/80 ring-1 ring-navy-100 text-slate-600 font-bold text-xs hover:ring-teal-brand hover:text-teal-brand hover:-translate-y-0.5 shadow-sm transition-all"
                  >
                    {t}
                  </Link>
                ))}
              </div>

              <p className="mt-6 flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold text-slate-500 animate-fade-up" style={{ animationDelay: '400ms' }}>
                <ShieldCheck size={14} className="text-teal-brand" />
                أكثر من {stats.companies.toLocaleString('ar-EG')} شركة مسجلة في الدليل
              </p>
            </div>

            {/* اللوحة البصرية — لجانب النهاية في الواجهة */}
            <div className="hidden lg:block animate-fade-up" style={{ animationDelay: '220ms' }}>
              <EgyptNetwork />
            </div>
          </div>

          {/* الإحصائيات */}
          <div ref={statsRef} className="mt-14 animate-fade-up" style={{ animationDelay: '380ms' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {statsData.map((s) => (
                <div key={s.label} className="glass-strong rounded-2xl shadow-card px-4 py-5 flex flex-col items-center gap-1.5">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-teal-brand to-navy-600 text-white shadow-sm">
                    <s.icon size={16} />
                  </span>
                  <p className="font-black text-navy-800 text-xl md:text-2xl">
                    {statsInView ? <CountUp end={s.end} started /> : '0'}
                  </p>
                  <p className="text-[11px] font-bold text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ القطاعات ════════════════ */}
      <section id="sections" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-brand/10 rounded-full px-3 py-1 mb-3">
              <Sparkles size={13} />
              استكشف الأنشطة
            </span>
            <h2 className="font-cairo font-black text-navy-800 text-2xl md:text-3xl">تصفح حسب القطاع</h2>
            <p className="text-slate-500 font-medium mt-2">{categories.length} قطاعاً صناعياً وتجارياً يغطي كل الأنشطة</p>
          </div>
          <Link to="/companies" className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-teal-brand hover:text-teal-brand-dark">
            كل القطاعات
            <ArrowLeft size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryGroups.map((cat, i) => (
            <Link
              key={cat.slug}
              to={`/companies?category=${cat.slug}`}
              className="group relative bg-white rounded-card border border-navy-100/70 shadow-card hover:shadow-card-hover hover:-translate-y-1 p-6 transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-amber-400 via-teal-brand to-navy-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute -top-6 -end-6 w-20 h-20 rounded-full bg-navy-50/80 blur-xl transition-colors group-hover:bg-teal-brand/10" aria-hidden="true" />
              <span
                className={`relative grid place-items-center w-12 h-12 rounded-xl text-white shadow-md bg-gradient-to-br ${cat.grad} group-hover:scale-110 transition-transform`}
              >
                <cat.icon size={22} />
              </span>
              <h3 className="mt-4 font-bold text-navy-800 leading-snug relative">{cat.label}</h3>
              <p className="mt-1 text-xs font-bold text-slate-400 relative">
                {countFor(cat.slug).toLocaleString('ar-EG')} شركة
              </p>
            </Link>
          ))}
        </div>

        <Link to="/companies" className="mt-6 md:hidden inline-flex items-center gap-1.5 text-sm font-bold text-teal-brand">
          كل القطاعات
          <ArrowLeft size={16} />
        </Link>
      </section>

      {/* ════════════════ لماذا إيجي داير ════════════════ */}
      <section className="border-y border-navy-100/70 bg-gradient-to-b from-white to-navy-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-brand bg-teal-brand/10 rounded-full px-3 py-1 mb-3">
              <ShieldCheck size={13} />
              لماذا إيجي داير؟
            </span>
            <h2 className="font-cairo font-black text-navy-800 text-2xl md:text-3xl">كل ما يحتاجه النشاط التجاري في مكان واحد</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="group bg-white rounded-card border border-navy-100/70 shadow-card hover:shadow-card-hover hover:-translate-y-1 p-6 transition-all duration-300">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-brand to-navy-600 text-white shadow-md group-hover:shadow-glow transition-shadow">
                  <f.icon size={21} />
                </span>
                <h3 className="mt-4 font-bold text-navy-800">{f.title}</h3>
                <p className="mt-1.5 text-sm text-slate-500 leading-6">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ الشركات المميزة ════════════════ */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-brand/10 rounded-full px-3 py-1 mb-3">
                <BadgeCheck size={14} />
                شركات موثّقة
              </span>
              <h2 className="font-cairo font-black text-navy-800 text-2xl md:text-3xl">الشركات المميزة</h2>
              <p className="text-slate-500 font-medium mt-2">نخبة مختارة من كبرى الشركات في مختلف القطاعات</p>
            </div>
            <Link to="/companies" className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold text-navy-700 border border-navy-200 hover:border-teal-brand hover:text-teal-brand transition-colors">
              عرض الكل
              <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map((c, i) => (
              <CompanyCard key={c.id} company={c} index={i} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link to="/companies" className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-bold text-navy-700 border border-navy-200">
              عرض كل الشركات
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ الرعاة ════════════════ */}
      <div className="pb-12">
        <SponsorsMarquee />
      </div>
    </div>
  )
}