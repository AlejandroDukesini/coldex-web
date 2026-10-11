import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ArrowIcon, Button } from '../ui/Button'
import { LogoMark } from '../ui/BrandIcons'

const SECTION_IDS = [...NAV_LINKS.map((link) => link.id), 'contacto']

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  // Fondo del navbar en cuanto la página deja de estar arriba del todo.
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // Menú móvil: bloquea el scroll, mueve el foco y permite cerrar con Escape.
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    const panel = panelRef.current
    const focusables = panel.querySelectorAll('a, button')
    document.body.style.overflow = 'hidden'
    focusables[0]?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab' || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      toggle?.focus()
    }
  }, [open])

  // Si la ventana pasa a escritorio con el menú abierto, se cierra.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 64rem)')
    const onChange = (event) => event.matches && setOpen(false)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? 'border-b border-line bg-bg/75 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <span
        aria-hidden="true"
        className={`scroll-progress absolute inset-x-0 -bottom-px h-px origin-left bg-gradient-to-r from-cyan via-blue to-violet transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Saltar al contenido
      </a>

      <nav aria-label="Principal" className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <a href="#inicio" className="flex items-center gap-2.5 rounded-lg" onClick={close}>
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="font-semibold tracking-tight">{SITE.brand}</span>
            <span className="mt-1 font-mono text-[0.65rem] tracking-wider text-subtle uppercase">{SITE.name}</span>
          </span>
        </a>

        <NavLinks active={active} />

        <div className="hidden lg:block">
          <Button href="#contacto" className="min-h-10! px-5! text-sm!">
            Hablemos <ArrowIcon />
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-fg lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg lg:hidden"
      >
        <ul className="container-page flex flex-col py-6">
          {[...NAV_LINKS, { id: 'contacto', label: 'Contacto' }].map((link, index) => (
            <li
              key={link.id}
              className="animate-rise border-b border-line"
              style={{ animationDelay: `${60 + index * 45}ms` }}
            >
              <a
                href={`#${link.id}`}
                onClick={close}
                className="flex min-h-16 items-center justify-between text-2xl font-medium tracking-tight"
              >
                {link.label}
                <span className="font-mono text-xs text-subtle">0{index + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="container-page pb-10">
          <Button href="#contacto" onClick={close} className="w-full">
            Cuéntame tu proyecto <ArrowIcon />
          </Button>
          <p className="mt-6 text-center text-sm text-muted">
            o escríbeme a{' '}
            <a href={`mailto:${SITE.email}`} className="text-fg underline decoration-line-strong underline-offset-4">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </header>
  )
}

// useLayoutEffect solo en el navegador (en el prerender no hay layout que medir).
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

// Enlaces de escritorio con un único indicador que se desliza hasta la sección
// activa o hasta el enlace bajo el cursor. Solo anima transform y width.
function NavLinks({ active }) {
  const [hovered, setHovered] = useState(null)
  const listRef = useRef(null)
  const pillRef = useRef(null)
  const target = hovered ?? active

  useIsoLayoutEffect(() => {
    const list = listRef.current
    const pill = pillRef.current
    if (!list || !pill) return
    const place = () => {
      const link = target && list.querySelector(`[data-id="${target}"]`)
      if (!link) {
        pill.style.opacity = '0'
        return
      }
      pill.style.opacity = '1'
      pill.style.width = `${link.offsetWidth}px`
      pill.style.transform = `translate3d(${link.offsetLeft}px, 0, 0)`
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [target])

  return (
    <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex" onPointerLeave={() => setHovered(null)}>
      <span
        ref={pillRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-full rounded-full border border-line-strong bg-white/[0.04] opacity-0 transition-[transform,width,opacity] duration-500 ease-(--ease-out-expo)"
      >
        <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      </span>
      {NAV_LINKS.map((link) => {
        const isActive = active === link.id
        return (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              data-id={link.id}
              aria-current={isActive ? 'true' : undefined}
              onPointerEnter={() => setHovered(link.id)}
              onFocus={() => setHovered(link.id)}
              onBlur={() => setHovered(null)}
              className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-sm transition-colors duration-300 ${
                isActive ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
