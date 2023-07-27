import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header({
	headerText,
	linkNavBar,
	textNavBarLink,
	loggedIn,
	signPage,
	userData
}) {
	return (
		<>
			{signPage &&
				<>
					<header className='header header_signPage'>
						<Link to="/" className="header__logo" />
						<h1 className='header__title'>
							{headerText}
						</h1>
					</header>
				</>
			}
			{!signPage &&
				<>
					<header className="header">
					<Link to="/" className="header__logo" />
x``						<Navigation
							loggedIn={false}
						// textNavBarLink={textNavBarLink}
						// linkNavBar={linkNavBar}
						// userData={userData}
						/>
					</header>
				</>}
		</>
	)
}