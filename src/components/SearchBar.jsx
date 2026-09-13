import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'
import { sectors, cities } from '../data'

export default function SearchBar({
  placeholder = 'ابحث عن شركة، مصنع، أو منتج...',
  className = '',
}) {
  const [q, setQ] = useState('')
  const [sector, setSector] = useState('')
  const [city, setCity] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const sp = new URLSearchParams()
    if (q.trim()) sp.set('q', q.trim())
    if (sector) sp.set('category', sector)
    if (city) sp.set('city', city)
    navigate(sp.toString() ? `/companies?${sp.toString()}` : '/companies')
  }

  const divider = <span className="hidden lg:block w-px self-stretch my-2 bg-navy-100" aria-hidden="true" />

  const selectCls =
    'w-full appearance-none bg-transparent outline-none cursor-pointer font-semibold text-sm text-slate-700 ps-3 pe-8 py-4'

  return (
    <form
      onSubmit={submit}
      className={`relative bg-white/85 backdrop-blur-lg ring-1 ring-navy-100 shadow-card-hover rounded-2xl lg:rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-teal-brand ${className}`}
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center">
        {/* حقل النص */}
        <div className="flex flex-1 items-center gap-3 px-4 lg:px-5">
          <Search className="shrink-0 text-teal-brand" size={20} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-4 outline-none text-slate-ink font-medium text-sm lg:text-base placeholder:text-slate-400"
          />
        </div>

        {divider}

        {/* القطاع */}
        <div className="relative flex items-center border-t border-navy-100 lg:border-t-0 shrink-0 lg:w-48">
          <select value={sector} onChange={(e) => setSector(e.target.value)} aria-label="القطاع" className={selectCls}>
            <option value="">كل القطاعات</option>
            {sectors.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute end-3 text-slate-400" />
        </div>

        {divider}

        {/* المحافظة */}
        <div className="relative flex items-center border-t border-navy-100 lg:border-t-0 shrink-0 lg:w-44">
          <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="المحافظة" className={selectCls}>
            <option value="">كل المحافظات</option>
            {cities.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute end-3 text-slate-400" />
        </div>

        {/* زر البحث */}
        <button
          type="submit"
          className="shrink-0 grid place-items-center gap-2 bg-gradient-to-l from-teal-brand to-teal-brand-dark hover:from-teal-brand-dark hover:to-teal-brand text-white font-black transition-colors py-4 px-7 lg:m-1.5 lg:rounded-full lg:ps-6"
        >
          <span className="hidden lg:inline text-sm">بحث</span>
          <Search size={20} className="lg:hidden" />
        </button>
      </div>
    </form>
  )
}