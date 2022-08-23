import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <div className="card">
      <div className='card__wrap'>
      <img className="card__image" src={props.image} alt={props.name} />
      </div>
      <div className="card__info">
        <div className="card__descriptiion">
          <h3 className="card__movie-name" >{props.name}</h3>
          <p className="card__movie-time">1ч42м</p>
        </div>
        <button type="button" className="card__button"></button>
      </div>
    </div>
  );
}

export default MoviesCard;
