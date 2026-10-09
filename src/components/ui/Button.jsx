import { useMagnetic } from '../../hooks/useMagnetic'

const BASE =
  'group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-300 ease-(--ease-out-quart) will-change-transform disabled:cursor-not-allowed disabled:opacity-60'

const VARIANTS = {
  primary:
    'bg-accent text-accent-ink shadow-[0_0_0_1px_rgb(0_245_212/0.4),0_10px_30px_-12px_rgb(0_245_212/0.55)] hover:bg-[#5cf8e3] hover:shadow-[0_0_0_1px_rgb(0_245_212/0.6),0_14px_40px_-12px_rgb(0_245_212/0.7)]',
  secondary: 'border border-line-strong bg-white/[0.03] text-fg hover:border-white/30 hover:bg-white/[0.06]',
}

// Botón o enlace con el mismo aspecto. `magnetic` añade la atracción al cursor.
export function Button({ href, variant = 'primary', magnetic = false, className = '', children, ...props }) {
  const magneticRef = useMagnetic(0.22)
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`
  const ref = magnetic ? magneticRef : undefined

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} className={classes} {...props}>
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
