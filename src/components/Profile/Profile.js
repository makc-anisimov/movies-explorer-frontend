import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { EMAIL_REGEXP } from "../../utils/const";
import PopupInfo from "../PopupInfo/PopupInfo";

export default function Profile({
  loggedIn,
  changeLoggedIn,
  onSubmit,
  userData,
  setUserData
}) {

  const currentUser = useContext(CurrentUserContext);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
	const [isResultOk, setIsResultOk] = useState(true);
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSpanErrorVisible, setIsSpanErrorVisible] = useState(false);
  const [spanText, setSpanText] = useState('');
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);

  const navigate = useNavigate();

  useEffect(() => {
    if ((currentUser.name !== name) || (currentUser.email !== email)) {
      setIsProfileChanged(true);
    }
    if ((currentUser.name === name) && (currentUser.email === email)) {
      setIsProfileChanged(false);
    }
  }, [name, email]);

  function handleChangeName(evt) {
    setIsNameValid(true);
    setIsSpanErrorVisible(false);
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setIsEmailValid(true);
    setIsSpanErrorVisible(false);
    setEmail(evt.target.value);
  }

  function logout() {
    localStorage.clear();
    navigate("/");
    changeLoggedIn();
  }

  function popupClose() {
		setIsPopupOpened(false);
	}

  const validateData = () => {
    if ((name.length < 2) || (name.length > 30)) {
      setIsNameValid(false);
    }
    if (!(EMAIL_REGEXP.test(email))) {
      setIsEmailValid(false);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isProfileChanged) {
      validateData();
      if (((name.length >= 2) && (name.length <= 30)) && (EMAIL_REGEXP.test(email))) {
        onSubmit({ name, email })
          .then((res) => {
            setIsResultOk(true);
            setIsPopupOpened(true);

            setUserData(res);
            setIsProfileChanged(false);
          })
          .catch((err) => {
            setIsResultOk(false);
            setIsPopupOpened(true);
            if (err === 400) {
              setIsSpanErrorVisible(true);
              setSpanText('Переданы некорректные параметры запроса');
            }
            else if (err === 409) {
              setIsSpanErrorVisible(true);
              setSpanText('Такой E-mail уже существует');
            }
            else {
              setIsSpanErrorVisible(true);
              setSpanText('Что-то пошло не так...');
            }
          });
      }
      else {
        setIsSpanErrorVisible(true);
        setSpanText('Некорректно заполнены поля');
      }
    }
  }

  return (
    <>
      <Header loggedIn={loggedIn} savedMovies={false} />
      <form className="profile" onSubmit={handleSubmit} noValidate>
        <h2 className="profile__greeting">Привет, {currentUser.name}!</h2>
        <div className="profile__info">
          <div className="profile__name">
            <p className="profile__info-title">Имя</p>
            <input
              defaultValue={currentUser.name || ""}
              onInput={handleChangeName}
              className={`profile__info-value ${(!isNameValid) && 'profile__info-value_error'}`}
              id="name"
              minLength="2"
              maxLength="30"
              placeholder="Имя"
              required
            />
          </div>
          <div className="profile__mail">
            <p className="profile__info-title">E-mail</p>
            <input
              type="email"
              defaultValue={currentUser.email || ""}
              onInput={handleChangeEmail}
              className={`profile__info-value ${(!isEmailValid) && 'profile__info-value_error'}`}
              id="email"
              placeholder="E-mail"
              required
            />
          </div>
        </div>
        <span className={`profile__error ${(isSpanErrorVisible) && 'profile__error_visible'}`}>{spanText}</span>
        <button
          className={`link profile__edit-button ${isProfileChanged ? 'profile__edit-button_active' : ''}`}
          type="submit"
          id="profileEditButton"
        >
          Редактировать
        </button>
        <button className="link profile__logout-button" onClick={logout}>Выйти из аккаунта</button>
      </form>
      <PopupInfo
				isOpen={isPopupOpened}
				isOk={isResultOk}
				onClose={popupClose}
			/>
    </>
  );
}