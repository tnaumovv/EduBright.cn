import { useCallback, useEffect, useRef } from 'react'

// Wait for Radix to mount the selected panel before bringing it into view.
export default function useMobileTabScroll() {
  const frame = useRef(null)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return useCallback((event) => {
    if (!window.matchMedia('(max-width: 960px)').matches) return
    const panelId = event.currentTarget.getAttribute('aria-controls')
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      document.getElementById(panelId)?.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      })
    })
  }, [])
}
