import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Menu, X, LogIn, UserPlus, MapPin } from 'lucide-react'
import Logo from './Logo'

const navItems = [
  { to: '/', label: 'الرئيسية' },
  { to: '/companies', label: 'دليل الشركات' },
  { to: '/companies', label: 'المصانع', query: 'type=factory' },
  { to: '/companies', label: 'المستوردون', query: 'type=import' },
  { to: '/companies', label: 'المصدرون', query: 'type=export' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    setOpen(false)
    navigate(`/companies?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-card' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-18 md:h-20">
          {/* الشعار لجهة البداية (يمين في RTL) */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* قائمة التنقل - شاشات كبيرة */}
          <nav className="hidden lg:flex items-center gap-1 ms-8" aria-label="الرئيسية">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.query ? `${item.to}?${item.query}` : item.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive && !item.query ? 'text-teal-brand bg-teal-brand/10' : 'text-slate-ink/80 hover:text-navy-700 hover:bg-navy-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* شريط البحث المركزي */}
          <form onSubmit={submit} className="hidden md:flex flex-1 justify-center mx-2">
            <div className="relative flex items-center bg-surface ring-1 ring-navy-100 rounded-full w-full max-w-md focus-within:ring-2 focus-within:ring-teal-brand transition-all px-2 h-11">
              <Search className="shrink-0 text-slate-400 ms-2.5" size={18} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحث عن شركة، مصنع، أو منتج..."
                className="flex-1 bg-transparent px-3 py-2 outline-none text-sm font-medium placeholder:text-slate-400 text-slate-ink"
              />
              <button
                type="submit"
                aria-label="بحث"
                className="hidden md:block shrink-0 px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-l from-teal-brand to-teal-brand-dark hover:from-teal-brand-dark hover:to-teal-brand transition-colors"
              >
                بحث
              </button>
            </div>
          </form>

          {/* منطقة الدخول - نهاية السطر (يسار في RTL) */}
          <div className="hidden md:flex items-center gap-2.5 me-auto ms-2 shrink-0">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hidden xl:flex">
              <MapPin size={14} className="text-teal-brand" /> الشركات حسب المدن
            </span>
            <Link
              to="/companies"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-navy-700 border border-navy-200 hover:border-teal-brand hover:text-teal-brand transition-colors"
            >
              <LogIn size={16} />
              تسجيل الدخول
            </Link>
            <Link
              to="/companies"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white bg-navy-700 hover:bg-navy-800 shadow-card transition-colors"
            >
              <UserPlus size={16} />
              حساب جديد
            </Link>
          </div>

          {/* زر القائمة للجوال */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
            className="lg:hidden ms-auto grid place-items-center w-10 h-10 rounded-lg text-navy-700 hover:bg-navy-50"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* قائمة الجوال */}
      {open && (
        <div className="lg:hidden border-t border-navy-100 bg-white animate-fade-up">
          <div className="px-4 py-3 space-y-1">
            <form onSubmit={submit} className="flex items-center gap-2 bg-surface ring-1 ring-navy-100 rounded-full px-3 h-11 mb-2">
              <Search size={18} className="text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحث عن شركة، مصنع، أو منتج..."
                className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-slate-400"
              />
            </form>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.query ? `${item.to}?${item.query}` : item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive && !item.query ? 'text-teal-brand bg-teal-brand/10' : 'text-slate-ink/80 hover:bg-navy-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-3">
              <Link to="/companies" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 rounded-full text-sm font-bold text-navy-700 border border-navy-200">
                تسجيل الدخول
              </Link>
              <Link to="/companies" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 rounded-full text-sm font-bold text-white bg-navy-700">
                حساب جديد
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}