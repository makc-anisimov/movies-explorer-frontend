export default function Footer() {
  const date = new Date();
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
      <div className="footer__nav">
        <p className="footer__date">&copy;&nbsp;{date.getFullYear()}</p>
        <div className="footer__menu">
          <a className="link footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
          <a className="link footer__link" href="https://github.com/">Github</a>
        </div>
      </div>
    </footer>
  )
}