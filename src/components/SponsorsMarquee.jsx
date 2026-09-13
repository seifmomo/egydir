import { useEffect, useState } from 'react'
import { Sparkles, ChevronLeft, ChevronRight, ExternalLink, BadgeCheck } from 'lucide-react'
import { sponsors } from '../data'

export default function SponsorsMarquee() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setI((p) => (p + 1) % sponsors.length), 3000)
    return () => clearInterval(timer)
  }, [paused])

  const go = (n) => setI(((n % sponsors.length) + sponsors.length) % sponsors.length)
  const s = sponsors[i]

  return (
    <section className="py-10 border-y border-navy-100/70 bg-white/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="flex items-center justify-center gap-2 text-sm font-bold text-slate-400 mb-6">
          <Sparkles size={15} className="text-teal-brand" />
          الرعاة والمشاركون الرسميون
        </p>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* عرض راعي واحد في كل مرة مع حلقة لا نهائية */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(i - 1)}
              aria-label="السابق"
              className="hidden sm:grid place-items-center w-11 h-11 rounded-full glass text-navy-700 hover:text-teal-brand transition-colors shrink-0"
            >
              <ChevronRight size={20} />
            </button>

            <div key={s.text} className="flex-1 animate-pop">
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-navy-100 shadow-card hover:shadow-card-hover bg-white px-5 py-5 sm:px-8"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="grid place-items-center w-14 h-14 rounded-xl bg-gradient-to-br from-navy-800 to-teal-brand-dark text-teal-brand-light text-lg font-black shrink-0">
                    {s.text.trim().charAt(0)}
                  </span>
                  <div className="min-w-0 text-start">
                    <p className="font-black text-navy-800 truncate">{s.text}</p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-teal-brand">
                      <BadgeCheck size={12} />
                      راعي رسمي
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-navy-700 border border-navy-200 group-hover:border-teal-brand group-hover:text-teal-brand transition-colors">
                  زيارة الموقع
                  <ExternalLink size={13} />
                </span>
              </a>
            </div>

            <button
              onClick={() => go(i + 1)}
              aria-label="التالي"
              className="hidden sm:grid place-items-center w-11 h-11 rounded-full glass text-navy-700 hover:text-teal-brand transition-colors shrink-0"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          {/* مؤشر التقدم */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-[11px] font-black text-slate-400">
              {String(i + 1).toLocaleString('ar-EG')} / {sponsors.length.toLocaleString('ar-EG')}
            </span>
            <div className="flex gap-1.5">
              {sponsors.map((sp, k) => (
                <button
                  key={sp.text}
                  onClick={() => go(k)}
                  aria-label={sp.text}
                  className={`h-1.5 rounded-full transition-all ${
                    k === i ? 'w-5 bg-teal-brand' : 'w-1.5 bg-navy-200 hover:bg-teal-brand/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* كل الرعاة — كل واحد يظهر مرة واحدة في الحلقة */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {sponsors.map((sp, k) => (
              <a
                key={sp.text}
                href={sp.url}
                target="_blank"
                rel="noreferrer"
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  k === i
                    ? 'bg-teal-brand/10 text-teal-brand border border-teal-brand/30'
                    : 'bg-navy-50 text-slate-500 border border-navy-100 hover:text-teal-brand'
                }`}
              >
                {sp.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}