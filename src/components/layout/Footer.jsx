import { NAV_LINKS, SITE } from '../../data/site'
import { GitHubIcon, LinkedInIcon, LogoMark } from '../ui/BrandIcons'

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

        <div className="flex gap-2">
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub (se abre en una pestaña nueva)"
            className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn (se abre en una pestaña nueva)"
            className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <LinkedInIcon className="size-4" />
          </a>
        </div>
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
