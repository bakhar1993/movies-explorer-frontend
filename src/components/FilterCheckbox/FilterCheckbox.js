import "./FilterCheckbox.css";

function FilterCheckbox({ changeCheckbox,isShortFilm }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          onChange={changeCheckbox}
          checked={isShortFilm}
        ></input>
        <span className="filter-checkbox__input-span"></span>
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
