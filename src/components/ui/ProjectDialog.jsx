import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { GitHubIcon } from './BrandIcons'
import { SnakePreview } from './SnakePreview'

// Vista ampliada de un caso con <dialog> nativo: atrapa el foco, se cierra con
// Escape, con el botón o al pulsar fuera del panel.
export function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      // El foco empieza en «Cerrar» (si no, cae en el contenedor con scroll).
      dialog.querySelector('[data-autofocus]')?.focus()
    }
    if (!project && dialog.open) dialog.close()
  }, [project])

  const onClick = (event) => {
    // El <dialog> ocupa toda la pantalla: un clic directo en él es "fuera del panel".
    if (event.target === event.currentTarget || event.target.dataset.backdrop) dialogRef.current?.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={onClick}
    >
      {project && (
        <div className="h-full overflow-y-auto overscroll-contain px-3 py-3 sm:px-6 sm:py-10" data-backdrop="true">
          <article
            className="case-panel card relative mx-auto max-w-5xl overflow-hidden shadow-[0_60px_120px_-40px_rgb(0_0_0/0.9)]"
            style={{ '--tint': project.layout.tint }}
          >
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full border border-white/15 bg-bg/80 text-fg backdrop-blur-md transition-colors hover:border-accent/60 hover:text-accent"
              aria-label="Cerrar caso"
              data-autofocus
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            <div className="relative border-b border-line bg-surface-2">
              {project.image ? (
                <img
                  src={`/projects/${project.image}-1440.webp`}
                  srcSet={`/projects/${project.image}-640.webp 640w, /projects/${project.image}-1200.webp 1200w, /projects/${project.image}-1440.webp 1440w`}
                  sizes="(min-width: 64rem) 64rem, 100vw"
                  width={project.size[0]}
                  height={project.size[1]}
                  alt={project.imageAlt}
                  className="block h-auto w-full"
                />
              ) : (
                <div className="aspect-[16/10]">
                  <SnakePreview />
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent"
              />
            </div>

            <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="eyebrow">{project.kind}</p>
                <h2 id="case-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {project.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>

                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                  {project.stack.map((tech) => (
                    <li key={tech} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[0.7rem] text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 text-sm font-medium"
                    >
                      Ver demo <ArrowUpRight className="size-4" aria-hidden="true" />
                      <span className="sr-only">(se abre en una pestaña nueva)</span>
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium"
                  >
                    <GitHubIcon className="size-4" /> Código en GitHub
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </a>
                </div>
                {!project.demo && (
                  <p className="mt-3 text-xs text-subtle">La demo pública no está disponible en este momento.</p>
                )}
              </div>

              <div className="space-y-7">
                <dl className="space-y-6 text-[0.95rem] leading-relaxed">
                  <div>
                    <dt className="font-mono text-[0.7rem] tracking-wider text-subtle uppercase">El reto</dt>
                    <dd className="mt-1.5 text-muted">{project.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.7rem] tracking-wider text-subtle uppercase">La solución</dt>
                    <dd className="mt-1.5 text-muted">{project.solution}</dd>
                  </div>
                </dl>
                <div>
                  <p className="font-mono text-[0.7rem] tracking-wider text-subtle uppercase">Resultados medidos</p>
                  <ul className="mt-3 space-y-2 rounded-xl border border-line bg-white/[0.02] p-4">
                    {project.results.map((result) => (
                      <li key={result} className="flex gap-2.5 font-mono text-[0.8rem] leading-relaxed text-fg/90">
                        <span className="text-accent" aria-hidden="true">
                          ▸
                        </span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </dialog>
  )
}
