import photos from '../../data/cities.json'
import Reveal from '../ui/Reveal'

const ROTATION_SECONDS = 24

export default function ChinaGallery() {
  return (
    <section className="screen-section china-gallery" id="china" aria-labelledby="china-title" style={{ '--orbit-duration': `${ROTATION_SECONDS}s` }}>
      <div className="container">
        <Reveal className="china-copy">
          <p className="eyebrow">Жизнь за пределами кампуса</p>
          <h2 id="china-title">Откройте свой <span>Китай.</span></h2>
          <p className="china-lead">
            Огни Шанхая, улицы Пекина и новые места, которые станут частью вашей студенческой жизни.
          </p>
        </Reveal>
      </div>
      <div className="gallery-stage" tabIndex={0} aria-label="Фотографии Китая. Наведите на фото, чтобы остановить вращение.">
        <ul className="city-arc" aria-label="Восемь фотографий Китая">
          {photos.map((photo, index) => (
            <li className="city-card" key={photo.id} style={{ '--orbit-delay': `${-((index * 45 - 67.5 + 360) % 360) / 360 * ROTATION_SECONDS}s` }}>
              <img src={photo.image} alt={photo.alt} width="320" height="420" loading="eager" decoding="async" draggable="false" style={{ objectPosition: photo.position }} />
              <div className="city-caption"><span>{photo.name}</span><small aria-hidden="true">{photo.han}</small></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
