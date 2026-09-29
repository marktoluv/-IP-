import { useState } from 'react'
import { Link } from 'react-router'
import type { Lang, SiteCopy } from '../content/site'

type Props = {
  lang: Lang
  content: SiteCopy
  onToggleLanguage: () => void
}

export function SiteHeader({ lang, content, onToggleLanguage }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { to: '/', label: content.nav.home },
    { to: '/#profile', label: content.nav.profile },
    { to: '/#works', label: content.nav.works },
    { to: '/#capabilities', label: content.nav.capabilities },
    { to: '/#collaboration', label: content.nav.collaboration },
  ]

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090a0b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-6 md:px-10 lg:px-16">
        <Link to="/" className="group flex items-center gap-3" aria-label={content.brand.latinName} onClick={() => setMenuOpen(false)}>
          <span className="font-display text-[27px] font-light tracking-[0.18em] text-[#f2eee7]">EIRA</span>
          <span className="h-6 w-px bg-[#bba784]/50" aria-hidden="true" />
          <span className="text-[11px] tracking-[0.12em] text-[#b8b4ad]">亦岚</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label={content.footer.navigation}>
          {links.slice(1).map((link) => (
            <Link key={link.to} to={link.to} className="nav-link text-[11px] tracking-[0.12em] text-[#bab7b2] transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <button type="button" onClick={onToggleLanguage} aria-label={content.nav.switchLanguage} className="text-xs tracking-[0.16em] text-[#cfc8bb] transition-colors hover:text-white">
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
          <Link to="/contact" className="inline-flex h-9 items-center border border-[#bba784]/60 px-5 text-[11px] tracking-[0.14em] text-[#e7d5b6] transition-colors hover:bg-[#bba784] hover:text-[#090a0b]">
            {content.nav.contact} <span className="ml-3" aria-hidden="true">↗</span>
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-white/20 text-[#eeeae2] lg:hidden"
          aria-label={menuOpen ? content.nav.closeMenu : content.nav.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-xl leading-none">{menuOpen ? '×' : '☰'}</span>
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="flex flex-col gap-1 border-t border-white/10 bg-[#101112] px-6 py-5 lg:hidden" aria-label={content.footer.navigation}>
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="py-3 text-base text-[#eeeae2]">
              {link.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="py-3 text-base text-[#d8bd90]">{content.nav.contact}</Link>
          <button type="button" onClick={() => { onToggleLanguage(); setMenuOpen(false) }} className="self-start py-3 text-sm tracking-[0.14em] text-[#b8b4ad]">
            {lang === 'zh' ? 'ENGLISH' : '简体中文'}
          </button>
        </nav>
      )}
    </header>
  )
}
