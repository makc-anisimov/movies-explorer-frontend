import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
  return (
    <div className="searchForm">
      <form
        className="searchForm__form"
        onSubmit={console.log('test submit form')}
      >
        {/* <div className="searchForm__inputWrapper"> */}
          <input
            placeholder="Фильм"
            className="searchForm__input"
            type="text"
          />
        {/* </div> */}

        <button
          className="link searchForm__find-button"
          type="submit"
        />
        <FilterCheckbox />
      </form>

    </div>

  )
}