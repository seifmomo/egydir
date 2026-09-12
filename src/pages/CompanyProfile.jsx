import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  BadgeCheck,
  MapPin,
  Phone,
  Globe,
  Mail,
  Share2,
  Bookmark,
  MessageCircle,
  Star,
  Users,
  CalendarDays,
  Building2,
  Factory,
  ChevronDown,
  Store,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react'
import CompanyCard from '../components/CompanyCard'
import { companyById, allCompanies, getProductNames, logoUrl } from '../data'

const tabs = [
  { id: 'about', label: 'عن الشركة', icon: Building2 },
  { id: 'products', label: 'المنتجات', icon: Store },
  { id: 'contact', label: 'بيانات التواصل', icon: PhoneCall },
]

const productGradients = [
  'from-teal-400 to-navy-600',
  'from-orange-400 to-rose-500',
  'from-blue-500 to-indigo-600',
  'from-emerald-400 to-green-600',
  'from-fuchsia-500 to-purple-700',
  'from-amber-400 to-orange-600',
]

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-blue-600">
      <BadgeCheck size={22} fill="currentColor" strokeWidth={0} className="drop-shadow-sm" />
      <span className="text-xs font-bold bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5">موثّق</span>
    </span>
  )
}

export default function CompanyProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const company = companyById(id)
  const [tab, setTab] = useState('about')

  if (!company) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-black text-navy-800 text-2xl">الشركة غير موجودة</h1>
        <p className="text-slate-500 mt-2">تعذر العثور على هذه الشركة في الدليل.</p>
        <button
          onClick={() => navigate('/companies')}
          className="mt-6 inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-bold text-white bg-navy-700"
        >
          العودة للدليل
          <ArrowRight size={16} />
        </button>
      </div>
    )
  }

  const similar = allCompanies.filter((c) => c.sectorId === company.sectorId && c.id !== company.id).slice(0, 4)
  const products = getProductNames(company.sectorId)
  const isVerified = company.verified

  return (
    <div className="animate-fade-up">
      {/* ── رأس الملف / البانر ─────────────────────────────── */}
      <section className="relative">
        <div className="h-44 md:h-56 bg-gradient-to-l from-navy-800 via-navy-700 to-teal-brand-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
          <div className="absolute -top-10 -end-10 w-64 h-64 rounded-full bg-teal-brand/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 -start-8 w-72 h-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        </div>

        {/* خلفية الشعار المتداخل */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end gap-5 relative -mt-14 md:-mt-16 pb-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white border border-navy-100 shadow-card-hover flex items-center justify-center overflow-hidden shrink-0">
              {logoUrl(company.logo) ? (
                <img src={logoUrl(company.logo)} alt={company.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl font-black text-navy-800">{company.name.trim().charAt(0)}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── معلومات الشركة ─────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-navy-100 mt-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-cairo font-black text-navy-800 text-2xl md:text-3xl leading-tight">{company.name}</h1>
              {isVerified && <VerifiedBadge />}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm">
              <span className="text-teal-brand font-bold bg-teal-brand/10 rounded-full px-3 py-1">{company.sector}</span>
              <span className="inline-flex items-center gap-1.5 text-slate-500 font-semibold">
                <MapPin size={15} className="text-teal-brand" />
                {company.city}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-500 font-semibold">
                <Star size={15} className="text-amber-500" fill="currentColor" />
                {(company.rating || (company.verified ? 4.7 : 4.1)).toFixed(1)}
              </span>
            </div>

            {/* أزرار التواصل */}
            <div className="flex flex-wrap items-center gap-2.5 mt-5">
              <a
                href={`tel:${company.phone?.replace(/\s/g, '') || ''}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-navy-700 hover:bg-navy-800 transition-colors shadow-card"
              >
                <Phone size={14} />
                اتصال مباشر
              </a>
              {company.website && (
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-navy-700 border border-navy-200 hover:border-teal-brand hover:text-teal-brand transition-colors"
                >
                  <Globe size={14} />
                  الموقع الإلكتروني
                </a>
              )}
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-600 border border-navy-100 hover:border-teal-brand hover:text-teal-brand transition-colors">
                <Share2 size={14} />
                مشاركة
              </button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-600 border border-navy-100 hover:border-teal-brand hover:text-teal-brand transition-colors">
                <Bookmark size={14} />
                حفظ
              </button>
            </div>
          </div>

          {/* بطاقة معلومات سريعة */}
          <div className="grid grid-cols-3 gap-3 shrink-0 w-full lg:w-auto">
            {[
              { icon: Users, label: 'متابعون', value: company.followers?.toLocaleString('ar-EG') || '4.2K' },
              { icon: Factory, label: 'نشاط', value: company.verified ? 'مصنع + تجارة' : 'تجارة' },
              { icon: CalendarDays, label: 'منذ', value: company.founded ? `${company.founded}` : '2008' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-card border border-navy-100/70 shadow-card px-4 py-3 text-center">
                <s.icon size={17} className="mx-auto text-teal-brand" />
                <p className="mt-1.5 font-black text-navy-800 text-sm">{s.value}</p>
                <p className="text-[11px] font-semibold text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── التبويبات ─────────────────────────────────────── */}
        <div className="sticky top-[68px] md:top-[76px] z-40 bg-surface/90 backdrop-blur-md -mx-4 px-4 rounded-lg">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-1.5 px-4 md:px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  tab === t.id
                    ? 'bg-navy-700 text-white shadow-card'
                    : 'text-slate-500 hover:text-navy-700 hover:bg-white border border-transparent'
                }`}
              >
                <t.icon size={15} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── محتوى التبويبات ───────────────────────────────── */}
        <div className="py-8">
          {tab === 'about' && (
            <div className="grid lg:grid-cols-3 gap-8 animate-fade-up">
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-white rounded-card border border-navy-100/70 shadow-card p-6 md:p-8">
                  <h2 className="font-cairo font-black text-navy-800 text-xl mb-4">النشاط التجاري</h2>
                  <p className="text-slate-600 leading-8">{company.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-7">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-navy-50">
                      <span className="grid place-items-center w-10 h-10 rounded-lg bg-teal-brand/10 text-teal-brand shrink-0">
                        <ShieldCheck size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-slate-400">المسؤول</p>
                        <p className="font-bold text-navy-800 text-sm mt-0.5 leading-snug">{company.head || 'الإدارة العامة'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-navy-50">
                      <span className="grid place-items-center w-10 h-10 rounded-lg bg-teal-brand/10 text-teal-brand shrink-0">
                        <Building2 size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-slate-400">المقر</p>
                        <p className="font-bold text-navy-800 text-sm mt-0.5">القاهرة الكبرى - {company.city}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-card border border-navy-100/70 shadow-card p-6 md:p-8">
                  <h2 className="font-cairo font-black text-navy-800 text-xl mb-5">المنتجات والخدمات الرئيسية</h2>
                  <div className="flex flex-wrap gap-2.5">
                    {getProductNames(company.sectorId).map((p) => (
                      <span key={p} className="px-4 py-2 rounded-full text-sm font-semibold text-navy-700 bg-navy-50 border border-navy-100 hover:border-teal-brand hover:text-teal-brand transition-colors">
                        {p}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* شريط جانبي */}
              <aside className="space-y-5">
                <div className="bg-white rounded-card border border-navy-100/70 shadow-card p-6">
                  <h3 className="font-bold text-navy-800 mb-4">بيانات سريعة</h3>
                  <ul className="space-y-3.5 text-sm">
                    <li className="flex items-center gap-3">
                      <Phone size={16} className="text-teal-brand shrink-0" />
                      <span dir="ltr" className="text-slate-600 font-semibold">{company.phone || '—'}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Globe size={16} className="text-teal-brand shrink-0" />
                      <span dir="ltr" className="text-slate-600 font-semibold truncate">{company.website || '—'}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail size={16} className="text-teal-brand shrink-0" />
                      <span dir="ltr" className="text-slate-600 font-semibold truncate">{company.email || '—'}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin size={16} className="text-teal-brand shrink-0" />
                      <span className="text-slate-600 font-semibold">{company.city}</span>
                    </li>
                  </ul>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-l from-teal-brand to-teal-brand-dark hover:from-teal-brand-dark hover:to-teal-brand transition-all"
                  >
                    <MessageCircle size={16} />
                    راسل الشركة الآن
                  </a>
                </div>
              </aside>
            </div>
          )}

          {tab === 'products' && (
            <div className="animate-fade-up">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="font-cairo font-black text-navy-800 text-xl">منتجات {company.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">أبرز المنتجات والخدمات المتاحة</p>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {products.map((name, i) => (
                  <article
                    key={name}
                    className="group bg-white rounded-card border border-navy-100/70 shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className={`relative h-36 md:h-44 bg-gradient-to-br ${productGradients[i % productGradients.length]} overflow-hidden`}>
                      <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
                      <span className="absolute bottom-3 start-3 grid place-items-center w-9 h-9 rounded-lg bg-white/15 text-white backdrop-blur-sm">
                        <Building2 size={17} />
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-navy-800 text-sm leading-snug">{name}</h3>
                      <p className="text-xs text-slate-400 font-semibold mt-1">{company.sector}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="text-center text-sm text-slate-400 mt-8 flex items-center justify-center gap-1.5">
                <ShieldCheck size={15} className="text-teal-brand" />
                للتسعير والتفاصيل الكاملة تواصل مباشرة مع الشركة
              </p>
            </div>
          )}

          {tab === 'contact' && (
            <div className="grid lg:grid-cols-3 gap-8 animate-fade-up">
              <div className="lg:col-span-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Phone, title: 'هاتف التواصل', value: company.phone || 'غير متاح', dir: 'ltr', href: `tel:${company.phone || ''}` },
                    { icon: Mail, title: 'البريد الإلكتروني', value: company.email || 'غير متاح', dir: 'ltr', href: `mailto:${company.email || ''}` },
                    { icon: Globe, title: 'الموقع الإلكتروني', value: company.website || 'غير متاح', dir: 'ltr', href: company.website ? `https://${company.website}` : '#' },
                    { icon: MapPin, title: 'الموقع', value: `${company.city} - القاهرة الكبرى`, dir: 'rtl' },
                  ].map((c) => (
                    <a
                      key={c.title}
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group bg-white rounded-card border border-navy-100/70 shadow-card p-5 hover:border-teal-brand transition-colors block"
                    >
                      <span className="grid place-items-center w-11 h-11 rounded-xl bg-teal-brand/10 text-teal-brand">
                        <c.icon size={19} />
                      </span>
                      <p className="text-xs font-bold text-slate-400 mt-3">{c.title}</p>
                      <p dir={c.dir} className="font-bold text-navy-800 text-sm mt-1 truncate group-hover:text-teal-brand transition-colors">
                        {c.value}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
              <aside>
                <div className="bg-navy-800 rounded-card shadow-card p-6 text-slate-300">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-teal-brand text-white mb-4">
                    <MessageCircle size={20} />
                  </span>
                  <h3 className="text-white font-bold text-lg mb-2">تواصل معنا عاجلاً</h3>
                  <p className="text-sm leading-7 text-slate-400">
                    سجّل دخولك أو أنشئ حساباً مجانياً لإرسال رسائل مباشرة، وتوفير ملفات العرض، وتلقي عروض الأسعار من هذه الشركة.
                  </p>
                  <Link
                    to="/companies"
                    className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-bold text-navy-800 bg-white hover:bg-teal-brand-light transition-colors"
                  >
                    تسجيل الدخول
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </div>

        {/* ── شركات مشابهة ──────────────────────────────────── */}
        {similar.length > 0 && (
          <section className="pt-6 pb-12 border-t border-navy-100">
            <div className="flex items-end justify-between mb-7">
              <div>
                <h2 className="font-cairo font-black text-navy-800 text-xl md:text-2xl">شركات مشابهة</h2>
                <p className="text-sm text-slate-500 mt-1">نفس القطاع {company.sector}</p>
              </div>
              <Link to="/companies" className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-teal-brand">
                عرض الكل
                <ChevronDown size={15} className="rotate-90" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((c, i) => (
                <CompanyCard key={c.id} company={c} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}