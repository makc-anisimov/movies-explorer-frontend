import { Link } from "react-router-dom";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <Link
            to={'https://github.com/makc-anisimov/how-to-learn'}
            className="link portfolio__link"
            target="_blank">
            <span className="portfolio__link-text">
              Статичный сайт
            </span>
            <span className="portfolio__link-text">
              &#8599;
            </span>
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link
            to={'https://github.com/makc-anisimov/russian-travel'}
            className="link portfolio__link"
            target="_blank">
            <span className="portfolio__link-text">
              Адаптивный сайт
            </span>
            <span className="portfolio__link-text">
              &#8599;
            </span>
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link
            to={'https://github.com/makc-anisimov/react-mesto-api-full-gha'}
            className="link portfolio__link"
            target="_blank">
            <span className="portfolio__link-text">
              Одностраничное приложение
            </span>
            <span className="portfolio__link-text">
              &#8599;
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}