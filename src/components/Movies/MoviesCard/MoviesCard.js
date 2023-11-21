import { Link, useLocation } from "react-router-dom";
import { mainApi } from "../../../utils/MainApi";
import { useEffect, useState } from "react";

export default function MoviesCard({
  movie,
  savedMovies,
  addToSaved,
  removeFromSaved,
}) {
  const location = useLocation();

  const [deleteId, setDeleteId] = useState('');
  // const cardLikeButtonClassName = (` link moviesCard__save ${isLiked ? 'moviesCard__save_saved' : ''}`);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (location.pathname === '/movies') {
      const isMovieSaved = savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId)
      setIsSaved(isMovieSaved);
      if (isMovieSaved) {
        const savedMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.movieId);
        setDeleteId(savedMovie._id);
      }
    }
  }, [savedMovies, location.pathname]);

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
      else removeFromSaved(deleteId);
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