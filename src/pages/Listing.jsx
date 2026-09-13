import { useEffect, useMemo, useRef, useState } from 'react'
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
  Check,
  ArrowDownUp,
  Home,
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

const sortOptions = [
  { value: 'featured', label: 'الأكثر تميزاً' },
  { value: 'verified', label: 'الموثّق أولاً' },
  { value: 'name', label: 'الترتيب الأبجدي' },
]

/* تصنيف النشاط من بيانات الشركة */
const typeOf = (c) => {
  const t = `${c.name} ${c.desc}`
  if (/(مصنع|تصنيع|إنتاج)/.test(t)) return 'factory'
  if (/(تصدير)/.test(t)) return 'export'
  if (/(استيراد|توزيع|تخليص|شحن|توريد)/.test(t)) return 'import'
  return 'company'
}

const tokenize = (s) =>
  s
    .split(/\s+/)
    .map((w) => w.replace(/^و/, ''))
    .filter(Boolean)

/* ── مكوّنات الفلاتر ─────────────────────────────────────────── */
function Radio({ checked, onChange, label, name }) {
  return (
    <label className="group flex items-center gap-2.5 cursor-pointer text-sm text-slate-600 hover:text-navy-800">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span className="grid place-items-center w-5 h-5 rounded-full border-2 border-navy-200 bg-white transition-colors group-has-[:checked]:border-teal-brand">
        <span className="w-2 h-2 rounded-full bg-gradient-to-br from-teal-brand to-navy-600 opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
      </span>
      <span className="flex-1">{label}</span>
    </label>
  )
}

function Checkbox({ checked, onChange, label, count }) {
  return (
    <label className="group flex items-center gap-2.5 cursor-pointer text-sm text-slate-600 hover:text-navy-800">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="grid place-items-center w-5 h-5 rounded-md border-2 border-navy-200 bg-white text-white transition-all duration-200 group-has-[:checked]:bg-gradient-to-br group-has-[:checked]:from-teal-brand group-has-[:checked]:to-navy-600 group-has-[:checked]:border-transparent group-has-[:checked]:shadow-sm">
        <Check size={12} strokeWidth={3.5} />
      </span>
      <span className="flex-1">{label}</span>
      {typeof count === 'number' && count > 0 && (
        <span className="text-[10px] font-bold text-slate-400">{count.toLocaleString('ar-EG')}</span>
      )}
    </label>
  )
}

