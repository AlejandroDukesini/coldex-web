// Proceso de trabajo, basado en el lema de su perfil: BUILD → MEASURE → ITERATE.

export const PROCESS_STEPS = [
  {
    title: 'Entender',
    description:
      'Hablamos de tu negocio, tus clientes y qué tiene que pasar para que el proyecto valga la pena. Definimos juntos el alcance y lo que queda fuera.',
    output: 'Alcance y objetivos por escrito',
  },
  {
    title: 'Diseñar la solución',
    description:
      'Elijo la arquitectura y la tecnología que encajan con el problema, no con la moda, y te explico cada decisión en lenguaje claro.',
    output: 'Propuesta técnica y presupuesto',
  },
  {
    title: 'Construir',
    description:
      'Desarrollo por entregas que puedes ver y probar. Código limpio, componentes reutilizables y pruebas en lo que es crítico.',
    output: 'Versiones navegables durante el desarrollo',
  },
  {
    title: 'Medir',
    description:
      'Antes de decir que algo es rápido, lo mido: Lighthouse, Core Web Vitals, peso de página y consultas a la base de datos.',
    output: 'Informe de métricas antes y después',
  },
  {
    title: 'Iterar',
    description:
      'Con los datos en la mano corrijo lo que frena la experiencia: imágenes, JavaScript, accesibilidad y consultas lentas.',
    output: 'Mejoras verificables, no estimadas',
  },
  {
    title: 'Lanzar y documentar',
    description:
      'Publico el proyecto y te entrego documentación para que cualquiera pueda mantenerlo, reproducir las métricas y seguir creciendo.',
    output: 'Sitio en producción y documentación',
  },
]
