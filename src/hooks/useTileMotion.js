import { useEffect, useRef } from 'react'
import { isLiteMode } from '../lib/device'

const lerp = (a, b, t) => a + (b - a) * t

// Inclinación 3D, parallax de la imagen y luz de una pieza del portafolio.
// Escribe --rx/--ry (grados), --ix/--iy (px) y --mx/--my (px) en el elemento.
// Interpolado en un rAF que se detiene al converger; solo con ratón.
export function useTileMotion({ maxTilt = 5, shift = 14 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine) return

    // Con movimiento reducido o modo ligero solo se sigue la luz (sin inclinación).
    const still = reduced || isLiteMode()
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let rect = null
    let frame = 0

    const tick = () => {
      current.x = lerp(current.x, target.x, 0.12)
      current.y = lerp(current.y, target.y, 0.12)
      el.style.setProperty('--rx', (-current.y * maxTilt).toFixed(3))
      el.style.setProperty('--ry', (current.x * maxTilt).toFixed(3))
      el.style.setProperty('--ix', (-current.x * shift).toFixed(2))
      el.style.setProperty('--iy', (-current.y * shift).toFixed(2))
      const settled = Math.abs(current.x - target.x) < 0.002 && Math.abs(current.y - target.y) < 0.002
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    const onEnter = () => {
      rect = el.getBoundingClientRect()
    }
    const onMove = (event) => {
      if (!rect) onEnter()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
      if (still) return
      target.x = (x / rect.width) * 2 - 1
      target.y = (y / rect.height) * 2 - 1
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      rect = null
      target.x = 0
      target.y = 0
      if (!still && !frame) frame = requestAnimationFrame(tick)
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [maxTilt, shift])

  return ref
}
