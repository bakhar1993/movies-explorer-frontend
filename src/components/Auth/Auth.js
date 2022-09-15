import { Link } from "react-router-dom";
import "./Auth.css";
import logo from "../../images/logo.svg";
import { HOME_PAGE } from "../../utils/constants";

function Auth(props) {
  return (
    <section className="auth">
      <div className="auth__container">
      <Link to={HOME_PAGE} className="auth__logo-link link"><img className="auth__logo" src={logo} alt="Логотип" /></Link>
        <h2 className="auth__title">{props.title}</h2>
        <form className="auth__form" onSubmit={(e)=>{ e.preventDefault(); props.submitForm(e)}}>
          {props.children}
        <span className={`auth__input-error ${
            props.formError
              ? " auth__input-error_active"
              : ""
          }`}>{props.formError}</span>
        <button type="submit" className={`auth__button ${props.class ? props.class : '' }`} disabled={!props.buttonIsActive} >
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
