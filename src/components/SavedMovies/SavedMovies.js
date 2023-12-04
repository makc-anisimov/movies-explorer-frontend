import { useEffect, useState } from "react";
import { mainApi } from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../SavedMovies/SearchForm/SearchForm";

export default function SavedMovies({
  loggedIn
}) {
  const [moviesList, setMoviesList] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isMoviesSearchError, setIsMoviesSearchError] = useState(false);
  const [isShowPreloader, setIsShowPreloader] = useState(false);
  const [isFindResult, setIsFindResult] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const getMovies = () => mainApi.getSavedMovies();

  const removeFromSaved = (id) => {
    mainApi.deleteMovie(id)
      .then(() => {
        setMoviesList(moviesList.filter(movie => movie._id !== id))
      })
      .catch((error) => {
        console.log('Ошибка. Не удалось удалить сохраненый фильм. ', error);
      })
  }

  useEffect(() => {
    getMovies()
      .then((moviesData) => {
        setIsFindResult(true);
        setSavedMovies(moviesData);
        setMoviesList(moviesData);
      })
      .catch((err) => {
        setIsMoviesSearchError(true);
        console.log(err);
      });
  }, [])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main saved-movies">
        <SearchForm
          savedMovies={savedMovies}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          // setIsMoviesSearchError={setIsMoviesSearchError}
          setMoviesList={setMoviesList}
          setIsShowPreloader={setIsShowPreloader}
          setIsFindResult={setIsFindResult}
        />
        <p className={`movies__error ${(isMoviesSearchError) && 'movies__error_visible'}`}>Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз</p>
        <Preloader isShowPreloader={isShowPreloader} />
        {(isFindResult) &&
          <MoviesCardList
            dataMovies={moviesList}
            savedMovies={moviesList}
            removeFromSaved={removeFromSaved}
          />
        }
      </main>
      <Footer />
    </>
  );
}