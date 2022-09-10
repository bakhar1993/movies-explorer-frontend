import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import { useState } from "react";
import { useEffect } from "react";
import { getSavedMovies } from "../../utils/MainApi";

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

  // загрузка сохраненных фильмов
  useEffect(() => {
    if (saveMovies.length) {
      setSearchDataSaveMovies(saveMovies);
    } else {
      const jwt = localStorage.getItem("jwt");
      getSavedMovies(jwt)
        .then((data) => {
          return JSON.stringify(data);
        })
        .then((data) => {
          setSearchDataSaveMovies(JSON.parse(data));
        });
    }
  }, []);

  function handleDeleteClick(mov, movieId) {
    handleCardButtonClick(mov, movieId);
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
