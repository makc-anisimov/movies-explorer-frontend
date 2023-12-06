import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Header({
	loggedIn
}) {
	return (
		<>
			<header className='header'>
				<Link to="/" className="header__logo" />
				<Navigation loggedIn={loggedIn}/>
			</header>
		</>
	)
}