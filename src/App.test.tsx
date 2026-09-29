import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from './App'
import { copy } from './content/site'

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  window.localStorage.clear()
  vi.stubGlobal('scrollTo', vi.fn())
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    value: vi.fn(),
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('EIRA visitor journeys', () => {
  it('starts in Chinese and keeps the selected language on a fresh mount', async () => {
    const user = userEvent.setup()
    const firstVisit = renderApp()

    expect(screen.getByRole('heading', { level: 2, name: copy.zh.hero.title })).toBeTruthy()
    expect(document.documentElement.lang).toBe('zh-CN')

    await user.click(within(screen.getByRole('banner')).getByRole('button', { name: copy.zh.nav.switchLanguage }))
    expect(screen.getByRole('heading', { level: 2, name: copy.en.hero.title })).toBeTruthy()
    expect(document.documentElement.lang).toBe('en')
    expect(window.localStorage.getItem('eira-language')).toBe('en')

    firstVisit.unmount()
    renderApp()
    expect(screen.getByRole('heading', { level: 2, name: copy.en.hero.title })).toBeTruthy()
    expect(document.documentElement.lang).toBe('en')
  })

  it('filters the gallery to the selected work category and restores all works', async () => {
    const user = userEvent.setup()
    renderApp()

    const filters = screen.getByRole('group', { name: copy.zh.portfolio.title })
    const art = within(filters).getByRole('button', { name: copy.zh.portfolio.art })
    const motion = within(filters).getByRole('button', { name: copy.zh.portfolio.motion })
    const concept = within(filters).getByRole('button', { name: copy.zh.portfolio.concept })
    const all = within(filters).getByRole('button', { name: copy.zh.portfolio.all })

    expect(screen.getAllByRole('button', { name: /^查看作品:/ }).length).toBe(6)
    await user.click(art)
    expect(art.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getAllByRole('button', { name: /^查看作品:/ }).length).toBe(3)
    expect(screen.queryByRole('button', { name: '查看作品: 记忆有形' })).toBeNull()

    await user.click(motion)
    expect(screen.getAllByRole('button', { name: /^查看作品:/ }).length).toBe(1)
    expect(screen.getByRole('button', { name: '查看作品: 记忆有形' })).toBeTruthy()

    await user.click(concept)
    expect(screen.getAllByRole('button', { name: /^查看作品:/ }).length).toBe(2)
    expect(screen.getByRole('button', { name: '查看作品: 气息之物' })).toBeTruthy()

    await user.click(all)
    expect(screen.getAllByRole('button', { name: /^查看作品:/ }).length).toBe(6)
  })

  it('opens a motion work with both video formats and closes its detail view', async () => {
    const user = userEvent.setup()
    const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal')
    const originalClose = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'close')
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value(this: HTMLDialogElement) { this.open = true },
    })
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true,
      value(this: HTMLDialogElement) { this.open = false; this.dispatchEvent(new Event('close')) },
    })

    try {
      renderApp()
      await user.click(screen.getByRole('button', { name: '查看作品: 记忆有形' }))
      const dialog = screen.getByRole('dialog', { name: '记忆有形' })
      const sources = Array.from(dialog.querySelectorAll('video source')).map((source) => source.getAttribute('src'))
      expect(sources).toEqual(['/media/eira-motion.webm', '/media/eira-motion.mp4'])

      await user.click(within(dialog).getByRole('button', { name: '关闭作品详情' }))
      expect(screen.queryByRole('dialog', { name: '记忆有形' })).toBeNull()
      expect(dialog.querySelector('video')).toBeNull()
    } finally {
      if (originalShowModal) Object.defineProperty(HTMLDialogElement.prototype, 'showModal', originalShowModal)
      else Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
      if (originalClose) Object.defineProperty(HTMLDialogElement.prototype, 'close', originalClose)
      else Reflect.deleteProperty(HTMLDialogElement.prototype, 'close')
    }
  })

  it('closes the mobile menu with Escape and returns focus to its button', async () => {
    const user = userEvent.setup()
    renderApp()
    const menuButton = within(screen.getByRole('banner')).getByRole('button', { name: copy.zh.nav.openMenu })
    await user.click(menuButton)
    expect(menuButton.getAttribute('aria-expanded')).toBe('true')
    expect(document.getElementById('mobile-navigation')).toBeTruthy()

    await user.keyboard('{Escape}')
    expect(menuButton.getAttribute('aria-expanded')).toBe('false')
    expect(document.getElementById('mobile-navigation')).toBeNull()
    expect(document.activeElement).toBe(menuButton)
  })

  it('resets an open mobile menu when the layout changes to desktop', async () => {
    const user = userEvent.setup()
    let onDesktopChange: (() => void) | undefined
    const desktop = {
      matches: false,
      addEventListener: (_event: string, listener: () => void) => { onDesktopChange = listener },
      removeEventListener: vi.fn(),
    }
    vi.stubGlobal('matchMedia', (query: string) => query === '(min-width: 1024px)'
      ? desktop
      : { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })

    renderApp()
    const menuButton = within(screen.getByRole('banner')).getByRole('button', { name: copy.zh.nav.openMenu })
    await user.click(menuButton)
    expect(document.getElementById('mobile-navigation')).toBeTruthy()

    act(() => { desktop.matches = true; onDesktopChange?.() })
    expect(menuButton.getAttribute('aria-expanded')).toBe('false')
    expect(document.getElementById('mobile-navigation')).toBeNull()
  })

  it('navigates from the home page to the contact page', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(within(screen.getByRole('banner')).getByRole('link', { name: copy.zh.nav.contact }))
    expect(screen.getByRole('heading', { level: 1, name: copy.zh.contact.title })).toBeTruthy()
    expect(screen.getByRole('form', { name: copy.zh.contact.title })).toBeTruthy()
    expect(screen.queryByRole('heading', { level: 2, name: copy.zh.hero.title })).toBeNull()
  })

  it('renders direct contact and unknown routes', () => {
    const contact = renderApp('/contact')
    expect(screen.getByRole('heading', { level: 1, name: copy.zh.contact.title })).toBeTruthy()
    contact.unmount()

    renderApp('/missing-page')
    expect(screen.getByRole('heading', { level: 1, name: copy.zh.notFound.title })).toBeTruthy()
    expect(screen.getByRole('link', { name: /返回首页/ })).toBeTruthy()
  })

  it('validates a demo enquiry locally and shows feedback without a network request', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.fn()
    const xhrSendSpy = vi.spyOn(XMLHttpRequest.prototype, 'send')
    vi.stubGlobal('fetch', fetchSpy)
    renderApp()

    await user.click(within(screen.getByRole('banner')).getByRole('link', { name: copy.zh.nav.contact }))
    const form = screen.getByRole('form', { name: copy.zh.contact.title })
    const status = within(form).getByRole('status')
    await user.click(within(form).getByRole('button', { name: copy.zh.contact.form.submit }))
    expect(status.textContent).toBe('')

    await user.type(within(form).getByRole('textbox', { name: /姓名/ }), '李明')
    await user.type(within(form).getByRole('textbox', { name: /电子邮箱/ }), 'li@example.com')
    await user.type(within(form).getByRole('textbox', { name: /项目想法/ }), '希望合作一个短片项目。')
    await user.click(within(form).getByRole('button', { name: copy.zh.contact.form.submit }))

    expect(status.textContent).toBe(copy.zh.contact.form.success)
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(xhrSendSpy).not.toHaveBeenCalled()
  })
})
