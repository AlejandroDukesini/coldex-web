import { Check } from 'lucide-react'
import { PRICING_CURRENCY, PRICING_NOTE, PRICING_PLANS } from '../../data/pricing'
import { prefillContact, trackPointer } from '../../lib/device'
import { ArrowIcon, Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

const PLACEHOLDER = 'XXX'

export function Pricing() {
  return (
    <section id="precios" aria-labelledby="pricing-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="pricing-title"
          align="center"
          eyebrow="Inversión"
          title="Precios claros desde el principio."
          description="Tres puntos de partida para que sepas qué esperar. El precio final depende del alcance y siempre lo acordamos antes de empezar."
        />

        <ul className="mx-auto mt-14 grid max-w-md gap-5 lg:max-w-none lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <li
              key={plan.id}
              data-reveal
              onPointerMove={trackPointer}
              style={{ '--delay': `${index * 80}ms` }}
              className={`card spotlight flex flex-col p-7 sm:p-8 ${
                plan.highlighted
                  ? 'border-accent/40 shadow-[0_0_0_1px_rgb(0_245_212/0.15),0_30px_60px_-30px_rgb(0_245_212/0.35)]'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[0.65rem] tracking-wider text-accent uppercase">
                    Recomendado
                  </span>
                )}
              </div>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted">{plan.description}</p>

              <Price plan={plan} />

              <ul className="mt-7 space-y-3 border-t border-line pt-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-fg/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Button
                  href="#contacto"
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="w-full"
                  onClick={() => prefillContact(plan.projectType)}
                >
                  {plan.cta} <ArrowIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <p data-reveal className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
          {PRICING_NOTE}
        </p>
      </div>
    </section>
  )
}

function Price({ plan }) {
  const isPlaceholder = String(plan.price) === PLACEHOLDER
  // En desarrollo, los precios sin rellenar se resaltan para no olvidarlos.
  const flagged = isPlaceholder && import.meta.env.DEV

  return (
    <div className={`mt-6 ${flagged ? 'rounded-xl border border-dashed border-amber-400/60 p-3' : ''}`}>
      <p className="flex items-baseline gap-2">
        <span className="text-sm text-subtle">{plan.prefix}</span>
        <span className="text-4xl font-semibold tracking-tight tabular-nums">${plan.price}</span>
        <span className="font-mono text-xs text-subtle">{PRICING_CURRENCY}</span>
      </p>
      {flagged && (
        <p className="mt-2 font-mono text-[0.65rem] text-amber-300">Editable · src/data/pricing.js</p>
      )}
    </div>
  )
}
