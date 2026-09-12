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
  const s =
    size === 'xl' ? 'w-14 h-14' : size === 'sm' ? 'w-9 h-9' : 'w-12 h-12'
  const grad = gradients[company.id % gradients.length]
  const url = logoUrl(company.logo)
  return (
    <span
      className={`grid place-items-center rounded-xl overflow-hidden bg-gradient-to-br ${grad} text-white font-black shrink-0 shadow-md ${s} ${className}`}
    >
      {url ? (
        <img src={url} alt={company.name} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <span className="text-lg select-none">{company.name.trim().charAt(0)}</span>
      )}
    </span>
  )
}

export default function CompanyCard({ company, index = 0 }) {
  return (
    <article
      className="group relative bg-white rounded-card border border-navy-100/70 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* شارة موثق */}
      {company.verified && (
        <span className="absolute top-4 end-4 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1">
          <BadgeCheck size={13} />
          موثّق
        </span>
      )}

      <div className="flex items-start gap-3.5">
        <BrandLogo company={company} />
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-navy-800 leading-snug truncate group-hover:text-teal-brand transition-colors">
            {company.name}
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">{company.sector}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 min-w-0">
              <MapPin size={13} className="text-teal-brand shrink-0" />
              <span className="truncate">{company.city}</span>
            </span>
            {company.rating && (
              <span className="inline-flex items-center gap-1 font-bold text-amber-500">
                <Star size={13} fill="currentColor" />
                {company.rating}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-2 flex-1">{company.desc}</p>

      <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-navy-50">
        <Link
          to={`/companies/${company.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold text-white bg-navy-700 hover:bg-navy-800 shadow-card hover:shadow-card-hover transition-all"
        >
          عرض الملف
          <ChevronLeft size={16} />
        </Link>
        <a
          href={`tel:${company.phone?.replace(/\s/g, '') || ''}`}
          aria-label="اتصال"
          className="grid place-items-center w-11 h-11 rounded-full border border-navy-200 text-navy-600 hover:border-teal-brand hover:text-teal-brand hover:bg-teal-brand/5 transition-colors"
        >
          <Phone size={16} />
        </a>
      </div>
    </article>
  )
}