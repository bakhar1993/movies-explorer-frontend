import './Portfolio.css';
import linkImage from '../../images/link.svg';

function Portfolio(){
    return(
    <section className='portfolio'>
<h3 className='portfolio__title'>Портфолио</h3>
        <ul className='portfolio__list'>
            <li className='portfolio__list-item'><a href='https://bakhar1993.github.io/how-to-learn/' className='portfolio__list-link'>Статичный сайт<img className='portfolio__link-image' src={linkImage} alt='Ссылка' /></a></li>
            <li className='portfolio__list-item'><a href='https://bakhar1993.github.io/russian-travel/' className='portfolio__list-link'>Адаптивный сайт<img className='portfolio__link-image' src={linkImage} alt='Ссылка' /></a></li>
            <li className='portfolio__list-item'><a href='https://bakhar1993.github.io/mesto/' className='portfolio__list-link'>Одностраничное приложение<img className='portfolio__link-image' src={linkImage} alt='Ссылка' /></a></li>
        </ul>
    </section>
    )
};

export default Portfolio;