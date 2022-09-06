import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import { useState } from "react";

function SavedMovies({
  searchMov,
  saveMovies,
  handleCardButtonClick,
  setSearchDataSaveMovies,
  searchDataSaveMovies,
}) {
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [error, setError] = useState("");
  const [requestText, setRequestText] = useState("");

  function handleDeleteClick(mov,movieId) {    
    handleCardButtonClick(mov,movieId);
    console.log(movieId)
    setSearchDataSaveMovies(
      searchDataSaveMovies.filter((item) => item.movieId !== movieId)
    );
  }

  function changeCheckbox() {
    setIsShortFilm(!isShortFilm);
  }

  function clickSearchSaveMov() {
    const moviesList = searchMov(saveMovies, requestText, isShortFilm);
    if (moviesList.length) {
      setSearchDataSaveMovies(moviesList);
      setError("");
    } else {
      setError("Ничего не найдено");
    }
  }

  //   useEffect(()=>{
//     if(searchDataSaveMovies){
//         setRequestText(searchDataSaveMovies.requestText);
//         setIsShortFilm(searchDataSaveMovies.isShortFilm);
//     }
//       },[searchDataSaveMovies])

  return (
    <section className="saved-movies">
      <SearchForm
        clickSearchMov={clickSearchSaveMov}
        changeCheckbox={changeCheckbox}
        isShortFilm={isShortFilm}
        requestText={requestText}
        setRequestText={setRequestText}
      />
      <div className={`"movies__error" ${error ? "movies__error_active" : ""}`}>
        {" "}
        {error}{" "}
      </div>

      {!error && searchDataSaveMovies && (
        <MoviesCardList
          handleCardButtonClick={handleDeleteClick}
          movies={searchDataSaveMovies}
          saveMovies={saveMovies}
        />
      )}
    </section>
  );
}

export default SavedMovies;
