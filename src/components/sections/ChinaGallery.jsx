import photos from '../../data/cities.json'
import Reveal from '../ui/Reveal'

const SCROLL_SECONDS = 24

export default function ChinaGallery() {
  return (
    <section className="screen-section china-gallery" id="china" aria-labelledby="china-title" style={{ '--gallery-duration': `${SCROLL_SECONDS}s` }}>
      <div className="container">
        <Reveal className="china-copy">
          <p className="eyebrow">Жизнь за пределами кампуса</p>
          <h2 id="china-title">Откройте свой <span>Китай.</span></h2>
          <p className="china-lead">
            Огни Шанхая, улицы Пекина и новые места, которые станут частью вашей студенческой жизни.
          </p>
        </Reveal>
      </div>
      <div className="gallery-stage" tabIndex={0} aria-label="Фотографии Китая. Фокус на галерее приостанавливает движение.">
        <div className="city-track">
          {[0, 1].map((group) => (
            <ul className="city-strip" key={group} aria-label={group === 0 ? 'Восемь фотографий Китая' : undefined} aria-hidden={group === 1 ? true : undefined}>
              {photos.map((photo) => (
                <li className="city-card" key={photo.id}>
                  <img src={photo.image} alt={group === 0 ? photo.alt : ''} width="250" height="328" loading="eager" decoding="async" draggable="false" style={{ objectPosition: photo.position }} />
                  <div className="city-caption"><span>{photo.name}</span><small aria-hidden="true">{photo.han}</small></div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
