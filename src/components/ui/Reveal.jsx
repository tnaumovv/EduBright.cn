import { useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  ...props
}) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const lastScroll = useRef(0)
  const inView = useInView(ref, { initial: true, amount: 0.12 })

  useEffect(() => {
    let previousY = window.scrollY
    const onScroll = () => {
      if (window.scrollY !== previousY) lastScroll.current = performance.now()
      previousY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Initial rendering and resize stay still; viewport re-entry after scrolling repeats.
  const animateEntry =
    !reduced &&
    inView &&
    lastScroll.current > 0 &&
    performance.now() - lastScroll.current < 400
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{
        opacity: reduced || inView ? 1 : 0,
        y: reduced || inView ? 0 : 32,
      }}
      data-reveal-state={inView ? 'visible' : 'hidden'}
      transition={{
        duration: animateEntry ? 0.65 : 0,
        delay: animateEntry ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
