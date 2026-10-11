import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { FEATURED_PROJECTS, MORE_PROJECTS } from '../../data/projects'
import { SITE } from '../../data/site'
import { trackPointer } from '../../lib/device'
import { GitHubIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'
import { ProjectDialog } from '../ui/ProjectDialog'
import { ProjectTile } from '../ui/ProjectTile'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  const [openId, setOpenId] = useState(null)
  const project = FEATURED_PROJECTS.find((item) => item.id === openId) ?? null

  // Al cerrar, el foco vuelve al botón «Ver caso» de esa pieza.
  const close = () => {
    const id = openId
    setOpenId(null)
    if (id) requestAnimationFrame(() => document.getElementById(`ver-caso-${id}`)?.focus({ preventScroll: true }))
  }

  return (
    <section id="proyectos" aria-labelledby="projects-title" className="relative isolate overflow-x-clip py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute top-40 right-[-20%] -z-10 h-[50rem] w-[50rem] max-w-[140vw] bg-[radial-gradient(closest-side,rgb(160_123_255/0.1),transparent)]"
      />
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute bottom-60 left-[-20%] -z-10 h-[46rem] w-[46rem] max-w-[140vw] bg-[radial-gradient(closest-side,rgb(76_116_255/0.1),transparent)]"
      />

      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="projects-title"
            index="04"
            eyebrow="Proyectos"
            title={
              <>
                Evidencia, <span className="text-display text-chrome">no promesas.</span>
              </>
            }
            description="Proyectos publicados con código abierto y demo. Las cifras salen de auditorías documentadas en cada repositorio."
          />
          <div data-reveal className="shrink-0">
            <Button href={SITE.github} target="_blank" rel="noreferrer" variant="secondary">
              <GitHubIcon className="size-4" /> Todo en GitHub
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-y-20">
          {FEATURED_PROJECTS.map((item, index) => (
            <ProjectTile key={item.id} project={item} index={index} onOpen={setOpenId} />
          ))}
        </div>

        <div className="mt-28">
          <h3 data-reveal className="eyebrow inline-flex items-center gap-3 text-subtle!">
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            Más experimentos y herramientas
          </h3>
          <ul className="mt-6 border-t border-line">
            {MORE_PROJECTS.map((item, index) => (
              <li key={item.title} data-reveal style={{ '--delay': `${(index % 3) * 50}ms` }}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  onPointerMove={trackPointer}
                  className="spotlight group relative grid gap-x-8 gap-y-1 border-b border-line px-1 py-5 sm:grid-cols-[3rem_14rem_1fr_auto] sm:items-baseline sm:px-3"
                >
                  <span className="hidden font-mono text-xs text-subtle sm:block">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-medium transition-colors duration-300 group-hover:text-accent">{item.title}</span>
                  <span className="text-sm leading-relaxed text-muted">
                    {item.description}
                    <span className="mt-1 block font-mono text-[0.7rem] text-subtle">{item.stack}</span>
                  </span>
                  <ArrowUpRight
                    className="absolute top-5 right-1 size-4 text-subtle transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent sm:static"
                    aria-hidden="true"
                  />
                  <span className="sr-only">(repositorio en GitHub, se abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProjectDialog project={project} onClose={close} />
    </section>
  )
}
