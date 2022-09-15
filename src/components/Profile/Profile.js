import "./Profile.css";
import useInput from "../../utils/useFormValidation";
import { useEffect, useState } from "react";
import { updateProfile } from "../../utils/MainApi";
import UserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { useFormWithValidation } from "../../utils/useFormWithValidation";

function Profile({outProfile,setCurrentUser}) {
  const [submitError, setSubmitError] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [nameIsEmpty, setNameIsEmpty] = useState(true);
  const [emailIsEmpty, setEmailIsEmpty] = useState(true);
  const currentUser = useContext(UserContext);
  const {values, handleChange, errors, isValid} = useFormWithValidation();

  function editProfile(e){
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    updateProfile({name: values.name || currentUser.name, email: values.email || currentUser.email,token: token })
    .then((data)=>{setSubmitError('');
    setCurrentUser(data);
    setIsSend(true);
  })
    .catch(()=>{
        setSubmitError('При обновлении профиля произошла ошибка.')
        console.log(isSend);
      }
        
    );
  }
  return (
    <section className="profile" onSubmit={editProfile}>
      <div className="profile__container">
        <form className="profile__form">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <label>
          <div className="profile__input-container profile__input-container_type_name">
            <p className="profile__input-text">Имя</p>
            <input
            name="name"
              type="text"
              className="profile__input"
              placeholder="Изменить имя"
              defaultValue={currentUser.name || ''}
          onChange={(e) => {
            handleChange(e);
            if(e.target.value){setNameIsEmpty(false)}else{setNameIsEmpty(true)};
            setIsSend(false);
            setSubmitError('');
          }}
          required
            />
          </div>
          <span className="profile__input-error">{errors.name}</span>
        </label>

        <label>
          <div className="profile__input-container">
            <p className="profile__input-text">E-mail</p>
            <input
            name="email"
              type="email"
              className="profile__input"
              placeholder="Изменить почту"
              defaultValue={currentUser.email || ''}
              onChange={(e) => {
                handleChange(e);
                if(e.target.value){setEmailIsEmpty(false)}else{setEmailIsEmpty(true)};
                setIsSend(false);
                setSubmitError('');
              }}
              required
            />

          </div>
          <span className="profile__input-error">{errors.email}</span>
        </label>
        

<span className={`profile__info${isSend ? " profile__info_active"
              : ""}`}>Данные профиля успешно обновлены!</span>
<span className={`profile__input-error${submitError ? " profile__input-error_active"
              : ""}`}>{submitError}</span>
        {/* <button type="submit" className="profile__button-edit profile__button"  disabled={((emailIsEmpty && nameIsEmpty) || (Object.keys(errors).length != 0))}> */}
        <button type="submit" className="profile__button-edit profile__button"  disabled={((emailIsEmpty && nameIsEmpty) || !isValid)}>

          Редактировать
        </button>
        <button type="button" className="profile__button-exit profile__button" onClick={outProfile}>
          Выйти из аккаунта
        </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
