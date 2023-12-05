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
  const [moviesList, setMoviesList] = useState([]); // список карточек для рендера
  const [savedMovies, setSavedMovies] = useState([]); // список всех сохр фильмов
  const [sortedMovies, setSortedMovies] = useState([]); //список отфильтрованных данных поиска по названию
  const [isMoviesSearchError, setIsMoviesSearchError] = useState(false);
  const [isShowPreloader, setIsShowPreloader] = useState(false);
  const [isFindResult, setIsFindResult] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  // useEffect(() => {
  //   getMovies()
  //     .then((moviesData) => {
  //       setIsFindResult(true);
  //       setSavedMovies(moviesData);
  //       setMoviesList(moviesData);
  //     })
  //     .catch((err) => {
  //       setIsMoviesSearchError(true);
  //       console.log(err);
  //     });
  // }, [])

  // const getMovies = () => mainApi.getSavedMovies();

  const getMovies = () => {
    setIsShowPreloader(true);
    mainApi.getSavedMovies()
      .then((moviesData) => {
        setIsFindResult(true);
        setSavedMovies(moviesData);
        setSortedMovies(moviesData)
        // setMoviesList(moviesData);
      })
      .catch((err) => {
        setIsMoviesSearchError(true);
        console.log('Error: ', err);
      });
    setIsShowPreloader(false);
  }

  const sortMovies = ( movies, findText ) => {
    const seachResult = movies.filter((movie) => {
      return (movie.nameEN.toLowerCase().includes(findText.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(findText.toLowerCase()))
    });
    setSortedMovies(seachResult);
    // return seachResult;
  }

  // const sortMovies = (movies) => {
  //   const sortResult = [];
  //   movies.forEach(movie => {
  //     if (movie.nameEN.toLowerCase().includes(findText.toLowerCase()) ||
  //       movie.nameRU.toLowerCase().includes(findText.toLowerCase())) {
  //       sortResult.push(movie);
  //     }
  //   });
  //   setSortedMovies(sortResult);
  //   setMoviesList(sortResult);
  //   setIsFindResult(true);
  // }


  const removeFromSaved = (id) => {
    mainApi.deleteMovie(id)
      .then(() => {
        setSortedMovies(sortedMovies.filter(movie => movie._id !== id))
      })
      .catch((error) => {
        console.log('Ошибка. Не удалось удалить сохраненый фильм. ', error);
      })
  }

  // useEffect(() => {
  //   getMovies()
  //     .then((moviesData) => {
  //       setIsFindResult(true);
  //       setSavedMovies(moviesData);
  //       setMoviesList(moviesData);
  //     })
  //     .catch((err) => {
  //       setIsMoviesSearchError(true);
  //       console.log(err);
  //     });
  // }, [])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main saved-movies">
        <SearchForm
          sortMovies={sortMovies}
          savedMovies={savedMovies}
          sortedMovies={sortedMovies}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          moviesList={moviesList}
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