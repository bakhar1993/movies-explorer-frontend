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
  setSaveMovies,
}) {
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [error, setError] = useState("");
  const [requestText, setRequestText] = useState("");

  function handleDeleteClick(mov, movieId) {
    handleCardButtonClick(mov, movieId);
    setSaveMovies(
      saveMovies.filter((item) => item.movieId !== movieId)
    );
    if(searchDataSaveMovies){
setSearchDataSaveMovies(null)}
  }

  function changeCheckbox() {
    setIsShortFilm(!isShortFilm);
  }

  function clickSearchSaveMov() {
    if(saveMovies){
    const moviesList = searchMov(saveMovies, requestText, isShortFilm);
    if (moviesList.length) {
      setSearchDataSaveMovies(moviesList);
      setError("");
    } else {
      setError("Ничего не найдено");
    }}
   else{setError("Ничего не найдено");}
  }

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

{!error && (saveMovies) && (

        <MoviesCardList
          handleCardButtonClick={handleDeleteClick}
          movies={searchDataSaveMovies || saveMovies}
          saveMovies={saveMovies}
        />
      )}
{/* <div>{console.log(saveMovies)}</div> */}
    </section>
  );
}

export default SavedMovies;
