import Header from "../Header/Header";

export default function Profile({
  name,
  mail
}) {
  return (
    <>
      <Header loggedIn={true} savedMovies={false} />
      <div className="profile">
        <h2 className="profile__greeting">Привет, {name}!</h2>
        <div className="profile__info">
          <div className="profile__name">
            <p className="profile__info-title">Имя</p>
            <p className="profile__info-value">{name}</p>
          </div>
          <div className="profile__mail">
            <p className="profile__info-title">E-mail</p>
            <p className="profile__info-value">{mail}</p>
          </div>
        </div>
        <button className="link profile__edit-button">Редактировать</button>
        <button className="link profile__logout-button">Выйти из аккаунта</button>
      </div>
    </>
  );
}