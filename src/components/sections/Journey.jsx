import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { ArrowUpRight, Check } from 'lucide-react'
import useMobileTabScroll from '../../hooks/useMobileTabScroll'
import { journeySteps } from '../../data/content'
import Reveal from '../ui/Reveal'
import SectionBackdrop from '../SectionBackdrop'

export default function Journey() {
  const [step, setStep] = useState(journeySteps[0].id)
  const scrollToPanel = useMobileTabScroll()
  return (
    <section
      className="screen-section journey"
      id="services"
      aria-labelledby="journey-title"
    >
      <SectionBackdrop variant="journey" />
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">Рядом на каждом этапе</p>
            <h2 id="journey-title">
              Большая цель. <span>Понятные шаги.</span>
            </h2>
          </div>
          <p>
            От выбора программы до первых дней
            <br className="desktop-break" /> в Китае — пройдём этот путь вместе.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Tabs.Root
            className="journey-layout"
            value={step}
            onValueChange={setStep}
            orientation="vertical"
          >
            <Tabs.List
              className="journey-steps"
              aria-label="Этапы сопровождения"
            >
              {journeySteps.map((item, index) => (
                <Tabs.Trigger
                  key={item.id}
                  value={item.id}
                  className="journey-step"
                  onClick={scrollToPanel}
                >
                  <span className="step-number" aria-hidden="true">0{index + 1}</span>
                  <span className="step-name">
                    <strong>{item.label}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                  <ArrowUpRight className="step-arrow" size={18} aria-hidden="true" />
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <div className="journey-panels">
              {journeySteps.map((item) => (
                <Tabs.Content
                  key={item.id}
                  value={item.id}
                  className="journey-panel"
                >
                  <div className="journey-panel-inner">
                    <div className="journey-detail">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <ul>
                        {item.details.map((text) => (
                          <li key={text}>
                            <Check size={18} aria-hidden="true" />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="journey-photo">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        width="1200"
                        height="800"
                      />
                      <span className="journey-photo-tag">
                        <item.icon size={17} aria-hidden="true" />
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </Tabs.Content>
              ))}
            </div>
          </Tabs.Root>
        </Reveal>
      </div>
    </section>
  )
}
