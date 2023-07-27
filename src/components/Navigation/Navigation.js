// import MoviesMenu from './MoviesMenuX/MoviesMenu'

import { Link } from "react-router-dom";

function Navigation({
  loggedIn
}) {
  return (
    <>
      {loggedIn &&
        <>
          {/* <MoviesMenu /> */}
          <div className="header__menu">
            <div className="header__menu-films">
              <Link to="/movies" className="link header__link header__button-films">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="link header__link header__button-saved-films">
                Сохранённые фильмы
              </Link>
            </div>
            <Link to="/profile" className="link header__link header__account-link">
              Аккаунт
            </Link>
          </div>
        </>
      }
      {!loggedIn &&
        <div className="header__menu">
          <Link to="/signup" className="link header__link header__link">
            Регистрация
          </Link>
          <Link to="/signin" className="link header__link header__link_main">
            Войти
          </Link>
        </div>
      }
    </>
  )
}

export default Navigation;