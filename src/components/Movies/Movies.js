import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import getMovies from "../../utils/MoviesApi";

function Movies({
  searchMov,
  handleCardButtonClick,
  saveMovies,
  foundMovies,
  setFoundMovies
}) {
  const [error, setError] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFoundMovies(JSON.parse(localStorage.getItem("found-movies")));
  }, []);

  useEffect(() => {
    if (foundMovies) {
      setRequestText(foundMovies.requestText);
      setIsShortFilm(foundMovies.isShortFilm);
    }
  }, [foundMovies]);

  function changeCheckbox() {
    setIsShortFilm(!isShortFilm);
  }

  //изменение адреса изображения
  function changeMoviesPath(data) {
    return data.map((item) => {
      item.image.url = "https://api.nomoreparties.co" + item.image.url;
      return item;
    });
  }

  function clickSearchMov() {
    setIsLoading(true);

    if (localStorage.getItem("movies")) {
      const moviesList = searchMov(
        changeMoviesPath(JSON.parse(localStorage.getItem("movies"))),
        requestText,
        isShortFilm
      );

      if (moviesList.length) {
        localStorage.setItem(
          "found-movies",
          JSON.stringify({
            moviesList,
            requestText,
            isShortFilm,
          })
        );

        setFoundMovies(JSON.parse(localStorage.getItem("found-movies")));
        setError("");
        setIsSearch(true);
      } else {
        setError("Ничего не найдено");
        setFoundMovies(null);
        localStorage.clear("found-movies");
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } else {
      getMovies()
        .then((data) => {
          return JSON.stringify(data);
        })
        .then((data) => {
          localStorage.setItem("movies", data);

          const moviesList = searchMov(
            changeMoviesPath(JSON.parse(localStorage.getItem("movies"))),
            requestText,
            isShortFilm
          );
          if (moviesList.length) {
            localStorage.setItem(
              "found-movies",
              JSON.stringify({
                moviesList,
                requestText,
                isShortFilm,
              })
            );

            setFoundMovies(JSON.parse(localStorage.getItem("found-movies")));
            setError("");
            setIsSearch(true);
          } else {
            setError("Ничего не найдено");
            setFoundMovies(null);
            localStorage.clear("found-movies");
          }
        })
        .catch(() => {
          setError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        });
    }
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
      {!isLoading && (
        <div
          className={`"movies__error" ${error ? "movies__error_active" : ""}`}
        >
          {" "}
          {error}{" "}
        </div>
      )}

      {((!error && isSearch && !isLoading) || (foundMovies && !isLoading)) && (
        <MoviesCardList
          movies={foundMovies.moviesList}
          handleCardButtonClick={handleCardButtonClick}
          saveMovies={saveMovies}
        />
      )}
    </section>
  );
}

export default Movies;
