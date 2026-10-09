export function SectionHeading({ id, eyebrow, title, description, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : ''

  return (
    <div data-reveal className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  )
}
