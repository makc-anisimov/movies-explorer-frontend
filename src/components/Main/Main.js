// import { useContext } from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';

function Main(
  // {
  //   onEditAvatar,
  //   onEditProfile,
  //   onAddPlace,
  //   isImagePopupOpened,
  //   setIsImagePopupOpened,
  //   setSelectedCard,
  //   onCardLike,
  //   onCardDelete,
  //   cards
  // }
) {
  // const currentUser = useContext(CurrentUserContext);

  // const generatedCards = cards.map((card) => (
  //   <li className="element" key={card._id}>
  //     <Card
  //       card={card}
  //       onCardClick={setSelectedCard}
  //       isImagePopupOpened={isImagePopupOpened}
  //       setIsImagePopupOpened={setIsImagePopupOpened}
  //       onCardLike={onCardLike}
  //       onCardDelete={onCardDelete}
  //     />
  //   </li>
  // ));

  return (
    <>
      <Header loggedIn={false} />
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  )
}

export default Main;