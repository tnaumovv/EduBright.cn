import { useEffect, useState } from 'react'

export default function useNavigationState() {
  const [compact, setCompact] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setCompact(window.scrollY > 36)
      const target = window.innerHeight * 0.42
      const current = ['home', 'universities', 'services', 'consultation'].find(
        (id) => {
          const bounds = document.getElementById(id)?.getBoundingClientRect()
          return bounds && bounds.top <= target && bounds.bottom > target
        },
      )
      if (current) setActive(current)
    }
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', scroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('resize', scroll)
    }
  }, [])
  return { compact, active }
}
