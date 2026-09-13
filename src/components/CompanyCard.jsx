import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, BadgeCheck, ChevronLeft, Phone } from 'lucide-react'
import { logoUrl } from '../data'

const gradients = [
  'from-orange-400 to-rose-500',
  'from-teal-400 to-cyan-600',
  'from-blue-500 to-indigo-600',
  'from-slate-500 to-navy-700',
  'from-fuchsia-500 to-purple-700',
  'from-emerald-400 to-green-600',
  'from-amber-400 to-orange-600',
  'from-cyan-400 to-blue-600',
  'from-sky-400 to-teal-600',
]

export function BrandLogo({ company, size = 'lg', className = '' }) {
  const [err, setErr] = useState(false)
  const s =
    size === 'xl' ? 'w-14 h-14' : size === 'sm' ? 'w-9 h-9' : 'w-12 h-12'
  const grad = gradients[company.id % gradients.length]
  const url = logoUrl(company.logo)
  const show = url && !err
  return (
    <span
      className={`grid place-items-center rounded-xl overflow-hidden bg-gradient-to-br ${grad} text-white font-black shrink-0 shadow-md ${s} ${className}`}
    >
      {show ? (
        <img src={url} alt={company.name} className="w-full h-full object-cover" loading="lazy" onError={() => setErr(true)} />
      ) : (
        <span className="text-lg select-none">{company.name.trim().charAt(0)}</span>
      )}
    </span>
  )
}

export default function CompanyCard({ company, index = 0 }) {
  return (
    <article
      className="group relative bg-white rounded-card border border-navy-100/70 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:ring-2 hover:ring-teal-brand/30 ring-offset-2 ring-offset-transparent transition-all duration-300 p-5 flex flex-col overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* خط علوي متدرج */}
      <span
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-teal-brand via-navy-600 to-amber-brand opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
      <span className="absolute -top-10 -end-10 w-24 h-24 rounded-full bg-navy-50/70 blur-2xl transition-colors group-hover:bg-teal-brand/10" aria-hidden="true" />

      {/* شارة موثق */}
      {company.verified && (
        <span className="absolute top-4 end-4 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 shadow-sm">
          <BadgeCheck size={13} />
          موثّق
        </span>
      )}

      <div className="relative flex items-start gap-3.5">
        <BrandLogo company={company} />
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-navy-800 leading-snug truncate group-hover:text-teal-brand transition-colors">
            {company.name}
          </h3>
          <p className="text-xs font-bold text-teal-brand mt-0.5 truncate">{company.sector}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 min-w-0">
              <MapPin size={13} className="text-teal-brand shrink-0" />
              <span className="truncate">{company.city}</span>
            </span>
            {company.rating && (
              <span className="inline-flex items-center gap-1 font-black text-amber-500 bg-amber-brand/10 border border-amber-brand/20 rounded-full px-2 py-0.5">
                <Star size={12} fill="currentColor" />
                {company.rating}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="relative mt-4 text-sm leading-6 text-slate-600 line-clamp-2 flex-1">{company.desc}</p>

      <div className="relative flex items-center gap-2.5 mt-5 pt-4 border-t border-navy-50">
        <Link
          to={`/companies/${company.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-l from-navy-700 to-navy-800 hover:from-navy-800 hover:to-navy-900 shadow-card hover:shadow-card-hover transition-all"
        >
          عرض الملف
          <ChevronLeft size={16} />
        </Link>
        <a
          href={`tel:${company.phone?.replace(/\s/g, '') || ''}`}
          aria-label="اتصال"
          className="grid place-items-center w-11 h-11 rounded-full border border-amber-brand/30 text-amber-600 hover:bg-amber-brand/10 hover:border-amber-brand transition-colors"
        >
          <Phone size={16} />
        </a>
      </div>
    </article>
  )
}