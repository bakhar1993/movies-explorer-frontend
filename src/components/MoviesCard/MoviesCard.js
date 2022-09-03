import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({mov,handleCardButtonClick,saveMovies}) {
  const [isSave, setIsSave] = useState(false);
  const location = useLocation();

  function clickCardButton(){
    handleCardButtonClick(mov);
  }

useEffect(()=>{
  const movIsSave = saveMovies.some((item)=> item.id === mov.id);
  setIsSave(movIsSave);
})

  return (
    <div className="card">
      <a className='card__wrap' href={mov.trailerLink} target="_blank" rel="noreferrer" >
      <img className="card__image" src={` https://api.nomoreparties.co${mov.image.url}`} alt={mov.nameRU} />
      </a>
      <div className="card__info">
        <div className="card__descriptiion">
          <h3 className="card__movie-name" >{mov.nameRU}</h3>
          <p className="card__movie-time">{`${Math.trunc(mov.duration /60)}ч${mov.duration %60}м`}</p>
        </div>
        {/* <button type="button" className={`card__button${isSave ? ' card__button_active' : ''}`} onClick={clickButtonLike}></button> */}
        <button type="button" className={`card__button${ (location.pathname === '/saved-movies') ? ' card__button_type_delete' :
          (isSave ? ' card__button_active' : '')}`} onClick={clickCardButton}></button>

      </div>
    </div>
  );
}

export default MoviesCard;
