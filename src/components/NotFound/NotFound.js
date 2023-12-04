import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notfound">
      <h2 className="notfound__title">404</h2>
      <p className="notfound__info">Страница не найдена</p>
      <button type="button" className="link notfound__link" onClick={() => { navigate(-1) }}>
        Назад
      </button>
    </div>
  );
}