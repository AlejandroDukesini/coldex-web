// Casos de portfolio. Problema/solución/resultados están resumidos de los
// README de cada repositorio; los resultados son solo cifras medidas allí.
// Las imágenes se generan con `npm run optimize:images` desde assets-src/.

export const FEATURED_PROJECTS = [
  {
    id: 'task-gestor',
    title: 'Plan Gestor Task',
    kind: 'Producto local-first · Web, PWA y Windows',
    image: 'task-gestor',
    imageAlt: 'Panel principal de Plan Gestor Task con tareas pendientes, hábitos activos y gráfico de productividad',
    summary: 'Tareas, hábitos, calendario, objetivos, finanzas y notas en una sola app que funciona sin conexión.',
    problem:
      'La información personal acaba repartida entre varias apps en la nube, sin control sobre dónde viven los datos.',
    solution:
      'Arquitectura local-first: los datos viven en IndexedDB, la app funciona offline y la sincronización es cifrada y opcional. Se distribuye como web, PWA instalable y app de escritorio con Tauri 2.',
    results: [
      'Lighthouse 100 en Accesibilidad, SEO y Buenas prácticas',
      'Consulta de tareas: 7.56 ms → 0.596 ms (−92.1 %)',
      '475 pruebas automatizadas en el cliente',
    ],
    stack: ['React', 'TypeScript', 'IndexedDB', 'PWA', 'Tauri 2', 'Vitest'],
    demo: 'https://task-gestor.netlify.app/',
    repo: 'https://github.com/AlejandroDukesini/Personal_Task_Gestor',
  },
  {
    id: 'maison-noir',
    title: 'Maison Noir',
    kind: 'Sistema full-stack para restaurantes',
    image: 'maison-noir',
    imageAlt: 'Panel de administración de Maison Noir con la gestión de mesas por zona, capacidad y posición',
    summary:
      'Operación de restaurante: meseros toman pedidos por mesa, cocina ve la cola con recetas y administración gestiona todo.',
    problem:
      'Piso, cocina y administración tienen que coordinarse sin que ningún rol vea o modifique lo que no le corresponde.',
    solution:
      'API REST en Kotlin y Spring Boot con JWT y control de acceso por rol, aislamiento de datos entre restaurantes y un SPA en React para cada equipo.',
    results: [
      '159 pruebas automatizadas (115 backend · 44 frontend) en CI',
      'Endpoint más pesado: 157 → 3 consultas SQL (−98 %)',
    ],
    stack: ['Kotlin', 'Spring Boot', 'PostgreSQL', 'JWT · RBAC', 'React', 'GitHub Actions'],
    demo: 'https://rest-aurantapp.netlify.app/',
    repo: 'https://github.com/AlejandroDukesini/Restaurant_reservations',
  },
  {
    id: 'axis-2d',
    title: 'AXIS 2D',
    kind: 'Landing animada para concesionario',
    image: 'axis-2d',
    imageAlt: 'Hero de AXIS 2D: la palabra SOVEREIGN atravesada por un automóvil blanco visto desde arriba',
    summary:
      'Landing con narrativa guiada por scroll, parallax con cursor y microinteracciones para un concesionario multimarca.',
    problem:
      'Una landing comercial debe impresionar en los primeros segundos sin castigar la carga en móviles de gama media.',
    solution:
      'Animación con Framer Motion limitada a transform y opacity, secciones bajo el fold cargadas de forma diferida y un pipeline reproducible de imágenes WebP.',
    results: [
      'Peso de página en móvil: 821 → 237 KiB (−71.1 %)',
      'JavaScript crítico: 299.79 → 12.32 KB (−95.9 %)',
      'Imágenes: 659.8 → 65.5 KB (−90.1 %)',
    ],
    stack: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'sharp'],
    demo: 'https://axis2d.netlify.app/',
    repo: 'https://github.com/AlejandroDukesini/AXIS-2D-SCROLL-ANIMATION',
  },
  {
    id: 'casa-renault',
    title: 'Casa Renault',
    kind: 'Catálogo y vitrina comercial',
    image: 'casa-renault',
    imageAlt:
      'Página de inicio de Casa Renault con el titular «Piezas originales al mejor precio» y un buscador de repuestos',
    summary:
      'Frontend del catálogo de un distribuidor de repuestos en Armenia, Quindío, con buscador por marca y categoría.',
    problem: 'Un catálogo de repuestos multimarca tiene que ser fácil de buscar y cargar rápido en cualquier dispositivo.',
    solution:
      'SPA en React con rutas cargadas bajo demanda, buscador por marca y categoría, hero que respeta prefers-reduced-motion y contacto directo por WhatsApp.',
    results: ['Accesibilidad Lighthouse en móvil: 84 → 96', 'Performance en escritorio: 37 → 70–75'],
    stack: ['React', 'Vite', 'React Router', 'Tailwind CSS', 'Netlify'],
    demo: 'https://casa-renault.netlify.app/',
    repo: 'https://github.com/AlejandroDukesini/CASA-RENAULT',
  },
  {
    id: 'valinor',
    title: 'Ludoteca Valinor',
    kind: 'E-commerce de cartas TCG y juegos de mesa',
    image: 'valinor',
    imageAlt: 'Página de inicio de Ludoteca Valinor con el titular «La bóveda de Valinor» sobre un fondo medieval',
    summary: 'Tienda en línea con catálogo, carrito y panel de administración para una ludoteca en Cartago, Costa Rica.',
    problem: 'Una identidad visual cargada (fondos ilustrados, tipografía temática) suele significar una web lenta.',
    solution:
      'Conversión de assets a WebP redimensionado, code splitting por ruta, vendor chunks cacheables y dimensiones explícitas en cada imagen para evitar saltos de layout.',
    results: [
      'Lighthouse escritorio: 100 en Performance',
      'Móvil: 100 en Accesibilidad, SEO y Buenas prácticas · CLS 0',
      'Fondo principal: 4.8 MB → 170 KB (−96.5 %)',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Axios'],
    demo: 'https://ludovalinor.netlify.app/',
    repo: 'https://github.com/AlejandroDukesini/LUDOTECA-VALINOR',
  },
  {
    id: 'ai-snake',
    title: 'Snake IA',
    kind: 'IA por neuroevolución en tiempo real',
    image: null, // Sin captura: se muestra una ilustración de la red neuronal.
    imageAlt: '',
    summary:
      'Una IA que aprende a jugar Snake sin datos ni gradientes, solo con selección natural, y lo transmite en vivo al navegador.',
    problem:
      'Demostrar que una IA aprende de verdad exige medir su progreso con reglas objetivas, no solo mostrar que juega.',
    solution:
      'Red recurrente 26 → 20 → 3 evolucionada con un algoritmo genético. Backend autoritativo en Python/NumPy y cliente React conectado por WebSockets.',
    results: ['≈ 4 000 pasos de simulación por segundo', 'Streaming estable a 20 fps', 'Lighthouse escritorio 100/100'],
    stack: ['Python', 'NumPy', 'FastAPI', 'WebSockets', 'React', 'Tailwind v4'],
    // La demo pública no conecta con el backend de Python en este momento.
    // Cuando vuelva a funcionar: demo: 'https://ai-snake-nine.vercel.app'
    demo: null,
    repo: 'https://github.com/AlejandroDukesini/AI-SNAKE',
  },
]

