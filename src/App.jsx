import { useEffect, useRef, useState } from 'react'
import {
  CheckCircle2,
  ClipboardPenLine,
  FileCheck2,
  Globe2,
  GraduationCap,
  Headphones,
  Landmark,
  Languages,
  Mail,
  MessageCircle,
  Menu,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'

const navigation = [
  { href: '/', label: 'Главная' },
  { href: '/universities', label: 'Университеты' },
  { href: '/services', label: 'Услуги' },
  { href: '/founders', label: 'Основатели' },
]

const services = [
  { icon: Landmark, title: 'Поступление в университеты Китая', text: 'Подберём вуз и программу, проверим требования и подготовим документы.' },
  { icon: MessageCircle, title: 'Языковые программы и подготовка к HSK', text: 'Выберем подходящий языковой курс и поможем уверенно начать обучение.' },
  { icon: FileCheck2, title: 'Визовое и документальное сопровождение', text: 'Сопроводим подготовку документов от заявки до получения визы.' },
  { icon: Headphones, title: 'Поддержка на всех этапах поступления', text: 'Остаёмся рядом до зачисления, приезда и адаптации в Китае.' },
]

const universities = [
  ['Бакалавриат', 'Обучение от 4 лет на китайском или английском языке.'],
  ['Магистратура', 'Программы для развития академической и карьерной траектории.'],
  ['Стипендии', 'Поможем разобраться в доступных грантах и требованиях.'],
]

const initialForm = { name: '', phone: '', email: '', message: '' }

function ConsultationForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: 'idle', text: '' })

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }))
    if (status.type !== 'idle') setStatus({ type: 'idle', text: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (!form.name.trim() || phoneDigits.length < 6 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus({ type: 'error', text: 'Заполните ФИО, корректный номер телефона и почту.' })
      return
    }

    setStatus({ type: 'loading', text: '' })
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.success) throw new Error(result.error)
      setForm(initialForm)
      setStatus({ type: 'success', text: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.' })
    } catch (error) {
      setStatus({ type: 'error', text: error.message || 'Не удалось отправить заявку. Попробуйте ещё раз.' })
    }
  }

  return (
    <section className="consultation-section" id="consultation" aria-labelledby="form-title">
      <div className="container form-layout">
        <div className="form-copy">
          <p className="section-kicker">Консультация EduBright</p>
          <h2>Сделайте первый шаг к учёбе в Китае</h2>
          <p>Расскажите о своей цели, а мы подскажем подходящие программы и дальнейшие шаги.</p>
          <div className="response-note"><CheckCircle2 size={21} /> Отвечаем на заявки в ближайшее рабочее время</div>
        </div>
        <div className="form-card">
          <div className="form-heading">
            <span className="heading-icon"><ClipboardPenLine size={27} /></span>
            <div><h3 id="form-title">Получите консультацию</h3><p>Оставьте контакты — мы на связи.</p></div>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <label className="field"><UserRound size={20} /><input aria-label="ФИО" name="name" value={form.name} onChange={handleChange} placeholder="Ваше ФИО" autoComplete="name" required /></label>
            <label className="field"><Phone size={20} /><input aria-label="Номер телефона" name="phone" value={form.phone} onChange={handleChange} placeholder="Номер телефона" autoComplete="tel" type="tel" required /></label>
            <label className="field"><Mail size={20} /><input aria-label="Электронная почта" name="email" value={form.email} onChange={handleChange} placeholder="Электронная почта" autoComplete="email" type="email" required /></label>
            <label className="field textarea"><MessageCircle size={20} /><textarea aria-label="Сообщение или вопрос" name="message" value={form.message} onChange={handleChange} placeholder="Сообщение или вопрос (необязательно)" rows="4" /></label>
            <button className="primary-button submit-button" type="submit" disabled={status.type === 'loading'}>{status.type === 'loading' ? 'Отправка…' : 'Отправить заявку'}</button>
            {status.type !== 'idle' && status.type !== 'loading' && <p className={`form-status ${status.type}`} role="status">{status.type === 'success' && <CheckCircle2 size={18} />}{status.text}</p>}
          </form>
          <p className="privacy"><ShieldCheck size={18} /> Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <section className="home-hero container" id="home">
      <div className="intro home-intro">
        <h1>Образование<br /><span>в Китае</span> <b aria-hidden="true">🇨🇳</b></h1>
        <p className="lead">Качественное образование, международные перспективы и яркое будущее вместе с EduBright.</p>
      </div>
    </section>
  )
}

