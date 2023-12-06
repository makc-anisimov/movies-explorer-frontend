
export default function FilterCheckbox({
  // sortedMovies,
  // filterShortMovies,
  isShowShortMovies,
  setIsShowShortMovies
}
) {
  function switchCheckbox() {
    setIsShowShortMovies(!isShowShortMovies);
    // filterShortMovies(sortedMovies);
  }
  return (
    <div className="filtercheckbox">
      <label className="filtercheckbox__switch">
        <input
          type="checkbox"
          checked={isShowShortMovies}
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