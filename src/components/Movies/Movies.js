import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import getMovies from "../../utils/MoviesApi";

function Movies({ searchMov,handleCardButtonClick,saveMovies }) {
  const [error, setError] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem("movies")));
  }, []);

  useEffect(() => {
    if (movies) {
      setRequestText(movies.requestText);
      setIsShortFilm(movies.isShortFilm);
    }
  }, [movies]);

  function changeCheckbox() {
    setIsShortFilm(!isShortFilm);
  }

  function clickSearchMov() {
    setIsLoading(true);
    getMovies()
      .then((data) => {
        return JSON.stringify(data);
      })
      .then((data) => {
        const moviesList = searchMov(
          JSON.parse(data),
          requestText,
          isShortFilm
        );
        if (moviesList.length) {
          // localStorage.setItem("movies", JSON.stringify(moviesList));
          localStorage.setItem(
            "movies",
            JSON.stringify({
              moviesList,
              requestText,
              isShortFilm,
            })
          );

          setMovies(JSON.parse(localStorage.getItem("movies")));
          setError("");
          setIsSearch(true);
        } else {
          setError("Ничего не найдено");
          setMovies(null);
          localStorage.clear("movies");
        }
      })
      .catch(() => {
        setError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      }).finally(()=>{
        setTimeout(()=>{setIsLoading(false)},3000)
        // setIsLoading(false);
      });
  }
  return (
    <section className="movies">
      <SearchForm
        clickSearchMov={clickSearchMov}
        changeCheckbox={changeCheckbox}
        isShortFilm={isShortFilm}
        requestText={requestText}
        setRequestText={setRequestText}
      />

{isLoading && <Preloader />}
{!isLoading && <div className={`"movies__error" ${error ? "movies__error_active" : ""}`}>
        {" "}
        {error}{" "}
      </div>}
      {/* {((!error && isSearch) || (localStorage.getItem("movies"))) && <MoviesCardList movies={movies.moviesList} />} */}
      {((!error && isSearch && !isLoading) || (movies && !isLoading)) && (
        <MoviesCardList
         movies={movies.moviesList}
         handleCardButtonClick={handleCardButtonClick}
         saveMovies={saveMovies}
         />
      )}
    </section>
  );
}

export default Movies;
