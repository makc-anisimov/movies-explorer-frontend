import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({
  handleLogin
}) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(userData)
      .then(() => {
        navigate(-1);
      })
      .catch(() => {
      });
  }

  return (
    <div className="login">
      <Link to="/" className="login__logo" />
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Рады видеть!</h1>
        <span className="login__input-title">E-mail</span>
        <input
          onChange={handleChange}
          className="login__input-value"
          type="email"
          id="email"
          placeholder="E-mail"
          required
        />
        <span className="login__input-title">Пароль</span>
        <input
          onChange={handleChange}
          className="login__input-value login__input-value_last"
          type="password"
          id="password"
          placeholder="Пароль"
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
