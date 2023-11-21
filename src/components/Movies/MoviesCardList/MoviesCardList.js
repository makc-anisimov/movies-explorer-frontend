import MoviesCard from "../MoviesCard/MoviesCard";
import { mainApi } from "../../../utils/MainApi";
import { useEffect, useState } from "react";

export default function MoviesCardList({
  dataMovies,
  savedMovies,
  addToSaved,
  removeFromSaved,
  // setMoviesList,
  // setSavedMovies,
}) {

  // const [idSavedMovies, setIdSavedMovies] = useState([]);
  // const [savedMovies, setSavedMovies] = useState([]);

  // useEffect(() => {
  //   getSavedMovies();
  // }, [dataMovies]);

  // function getSavedMovies() {
  //   mainApi.getSavedMovies()
  //     .then((res) => {
  //       setSavedMovies(res);
  //       const resSavedMoviesID = res.map((savedMovie) => {
  //         return savedMovie.movieId
  //       })
  //       setIdSavedMovies(resSavedMoviesID);
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
    <>
      {(dataMovies.length !== 0)
        ?
        <div className="moviesCardList">
          <ul className="moviesCardList__list">
            {dataMovies.map((movie) => (
              <li className="moviesCard" key={movie.movieId}>
                <MoviesCard
                  movie={movie}
                  savedMovies={savedMovies}
                  addToSaved={addToSaved}   
                  removeFromSaved={removeFromSaved}               // idSavedMovies={idSavedMovies}
                />
              </li>
            ))}
          </ul>
        </div>
        :
        <p className='moviesCardList__info'>Ничего не найдено</p>
      }
    </>
  )
}