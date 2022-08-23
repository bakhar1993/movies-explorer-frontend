import './Register.css';
import Auth from '../Auth/Auth';


function Register(){
    return(
    <Auth
    title='Добро пожаловать!'
    button='Зарегистрироваться'
    text = 'Уже зарегистрированы? '
    link='Войти'
    href='/signin'
    >
    
            <label>
                <p className='auth__input-text'>Имя</p>
            <input type='text' className='auth__input' />
<span className='auth__input-error'></span>
            </label>

            <label>
            <p className='auth__input-text'>E-mail</p>
            <input type='email' className='auth__input' />
            <span className='auth__input-error'></span>
            </label>

            <label>
            <p className='auth__input-text'>Пароль</p>
            <input type='password' className='auth__input' />
            <span className='auth__input-error'></span>
            </label>
   
    </Auth>
    )
};

export default Register;