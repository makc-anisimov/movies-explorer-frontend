import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login">
      <Link to="/" className="register__logo" />
      <form className="register__form">
        <h1 className="login__title">Рады видеть!</h1>
        <span className="register__input-title">E-mail</span>
        <input
          className="register__input-value"
          type="email"
          id="email"
        />
        <span className="register__input-title">Пароль</span>
        <input
          className="register__input-value"
          type="password"
          id="password"
        />

        <button className="login__submit-button">Войти</button>
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
