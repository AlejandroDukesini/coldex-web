import { useEffect, useRef, useState } from 'react'

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t))

// Anima un número hasta `target` cada vez que cambia. El primer render ya
// muestra el valor final (correcto sin JS y en el HTML prerenderizado).
export function useCountUp(target, duration = 1100) {
  const [value, setValue] = useState(target)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    const start = performance.now()
    const tick = (now) => {
      const progress = reduced ? 1 : Math.min((now - start) / duration, 1)
      setValue(target * easeOutExpo(progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}
