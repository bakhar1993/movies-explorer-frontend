import { NavLink } from "react-router-dom";
import "./Navigation.css";
import {MOVIES_PAGE, SAVED_MOVIES_PAGE, PROFILE_PAGE} from "../../utils/constants";

function Navigation(props) {
  return (
    <div className="navigation">
      <div
        className={`navigation__container ${
          props.isOpen ? "navigation__container_type_burger" : ""
        }`}
      >
        <div className="navigation__link-list">
          <NavLink className="navigation__link link" activeClassName="navigation__link_active" to={MOVIES_PAGE}>
            Фильмы{" "}
          </NavLink>
          <NavLink className="navigation__link link" activeClassName="navigation__link_active" to={SAVED_MOVIES_PAGE}>
            Сохранённые фильмы{" "}
          </NavLink>
        </div>
        <NavLink to={PROFILE_PAGE} className="navigation__link navigation__link-profile link" activeClassName="navigation__link_active">
          <p className="navigation__text">Аккаунт</p>
          <div className="navigation__icon"></div>
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
