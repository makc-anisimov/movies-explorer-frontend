// import MoviesMenu from './MoviesMenu/MoviesMenu'

import { Link } from "react-router-dom";
import MenuMobilePopup from "./MenuMobilePopup/MenuMobilePopup";
import { useState } from "react";

export default function Navigation({
  loggedIn,
  savedMovies
}) {

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
      {loggedIn &&
        <> {!savedMovies &&
          <>
            <nav className="header__navigation header__navigation_loggedIn">
              <div className="header__menu-films">
                <Link to="/movies" className="link header__link header__navigation-films header__link_opened">
                  Фильмы
                </Link>
                <Link to="/saved-movies" className="link header__link header__navigation-saved-films">
                  Сохранённые фильмы
                </Link>
              </div>
            </nav>
          </>
        }
          {savedMovies &&
            <nav className="header__navigation header__navigation_loggedIn">
              <div className="header__menu-films">
                <Link to="/movies" className="link header__link header__navigation-films ">
                  Фильмы
                </Link>
                <Link to="/saved-movies" className="link header__link header__navigation-saved-films header__link_opened">
                  Сохранённые фильмы
                </Link>
              </div>
            </nav>
          }
          <Link to="/profile" className="link header__link header__account">
            Аккаунт
          </Link>
          <button className="link header__link header__account_mobile" onClick={OpenMenuMobilePopup} />
        </>
      }
      {!loggedIn &&
        <nav className="header__navigation ">
          <div className="header__menu">
            <Link
              to="/signup"
              className="link header__link header__navigation-signup "
            >
              Регистрация
            </Link>
            <Link
              to="/signin"
              className="link header__link header__navigation-signin "
            >
              Войти
            </Link>
          </div>
        </nav>
      }
    </>
  )
}
