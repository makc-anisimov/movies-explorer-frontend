import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies() {
  return (
    <>
      <Header loggedIn={true} savedMovies={true} />
      <main className="main">
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList isSavedMmovies={true} />
      </main>
      <Footer />
    </>
  );
}