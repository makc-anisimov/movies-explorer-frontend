
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import InfoTooltip from "./InfoTooltip";

export default function Register(
	// {
	// 	handleRegister,
	// 	isInfoToolTipOpened,
	// 	isInfoToolTipOk,
	// 	closeInfoToolTip,
	// }

) {
	// const [userData, setUserData] = useState({
	// 	email: "",
	// 	password: "",
	// });

	// function handleChange(e) {
	// 	const { name, value } = e.target;
	// 	setUserData({
	// 		...userData,
	// 		[name]: value,
	// 	});
	// }
	// function handleSubmit(evt) {
	// 	evt.preventDefault();
	// 	handleRegister(userData);
	// }
	return (
		<>
			<Header
				headerText="Добро пожаловать!"
				signPage={true}
			// textNavBarLink="Войти"
			// linkNavBar="/sign-in"
			/>
			{/* <form
				className="popup__form"
				id=""
				name={name}
				method="post"
				onSubmit={onSubmit}
			>
				<h2 className="popup__form-title">{title}</h2>
				{children}
				<button
					className="popup__save-button"
					type="submit">
					{buttonText}
				</button>
			</form> */}
			{/* <div className="sign">
				<form
					onSubmit={handleSubmit}
					className="sign__form">
					<h2 className="sign__form-title">Регистрация</h2>
					<input
						onChange={handleChange}
						className="sign__input-form"
						type="email"
						name="email"
						placeholder="Email"
						required
					/>
					<input
						onChange={handleChange}
						className="sign__input-form"
						type="password"
						name="password"
						placeholder="Пароль"
						required
					/>
					<button className="sign__submit-button">Зарегистрироваться</button>
				</form>
				<div className="sign__signin">
					<p>Уже зарегистрированы?&nbsp;</p>
					<Link to="/sign-in" className="sign__login-link">
						Войти
					</Link>
				</div>
			</div> */}
			{/* <InfoTooltip
				isOpen={isInfoToolTipOpened}
				isOk={isInfoToolTipOk}
				onClose={closeInfoToolTip}
				name='register'
			/> */}
			<Footer />
		</>
	)
}

