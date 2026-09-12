import { Sparkles } from 'lucide-react'
import { sponsors } from '../data'

export default function SponsorsMarquee() {
  const doubled = [...sponsors, ...sponsors]
  return (
    <section className="py-6 border-y border-navy-100/70 bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="flex items-center justify-center gap-2 text-sm font-bold text-slate-400 mb-6">
          <Sparkles size={15} className="text-teal-brand" />
          الرعاة والمشاركون الرسميون
        </p>
        <div className="relative overflow-hidden marquee-grayscale" dir="ltr">
          {/* تمويه الحواف */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/80 to-transparent z-10" />
          <div className="animate-marquee gap-12" style={{ direction: 'ltr' }}>
            {doubled.map((s, i) => (
              <a
                key={`${s.text}-${i}`}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center min-w-[180px] h-14 px-6 rounded-lg border border-navy-100 hover:border-teal-brand/40 bg-white transition-colors"
              >
                <span className="flex items-center gap-2 text-navy-700 font-extrabold text-base tracking-tight whitespace-nowrap">
                  <span className="grid place-items-center w-7 h-7 rounded-md bg-navy-800 text-teal-brand-light text-[10px] font-black">
                    {String(s.text.trim().charAt(0))}
                  </span>
                  <span>{s.text}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}