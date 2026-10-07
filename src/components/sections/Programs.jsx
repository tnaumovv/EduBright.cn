import * as Dialog from '@radix-ui/react-dialog'
import { programs, universityPaths } from '../../data/content'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import ProgramDialog from '../ProgramDialog'

export default function Programs() {
  return (
    <section
      className="screen-section programs"
      id="universities"
      aria-labelledby="programs-title"
    >
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">Направления обучения</p>
            <h2 id="programs-title">С чего начнётся ваш путь?</h2>
          </div>
          <p>
            От первых слов на китайском
            <br className="desktop-break" /> до университетской программы.
          </p>
        </Reveal>
        <div className="program-grid">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <Reveal key={program.id} delay={index * 0.08}>
                <Dialog.Root>
                  <article
                    className={`program-card program-card--${program.id}`}
                  >
                    <img
                      src={program.image}
                      alt={program.alt}
                      loading="lazy"
                      className="program-photo"
                      width="1200"
                      height="1200"
                    />
                    <span className="program-symbol" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <div className="program-card-content">
                      <p className="program-category">{program.category}</p>
                      <h3>{program.title}</h3>
                      <p className="program-summary">{program.summary}</p>
                      <Dialog.Trigger asChild>
                        <Button
                          variant="glass"
                          className="program-button"
                          aria-label={`Подробнее: ${program.title}`}
                        >
                          Подробнее о программе
                        </Button>
                      </Dialog.Trigger>
                    </div>
                  </article>
                  <ProgramDialog program={program} />
                </Dialog.Root>
              </Reveal>
            )
          })}
        </div>
        <Reveal className="university-paths" delay={0.18}>
          {universityPaths.map((path, index) => (
            <div key={path.title}>
              <span className="path-index">0{index + 1}</span>
              <div>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
