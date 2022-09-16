import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";

function SearchForm({clickSearchMov,changeCheckbox,requestText,setRequestText,isShortFilm}) {
  // const [value, setValue] = useState("");
  const [error, setError] = useState(false);


  function changeInput(e) {
    setRequestText(e.target.value);
  }

  function submitForm(e) {
    e.preventDefault();
    if (!requestText) {
      setError(true);
    } else {
      setError(false);
      clickSearchMov();
      
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
            value={requestText}
            onChange={changeInput}
            required
          ></input>
          <span className={`search__error ${error && "search__error_active"}`}>
            Нужно ввести ключевое слово
          </span>
          <button type="submit" className="search__form-submit"></button>
        </form>
        <FilterCheckbox changeCheckbox={changeCheckbox} 
        isShortFilm={isShortFilm}
        />
      </div>
    </section>
  );
}

export default SearchForm;
