import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';
import Portfolio from './Portfolio/Portfolio';


export default function Main({loggedIn}
) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}