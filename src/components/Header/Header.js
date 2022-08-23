import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

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
        (location.pathname === "/" && "header_type_home") ||
        (location.pathname !== "/" &&
        location.pathname !== "/movies" &&
        location.pathname !== "/saved-movies" &&
        location.pathname !== "/profile"
          ? "header_type_none"
          : "")
      }`}
    >
      <div className="header__container">
        <Link to={"/"} className="header__logo-link link">
          <img src={logo} className="header__logo" alt="Логотип" />
        </Link>

        {!loggedIn && (
          <div className="header__auth">
            <Link
              className="header__link header__link-signup link"
              to={"/signup"}
            >
              Регистрация
            </Link>
            <Link
              className="header__link header__link-signin link"
              to={"/signin"}
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
