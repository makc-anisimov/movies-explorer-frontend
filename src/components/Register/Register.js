import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopupInfo from "../PopupInfo/PopupInfo";
import { EMAIL_REGEXP } from "../../utils/const";

export default function Register({
	handleRegister,
	handleLogin,
	errorText,
  setErrorText,
}) {
	const navigate = useNavigate();
	const [isPopupOpened, setIsPopupOpened] = useState(false);
	const [isResultOk, setIsResultOk] = useState(true);
	const [isSpanErrorVisible, setIsSpanErrorVisible] = useState(false);
	const [spanText, setSpanText] = useState('');
	const [isNameValid, setIsNameValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);

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
		// checkFields();
	}

	const checkFields = () => {
		if (!((userData.name.length >= 2) && (userData.name.length <= 30))) {
			setIsNameValid(false);
			setSpanText('Поля заполнены некорректно');
			setIsSpanErrorVisible(true);
		}
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

	const handleSubmit = (evt) => {
		evt.preventDefault();
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
					})
				}) 
				.catch((err) => {
					if (err === 409) {
						setSpanText('Такой email уже зарегистрирован');
						setIsSpanErrorVisible(true);
					}
					else if (err === 400) {
						setSpanText('Неверные параметры запроса');
						setIsSpanErrorVisible(true);
					}
					else {
						setSpanText('Что-то пошло не так');
						setIsSpanErrorVisible(true);
					}
					setIsResultOk(false);
					setIsPopupOpened(true);
				});
		}
		else {
			setSpanText('Некорректно заполнены поля');
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
				<button className="register__submit-button link" type="submit">Зарегистрироваться</button>
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
