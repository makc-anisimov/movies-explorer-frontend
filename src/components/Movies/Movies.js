import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

export default function Movies() {

  function ClickMoreButton() {
    // !TODO реализовать основную логику добавления фильмов
    console.log("TEST добавили фильмов!")
  }

  return (
    <>
      <Header loggedIn={true} savedMovies={false} />
      <main className="main">
        <SearchForm />
        <MoviesCardList isSavedMmovies={false} />
      </main>
      <Footer />
    </>
  );
}