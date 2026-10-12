"use client";

import { useEffect, useId, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import './circular-testimonials.css'

export interface CircularTestimonial {
  name: string
  designation: string
  src: string
  imageAlt?: string
  imagePosition?: string
  imageWidth?: number
  imageHeight?: number
  university?: string
  universityLogoUrl?: string
  universityLogoWidth?: number
  universityLogoHeight?: number
}

interface CircularTestimonialsProps {
  testimonials: readonly CircularTestimonial[]
  autoplay?: boolean
  className?: string
  colors?: {
    name?: string
    designation?: string
    arrowBackground?: string
    arrowForeground?: string
    arrowHoverBackground?: string
  }
  fontSizes?: { name?: string; designation?: string }
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  className,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [rotating, setRotating] = useState(autoplay)
  const [hovered, setHovered] = useState(false)
  const reducedMotion = useReducedMotion()
  const id = useId()
  const count = testimonials.length
  const index = activeIndex % Math.max(count, 1)
  const current = testimonials[index]
  const multiple = count > 1

  useEffect(() => {
    if (!autoplay || !rotating || hovered || reducedMotion || count < 2) return
    const interval = window.setInterval(() => {
      setActiveIndex(previous => (previous + 1) % count)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [autoplay, rotating, hovered, reducedMotion, count])

  if (!current) return null
  const universityWords = current.university?.split(' ') ?? []

  const navigate = (step: number) => {
    setRotating(false)
    setActiveIndex(previous => (previous + step + count) % count)
  }
  const select = (position: number) => {
    setRotating(false)
    setActiveIndex(position)
  }

  const imageStyle = (position: number): CSSProperties => {
    const active = position === index
    const left = position === (index - 1 + count) % count
    const right = position === (index + 1) % count
    // With two students, show the other portrait once, on the opposite side.
    const side = count === 2 ? (index === 0 ? 1 : -1) : left ? -1 : 1
    return {
      zIndex: active ? 3 : 2,
      opacity: active || left || right ? 1 : 0,
      pointerEvents: active || left || right ? 'auto' : 'none',
      transform: active
        ? 'translateX(-50%) translateY(0px) scale(1) rotateY(0deg)'
        : `translateX(calc(-50% + ${side} * var(--portrait-offset))) translateY(calc(-0.8 * var(--portrait-offset))) scale(0.85) rotateY(${-side * 15}deg)`,
    }
  }

  const theme = {
    '--testimonial-name': colors.name ?? 'var(--navy)',
    '--testimonial-designation': colors.designation ?? 'var(--muted)',
    '--testimonial-arrow-bg': colors.arrowBackground ?? 'var(--navy)',
    '--testimonial-arrow-fg': colors.arrowForeground ?? 'var(--surface)',
    '--testimonial-arrow-hover': colors.arrowHoverBackground ?? 'var(--red)',
    '--testimonial-name-size': fontSizes.name ?? 'clamp(28px, 3vw, 36px)',
    '--testimonial-designation-size': fontSizes.designation ?? '16px',
  } as CSSProperties
  const transition = { duration: reducedMotion ? 0 : 0.3, ease: 'easeInOut' as const }

  return (
    <div
      className={cn('circular-testimonials', className)}
      style={theme}
      role="region"
      aria-roledescription={multiple ? 'карусель' : undefined}
      aria-label="Истории студентов"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setRotating(false)}
      onKeyDown={event => {
        if (!multiple || event.altKey || event.ctrlKey || event.metaKey) return
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          navigate(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}
    >
      <div className="circular-testimonials__grid">
        <div className="circular-testimonials__portraits">
          {testimonials.map((testimonial, position) => (
            <div className="circular-testimonials__portrait" key={testimonial.src} style={imageStyle(position)} aria-hidden={position !== index}>
              <img
                src={testimonial.src}
                alt={testimonial.imageAlt ?? testimonial.name}
                width={testimonial.imageWidth}
                height={testimonial.imageHeight}
                style={{ objectPosition: testimonial.imagePosition ?? 'center 60%' }}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
          {multiple && (
            <button
              type="button"
              className="circular-testimonials__photo-navigation"
              onClick={() => navigate(1)}
              aria-label={`Следующая история: ${testimonials[(index + 1) % count].name}`}
            />
          )}
        </div>

        <div className="circular-testimonials__content">
          <div className="circular-testimonials__slides">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                className="circular-testimonials__slide"
                key={`${current.name}-${index}`}
                aria-labelledby={`${id}-name`}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
                transition={transition}
              >
                <h3 className="circular-testimonials__name" id={`${id}-name`}>{current.name}</h3>
                <p className="circular-testimonials__designation">{current.designation}</p>

                {current.university && (
                  <div className="circular-testimonials__university">
                    {current.universityLogoUrl && (
                      <img
                        src={current.universityLogoUrl}
                        alt={`Логотип ${current.university}`}
                        width={current.universityLogoWidth}
                        height={current.universityLogoHeight}
                        loading="lazy"
                      />
                    )}
                    <p>
                      <span className="sr-only">{current.university}</span>
                      {universityWords.map((word, wordIndex) => (
                        <motion.span
                          key={`${index}-${wordIndex}`}
                          aria-hidden="true"
                          className="circular-testimonials__word"
                          initial={reducedMotion ? false : { filter: 'blur(10px)', opacity: 0, y: 5 }}
                          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                          transition={{ duration: reducedMotion ? 0 : 0.22, ease: 'easeInOut', delay: reducedMotion ? 0 : 0.025 * wordIndex }}
                        >
                          {word}{wordIndex < universityWords.length - 1 ? '\u00a0' : ''}
                        </motion.span>
                      ))}
                    </p>
                  </div>
                )}
              </motion.article>
            </AnimatePresence>
          </div>

          {multiple && (
            <div className="circular-testimonials__navigation">
              <button type="button" className="circular-testimonials__arrow" onClick={() => navigate(-1)} aria-label="Предыдущий студент">
                <ArrowLeft size={22} aria-hidden="true" />
              </button>
              <button type="button" className="circular-testimonials__arrow" onClick={() => navigate(1)} aria-label="Следующий студент">
                <ArrowRight size={22} aria-hidden="true" />
              </button>
              <div className="circular-testimonials__selectors">
                {testimonials.map((testimonial, position) => (
                  <button
                    type="button"
                    key={`${testimonial.name}-${position}`}
                    onClick={() => select(position)}
                    aria-label={`Показать историю: ${testimonial.name}`}
                    aria-current={position === index ? 'true' : undefined}
                  >
                    <span />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="sr-only" aria-live={autoplay && rotating && !hovered && !reducedMotion ? 'off' : 'polite'} aria-atomic="true">
        {multiple ? `${index + 1} из ${count}: ${current.name}` : current.name}
      </p>
    </div>
  )
}

export default CircularTestimonials
