import "./Register.css";
import Auth from "../Auth/Auth";
import { useState } from "react";
import { register } from "../../utils/MainApi";
import { useHistory } from "react-router-dom";
import { login } from "../../utils/MainApi";
import { SIGNIN_PAGE } from "../../utils/constants";
import { useFormWithValidation } from "../../utils/useFormWithValidation";


function Register({setLoggedIn}) {
  const [formError,setFormError] = useState('');
  const {values, handleChange, errors, isValid} = useFormWithValidation();

  const history = useHistory();

  function clickButton() {
    register({ name: values.name, email: values.email, password: values.password })
      .then(() => {
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
      })
      .catch(() => {
        setFormError('При регистрации пользователя произошла ошибка');
    });
  }

  return (
    <Auth
      title="Добро пожаловать!"
      button="Зарегистрироваться"
      text="Уже зарегистрированы? "
      link="Войти"
      href={SIGNIN_PAGE}
      buttonIsActive={isValid}
      submitForm={clickButton}
      formError={formError}
    >
      <label>
        <p className="auth__input-text">Имя</p>
        <input
        name="name"
          type="text"
          className="auth__input"
          value={values.name || ''}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
   <span className="auth__input-error auth__input-error_active"
        >{errors.name}</span>
      </label>

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

export default Register;
