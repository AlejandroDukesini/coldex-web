// Encabezado de sección editorial: índice + etiqueta en mono, título grande
// (admite nodos para destacar palabras con .text-display) y descripción.
export function SectionHeading({ id, index, eyebrow, title, description, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : ''

  return (
    <div data-reveal className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}>
      <p className="eyebrow inline-flex items-center gap-3">
        {index && <span className="text-subtle">({index})</span>}
        <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-accent to-violet" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-[2.1rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
        {title}
      </h2>
      {description && <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  )
}

// Separador ambiental entre secciones: línea fina con un pulso de luz.
export function Divider({ delay = 0 }) {
  return (
    <div aria-hidden="true" className="container-page">
      <div className="divider" style={{ '--delay': `${delay}s` }} />
    </div>
  )
}
