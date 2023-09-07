import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login">
      <Link to="/" className="register__logo" />
      <form className="register__form">
        <h1 className="register__title">Рады видеть!</h1>
        <span className="register__input-title">E-mail</span>
        <input
          className="register__input-value"
          type="email"
          id="email"
          placeholder="email"
          required
        />
        <span className="register__input-title">Пароль</span>
        <input
          className="register__input-value register__input-value_last"
          type="password"
          id="password"
          placeholder="password"
          required
        />
        <span className="register__error register__error_visible">Что-то пошло не так...</span>
        <button className="register__submit-button">Войти</button>
        <div className="login__infotool">
          <p>Ещё не зарегистрированы?&nbsp;</p>
          <Link to="/signup" className="login__infotool-link">
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
}
