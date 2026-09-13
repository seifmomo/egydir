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
import { categories, allCompanies, stats } from '../data'

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

        {/* المحتوى المركزي */}
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pt-24 md:pb-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-bold text-navy-700 shadow-sm mb-7 animate-fade-up">
            <TrendingUp size={14} className="text-teal-brand" />
            منصة الشركات الأولى في مصر
            <Sparkles size={14} className="text-amber-brand" />
          </span>

          <h1 className="font-cairo font-black text-navy-900 text-4xl md:text-[4.2rem] leading-[1.15] tracking-tight">
            اكتشف أفضل
            <span className="text-brand-gradient block sm:inline"> الشركات والمصانع </span>
            في مصر
          </h1>

          <p className="mt-6 text-slate-600 text-base md:text-lg font-medium max-w-2xl mx-auto leading-8">
            دليل تجاري متكامل يضم آلاف الشركات والمصانع والمستوردين والمصدرين في كل القطاعات —
            تواصل مع الشركاء المناسبين خلال ثوانٍ.
          </p>

          <div className="mt-9 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '120ms' }}>
            <SearchBar size="lg" />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm animate-fade-up" style={{ animationDelay: '220ms' }}>
            {['أثاث منزلي', 'تمور وفواكه', 'مستلزمات طبية', 'مواسير بلاستيك', 'بولي بروبلين'].map((t) => (
              <Link
                key={t}
                to={`/companies?q=${encodeURIComponent(t)}`}
                className="px-3.5 py-1.5 rounded-full glass text-slate-600 font-semibold hover:border-teal-brand hover:text-teal-brand transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Link
              to="/companies"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-l from-teal-brand via-navy-600 to-navy-800 shadow-glow hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              <Building2 size={16} />
              تصفح دليل الشركات
            </Link>
            <Link
              to="/companies"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-navy-900 bg-gradient-to-l from-amber-400 to-orange-500 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              <Sparkles size={16} />
              أضف شركتك مجاناً
            </Link>
          </div>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 animate-fade-up" style={{ animationDelay: '340ms' }}>
            <ShieldCheck size={14} className="text-teal-brand" />
            أكثر من {stats.companies.toLocaleString('ar-EG')} شركة مسجلة — التسجيل مجاني لأصحاب الأعمال
          </p>

          {/* الإحصائيات */}
          <div ref={statsRef} className="mt-10 animate-fade-up" style={{ animationDelay: '380ms' }}>
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
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
                {cat.count.toLocaleString('ar-EG')} شركة
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

      {/* ════════════════ CTA أخير ════════════════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-l from-navy-900 via-navy-700 to-teal-brand-dark px-6 py-14 md:py-16 text-center text-white">
          <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
          <div className="absolute -top-16 -end-16 w-64 h-64 rounded-full bg-amber-brand/25 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-20 -start-16 w-72 h-72 rounded-full bg-teal-brand-light/20 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/15 rounded-full px-4 py-1.5 mb-5">
              <Building2 size={13} />
              لأصحاب الشركات والمصانع
            </span>
            <h2 className="font-cairo font-black text-2xl md:text-4xl leading-snug max-w-2xl mx-auto">
              هل تمتلك شركة أو مصنعاً؟ اجعل عملاء جدد يجدونك اليوم
            </h2>
            <p className="text-slate-300 mt-4 max-w-xl mx-auto leading-7">
              سجّل شركتك مجاناً في إيجي داير وابدأ في استقبال استفسارات من آلاف العملاء والموردين.
            </p>
            <Link
              to="/companies"
              className="mt-7 inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-black text-navy-900 bg-gradient-to-l from-amber-400 to-orange-500 shadow-lg hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              <Sparkles size={17} />
              سجّل شركتك الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}