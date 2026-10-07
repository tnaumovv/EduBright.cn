import { ArrowUpRight, Instagram } from 'lucide-react'
import { Brand } from './Header'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Brand light />
          <p>
            Помогаем учиться в Китае: от выбора программы до поступления и
            адаптации.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Дополнительная навигация">
          <span className="footer-label">Ваш путь</span>
          <div className="footer-links">
            <a href="#universities">Направления обучения</a>
            <a href="#services">Этапы сопровождения</a>
            <a href="#consultation">Консультация</a>
          </div>
        </nav>
        <div className="footer-social">
          <span className="footer-label">Будем на связи</span>
          <a
            className="instagram-link"
            href="https://www.instagram.com/edubright.cn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="EduBright в Instagram — откроется в новой вкладке"
          >
            <span className="instagram-icon">
              <Instagram size={22} aria-hidden="true" />
            </span>
            <span>
              <small>Instagram</small>
              <strong>@edubright.cn</strong>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <p>Поступление · китайский язык · HSK</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} EduBright</span>
        <span>Образование в Китае. Будущее без границ.</span>
        <a href="#home">
          Наверх <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
