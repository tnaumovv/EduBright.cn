import { useRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Check } from 'lucide-react'
import Button from './ui/Button'
import { goToSection } from '../lib/navigation'

export default function ProgramDialog({ program }) {
  const consultRequested = useRef(false)
  const closeButton = useRef(null)
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="program-overlay" />
      <Dialog.Content
        className="program-dialog"
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          closeButton.current?.focus({ preventScroll: true })
        }}
        onCloseAutoFocus={(event) => {
          if (consultRequested.current) {
            event.preventDefault()
            consultRequested.current = false
            goToSection('consultation', true)
          }
        }}
      >
        <div className="dialog-photo">
          <img src={program.image} alt={program.alt} />
          <div className="dialog-photo-caption">
            <span>EDUBRIGHT</span>
            <strong>{program.caption}</strong>
          </div>
        </div>
        <div className="dialog-copy">
          <p className="eyebrow">{program.category}</p>
          <Dialog.Title>{program.title}</Dialog.Title>
          <Dialog.Description>{program.description}</Dialog.Description>
          <ul>
            {program.items.map((item) => (
              <li key={item}>
                <Check size={17} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Dialog.Close asChild>
            <Button
              onClick={() => {
                consultRequested.current = true
              }}
            >
              Обсудить программу
            </Button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            ref={closeButton}
            className="dialog-close icon-button"
            aria-label="Закрыть описание"
          >
            <X size={20} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
