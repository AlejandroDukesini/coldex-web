import { ArrowUpRight } from 'lucide-react'
import { FEATURED_PROJECTS, MORE_PROJECTS } from '../../data/projects'
import { SITE } from '../../data/site'
import { GitHubIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'
import { ProjectCard } from '../ui/ProjectCard'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  return (
    <section id="proyectos" aria-labelledby="projects-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="projects-title"
            eyebrow="Proyectos"
            title="Evidencia, no promesas."
            description="Proyectos publicados con código abierto y demo. Las cifras salen de auditorías documentadas en cada repositorio."
          />
          <div data-reveal className="shrink-0">
            <Button href={SITE.github} target="_blank" rel="noreferrer" variant="secondary">
              <GitHubIcon className="size-4" /> Todo en GitHub
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-20">
          <h3 data-reveal className="eyebrow text-subtle!">
            Más experimentos y herramientas
          </h3>
          <ul className="mt-6 grid border-t border-line md:grid-cols-2 md:gap-x-10">
            {MORE_PROJECTS.map((project, index) => (
              <li key={project.title} data-reveal style={{ '--delay': `${(index % 2) * 60}ms` }}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-4 border-b border-line py-5 transition-colors"
                >
                  <span>
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-medium transition-colors group-hover:text-accent">{project.title}</span>
                      <span className="font-mono text-[0.7rem] text-subtle">{project.stack}</span>
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-muted">{project.description}</span>
                  </span>
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0 text-subtle transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                  <span className="sr-only">(repositorio en GitHub, se abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
