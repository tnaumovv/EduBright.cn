import { ArrowUpRight, MessagesSquare, GraduationCap } from 'lucide-react'
import ConsultationForm from '../ConsultationForm'
import Reveal from '../ui/Reveal'
import SectionBackdrop from '../SectionBackdrop'

export default function Consultation() {
  return (
    <section
      className="screen-section consultation"
      id="consultation"
      aria-labelledby="consultation-title"
    >
      <div className="consultation-decoration" aria-hidden="true">
        <span />
        <span />
      </div>
      <SectionBackdrop variant="consultation" />
      <div className="container consultation-layout">
        <div className="consultation-copy">
          <Reveal>
            <p className="eyebrow">Ваш следующий шаг</p>
            <h2 id="consultation-title">
              Большие планы
              <br />
              начинаются
              <br />
              <span>с разговора.</span>
            </h2>
            <p className="consultation-lead">
              Расскажите о своей цели, а мы подскажем подходящие программы и
              дальнейшие шаги.
            </p>
          </Reveal>
          <Reveal className="consultation-visual" delay={0.12}>
            <img
              className="consultation-main-photo"
              src="/assets/education-library.webp"
              alt="Светлая библиотека, где студенты работают за учебными столами"
              loading="lazy"
              width="1000"
              height="600"
            />
            <div className="consultation-photo-small">
              <img
                src="/assets/program-chinese.webp"
                alt="Архитектура Шанхая"
                loading="lazy"
                width="400"
                height="400"
              />
              <span>
                <GraduationCap size={18} />
                Новые горизонты
              </span>
            </div>
            <div className="conversation-tag">
              <MessagesSquare size={18} />
              <span>
                Ваши планы.
                <br />
                <strong>Наша поддержка.</strong>
              </span>
              <ArrowUpRight size={18} />
            </div>
          </Reveal>
        </div>
        <Reveal className="consultation-form-wrap" delay={0.08}>
          <ConsultationForm />
        </Reveal>
      </div>
    </section>
  )
}
