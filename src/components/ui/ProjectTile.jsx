import { ArrowUpRight, Plus } from 'lucide-react'
import { useTileMotion } from '../../hooks/useTileMotion'
import { GitHubIcon } from './BrandIcons'
import { SnakePreview } from './SnakePreview'

// Clases estáticas (Tailwind solo genera las que aparecen literalmente).
const SPAN = {
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
}

// Ancho aproximado de la imagen según las columnas que ocupa la pieza.
const sizesFor = (span) =>
  `(min-width: 80rem) ${Math.round((span / 12) * 76)}rem, (min-width: 64rem) ${Math.round((span / 12) * 94)}vw, (min-width: 48rem) ${span >= 7 ? 94 : 46}vw, 92vw`

export function ProjectTile({ project, index, onOpen }) {
  const motionRef = useTileMotion()
  const { layout } = project
  const number = String(index + 1).padStart(2, '0')
  const titleId = `proyecto-${project.id}-title`
  const open = () => onOpen(project.id)

  return (
    <article
      id={`proyecto-${project.id}`}
      aria-labelledby={titleId}
      data-reveal
      className={`tile scroll-mt-28 ${SPAN[layout.span]} ${layout.span >= 7 ? 'md:col-span-2' : ''} ${
        layout.offset ? 'lg:mt-32' : ''
      }`}
      style={{ '--tint': layout.tint, '--delay': `${(index % 2) * 110}ms` }}
    >
      <div ref={motionRef} className="tile-frame">
        {/* Atajo de ratón/táctil: el botón «Ver caso» del pie es el control accesible. */}
        <div className="tile-media" style={{ aspectRatio: layout.ratio }} onClick={open}>
          <div className="tile-parallax absolute inset-0">
            {project.image ? (
              <img
                src={`/projects/${project.image}-1200.webp`}
                srcSet={`/projects/${project.image}-640.webp 640w, /projects/${project.image}-1200.webp 1200w, /projects/${project.image}-1440.webp 1440w`}
                sizes={sizesFor(layout.span)}
                width={project.size[0]}
                height={project.size[1]}
                alt={project.imageAlt}
                loading="lazy"
                decoding="async"
                className="tile-img"
                style={{ objectPosition: layout.focus }}
              />
            ) : (
              <SnakePreview className="tile-img" />
            )}
          </div>
          <span aria-hidden="true" className="tile-shade" />
          <span aria-hidden="true" className="tile-sweep" />
          <span aria-hidden="true" className="tile-glare" />

          <span
            aria-hidden="true"
            className="absolute top-4 left-4 rounded-full border border-white/10 bg-bg/70 px-3 py-1 font-mono text-[0.65rem] tracking-wider text-fg/80 uppercase backdrop-blur-md"
          >
            {number} / {project.kind}
          </span>

          <span
            aria-hidden="true"
            className="tile-cta absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-fg text-bg shadow-[0_8px_30px_-6px_var(--tint)]"
          >
            <Plus className="size-5" />
          </span>

          <ul aria-hidden="true" className="tile-meta absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5">
            {project.stack.map((tech, i) => (
              <li
                key={tech}
                style={{ '--i': i }}
                className={`${i > 2 ? 'max-sm:hidden' : ''} rounded-md border border-white/10 bg-bg/70 px-2 py-1 font-mono text-[0.65rem] text-fg/85 backdrop-blur-md`}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <span aria-hidden="true" className="tile-border" />
      </div>

      <div className={`mt-6 grid gap-3 ${layout.span >= 6 ? 'sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6' : ''}`}>
        <div>
          <h3 id={titleId} className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            {project.title}
          </h3>
          <p className="mt-2 max-w-xl leading-relaxed text-muted">{project.summary}</p>
        </div>
        <p className={`font-mono text-xs leading-relaxed text-fg/85 ${layout.span >= 6 ? 'sm:max-w-[15rem] sm:text-right' : ''}`}>
          <span className="text-accent" aria-hidden="true">
            ▸{' '}
          </span>
          {project.results[0]}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-line pt-3">
        <button
          id={`ver-caso-${project.id}`}
          type="button"
          aria-haspopup="dialog"
          onClick={open}
          className="group/link inline-flex min-h-11 items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
        >
          Ver caso completo
          <span className="sr-only">de {project.title}</span>
          <Plus className="size-4 transition-transform duration-500 ease-(--ease-out-expo) group-hover/link:rotate-90" aria-hidden="true" />
        </button>
        <div className="ml-auto flex items-center gap-5">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
            >
              Demo <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">de {project.title} (se abre en una pestaña nueva)</span>
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            <GitHubIcon className="size-4" /> Código
            <span className="sr-only">de {project.title} en GitHub (se abre en una pestaña nueva)</span>
          </a>
        </div>
      </div>
    </article>
  )
}
