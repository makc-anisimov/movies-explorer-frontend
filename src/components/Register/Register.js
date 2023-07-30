import { Link } from "react-router-dom";

export default function Register() {
	return (
		<div className="register">
			<Link to="/" className="register__logo" />
			<form className="register__form">
			<h1 className="register__title">Добро пожаловать!</h1>
				<span className="register__input-title">Имя</span>
				<input
					className="register__input-value"
					type="text"
					id="name"
				/>
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
				<span className="register__error">Что-то пошло не так...</span>
				
				<button className="register__submit-button">Зарегистрироваться</button>
				<div className="register__infotool">
					<p>Уже зарегистрированы?&nbsp;</p>
					<Link to="/signin" className="register__infotool-link">
						Войти
					</Link>
				</div>
			</form>
		</div>
	);
}