function UniversitiesSection() {
  return <section className="university-section" id="universities" aria-labelledby="universities-title">
    <div className="container">
      <div className="page-intro"><p className="section-kicker">Университеты Китая</p><h2 id="universities-title">Учёба, которая<br /><span>расширяет горизонты</span></h2><p>Подберём университет, в котором ваши цели, язык обучения и бюджет встретятся с реальными возможностями.</p></div>
      <div className="info-grid">{universities.map(([title, text], index) => <article className="info-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div>
  </section>
}

function ServicesSection() {
  return <section className="services-section" id="services" aria-labelledby="services-title">
    <div className="container">
      <p className="section-kicker">Услуги EduBright</p>
      <h2 id="services-title">Полное сопровождение<br />на пути к цели</h2>
      <div className="service-grid">{services.map(({ icon: Icon, title, text }) => <article className="service-card" key={title}><span className="service-icon"><Icon size={23} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div>
  </section>
}

function FoundersSection() {
  return (
    <section className="founders-section" id="founders" aria-labelledby="founders-title">
      <div className="container">
        <div className="founders-heading">
          <div>
            <p className="section-kicker">Люди за EduBright</p>
            <h2 id="founders-title">Знакомьтесь с<br /><span>основателями</span></h2>
          </div>
          <p>Мы сами прошли путь поступления и учёбы в Китае — поэтому помогаем студентам уверенно идти своим.</p>
        </div>

        <article className="founder-profile">
          <div className="founder-photo-wrap">
            <img className="founder-photo" src="/assets/boden-darezhan.jpeg" alt="Боден Дарежан" />
            <div className="founder-photo-caption"><span>China · Education</span><strong>EduBright.cn</strong></div>
          </div>

          <div className="founder-content">
            <p className="founder-role">Основатель EduBright.cn</p>
            <h3>Боден<br /><span>Дарежан</span></h3>
            <p className="founder-lead">Помогает студентам превратить поступление в Китай из сложной задачи в <strong>понятный маршрут.</strong></p>

            <div className="founder-facts" aria-label="Ключевой опыт Бодена Дарежана">
              <div><span className="fact-icon"><Globe2 size={18} /></span><b>3+ года</b><small>в образовании Китая</small></div>
              <div><span className="fact-icon"><Languages size={18} /></span><b>2+ года</b><small>преподавания китайского и HSK</small></div>
              <div><span className="fact-icon"><GraduationCap size={18} /></span><b>Личный опыт</b><small>учёбы и адаптации в Китае</small></div>
            </div>

            <div className="founder-bio">
              <p>Более 3 лет работаю в сфере образования в Китае и занимаюсь сопровождением студентов при поступлении в китайские университеты. Имею практический опыт работы с образовательными программами, подготовкой документов и взаимодействием с университетами Китая.</p>
              <p>Более 2 лет преподаю китайский язык и занимаюсь подготовкой студентов к HSK. Проходил языковое и академическое обучение в Китае, благодаря чему знаком с системой образования не только профессионально, но и на личном опыте.</p>
              <p>В настоящее время обучаюсь по направлению <strong>International Economics and Trade.</strong> Специализируюсь на вопросах поступления, обучения и адаптации иностранных студентов в Китае.</p>
              <p>Являюсь основателем образовательного проекта <strong>EduBright.cn.</strong></p>
            </div>
          </div>
        </article>

        <article className="founder-profile founder-profile--second">
          <div className="founder-photo-wrap">
            <img className="founder-photo founder-photo--ryana" src="/assets/ryana-bakirova.jpeg" alt="Абакирова Райана" />
            <div className="founder-photo-caption"><span>Hangzhou · China</span><strong>EduBright.cn</strong></div>
          </div>

          <div className="founder-content">
            <p className="founder-role">Со-руководитель EduBright</p>
            <h3>Абакирова<br /><span>Райана</span></h3>
            <p className="founder-lead">Помогает студентам разобраться в китайском образовании и уверенно начать <strong>свой путь в Китае.</strong></p>

            <div className="founder-facts" aria-label="Ключевой опыт Абакировой Райаны">
              <div><span className="fact-icon"><Globe2 size={18} /></span><b>Ханчжоу</b><small>год языковой подготовки</small></div>
              <div><span className="fact-icon"><Languages size={18} /></span><b>1+ год</b><small>преподавания китайского языка</small></div>
              <div><span className="fact-icon"><GraduationCap size={18} /></span><b>Chinese Business</b><small>бакалавриат на китайском языке</small></div>
            </div>

            <div className="founder-bio">
              <p>Работаю в сфере китайского языка, международного образования и сопровождения студентов при поступлении в университеты Китая. Прошла годовую языковую подготовку в городе Ханчжоу.</p>
              <p>В настоящее время обучаюсь на китайском языке по программе <strong>Chinese Business.</strong> Имею практический опыт подбора образовательных программ, подготовки документов, взаимодействия с китайскими университетами и визового сопровождения студентов.</p>
              <p>Более года преподаю китайский язык. Являюсь со-руководителем образовательного проекта <strong>EduBright,</strong> специализирующегося на поступлении и сопровождении иностранных студентов в Китае.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const scrollToForm = () => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const closeMenu = () => setMenuOpen(false)
  const handleConsultationClick = () => { closeMenu(); scrollToForm() }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY <= 20) {
        setHeaderVisible(true)
      } else if (currentScrollY > lastScrollY.current + 4) {
        setHeaderVisible(false)
        setMenuOpen(false)
      } else if (currentScrollY < lastScrollY.current - 4) {
        setHeaderVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="site site--home">
      <div className="hero-backdrop" />
      <header className={`header container ${headerVisible ? 'header--visible' : 'header--hidden'}`}>
        <a className="brand" href="/" aria-label="EduBright — главная"><img src="/assets/edubright-logo.png" alt="EduBright" /></a>
        <nav className={`navigation ${menuOpen ? 'open' : ''}`} aria-label="Основная навигация">
          {navigation.map((item) => <a key={item.href} href={`#${item.href === '/' ? 'home' : item.href.slice(1)}`} onClick={closeMenu}>{item.label}</a>)}
          <button className="mobile-consult" onClick={handleConsultationClick} type="button">Получить консультацию</button>
        </nav>
        <button className="header-button" onClick={scrollToForm} type="button">Связаться с нами</button>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={23} /> : <Menu size={24} />}</button>
      </header>
      <HomePage />
      <UniversitiesSection />
      <ServicesSection />
      <FoundersSection />
      <ConsultationForm />
      <footer className="footer container">© {new Date().getFullYear()} EduBright. Помогаем учиться в Китае.</footer>
    </main>
  )
}
