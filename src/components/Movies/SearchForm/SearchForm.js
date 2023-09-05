import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
  return (
    <div className="searchForm">
      <form
        className="searchForm__form"
        onSubmit={console.log('test submit form')}
      >
        <div className="searchForm__find">
          <input
            placeholder="Фильм"
            className="searchForm__find-input"
            type="text"
            id="film"
          />
          <button
            className="link searchForm__find-button"
            type="submit"
          />
        </div>
        <FilterCheckbox />
      </form>
    </div>
  )
}