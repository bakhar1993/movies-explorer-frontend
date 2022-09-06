import Auth from "../Auth/Auth";
import useInput from "../../utils/useFormValidation";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../utils/MainApi";

function Login({setLoggedIn,setUserInfo}) {
  const [isValidForm, setIsValidForm] = useState(false);
  const [formError, setFormError] = useState("");
  const email = useInput({isEmpty: true,isEmail: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,});
  const password = useInput({ isEmpty: true });
  const history = useHistory();

  function clickButton() {
    login({ email: email.value, password: password.value }).then((data) => {
if(data){
  localStorage.setItem('jwt',data.token);
setLoggedIn(true);
// setUserInfo({email: email.value, password: password.value});
        history.push("/movies");
}

      })
      .catch(() => {
        setFormError('При авторизации произошла ошибка');
    });
  }

  useEffect(() => {
    !email.isEmpty &&
    !password.isEmpty &&
    Object.keys(email.inputError).length === 0 &&
    Object.keys(password.inputError).length === 0
      ? setIsValidForm(true)
      : setIsValidForm(false);
  }, [email, password]);

  return (
    <Auth
      title="Рады видеть!"
      button="Войти"
      class="auth__form_singin"
      text="Ещё не зарегистрированы? "
      link="Регистрация"
      href="/signup"
      buttonIsActive={isValidForm}
      clickButton={clickButton}
      formError={formError}
    >
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

export default Login;
