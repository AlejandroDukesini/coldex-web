import { useEffect, useRef, useState } from 'react'
import { PROCESS_STEPS } from '../../data/process'

// Línea de tiempo: el paso activo es el que cruza el centro de la pantalla y
// la línea de progreso crece hasta él (solo transform: scaleY).
export function Process() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const progress = PROCESS_STEPS.length > 1 ? active / (PROCESS_STEPS.length - 1) : 1

  return (
    <section id="proceso" aria-labelledby="process-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">Cómo trabajo</p>
          <h2 id="process-title" className="mt-4 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[2.75rem]">
            Un proceso claro para que siempre sepas en qué punto está tu proyecto.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Sin cajas negras: cada fase termina con algo concreto que puedes revisar antes de pasar a la siguiente.
          </p>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs tracking-wider text-muted uppercase">
            build <span className="text-subtle" aria-hidden="true">→</span>
            <span className="text-accent">measure</span>
            <span className="text-subtle" aria-hidden="true">→</span> iterate
          </p>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-line">
            <div
              className="h-full origin-top bg-accent transition-transform duration-700 ease-(--ease-out-expo)"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          <ol className="space-y-10 sm:space-y-12">
            {PROCESS_STEPS.map((step, index) => {
              const reached = index <= active
              return (
                <li
                  key={step.title}
                  ref={(el) => (stepRefs.current[index] = el)}
                  data-index={index}
                  className="relative grid grid-cols-[2.5rem_1fr] gap-5"
                >
                  <span
                    className={`relative z-10 grid size-10 place-items-center rounded-full border font-mono text-xs transition-colors duration-500 ${
                      reached ? 'border-accent/60 bg-[#0d1d1b] text-accent' : 'border-line bg-bg text-subtle'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div
                    data-reveal
                    className={`pt-1.5 transition-opacity duration-500 ${index === active ? '' : 'lg:opacity-60'}`}
                  >
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
                    <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-fg/80">
                      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                      Entregable: {step.output}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
