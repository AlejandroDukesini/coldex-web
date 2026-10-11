import { useEffect, useRef, useState } from 'react'
import { ChevronDown, CircleCheck } from 'lucide-react'
import { SITE } from '../../data/site'
import { PREFILL_EVENT } from '../../lib/device'
import { ArrowIcon, Button } from './Button'

// Debe coincidir con los valores permitidos en server/index.js.
const PROJECT_TYPES = [
  { value: 'landing', label: 'Landing page' },
  { value: 'web', label: 'Sitio web profesional' },
  { value: 'ecommerce', label: 'Tienda en línea' },
  { value: 'app', label: 'Sistema o aplicación a medida' },
  { value: 'otro', label: 'Otro / aún no lo sé' },
]

const BUDGETS = [
  { value: 'por-definir', label: 'Aún no lo tengo claro' },
  { value: 'basico', label: 'Ajustado' },
  { value: 'medio', label: 'Intermedio' },
  { value: 'alto', label: 'Amplio' },
]

const API_URL = `${import.meta.env.VITE_API_URL ?? ''}/api/leads`

const labelOf = (options, value) => options.find((option) => option.value === value)?.label ?? value

function buildMailto({ name, email, projectType, budget, message }) {
  const subject = `Proyecto: ${labelOf(PROJECT_TYPES, projectType)} — ${name}`
  const body = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `¿Qué necesito?: ${labelOf(PROJECT_TYPES, projectType)}`,
    `Presupuesto: ${labelOf(BUDGETS, budget ?? 'por-definir')}`,
    '',
    message,
  ].join('\n')
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const FIELD =
  'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-base text-fg placeholder:text-subtle transition-[border-color,background-color] duration-300 hover:border-line-strong focus:border-accent/70 focus:bg-white/[0.05] focus:outline-none'

export function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | success
  const [projectType, setProjectType] = useState('landing')
  const successRef = useRef(null)

  useEffect(() => {
    const onPrefill = (event) => setProjectType(event.detail.projectType)
    window.addEventListener(PREFILL_EVENT, onPrefill)
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill)
  }, [])

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  // Abre la app de correo del visitante con el mensaje ya redactado para
  // SITE.email. En producción también se registra el contacto en la API
  // (sin bloquear ni mostrar errores si no está disponible).
  const onSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    // Recorta espacios y omite campos opcionales vacíos (la API los rechaza).
    const data = Object.fromEntries(
      [...new FormData(form)].map(([key, value]) => [key, String(value).trim()]).filter(([key, value]) => value || key === 'website'),
    )

    // Honeypot relleno: es un bot. Se finge el éxito sin abrir nada.
    if (!data.website) {
      window.location.href = buildMailto(data)
      if (import.meta.env.PROD) {
        fetch(API_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data),
          keepalive: true,
        }).catch(() => {})
      }
    }

    form.reset()
    setProjectType('landing')
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} className="card flex flex-col items-start p-8 focus:outline-none sm:p-10" role="status">
        <CircleCheck className="size-10 text-accent" aria-hidden="true" />
        <h3 className="mt-5 text-2xl font-semibold">Tu mensaje está listo.</h3>
        <p className="mt-2 leading-relaxed text-muted">
          Se abrió tu aplicación de correo con todo lo que escribiste. Solo pulsa <span className="text-fg">Enviar</span>{' '}
          y te responderé personalmente.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-subtle">
          ¿No se abrió? Escríbeme directamente a{' '}
          <a href={`mailto:${SITE.email}`} className="text-fg underline decoration-line-strong underline-offset-4 hover:text-accent">
            {SITE.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 min-h-11 text-sm text-muted underline decoration-line-strong underline-offset-4 hover:text-fg"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="name">
          <input id="name" name="name" required minLength={2} maxLength={80} autoComplete="name" className={FIELD} placeholder="Tu nombre" />
        </Field>
        <Field label="Correo" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            inputMode="email"
            className={FIELD}
            placeholder="tu@empresa.com"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="¿Qué necesitas?" htmlFor="projectType">
          <Select
            id="projectType"
            name="projectType"
            value={projectType}
            onChange={(event) => setProjectType(event.target.value)}
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type.value} value={type.value} className="bg-surface">
                {type.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Presupuesto" htmlFor="budget" optional>
          <Select
            id="budget"
            name="budget"
            defaultValue="por-definir"
          >
            {BUDGETS.map((budget) => (
              <option key={budget.value} value={budget.value} className="bg-surface">
                {budget.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Cuéntame sobre tu proyecto" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className={`${FIELD} resize-y`}
          placeholder="¿Qué quieres conseguir? ¿Tienes una fecha en mente o una web actual?"
        />
      </Field>

      {/* Honeypot anti-spam: invisible para personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">No rellenar</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-xs leading-relaxed text-subtle sm:max-w-[16rem]">
          Se abrirá tu correo con el mensaje listo. Solo uso tus datos para responderte.
        </p>
        <Button type="submit" magnetic className="w-full sm:w-auto">
          Enviar por correo <ArrowIcon />
        </Button>
      </div>
    </form>
  )
}

function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select {...props} className={`${FIELD} appearance-none pr-10`}>
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  )
}

function Field({ label, htmlFor, optional = false, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-sm font-medium text-fg/90">
        {label}
        {optional && <span className="text-xs font-normal text-subtle">Opcional</span>}
      </label>
      {children}
    </div>
  )
}
