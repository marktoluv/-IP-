import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router'
import { ContactPage } from './components/ContactPage'
import { SiteHeader } from './components/SiteHeader'
import { WorkGallery } from './components/WorkGallery'
import { copy, works } from './content/site'
import type { Lang, SiteCopy } from './content/site'

const HeroScene = lazy(() => import('./components/HeroScene').then((module) => ({ default: module.HeroScene })))

function HeroSceneGate() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia) return
    const query = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return enabled ? <Suspense fallback={null}><HeroScene /></Suspense> : null
}

function RevealManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    elements.forEach((element) => {
      element.classList.add('reveal-ready')
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [pathname])

  return null
}

function getInitialLanguage(): Lang {
  try {
    return window.localStorage.getItem('eira-language') === 'en' ? 'en' : 'zh'
  } catch {
    return 'zh'
  }
}

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = decodeURIComponent(hash.slice(1))
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function HomePage({ content, lang }: { content: SiteCopy; lang: Lang }) {
  const profileEntries = [content.profile.identity, content.profile.story, content.profile.personality, content.profile.coreValue]
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || !window.matchMedia) return
    const preference = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    const reset = () => {
      hero.style.setProperty('--hero-x', '0px')
      hero.style.setProperty('--hero-y', '0px')
    }
    const move = (event: PointerEvent) => {
      if (!preference.matches) return
      const bounds = hero.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        hero.style.setProperty('--hero-x', `${x.toFixed(1)}px`)
        hero.style.setProperty('--hero-y', `${y.toFixed(1)}px`)
      })
    }
    hero.addEventListener('pointermove', move, { passive: true })
    hero.addEventListener('pointerleave', reset)
    return () => {
      cancelAnimationFrame(frame)
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', reset)
    }
  }, [])

  return (
    <main>
      <section ref={heroRef} id="top" className="hero-section relative flex min-h-[760px] items-center overflow-hidden pt-[76px] md:min-h-[830px] lg:min-h-[min(900px,100svh)]">
        <img src={content.hero.image} alt={content.hero.imageAlt} fetchPriority="high" className="hero-image absolute inset-0 h-full w-full object-cover object-[67%_center]" />
        <div className="hero-wash absolute inset-0 bg-gradient-to-r from-[#090a0b] via-[#090a0b]/70 to-transparent" aria-hidden="true" />
        <HeroSceneGate />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 pt-24 md:px-10 lg:px-16">
          <div className="max-w-[720px]">
            <p className="eyebrow mb-7">{content.hero.eyebrow}</p>
            <div className="mb-7 flex items-end gap-4">
              <h1 className="font-display text-[clamp(76px,11vw,174px)] font-light leading-[0.82] tracking-[-0.07em] text-[#f2eee7]">EIRA</h1>
              <span className="mb-2 text-sm tracking-[0.28em] text-[#d8c5a6] md:mb-5 md:text-base">亦岚</span>
            </div>
            <h2 className="font-display mb-5 text-[clamp(28px,3vw,48px)] font-light leading-tight text-[#f5f0e8]">{content.hero.title}</h2>
            <p className="max-w-[530px] text-[15px] leading-8 text-[#d0ccc5] md:text-base">{content.hero.description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/#works" className="inline-flex min-h-12 items-center gap-8 bg-[#c3ad89] px-6 text-[12px] tracking-[0.13em] text-[#101112] transition-colors hover:bg-[#e1cfae]">
                {content.hero.primaryCta}<span aria-hidden="true">↗</span>
              </Link>
              <Link to="/#profile" className="inline-flex min-h-12 items-center gap-8 border border-white/50 px-6 text-[12px] tracking-[0.13em] text-[#f0ede7] transition-colors hover:bg-white/10">
                {content.hero.secondaryCta}<span aria-hidden="true">↓</span>
              </Link>
            </div>
          </div>
        </div>
        <span className="absolute bottom-8 left-6 z-10 text-[10px] tracking-[0.2em] text-[#b8b2a9] md:left-10 lg:left-16">{content.hero.scrollHint} ↓</span>
        <span className="absolute bottom-8 right-6 z-10 text-[10px] tracking-[0.2em] text-[#b8b2a9] md:right-10 lg:right-16">01 / 05</span>
      </section>

      <section id="profile" className="section-space border-t border-white/10 px-6 py-24 md:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-[1480px] gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div data-reveal>
            <p className="eyebrow mb-6">{content.profile.eyebrow}</p>
            <h2 className="section-title">{content.profile.title}</h2>
            <p className="section-description mt-7">{content.profile.introduction}</p>
            <div className="mt-12 aspect-[0.83] max-w-[560px] overflow-hidden bg-[#1a1b1c]">
              <img src="/media/origin-portrait.webp" alt={lang === 'zh' ? '亦岚的人物肖像' : 'Portrait of EIRA'} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
          <div data-reveal className="flex flex-col justify-end">
            <div className="border-t border-[#bea987]/65">
              {profileEntries.map((entry, index) => (
                <div key={entry.label} className="grid gap-4 border-b border-white/15 py-7 md:grid-cols-[110px_1fr] md:gap-8">
                  <div className="text-xs tracking-[0.12em] text-[#bea987]">0{index + 1} / {entry.label}</div>
                  <div>
                    <h3 className="font-display text-[24px] font-light text-[#eeeae2] md:text-[28px]">{entry.title}</h3>
                    <p className="mt-3 max-w-[510px] text-sm leading-7 text-[#aeadab]">{entry.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <blockquote className="font-display mt-14 max-w-[550px] text-[29px] font-light leading-snug text-[#c8b796] md:text-[37px]">{content.profile.quote}</blockquote>
          </div>
        </div>
      </section>

      <WorkGallery lang={lang} content={content.portfolio} works={works} />

      <section id="capabilities" className="section-space border-t border-white/10 bg-[#0d0f10] px-6 py-24 md:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1480px]">
          <p className="eyebrow mb-6">{content.capabilities.eyebrow}</p>
          <div data-reveal className="mb-14 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h2 className="section-title">{content.capabilities.title}</h2>
            <p className="section-description self-end">{content.capabilities.description}</p>
          </div>
          <div data-reveal className="grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
            {content.capabilities.items.map((item, index) => (
              <article key={item.id} className="min-h-[280px] border-b border-r border-white/15 p-7 md:p-9">
                <span className="font-display text-[46px] font-light text-[#bfa985]/70">0{index + 1}</span>
                <h3 className="font-display mt-10 text-[25px] font-light text-[#f0ede7]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#a5a4a1]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="collaboration" className="section-space border-t border-white/10 px-6 py-24 md:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1480px]">
          <div data-reveal className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-6">{content.collaboration.eyebrow}</p>
              <h2 className="section-title">{content.collaboration.title}</h2>
            </div>
            <p className="section-description self-end">{content.collaboration.description}</p>
          </div>
          <div data-reveal className="mt-16 border-t border-[#bea987]/65">
            {content.collaboration.options.map((option, index) => (
              <div key={option.id} className="grid gap-3 border-b border-white/15 py-8 md:grid-cols-[90px_1fr_1.2fr] md:items-center md:gap-8">
                <span className="text-xs tracking-[0.14em] text-[#bea987]">0{index + 1}</span>
                <h3 className="font-display text-[26px] font-light md:text-[32px]">{option.title}</h3>
                <p className="text-sm leading-7 text-[#aaa8a3]">{option.description}</p>
              </div>
            ))}
          </div>
          <Link to="/contact" className="mt-12 inline-flex min-h-12 items-center gap-8 border border-[#c3ad89] px-7 text-sm text-[#dcc8a7] transition-colors hover:bg-[#c3ad89] hover:text-[#090a0b]">
            {content.collaboration.cta}<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  )
}

function Footer({ content }: { content: SiteCopy }) {
  return (
    <footer className="border-t border-white/10 bg-[#0c0d0e] px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col justify-between gap-9 md:flex-row">
          <div>
            <span className="font-display text-[46px] font-light tracking-[0.12em]">EIRA</span>
            <p className="mt-2 text-sm text-[#a7a39b]">{content.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs tracking-[0.08em] text-[#aaa8a3]">
            <Link to="/#profile" className="hover:text-white">{content.nav.profile}</Link>
            <Link to="/#works" className="hover:text-white">{content.nav.works}</Link>
            <Link to="/#capabilities" className="hover:text-white">{content.nav.capabilities}</Link>
            <Link to="/contact" className="hover:text-white">{content.nav.contact}</Link>
          </div>
        </div>
        <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-6 text-[11px] text-[#7d7b77]">
          <span>© 2026 EIRA. {content.footer.rights}</span>
          <Link to="/#top" className="hover:text-white">{content.footer.backToTop} ↑</Link>
        </div>
      </div>
    </footer>
  )
}

function NotFound({ content }: { content: SiteCopy['notFound'] }) {
  return (
    <main className="flex min-h-[75svh] flex-col items-start justify-center px-6 pt-[76px] md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1480px]">
        <p className="eyebrow mb-6">{content.eyebrow}</p>
        <h1 className="section-title">{content.title}</h1>
        <p className="section-description mt-6">{content.description}</p>
        <Link to="/" className="mt-10 inline-flex border-b border-[#c3ad89] pb-2 text-[#ddc8a5]">{content.backHome} ↗</Link>
      </div>
    </main>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>(getInitialLanguage)
  const content = copy[lang]
  const location = useLocation()

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    document.title = lang === 'zh' ? 'EIRA / 亦岚 — AI 数字人作品集' : 'EIRA — Digital Human Portfolio'
    try { window.localStorage.setItem('eira-language', lang) } catch { /* Browsing still works without storage. */ }
  }, [lang])

  return (
    <div className="min-h-svh bg-[#090a0b] text-[#eeeae2]">
      <ScrollManager />
      <RevealManager />
      <SiteHeader lang={lang} content={content} onToggleLanguage={() => setLang((current) => current === 'zh' ? 'en' : 'zh')} />
      <div key={location.pathname} className="page-enter">
        <Routes location={location}>
          <Route path="/" element={<HomePage content={content} lang={lang} />} />
          <Route path="/contact" element={<ContactPage content={content.contact} />} />
          <Route path="*" element={<NotFound content={content.notFound} />} />
        </Routes>
      </div>
      <Footer content={content} />
    </div>
  )
}
