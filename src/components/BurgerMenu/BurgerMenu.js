import { NavLink } from "react-router-dom";
import "./BurgerMenu.css";

function BurgerMenu({ isOpen, handleBurger }) {
  return (
    <div className={`burger-menu ${isOpen ? "burger-menu_type_active" : ""}`}>
      <button
        className="burger-menu__button_close"
        onClick={handleBurger}
      ></button>

      <div className="burger-menu__link-list">
        <NavLink
          className="burger-menu__link"
          activeClassName="burger-menu__link_active"
          exact
          to="/"
        >
          Главная
        </NavLink>
        <NavLink
          className="burger-menu__link"
          activeClassName="burger-menu__link_active"
          to="/movies"
        >
          Фильмы{" "}
        </NavLink>
        <NavLink
          className="burger-menu__link"
          activeClassName="burger-menu__link_active"
          to="/saved-movies"
        >
          Сохранённые фильмы{" "}
        </NavLink>

        <NavLink
          className="burger-menu__link burger-menu__accaunt-link"
          activeClassName="burger-menu__link_active"
          to="/profile"
        >
          <p className="burger-menu__text">Аккаунт</p>
          <div className="burger-menu__icon"></div>
        </NavLink>
      </div>
    </div>
  );
}

export default BurgerMenu;
