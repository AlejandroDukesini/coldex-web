import { SITE, STACK } from '../../data/site'
import { ArrowIcon, Button } from '../ui/Button'
import { HeroConsole } from './HeroConsole'

const delay = (ms) => ({ animationDelay: `${ms}ms` })

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-x-clip pt-28 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
      <div aria-hidden="true" className="grid-backdrop absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="hero-glow absolute top-[-10rem] left-1/2 -z-10 h-[38rem] w-[min(70rem,140vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(0_245_212/0.13),transparent),radial-gradient(closest-side_at_75%_60%,rgb(124_58_237/0.12),transparent)]"
      />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div>
          <p className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pr-4 pl-3 text-xs text-muted sm:text-sm">
            <span className="animate-pulse-dot size-2 rounded-full bg-accent" aria-hidden="true" />
            {SITE.name} · {SITE.role} en {SITE.location}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]"
          >
            <span className="block overflow-hidden pb-1">
              <span className="animate-line-up block">Software que se mide,</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="animate-line-up block text-muted" style={delay(90)}>
                no que se <span className="text-accent">promete.</span>
              </span>
            </span>
          </h1>

          <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={delay(220)}>
            Diseño y desarrollo landing pages, tiendas en línea y sistemas a medida para negocios que necesitan
            algo más que una web bonita: <span className="text-fg">rápida, segura y fácil de mantener</span> — con
            métricas reales que lo demuestran.
          </p>

          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(320)}>
            <Button href="#contacto" magnetic>
              Cuéntame tu proyecto <ArrowIcon />
            </Button>
            <Button href="#proyectos" variant="secondary">
              Ver proyectos
            </Button>
          </div>

          <ul
            className="animate-rise mt-10 grid max-w-xl grid-cols-1 gap-x-6 gap-y-3 text-sm text-muted sm:grid-cols-3"
            style={delay(420)}
            aria-label="Credenciales"
          >
            <li className="border-l border-line-strong pl-3">
              <span className="block text-fg">Full stack</span>React · Kotlin · Python
            </li>
            <li className="border-l border-line-strong pl-3">
              <span className="block text-fg">Ing. de Sistemas</span>Universidad del Quindío
            </li>
            <li className="border-l border-line-strong pl-3">
              <span className="block text-fg">Métricas abiertas</span>Reproducibles en GitHub
            </li>
          </ul>
        </div>

        <div className="animate-rise" style={delay(260)}>
          <HeroConsole />
        </div>
      </div>

      <div className="container-page mt-20 lg:mt-24">
        <p className="eyebrow text-subtle!" data-reveal>
          Tecnologías que uso en proyectos reales
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" data-reveal style={{ '--delay': '80ms' }}>
          {STACK.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
