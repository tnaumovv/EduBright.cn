import { useState } from 'react'
import { motion } from 'motion/react'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import { navigation } from '../data/content'
import useNavigationState from '../hooks/useNavigationState'
import Button from './ui/Button'
import { goToSection } from '../lib/navigation'

export function Brand({ light = false }) {
  return (
    <a
      className={`brand ${light ? 'brand--light' : ''}`}
      href="#home"
      aria-label="EduBright — главная"
    >
      <span className="brand-symbol">
        <img src="/assets/edubright-logo.png" alt="" />
      </span>
      <span className="brand-word">
        Edu<span>Bright</span>
        <small>.cn</small>
        <em>STUDY IN CHINA</em>
      </span>
    </a>
  )
}

export default function Header() {
  const { compact, active } = useNavigationState()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const highlighted = hovered || active
  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти к содержимому
      </a>
      <header
        className={`site-header ${compact ? 'site-header--compact' : ''}`}
      >
        <div className="header-inner container">
          <Brand />
          <nav
            className="desktop-nav"
            aria-label="Основная навигация"
            onMouseLeave={() => setHovered(null)}
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
                onMouseEnter={() => setHovered(item.id)}
                onFocus={() => setHovered(item.id)}
                onBlur={() => setHovered(null)}
              >
                {highlighted === item.id && (
                  <motion.span
                    className="nav-indicator"
                    layoutId="navigation-indicator"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    aria-hidden="true"
                  />
                )}
                <span className="nav-label">{item.label}</span>
              </a>
            ))}
          </nav>
          <Button
            className="header-consult"
            as="a"
            href="#consultation"
            variant={active === 'consultation' ? 'navy' : 'primary'}
          >
            Консультация
          </Button>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="menu-button"
                type="button"
                aria-label="Открыть меню"
              >
                <Menu size={22} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="menu-overlay" />
              <Dialog.Content
                className="mobile-menu"
                aria-describedby={undefined}
              >
                <div className="mobile-menu-top">
                  <Dialog.Title className="menu-title">
                    Edu<span>Bright</span>
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="icon-button" aria-label="Закрыть меню">
                      <X size={22} />
                    </button>
                  </Dialog.Close>
                </div>
                <nav aria-label="Мобильная навигация">
                  {navigation.map((item, index) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? 'location' : undefined}
                    >
                      <span>0{index + 1}</span>
                      {item.label}
                    </a>
                  ))}
                </nav>
                <Button
                  as="a"
                  href="#consultation"
                  onClick={() => {
                    setOpen(false)
                    requestAnimationFrame(() => goToSection('consultation'))
                  }}
                >
                  Получить консультацию
                </Button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
    </>
  )
}
