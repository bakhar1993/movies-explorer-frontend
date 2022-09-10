import "./Register.css";
import Auth from "../Auth/Auth";
import useInput from "../../utils/useFormValidation";
import { useState, useEffect } from "react";
import { register } from "../../utils/MainApi";
import { useHistory } from "react-router-dom";
import { login } from "../../utils/MainApi";
import { SIGNIN_PAGE } from "../../utils/constants";

function Register({setLoggedIn}) {
  const [isValidForm, setIsValidForm] = useState(false);
  const [formError,setFormError] = useState('');

  const name = useInput({
    isEmpty: true,
    pattern: /^[a-zA-ZА-Яа-я\-\s]+$/,
  });
  const email = useInput({
    isEmpty: true,
    isEmail: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
  });
  const password = useInput({ isEmpty: true });
  const history = useHistory();

  useEffect(() => {
    !name.isEmpty &&
    !email.isEmpty &&
    !password.isEmpty &&
    Object.keys(name.inputError).length === 0 &&
    Object.keys(email.inputError).length === 0 &&
    Object.keys(password.inputError).length === 0
      ? setIsValidForm(true)
      : setIsValidForm(false);
    // (name.isValid && email.isValid && password.isValid) ? setIsValidForm(true) : setIsValidForm(false); 
  }, [name, email, password]);

  function clickButton() {
    register({ name: name.value, email: email.value, password: password.value })
      .then(() => {
        login({ email: email.value, password: password.value }).then((data) => {
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
      buttonIsActive={isValidForm}
      clickButton={clickButton}
      formError={formError}
    >
      <label>
        <p className="auth__input-text">Имя</p>
        <input
          type="text"
          className="auth__input"
          value={name.value}
          onChange={(e) => {
            name.onChange(e);
          }}
          required
        />
        <span
          className={`auth__input-error ${
            !name.isEmpty && Object.keys(name.inputError).length >= 1
              ? " auth__input-error_active"
              : ""
          }`}
        >{`${Object.keys(name.inputError).map((key) => {
          return name.inputError[key];
        })}`}</span>
      </label>

      <label>
        <p className="auth__input-text">E-mail</p>
        <input
          type="email"
          className="auth__input"
          value={email.value}
          onChange={(e) => {
            email.onChange(e);
          }}
          required
        />
        <span
          className={`auth__input-error ${
            !email.isEmpty && Object.keys(email.inputError).length >= 1
              ? " auth__input-error_active"
              : ""
          }`}
        >{`${Object.keys(email.inputError).map((key) => {
          return email.inputError[key];
        })}`}</span>
      </label>

      <label>
        <p className="auth__input-text">Пароль</p>
        <input
          type="password"
          className="auth__input"
          value={password.value}
          onChange={(e) => {
            password.onChange(e);
          }}
          required
        />
        <span
          className={`auth__input-error ${
            !password.isEmpty && Object.keys(password.inputError).length >= 1
              ? " auth__input-error_active"
              : ""
          }`}
        >{`${Object.keys(password.inputError).map((key) => {
          return password.inputError[key];
        })}`}</span>
      </label>
    </Auth>
  );
}

export default Register;
