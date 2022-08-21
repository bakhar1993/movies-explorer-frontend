import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__input-magnifier"></div>
          <input
            type="text"
            className="search__form-input"
            placeholder="Фильм"
          ></input>

          <button type="submit" className="search__form-submit"></button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}

export default SearchForm;
