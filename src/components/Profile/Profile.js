import './Profile.css';

function Profile(){
    return(
<section className="profile">
    <div className="profile__container">

<h2 className="profile__title">
Привет, Виталий!
</h2>
<label>
                <div className="profile__input-container profile__input-container_type_name"> 
                <p className='profile__input-text'>Имя</p> 
                <input type='text' className='profile__input' placeholder="Виталий" disabled={false}/> 
                </div>
{/* <span className='profile__input-error'></span> */}
            </label>

            <label>
            
           <div className="profile__input-container"> 
           <p className='profile__input-text'>E-mail</p>
           <input type='email' className='profile__input' placeholder="pochta@yandex.ru" disabled={false}/>
           </div>
            {/* <span className='profile__input-error'></span> */}
            </label>

            <button type="submit" className="profile__button-edit profile__button">Редактировать</button>
            <button type="button" className="profile__button-exit profile__button">Выйти из аккаунта</button>

    </div>

</section>
    )
};

export default Profile;