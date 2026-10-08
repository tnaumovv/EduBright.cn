import Reveal from '../ui/Reveal'
import { TestimonialCarousel } from '../ui/profile-card-testimonial-carousel'
import './StudentStory.css'

const students = [
  {
    name: 'Садвакасов Дамир',
    title: '18 лет · Foundation Year · Китай',
    description: 'Поступил на Foundation Year в Zhejiang Gongshang University.',
    imageUrl: '/assets/damir-sadvakasov.jpeg',
    imageAlt: 'Дамир Садвакасов с письмом о зачислении в Zhejiang Gongshang University',
    university: 'Zhejiang Gongshang University',
    universityLogoUrl: '/assets/universities/zjgsu.png',
  },
]

export default function StudentStory() {
  return (
    <section className="screen-section student-story" id="student-story" aria-labelledby="student-story-title">
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow">История нашего студента</p>
          <h2 id="student-story-title">Планы становятся реальностью.</h2>
        </Reveal>
        <Reveal>
          <TestimonialCarousel testimonials={students} />
        </Reveal>
      </div>
    </section>
  )
}
