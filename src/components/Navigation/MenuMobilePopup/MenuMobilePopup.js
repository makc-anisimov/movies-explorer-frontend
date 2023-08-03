import { Link } from "react-router-dom";

export default function MenuMobilePopup({
  isOpen,
  onClose
}) {
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
            <Link to="/" className="link menuMobilePopup__navigation-main">Главная</Link>
            <Link to="/movies" className="link menuMobilePopup__navigation-films">Фильмы</Link>
            <Link to="/saved-movies" className="link menuMobilePopup__navigation-saved-films ">Сохранённые фильмы</Link>
            <Link to="/profile" className="link menuMobilePopup__navigation-account">Аккаунт</Link>
          </div>
        </div>
      </div >
    )
  );
}

