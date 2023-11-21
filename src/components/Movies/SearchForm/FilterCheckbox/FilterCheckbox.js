
export default function FilterCheckbox({
  isIncludingShortMovies,
  setIsIncludingShortMovies
}
) {
  function switchCheckbox() {
    setIsIncludingShortMovies(!isIncludingShortMovies);
  }
  return (
    <div className="filtercheckbox">
      <label className="filtercheckbox__switch">
          <input
            type="checkbox"
            checked={isIncludingShortMovies}
            name="shortFilm"
            id="shortFilm"
            className="filtercheckbox__smallthumb "
            onChange={switchCheckbox}
          />
          <span className="filtercheckbox__slider round"></span>
        </label>
      <p className="filterCheckbox__title">Короткометражки</p>
    </div>
  )
}