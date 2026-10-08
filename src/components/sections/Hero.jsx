import { ArrowDown, GraduationCap, Languages, Compass } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionBackdrop from '../SectionBackdrop'

export default function Hero() {
  return (
    <section
      className="screen-section hero"
      id="home"
      aria-labelledby="hero-title"
    >
      <div className="hero-architecture" aria-hidden="true">
        <img
          src="/assets/hero-palace.webp"
          alt=""
          width="1672"
          height="941"
          fetchpriority="high"
        />
      </div>
      <div className="hero-decoration" aria-hidden="true">
        <span className="hero-orbit hero-orbit--one" />
        <span className="hero-orbit hero-orbit--two" />
        <span className="hero-dot" />
        <span className="hero-character">学</span>
      </div>
      <SectionBackdrop variant="hero" />
      <div className="container hero-content">
        <Reveal className="hero-brandline">
          <p className="eyebrow hero-eyebrow">
            <span className="red-dot" />
            EDUBRIGHT · STUDY IN CHINA
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 id="hero-title">
            Образование в Китае.
            <br />
            <span className="hero-tagline">Будущее без границ.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="hero-lead">
            <span className="hero-desktop-copy">
              Подберём университет и программу, поможем с документами и будем
              рядом на пути к вашей цели.
            </span>
            <span className="hero-mobile-copy">
              Подбор университета и помощь с поступлением.
            </span>
          </p>
          <div className="hero-actions">
            <Button as="a" href="#consultation">
              <span className="hero-desktop-copy">Получить консультацию</span>
              <span className="hero-mobile-copy">Консультация</span>
            </Button>
            <Button as="a" href="#universities" variant="outline">
              <span className="hero-desktop-copy">Выбрать направление</span>
              <span className="hero-mobile-copy">Программы</span>
            </Button>
          </div>
        </Reveal>
        <Reveal className="hero-topics" delay={0.22}>
          <span>
            <GraduationCap size={18} />
            Поступление
          </span>
          <span>
            <Languages size={18} />
            Китайский и HSK
          </span>
          <span>
            <Compass size={18} />
            Сопровождение
          </span>
        </Reveal>
      </div>
      <div className="hero-bottom container">
        <span>Ваш путь к новым возможностям</span>
        <a
          href="#universities"
          className="scroll-cue"
          aria-label="Перейти к программам"
        >
          <ArrowDown size={18} />
        </a>
        <span>
          01 <i>/</i> 06
        </span>
      </div>
    </section>
  )
}
