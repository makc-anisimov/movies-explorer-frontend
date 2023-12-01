import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
// import { mainApi } from "../../utils/MainApi";

export default function Movies({
  loggedIn,
  allMovies,
  setAllMovies,
  getAllMovies,
  isShowPreloader,
  setIsShowPreloader,
  isMoviesSearchError,
  setIsMoviesSearchError,
  savedMovies,
  setSavedMovies,
  addToSaved,
  removeFromSaved,
  getSavedMovies,
}) {

  const [currentWidth, setCurrentWidth] = useState(document.body.clientWidth);
  const [maxMoviesCount, setMaxMoviesCount] = useState(0);
  const [moviesList, setMoviesList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFindResult, setIsFindResult] = useState(false);

  useEffect(() => {

    if (localStorage.getItem("allMovies")) {
      setAllMovies(JSON.parse(localStorage.getItem("allMovies")));
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    getSavedMovies();
    setDefaultMoviesCounts();
  }, [moviesList]);

  const handleResize = () => {
    setCurrentWidth(document.body.clientWidth);
  };

  const addMovies = () => {
    setMaxMoviesCount(maxMoviesCount + getAddMoviesCount());
  }

  const getAddMoviesCount = () => {
    let countAddedMovies = 0;
    if (currentWidth >= 1078) { countAddedMovies = 3; }
    else if (currentWidth >= 768) { countAddedMovies = 2; }
    else countAddedMovies = 1;
    return countAddedMovies;
  }

  const setDefaultMoviesCounts = () => {
    setCurrentWidth(document.body.clientWidth);
    if (currentWidth >= 1078) {
      setMaxMoviesCount(12);
    } else if (currentWidth >= 768) {
      setMaxMoviesCount(8);
    } else {
      setMaxMoviesCount(5);
    }
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          allMovies={allMovies}
          getMovies={getAllMovies}
          setIsMoviesSearchError={setIsMoviesSearchError}
          setMoviesList={setMoviesList}
          setIsShowPreloader={setIsShowPreloader}
          setIsFindResult={setIsFindResult}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        <p className={`movies__error ${(isMoviesSearchError) && 'movies__error_visible'}`}>Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз</p>
        <Preloader isShowPreloader={isShowPreloader} />
        {(isFindResult) &&
          <MoviesCardList
            dataMovies={moviesList?.slice(0, maxMoviesCount)}
            savedMovies={savedMovies}
            addToSaved={addToSaved}
            removeFromSaved={removeFromSaved}
          />
        }
        <button className={`link movies__more ${(maxMoviesCount < moviesList.length) && 'movies__more_visible'}`} onClick={addMovies}>Ещё</button>
      </main>
      <Footer />
    </>
  );
}