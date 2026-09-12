import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'

export default function Logo({ dark = false, size = 'md' }) {
  const textSize = size === 'lg' ? 'text-2xl md:text-3xl' : 'text-xl'
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="relative grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 shadow-card group-hover:shadow-card-hover transition-all">
        <img
          src="/logo.png"
          alt="EGYDIR"
          className="w-6 h-6 object-contain drop-shadow"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling.style.display = 'grid'
          }}
        />
        <span className="hidden place-items-center text-white" aria-hidden="true">
          <Building2 size={20} />
        </span>
      </span>
      <span className={`font-extrabold tracking-tight ${textSize} ${dark ? 'text-white' : 'text-navy-800'}`} dir="ltr">
        EGY<span className={dark ? 'text-teal-brand-light' : 'text-teal-brand'}>DIR</span>
      </span>
    </Link>
  )
}