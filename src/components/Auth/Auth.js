import { Link } from "react-router-dom";
import "./Auth.css";
import logo from "../../images/logo.svg";

function Auth(props) {
  return (
    <section className="auth">
      <div className="auth__container">
        <img className="auth__logo" src={logo} alt="Логотип" />
        <h2 className="auth__title">{props.title}</h2>
        <form className="auth__form">
          {props.children}
          <button type="submit" className={`auth__button ${props.class ? props.class : '' }`} >
            {props.button}
          </button>
        </form>

        <p className="auth__text">
          {props.text}
          <Link className="auth__link link" to={props.href}>
            {props.link}
          </Link>{" "}
        </p>
      </div>
    </section>
  );
}

export default Auth;
