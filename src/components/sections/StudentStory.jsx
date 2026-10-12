import Reveal from '../ui/Reveal'
import { CircularTestimonials } from '../ui/circular-testimonials'
import './StudentStory.css'

const students = [
  {
    name: 'Садвакасов Дамир',
    designation: '18 лет · Поступил на Foundation Year · Китай',
    src: '/assets/damir-sadvakasov.jpeg',
    imageAlt: 'Дамир Садвакасов с письмом о зачислении в Zhejiang Gongshang University',
    imageWidth: 940,
    imageHeight: 1600,
    university: 'Zhejiang Gongshang University',
    universityLogoUrl: '/assets/universities/zjgsu.png',
    universityLogoWidth: 300,
    universityLogoHeight: 77,
  },
  {
    name: 'Наталья',
    designation: 'Поступила в университет · Китай',
    src: '/assets/natalia-zufe.jpg',
    imageAlt: 'Наталья с письмом о зачислении в Zhejiang University of Finance and Economics',
    imageWidth: 608,
    imageHeight: 1080,
    university: 'Zhejiang University of Finance and Economics',
    universityLogoUrl: '/assets/universities/zufe.png',
    universityLogoWidth: 282,
    universityLogoHeight: 55,
  },
]

export default function StudentStory() {
  return (
    <section className="screen-section student-story" id="student-story" aria-labelledby="student-story-title">
      <div className="container">
        <Reveal className="section-heading">
          <h2 className="eyebrow" id="student-story-title">Истории наших студентов</h2>
        </Reveal>
        <Reveal>
          <CircularTestimonials testimonials={students} autoplay={true} />
        </Reveal>
      </div>
    </section>
  )
}
