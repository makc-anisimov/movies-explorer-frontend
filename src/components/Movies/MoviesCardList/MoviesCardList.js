import MoviesCard from "../MoviesCard/MoviesCard";
import imgFilm from '../../../images/1.jpg'
export default function MoviesCardList({
 isSavedMmovies,
  isMovies
}
) 
{
  return (
    <div className="moviesCardList">
      <ul className="moviesCardList__list">
        {/* временно пока нет данных с бэкенда */}
        <MoviesCard name={"33 слова о lkbyyyydddddddd"} duration={"1ч 47мин"} saved={true} image={imgFilm} isSavedMmovies={isSavedMmovies} />
        <MoviesCard name={"7 слова о дизайне"} duration={"1ч 47мин"} saved={false} image={imgFilm} isSavedMmovies={isSavedMmovies} />
        <MoviesCard name={"8 слова о дизайне"} duration={"1ч 47мин"} saved={false} image={imgFilm}isSavedMmovies={isSavedMmovies} />
        <MoviesCard name={"9 слова о дизайне"} duration={"1ч 47мин"} saved={false} image={imgFilm} isSavedMmovies={isSavedMmovies} />
      </ul>
    </div>
  )
}