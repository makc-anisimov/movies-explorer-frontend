import { useEffect, useState } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import { MAIN_URL } from "../../../utils/const";

export default function SearchForm({
  getMovies,
  setIsMoviesSearchError,
  setMoviesList,
  setIsShowPreloader,
  setIsFindResult
}) {
  const [findText, setFindText] = useState("");
  const [placeholderText, setPlaceholderText] = useState('Фильм');
  const [isShowSearchError, setIsShowSearchError] = useState(false);
  const [isIncludingShortMovies, setIsIncludingShortMovies] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (JSON.parse(localStorage.getItem("showShortMovies"))) {
        setIsIncludingShortMovies(JSON.parse(localStorage.getItem("showShortMovies")));
      }
      if (localStorage.getItem("findMoviesSearchText")) {
        setFindText(localStorage.getItem("findMoviesSearchText"));
      }
      if (localStorage.getItem("findMoviesSearchResult")) {
        setMoviesList(JSON.parse(localStorage.getItem("findMoviesSearchResult")));
      }
    }
  }, []);

  function searchMovies(evt) {
    evt.preventDefault();
    if (findText !== '') {
      setIsShowPreloader(true);
      getMovies()
        .then((dataMovies) => {
          if (location.pathname === '/movies') {
            const movies = dataMovies.map((dataMovie) => {
              return {
                nameEN: dataMovie.nameEN,
                nameRU: dataMovie.nameRU,
                movieId: dataMovie.id,
                thumbnail: `${MAIN_URL}${dataMovie.image.formats.thumbnail.url}`,
                trailerLink: dataMovie.trailerLink,
                image: `${MAIN_URL}${dataMovie.image.url}`,
                description: dataMovie.description,
                year: dataMovie.year,
                duration: dataMovie.duration,
                director: dataMovie.director,
                country: dataMovie.country
              }
            });
            sortMovies(movies);
          }
          else sortMovies(dataMovies)
          setIsShowPreloader(false);
        })
        .catch((err) => {
          setIsMoviesSearchError(true);
          setIsShowPreloader(false)
          console.log('Ошибка получения информации о фильмах', err);
        })
    }
    else {
      setPlaceholderText('  Введите данные для поиска');
      setIsShowSearchError(true);
    }

  }

  function sortMovies(movies) {
    const sortResult = [];
    movies.forEach(movie => {
      if ((movie.nameEN.toLowerCase().includes(findText.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(findText.toLowerCase()))
        && (isIncludingShortMovies || movie.duration > 40)) {
        sortResult.push(movie);
      }
    });
    setMoviesList(sortResult);
    setIsFindResult(true);
    if (location.pathname === '/movies') {
      localStorage.setItem("showShortMovies", JSON.stringify(isIncludingShortMovies));
      localStorage.setItem("findMoviesSearchText", findText);
      localStorage.setItem("findMoviesSearchResult", JSON.stringify(sortResult));
    }
  }

  function handleChange(evt) {
    if (isShowSearchError) {
      setIsShowSearchError(false);
      setPlaceholderText('Фильм');
    }
    setFindText(evt.target.value);
  }

  return (
    <div className="searchForm">
      <form
        className="searchForm__form"
        onSubmit={searchMovies}
        noValidate
      >
        <div className="searchForm__find">
          <input
            defaultValue={findText}
            onChange={handleChange}
            placeholder={placeholderText}
            className={`searchForm__find-input ${isShowSearchError ? 'searchForm__find-input_error' : ''}`}
            type="text"
            id="movie"
            minLength="1"
            required
          />
          <button
            className="searchForm__find-button link"
            type="submit"
          />
        </div>
        <FilterCheckbox
          isIncludingShortMovies={isIncludingShortMovies}
          setIsIncludingShortMovies={setIsIncludingShortMovies}
        />
      </form>
    </div>
  )
}