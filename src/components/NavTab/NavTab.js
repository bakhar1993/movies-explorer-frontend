import './NavTab.css'
function NavTab(){
    return(
        <nav className="navTab">
<ul className="navTab__container">
    <li className="navTab__item"><a className="navTab__link link" href="#promo">О проекте</a></li>
    <li className="navTab__item"><a className="navTab__link link" href="#techs">Технологии</a></li>
    <li className="navTab__item"><a className="navTab__link link" href="#about-me">Студент</a></li>
</ul>
        </nav>
    )
};

export default NavTab;