import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login">
      <Link to="/" className="login__logo" />
      <form className="login__form">
        <h1 className="login__title">Рады видеть!</h1>
        <span className="login__input-title">E-mail</span>
        <input
          className="login__input-value"
          type="email"
          id="email"
          placeholder="email"
          required
        />
        <span className="login__input-title">Пароль</span>
        <input
          className="login__input-value login__input-value_last"
          type="password"
          id="password"
          placeholder="password"
          required
        />
        <span className="login__error login__error_visible">Что-то пошло не так...</span>
        <button className="login__submit-button link">Войти</button>
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
