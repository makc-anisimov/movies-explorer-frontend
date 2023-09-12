import { Link } from 'react-router-dom';
// import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header({
	loggedIn,
	savedMovies
}) {
	return (
		<>
			<header className='header'>
				<Link to="/" className="header__logo" />
				<Navigation loggedIn={loggedIn} savedMovies={savedMovies}/>
			</header>
		</>
	)
}