export const MORE_PROJECTS = [
  {
    title: 'DepGuard',
    description: 'CLI asíncrona de DevSecOps que busca CVEs en requirements.txt y package.json usando la API de OSV.dev.',
    stack: 'Python · asyncio · httpx',
    url: 'https://github.com/AlejandroDukesini/Devs-Guard',
  },
  {
    title: 'Bot de Discord multi-IA',
    description: 'Integra ChatGPT, Gemini y Grok con cambio dinámico de proveedor y generación de imágenes con DALL·E 3.',
    stack: 'Python · discord.py',
    url: 'https://github.com/AlejandroDukesini/DC-CHATBOT',
  },
  {
    title: 'PROEDU CRM',
    description: 'Gestión de trabajos freelance: estados de entrega, pagos, adelantos y contabilidad.',
    stack: 'Python · Flask · SQL',
    url: 'https://github.com/AlejandroDukesini/CRM-Duke',
  },
  {
    title: 'XGoals AI',
    description: 'Análisis de partidos de fútbol con modelos de Poisson/Dixon-Coles y matriz DOFA cruzada.',
    stack: 'Python · ciencia de datos',
    url: 'https://github.com/AlejandroDukesini/XGoals-AI',
  },
  {
    title: 'USB Music',
    description:
      'Servidor de música portátil en una USB: interfaz web local controlable desde cualquier dispositivo de la red.',
    stack: 'Fastify · SQLite · WebSocket · React',
    url: 'https://github.com/AlejandroDukesini/USB-MUSIC',
  },
  {
    title: 'Lix',
    description:
      'Regalo digital instalable y 100 % local: narrativa astronómica guiada por scroll y funcionamiento offline.',
    stack: 'React · PWA · Vitest · Playwright',
    url: 'https://github.com/AlejandroDukesini/Lix-web',
  },
]
