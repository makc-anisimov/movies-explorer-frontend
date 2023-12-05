import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopupInfo from "../PopupInfo/PopupInfo";
import { BAD_REQUEST_ERROR_TEXT, CONFLICT_ERROR_TEXT, EMAIL_REGEXP, FIELD_ERROR_TEXT, UNKNOWN_ERROR_TEXT } from "../../utils/const";

export default function Register({
	handleRegister,
	handleLogin,
	errorText,
}) {
	const navigate = useNavigate();
	const [isPopupOpened, setIsPopupOpened] = useState(false);
	const [isResultOk, setIsResultOk] = useState(true);
	const [isSpanErrorVisible, setIsSpanErrorVisible] = useState(false);
	const [spanText, setSpanText] = useState('');
	const [isNameValid, setIsNameValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [userData, setUserData] = useState({
		email: "",
		name: "",
		password: "",
	});

	useEffect(() => {
		if (errorText !== '') {
			setIsResultOk(false);
			setSpanText(errorText);
			setIsSpanErrorVisible(true);
		} else {
			setIsResultOk(true);
			setSpanText('');
			setIsSpanErrorVisible(false);
		}
	}, [errorText]);

	const handleChange = (e) => {
		if (isSpanErrorVisible) {
			setIsSpanErrorVisible(false);
		}
		if (!isNameValid) {
			setIsNameValid(true)
		}
		if (!isEmailValid) {
			setIsEmailValid(true)
		}
		if (!isPasswordValid) {
			setIsPasswordValid(true)
		}

		const { name, value } = e.target;
		setUserData({
			...userData,
			[name]: value,
		});
	}

	const checkFields = () => {
		if (!((userData.name.length >= 2) && (userData.name.length <= 30))) {
			setIsNameValid(false);
			setSpanText(FIELD_ERROR_TEXT);
			setIsSpanErrorVisible(true);
		}
		if (!(EMAIL_REGEXP.test(userData.email))) {
			setIsEmailValid(false);
			setSpanText(FIELD_ERROR_TEXT);
			setIsSpanErrorVisible(true);
		}
		if (!(userData.password.length > 0)) {
			setIsPasswordValid(false);
			setSpanText(FIELD_ERROR_TEXT);
			setIsSpanErrorVisible(true);
		}
	}

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setIsSubmitting(true);
		checkFields();
		if (((userData.name.length >= 2) && (userData.name.length <= 30))
			&& (userData.password.length > 0)
			&& (EMAIL_REGEXP.test(userData.email))
		) {
			handleRegister(userData)
				.then(() => {
					handleLogin({
						email: userData.email,
						password: userData.password
					});
					setIsSubmitting(false);
				})
				.catch((err) => {
					if (err === 409) {
						setSpanText(CONFLICT_ERROR_TEXT);
						setIsSpanErrorVisible(true);
					}
					else if (err === 400) {
						setSpanText(BAD_REQUEST_ERROR_TEXT);
						setIsSpanErrorVisible(true);
					}
					else {
						setSpanText(UNKNOWN_ERROR_TEXT);
						setIsSpanErrorVisible(true);
					}
					setIsResultOk(false);
					setIsPopupOpened(true);
					setIsSubmitting(false);
				});
		}
		else {
			setSpanText(FIELD_ERROR_TEXT);
			setIsSpanErrorVisible(true);
		}

	}

	function popupClose() {
		setIsPopupOpened(false);
		if (isResultOk) { navigate('/signin'); }
	}

	return (
		<div className="register">
			<Link to="/" className="register__logo" />
			<form className="register__form" onSubmit={handleSubmit} noValidate>
				<h1 className="register__title">Добро пожаловать!</h1>
				<span className="register__input-title">Имя</span>
				<input
					className={`register__input-value ${(!isNameValid) && 'register__input-value_error'}`}
					type="text"
					name="name"
					required
					placeholder="Имя"
					onChange={handleChange}
				/>
				<span className="register__input-title">E-mail</span>
				<input
					className={`register__input-value ${(!isEmailValid) && 'register__input-value_error'}`}
					type="email"
					name="email"
					placeholder="email"
					required
					onChange={handleChange}
				/>
				<span className="register__input-title">Пароль</span>
				<input
					className={`register__input-value register__input-value_last ${(!isPasswordValid) && 'register__input-value_error'}`}
					type="password"
					name="password"
					required
					placeholder="password"
					onChange={handleChange}
				/>
				<span className={`register__error ${(isSpanErrorVisible) && 'register__error_visible'}`}>{spanText}</span>
				<button
					className="register__submit-button link"
					type="submit"
					disabled={isSubmitting}
				>
					Зарегистрироваться
				</button>
				<div className="register__infotool">
					<p>Уже зарегистрированы?&nbsp;</p>
					<Link to="/signin" className="register__infotool-link">Войти</Link>
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
