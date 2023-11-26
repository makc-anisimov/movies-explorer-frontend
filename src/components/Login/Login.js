import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopupInfo from "../PopupInfo/PopupInfo";
import { EMAIL_REGEXP } from "../../utils/const";

export default function Login({
  handleLogin
}) {
  const [isSpanErrorVisible, setIsSpanErrorVisible] = useState(false);
  const [spanText, setSpanText] = useState('');
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [isResultOk, setIsResultOk] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    if (isSpanErrorVisible) {
      setIsSpanErrorVisible(false);
    }
    if (!isEmailValid) {
      setIsEmailValid(true)
    }
    if (!isPasswordValid) {
      setIsPasswordValid(true)
    }

    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    checkFields();
    if ((EMAIL_REGEXP.test(userData.email)) && (userData.password.length > 0)) {
      handleLogin(userData)
        .then((res) => {
          if (res === 401) {
            setSpanText('Неправильная почта или пароль');
            setIsResultOk(false);
            setIsSpanErrorVisible(true);
          }
          if (res === 400) {
            setSpanText('Некоррректные параметры запроса');
            setIsResultOk(false);
            setIsSpanErrorVisible(true);
          }
          else navigate('/movies');
        })
        .catch((error) => {
          console.log('Login error: ', error)
        });
    }
    else {
      setIsSpanErrorVisible(true);
      setSpanText('Некорректно заполнены поля');
    }

  }

  const checkFields = () => {
    if (!(EMAIL_REGEXP.test(userData.email))) {
      setIsEmailValid(false);
      setSpanText('Поля заполнены некорректно');
      setIsSpanErrorVisible(true);
    }
    if (!(userData.password.length > 0)) {
      setIsPasswordValid(false);
      setSpanText('Поля заполнены некорректно');
      setIsSpanErrorVisible(true);
    }
  }

  function popupClose() {
    setIsPopupOpened(false);
  }

  return (
    <div className="login">
      <Link to="/" className="login__logo" />
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <h1 className="login__title">Рады видеть!</h1>
        <span className="login__input-title">E-mail</span>
        <input
          onChange={handleChange}
          className={`login__input-value ${(!isEmailValid) && 'login__input-value_error'}`}
          type="email"
          id="email"
          placeholder="E-mail"
          required
        />
        <span className="login__input-title">Пароль</span>
        <input
          onChange={handleChange}
          className={`login__input-value login__input-value_last ${(!isPasswordValid) && 'login__input-value_error'}`}
          type="password"
          id="password"
          placeholder="Пароль"
          required
        />
        <span className={`login__error ${(isSpanErrorVisible) && 'login__error_visible'}`}>{spanText}</span>
        <button className="login__submit-button link">Войти</button>
        <div className="login__infotool">
          <p>Ещё не зарегистрированы?&nbsp;</p>
          <Link to="/signup" className="login__infotool-link">
            Регистрация
          </Link>
        </div>
      </form>
      <PopupInfo
        isOpen={isPopupOpened}
        isOk={isResultOk}
        onClose={popupClose}
      />
    </div>
  );
}
