
export default function FilterCheckbox() {

  return (
    <div className="filtercheckbox">
      <label className="filtercheckbox__switch">
          <input
            type="checkbox"
            defaultChecked={true}
            name="shortFilm"
            id="shortFilm"
            className="filtercheckbox__smallthumb "
          />
          <span className="filtercheckbox__slider round"></span>
        </label>
      {/* <label className="filtercheckbox__thumb">
        <input
          // className="filtercheckbox__switch"
          type="checkbox"
          defaultChecked={true}
          name="shortFilm"
          id="shortFilm"
        />
        <span className="filtercheckbox__switch" />
      </label> */}
      <p className="filterCheckbox__title">Короткометражки</p>
    </div>
  )
}