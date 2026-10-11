// Datos personales y de contacto. Todo lo que aparece aquí está tomado de
// github.com/AlejandroDukesini (perfil, bio y README). Edita con libertad.

export const SITE = {
  brand: 'Coldex',
  name: 'Alejandro Duke',
  fullName: 'Alejandro Rodríguez Duque',
  role: 'Desarrollador Full Stack',
  location: 'Colombia',
  education: 'Ingeniería de Sistemas y Computación · Universidad del Quindío',
  certification: 'Programador certificado por Harvard (2021)',
  email: 'alejandrinoduke@gmail.com',
  github: 'https://github.com/AlejandroDukesini',
  linkedin: 'https://www.linkedin.com/in/coldex-co/',
  // Enlace de mensaje de WhatsApp Business: abre el chat con el texto que se
  // configuró en la app (este tipo de enlace no admite texto adicional).
  whatsapp: 'https://wa.me/message/PN7EW4767OM6C1',
  instagram: 'https://www.instagram.com/coldex.co/',
  tiktok: 'https://www.tiktok.com/@coldex.co',
  facebook: 'https://www.facebook.com/marketplace/profile/100087299022084/',
  // Foto personal: coloca tu imagen en /public/me.webp (cuadrada, ≥ 640 px)
  // y cambia este valor a '/me.webp'. Mientras sea null se muestra un monograma.
  photo: null,
}

// Redes que aparecen en Contacto y en el pie (en este orden). `icon` es la
// clave del icono en components/ui/BrandIcons.jsx.
export const SOCIAL_LINKS = [
  { id: 'whatsapp', label: 'WhatsApp', handle: 'Coldex', href: SITE.whatsapp },
  { id: 'instagram', label: 'Instagram', handle: '@coldex.co', href: SITE.instagram },
  { id: 'tiktok', label: 'TikTok', handle: '@coldex.co', href: SITE.tiktok },
  { id: 'facebook', label: 'Facebook', handle: 'Coldex', href: SITE.facebook },
  { id: 'linkedin', label: 'LinkedIn', handle: 'coldex-co', href: SITE.linkedin },
  { id: 'github', label: 'GitHub', handle: 'AlejandroDukesini', href: SITE.github },
]

export const NAV_LINKS = [
  { id: 'precios', label: 'Precios' },
  { id: 'sobre-coldex', label: 'Coldex' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'proceso', label: 'Proceso' },
]

// Tecnologías con evidencia en al menos un repositorio público.
export const STACK = [
  'React',
  'Vite',
  'Tailwind CSS',
  'JavaScript',
  'TypeScript',
  'Node.js · Fastify',
  'Kotlin · Spring Boot',
  'Python · FastAPI',
  'PostgreSQL',
  'SQLite',
  'IndexedDB · PWA',
  'Tauri',
  'Vitest',
  'GitHub Actions',
]
