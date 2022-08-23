import "./AboutMe.css";
import avatar from "../../images/avatar.svg";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__section-title">Студент</h2>

      <div className="about-me__profile-container">
        <div className="about-me__info-container">
        <h2 className="about-me__name">Виталий</h2>

        <h3 className="about-me__info">Фронтенд-разработчик, 30 лет</h3>
        <p className="about-me__text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
          есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься
          фриланс-заказами и ушёл с постоянной работы.
        </p>
<ul className="about-me__link-list">
    <li className="about-me__link">
<a className="about-me__link-item link" href="https://www.facebook.com/profile.php?id=100018056135832" target="_blank" rel='noopener noreferrer'>Facebook</a>
    </li>
    <li className="about-me__link">
    <a className="about-me__link-item link" href="https://github.com/bakhar1993/" target="_blank" rel='noopener noreferrer' >Github</a>
    </li>
</ul>

        </div>
        <img className="about-me__avatar" src={avatar} alt="Аватар" />
      </div>
    </section>
  );
}

export default AboutMe;
