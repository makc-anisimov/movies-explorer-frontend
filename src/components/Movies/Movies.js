import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import { DESKTOP_LG_WIDTH, DESKTOP_MD_WIDTH, LG_INITIAL_CARD_COUNT, LG_ROW_CARD_COUNT, MD_INITIAL_CARD_COUNT, MD_ROW_CARD_COUNT, SM_INITIAL_CARD_COUNT, SM_ROW_CARD_COUNT, START_ROW_CARD_COUNT } from "../../utils/const";

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
    let countAddedMovies = START_ROW_CARD_COUNT;
    if (currentWidth >= DESKTOP_LG_WIDTH) { countAddedMovies = LG_ROW_CARD_COUNT; }
    else if (currentWidth >= DESKTOP_MD_WIDTH) { countAddedMovies = MD_ROW_CARD_COUNT; }
    else countAddedMovies = SM_ROW_CARD_COUNT;
    return countAddedMovies;
  }

  const setDefaultMoviesCounts = () => {
    setCurrentWidth(document.body.clientWidth);
    if (currentWidth >= DESKTOP_LG_WIDTH) {
      setMaxMoviesCount(LG_INITIAL_CARD_COUNT);
    } else if (currentWidth >= DESKTOP_MD_WIDTH) {
      setMaxMoviesCount(MD_INITIAL_CARD_COUNT);
    } else {
      setMaxMoviesCount(SM_INITIAL_CARD_COUNT);
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