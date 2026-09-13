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
        <span className={`${size === 'sm' ? 'text-sm' : 'text-lg'} select-none`}>{company.name.trim().charAt(0)}</span>
      )}
    </span>
  )
}

/* لون شارة القطاع حسب النشاط */
function sectorTagClass(sector) {
  const s = sector || ''
  if (/غذاء|تمور|معلبات|زيوت|حلويات|ألبان/.test(s)) return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (/بلاستيك|فيبر|PVC|بولي/.test(s)) return 'bg-cyan-50 text-cyan-700 border-cyan-200'
  if (/خشب|أثاث|باركيه/.test(s)) return 'bg-amber-50 text-amber-700 border-amber-200'
  if (/طبي|مستحضرات|تجميل/.test(s)) return 'bg-rose-50 text-rose-700 border-rose-200'
  if (/زراع|أسمدة|علف|بيطري|تمور/.test(s)) return 'bg-green-50 text-green-700 border-green-200'
  if (/معدن|حديد|صاج|استانلس/.test(s)) return 'bg-slate-100 text-slate-700 border-slate-200'
  if (/تشييد|بناء|مقاول|أسمنت/.test(s)) return 'bg-orange-50 text-orange-700 border-orange-200'
  if (/كيميا|دهانات|منظفات/.test(s)) return 'bg-purple-50 text-purple-700 border-purple-200'
  if (/نسيج|ملابس|قماش|يونيفورم/.test(s)) return 'bg-pink-50 text-pink-700 border-pink-200'
  if (/شحن|تخليص|لوجست/.test(s)) return 'bg-sky-50 text-sky-700 border-sky-200'
  if (/طاقة|شمسي/.test(s)) return 'bg-yellow-50 text-yellow-700 border-yellow-200'
  if (/معارض/.test(s)) return 'bg-indigo-50 text-indigo-700 border-indigo-200'
  return 'bg-teal-50 text-teal-700 border-teal-200'
}

export default function CompanyCard({ company, index = 0 }) {
  return (
    <article
      className="group relative bg-white rounded-card border border-navy-100/70 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:ring-2 hover:ring-teal-brand/30 ring-offset-2 ring-offset-transparent transition-all duration-300 p-4 flex flex-col overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* خط علوي متدرج */}
      <span
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-teal-brand via-navy-600 to-amber-brand opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
      <span className="absolute -top-10 -end-10 w-24 h-24 rounded-full bg-navy-50/70 blur-2xl transition-colors group-hover:bg-teal-brand/10" aria-hidden="true" />

      <div className="relative flex items-start gap-3">
        <BrandLogo company={company} />
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-navy-800 leading-snug truncate group-hover:text-teal-brand transition-colors text-[15px]">
            {company.name}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {company.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                <BadgeCheck size={11} />
                موثّق
              </span>
            )}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sectorTagClass(company.sector)}`}>
              {company.sector}
            </span>
            {company.rating && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-amber-600 bg-amber-brand/10 border border-amber-brand/20 rounded-full px-1.5 py-0.5">
                <Star size={10} fill="currentColor" />
                {company.rating}
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-slate-500 min-w-0">
            <MapPin size={11} className="text-teal-brand shrink-0" />
            <span className="truncate">{company.city}</span>
          </div>
        </div>
      </div>

      <p className="relative mt-3 text-[13px] leading-6 text-slate-600 line-clamp-2 flex-1">{company.desc}</p>

      <div className="relative flex items-center justify-between gap-2 mt-4 pt-3 border-t border-navy-50">
        <Link
          to={`/companies/${company.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-teal-brand hover:text-teal-brand-dark transition-colors"
        >
          عرض الملف
          <ChevronLeft size={14} />
        </Link>
        <a
          href={`tel:${company.phone?.replace(/\s/g, '') || ''}`}
          aria-label="اتصال"
          className="grid place-items-center w-8 h-8 rounded-full border border-amber-brand/30 text-amber-600 hover:bg-amber-brand/10 hover:border-amber-brand transition-colors"
        >
          <Phone size={13} />
        </a>
      </div>
    </article>
  )
}