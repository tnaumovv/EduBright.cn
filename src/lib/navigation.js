export function goToSection(id, focusForm = false) {
  const section = document.getElementById(id)
  if (!section) return
  if (window.location.hash !== `#${id}`)
    window.history.pushState(null, '', `#${id}`)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  section.scrollIntoView({
    behavior: reduced || focusForm ? 'instant' : 'smooth',
    block: 'start',
  })
  if (focusForm) {
    const field = section.querySelector('input[name="name"]')
    field?.focus({ preventScroll: true })
    const bounds = field?.getBoundingClientRect()
    const headerBottom =
      document.querySelector('.site-header')?.getBoundingClientRect().bottom ||
      0
    if (
      bounds &&
      (bounds.bottom > window.innerHeight - 16 ||
        bounds.top < headerBottom + 16)
    ) {
      field.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }
}
