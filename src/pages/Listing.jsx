import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
  Building2,
  BadgeCheck,
  Star,
  MapPin,
  RotateCcw,
} from 'lucide-react'
import CompanyCard from '../components/CompanyCard'
import { sectors, cities, allCompanies } from '../data'

const typeOptions = [
  { value: 'all', label: 'كل الأنواع' },
  { value: 'company', label: 'شركات' },
  { value: 'factory', label: 'مصانع' },
  { value: 'import', label: 'مستوردون' },
  { value: 'export', label: 'مصدرون' },
]

function Collapsible({ title, icon: Icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-navy-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3.5 text-sm font-bold text-navy-800 hover:text-teal-brand transition-colors"
      >
        <span className="flex items-center gap-2">
          <Icon size={16} className="text-slate-400" />
          {title}
        </span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-4 animate-fade-up">{children}</div>}
    </div>
  )
}

export default function Listing() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') || ''
  const q = params.get('q') || ''
  const type = params.get('type') || 'all'

  const [search, setSearch] = useState(q)
  const [selectedCities, setSelectedCities] = useState([])
  const [onlyVerified, setOnlyVerified] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState('featured')
  const [mobileFilters, setMobileFilters] = useState(false)

  const setCategory = (slug) => {
    const next = new URLSearchParams(params)
    if (slug) next.set('category', slug)
    else next.delete('category')
    setParams(next, { replace: true })
  }

  const clearAll = () => {
    setSelectedCities([])
    setOnlyVerified(false)
    setMinRating(0)
    setSearch('')
    setParams(new URLSearchParams(), { replace: true })
  }

  const results = useMemo(() => {
    const sectorBySlug = Object.fromEntries(sectors.map((s) => [s.slug, s.id]))
    let list = allCompanies.filter((c) => {
      if (activeCategory && c.sectorId !== sectorBySlug[activeCategory]) return false
      const hay = `${c.name} ${c.sector} ${c.desc} ${c.city}`
      if (q && !hay.includes(q)) return false
      if (search && !hay.includes(search)) return false
      if (selectedCities.length && !selectedCities.includes(c.city)) return false
      if (onlyVerified && !c.verified) return false
      if (minRating && (c.rating || 0) < minRating) return false
      return true
    })

    switch (sort) {
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'ar'))
        break
      case 'verified':
        list = [...list].sort((a, b) => Number(b.verified) - Number(a.verified))
        break
      default:
        list = [...list].sort((a, b) => Number(b.verified) - Number(a.verified) || (b.rating || 0) - (a.rating || 0))
    }
    return list
  }, [activeCategory, q, search, selectedCities, onlyVerified, minRating, sort])

  const activeSector = sectors.find((s) => s.slug === activeCategory)

  const filtersPanel = (
    <div>
      <div className="mb-4">
        <h3 className="font-black text-navy-800 text-base mb-3">خيارات البحث</h3>
        <button
          onClick={() => setMobileFilters(false)}
          className="lg:hidden flex items-center gap-1.5 text-sm font-bold text-teal-brand mb-3"
        >
          <X size={16} />
          إغلاق الفلاتر
        </button>
      </div>

      {/* بحث نصي */}
      <div className="relative mb-1">
        <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث داخل النتائج..."
          className="w-full h-11 rounded-lg bg-surface border border-navy-100 focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/20 outline-none pe-3 ps-9 text-sm placeholder:text-slate-400"
        />
      </div>

      <Collapsible title="نوع النشاط" icon={Building2} defaultOpen>
        <div className="space-y-1.5">
          {typeOptions.map((t) => (
            <label key={t.value} className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-600 hover:text-navy-800">
              <input
                type="radio"
                name="type"
                checked={type === t.value}
                onChange={() => {
                  const next = new URLSearchParams(params)
                  if (t.value === 'all') next.delete('type')
                  else next.set('type', t.value)
                  setParams(next, { replace: true })
                }}
                className="accent-teal-brand"
              />
              {t.label}
            </label>
          ))}
        </div>
      </Collapsible>

      <Collapsible title="القطاعات" icon={SlidersHorizontal}>
        <div className="max-h-64 overflow-y-auto pe-1 space-y-1.5">
          <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-600 hover:text-navy-800">
            <input
              type="radio"
              name="sector"
              checked={!activeCategory}
              onChange={() => setCategory('')}
              className="accent-teal-brand"
            />
            كل القطاعات
          </label>
          {sectors.map((s) => (
            <label key={s.id} className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-600 hover:text-navy-800">
              <input
                type="radio"
                name="sector"
                checked={activeCategory === s.slug}
                onChange={() => setCategory(s.slug)}
                className="accent-teal-brand"
              />
              <span className="truncate">{s.name}</span>
            </label>
          ))}
        </div>
      </Collapsible>

      <Collapsible title="المدن" icon={MapPin}>
        <div className="space-y-1.5">
          {cities.map((c) => (
            <label key={c.id} className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-600 hover:text-navy-800">
              <input
                type="checkbox"
                checked={selectedCities.includes(c.name)}
                onChange={() =>
                  setSelectedCities((prev) =>
                    prev.includes(c.name) ? prev.filter((x) => x !== c.name) : [...prev, c.name]
                  )
                }
                className="accent-teal-brand rounded"
              />
              {c.name}
            </label>
          ))}
        </div>
      </Collapsible>

      <Collapsible title="حالة التوثيق والتقييم" icon={BadgeCheck}>
        <div className="space-y-3">
          <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-600 hover:text-navy-800">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="accent-teal-brand rounded"
            />
            الشركات الموثّقة فقط
          </label>
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
              <Star size={13} className="text-amber-500" />
              الحد الأدنى للتقييم: {minRating || 'الكل'}
            </p>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full accent-teal-brand"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0</span>
              <span>2.5</span>
              <span>5</span>
            </div>
          </div>
        </div>
      </Collapsible>

      <button
        onClick={clearAll}
        className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold text-slate-500 border border-navy-100 hover:border-red-300 hover:text-red-500 transition-colors"
      >
        <RotateCcw size={15} />
        إعادة تعيين الفلاتر
      </button>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      {/* رأس الصفحة */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <nav className="text-xs text-slate-400 font-semibold mb-1.5">
            <Link to="/" className="hover:text-teal-brand">الرئيسية</Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-500">دليل الشركات</span>
          </nav>
          <h1 className="font-cairo font-black text-navy-800 text-2xl md:text-3xl">
            {activeSector?.name || 'دليل الشركات والمصانع'}
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            {results.length.toLocaleString('ar-EG')} نتيجة مطابقة {q && <>لبحث «{q}»</>}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilters(true)}
            className="lg:hidden inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold text-navy-700 border border-navy-200"
          >
            <SlidersHorizontal size={16} />
            الفلاتر
          </button>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none h-11 rounded-full border border-navy-200 bg-white px-4 pe-9 text-sm font-semibold text-navy-700 outline-none focus:border-teal-brand cursor-pointer"
            >
              <option value="featured">الأكثر تميزاً</option>
              <option value="verified">الموثّق أولاً</option>
              <option value="name">الترتيب الأبجدي</option>
            </select>
            <ChevronDown size={15} className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
        {/* الفلاتر - الجانب (يمين في RTL) */}
        <aside className="hidden lg:block lg:sticky lg:top-24 bg-white rounded-card border border-navy-100/70 shadow-card p-5">
          {filtersPanel}
        </aside>

        {/* شريحة فلاتر الجوال */}
        {mobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
            <aside className="absolute inset-y-0 start-0 w-[85%] max-w-sm bg-white p-5 overflow-y-auto shadow-2xl animate-fade-up">
              {filtersPanel}
            </aside>
          </div>
        )}

        {/* النتائج */}
        <div className="lg:col-span-3">
          {results.length ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((c, i) => (
                <CompanyCard key={c.id} company={c} index={i % 8} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-card border border-navy-100/70 shadow-card p-14 text-center">
              <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-navy-50 text-navy-300 mb-4">
                <Search size={26} />
              </span>
              <h3 className="font-black text-navy-800 text-lg">لا توجد نتائج مطابقة</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                جرّب تعديل كلمة البحث أو إزالة بعض الفلاتر للعثور على شركات أخرى.
              </p>
              <button
                onClick={clearAll}
                className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-navy-700 hover:bg-navy-800"
              >
                <RotateCcw size={15} />
                إعادة تعيين الفلاتر
              </button>
            </div>
          )}

          {/* ترقيم صفحات تجريبي */}
          {results.length > 12 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`grid place-items-center w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                    p === 1 ? 'bg-navy-700 text-white shadow-card' : 'bg-white border border-navy-200 text-navy-700 hover:border-teal-brand'
                  }`}
                >
                  {p.toLocaleString('ar-EG')}
                </button>
              ))}
              <button className="grid place-items-center w-10 h-10 rounded-lg bg-white border border-navy-200 text-navy-700 hover:border-teal-brand">
                <ChevronDown size={16} className="rotate-90" />
              </button>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link to="/" className="text-sm font-bold text-teal-brand hover:text-teal-brand-dark">
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}