function Collapsible({ title, icon: Icon, defaultOpen = false, badge, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-navy-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3.5 text-sm font-bold text-navy-800 hover:text-teal-brand transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-navy-50 text-navy-600 shrink-0">
            <Icon size={14} />
          </span>
          {title}
          {badge ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black text-teal-brand bg-teal-brand/10">{badge}</span>
          ) : null}
        </span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

function SortMenu({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])
  const current = sortOptions.find((o) => o.value === value) || sortOptions[0]
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 h-11 rounded-full border border-navy-200 bg-white px-4 pe-4 text-sm font-bold text-navy-700 hover:border-teal-brand transition-colors"
      >
        <ArrowDownUp size={15} className="text-teal-brand" />
        <span className="hidden sm:inline text-slate-400 font-semibold">الترتيب:</span>
        {current.label}
        <ChevronDown size={15} className={`text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute end-0 mt-2 w-52 rounded-xl bg-white border border-navy-100 shadow-card-hover overflow-hidden z-30 animate-pop">
          {sortOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
              className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-bold transition-colors ${
                o.value === value ? 'text-teal-brand bg-teal-brand/5' : 'text-slate-600 hover:bg-navy-50'
              }`}
            >
              {o.label}
              {o.value === value && <Check size={15} strokeWidth={3} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── صفحة الدليل ─────────────────────────────────────────────── */
export default function Listing() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') || ''
  const q = params.get('q') || ''
  const type = params.get('type') || 'all'

  const [search, setSearch] = useState(q)
  const initCity = params.get('city') || ''
  const [selectedCities, setSelectedCities] = useState(initCity ? [initCity] : [])
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

  const setType = (value) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete('type')
    else next.set('type', value)
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
    const qTokens = q ? tokenize(q) : []
    const sTokens = search ? tokenize(search) : []
    const matchSet = (hay, tokens) => {
      let matched = 0
      for (const t of tokens) if (hay.includes(t)) matched += 1
      return matched
    }
    let list = allCompanies
      .map((c) => {
        if (activeCategory && c.sectorId !== sectorBySlug[activeCategory]) return null
        if (type !== 'all' && typeOf(c) !== type) return null
        if (selectedCities.length && !selectedCities.includes(c.city)) return null
        if (onlyVerified && !c.verified) return null
        if (minRating && (c.rating || 0) < minRating) return null
        const hay = `${c.name} ${c.sector} ${c.desc} ${c.city}`
        let score = 0
        if (q) {
          const m = matchSet(hay, qTokens)
          if (!m) return null
          score += m
        }
        if (search) {
          const m = matchSet(hay, sTokens)
          if (!m) return null
          score += m
        }
        return { c, score }
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        if (sort === 'name') return a.c.name.localeCompare(b.c.name, 'ar')
        return Number(b.c.verified) - Number(a.c.verified) || (b.c.rating || 0) - (a.c.rating || 0)
      })
    return list.map((x) => x.c)
  }, [activeCategory, q, search, type, selectedCities, onlyVerified, minRating, sort])

  const activeSector = sectors.find((s) => s.slug === activeCategory)
  const typeLabel = typeOptions.find((t) => t.value === type)

  const clearQ = () => {
    const next = new URLSearchParams(params)
    next.delete('q')
    setParams(next, { replace: true })
    setSearch('')
  }

  const activeChips = []
  if (activeSector) activeChips.push({ label: `القطاع: ${activeSector.name}`, clear: () => setCategory('') })
  if (type !== 'all') activeChips.push({ label: typeLabel?.label || 'نوع النشاط', clear: () => setType('all') })
  if (q && q !== search) activeChips.push({ label: `بحث: ${q}`, clear: clearQ })
  if (search) activeChips.push({ label: `بحث: ${search}`, clear: () => setSearch('') })
  selectedCities.forEach((city) =>
    activeChips.push({ label: city, clear: () => setSelectedCities((p) => p.filter((x) => x !== city)) })
  )
  if (onlyVerified) activeChips.push({ label: 'موثّق فقط', clear: () => setOnlyVerified(false) })
  if (minRating) activeChips.push({ label: `تقييم ${minRating}+`, clear: () => setMinRating(0) })

  const filtersPanel = (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-black text-navy-800 text-base flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-teal-brand" />
          خيارات البحث
        </h3>
        <button
          onClick={() => setMobileFilters(false)}
          className="lg:hidden flex items-center gap-1.5 text-sm font-bold text-teal-brand"
        >
          <X size={16} />
          إغلاق
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
        <div className="pb-4 pt-1 space-y-2">
          {typeOptions.map((t) => (
            <Radio
              key={t.value}
              name="type"
              checked={type === t.value}
              onChange={() => setType(t.value)}
              label={t.label}
            />
          ))}
        </div>
      </Collapsible>

      <Collapsible title="القطاعات" icon={SlidersHorizontal}>
        <div className="pb-4 pt-1 max-h-64 overflow-y-auto pe-1 space-y-2">
          <Radio name="sector" checked={!activeCategory} onChange={() => setCategory('')} label="كل القطاعات" />
          {sectors.map((s) => (
            <Radio key={s.id} name="sector" checked={activeCategory === s.slug} onChange={() => setCategory(s.slug)} label={s.name} />
          ))}
        </div>
      </Collapsible>

      <Collapsible title="المدن" icon={MapPin} badge={selectedCities.length || undefined}>
        <div className="pb-4 pt-1 space-y-2">
          {cities.map((c) => (
            <Checkbox
              key={c.id}
              checked={selectedCities.includes(c.name)}
              onChange={() =>
                setSelectedCities((prev) =>
                  prev.includes(c.name) ? prev.filter((x) => x !== c.name) : [...prev, c.name]
                )
              }
              label={c.name}
            />
          ))}
        </div>
      </Collapsible>

      <Collapsible title="حالة التوثيق والتقييم" icon={BadgeCheck}>
        <div className="pb-4 pt-1 space-y-3">
          <Checkbox
            checked={onlyVerified}
            onChange={(e) => setOnlyVerified(e.target.checked)}
            label="الشركات الموثّقة فقط"
          />
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-up">
      {/* رأس متدرج */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-navy-900 via-navy-700 to-teal-brand-dark px-6 md:px-8 py-9 md:py-11 mb-8 text-white">
        <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
        <div className="absolute -top-12 -end-12 w-52 h-52 rounded-full bg-teal-brand/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-14 -start-10 w-56 h-56 rounded-full bg-amber-brand/20 blur-3xl" aria-hidden="true" />
        <div className="relative flex items-start justify-between gap-6">
          <div className="min-w-0">
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-4">
              <Link to="/" className="inline-flex items-center gap-1 hover:text-white transition-colors">
                <Home size={13} />
                الرئيسية
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-teal-brand-light">دليل الشركات والمصانع</span>
            </nav>
            <h1 className="font-cairo font-black text-white text-3xl md:text-4xl leading-tight">
              {activeSector?.name || 'دليل الشركات والمصانع'}
            </h1>
            {activeSector ? (
              <p className="mt-2.5 text-sm font-bold text-teal-brand-light">
                شركات ومصانع «{activeSector.name}» في مصر
              </p>
            ) : (
              <p className="mt-2.5 text-sm font-semibold text-slate-300">
                تصفح الشركات والمصانع والمستوردين والمصدرين في كل القطاعات
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-bold">
                <Building2 size={13} className="text-teal-brand-light" />
                {results.length.toLocaleString('ar-EG')} نتيجة
              </span>
              {type !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-bold">
                  {typeLabel?.label}
                </span>
              )}
              {q && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-bold">
                  بحث «{q}»
                </span>
              )}
            </div>
          </div>
          {/* ختم موثّق */}
          <div className="hidden sm:flex flex-col items-center gap-2 shrink-0">
            <span className="grid place-items-center w-16 h-16 rounded-full border-2 border-dashed border-white/40 text-white">
              <BadgeCheck size={26} />
            </span>
            <span className="text-[10px] font-black text-teal-brand-light">قائمة موثّقة</span>
          </div>
        </div>
      </div>

      {/* الأدوات */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm font-bold text-slate-500">
          {activeSector ? `شركات قطاع ${activeSector.name}` : 'جميع الشركات'}
          {type !== 'all' && ` — ${typeLabel?.label}`}
        </p>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileFilters(true)}
            className="lg:hidden inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold text-navy-700 border border-navy-200 bg-white"
          >
            <SlidersHorizontal size={16} />
            الفلاتر
            {activeChips.length > 0 && (
              <span className="grid place-items-center w-5 h-5 rounded-full text-[10px] font-black text-white bg-teal-brand">
                {activeChips.length.toLocaleString('ar-EG')}
              </span>
            )}
          </button>
          <SortMenu value={sort} onChange={setSort} />
        </div>
      </div>

      {/* فلاتر نشطة */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {activeChips.map((chip) => (
            <button
              key={chip.label}
              onClick={chip.clear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-navy-700 text-white hover:bg-navy-800 transition-colors"
            >
              {chip.label}
              <X size={12} />
            </button>
          ))}
          <button onClick={clearAll} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
            مسح الكل
          </button>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
        {/* الفلاتر - الجانب */}
        <aside className="hidden lg:block lg:sticky lg:top-24 bg-white/80 backdrop-blur-sm rounded-card border border-navy-100/70 shadow-card p-5">
          {filtersPanel}
        </aside>

        {/* شريحة فلاتر الجوال */}
        {mobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
            <aside className="absolute inset-y-0 start-0 w-[85%] max-w-sm bg-white p-5 overflow-y-auto shadow-2xl animate-pop">
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
            <div className="bg-white rounded-card border-2 border-dashed border-navy-100 shadow-card p-14 text-center">
              <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-brand/15 to-amber-brand/15 text-navy-500 mb-4">
                <Search size={26} />
              </span>
              <h3 className="font-black text-navy-800 text-lg">لا توجد نتائج مطابقة</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                جرّب تعديل كلمة البحث أو إزالة بعض الفلاتر للعثور على شركات أخرى.
              </p>
              <button
                onClick={clearAll}
                className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-l from-teal-brand to-navy-700 hover:shadow-card-hover transition-shadow"
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
                  className={`grid place-items-center w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                    p === 1
                      ? 'bg-gradient-to-br from-teal-brand to-navy-700 text-white shadow-card'
                      : 'bg-white border border-navy-200 text-navy-700 hover:border-teal-brand'
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