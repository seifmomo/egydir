import { Link } from 'react-router-dom'
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ChevronLeft } from 'lucide-react'
import Logo from './Logo'

const quickLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/companies', label: 'دليل الشركات' },
  { to: '/companies', label: 'دليل المصانع' },
  { to: '/companies', label: 'المستوردون' },
  { to: '/companies', label: 'المصدرون' },
]

const topSectors = [
  'المنتجات الغذائية',
  'البلاستيك والفيبر جلاس',
  'المنتجات الخشبية والأثاث',
  'الأدوية والمستلزمات الطبية',
  'التشييد والبناء',
  'شحن وتخليص جمركي',
  'الصناعات الكيماوية والمنظفات',
  'الأجهزة والمعدات الطبية',
]

const legalLinks = [
  { to: '/companies', label: 'عن إيجي داير' },
  { to: '/companies', label: 'إعلن معنا' },
  { to: '/companies', label: 'الشروط والأحكام' },
  { to: '/companies', label: 'سياسة الخصوصية' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300 mt-16">
      <div className="h-1 bg-gradient-to-l from-amber-brand via-teal-brand to-navy-500" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* بانر انضمام للشركات */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-teal-brand-dark via-navy-800 to-navy-900 border border-navy-700 px-6 py-8 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
          <div className="relative">
            <p className="text-white font-black text-xl md:text-2xl">هل لديك شركة أو مصنع؟</p>
            <p className="text-slate-400 text-sm mt-1.5 leading-6 max-w-xl">
              أضف بيانات نشاطك مجاناً في إيجي داير لتصلك استفسارات من آلاف العملاء المحتملين كل شهر.
            </p>
          </div>
          <Link
            to="/companies"
            className="relative shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black text-navy-900 bg-gradient-to-l from-amber-400 to-orange-500 shadow-lg hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
          >
            أضف شركتك مجاناً
            <ChevronLeft size={16} />
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* نبذة */}
          <div className="lg:col-span-4 space-y-5">
            <Logo dark />
            <p className="text-sm leading-7 text-slate-400 max-w-sm">
              إيجي داير هو الدليل التجاري الأول للشركات والمصانع والمستوردين والمصدرين في مصر. تواصل مع آلاف الكيانات التجارية في كل القطاعات والمدن.
            </p>
            <div className="space-y-2.5 text-sm">
              <p className="flex items-center gap-2.5">
                <MapPin size={16} className="text-teal-brand-light shrink-0" />
                القاهرة الكبرى - جمهورية مصر العربية
              </p>
              <p className="flex items-center gap-2.5">
                <Phone size={16} className="text-teal-brand-light shrink-0" />
                <span dir="ltr">+20 2 3335 0000</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail size={16} className="text-teal-brand-light shrink-0" />
                info@egydir.com
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              {[
                { icon: Facebook, label: 'فيسبوك' },
                { icon: Twitter, label: 'إكس' },
                { icon: Linkedin, label: 'لينكد إن' },
                { icon: Youtube, label: 'يوتيوب' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid place-items-center w-9 h-9 rounded-lg bg-navy-800 hover:bg-teal-brand hover:text-white text-slate-400 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* روابط سريعة */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-teal-brand-light transition-colors">
                    <ChevronLeft size={14} className="text-navy-400" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* القطاعات */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold mb-4">أهم القطاعات</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {topSectors.map((s) => (
                <li key={s}>
                  <Link to="/companies" className="inline-flex items-start gap-1.5 text-sm text-slate-400 hover:text-teal-brand-light transition-colors">
                    <ChevronLeft size={14} className="text-navy-400 shrink-0 mt-0.5" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* قانوني */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-4">معلومات</h3>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-teal-brand-light transition-colors">
                    <ChevronLeft size={14} className="text-navy-400" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="grid place-items-center w-5 h-5 rounded bg-navy-800">
              <img src="/logo.png" alt="" className="w-3.5 h-3.5 object-contain" />
            </span>
            © {new Date().getFullYear()} جميع الحقوق محفوظة - إيجي داير EGYDIR
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <Building2 size={13} className="text-teal-brand-light" />
            دليل صناعي وتجاري متكامل للشركات المصرية
          </p>
        </div>
      </div>
    </footer>
  )
}