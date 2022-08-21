import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

function Movies(){
    return(
<section className="movies">

<SearchForm />

<MoviesCardList />

</section>
    );
};

export default Movies;