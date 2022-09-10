import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import {MOVIES_PAGE, SAVED_MOVIES_PAGE, PROFILE_PAGE, HOME_PAGE, SIGNUP_PAGE, SIGNIN_PAGE} from "../../utils/constants";

function Header({ loggedIn }) {
  const location = useLocation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function handleBUrgerMenu() {
    isOpenMenu ? setIsOpenMenu(false) : setIsOpenMenu(true);
  }

  return (
    <header
      // className={`header ${(location.pathname === "/" && "header_type_home") || (!loggedIn && location.pathname !== "/" && "header_type_none")}`}
      className={`header ${
        (location.pathname === HOME_PAGE && "header_type_home") ||
        (location.pathname !== HOME_PAGE &&
        location.pathname !== MOVIES_PAGE &&
        location.pathname !== SAVED_MOVIES_PAGE &&
        location.pathname !== PROFILE_PAGE
          ? "header_type_none"
          : "")
      }`}
    >
      <div className="header__container">
        <Link to={HOME_PAGE} className="header__logo-link link">
          <img src={logo} className="header__logo" alt="Логотип" />
        </Link>

        {!loggedIn && (
          <div className="header__auth">
            <Link
              className="header__link header__link-signup link"
              to={SIGNUP_PAGE}
            >
              Регистрация
            </Link>
            <Link
              className="header__link header__link-signin link"
              to={SIGNIN_PAGE}
            >
              Войти
            </Link>
          </div>
        )}

        {loggedIn && (
          <>
            {" "}
            <Navigation />
            <button
              type="batton"
              className="header__burger-button"
              onClick={handleBUrgerMenu}
            ></button>
            <BurgerMenu isOpen={isOpenMenu} handleBurger={handleBUrgerMenu} />{" "}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
