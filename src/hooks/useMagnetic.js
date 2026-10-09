import { useEffect, useRef } from 'react'
import { isLiteMode } from '../lib/device'

// Desplaza el elemento ligeramente hacia el cursor. Solo usa transform y
// agrupa las actualizaciones en un requestAnimationFrame por frame.
export function useMagnetic(strength = 0.25) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || isLiteMode()) return
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduced) return

    let frame = 0
    let x = 0
    let y = 0
    let rect = null

    const apply = () => {
      frame = 0
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    // Se mide al entrar (sin desplazamiento) para que el transform no
    // retroalimente el cálculo y el botón no tiemble.
    const onEnter = () => {
      rect = el.getBoundingClientRect()
    }

    const onMove = (event) => {
      if (!rect) onEnter()
      x = (event.clientX - (rect.left + rect.width / 2)) * strength
      y = (event.clientY - (rect.top + rect.height / 2)) * strength
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      rect = null
      x = 0
      y = 0
      if (!frame) frame = requestAnimationFrame(apply)
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
  }, [strength])

  return ref
}
