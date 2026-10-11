import { useMagnetic } from '../../hooks/useMagnetic'
import { trackPointer } from '../../lib/device'

const BASE =
  'btn group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium whitespace-nowrap will-change-transform disabled:cursor-not-allowed disabled:opacity-60'

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
}

// Botón o enlace con el mismo aspecto. El reflejo (primario) y el borde
// luminoso (secundario) siguen al cursor vía --mx/--my, sin re-renderizar.
// `magnetic` añade la atracción al cursor.
export function Button({ href, variant = 'primary', magnetic = false, className = '', onPointerMove, children, ...props }) {
  const magneticRef = useMagnetic(0.22)
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`
  const ref = magnetic ? magneticRef : undefined
  const handleMove = (event) => {
    trackPointer(event)
    onPointerMove?.(event)
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} onPointerMove={handleMove} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} className={classes} onPointerMove={handleMove} {...props}>
      {children}
    </button>
  )
}

// Flecha que se desplaza al pasar el cursor por el botón que la contiene.
export function ArrowIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover/btn:translate-x-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}
