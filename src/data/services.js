// Cada servicio enlaza a los proyectos que lo respaldan (ids de projects.js).

export const SERVICES = [
  {
    icon: 'layout',
    title: 'Landing pages y sitios web',
    description: 'Páginas que explican tu oferta en segundos, cargan rápido en móvil y llevan al visitante a contactarte.',
    points: ['Diseño responsive real, no solo reducido', 'SEO técnico y accesibilidad', 'Animación con propósito'],
    evidence: ['axis-2d', 'casa-renault'],
  },
  {
    icon: 'shop',
    title: 'E-commerce y catálogos',
    description: 'Tiendas y vitrinas con catálogo, búsqueda, carrito y panel para gestionar productos y pedidos.',
    points: ['Catálogo con filtros y búsqueda', 'Roles de administrador y cliente', 'Imágenes optimizadas'],
    evidence: ['valinor', 'casa-renault'],
  },
  {
    icon: 'system',
    title: 'Sistemas a medida',
    description: 'Paneles internos, CRMs y aplicaciones de gestión que se adaptan a cómo trabaja tu equipo.',
    points: ['APIs REST con autenticación JWT', 'Permisos por rol', 'Pruebas automatizadas en CI'],
    evidence: ['maison-noir', 'task-gestor'],
  },
  {
    icon: 'offline',
    title: 'Apps instalables y offline',
    description: 'PWAs y apps de escritorio que funcionan sin conexión y mantienen los datos en el dispositivo.',
    points: ['Arquitectura local-first', 'PWA y escritorio con Tauri', 'Sincronización cifrada'],
    evidence: ['task-gestor'],
  },
  {
    icon: 'ai',
    title: 'Automatización e IA aplicada',
    description: 'Integración de modelos de IA y lógica automática en productos que tu equipo ya usa.',
    points: ['Integración con OpenAI, Gemini y Grok', 'Procesos en tiempo real', 'Backends en Python'],
    evidence: ['ai-snake'],
  },
  {
    icon: 'gauge',
    title: 'Auditoría de rendimiento y seguridad',
    description: 'Mido tu sitio actual, encuentro los cuellos de botella y te entrego un antes y después verificable.',
    points: ['Lighthouse y Core Web Vitals', 'Optimización de imágenes y bundle', 'Revisión de dependencias vulnerables'],
    evidence: ['axis-2d', 'valinor'],
  },
]
