import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function SearchBar({ size = 'md', placeholder = 'ابحث عن شركة، مصنع، أو منتج...', className = '' }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    navigate(`/companies?q=${encodeURIComponent(q.trim())}`)
  }

  const sizes = {
    md: 'h-12 px-1.5 rounded-full text-sm',
    lg: 'h-14 md:h-16 px-2 rounded-full text-base',
  }

  return (
    <form onSubmit={submit} className={`relative flex items-center bg-white shadow-card ring-1 ring-navy-100 focus-within:ring-2 focus-within:ring-teal-brand ${sizes[size]} ${className}`}>
      <button
        type="submit"
        aria-label="بحث"
        className={`grid place-items-center rounded-full shrink-0 text-white bg-gradient-to-l from-teal-brand to-teal-brand-dark hover:from-teal-brand-dark hover:to-teal-brand transition-colors shadow-md shadow-teal-brand/25 ${size === 'lg' ? 'w-11 h-11 md:w-12 md:h-12' : 'w-9 h-9'}`}
      >
        <Search size={size === 'lg' ? 22 : 18} />
      </button>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-4 outline-none placeholder:text-slate-400 text-slate-ink font-medium rtl:placeholder:text-right"
      />
    </form>
  )
}