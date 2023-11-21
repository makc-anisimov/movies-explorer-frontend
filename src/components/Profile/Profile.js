import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export default function Profile({
  loggedIn,
  changeLoggedIn,
  onSubmit
}) {

  const currentUser = useContext(CurrentUserContext);
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log('currentUser', currentUser);
  }, [currentUser]);

  useEffect(() => {
    if ((isEmailChanged || isNameChanged) && !isProfileChanged) {
      setIsProfileChanged(true);
    }
    if (!isEmailChanged && !isNameChanged && isProfileChanged) {
      setIsProfileChanged(false);
    }

  }, [isEmailChanged, isNameChanged, isProfileChanged]);

  function handleChangeName(evt) {
    setIsNameChanged(evt.target.value !== currentUser.name)
  }

  function handleChangeEmail(evt) {
    setIsEmailChanged(evt.target.value !== currentUser.email)
  }

  function logout() {
    localStorage.clear();
    // localStorage.removeItem("jwt");
    navigate("/");
    changeLoggedIn();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      name: evt.target.elements.name.value,
      email: evt.target.elements.email.value
    }).then (() => console.log('ТЕСТ все ок')
    ).catch (() => console.log('ТЕСТ все НЕ ок'));
  }

  return (
    <>
      <Header loggedIn={loggedIn} savedMovies={false} />
      <form className="profile" onSubmit={handleSubmit}>
        <h2 className="profile__greeting">Привет, {currentUser.name}!</h2>
        <div className="profile__info">
          <div className="profile__name">
            <p className="profile__info-title">Имя</p>
            <input
              defaultValue={currentUser.name || ""}
              onInput={handleChangeName}
              className="profile__info-value"
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
              className="profile__info-value"
              id="email"
              placeholder="E-mail"
              required
            />
          </div>
        </div>
        <button
          className={`link profile__edit-button ${(isProfileChanged) && 'profile__edit-button_active'}`}
          type="submit"
          id="profileEditButton"
          disabled={(!isProfileChanged)}>
          Редактировать
        </button>
        <button className="link profile__logout-button" onClick={logout}>Выйти из аккаунта</button>
      </form>
    </>
  );
}