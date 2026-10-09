import { useId, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { GitHubIcon } from './BrandIcons'
import { SnakePreview } from './SnakePreview'

const IMAGE_SIZES = '(min-width: 64rem) 560px, (min-width: 40rem) 45vw, 92vw'

export function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const detailsId = useId()

  return (
    <article
      id={`proyecto-${project.id}`}
      aria-labelledby={`${detailsId}-title`}
      className="card group flex scroll-mt-28 flex-col overflow-hidden"
      data-reveal
      style={{ '--delay': `${(index % 2) * 90}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        {project.image ? (
          <img
            src={`/projects/${project.image}-1200.webp`}
            srcSet={`/projects/${project.image}-640.webp 640w, /projects/${project.image}-1200.webp 1200w`}
            sizes={IMAGE_SIZES}
            width="1200"
            height="750"
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-[1.03]"
          />
        ) : (
          <SnakePreview />
        )}
        <span className="absolute top-3 left-3 rounded-full border border-white/10 bg-bg/80 px-3 py-1 font-mono text-[0.65rem] tracking-wider text-muted uppercase backdrop-blur-md">
          {String(index + 1).padStart(2, '0')} · {project.kind}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 id={`${detailsId}-title`} className="text-xl font-semibold sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-5 space-y-2 rounded-xl border border-line bg-white/[0.02] p-4" aria-label="Resultados medidos">
          {project.results.map((result) => (
            <li key={result} className="flex gap-2.5 font-mono text-[0.8rem] leading-relaxed text-fg/90">
              <span className="text-accent" aria-hidden="true">
                ▸
              </span>
              {result}
            </li>
          ))}
        </ul>

        <div
          id={detailsId}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-out-expo) ${
            expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
          inert={!expanded}
        >
          <div className="overflow-hidden">
            <dl className="space-y-4 pt-5 text-sm leading-relaxed">
              <div>
                <dt className="font-mono text-[0.7rem] tracking-wider text-subtle uppercase">El reto</dt>
                <dd className="mt-1 text-muted">{project.problem}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] tracking-wider text-subtle uppercase">La solución</dt>
                <dd className="mt-1 text-muted">{project.solution}</dd>
              </div>
            </dl>
          </div>
        </div>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologías">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[0.7rem] text-muted">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={detailsId}
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            {expanded ? 'Ocultar caso' : 'Ver caso completo'}
            <ChevronDown
              className={`size-4 transition-transform duration-500 ease-(--ease-out-expo) ${expanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          <div className="ml-auto flex items-center gap-4">
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
        </div>
      </div>
    </article>
  )
}
