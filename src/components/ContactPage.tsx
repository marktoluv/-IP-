import { useState } from 'react'
import type { SiteCopy } from '../content/site'

type Props = { content: SiteCopy['contact'] }

export function ContactPage({ content }: Props) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    setSubmitted(true)
  }

  return (
    <main className="min-h-[calc(100svh-76px)] pt-[76px]">
      <div className="mx-auto grid max-w-[1480px] gap-14 px-6 py-20 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-16 lg:py-28">
        <div data-reveal>
          <p className="eyebrow mb-6">{content.eyebrow}</p>
          <h1 className="section-title max-w-[680px]">{content.title}</h1>
          <p className="section-description mt-7 max-w-[540px]">{content.description}</p>
          <div className="mt-16 hidden border-t border-white/15 pt-6 lg:block">
            <span className="font-display text-[92px] font-light leading-none tracking-[-0.06em] text-white/10">EIRA</span>
          </div>
        </div>

        <form data-reveal onSubmit={handleSubmit} onInput={() => setSubmitted(false)} className="border-t border-[#bdab8b]/60 pt-7" aria-label={content.title}>
          <p className="mb-8 max-w-lg text-sm leading-7 text-[#b9b4aa]">{content.form.demoNotice}</p>
          <div className="grid gap-x-6 gap-y-8 md:grid-cols-2">
            <label className="form-field">
              <span>{content.form.name} <span aria-hidden="true">*</span></span>
              <input name="name" type="text" autoComplete="name" required placeholder={content.form.namePlaceholder} />
            </label>
            <label className="form-field">
              <span>{content.form.email} <span aria-hidden="true">*</span></span>
              <input name="email" type="email" autoComplete="email" required placeholder={content.form.emailPlaceholder} />
            </label>
            <label className="form-field md:col-span-2">
              <span>{content.form.company}</span>
              <input name="company" type="text" autoComplete="organization" placeholder={content.form.companyPlaceholder} />
            </label>
            <label className="form-field md:col-span-2">
              <span>{content.form.message} <span aria-hidden="true">*</span></span>
              <textarea name="message" rows={5} required placeholder={content.form.messagePlaceholder} />
            </label>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <button type="submit" className="inline-flex min-h-12 items-center justify-center bg-[#c3ad89] px-8 text-sm tracking-[0.09em] text-[#111213] transition-colors hover:bg-[#e0cfaf]">
              {content.form.submit}<span className="ml-6" aria-hidden="true">↗</span>
            </button>
            <span className="text-xs text-[#85837e]">* {content.form.required}</span>
          </div>
          <p role="status" aria-live="polite" className="mt-6 min-h-7 text-sm text-[#d4bf99]">{submitted ? content.form.success : ''}</p>
        </form>
      </div>
    </main>
  )
}
