import './Techs.css';

function Techs(){
    return(
        <section className="techs" id='techs'>
<h2 className="techs__section-title">Технологии</h2>

<h2 className="techs__title">7 технологий</h2>
<p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

<ul className='techs__list-skills'>
<li className='techs__skills'>HTML</li>
<li className='techs__skills'>CSS</li>
<li className='techs__skills'>JS</li>
<li className='techs__skills'>React</li>
<li className='techs__skills'>Git</li>
<li className='techs__skills'>Express.js</li>
<li className='techs__skills'>mongoDB</li>
</ul>

        </section>
    )
};

export default Techs;