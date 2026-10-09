import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { SITE } from '../../data/site'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { ContactForm } from '../ui/ContactForm'

const STEPS = ['Me cuentas tu idea', 'Te respondo con preguntas o una propuesta', 'Decidimos juntos si avanzamos']

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="hero-glow absolute bottom-[-18rem] left-1/2 -z-10 h-[36rem] w-[min(64rem,140vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(0_245_212/0.1),transparent)]"
      />

      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div data-reveal>
          <p className="eyebrow">Contacto</p>
          <h2 id="contact-title" className="mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
            ¿Tienes una idea?
            <span className="block text-muted">
              Hagamos que <span className="text-accent">funcione.</span>
            </span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            No necesitas tenerlo todo definido. Cuéntame qué quieres conseguir y te ayudo a darle forma, sin
            compromiso.
          </p>

          <ol className="mt-10 space-y-4">
            {STEPS.map((step, index) => (
              <li key={step} className="flex items-center gap-4 text-fg/90">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line font-mono text-xs text-accent">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-12 border-t border-line pt-8">
            <p className="text-sm text-subtle">¿Prefieres escribir directamente?</p>
            <CopyEmail />
            <div className="mt-4 flex gap-2">
              <SocialLink href={SITE.linkedin} label="LinkedIn">
                <LinkedInIcon className="size-4" />
              </SocialLink>
              <SocialLink href={SITE.github} label="GitHub">
                <GitHubIcon className="size-4" />
              </SocialLink>
            </div>
          </div>
        </div>

        <div data-reveal style={{ '--delay': '120ms' }}>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${SITE.email}`
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${SITE.email}`}
        className="inline-flex min-h-11 items-center gap-2.5 text-lg font-medium break-all transition-colors hover:text-accent"
      >
        <Mail className="size-5 shrink-0 text-accent" aria-hidden="true" />
        {SITE.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-3.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
      >
        {copied ? <Check className="size-3.5 text-accent" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
        <span aria-live="polite">{copied ? 'Copiado' : 'Copiar'}</span>
      </button>
    </div>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {children}
      {label}
      <span className="sr-only">(se abre en una pestaña nueva)</span>
    </a>
  )
}
