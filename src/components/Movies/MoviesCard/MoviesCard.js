export default function MoviesCard({
  name,
  duration,
  saved,
  image,
  isSavedMmovies }
) {

  function AddFilmToSaved() {
    //  !!TODO сделать основную логику добавления/исключения фильма
    console.log('ТЕСТ сохранили фильм');
  }
  return (
    <li className="moviesCard">
      <div className="moviesCard__info">
        <div className="moviesCard__text">
          <h3 className="moviesCard__title">{name}</h3>
          <p className="moviesCard_duration">{duration}</p>
        </div>
        {!isSavedMmovies &&
          <>
            {saved &&
              <button className="link moviesCard__save moviesCard__save_saved" onClick={AddFilmToSaved} />
            }
            {!saved &&
              <button className="link moviesCard__save" onClick={AddFilmToSaved} />
            }
          </>
        }
        {isSavedMmovies &&
            <button className="link moviesCard__save moviesCard__remove-save" onClick={AddFilmToSaved} />
        }
      </div>
      <img className="moviesCard__banner" src={image} alt={name} />
    </li>
  )
}