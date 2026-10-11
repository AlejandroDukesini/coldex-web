import { NAV_LINKS, SITE, SOCIAL_LINKS } from '../../data/site'
import { LogoMark, SocialIcon } from '../ui/BrandIcons'

// Se calcula una vez al cargar el módulo (no en cada render).
const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-page flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <a href="#inicio" className="inline-flex items-center gap-2.5 rounded-lg">
            <LogoMark />
            <span className="font-semibold tracking-tight">{SITE.brand}</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {SITE.name} · {SITE.role}. Webs y sistemas que se miden, no que se prometen.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-1 text-sm sm:grid-cols-3">
            {[...NAV_LINKS, { id: 'contacto', label: 'Contacto' }].map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-wrap gap-2" aria-label="Redes sociales">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${social.label} (se abre en una pestaña nueva)`}
                className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <SocialIcon id={social.id} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:justify-between">
        <p>
          © {YEAR} {SITE.brand} · {SITE.fullName}
        </p>
        <p>Construido con React, Vite y Tailwind CSS — y medido con Lighthouse.</p>
      </div>
    </footer>
  )
}
