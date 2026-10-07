import { BookOpen, GraduationCap, MessagesSquare, Plane } from 'lucide-react'

const symbols = {
  hero: Plane,
  programs: BookOpen,
  journey: Plane,
  faq: MessagesSquare,
  consultation: GraduationCap,
}

export default function SectionBackdrop({ variant }) {
  const Symbol = symbols[variant]

  return (
    <div
      className={`section-backdrop section-backdrop--${variant}`}
      aria-hidden="true"
    >
      <span className="backdrop-dots" />
      <span className="backdrop-orbit" />
      <span className="backdrop-grid" />
      <Symbol className="backdrop-symbol" strokeWidth={0.7} />
      <svg className="backdrop-constellation" viewBox="0 0 180 140" fill="none">
        <path d="M12 108 66 44l45 26 51-48" stroke="currentColor" />
        <circle cx="12" cy="108" r="4" fill="currentColor" />
        <circle cx="66" cy="44" r="7" stroke="currentColor" />
        <circle cx="111" cy="70" r="4" fill="currentColor" />
        <circle cx="162" cy="22" r="7" stroke="currentColor" />
        <path
          d="M142 111h20m-10-10v20M18 32h14m-7-7v14"
          stroke="currentColor"
        />
      </svg>
      <svg className="backdrop-route" viewBox="0 0 420 220" fill="none">
        <path
          d="M-20 180C48 180 48 40 142 40S204 180 292 180 348 92 440 92"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 7"
        />
        <circle cx="142" cy="40" r="7" stroke="currentColor" />
        <circle cx="292" cy="180" r="4" fill="currentColor" />
      </svg>
    </div>
  )
}
