import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { HERO_METRICS } from '../../data/metrics'
import { useCountUp } from '../../hooks/useCountUp'
import { isLiteMode } from '../../lib/device'

const ROTATE_MS = 5000
const PIPELINE = ['build', 'measure', 'iterate']

// Consola con métricas verificables de los repositorios (sección «Sobre Coldex»). Rota sola hasta que
// el usuario elige una pestaña; la rotación la marca la propia barra CSS.
export function MetricsConsole() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [manual, setManual] = useState(false)
  const tiltRef = useRef(null)
  const tabRefs = useRef([])

  const metric = HERO_METRICS[index]
  const improvement = useCountUp(metric.improvement)
  const afterRatio = Math.max(metric.after.value / metric.before.value, 0.02)

  const select = (next, focus = false) => {
    const total = HERO_METRICS.length
    const target = (next + total) % total
    setManual(true)
    setIndex(target)
    if (focus) tabRefs.current[target]?.focus()
  }

  const onTabKeyDown = (event) => {
    const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: HERO_METRICS.length - 1 }
    if (!(event.key in keys)) return
    event.preventDefault()
    select(keys[event.key], true)
  }

  useTilt(tiltRef)

  return (
    <div className="[perspective:1200px]">
      <div
        ref={tiltRef}
        className="card overflow-hidden shadow-[0_40px_80px_-40px_rgb(0_0_0/0.85),0_30px_90px_-60px_rgb(76_116_255/0.6)] transition-transform duration-700 ease-(--ease-out-expo) will-change-transform"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <p className="font-mono text-xs text-subtle">measure.log</p>
          <ol className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-wider uppercase" aria-label="Método de trabajo">
            {PIPELINE.map((step, i) => (
              <li key={step} className="flex items-center gap-1.5">
                <span className={step === 'measure' ? 'text-accent' : 'text-subtle'}>{step}</span>
                {i < PIPELINE.length - 1 && <span className="text-subtle/60" aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
        </div>

        <div role="tablist" aria-label="Proyectos medidos" className="grid grid-cols-2 border-b border-line sm:grid-cols-4">
          {HERO_METRICS.map((item, i) => {
            const selected = i === index
            return (
              <button
                key={item.id}
                ref={(el) => (tabRefs.current[i] = el)}
                id={`metric-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="metric-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={onTabKeyDown}
                className={`relative min-h-11 px-3 py-2.5 text-left text-xs transition-colors duration-300 [&:nth-child(odd)]:border-r [&:nth-child(odd)]:border-line sm:border-r sm:border-line sm:last:border-r-0 ${
                  selected ? 'bg-white/[0.03] text-fg' : 'text-subtle hover:text-fg'
                }`}
              >
                {item.project}
                {selected && (
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line-strong">
                    {manual ? (
                      <span className="absolute inset-0 bg-accent" />
                    ) : (
                      <span
                        key={item.id}
                        className="tab-progress absolute inset-0 bg-accent"
                        style={{ '--duration': `${ROTATE_MS}ms` }}
                        data-paused={hovered}
                        onAnimationEnd={() => setIndex((value) => (value + 1) % HERO_METRICS.length)}
                      />
                    )}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div id="metric-panel" role="tabpanel" aria-labelledby={`metric-tab-${metric.id}`} className="p-5 sm:p-7">
          <p className="text-sm text-muted">{metric.label}</p>
          <p className="mt-2 flex items-baseline gap-2 font-mono text-5xl font-medium tracking-tight tabular-nums sm:text-6xl">
            <span className="text-accent">−{improvement.toFixed(1)}</span>
            <span className="text-2xl text-subtle sm:text-3xl">%</span>
          </p>

          <dl className="mt-7 space-y-4">
            <MetricBar label="Antes" value={metric.before.display} ratio={1} muted />
            <MetricBar label="Después" value={metric.after.display} ratio={afterRatio} />
          </dl>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className="font-mono text-[0.7rem] text-subtle">{metric.method}</p>
            <a
              href={metric.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
            >
              Verificar en GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricBar({ label, value, ratio, muted = false }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between font-mono text-xs">
        <dt className="text-subtle">{label}</dt>
        <dd className={muted ? 'text-muted' : 'text-fg'}>{value}</dd>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]" aria-hidden="true">
        <div
          className={`h-full origin-left rounded-full transition-transform duration-1000 ease-(--ease-out-expo) ${
            muted ? 'bg-white/25' : 'bg-accent'
          }`}
          style={{ transform: `scaleX(${ratio})` }}
        />
      </div>
    </div>
  )
}

// Inclinación 3D sutil hacia el cursor (solo ratón, sin modo ligero).
function useTilt(ref) {
  useEffect(() => {
    const el = ref.current
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || !fine || reduced || isLiteMode()) return

    const MAX_DEG = 4
    let frame = 0
    let rx = 0
    let ry = 0
    const apply = () => {
      frame = 0
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      ry = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * MAX_DEG
      rx = -((event.clientY - rect.top) / rect.height - 0.5) * 2 * MAX_DEG
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      rx = 0
      ry = 0
      if (!frame) frame = requestAnimationFrame(apply)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref])
}
