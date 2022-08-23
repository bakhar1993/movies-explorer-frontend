import './Promo.css';
import promo from '../../images/landing-logo.svg';

function Promo(){
    return(
        <section className="promo" id='promo'>
            <div className='promo__container'>
<h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
<div className='promo__image-wrapper'>
    {/* <img className='promo__image' src={promo} alt='Промо'></img> */}
</div>
</div>
        </section>
    )
};

export default Promo;