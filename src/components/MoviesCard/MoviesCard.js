import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({mov,handleCardButtonClick,saveMovies,movieId}) {
  const [isSave, setIsSave] = useState(false);
  const location = useLocation();

  function clickCardButton(){
    handleCardButtonClick(mov,movieId);
  }
  function checkSaveMovies(){
    if (saveMovies.length){
      const movIsSave = saveMovies.some((item)=> item.movieId === movieId);
      setIsSave(movIsSave);}
      else{
        setIsSave(false)
      }
  }

useEffect(()=>{
  checkSaveMovies();
})

  return (
    <div className="card">
      <a className='card__wrap' href={mov.trailerLink} target="_blank" rel="noreferrer" >
      <img className="card__image" src={mov.image.url || mov.image} alt={mov.nameRU} />
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
