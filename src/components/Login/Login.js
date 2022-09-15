import Auth from "../Auth/Auth";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../utils/MainApi";
import { SIGNUP_PAGE } from "../../utils/constants";
import { useFormWithValidation } from "../../utils/useFormWithValidation";

function Login({setLoggedIn,setUserInfo}) {
  const [formError, setFormError] = useState("");
  const {values, handleChange, errors, isValid} = useFormWithValidation();

  const history = useHistory();

  function clickButton(e) {
    e.preventDefault();
    login({ email: values.email, password: values.password }).then((data) => {
if(data){
  localStorage.setItem('jwt',data.token);
setLoggedIn(true);
        history.push("/movies");
}
      })
      .catch(() => {
        setFormError('При авторизации произошла ошибка');
    });
  }
  

  return (
    <Auth
      title="Рады видеть!"
      button="Войти"
      class="auth__button_singin"
      text="Ещё не зарегистрированы? "
      link="Регистрация"
      href={SIGNUP_PAGE}
      buttonIsActive={isValid}
      submitForm={clickButton}
      formError={formError}
    >
      <label>
        <p className="auth__input-text">E-mail</p>
        <input
        name="email"
          type="email"
          className="auth__input"
          value={values.email || ''}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <span
          className="auth__input-error auth__input-error_active"
        >{errors.email}</span>
      </label>

      <label>
        <p className="auth__input-text">Пароль</p>
        <input
        name="password"
          type="password"
          className="auth__input"
          value={values.password || ''}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
      <span
          className="auth__input-error auth__input-error_active"
        >{errors.password}</span>
      </label>
    </Auth>
  );
}

export default Login;
