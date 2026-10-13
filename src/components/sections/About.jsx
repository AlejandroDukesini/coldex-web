import { Award, FileText, FlaskConical, Gauge, GraduationCap, MapPin, ShieldCheck } from 'lucide-react'
import { SITE } from '../../data/site'
import { trackPointer } from '../../lib/device'
import { MetricsConsole } from '../ui/MetricsConsole'

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

// Capas de un producto que MabuDev cubre de punta a punta (texto del párrafo original).
const LAYERS = ['Interfaz', 'API', 'Base de datos', 'Seguridad', 'Rendimiento']

// Titular partido en palabras para encenderlas una a una; `em` marca las destacadas.
const STATEMENT = [
  ['Trato'],
  ['el'],
  ['código'],
  ['como'],
  ['un', 'em'],
  ['sistema,', 'em'],
  ['no'],
  ['como'],
  ['una'],
  ['lista'],
  ['de'],
  ['funciones.'],
]

export function About() {
  return (
    <section id="sobre-mabudev" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute top-0 left-1/2 -z-10 h-[40rem] w-[min(80rem,160vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(76_116_255/0.1),transparent)]"
      />

      <div className="container-page">
        {/* Qué es MabuDev: etiqueta + titular editorial a gran escala. */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-3">
            <p className="eyebrow inline-flex items-center gap-3">
              <span className="text-subtle">(02)</span>
              <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-accent to-violet" />
              Qué es {SITE.brand}
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              <span className="text-fg">{SITE.brand}</span> es la marca de {SITE.name}, {SITE.role.toLowerCase()}:
              landing pages, tiendas en línea y sistemas web a medida.
            </p>
          </div>

          <h2
            id="about-title"
            data-reveal="words"
            className="text-[2.2rem] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-6xl lg:col-span-9 lg:text-[5.2rem]"
          >
            {STATEMENT.map(([word, em], i) => (
              <span key={i}>
                <span className={`word ${em ? 'text-display text-chrome' : ''}`} style={{ '--i': i }}>
                  {word}
                </span>{' '}
              </span>
            ))}
          </h2>
        </div>

        {/* Capas que cubre: interfaz → API → datos → seguridad → rendimiento. */}
        <ol
          data-reveal
          aria-label="Capas de un producto que desarrollo"
          className="mt-14 grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-5 lg:mt-20"
          style={{ '--delay': '120ms' }}
        >
          {LAYERS.map((layer, index) => (
            <li
              key={layer}
              className="group relative flex items-baseline gap-3 bg-bg px-3 py-5 last:col-span-2 sm:px-4 sm:last:col-span-1 lg:px-5"
            >
              <span className="font-mono text-[0.65rem] text-subtle">L{index + 1}</span>
              <span className="text-base font-medium sm:text-lg">{layer}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-violet transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-x-100"
              />
            </li>
          ))}
        </ol>

        {/* Historia + ficha a la izquierda; evidencia medible a la derecha. */}
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div data-reveal className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Soy Alejandro, desarrollador full stack y estudiante de Ingeniería de Sistemas y Computación en la
                Universidad del Quindío. Trabajo en todo el recorrido de un producto:{' '}
                <span className="text-fg">
                  la interfaz que ve tu cliente, la API que la sostiene, la base de datos, la seguridad y el
                  rendimiento.
                </span>
              </p>
              <p>
                Mi método cabe en tres palabras:{' '}
                <span className="font-mono text-base text-accent">construir → medir → iterar</span>. No te voy a decir
                que tu web «es rápida»: te mostraré cuánto pesa, cuánto tarda en cargar y qué mejoró, con cifras que
                puedes comprobar tú mismo en cada repositorio.
              </p>
              <p>
                Me interesan los proyectos donde la tecnología resuelve un problema concreto: un negocio que necesita
                vender en línea, un equipo que pierde tiempo coordinándose o una idea que tiene que llegar al mercado
                bien hecha desde el principio.
              </p>
            </div>

            <ProfileCard />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div data-reveal className="lg:sticky lg:top-28" style={{ '--delay': '100ms' }}>
              <p className="mb-4 flex items-center justify-between font-mono text-[0.7rem] tracking-wider text-subtle uppercase">
                <span>Evidencia · antes / después</span>
                <span className="text-accent">medido</span>
              </p>
              <MetricsConsole />
            </div>
          </div>
        </div>

        {/* Principios de trabajo. */}
        <ul className="mt-20 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {PRINCIPLES.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              data-reveal
              onPointerMove={trackPointer}
              className="spotlight group relative bg-surface p-6 sm:p-7"
              style={{ '--delay': `${index * 70}ms` }}
            >
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-accent transition-transform duration-500 ease-(--ease-out-expo) group-hover:-translate-y-0.5" aria-hidden="true" />
                <span className="font-mono text-[0.65rem] text-subtle">0{index + 1}</span>
              </div>
              <h3 className="mt-10 text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Ficha personal: foto real si existe SITE.photo; si no, un monograma fácil de sustituir.
function ProfileCard() {
  return (
    <div data-reveal className="card mt-10 flex items-center gap-5 overflow-hidden p-4 sm:p-5" style={{ '--delay': '80ms' }}>
      {SITE.photo ? (
        <img
          src={SITE.photo}
          alt={`Retrato de ${SITE.fullName}`}
          width="640"
          height="640"
          loading="lazy"
          decoding="async"
          className="size-24 shrink-0 rounded-xl object-cover"
        />
      ) : (
        <div className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-surface-2">
          <div aria-hidden="true" className="grid-backdrop absolute inset-0 opacity-70" />
          <span aria-hidden="true" className="relative font-mono text-3xl font-medium tracking-tighter">
            A<span className="text-accent">D</span>
          </span>
        </div>
      )}
      <div className="min-w-0">
        <p className="font-semibold">{SITE.fullName}</p>
        <p className="text-sm text-muted">
          {SITE.role} · {SITE.brand}
        </p>
        <ul className="mt-3 space-y-1.5">
          {FACTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex gap-2 text-xs leading-snug text-muted">
              <Icon className="mt-px size-3.5 shrink-0 text-accent" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
