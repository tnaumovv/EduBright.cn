"use client";

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Github, Twitter, Youtube, Linkedin, ChevronLeft, ChevronRight, GraduationCap, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Testimonial {
  name: string
  title: string
  description: string
  imageUrl: string
  imageAlt?: string
  university?: string
  universityLogoUrl?: string
  githubUrl?: string
  twitterUrl?: string
  youtubeUrl?: string
  linkedinUrl?: string
}

export interface TestimonialCarouselProps {
  testimonials: readonly Testimonial[]
  className?: string
}

export function TestimonialCarousel({ testimonials, className }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const id = useId()
  const index = currentIndex % Math.max(testimonials.length, 1)
  const current = testimonials[index]
  const multiple = testimonials.length > 1
  if (!current) return null

  const navigate = (step: number) => setCurrentIndex((index + step + testimonials.length) % testimonials.length)
  const socials = [
    { icon: Github, url: current.githubUrl, label: 'GitHub' },
    { icon: Twitter, url: current.twitterUrl, label: 'Twitter' },
    { icon: Youtube, url: current.youtubeUrl, label: 'YouTube' },
    { icon: Linkedin, url: current.linkedinUrl, label: 'LinkedIn' },
  ].filter(({ url }) => url && url !== '#')
  const transition = { duration: reducedMotion ? 0 : 0.3, ease: 'easeInOut' as const }

  return (
    <div
      className={cn('mx-auto w-full max-w-5xl px-0 sm:px-4', className)}
      role={multiple ? 'region' : undefined}
      aria-roledescription={multiple ? 'карусель' : undefined}
      aria-label={multiple ? 'Истории студентов' : undefined}
      onKeyDown={(event) => {
        if (!multiple || event.altKey || event.ctrlKey || event.metaKey) return
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          navigate(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}
    >
      <article className="relative flex flex-col items-center md:flex-row" aria-labelledby={`${id}-name`}>
        <div className="aspect-square w-full max-w-[470px] shrink-0 overflow-hidden rounded-3xl bg-gray-200 md:w-[48%]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={current.imageUrl} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition} className="h-full w-full">
              <img src={current.imageUrl} alt={current.imageAlt || current.name} width={940} height={1600} className="h-full w-full object-cover object-[center_35%]" draggable={false} loading="lazy" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 mt-6 w-full rounded-3xl bg-white p-6 text-left shadow-[0_20px_70px_-20px_rgba(11,30,54,0.2)] md:mt-0 md:-ml-20 md:flex-1 md:p-8 lg:p-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`${current.name}-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
              <div className="mb-6">
                <h3 id={`${id}-name`} className="mb-3 text-2xl font-bold tracking-tight text-[var(--navy)] lg:text-3xl">{current.name}</h3>
                <p className="flex items-center gap-2 text-sm font-medium leading-relaxed text-[var(--muted)]"><GraduationCap className="h-5 w-5 shrink-0 text-[var(--red)]" aria-hidden="true" />{current.title}</p>
              </div>

              {current.university && (
                <div className="mb-6 border-x-0 border-y border-solid border-[var(--line)] py-5">
                  {current.universityLogoUrl && <img src={current.universityLogoUrl} alt={`Логотип ${current.university}`} width={300} height={77} className="mb-3 h-auto w-[240px] max-w-full brightness-0" loading="lazy" />}
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{current.university}</p>
                </div>
              )}

              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff0f2] text-[var(--red)]"><Check className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">Результат</p>
                  <p className="text-base leading-relaxed text-[var(--navy)]">{current.description}</p>
                </div>
              </div>

              {socials.length > 0 && (
                <div className="mt-6 flex gap-4">
                  {socials.map(({ icon: Icon, url, label }) => (
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)] text-white transition-colors hover:bg-[var(--red)] focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`${label}: ${current.name} (в новой вкладке)`}><Icon className="h-5 w-5" aria-hidden="true" /></a>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </article>

      {multiple && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" onClick={() => navigate(-1)} aria-label="Предыдущий студент" className="flex h-12 w-12 items-center justify-center rounded-full border border-solid border-gray-300 bg-gray-100 text-[var(--navy)] transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-4"><ChevronLeft className="h-6 w-6" aria-hidden="true" /></button>
          <div className="flex flex-wrap justify-center">
            {testimonials.map((testimonial, position) => (
              <button type="button" key={`${testimonial.name}-${position}`} onClick={() => setCurrentIndex(position)} className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2" aria-label={`Показать кейс: ${testimonial.name}`} aria-current={position === index ? 'true' : undefined}><span className={cn('h-3 w-3 rounded-full transition-colors', position === index ? 'bg-[var(--navy)]' : 'bg-gray-400')} /></button>
            ))}
          </div>
          <button type="button" onClick={() => navigate(1)} aria-label="Следующий студент" className="flex h-12 w-12 items-center justify-center rounded-full border border-solid border-gray-300 bg-gray-100 text-[var(--navy)] transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-4"><ChevronRight className="h-6 w-6" aria-hidden="true" /></button>
        </div>
      )}
      <p className="sr-only" aria-live="polite" aria-atomic="true">{multiple ? `${index + 1} из ${testimonials.length}: ${current.name}` : ''}</p>
    </div>
  )
}
