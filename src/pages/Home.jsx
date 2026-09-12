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
} from 'lucide-react'
import SearchBar from '../components/SearchBar'
import CompanyCard from '../components/CompanyCard'
import SponsorsMarquee from '../components/SponsorsMarquee'
import { categories, allCompanies, stats } from '../data'

const categoryGroups = [
  { label: 'المعارض', slug: 'exhibitions', icon: Store, count: 312 },
  { label: 'المنتجات الغذائية', slug: 'food', icon: UtensilsCrossed, count: 2140 },
  { label: 'البلاستيك والفيبر جلاس', slug: 'plastic-fiberglass', icon: Layers, count: 876 },
  { label: 'المنتجات الخشبية والأثاث', slug: 'wood-furniture', icon: Armchair, count: 1284 },
  { label: 'المستلزمات الطبية', slug: 'medical-cosmetics', icon: Stethoscope, count: 540 },
  { label: 'المنتجات الزراعية', slug: 'agriculture', icon: Wheat, count: 920 },
  { label: 'المنتجات المعدنية', slug: 'metal-products', icon: Factory, count: 712 },
  { label: 'التشييد والبناء', slug: 'construction', icon: HardHat, count: 1642 },
  { label: 'الصناعات الكيماوية', slug: 'chemicals', icon: FlaskConical, count: 640 },
  { label: 'الصناعات النسيجية', slug: 'textile-uniforms', icon: Shirt, count: 1930 },
  { label: 'الشحن والتخليص الجمركي', slug: 'logistics', icon: Ship, count: 385 },
  { label: 'الطاقة المتجددة', slug: 'solar-energy', icon: Sun, count: 230 },
]

const featuredIds = [624, 12347, 3446, 3438, 1198, 11423, 8133, 362, 12366]

export default function Home() {
  const featured = featuredIds
    .map((id) => allCompanies.find((c) => c.id === id))
    .filter(Boolean)

  return (
    <div className="animate-fade-up">
      {/* ── الهيرو ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-mesh">
        <div className="absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-navy-100 text-xs font-bold text-teal-brand shadow-sm mb-7 animate-fade-up">
            <TrendingUp size={14} />
            منصة الشركات الأولى في مصر
          </span>

          <h1 className="font-cairo font-black text-navy-800 text-4xl md:text-6xl leading-[1.2] tracking-tight max-w-3xl mx-auto">
            اكتشف أفضل
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-teal-brand to-navy-600"> الشركات والمصانع </span>
            في مصر
          </h1>
          <p className="mt-5 text-slate-600 text-base md:text-lg font-medium max-w-xl mx-auto leading-8">
            دليل تجاري متكامل يضم آلاف الشركات والمصانع والمستوردين والمصدرين في كل القطاعات — تواصل مع الشركاء المناسبين خلال ثوانٍ.
          </p>

          <div className="mt-9 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '120ms' }}>
            <SearchBar size="lg" />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm animate-fade-up" style={{ animationDelay: '220ms' }}>
            {['أثاث منزلي', 'تمور وفواكه', 'مستلزمات طبية', 'مواسير بلاستيك', 'بولي بروبلين'].map((t) => (
              <Link
                key={t}
                to={`/companies?q=${encodeURIComponent(t)}`}
                className="px-3.5 py-1.5 rounded-full bg-white/80 border border-navy-100 text-slate-600 font-semibold hover:border-teal-brand hover:text-teal-brand transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* شريط إحصائيات */}
        <div className="relative border-t border-navy-100/70 bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-navy-100/70">
              {[
                { icon: Building2, value: stats.companies.toLocaleString('ar-EG'), label: 'شركة مسجلة' },
                { icon: Factory, value: stats.factories.toLocaleString('ar-EG'), label: 'مصنع ومصنع' },
                { icon: Store, value: stats.sectors, label: 'قطاع اقتصادي' },
                { icon: BadgeCheck, value: stats.cities, label: 'مدينة صناعية' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1.5 py-6">
                  <s.icon size={20} className="text-teal-brand" />
                  <p className="font-black text-navy-800 text-xl md:text-2xl">{s.value}</p>
                  <p className="text-xs font-semibold text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── شبكة القطاعات ───────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
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
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-teal-brand to-navy-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-navy-50 text-navy-700 group-hover:bg-gradient-to-br group-hover:from-teal-brand group-hover:to-navy-600 group-hover:text-white transition-all duration-300">
                <cat.icon size={22} />
              </span>
              <h3 className="mt-4 font-bold text-navy-800 leading-snug">{cat.label}</h3>
              <p className="mt-1 text-xs font-semibold text-slate-400">
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

      {/* ── الشركات المميزة ─────────────────────────────────── */}
      <section className="bg-white border-y border-navy-100/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-brand bg-teal-brand/10 rounded-full px-3 py-1 mb-3">
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

      {/* ── الرعاة ──────────────────────────────────────────── */}
      <div className="py-12">
        <SponsorsMarquee />
      </div>
    </div>
  )
}