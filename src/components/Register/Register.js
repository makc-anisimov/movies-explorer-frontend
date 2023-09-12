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
					required
					placeholder="Имя"
				/>
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
					required
					placeholder="password"
				/>
				<span className="register__error register__error_visible">Что-то пошло не так...</span>

				<button className="register__submit-button link">Зарегистрироваться</button>
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
