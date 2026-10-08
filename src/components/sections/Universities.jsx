import Reveal from '../ui/Reveal'

const universities = [
  { id: 'zjut', name: 'Zhejiang University of Technology' },
  { id: 'zufe', name: 'Zhejiang University of Finance and Economics' },
  { id: 'cuz', name: 'Communication University of Zhejiang' },
  { id: 'hznu', name: 'Hangzhou Normal University' },
  { id: 'zstu', name: 'Zhejiang Sci-Tech University' },
  { id: 'sdju', name: 'Shanghai Dianji University' },
]

export default function Universities() {
  return (
    <section className="university-band" aria-labelledby="university-band-title">
      <Reveal className="container">
        <h2 id="university-band-title">Университеты для вашего будущего</h2>
      </Reveal>
      <div className="university-marquee" tabIndex={0} aria-label="Университеты Китая. Фокус на ленте приостанавливает движение.">
        <div className="university-track">
          {[0, 1].map((copy) => (
            <ul className="university-list" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {universities.map((university) => (
                <li className={`university-logo university-logo--${university.id}`} key={university.id}>
                  <img src={`/assets/universities/${university.id}.png`} alt="" width="240" height="80" loading="lazy" />
                  <span>{university.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
