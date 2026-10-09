// Limitador en memoria (ventana fija) suficiente para un único proceso.
// Si el sitio se escala a varias instancias, cambiarlo por Redis u otro almacén compartido.
export function createRateLimiter({ windowMs, max }) {
  const hits = new Map()

  return function isLimited(key) {
    const now = Date.now()
    const entry = hits.get(key)

    if (!entry || now > entry.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs })
      return false
    }

    entry.count += 1
    return entry.count > max
  }
}
