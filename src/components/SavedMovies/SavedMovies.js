import { useEffect, useState } from "react";
import { mainApi } from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";

export default function SavedMovies() {
  const [moviesList, setMoviesList] = useState([]);
  const [isMoviesSearchError, setIsMoviesSearchError] = useState(false);
  const [isShowPreloader, setIsShowPreloader] = useState(false);
  const [isFindResult, setIsFindResult] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);


  const getMovies = () => mainApi.getSavedMovies();



  // const addToSaved = (movie) => {
  //   mainApi.addMovie(movie)
  //   .then((savedMovie) => {
  //     setSavedMovies([...savedMovies, savedMovie]);
  //     movie._id = savedMovie._id;
  //     // setIsSaved(true);
  //   })
  //   .catch((err) => {
  //     console.log('Ошибка при сохранении фильма: ', err);
  //   })
  // }

  const removeFromSaved = (id) => {
    mainApi.deleteMovie(id)
      .then(() => {
        setMoviesList(moviesList.filter(movie => movie._id !== id))
        // setSavedMovies(savedMovies.filter(movie => movie._id !== id));
      })
      .catch((error) => {
        console.log('Ошибка. Не удалось удалить сохраненый фильм. ', error);
      })
  }

  useEffect(() => {
    getMovies()
      .then((moviesData) => {
        // console.log(moviesData);
        setIsFindResult(true);
        setMoviesList(moviesData);
      })
      .catch((err) => {
        setIsMoviesSearchError(true);
        console.log(err);
      });
  }, [])

  return (
    <>
      <Header loggedIn={true} savedMovies={true} />
      <main className="main saved-movies">
        <SearchForm
          getMovies={getMovies}
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
            savedMovies={moviesList}
            removeFromSaved={removeFromSaved}
          />
        }
      </main>
      <Footer />
    </>
  );
}