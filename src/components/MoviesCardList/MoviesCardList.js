import './MoviesCardList.css';
import Card from '../MoviesCard/MoviesCard';

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function MoviesCardList(){
    return(
   <section className="movies-card">
    <div className="movies-card__container">
{
    initialCards.map((mov,key)=>(
        <Card key={key} 
        image={mov.link}
        name={mov.name}
        />
    ))
}
    </div>
<button className="movies-card__button" type="button">Еще</button>
   </section>
    )
};

export default MoviesCardList;