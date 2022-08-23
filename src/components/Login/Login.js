import Auth from '../Auth/Auth';

function Login(){
    return(
        <Auth
        title='Рады видеть!'
        button='Войти'
        class = 'auth__input-button_singin'
        text = 'Ещё не зарегистрированы? '
        link='Регистрация'
        href='/signup'
        >
      
                <label>
                <p className='auth__input-text'>E-mail</p>
                <input type='email' className='auth__input' />
                {/* <span className='auth__input-error'></span> */}
                </label>
    
                <label>
                <p className='auth__input-text'>Пароль</p>
                <input type='password' className='auth__input' />
                {/* <span className='auth__input-error'></span> */}
                </label>
       
        </Auth>
    )
};

export default Login;