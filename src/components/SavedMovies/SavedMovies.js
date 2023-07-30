import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies() {
  return (
    <>
      <Header loggedIn={true}/>
      <SearchForm />
      <MoviesCardList isSavedMmovies={true} />
      <Footer />
    </>
  );
}