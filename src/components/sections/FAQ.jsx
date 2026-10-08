import * as Tabs from '@radix-ui/react-tabs'
import * as Accordion from '@radix-ui/react-accordion'
import { faqCategories } from '../../data/content'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionBackdrop from '../SectionBackdrop'
import useMobileTabScroll from '../../hooks/useMobileTabScroll'

export default function FAQ() {
  const scrollToPanel = useMobileTabScroll()
  return (
    <section
      className="screen-section faq"
      id="faq"
      aria-labelledby="faq-title"
    >
      <SectionBackdrop variant="faq" />
      <div className="container">
        <Reveal>
          <Tabs.Root className="faq-shell" defaultValue={faqCategories[0].id}>
            <div className="faq-top">
              <p className="eyebrow">Ответы на ваши вопросы</p>
              <h2 id="faq-title">Есть вопросы об учёбе в Китае?</h2>
              <p className="faq-intro">
                Поступление, язык и переезд — начните с того, что важно вам.
              </p>
              <Tabs.List className="faq-categories" aria-label="Темы вопросов">
                {faqCategories.map((category) => (
                  <Tabs.Trigger
                    key={category.id}
                    value={category.id}
                    className="faq-category"
                    onClick={scrollToPanel}
                  >
                    {category.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </div>
            {faqCategories.map((category) => (
              <Tabs.Content
                key={category.id}
                value={category.id}
                className="faq-panel"
              >
                <div className="faq-category-summary">
                  <h3>{category.label}</h3>
                  <p>{category.description}</p>
                  <Button
                    as="a"
                    href="#consultation"
                    variant="outline"
                    className="faq-contact-button"
                  >
                    Задать свой вопрос
                  </Button>
                </div>
                <Accordion.Root
                  className="faq-questions"
                  type="single"
                  collapsible
                  defaultValue={category.questions[0].id}
                >
                  {category.questions.map((item) => (
                    <Accordion.Item
                      className="faq-item"
                      key={item.id}
                      value={item.id}
                    >
                      <Accordion.Header asChild>
                        <h4 className="faq-question-heading">
                          <Accordion.Trigger className="faq-question">
                            <span>{item.question}</span>
                            <span className="faq-toggle" aria-hidden="true" />
                          </Accordion.Trigger>
                        </h4>
                      </Accordion.Header>
                      <Accordion.Content className="faq-answer">
                        <p>{item.answer}</p>
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Reveal>
      </div>
    </section>
  )
}
