import { useEffect, useRef } from 'react'
import { isLiteMode } from '../lib/device'

const lerp = (a, b, t) => a + (b - a) * t

// Campo de puntero interpolado para una sección. Escribe en el elemento las
// variables CSS --px/--py (cursor en [-1, 1]), --lx/--ly (px, para la luz) y
// --energy (0 fuera, 1 dentro), y expone el mismo estado en `field.current`
// para que un canvas WebGL lo lea sin pasar por React.
// El bucle rAF solo corre mientras los valores no han convergido.
export function usePointerField(ref, { ease = 0.075 } = {}) {
  const field = useRef({ x: 0, y: 0, energy: 0, active: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced || isLiteMode()) return

    const state = field.current
    state.active = true
    let rect = el.getBoundingClientRect()
    let tx = 0
    let ty = 0
    let te = 0
    let lx = rect.width * 0.68
    let ly = rect.height * 0.42
    let tlx = lx
    let tly = ly
    let frame = 0

    const tick = () => {
      state.x = lerp(state.x, tx, ease)
      state.y = lerp(state.y, ty, ease)
      state.energy = lerp(state.energy, te, ease * 0.6)
      lx = lerp(lx, tlx, ease * 1.4)
      ly = lerp(ly, tly, ease * 1.4)

      el.style.setProperty('--px', state.x.toFixed(4))
      el.style.setProperty('--py', state.y.toFixed(4))
      el.style.setProperty('--energy', state.energy.toFixed(3))
      el.style.setProperty('--lx', `${lx.toFixed(1)}px`)
      el.style.setProperty('--ly', `${ly.toFixed(1)}px`)

      const settled =
        Math.abs(state.x - tx) < 0.001 &&
        Math.abs(state.y - ty) < 0.001 &&
        Math.abs(state.energy - te) < 0.002 &&
        Math.abs(lx - tlx) < 0.5 &&
        Math.abs(ly - tly) < 0.5
      frame = settled ? 0 : requestAnimationFrame(tick)
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      tx = ((event.clientX - rect.left) / rect.width) * 2 - 1
      ty = ((event.clientY - rect.top) / rect.height) * 2 - 1
      tlx = event.clientX - rect.left
      tly = event.clientY - rect.top
      te = 1
      wake()
    }
    // Al salir, el entorno vuelve despacio a su reposo (no salta al centro).
    const onLeave = () => {
      tx *= 0.25
      ty *= 0.25
      te = 0
      wake()
    }
    const measure = () => {
      rect = el.getBoundingClientRect()
    }

    el.addEventListener('pointerenter', measure)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      state.active = false
      el.removeEventListener('pointerenter', measure)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [ref, ease])

  return field
}
