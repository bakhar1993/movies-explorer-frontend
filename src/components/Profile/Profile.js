import "./Profile.css";
import useInput from "../../utils/useFormValidation";
import { useEffect, useState } from "react";
import { updateProfile } from "../../utils/MainApi";
import UserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Profile({outProfile,setCurrentUser}) {
  const [isValidForm, setIsValidForm] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSend, setIsSend] = useState(false);
  const currentUser = useContext(UserContext);

  const name = useInput({
    isEmpty: true,
    pattern: /^[a-zA-ZА-Яа-я\-\s]+$/,
  });
  const email = useInput({
    isEmpty: true,
    isEmail: /^[^ ]+@[^ ]+\.[a-z]{1,3}$/,
  });
  useEffect(() => {
    !name.isEmpty &&
    !email.isEmpty &&
    Object.keys(name.inputError).length === 0 &&
    Object.keys(email.inputError).length === 0 &&
    ((email.value !== currentUser.email) || (name.value !== currentUser.name))
      ? setIsValidForm(true)
      : setIsValidForm(false);
  }, [name, email]);

  function editProfile(){
    const token = localStorage.getItem("jwt");
    updateProfile({name: name.value, email: email.value,token: token })
    .then((data)=>{setSubmitError('');
    setCurrentUser(data);
    setIsSend(true);
  })
    .catch(()=>{
        setSubmitError('При обновлении профиля произошла ошибка.')}
    );
  }
  return (
    <section className="profile">
      <div className="profile__container">
        <form className="profile__form">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <label>
          <div className="profile__input-container profile__input-container_type_name">
            <p className="profile__input-text">Имя</p>
            <input
              type="text"
              className="profile__input"
              placeholder="Изменить имя"
              // value={name.value}
              defaultValue={ name.value || currentUser.name }
          onChange={(e) => {
            name.onChange(e);
            setIsSend(false);
          }}
          required
            />
          </div>
          <span className={`profile__input-error${
            !name.isEmpty && Object.keys(name.inputError).length >= 1
              ? " profile__input-error_active"
              : ""
          }`}>{`${Object.keys(name.inputError).map((key) => {
          return name.inputError[key];
        })}`}</span>
        </label>

        <label>
          <div className="profile__input-container">
            <p className="profile__input-text">E-mail</p>
            <input
              type="email"
              className="profile__input"
              placeholder="Изменить почту"
              // value={email.value}
              defaultValue={email.value || currentUser.email}
              onChange={(e) => {
                email.onChange(e);
                setIsSend(false);
              }}
              required
            />
          </div>
          <span className={`profile__input-error${
            !email.isEmpty && Object.keys(email.inputError).length >= 1
              ? " profile__input-error_active"
              : ""
          }`}>{`${Object.keys(email.inputError).map((key) => {
          return email.inputError[key];
        })}`}</span>
        </label>
        </form>

<span className={`profile__info${isSend ? " profile__info_active"
              : ""}`}>Данные профиля успешно обновлены!</span>
<span className={`profile__input-error${submitError ? " profile__input-error_active"
              : ""}`}>{submitError}</span>


        <button type="submit" className="profile__button-edit profile__button" onClick={editProfile} disabled={!isValidForm}>
          Редактировать
        </button>
        <button type="button" className="profile__button-exit profile__button" onClick={outProfile}>
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
