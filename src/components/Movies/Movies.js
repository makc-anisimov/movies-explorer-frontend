import { useEffect, useState, useContext } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import { MAIN_URL } from "../../utils/const";

export default function Movies(
  loggedIn
) {

  const [width, setWidth] = useState(document.body.clientWidth);
  const [maxMoviesCount, setMaxMoviesCount] = useState(12);
  const [addedMoviesCounter, setAddedMoviesCounter] = useState(0);
  const [moviesList, setMoviesList] = useState([]);
  const [isMoviesSearchError, setIsMoviesSearchError] = useState(false);
  const [isShowPreloader, setIsShowPreloader] = useState(false);
  const [isFindResult, setIsFindResult] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("findMoviesSearchResult")) {
      setMoviesList(JSON.parse(localStorage.getItem("findMoviesSearchResult")));
    }
    if (localStorage.getItem("findMoviesSearchText")) {
      setIsFindResult(true);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  useEffect(() => {
    getSavedMovies();
  }, [moviesList])

  const handleResize = () => {
    setWidth(document.body.clientWidth);
  };

  const getAllMovies = () => moviesApi.getMovies(); 
  
  const getSavedMovies = () => {
    mainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch(error => console.log('Не удалось получить информаию о сохранненных фильмах. Error: ',error));
  }


  const addToSaved = (movie) => {
    mainApi.addMovie(movie)
    .then((savedMovie) => {
      setSavedMovies([...savedMovies, savedMovie]);
      movie._id = savedMovie._id;
    })
    .catch((error) => {
      console.log('Ошибка при сохранении фильма. Error: ', error);
    })
  }

  const removeFromSaved = (id) => {
    mainApi.deleteMovie(id)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => movie._id !== id));
      })
      .catch((error) => {
        console.log('Ошибка. Не удалось удалить сохраненый фильм. Error: ', error);
      })
  }

  // if (width >= 1280) {
  //   maxCount = 12;
  //   counter = 3;
  // } else if (width >= 768) {
  //   maxCount = 8;
  //   counter = 2;
  // } else {
  //   maxCount = 5;
  //   counter = 1;
  // }
  const addMovies = () => {
    console.log('test ЕЩЕ pressed!');
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          getMovies={getAllMovies}
          setIsMoviesSearchError={setIsMoviesSearchError}
          setMoviesList={setMoviesList}
          setIsShowPreloader={setIsShowPreloader}
          setIsFindResult={setIsFindResult}
        />
        <p className={`movies__error ${(isMoviesSearchError) && 'movies__error_visible'}`}>Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз</p>
        <Preloader isShowPreloader={isShowPreloader} />
        {(isFindResult) &&
          <MoviesCardList
            dataMovies={moviesList}
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