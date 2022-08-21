import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  return (
    <div className="navigation">
      <div
        className={`navigation__container ${
          props.isOpen ? "navigation__container_type_burger" : ""
        }`}
      >
        <div className="navigation__link-list">
          <NavLink className="navigation__link" activeClassName="navigation__link_active" to="/movies">
            Фильмы{" "}
          </NavLink>
          <NavLink className="navigation__link" activeClassName="navigation__link_active" to="/saved-movies">
            Сохранённые фильмы{" "}
          </NavLink>
        </div>
        <NavLink to='/profile' className="navigation__link navigation__link-profile" activeClassName="navigation__link_active">
          <p className="navigation__text">Аккаунт</p>
          <div className="navigation__icon"></div>
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
