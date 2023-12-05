import { useEffect, useState } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { PLACEHOLDER_ERROR_TEXT } from "../../../utils/const";

export default function SearchForm({
  moviesList,
  sortMovies,
  savedMovies,
  sortedMovies,
  isSearching,
  setIsSearching,
  setMoviesList,
  setIsShowPreloader,
  setIsFindResult,
}) {

  // console.log('savedMovies', savedMovies);

  const [findText, setFindText] = useState('');
  const [placeholderText, setPlaceholderText] = useState('Фильм');
  const [isShowSearchError, setIsShowSearchError] = useState(false);
  const [isShowShortMovies, setIsShowShortMovies] = useState(false);
  // const [sortedMovies, setSortedMovies] = useState([]);

  // useEffect(() => {
  //   if (sortedMovies.length !== savedMovies.length ) {
  //     setSortedMovies(savedMovies);
  //   }
  // }, []);

  useEffect(() => {
    filterShortMovies();
  }, [ sortedMovies, isShowShortMovies]);  
  


  const filterShortMovies = () => {
    const toggleResult = sortedMovies.filter(movie => (!isShowShortMovies || movie.duration <= 40));
    setMoviesList(toggleResult);
  }

  const searchMovies = (evt) => {
    evt.preventDefault();
    setIsShowPreloader(true);
    // sortMovies(savedMovies, findText);
    if (findText !== '') {
      setIsSearching(true);
      sortMovies(savedMovies, findText);
      // setIsShowPreloader(false);
      setIsSearching(false);
    } else {
      setPlaceholderText(PLACEHOLDER_ERROR_TEXT);
      setIsShowSearchError(true);
    }
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