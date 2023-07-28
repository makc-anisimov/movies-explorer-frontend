export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="link portfolio__link" href="https://github.com/makc-anisimov/how-to-learn">Статичный сайт</a>
        </li>
        <li className="portfolio__list-item">
          <a className="link portfolio__link" href="https://github.com/makc-anisimov/russian-travel">Адаптивный сайт</a>
        </li>
        <li className="portfolio__list-item">
          <a className="link portfolio__link" href="https://github.com/makc-anisimov/react-mesto-api-full-gha">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
}