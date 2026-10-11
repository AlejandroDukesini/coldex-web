import { useEffect, useRef, useState } from 'react'
import { ChevronDown, CircleCheck } from 'lucide-react'
import { SITE } from '../../data/site'
import { PREFILL_EVENT } from '../../lib/device'
import { WhatsAppIcon } from './BrandIcons'
import { ArrowIcon, Button } from './Button'

// Debe coincidir con los valores permitidos en server/index.js.
const PROJECT_TYPES = [
  { value: 'regalo', label: 'Página de regalo (sin fines comerciales)' },
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

// Resumen legible del formulario: cuerpo del correo y texto que se copia
// para pegarlo en WhatsApp. Omite los campos que aún estén vacíos.
function buildSummary({ name, email, projectType, budget, message }) {
  return [
    name && `Nombre: ${name}`,
    email && `Correo: ${email}`,
    `¿Qué necesito?: ${labelOf(PROJECT_TYPES, projectType)}`,
    `Presupuesto: ${labelOf(BUDGETS, budget || 'por-definir')}`,
    message && `\n${message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function buildMailto(data) {
  const subject = `Proyecto: ${labelOf(PROJECT_TYPES, data.projectType)} — ${data.name}`
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildSummary(data))}`
}

const readForm = (form) =>
  Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, String(value).trim()]))

const FIELD =
  'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-base text-fg placeholder:text-subtle transition-[border-color,background-color] duration-300 hover:border-line-strong focus:border-accent/70 focus:bg-white/[0.05] focus:outline-none'

export function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | success
  const [projectType, setProjectType] = useState('landing')
  const [waNote, setWaNote] = useState('')
  const successRef = useRef(null)
  const formRef = useRef(null)

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
    const data = Object.fromEntries(Object.entries(readForm(form)).filter(([key, value]) => value || key === 'website'))

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
    setWaNote('')
    setStatus('success')
  }

  // WhatsApp no recibe texto con este tipo de enlace: si ya hay un mensaje
  // escrito, se copia al portapapeles para pegarlo en el chat.
  const onWhatsApp = () => {
    const data = formRef.current ? readForm(formRef.current) : {}
    if (!data.message) {
      setWaNote('')
      return
    }
    navigator.clipboard
      ?.writeText(buildSummary(data))
      .then(() => setWaNote('Copiamos tu mensaje: pégalo en el chat de WhatsApp.'))
      .catch(() => setWaNote(''))
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
          ¿No se abrió? Escríbeme por{' '}
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="text-fg underline decoration-line-strong underline-offset-4 hover:text-[#25d366]">
            WhatsApp
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>{' '}
          o directamente a{' '}
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
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8" aria-describedby="form-note">
      {/* Atajo visible desde el principio para quien prefiere WhatsApp. */}
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noreferrer"
        onClick={onWhatsApp}
        className="group flex items-center gap-4 rounded-2xl border border-[#25d366]/30 bg-[#25d366]/[0.07] p-4 transition-colors duration-300 hover:border-[#25d366]/60 hover:bg-[#25d366]/[0.12]"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#25d366] text-[#04140b]">
          <WhatsAppIcon className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium">¿Prefieres WhatsApp?</span>
          <span className="block text-sm text-muted">Escríbeme directamente al chat, sin llenar el formulario.</span>
        </span>
        <ArrowIcon className="shrink-0 text-[#25d366]" />
        <span className="sr-only">(se abre en una pestaña nueva)</span>
      </a>

      <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-wider text-subtle uppercase" aria-hidden="true">
        <span className="h-px flex-1 bg-line" /> o por correo <span className="h-px flex-1 bg-line" />
      </p>

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

      <div className="space-y-3 pt-1">
        <p className="text-sm font-medium text-fg/90">¿Cómo quieres enviarlo?</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="submit" className="w-full">
            Enviar por correo <ArrowIcon />
          </Button>
          <Button href={SITE.whatsapp} target="_blank" rel="noreferrer" variant="whatsapp" className="w-full" onClick={onWhatsApp}>
            <WhatsAppIcon className="size-5" /> Enviar por WhatsApp
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </Button>
        </div>
        <p aria-live="polite" className="min-h-5 text-sm text-[#5fe39a]">
          {waNote}
        </p>
        <p id="form-note" className="text-xs leading-relaxed text-subtle">
          Por correo se abre tu aplicación con el mensaje listo. Por WhatsApp, si ya escribiste tu mensaje, lo
          copiamos para que lo pegues en el chat. Solo uso tus datos para responderte.
        </p>
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
