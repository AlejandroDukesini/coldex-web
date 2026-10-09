import { GraduationCap, MapPin, ShieldCheck, Gauge, FlaskConical, FileText, Award } from 'lucide-react'
import { SITE } from '../../data/site'

const PRINCIPLES = [
  {
    icon: FlaskConical,
    title: 'Medir antes de afirmar',
    text: 'Si digo que algo es rápido, te enseño el número y cómo reproducirlo.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad desde el diseño',
    text: 'Autenticación, permisos por rol y dependencias revisadas desde el primer día.',
  },
  {
    icon: Gauge,
    title: 'Rendimiento como requisito',
    text: 'Una web lenta pierde clientes. La velocidad no es un extra, es parte del encargo.',
  },
  {
    icon: FileText,
    title: 'Todo queda documentado',
    text: 'Recibes un proyecto que otra persona puede entender, mantener y ampliar.',
  },
]

const FACTS = [
  { icon: MapPin, label: SITE.location },
  { icon: GraduationCap, label: SITE.education },
  { icon: Award, label: SITE.certification },
]

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <aside data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="card overflow-hidden">
            <Portrait />
            <div className="p-6">
              <p className="text-lg font-semibold">{SITE.fullName}</p>
              <p className="text-sm text-muted">
                {SITE.role} · {SITE.brand}
              </p>
              <ul className="mt-5 space-y-3 border-t border-line pt-5">
                {FACTS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex gap-3 text-sm text-muted">
                    <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div>
          <div data-reveal>
            <p className="eyebrow">Sobre mí</p>
            <h2 id="about-title" className="mt-4 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[2.75rem]">
              Trato el código como un sistema, no como una lista de funciones.
            </h2>
          </div>

          <div data-reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted" style={{ '--delay': '80ms' }}>
            <p>
              Soy Alejandro, desarrollador full stack y estudiante de Ingeniería de Sistemas y Computación en la
              Universidad del Quindío. Trabajo en todo el recorrido de un producto:{' '}
              <span className="text-fg">
                la interfaz que ve tu cliente, la API que la sostiene, la base de datos, la seguridad y el rendimiento.
              </span>
            </p>
            <p>
              Mi método cabe en tres palabras: <span className="font-mono text-base text-accent">construir → medir → iterar</span>.
              No te voy a decir que tu web «es rápida»: te mostraré cuánto pesa, cuánto tarda en cargar y qué mejoró,
              con cifras que puedes comprobar tú mismo en cada repositorio.
            </p>
            <p>
              Me interesan los proyectos donde la tecnología resuelve un problema concreto: un negocio que necesita
              vender en línea, un equipo que pierde tiempo coordinándose o una idea que tiene que llegar al mercado bien
              hecha desde el principio.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(({ icon: Icon, title, text }, index) => (
              <li key={title} data-reveal className="card p-5" style={{ '--delay': `${index * 70}ms` }}>
                <Icon className="size-5 text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-medium">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// Foto real si existe SITE.photo; si no, un monograma elegante y fácil de sustituir.
function Portrait() {
  if (SITE.photo) {
    return (
      <img
        src={SITE.photo}
        alt={`Retrato de ${SITE.fullName}`}
        width="640"
        height="640"
        loading="lazy"
        decoding="async"
        className="aspect-square w-full object-cover"
      />
    )
  }

  return (
    <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border-b border-line bg-surface-2 lg:aspect-square">
      <div aria-hidden="true" className="grid-backdrop absolute inset-0 opacity-60" />
      <span aria-hidden="true" className="relative font-mono text-7xl font-medium tracking-tighter text-fg/90">
        A<span className="text-accent">D</span>
      </span>
      <span className="absolute bottom-4 left-4 font-mono text-[0.65rem] tracking-wider text-subtle uppercase">
        {'// '}{SITE.location}
      </span>
    </div>
  )
}
