import { useEffect } from 'react'

// Un único IntersectionObserver para todos los elementos con [data-reveal].
// Al entrar en pantalla reciben .is-visible y dejan de observarse.
export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]:not(.is-visible)')

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
