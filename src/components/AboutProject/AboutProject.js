import "./AboutProject.css";
function AboutProject() {
  return (
    <section className="aboutProject">
      <h2 className="aboutProject__section-title">О проекте</h2>

      <div className="aboutProject__desctiption">
        <div className="aboutProject__desctiption-item">
          <h2 className="aboutProject__desctiption-title">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="aboutProject__desctiption-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="aboutProject__desctiption-item">
          <h2 className="aboutProject__desctiption-title">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="aboutProject__desctiption-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="aboutProject__time-container">
        <p className="aboutProject__time aboutProject__time_active">1 неделя</p>
        <p className="aboutProject__time">4 недели</p>
        <p className="aboutProject__time-text">Back-end</p>
        <p className="aboutProject__time-text">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
