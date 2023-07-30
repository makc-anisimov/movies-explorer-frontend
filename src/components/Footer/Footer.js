import { Link } from "react-scroll";

export default function Footer() {
  const date = new Date();
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
      <div className="footer__nav">
        <p className="footer__date">&copy;&nbsp;{date.getFullYear()}</p>
        <div className="footer__menu">
          <Link to="https://practicum.yandex.ru/" className="link footer__link" >Яндекс.Практикум</Link>
          <Link to="https://github.com/" className="link footer__link" >Github</Link>
        </div>
      </div>
    </footer>
  )
}