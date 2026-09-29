import { useEffect, useRef, useState } from 'react'
import type { Lang, SiteCopy, Work, WorkCategory } from '../content/site'

type Props = {
  lang: Lang
  content: SiteCopy['portfolio']
  works: Work[]
}

type Filter = 'all' | WorkCategory

export function WorkGallery({ lang, content, works }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Work | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const visibleWorks = filter === 'all' ? works : works.filter((work) => work.category === filter)
  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: content.all },
    { id: 'art', label: content.art },
    { id: 'motion', label: content.motion },
    { id: 'concept', label: content.concept },
  ]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (selected && !dialog.open) dialog.showModal()
    if (!selected && dialog.open) dialog.close()
  }, [selected])

  return (
    <section id="works" className="section-space border-t border-white/10 px-6 py-24 md:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1480px]">
        <div data-reveal className="mb-10 flex flex-col justify-between gap-8 md:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-[760px]">
            <p className="eyebrow mb-5">{content.eyebrow}</p>
            <h2 className="section-title">{content.title}</h2>
            <p className="section-description mt-6">{content.description}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3" role="group" aria-label={content.title}>
            {filters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
                className={`filter-button border-b pb-2 text-[12px] tracking-[0.1em] transition-colors ${filter === id ? 'border-[#c4ae88] text-[#e4d2b3]' : 'border-transparent text-[#92918f] hover:text-white'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div data-reveal className="columns-1 gap-5 md:columns-2 lg:columns-3" aria-live="polite">
          {visibleWorks.map((work) => (
            <button
              type="button"
              key={work.id}
              onClick={() => setSelected(work)}
              className="work-card group relative mb-5 block w-full break-inside-avoid overflow-hidden bg-[#151719] text-left"
              aria-label={`${content.viewWork}: ${work.title[lang]}`}
            >
              <div className={`overflow-hidden ${work.id === 'after-light' || work.category === 'motion' ? 'aspect-[1.2]' : work.id === 'aura-objects' ? 'aspect-square' : 'aspect-[0.82]'}`}>
                <img src={work.image} alt={work.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-6 pb-6 pt-24 md:px-8 md:pb-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[10px] tracking-[0.18em] text-[#ddd0b9]">{work.category === 'concept' ? content.conceptBadge : work.subtitle[lang]}</p>
                    <h3 className="font-display text-[25px] font-light text-white md:text-[30px]">{work.title[lang]}</h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/55 text-lg text-white" aria-hidden="true">
                    {work.category === 'motion' ? '▶' : '↗'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}
        className="work-dialog m-auto w-[min(920px,calc(100%-32px))] max-h-[calc(100dvh-32px)] overflow-y-auto border border-white/15 bg-[#111314] p-0 text-[#eeeae2] backdrop:bg-black/80"
        aria-label={selected?.title[lang]}
      >
        {selected && (
          <div>
            <div className="relative">
              {selected.video ? (
                <video key={selected.id} controls playsInline poster={selected.image} className="max-h-[60vh] w-full bg-black object-contain">
                  <source src={selected.video} type="video/webm" />
                  <img src={selected.image} alt={selected.title[lang]} />
                </video>
              ) : (
                <img src={selected.image} alt={selected.title[lang]} className="max-h-[60vh] w-full object-contain" />
              )}
              <button type="button" onClick={() => dialogRef.current?.close()} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/75 text-2xl text-white" aria-label={lang === 'zh' ? '关闭作品详情' : 'Close work details'}>×</button>
            </div>
            <div className="p-7 md:p-10">
              <p className="eyebrow mb-3">{selected.subtitle[lang]}</p>
              <h3 className="font-display text-3xl md:text-4xl">{selected.title[lang]}</h3>
              <p className="mt-5 max-w-2xl leading-7 text-[#bcb9b3]">{selected.description[lang]}</p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
