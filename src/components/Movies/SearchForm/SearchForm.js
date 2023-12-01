import { useEffect, useState } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import { MAIN_URL, PLACEHOLDER_ERROR_TEXT } from "../../../utils/const";

export default function SearchForm({
  allMovies,
  getMovies,
  setIsMoviesSearchError,
  setMoviesList,
  setIsShowPreloader,
  setIsFindResult,
  isSearching,
  setIsSearching,

}) {
  const [findText, setFindText] = useState('');
  const [placeholderText, setPlaceholderText] = useState('Фильм');
  const [isShowSearchError, setIsShowSearchError] = useState(false);
  const [isIncludingShortMovies, setIsIncludingShortMovies] = useState(true);
  const [moviesSearchData, setMoviesSearchData] = useState([]); //данные фильмов в корректном формате
  const [sortedMovies, setSortedMovies] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (JSON.parse(localStorage.getItem("showShortMovies"))) {
        setIsIncludingShortMovies(JSON.parse(localStorage.getItem("showShortMovies")));
      }
      if (localStorage.getItem("findMoviesSearchText")) {
        setFindText(localStorage.getItem("findMoviesSearchText"));
      }
      if (findText && (allMovies.length !== 0)) {
        sortMovies(
          allMovies?.map((dataMovie) => {
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
          })
        )
      }
    }
  }, [allMovies]);

  useEffect(() => {
    filterShortMovies(sortedMovies);
  }, [sortedMovies, isIncludingShortMovies]);

  function filterShortMovies(movies) {
    const toggleResult = movies.filter(movie => (isIncludingShortMovies || movie.duration > 40));
    setMoviesList(toggleResult);
  }

  const searchMovies = (evt) => {
    evt.preventDefault();
    setIsShowPreloader(true);
    if (findText !== '') {
      localStorage.setItem("showShortMovies", JSON.stringify(isIncludingShortMovies));
      localStorage.setItem("findMoviesSearchText", findText);

      if (allMovies?.length === 0) {
        getMovies()
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error);
        });
      }
      if (location.pathname === '/movies') {
        const movies = allMovies?.map((dataMovie) => {
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
        setMoviesSearchData(movies);
      } else {
        sortMovies(allMovies);
        setMoviesSearchData(allMovies);
      }
      setIsShowPreloader(false);
    }
    else {
      setPlaceholderText(PLACEHOLDER_ERROR_TEXT);
      setIsShowSearchError(true);
    }
  }

  const sortMovies = (movies) => {
    const sortResult = [];
    movies.forEach(movie => {
      if (movie.nameEN.toLowerCase().includes(findText.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(findText.toLowerCase())) {
        sortResult.push(movie);
      }
    });
    setSortedMovies(sortResult);
    setIsFindResult(true);
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
            disabled={isSearching}
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