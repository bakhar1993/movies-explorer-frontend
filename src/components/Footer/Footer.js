import { useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const location = useLocation();
  return (
    <footer
      className={`footer ${
        location.pathname !== "/" &&
        location.pathname !== "/movies" &&
        location.pathname !== "/saved-movies"
          ? "footer_type_none"
          : ""
      }`}
    >
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__content-container">
        <p className="footer__copyright">&copy; 2022</p>
        <div className="footer__link-list">
          <a className="footer__link" href="https://practicum.yandex.ru/">
            Яндекс.Практикум
          </a>
          <a className="footer__link" href="https://github.com/bakhar1993/">
            Github
          </a>
          <a
            className="footer__link"
            href="https://www.facebook.com/profile.php?id=100018056135832"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
