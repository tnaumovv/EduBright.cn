import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  const [shownOnLoad, setShownOnLoad] = useState(false)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  useLayoutEffect(() => {
    const bounds = ref.current.getBoundingClientRect()
    setShownOnLoad(bounds.top < window.innerHeight && bounds.bottom > 0)
  }, [])

  useEffect(() => {
    let previousY = window.scrollY
    const onScroll = () => {
      if (window.scrollY > previousY) lastScroll.current = performance.now()
      previousY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Content visible on load stays still; other content enters once on downward scroll.
  const visible = reduced || shownOnLoad || inView
  const animateEntry =
    !reduced &&
    !shownOnLoad &&
    inView &&
    lastScroll.current > 0 &&
    performance.now() - lastScroll.current < 400
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 32,
      }}
      data-reveal-state={visible ? 'visible' : 'hidden'}
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
