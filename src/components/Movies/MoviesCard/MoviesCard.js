import { Link, useLocation } from "react-router-dom";

export default function MoviesCard({
  movie,
  savedMovies,
  addToSaved,
  removeFromSaved,
}) {
  const location = useLocation();

  const isSaved = savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId)
  const deleted = savedMovies.find(savedMovie => savedMovie.movieId === movie.movieId);

  function getMovieDurationInText(mins) {
    if (mins < 60) return mins + 'м';
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  function handleClickLike() {
    if (location.pathname === '/movies') {
      if (!isSaved) {
        addToSaved({
          nameEN: movie.nameEN,
          nameRU: movie.nameRU,
          movieId: movie.movieId,
          thumbnail: movie.thumbnail,
          trailerLink: movie.trailerLink,
          image: movie.image,
          description: movie.description,
          year: movie.year,
          duration: movie.duration,
          director: movie.director,
          country: movie.country
        });
      }
      else removeFromSaved(deleted._id);
    }
    else removeFromSaved(movie._id);
  }

  return (
    <>
      <div className="moviesCard__info">
        <div className="moviesCard__text">
          <h3 className="moviesCard__title" title={movie.nameRU} >{movie.nameRU}</h3>
          <p className="moviesCard_duration">{getMovieDurationInText(movie.duration)}</p>
        </div>
        {(location.pathname === '/movies') &&
          <button
            className={` link moviesCard__save ${isSaved ? 'moviesCard__save_saved' : ''}`}
            onClick={handleClickLike}
          />
        }
        {(location.pathname === '/saved-movies') &&
          <button
            className="link moviesCard__save moviesCard__remove-save"
            onClick={handleClickLike}
          />
        }
      </div>
      <Link to={movie.trailerLink} className="link">
        <img className="moviesCard__banner" src={movie.thumbnail} alt={movie.nameRU} />
      </Link>
    </>
  )
}