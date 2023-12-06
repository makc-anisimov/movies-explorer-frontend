import { Link, useLocation } from "react-router-dom";

export default function MenuMobilePopup({
  isOpen,
  onClose
}) {
  const location = useLocation();

  return (
    { isOpen } && (
      // <div className="popup popup_opened">
      <div className={`popup ${isOpen ? "popup_opened" : ""} popup_wiew-photo`} >
        <div className="menuMobilePopup">
          <button
            className="menuMobilePopup__close-button link"
            onClick={onClose}
            type="button"
            aria-label="закрыть форму">
          </button>
          <div className="menuMobilePopup__navigation">
            <Link
              to="/"
              className={`link menuMobilePopup__link ${(location.pathname === "/") && 'menuMobilePopup__link_active'}`}
            >
              Главная
            </Link>
            <Link
              to="/movies"
              className={`link menuMobilePopup__link ${(location.pathname === "/movies") && 'menuMobilePopup__link_active'}`}
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={`link menuMobilePopup__link ${(location.pathname === "/saved-movies") && 'menuMobilePopup__link_active'}`}
            >
              Сохранённые фильмы
            </Link>
            <Link to="/profile" className="link menuMobilePopup__navigation-account">Аккаунт</Link>
          </div>
        </div>
      </div >
    )
  );
}

