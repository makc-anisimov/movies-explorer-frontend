import { useEffect, useState } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import { MAIN_URL, PLACEHOLDER_ERROR_TEXT } from "../../../utils/const";

export default function SearchForm({
  allMovies,
  getMovies,
  setMoviesList,
  setIsShowPreloader,
  setIsFindResult,
  isSearching,
  setIsSearching,

}) {
  const [findText, setFindText] = useState('');
  const [placeholderText, setPlaceholderText] = useState('Фильм');
  const [isShowSearchError, setIsShowSearchError] = useState(false);
  const [isShowShortMovies, setIsShowShortMovies] = useState(false);
  const [sortedMovies, setSortedMovies] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (JSON.parse(localStorage.getItem("showShortMovies"))) {
        setIsShowShortMovies(JSON.parse(localStorage.getItem("showShortMovies")));
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
    } else {
      setMoviesList(allMovies);
    }
  }, [allMovies]);

  useEffect(() => {
    filterShortMovies(sortedMovies);
  }, [sortedMovies, isShowShortMovies]);

  function filterShortMovies(movies) {
    const toggleResult = movies.filter(movie => (!isShowShortMovies || movie.duration <= 40));
    setMoviesList(toggleResult);
  }

  const searchMovies = (evt) => {
    evt.preventDefault();
    setIsShowPreloader(true);
    if (findText !== '') {
      if (location.pathname === '/movies') {
        localStorage.setItem("showShortMovies", JSON.stringify(isShowShortMovies));
        localStorage.setItem("findMoviesSearchText", findText);
      }
      if (allMovies?.length === 0) {
        getMovies()
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
      } else {
        sortMovies(allMovies);
      }
      setIsShowPreloader(false);
      setIsSearching(false);

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
          isShowShortMovies={isShowShortMovies}
          setIsShowShortMovies={setIsShowShortMovies}
        />
      </form>
    </div>
  )
}