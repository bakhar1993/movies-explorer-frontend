import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";
import getMovies from "../../utils/MoviesApi";

function SearchForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function changeInput(e) {
    setValue(e.target.value);
  }

  function submitForm(e) {
    e.preventDefault();
    if (!value) {
      setError(true);
    } else {
      setError(false);
      getMovies().then((res) => {
        console.log(res);
      });
    }
  }

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={submitForm}>
          <div className="search__input-magnifier"></div>

          <input
            type="text"
            className="search__form-input"
            placeholder="Фильм"
            value={value}
            onChange={changeInput}
            required
          ></input>
          <span className={`search__error ${error && "search__error_active"}`}>
            Нужно ввести ключевое слово
          </span>
          <button type="submit" className="search__form-submit"></button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}

export default SearchForm;
