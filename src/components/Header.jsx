import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, LogIn, UserPlus } from 'lucide-react'
import Logo from './Logo'

const navItems = [
  { to: '/', label: 'الرئيسية' },
  { to: '/companies', label: 'دليل الشركات' },
  { to: '/companies?category=food', label: 'القطاعات' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`relative sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-card' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-teal-brand via-navy-600 to-amber-brand" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16 md:h-20">
          {/* الشعار لجهة البداية (يمين في RTL) */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* قائمة التنقل - شاشات كبيرة */}
          <nav className="hidden lg:flex items-center gap-1 ms-8" aria-label="الرئيسية">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'text-teal-brand bg-teal-brand/10' : 'text-slate-ink/80 hover:text-navy-700 hover:bg-navy-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* منطقة الدخول - نهاية السطر (يسار في RTL) */}
          <div className="hidden md:flex items-center gap-2.5 me-auto ms-4 shrink-0">
            <Link
              to="/companies"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-navy-700 border border-navy-200 hover:border-teal-brand hover:text-teal-brand transition-colors"
            >
              <LogIn size={16} />
              تسجيل الدخول
            </Link>
            <Link
              to="/companies"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-card transition-all"
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
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive ? 'text-teal-brand bg-teal-brand/10' : 'text-slate-ink/80 hover:bg-navy-50'
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
              <Link to="/companies" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-l from-amber-500 to-orange-500">
                حساب جديد
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}