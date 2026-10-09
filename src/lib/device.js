// La clase .lite la añade el script inline de index.html en equipos con pocos
// núcleos/memoria o con ahorro de datos. Desactiva efectos no esenciales.
export const isLiteMode = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('lite')

// Actualiza --mx/--my para el efecto .spotlight de las tarjetas.
export function trackPointer(event) {
  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  target.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  target.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

// Permite que otros componentes (p. ej. Precios) preseleccionen el tipo de
// proyecto en el formulario de contacto.
export const PREFILL_EVENT = 'contact:prefill'

export function prefillContact(projectType) {
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { projectType } }))
}
