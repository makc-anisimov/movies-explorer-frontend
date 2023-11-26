import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  dataMovies,
  savedMovies,
  addToSaved,
  removeFromSaved,
}) {

  return (
    <>
      {(dataMovies.length !== 0)
        ?
        <div className="moviesCardList">
          <ul className="moviesCardList__list">
            {dataMovies?.map((movie) => (
              <li className="moviesCard" key={movie.movieId}>
                <MoviesCard
                  movie={movie}
                  savedMovies={savedMovies}
                  addToSaved={addToSaved}
                  removeFromSaved={removeFromSaved}
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