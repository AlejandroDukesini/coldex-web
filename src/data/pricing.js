// ─────────────────────────────────────────────────────────────────────────
//  PRECIOS — EDITA AQUÍ
//  Precios en pesos colombianos, con punto de miles (p. ej. '100.000').
//  Si algún precio vuelve a ser 'XXX', en `npm run dev` aparece marcado
//  como «editable» para que no se te escape ninguno.
// ─────────────────────────────────────────────────────────────────────────

export const PRICING_CURRENCY = 'COP'

export const PRICING_PLANS = [
  {
    id: 'landing',
    name: 'Landing page',
    price: '100.000',
    prefix: 'Desde',
    description: 'Una página enfocada en presentar tu oferta y convertir visitas en contactos.',
    features: [
      'Diseño a medida, responsive y accesible',
      'Hasta 6 secciones con animaciones sutiles',
      'Formulario de contacto conectado',
      'SEO técnico y metadatos para redes',
      'Informe Lighthouse antes de entregar',
    ],
    cta: 'Quiero una landing',
    projectType: 'landing',
    highlighted: false,
  },
  {
    id: 'web',
    name: 'Web profesional',
    price: '400.000',
    prefix: 'Desde',
    description: 'Un sitio completo o tienda en línea para un negocio que necesita crecer en digital.',
    features: [
      'Varias páginas o catálogo de productos',
      'Panel para gestionar contenido o pedidos',
      'Optimización de imágenes y rendimiento',
      'Integraciones (WhatsApp, pagos, analítica)',
      'Documentación de uso y mantenimiento',
    ],
    cta: 'Hablemos de tu web',
    projectType: 'web',
    highlighted: true,
  },
  {
    id: 'custom',
    name: 'Proyecto a medida',
    price: '450.000',
    prefix: 'Desde',
    description: 'Sistemas, paneles internos o aplicaciones con lógica de negocio propia.',
    features: [
      'Backend con API, base de datos y roles',
      'Autenticación y permisos por usuario',
      'Pruebas automatizadas en lo crítico',
      'Despliegue y entregas por fases',
      'Arquitectura pensada para escalar',
    ],
    cta: 'Cuéntame tu idea',
    projectType: 'app',
    highlighted: false,
  },
]

export const PRICING_NOTE =
  'Cada proyecto es distinto: después de una primera conversación te envío una propuesta con alcance, plazos y precio cerrado.'
