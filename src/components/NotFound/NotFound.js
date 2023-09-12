import { Link } from "react-scroll";

export default function NotFound() {
  return (
    <div className="notfound">
      <h2 className="notfound__title">404</h2>
      <p className="notfound__info">Страница не найдена</p>
      <Link to="/" className="link notfound__link" >Назад</Link>
    </div>
  );
}