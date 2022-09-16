import { NavLink } from "react-router-dom";
import "./BurgerMenu.css";
import {MOVIES_PAGE, SAVED_MOVIES_PAGE, PROFILE_PAGE, HOME_PAGE} from "../../utils/constants";

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
          to={HOME_PAGE}
        >
          Главная
        </NavLink>
        <NavLink
          className="burger-menu__link"
          activeClassName="burger-menu__link_active"
          to={MOVIES_PAGE}
        >
          Фильмы{" "}
        </NavLink>
        <NavLink
          className="burger-menu__link"
          activeClassName="burger-menu__link_active"
          to={SAVED_MOVIES_PAGE}
        >
          Сохранённые фильмы{" "}
        </NavLink>

        <NavLink
          className="burger-menu__link burger-menu__accaunt-link"
          activeClassName="burger-menu__link_active"
          to={PROFILE_PAGE}
        >
          <p className="burger-menu__text">Аккаунт</p>
          <div className="burger-menu__icon"></div>
        </NavLink>
      </div>
    </div>
  );
}

export default BurgerMenu;
