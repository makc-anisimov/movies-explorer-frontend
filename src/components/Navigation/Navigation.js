import { Link, useLocation } from "react-router-dom";
import MenuMobilePopup from "./MenuMobilePopup/MenuMobilePopup";
import { useState } from "react";

export default function Navigation({
  loggedIn,
}) {

  const location = useLocation();
  const [isMenuPopupOpened, setIsMenuPopupOpened] = useState(false);

  function OpenMenuMobilePopup() {
    setIsMenuPopupOpened(true);
  }
  function CloseMenuMobilePopup() {
    setIsMenuPopupOpened(false);
  }

  return (
    <>
      <MenuMobilePopup isOpen={isMenuPopupOpened} onClose={CloseMenuMobilePopup} />
      {loggedIn ?
        <>
          < nav className="header__navigation header__navigation_loggedIn">
            <div className="header__menu-films">
              <Link to="/movies"
                className={`link header__link header__navigation-films ${(location.pathname === "/movies") && 'header__link_active'}`}>
                Фильмы
              </Link>
              <Link to="/saved-movies"
                className={`link header__link header__navigation-films ${(location.pathname === "/saved-movies") && 'header__link_active'}`}>
                Сохранённые фильмы
              </Link>
            </div>
          </nav >
          <Link to="/profile" className="link header__link header__account">
            Аккаунт
          </Link>
          <button className="link header__link header__account_mobile" onClick={OpenMenuMobilePopup} />
        </>
        :
        <nav className="header__navigation ">
          <div className="header__menu">
            <Link to="/signup" className="link header__link header__navigation-signup">
              Регистрация
            </Link>
            <Link to="/signin" className="link header__link header__navigation-signin">
              Войти
            </Link>
          </div>
        </nav>
      }
    </>
  )
}
